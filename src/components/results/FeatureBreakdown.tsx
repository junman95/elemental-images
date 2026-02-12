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
    <div className="space-y-3">
      <h3 className="font-bold text-base">세부 분석</h3>

      {result.analysisText && (
        <p className="text-sm leading-relaxed text-foreground/80 bg-muted/50 rounded-lg p-3">
          {result.analysisText}
        </p>
      )}

      <div className="space-y-2">
        {features.map(([key, value]) => (
          <div key={key} className="flex gap-3 text-sm">
            <span className="font-medium text-muted-foreground w-16 shrink-0">
              {FEATURE_LABELS[key] || key}
            </span>
            <span className="text-foreground/80">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
