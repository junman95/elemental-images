"use client";

import { AnalysisStep } from "@/types/analysis";

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

const STEP_ORDER = [
  "detecting-face",
  "extracting-features",
  "analyzing-ai",
  "saving-result",
  "complete",
];

function getStepStatus(
  stepKey: string,
  currentStep: AnalysisStep
): "pending" | "active" | "complete" {
  const currentIdx = STEP_ORDER.indexOf(currentStep);
  const stepIdx = STEP_ORDER.indexOf(stepKey);
  if (stepIdx < currentIdx) return "complete";
  if (stepIdx === currentIdx) return "active";
  return "pending";
}

export default function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  return (
    <div className="space-y-2.5 py-3">
      {STEPS.map((step, idx) => {
        const status = getStepStatus(step.key, currentStep);
        return (
          <div key={step.key} className="flex items-center gap-3">
            {/* 상태 아이콘 */}
            <div className="relative shrink-0 w-7 h-7">
              {status === "complete" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#13ec5b]">
                  {/* Check SVG */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#102216" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              {status === "active" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#13ec5b] bg-[rgba(19,236,91,0.08)]">
                  {/* Spinner SVG */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#13ec5b" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </div>
              )}
              {status === "pending" && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center border border-[rgba(26,46,26,0.12)] bg-[rgba(26,46,26,0.04)]">
                  <span className="text-[11px] font-medium text-[#8aaa8a]">{idx + 1}</span>
                </div>
              )}
            </div>

            {/* 레이블 */}
            <span
              className={`text-sm transition-colors duration-300 ${
                status === "complete"
                  ? "text-[#13ec5b] font-medium"
                  : status === "active"
                  ? "text-[#1a2e1a] font-semibold"
                  : "text-[#8aaa8a]"
              }`}
            >
              {step.label}
            </span>

            {/* active 펄스 표시 */}
            {status === "active" && (
              <span className="ml-auto text-[11px] text-[#13ec5b] font-medium animate-pulse">
                처리 중
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
