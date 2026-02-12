"use client";

import { ELEMENTS } from "@/lib/constants/elements";
import { ElementType } from "@/types/elements";

interface ElementDescriptionProps {
  element: ElementType;
}

export default function ElementDescription({
  element,
}: ElementDescriptionProps) {
  const info = ELEMENTS[element];

  return (
    <div className={`rounded-xl p-5 ${info.bgColor} ${info.borderColor} border`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{info.hanja}</span>
        <h3 className="text-lg font-bold">{info.nameKo} 유형</h3>
      </div>

      <p className="text-sm leading-relaxed text-foreground/80 mb-4">
        {info.description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold mb-1.5">얼굴 특징</h4>
          <ul className="space-y-0.5 text-foreground/70">
            {info.faceCharacteristics.map((c, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="shrink-0 mt-1">·</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1.5">성격 특성</h4>
          <ul className="space-y-0.5 text-foreground/70">
            {info.personalityTraits.map((t, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="shrink-0 mt-1">·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-4 mt-4 pt-3 border-t text-xs text-foreground/60">
        <span>계절: {info.season}</span>
        <span>방위: {info.direction}</span>
        <span>오장: {info.organ}</span>
      </div>
    </div>
  );
}
