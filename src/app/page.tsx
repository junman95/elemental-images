import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ELEMENTS, ELEMENT_ORDER } from "@/lib/constants/elements";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col dancheong-light overflow-x-hidden">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="w-full max-w-xl mx-auto px-4 pt-16 pb-12 text-center">
          {/* 오행 한자 아이콘 */}
          <div className="flex justify-center gap-2.5 mb-8">
            {ELEMENT_ORDER.map((el) => (
              <div
                key={el}
                className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold ds-glass"
                style={{
                  color: ELEMENTS[el].color,
                  borderColor: `${ELEMENTS[el].color}50`,
                }}
              >
                {ELEMENTS[el].hanja}
              </div>
            ))}
          </div>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#13ec5b] mb-3">
            五行 Face Analysis
          </span>

          {/* 타이틀 */}
          <h1 className="font-display text-3xl sm:text-4xl font-black text-[#1a2e1a] leading-tight tracking-tighter mb-4">
            오행 관상 분석
          </h1>

          {/* 서브타이틀 */}
          <p className="text-[#4a664a] text-base font-medium mb-2">
            AI가 분석하는 당신의 오행 얼굴형
          </p>
          <p className="text-sm text-[#8aaa8a] mb-10 leading-relaxed">
            사진 한 장으로 목(木)·화(火)·토(土)·금(金)·수(水) 중<br />
            당신의 얼굴이 어떤 오행에 해당하는지 알아보세요
          </p>

          {/* CTA 버튼 */}
          <Link href="/analyze">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold transition-all duration-200 bg-[#13ec5b] text-[#102216] hover:bg-[#0db849] shadow-[0_4px_20px_rgba(19,236,91,0.3)] hover:shadow-[0_4px_28px_rgba(19,236,91,0.45)] hover:scale-[1.02]">
              분석 시작하기
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </section>

        {/* ── 오행 유형 소개 ── */}
        <section className="w-full max-w-xl mx-auto px-4 pb-16">
          {/* 섹션 헤더 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[rgba(212,175,55,0.3)]" />
            <h2 className="text-xs font-bold tracking-[0.25em] text-[#d4af37] uppercase">
              오행 유형 소개
            </h2>
            <div className="h-px flex-1 bg-[rgba(212,175,55,0.3)]" />
          </div>

          {/* 카드 목록 */}
          <div className="grid gap-2.5">
            {ELEMENT_ORDER.map((el) => {
              const info = ELEMENTS[el];
              return (
                <div
                  key={el}
                  className="rounded-2xl p-4 ds-glass flex items-center gap-3 overflow-hidden"
                  style={{
                    borderLeft: `3px solid ${info.color}80`,
                  }}
                >
                  {/* 한자 배지 */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black shrink-0 font-display"
                    style={{
                      backgroundColor: `${info.color}15`,
                      color: info.color,
                      border: `1px solid ${info.color}30`,
                    }}
                  >
                    {info.hanja}
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-baseline gap-1.5 mb-0.5 min-w-0">
                      <h3 className="font-bold text-sm text-[#1a2e1a] shrink-0">
                        {info.nameKo}
                      </h3>
                      <span className="text-xs text-[#8aaa8a] truncate">
                        {info.nameEn}
                      </span>
                    </div>
                    <p className="text-xs text-[#4a664a] leading-relaxed truncate">
                      {info.faceCharacteristics.slice(0, 3).join(" · ")}
                    </p>
                  </div>

                  {/* 계절 뱃지 */}
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-block"
                    style={{
                      backgroundColor: `${info.color}15`,
                      color: info.color,
                    }}
                  >
                    {info.season}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 하단 CTA */}
          <div className="mt-10 text-center">
            <Link href="/analyze">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border-2 border-[#13ec5b] text-[#13ec5b] hover:bg-[#13ec5b] hover:text-[#102216] transition-all duration-200">
                지금 내 얼굴형 분석하기
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
