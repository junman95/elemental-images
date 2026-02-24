"use client";

import { useState, useEffect } from "react";
import { AdFormat } from "./AdSlot";

interface PlaceholderAdProps {
  format: AdFormat;
  className?: string;
}

const TIPS = [
  {
    emoji: "🌳",
    text: "오행은 약 2,500년 전 중국 전국시대에 체계화되었습니다",
    color: "#22c55e",
  },
  {
    emoji: "🔥",
    text: "한의학에서 목(木)은 간, 화(火)는 심장과 연결됩니다",
    color: "#ef4444",
  },
  {
    emoji: "🍂",
    text: "봄은 목(木), 여름은 화(火), 가을은 금(金), 겨울은 수(水)의 계절입니다",
    color: "#eab308",
  },
  {
    emoji: "⚖️",
    text: "오행의 상생 순서: 목→화→토→금→수→목 순으로 서로를 생(生)합니다",
    color: "#a1a1aa",
  },
  {
    emoji: "💧",
    text: "관상학에서 얼굴의 오행은 성격, 건강, 운세와 연결된다고 봅니다",
    color: "#3b82f6",
  },
];

export default function PlaceholderAd({
  format,
  className = "",
}: PlaceholderAdProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TIPS.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tip = TIPS[currentIndex];

  const sizeClasses =
    format === "banner"
      ? "max-w-[320px] min-h-[100px]"
      : "max-w-[300px] min-h-[250px]";

  return (
    <div
      className={`mx-auto rounded-xl border overflow-hidden ${sizeClasses} ${className}`}
      style={{ backgroundColor: `${tip.color}08`, borderColor: `${tip.color}30` }}
    >
      {/* AD badge */}
      <div className="flex justify-end px-2 pt-1.5">
        <span className="text-[10px] text-muted-foreground/60 bg-muted/50 px-1.5 py-0.5 rounded">
          AD
        </span>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col items-center justify-center px-6 pb-4 ${
          format === "banner" ? "pt-1" : "pt-6"
        } transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <span className={format === "banner" ? "text-2xl mb-1" : "text-4xl mb-4"}>
          {tip.emoji}
        </span>
        <p
          className={`text-center leading-relaxed ${
            format === "banner" ? "text-xs" : "text-sm"
          }`}
          style={{ color: `${tip.color}cc` }}
        >
          {tip.text}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pb-3">
        {TIPS.map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentIndex ? tip.color : `${tip.color}30`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
