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

export interface AnalyzeRequest {
	imageBase64: string;
	mediaType: "image/jpeg" | "image/png" | "image/webp";
	measurements: FacialMeasurements;
	preClassification: ElementScore[];
}

export interface AnalyzeResponse {
	success: boolean;
	result?: AnalysisResult;
	error?: string;
}

export type AnalysisStep =
	| "idle"
	| "uploading"
	| "detecting-face"
	| "extracting-features"
	| "analyzing-ai"
	| "complete"
	| "error";

export interface AnalysisState {
	step: AnalysisStep;
	progress: number;
	imageFile: File | null;
	imagePreviewUrl: string | null;
	result: AnalysisResult | null;
	error: string | null;
}
