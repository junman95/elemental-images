"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ResultError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[ResultError]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-4xl mb-4">⚠️</div>

        <h1 className="text-xl font-bold text-foreground mb-2">
          결과를 불러오지 못했습니다
        </h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          {error.message || "결과 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#13ec5b] text-[#102216] font-bold text-sm hover:bg-[#0db849] transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(26,46,26,0.2)] text-[#1a2e1a] font-medium text-sm hover:border-[#13ec5b] hover:text-[#13ec5b] transition-colors"
          >
            직접 분석하기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
