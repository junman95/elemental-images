"use client";

import { useEffect, useRef } from "react";
import { FaceLandmarkData } from "@/types/landmarks";
import { drawLandmarks } from "@/lib/face-detection/draw";

interface LandmarkCanvasProps {
  imageUrl: string;
  landmarks: FaceLandmarkData | null;
  imageWidth: number;
  imageHeight: number;
}

export default function LandmarkCanvas({
  imageUrl,
  landmarks,
  imageWidth,
  imageHeight,
}: LandmarkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !landmarks) return;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
      drawLandmarks(canvas, landmarks, {
        pointSize: Math.max(2, imageWidth / 200),
        lineWidth: Math.max(1, imageWidth / 400),
      });
    };
    img.src = imageUrl;
  }, [imageUrl, landmarks, imageWidth, imageHeight]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-lg">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ maxHeight: "400px", objectFit: "contain" }}
      />
    </div>
  );
}
