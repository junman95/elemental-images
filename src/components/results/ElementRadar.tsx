"use client";

import { ElementScore } from "@/types/analysis";
import { ELEMENTS, ELEMENT_ORDER } from "@/lib/constants/elements";

interface ElementRadarProps {
  scores: ElementScore[];
}

export default function ElementRadar({ scores }: ElementRadarProps) {
  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2; // Start from top

  const scoreMap = Object.fromEntries(scores.map((s) => [s.element, s.score]));

  // Calculate positions for each element
  const points = ELEMENT_ORDER.map((element, i) => {
    const angle = startAngle + i * angleStep;
    const score = scoreMap[element] ?? 0;
    const r = (score / 100) * radius;
    return {
      element,
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 24) * Math.cos(angle),
      labelY: center + (radius + 24) * Math.sin(angle),
      score,
    };
  });

  // Create polygon path
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Grid lines
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {gridLevels.map((level) => {
          const gridPoints = ELEMENT_ORDER.map((_, i) => {
            const angle = startAngle + i * angleStep;
            const r = level * radius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={gridPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground/20"
            />
          );
        })}

        {/* Axis lines */}
        {ELEMENT_ORDER.map((_, i) => {
          const angle = startAngle + i * angleStep;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground/20"
            />
          );
        })}

        {/* Score polygon */}
        <polygon
          points={polygonPoints}
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Score dots */}
        {points.map((p) => (
          <circle
            key={p.element}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={ELEMENTS[p.element].color}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((p) => (
          <text
            key={`label-${p.element}`}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-xs font-medium"
          >
            {ELEMENTS[p.element].hanja}
          </text>
        ))}
      </svg>
    </div>
  );
}
