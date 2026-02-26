import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* 숫자 */}
        <div
          className="font-display font-black text-[120px] leading-none select-none"
          style={{ color: "rgba(19, 236, 91, 0.12)" }}
        >
          404
        </div>

        {/* 오행 장식 */}
        <div className="flex gap-2 my-4">
          {["木", "火", "土", "金", "水"].map((hanja, i) => (
            <span
              key={hanja}
              className="text-base font-display font-bold"
              style={{
                color: ["#22c55e", "#ef4444", "#eab308", "#a1a1aa", "#3b82f6"][i],
                opacity: 0.5,
              }}
            >
              {hanja}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#13ec5b] text-[#102216] font-bold text-sm hover:bg-[#0db849] transition-colors"
          >
            홈으로
          </Link>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(26,46,26,0.2)] text-[#1a2e1a] font-medium text-sm hover:border-[#13ec5b] hover:text-[#13ec5b] transition-colors"
          >
            분석 시작하기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
