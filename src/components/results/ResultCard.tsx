"use client";

import { AnalysisResult } from "@/types/analysis";
import ElementBadge from "./ElementBadge";
import ElementRadar from "./ElementRadar";
import ElementDescription from "./ElementDescription";
import FeatureBreakdown from "./FeatureBreakdown";
import { ELEMENTS } from "@/lib/constants/elements";

const ELEMENT_KO: Record<string, string> = {
  wood: "목", fire: "화", earth: "토", metal: "금", water: "수",
};

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const primaryInfo = ELEMENTS[result.primaryElement];

  return (
    <div className="space-y-4">
      {/* ── 주 결과 ── */}
      <div className="rounded-2xl ds-glass overflow-hidden">
        {/* 엘리먼트 컬러 상단 띠 */}
        <div
          className="h-1.5"
          style={{ background: `linear-gradient(90deg, ${primaryInfo.color}80, ${primaryInfo.color}20)` }}
        />
        <div className="p-6 text-center">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-4">
            당신의 오행 유형
          </span>
          <div className="flex justify-center mb-4">
            <ElementBadge
              element={result.primaryElement}
              score={result.primaryScore}
              size="lg"
            />
          </div>

          {result.secondaryElement !== result.primaryElement && (
            <div className="mt-4 pt-4 border-t border-[rgba(26,46,26,0.07)]">
              <p className="text-xs text-[#8aaa8a] mb-2">보조 유형</p>
              <div className="flex justify-center">
                <ElementBadge
                  element={result.secondaryElement}
                  score={result.secondaryScore}
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 레이더 차트 ── */}
      <div className="rounded-2xl ds-glass p-5">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-4 text-center">
          오행 분포
        </p>
        <ElementRadar scores={result.elementScores} />
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {result.elementScores.map((s) => (
            <span
              key={s.element}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${ELEMENTS[s.element].color}15`,
                color: ELEMENTS[s.element].color,
              }}
            >
              {ELEMENT_KO[s.element]} {s.score}%
            </span>
          ))}
        </div>
      </div>

      {/* ── 오행 설명 ── */}
      <ElementDescription element={result.primaryElement} />

      {/* ── 세부 분석 ── */}
      <div className="rounded-2xl ds-glass p-5">
        <FeatureBreakdown result={result} />
      </div>
    </div>
  );
}
