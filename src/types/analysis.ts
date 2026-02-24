import type { ElementType } from "./elements";

export interface FacialMeasurements {
	faceWidthToHeightRatio: number;
	jawToForeheadRatio: number;
	foreheadHeightRatio: number;
	chinAngle: number;
	chinRoundness: number;
	cheekboneProminence: number;
	jawAngularity: number;
	facialSymmetry: number;
	faceShapeCategory: "long" | "oval" | "round" | "square" | "heart" | "diamond";
}

export interface ElementScore {
	element: ElementType;
	score: number;
	confidence: number;
}

export interface AnalysisResult {
	primaryElement: ElementType;
	primaryScore: number;
	secondaryElement: ElementType;
	secondaryScore: number;
	elementScores: ElementScore[];
	measurements: FacialMeasurements;
	analysisText: string;
	featureDetails: {
		faceShape: string;
		jawline: string;
		forehead: string;
		cheekbones: string;
		chin: string;
		overallImpression: string;
	};
	timestamp: string;
}

/** Redis에 저장되는 공유용 결과 */
export interface SharedResult {
	result: AnalysisResult;
	thumbnailBase64: string; // WebP 512px base64
	createdAt: string; // ISO 8601
}

export interface AnalyzeRequest {
	imageBase64: string;
	mediaType: "image/jpeg" | "image/png" | "image/webp";
	measurements: FacialMeasurements;
	preClassification: ElementScore[];
	imageHash?: string; // SHA-256 해시 (캐싱용)
	thumbnailBase64?: string; // WebP 512px 썸네일 (공유용)
}

export interface AnalyzeResponse {
	success: boolean;
	result?: AnalysisResult;
	resultId?: string; // nanoid (공유 링크용)
	cached?: boolean; // 캐시 히트 여부
	error?: string;
}

export type AnalysisStep =
	| "idle"
	| "uploading"
	| "detecting-face"
	| "extracting-features"
	| "analyzing-ai"
	| "saving-result"
	| "complete"
	| "error";

export interface AnalysisState {
	step: AnalysisStep;
	progress: number;
	imageFile: File | null;
	imagePreviewUrl: string | null;
	result: AnalysisResult | null;
	resultId: string | null;
	error: string | null;
}
