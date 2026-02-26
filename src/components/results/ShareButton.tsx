"use client";

import { useState, useCallback } from "react";

interface ShareButtonProps {
  resultId: string;
}

export default function ShareButton({ resultId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/result/${resultId}`;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "오행 얼굴형 분석 결과",
          text: "나의 오행 얼굴형 분석 결과를 확인해보세요!",
          url,
        });
        return;
      } catch {
        // 취소 시 clipboard 폴백
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("공유 링크를 복사하세요:", url);
    }
  }, [resultId]);

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 bg-[#13ec5b] text-[#102216] hover:bg-[#0db849] shadow-[0_4px_16px_rgba(19,236,91,0.25)] hover:shadow-[0_4px_20px_rgba(19,236,91,0.4)]"
    >
      {copied ? (
        <>
          {/* Check */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          링크 복사됨!
        </>
      ) : (
        <>
          {canShare ? (
            /* Share */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          ) : (
            /* Copy */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          공유하기
        </>
      )}
    </button>
  );
}
