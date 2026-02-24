import { NextRequest, NextResponse } from "next/server";
import { getResult } from "@/lib/redis";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id || id.length < 5) {
      return NextResponse.json(
        { success: false, error: "잘못된 결과 ID입니다." },
        { status: 400 }
      );
    }

    const sharedResult = await getResult(id);

    if (!sharedResult) {
      return NextResponse.json(
        { success: false, error: "결과를 찾을 수 없습니다. 24시간이 지나 만료되었을 수 있습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...sharedResult,
    });
  } catch (error) {
    console.error("Result fetch error:", error);
    return NextResponse.json(
      { success: false, error: "결과 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
