import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AnalyzeRequest, AnalyzeResponse } from "@/types/analysis";
import { buildSystemPrompt, buildUserMessage } from "@/lib/analysis/prompt";
import { parseClaudeResponse } from "@/lib/analysis/parse-response";

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

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Analysis error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "AI 분석 중 오류가 발생했습니다. 다시 시도해 주세요.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
