"use client";

import { AnalysisResult } from "@/types/analysis";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ElementBadge from "./ElementBadge";
import ElementRadar from "./ElementRadar";
import ElementDescription from "./ElementDescription";
import FeatureBreakdown from "./FeatureBreakdown";

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="space-y-4">
      {/* Primary result */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              당신의 오행 유형은
            </p>
            <div className="flex justify-center">
              <ElementBadge
                element={result.primaryElement}
                score={result.primaryScore}
                size="lg"
              />
            </div>
          </div>

          {result.secondaryElement !== result.primaryElement && (
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground mb-1">보조 유형</p>
              <ElementBadge
                element={result.secondaryElement}
                score={result.secondaryScore}
                size="sm"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Radar chart */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold text-base text-center mb-2">오행 분포</h3>
          <ElementRadar scores={result.elementScores} />
          <div className="flex justify-center gap-3 mt-3 flex-wrap">
            {result.elementScores.map((s) => (
              <span
                key={s.element}
                className="text-xs px-2 py-1 rounded-full bg-muted"
              >
                {s.element === "wood" && "목"}
                {s.element === "fire" && "화"}
                {s.element === "earth" && "토"}
                {s.element === "metal" && "금"}
                {s.element === "water" && "수"}{" "}
                {s.score}%
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Element description */}
      <ElementDescription element={result.primaryElement} />

      {/* Feature breakdown */}
      <Card>
        <CardContent className="pt-6">
          <FeatureBreakdown result={result} />
        </CardContent>
      </Card>
    </div>
  );
}
