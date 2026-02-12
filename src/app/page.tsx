import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ELEMENTS, ELEMENT_ORDER } from "@/lib/constants/elements";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="flex justify-center gap-3 mb-6">
            {ELEMENT_ORDER.map((el) => (
              <span
                key={el}
                className="text-3xl w-14 h-14 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: ELEMENTS[el].color,
                  backgroundColor: `${ELEMENTS[el].color}10`,
                }}
              >
                {ELEMENTS[el].hanja}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-3">
            오행 관상 분석
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            AI가 분석하는 당신의 오행 얼굴형
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            사진 한 장으로 목(木)·화(火)·토(土)·금(金)·수(水) 중<br />
            당신의 얼굴이 어떤 오행에 해당하는지 알아보세요
          </p>

          <Link href="/analyze">
            <Button size="lg" className="text-base px-8">
              분석 시작하기
            </Button>
          </Link>
        </section>

        {/* Element cards */}
        <section className="max-w-2xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-center mb-6">오행 유형 소개</h2>
          <div className="grid gap-3">
            {ELEMENT_ORDER.map((el) => {
              const info = ELEMENTS[el];
              return (
                <div
                  key={el}
                  className={`rounded-lg p-4 border ${info.bgColor} ${info.borderColor} flex items-start gap-3`}
                >
                  <span
                    className="text-2xl w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                    style={{ borderColor: info.color }}
                  >
                    {info.hanja}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm">
                      {info.nameKo}{" "}
                      <span className="text-muted-foreground font-normal">
                        {info.nameEn}
                      </span>
                    </h3>
                    <p className="text-xs text-foreground/70 mt-0.5 leading-relaxed">
                      {info.faceCharacteristics.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
