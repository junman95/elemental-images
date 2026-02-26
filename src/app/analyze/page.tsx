"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AnalysisController = dynamic(
  () => import("@/components/analysis/AnalysisController"),
  { ssr: false }
);

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col dancheong-light">
      <Header />

      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-10">
        {/* 페이지 헤더 */}
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#13ec5b] mb-3">
            五行 AI 분석
          </span>
          <h1 className="font-display text-3xl font-black text-[#1a2e1a] leading-tight tracking-tighter">
            오행 관상 분석
          </h1>
          <p className="text-sm text-[#4a664a] mt-2">
            정면 얼굴 사진을 업로드하면 AI가 오행 유형을 분석합니다
          </p>
        </div>

        <AnalysisController />
      </main>

      <Footer />
    </div>
  );
}
