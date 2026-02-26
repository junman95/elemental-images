"use client";

import { ELEMENTS } from "@/lib/constants/elements";
import { ElementType } from "@/types/elements";

interface ElementDescriptionProps {
  element: ElementType;
}

export default function ElementDescription({ element }: ElementDescriptionProps) {
  const info = ELEMENTS[element];

  return (
    <div
      className="rounded-2xl ds-glass overflow-hidden"
      style={{ borderLeft: `3px solid ${info.color}80` }}
    >
      {/* 헤더 */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black font-display shrink-0"
            style={{
              backgroundColor: `${info.color}15`,
              color: info.color,
              border: `1px solid ${info.color}30`,
            }}
          >
            {info.hanja}
          </div>
          <div>
            <h3 className="font-bold text-[#1a2e1a]">{info.nameKo} 유형</h3>
            <p className="text-xs text-[#8aaa8a]">{info.nameEn} · {info.season} · {info.direction} · {info.organ}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[#4a664a]">
          {info.description}
        </p>
      </div>

      {/* 구분선 */}
      <div className="h-px mx-5 bg-[rgba(26,46,26,0.07)]" />

      {/* 특징 + 성격 */}
      <div className="grid grid-cols-2 gap-4 px-5 py-4 text-sm">
        <div>
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#d4af37] mb-2.5">
            얼굴 특징
          </h4>
          <ul className="space-y-1.5">
            {info.faceCharacteristics.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[#4a664a]">
                <span className="shrink-0 mt-0.5" style={{ color: info.color }}>✦</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-[#d4af37] mb-2.5">
            성격 특성
          </h4>
          <ul className="space-y-1.5">
            {info.personalityTraits.map((t, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-[#4a664a]">
                <span className="shrink-0 mt-0.5" style={{ color: info.color }}>✦</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
