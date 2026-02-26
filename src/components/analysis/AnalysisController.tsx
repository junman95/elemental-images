"use client";

import { useReducer, useCallback } from "react";
import {
  AnalysisState,
  AnalysisStep,
  AnalysisResult,
  AnalyzeResponse,
} from "@/types/analysis";
import { FaceDetectionResult } from "@/types/landmarks";
import { loadImage, prepareImageForApi } from "@/lib/utils/image";
import { computeImageHash } from "@/lib/utils/image-hash";
import { createThumbnail } from "@/lib/utils/thumbnail";
import { detectFace } from "@/lib/face-detection/detect";
import { calculateMeasurements } from "@/lib/face-detection/measurements";
import { preClassify } from "@/lib/analysis/classifier";
import ImageUploader from "@/components/upload/ImageUploader";
import ProcessingSteps from "./ProcessingSteps";
import LandmarkCanvas from "./LandmarkCanvas";
import ResultCard from "@/components/results/ResultCard";
import ShareButton from "@/components/results/ShareButton";
import AdSlot from "@/components/ad/AdSlot";

type Action =
  | { type: "SET_IMAGE"; file: File; previewUrl: string }
  | { type: "SET_STEP"; step: AnalysisStep }
  | { type: "SET_DETECTION"; detection: FaceDetectionResult }
  | { type: "SET_RESULT"; result: AnalysisResult; resultId: string | null }
  | { type: "SET_ERROR"; error: string }
  | { type: "RESET" };

const initialState: AnalysisState = {
  step: "idle",
  progress: 0,
  imageFile: null,
  imagePreviewUrl: null,
  result: null,
  resultId: null,
  error: null,
};

function reducer(state: AnalysisState, action: Action): AnalysisState {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        imageFile: action.file,
        imagePreviewUrl: action.previewUrl,
        step: "uploading",
        error: null,
        result: null,
        resultId: null,
      };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DETECTION":
      return { ...state, step: "extracting-features" };
    case "SET_RESULT":
      return {
        ...state,
        step: "complete",
        result: action.result,
        resultId: action.resultId,
      };
    case "SET_ERROR":
      return { ...state, step: "error", error: action.error };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function AnalysisController() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const detectionRef = useReducer(
    (s: FaceDetectionResult | null, a: FaceDetectionResult | null) => a,
    null
  );
  const [detectionResult, setDetectionResult] = detectionRef;

  const runAnalysis = useCallback(async (file: File) => {
    try {
      const previewUrl = URL.createObjectURL(file);
      dispatch({ type: "SET_IMAGE", file, previewUrl });

      dispatch({ type: "SET_STEP", step: "detecting-face" });
      const [img, imageHash, thumbnailBase64] = await Promise.all([
        loadImage(file),
        computeImageHash(file),
        createThumbnail(file),
      ]);

      const detection = await detectFace(img);
      setDetectionResult(detection);
      dispatch({ type: "SET_DETECTION", detection });

      const measurements = calculateMeasurements(detection);
      const preScores = preClassify(measurements);

      dispatch({ type: "SET_STEP", step: "analyzing-ai" });
      const { base64, mediaType } = await prepareImageForApi(file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          mediaType,
          measurements,
          preClassification: preScores,
          imageHash,
          thumbnailBase64,
        }),
      });

      const data: AnalyzeResponse = await response.json();

      if (!data.success || !data.result) {
        throw new Error(data.error || "분석에 실패했습니다.");
      }

      dispatch({ type: "SET_STEP", step: "saving-result" });
      await new Promise((resolve) => setTimeout(resolve, 800));

      dispatch({
        type: "SET_RESULT",
        result: data.result,
        resultId: data.resultId || null,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      dispatch({ type: "SET_ERROR", error: message });
    }
  }, [setDetectionResult]);

  const handleReset = useCallback(() => {
    setDetectionResult(null);
    dispatch({ type: "RESET" });
  }, [setDetectionResult]);

  const isProcessing =
    state.step === "detecting-face" ||
    state.step === "extracting-features" ||
    state.step === "analyzing-ai" ||
    state.step === "saving-result";

  return (
    <div className="space-y-4">
      {/* ── 업로드 ── */}
      {state.step === "idle" && (
        <ImageUploader onImageSelected={runAnalysis} />
      )}

      {/* ── 처리 중 ── */}
      {isProcessing && (
        <div className="rounded-2xl ds-glass overflow-hidden">
          {state.imagePreviewUrl && (
            <div className="relative overflow-hidden max-h-56">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.imagePreviewUrl}
                alt="분석 중인 사진"
                className="w-full h-auto max-h-56 object-contain"
              />
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
            </div>
          )}
          <div className="px-5 py-4">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-3">
              분석 진행 중
            </p>
            <ProcessingSteps currentStep={state.step} />
          </div>
        </div>
      )}

      {/* ── AI 분석/저장 중 광고 ── */}
      {(state.step === "analyzing-ai" || state.step === "saving-result") && (
        <AdSlot format="rectangle" />
      )}

      {/* ── 에러 ── */}
      {state.step === "error" && (
        <div className="rounded-2xl ds-glass overflow-hidden border-l-[3px] border-l-[#ef4444]">
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              {/* 에러 아이콘 */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(239,68,68,0.1)] shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a2e1a] mb-0.5">분석 오류</p>
                <p className="text-sm text-[#4a664a]">{state.error}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[rgba(26,46,26,0.15)] text-[#4a664a] hover:border-[#13ec5b] hover:text-[#13ec5b] transition-all duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              다시 시도
            </button>
          </div>
        </div>
      )}

      {/* ── 결과 ── */}
      {state.step === "complete" && state.result && (
        <>
          {/* 랜드마크 오버레이 */}
          {state.imagePreviewUrl && detectionResult && (
            <div className="rounded-2xl ds-glass overflow-hidden">
              <div className="px-5 pt-4 pb-1">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  얼굴 랜드마크
                </p>
              </div>
              <div className="p-4">
                <LandmarkCanvas
                  imageUrl={state.imagePreviewUrl}
                  landmarks={detectionResult.landmarks}
                  imageWidth={detectionResult.imageWidth}
                  imageHeight={detectionResult.imageHeight}
                />
              </div>
            </div>
          )}

          <ResultCard result={state.result} />

          {/* 공유 + 다시하기 */}
          <div className="flex justify-center gap-3 pt-2">
            {state.resultId && <ShareButton resultId={state.resultId} />}
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-[rgba(26,46,26,0.15)] text-[#4a664a] hover:border-[#13ec5b] hover:text-[#13ec5b] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              다시 분석하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
