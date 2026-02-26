import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResult } from "@/lib/redis";
import { ELEMENTS } from "@/lib/constants/elements";
import SharedResultView from "@/components/results/SharedResultView";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sharedResult = await getResult(id);

  if (!sharedResult) {
    return { title: "결과를 찾을 수 없습니다 - 오행 얼굴형 분석" };
  }

  const element = ELEMENTS[sharedResult.result.primaryElement];

  return {
    title: `${element.nameKo} 유형 - 오행 얼굴형 분석 결과`,
    description: `오행 얼굴형 분석 결과: ${element.nameKo} (${sharedResult.result.primaryScore}%)`,
    openGraph: {
      title: `나의 오행 유형은 ${element.nameKo}!`,
      description: `오행 얼굴형 분석에서 ${element.nameKo} 유형으로 판별되었습니다. 나도 분석해보세요!`,
      type: "website",
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params;
  const sharedResult = await getResult(id);

  // 결과 없음 → not-found.tsx로 처리 (만료 or 잘못된 ID)
  if (!sharedResult) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-md px-4 py-8">
        <SharedResultView sharedResult={sharedResult} />
      </main>
      <Footer />
    </div>
  );
}
