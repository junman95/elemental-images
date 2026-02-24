import { Metadata } from "next";
import { getResult } from "@/lib/redis";
import { ELEMENTS } from "@/lib/constants/elements";
import SharedResultView from "@/components/results/SharedResultView";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sharedResult = await getResult(id);

  if (!sharedResult) {
    return {
      title: "결과를 찾을 수 없습니다 - 오행 얼굴형 분석",
    };
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-md px-4 py-8">
        {sharedResult ? (
          <SharedResultView sharedResult={sharedResult} />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4 py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h2 className="text-lg font-bold">결과를 찾을 수 없습니다</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    24시간이 지나 만료되었거나, 잘못된 링크일 수 있습니다.
                  </p>
                </div>
                <Link href="/analyze">
                  <Button className="gap-2">
                    <Camera className="w-4 h-4" />
                    직접 분석해보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
