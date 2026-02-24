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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RotateCcw } from "lucide-react";
import AdSlot from "@/components/ad/AdSlot";

type Action =
  | { type: "SET_IMAGE"; file: File; previewUrl: string }
  | { type: "SET_STEP"; step: AnalysisStep }
  | {
      type: "SET_DETECTION";
      detection: FaceDetectionResult;
    }
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
      // Set image preview
      const previewUrl = URL.createObjectURL(file);
      dispatch({ type: "SET_IMAGE", file, previewUrl });

      // Step 1: Detect face + 해시/썸네일 병렬 생성
      dispatch({ type: "SET_STEP", step: "detecting-face" });
      const [img, imageHash, thumbnailBase64] = await Promise.all([
        loadImage(file),
        computeImageHash(file),
        createThumbnail(file),
      ]);

      const detection = await detectFace(img);
      setDetectionResult(detection);
      dispatch({ type: "SET_DETECTION", detection });

      // Step 2: Calculate measurements
      const measurements = calculateMeasurements(detection);
      const preScores = preClassify(measurements);

      // Step 3: Send to AI
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

      // Step 4: 공유 링크 생성 완료
      dispatch({ type: "SET_STEP", step: "saving-result" });
      // 짧은 딜레이로 "공유 링크 생성 중..." 단계 표시 (서버에서 이미 저장 완료)
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
      {/* Upload section */}
      {state.step === "idle" && (
        <ImageUploader onImageSelected={runAnalysis} />
      )}

      {/* Processing */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            {state.imagePreviewUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={state.imagePreviewUrl}
                  alt="분석 중인 사진"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            )}
            <ProcessingSteps currentStep={state.step} />
          </CardContent>
        </Card>
      )}

      {/* Ad during AI analysis + saving result */}
      {(state.step === "analyzing-ai" || state.step === "saving-result") && (
        <AdSlot format="rectangle" />
      )}

      {/* Error */}
      {state.step === "error" && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">
                  분석 오류
                </p>
                <p className="text-sm text-muted-foreground">{state.error}</p>
              </div>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              다시 시도
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {state.step === "complete" && state.result && (
        <>
          {/* Landmark overlay */}
          {state.imagePreviewUrl && detectionResult && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-base mb-2">얼굴 랜드마크</h3>
                <LandmarkCanvas
                  imageUrl={state.imagePreviewUrl}
                  landmarks={detectionResult.landmarks}
                  imageWidth={detectionResult.imageWidth}
                  imageHeight={detectionResult.imageHeight}
                />
              </CardContent>
            </Card>
          )}

          <ResultCard result={state.result} />

          {/* Share + Reset */}
          <div className="flex justify-center gap-3 pt-2">
            {state.resultId && <ShareButton resultId={state.resultId} />}
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              다시 분석하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
