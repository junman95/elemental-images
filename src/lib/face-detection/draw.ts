import { FaceLandmarkData, Point2D } from "@/types/landmarks";

interface DrawOptions {
  pointSize?: number;
  lineWidth?: number;
  showLabels?: boolean;
}

const REGION_COLORS: Record<string, string> = {
  jaw: "#22c55e",
  leftEyebrow: "#eab308",
  rightEyebrow: "#eab308",
  leftEye: "#3b82f6",
  rightEye: "#3b82f6",
  noseBridge: "#a855f7",
  noseBottom: "#a855f7",
  outerLip: "#ef4444",
  innerLip: "#f97316",
};

function drawPoints(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  color: string,
  size: number
) {
  ctx.fillStyle = color;
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  color: string,
  lineWidth: number,
  close: boolean = false
) {
  if (points.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  if (close) ctx.closePath();
  ctx.stroke();
}

export function drawLandmarks(
  canvas: HTMLCanvasElement,
  landmarks: FaceLandmarkData,
  options: DrawOptions = {}
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { pointSize = 2, lineWidth = 1 } = options;

  const regions: { key: string; points: Point2D[]; close: boolean }[] = [
    { key: "jaw", points: landmarks.jawOutline, close: false },
    { key: "leftEyebrow", points: landmarks.leftEyebrow, close: false },
    { key: "rightEyebrow", points: landmarks.rightEyebrow, close: false },
    { key: "noseBridge", points: landmarks.noseBridge, close: false },
    { key: "noseBottom", points: landmarks.noseBottom, close: false },
    { key: "leftEye", points: landmarks.leftEye, close: true },
    { key: "rightEye", points: landmarks.rightEye, close: true },
    { key: "outerLip", points: landmarks.outerLip, close: true },
    { key: "innerLip", points: landmarks.innerLip, close: true },
  ];

  for (const region of regions) {
    const color = REGION_COLORS[region.key] || "#ffffff";
    drawLines(ctx, region.points, color, lineWidth, region.close);
    drawPoints(ctx, region.points, color, pointSize);
  }
}
