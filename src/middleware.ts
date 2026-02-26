import { NextRequest, NextResponse } from "next/server";

/**
 * Storybook 접근 제어
 *
 * 우선순위:
 * 1. STORYBOOK_ENABLED 환경변수 (true | false) — 명시적 제어
 * 2. NODE_ENV 기반 기본값
 *
 * 현재: production 포함 전체 환경 공개
 * 스테이지 환경 추가 후 변경 방법:
 *   - STORYBOOK_ENABLED=false 를 production 환경변수에 추가하거나
 *   - 아래 DEFAULT 줄을 `return process.env.NODE_ENV !== "production"` 으로 변경
 */
function isStorybookEnabled(): boolean {
  // 명시적 환경변수 우선
  if (process.env.STORYBOOK_ENABLED === "false") return false;
  if (process.env.STORYBOOK_ENABLED === "true") return true;

  // NODE_ENV 기반 기본 동작
  // 현재: 모든 환경 허용 (production 포함)
  // 추후 스테이지 분리 시 아래 줄로 교체:
  // return process.env.NODE_ENV !== "production";
  return true; // DEFAULT: 항상 허용
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/storybook")) {
    if (!isStorybookEnabled()) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/storybook", "/storybook/:path*"],
};
