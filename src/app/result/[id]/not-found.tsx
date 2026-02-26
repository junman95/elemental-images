import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ResultNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="text-5xl mb-4 select-none">⏳</div>

        <h1 className="text-xl font-bold text-foreground mb-2">
          결과를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground text-sm mb-1 max-w-xs">
          24시간이 지나 만료되었거나 잘못된 링크일 수 있습니다.
        </p>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          새로 분석하면 24시간 동안 공유 링크가 유지됩니다.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#13ec5b] text-[#102216] font-bold text-sm hover:bg-[#0db849] transition-colors"
          >
            직접 분석하기
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(26,46,26,0.2)] text-[#1a2e1a] font-medium text-sm hover:border-[#13ec5b] hover:text-[#13ec5b] transition-colors"
          >
            홈으로
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
