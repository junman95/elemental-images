"use client";

import { SharedResult } from "@/types/analysis";
import { ELEMENTS } from "@/lib/constants/elements";
import ResultCard from "./ResultCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Camera } from "lucide-react";
import Link from "next/link";

interface SharedResultViewProps {
  sharedResult: SharedResult;
}

export default function SharedResultView({ sharedResult }: SharedResultViewProps) {
  const { result, thumbnailBase64, createdAt } = sharedResult;
  const element = ELEMENTS[result.primaryElement];

  // 만료 시간 계산
  const created = new Date(createdAt);
  const expiresAt = new Date(created.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.round((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60)));

  return (
    <div className="space-y-4">
      {/* 썸네일 + 요약 */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            {thumbnailBase64 && (
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4"
                style={{ borderColor: element.color }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`data:image/webp;base64,${thumbnailBase64}`}
                  alt="분석 대상 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">이 사람의 오행 유형은</p>
              <p className="text-2xl font-bold mt-1" style={{ color: element.color }}>
                {element.nameKo}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 만료 안내 */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Clock className="w-3 h-3" />
        <span>
          {hoursLeft > 0
            ? `이 결과는 약 ${hoursLeft}시간 후 만료됩니다`
            : "이 결과는 곧 만료됩니다"}
        </span>
      </div>

      {/* 결과 카드 재사용 */}
      <ResultCard result={result} />

      {/* CTA: 나도 분석하기 */}
      <div className="flex justify-center pt-4 pb-8">
        <Link href="/analyze">
          <Button size="lg" className="gap-2">
            <Camera className="w-5 h-5" />
            나도 분석해보기
          </Button>
        </Link>
      </div>
    </div>
  );
}
