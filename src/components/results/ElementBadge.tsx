"use client";

import { ELEMENTS } from "@/lib/constants/elements";
import { ElementType } from "@/types/elements";

interface ElementBadgeProps {
  element: ElementType;
  score: number;
  size?: "sm" | "lg";
}

export default function ElementBadge({
  element,
  score,
  size = "lg",
}: ElementBadgeProps) {
  const info = ELEMENTS[element];

  const sizeClasses = {
    sm: "w-16 h-16 text-xl",
    lg: "w-28 h-28 text-4xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`
          ${sizeClasses[size]} rounded-full flex items-center justify-center
          border-4 shadow-lg transition-transform hover:scale-105
        `}
        style={{
          borderColor: info.color,
          backgroundColor: `${info.color}15`,
        }}
      >
        <span>{info.hanja}</span>
      </div>
      <div className="text-center">
        <p className={`font-bold ${size === "lg" ? "text-lg" : "text-sm"}`}>
          {info.nameKo}
        </p>
        {size === "lg" && (
          <p className="text-2xl font-bold" style={{ color: info.color }}>
            {score}%
          </p>
        )}
        {size === "sm" && (
          <p className="text-xs text-muted-foreground">{score}%</p>
        )}
      </div>
    </div>
  );
}
