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
import { detectFace } from "@/lib/face-detection/detect";
import { calculateMeasurements } from "@/lib/face-detection/measurements";
import { preClassify } from "@/lib/analysis/classifier";
import ImageUploader from "@/components/upload/ImageUploader";
import ProcessingSteps from "./ProcessingSteps";
import LandmarkCanvas from "./LandmarkCanvas";
import ResultCard from "@/components/results/ResultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RotateCcw } from "lucide-react";

type Action =
  | { type: "SET_IMAGE"; file: File; previewUrl: string }
  | { type: "SET_STEP"; step: AnalysisStep }
  | {
      type: "SET_DETECTION";
      detection: FaceDetectionResult;
    }
  | { type: "SET_RESULT"; result: AnalysisResult }
  | { type: "SET_ERROR"; error: string }
  | { type: "RESET" };

const initialState: AnalysisState = {
  step: "idle",
  progress: 0,
  imageFile: null,
  imagePreviewUrl: null,
  result: null,
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
      };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DETECTION":
      return { ...state, step: "extracting-features" };
    case "SET_RESULT":
      return { ...state, step: "complete", result: action.result };
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

      // Step 1: Detect face
      dispatch({ type: "SET_STEP", step: "detecting-face" });
      const img = await loadImage(file);
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
        }),
      });

      const data: AnalyzeResponse = await response.json();

      if (!data.success || !data.result) {
        throw new Error(data.error || "분석에 실패했습니다.");
      }

      dispatch({ type: "SET_RESULT", result: data.result });
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
    state.step === "analyzing-ai";

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

          <div className="flex justify-center pt-2">
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
