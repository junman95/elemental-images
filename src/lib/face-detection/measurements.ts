import type { FacialMeasurements } from "@/types/analysis";
import type { FaceDetectionResult, Point2D } from "@/types/landmarks";

function distance(a: Point2D, b: Point2D): number {
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function midpoint(a: Point2D, b: Point2D): Point2D {
	return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function angleBetween(a: Point2D, vertex: Point2D, b: Point2D): number {
	const v1 = { x: a.x - vertex.x, y: a.y - vertex.y };
	const v2 = { x: b.x - vertex.x, y: b.y - vertex.y };
	const dot = v1.x * v2.x + v1.y * v2.y;
	const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
	const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
	const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
	return (Math.acos(cosAngle) * 180) / Math.PI;
}

function curvature(points: Point2D[]): number {
	if (points.length < 3) return 0;
	let totalAngle = 0;
	for (let i = 1; i < points.length - 1; i++) {
		totalAngle += 180 - angleBetween(points[i - 1], points[i], points[i + 1]);
	}
	return totalAngle / (points.length - 2) / 180;
}

export function calculateMeasurements(
	result: FaceDetectionResult,
): FacialMeasurements {
	const { landmarks, detection } = result;
	const jaw = landmarks.jawOutline;

	// Face width (ear to ear along jaw)
	const faceWidth = distance(jaw[0], jaw[16]);

	// Face height (eyebrow top to chin)
	const browMid = midpoint(landmarks.leftEyebrow[0], landmarks.rightEyebrow[4]);
	const chin = jaw[8];
	const faceHeight = distance(browMid, chin);

	// Width-to-height ratio
	const faceWidthToHeightRatio = faceWidth / faceHeight;

	// Jaw width (mid-jaw) vs forehead width
	const jawWidth = distance(jaw[4], jaw[12]);
	const foreheadWidth = distance(
		landmarks.leftEyebrow[0],
		landmarks.rightEyebrow[4],
	);
	const jawToForeheadRatio = jawWidth / foreheadWidth;

	// Forehead height ratio
	const foreheadHeight = Math.abs(browMid.y - detection.box.y);
	const totalFaceHeight = detection.box.height;
	const foreheadHeightRatio = foreheadHeight / totalFaceHeight;

	// Chin angle (pointed vs rounded)
	const chinAngle = angleBetween(jaw[6], jaw[8], jaw[10]);

	// Chin roundness (curvature of jaw points 5-11)
	const chinRoundness = curvature(jaw.slice(5, 12));

	// Cheekbone prominence
	const cheekboneWidth = distance(jaw[1], jaw[15]);
	const cheekboneProminence =
		cheekboneWidth / Math.max(jawWidth, foreheadWidth);

	// Jaw angularity
	const leftJawAngle = angleBetween(jaw[2], jaw[4], jaw[6]);
	const rightJawAngle = angleBetween(jaw[10], jaw[12], jaw[14]);
	const jawAngularity = (180 - leftJawAngle + (180 - rightJawAngle)) / 2 / 90;

	// Facial symmetry
	const centerX = chin.x;
	const leftDistances = [
		Math.abs(jaw[0].x - centerX),
		Math.abs(landmarks.leftEye[0].x - centerX),
		Math.abs(landmarks.leftEyebrow[0].x - centerX),
	];
	const rightDistances = [
		Math.abs(jaw[16].x - centerX),
		Math.abs(landmarks.rightEye[3].x - centerX),
		Math.abs(landmarks.rightEyebrow[4].x - centerX),
	];
	let symmetrySum = 0;
	for (let i = 0; i < leftDistances.length; i++) {
		const diff = Math.abs(leftDistances[i] - rightDistances[i]);
		symmetrySum += diff / faceWidth;
	}
	const facialSymmetry = Math.max(0, 1 - symmetrySum / leftDistances.length);

	// Determine face shape category
	const faceShapeCategory = classifyFaceShape(
		faceWidthToHeightRatio,
		jawToForeheadRatio,
		chinAngle,
		cheekboneProminence,
		jawAngularity,
	);

	return {
		faceWidthToHeightRatio,
		jawToForeheadRatio,
		foreheadHeightRatio,
		chinAngle,
		chinRoundness,
		cheekboneProminence,
		jawAngularity,
		facialSymmetry,
		faceShapeCategory,
	};
}

function classifyFaceShape(
	widthHeightRatio: number,
	jawForeheadRatio: number,
	chinAngle: number,
	cheekboneProminence: number,
	jawAngularity: number,
): FacialMeasurements["faceShapeCategory"] {
	if (widthHeightRatio < 0.75) return "long";
	if (jawForeheadRatio < 0.82 && chinAngle < 120) return "heart";
	if (cheekboneProminence > 1.08 && jawForeheadRatio < 0.9) return "diamond";
	if (widthHeightRatio > 0.92 && jawAngularity > 0.5) return "square";
	if (widthHeightRatio > 0.92) return "round";
	return "oval";
}
