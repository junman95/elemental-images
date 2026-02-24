"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  resultId: string;
}

export default function ShareButton({ resultId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/result/${resultId}`
    : `/result/${resultId}`;

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/result/${resultId}`;

    // Web Share API (모바일 우선)
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "오행 얼굴형 분석 결과",
          text: "나의 오행 얼굴형 분석 결과를 확인해보세요!",
          url,
        });
        return;
      } catch {
        // 사용자가 공유 취소한 경우 → clipboard 폴백
      }
    }

    // Clipboard 폴백
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 최후의 수단: prompt
      window.prompt("공유 링크를 복사하세요:", url);
    }
  }, [resultId]);

  return (
    <Button
      onClick={handleShare}
      variant="default"
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          링크 복사됨!
        </>
      ) : (
        <>
          {canShare ? (
            <Share2 className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          공유하기
        </>
      )}
    </Button>
  );
}
