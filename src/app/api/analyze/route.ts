import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { nanoid } from "nanoid";
import { AnalyzeRequest, AnalyzeResponse, SharedResult } from "@/types/analysis";
import { buildSystemPrompt, buildUserMessage } from "@/lib/analysis/prompt";
import { parseClaudeResponse } from "@/lib/analysis/parse-response";
import {
  getCachedResultId,
  getResult,
  storeResult,
  setCachePointer,
} from "@/lib/redis";
import { classifyError, statusToMessage } from "@/lib/errors";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: "서버 설정 오류입니다. API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const body: AnalyzeRequest = await request.json();

    if (!body.imageBase64 || !body.mediaType || !body.measurements) {
      return NextResponse.json(
        { success: false, error: "잘못된 요청입니다." },
        { status: 400 }
      );
    }

    // ── 캐시 체크 ──
    if (body.imageHash) {
      const cachedId = await getCachedResultId(body.imageHash);
      if (cachedId) {
        const cached = await getResult(cachedId);
        if (cached) {
          return NextResponse.json({
            success: true,
            result: cached.result,
            resultId: cachedId,
            cached: true,
          });
        }
      }
    }

    // ── Claude Vision API 호출 ──
    const systemPrompt = buildSystemPrompt();
    const userMessage = buildUserMessage(body.measurements, body.preClassification);

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: body.mediaType,
                data: body.imageBase64,
              },
            },
            {
              type: "text",
              text: userMessage,
            },
          ],
        },
      ],
    });

    const responseText =
      response.content[0].type === "text" ? response.content[0].text : "";

    const result = parseClaudeResponse(responseText, body.measurements);

    // ── Redis 저장 ──
    const resultId = nanoid(12);
    const sharedResult: SharedResult = {
      result,
      thumbnailBase64: body.thumbnailBase64 || "",
      createdAt: new Date().toISOString(),
    };

    const savePromises: Promise<boolean>[] = [storeResult(resultId, sharedResult)];
    if (body.imageHash) {
      savePromises.push(setCachePointer(body.imageHash, resultId));
    }

    await Promise.all(savePromises);

    return NextResponse.json({
      success: true,
      result,
      resultId,
      cached: false,
    });
  } catch (error) {
    console.error("[/api/analyze]", error);

    const code = classifyError(error);

    if (code === "RATE_LIMIT") {
      return NextResponse.json(
        { success: false, error: "AI 서버가 혼잡합니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    if (code === "SERVER_CONFIG") {
      return NextResponse.json(
        { success: false, error: "서버 설정 오류입니다." },
        { status: 500 }
      );
    }

    // Anthropic SDK의 HTTP status 에러
    const status = (error as { status?: number }).status;
    if (status) {
      return NextResponse.json(
        { success: false, error: statusToMessage(status) },
        { status }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "AI 분석 중 오류가 발생했습니다.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
