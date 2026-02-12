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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">오행 관상 분석</h1>
          <p className="text-sm text-muted-foreground mt-1">
            정면 얼굴 사진을 업로드하면 AI가 오행 유형을 분석합니다
          </p>
        </div>

        <AnalysisController />
      </main>

      <Footer />
    </div>
  );
}
