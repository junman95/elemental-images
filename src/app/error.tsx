"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 로깅 (Sentry 등 연동 시 여기서)
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-[#f6f8f6]">
      {/* 장식 */}
      <div
        className="font-display font-black text-[100px] leading-none select-none mb-4"
        style={{ color: "rgba(239, 68, 68, 0.1)" }}
      >
        오류
      </div>

      <h1 className="text-2xl font-bold text-[#1a2e1a] mb-2">
        예상치 못한 오류가 발생했습니다
      </h1>
      <p className="text-[#4a664a] text-sm mb-1 max-w-sm">
        {error.message || "페이지를 로드하는 중 문제가 생겼습니다."}
      </p>
      {error.digest && (
        <p className="text-[10px] text-[#8aaa8a] mb-8 font-mono">
          ref: {error.digest}
        </p>
      )}
      {!error.digest && <div className="mb-8" />}

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#13ec5b] text-[#102216] font-bold text-sm hover:bg-[#0db849] transition-colors"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(26,46,26,0.2)] text-[#1a2e1a] font-medium text-sm hover:border-[#13ec5b] hover:text-[#13ec5b] transition-colors"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
