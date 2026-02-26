"use client";

import { AnalysisResult } from "@/types/analysis";

interface FeatureBreakdownProps {
  result: AnalysisResult;
}

const FEATURE_LABELS: Record<string, string> = {
  faceShape: "얼굴형",
  jawline: "턱선",
  forehead: "이마",
  cheekbones: "광대뼈",
  chin: "턱",
  overallImpression: "종합 인상",
};

export default function FeatureBreakdown({ result }: FeatureBreakdownProps) {
  const features = Object.entries(result.featureDetails).filter(
    ([, value]) => value
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37]">
        세부 분석
      </h3>

      {result.analysisText && (
        <p className="text-sm leading-relaxed text-[#4a664a] bg-[rgba(26,46,26,0.04)] rounded-xl p-4 border border-[rgba(26,46,26,0.06)]">
          {result.analysisText}
        </p>
      )}

      <div className="space-y-2.5">
        {features.map(([key, value]) => (
          <div key={key} className="flex gap-3 text-sm">
            <span className="font-bold text-xs text-[#8aaa8a] w-16 shrink-0 pt-0.5">
              {FEATURE_LABELS[key] || key}
            </span>
            <span className="text-[#4a664a] text-xs leading-relaxed">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
