"use client";

import { AnalysisStep } from "@/types/analysis";
import { Check, Loader2 } from "lucide-react";

interface ProcessingStepsProps {
  currentStep: AnalysisStep;
}

const STEPS = [
  { key: "detecting-face" as const, label: "얼굴 감지 중..." },
  { key: "extracting-features" as const, label: "특징 추출 중..." },
  { key: "analyzing-ai" as const, label: "AI 분석 중..." },
  { key: "saving-result" as const, label: "공유 링크 생성 중..." },
  { key: "complete" as const, label: "분석 완료!" },
];

function getStepStatus(
  stepKey: string,
  currentStep: AnalysisStep
): "pending" | "active" | "complete" {
  const stepOrder = ["detecting-face", "extracting-features", "analyzing-ai", "saving-result", "complete"];
  const currentIdx = stepOrder.indexOf(currentStep);
  const stepIdx = stepOrder.indexOf(stepKey);

  if (stepIdx < currentIdx) return "complete";
  if (stepIdx === currentIdx) return "active";
  return "pending";
}

export default function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  return (
    <div className="space-y-3 py-4">
      {STEPS.map((step) => {
        const status = getStepStatus(step.key, currentStep);
        return (
          <div key={step.key} className="flex items-center gap-3">
            <div
              className={`
                w-7 h-7 rounded-full flex items-center justify-center shrink-0
                transition-all duration-300
                ${status === "complete" ? "bg-green-500 text-white" : ""}
                ${status === "active" ? "bg-primary text-primary-foreground" : ""}
                ${status === "pending" ? "bg-muted text-muted-foreground" : ""}
              `}
            >
              {status === "complete" && <Check className="w-4 h-4" />}
              {status === "active" && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {status === "pending" && (
                <span className="text-xs">
                  {STEPS.findIndex((s) => s.key === step.key) + 1}
                </span>
              )}
            </div>
            <span
              className={`text-sm transition-colors ${
                status === "pending" ? "text-muted-foreground" : "text-foreground"
              } ${status === "active" ? "font-medium" : ""}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
