"use client";

import { useEffect, useRef } from "react";
import { AdFormat } from "./AdSlot";

interface GoogleAdProps {
  format: AdFormat;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const AD_SIZES: Record<AdFormat, { width: number; height: number }> = {
  banner: { width: 320, height: 100 },
  rectangle: { width: 300, height: 250 },
};

export default function GoogleAd({ format, className = "" }: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT || "";

  useEffect(() => {
    if (!adClient || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, [adClient, adSlot]);

  const size = AD_SIZES[format];

  if (!adClient || !adSlot) {
    return (
      <div
        className={`mx-auto flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-lg text-xs text-muted-foreground ${className}`}
        style={{ width: size.width, height: size.height }}
      >
        AdSense 미설정
      </div>
    );
  }

  return (
    <div className={`mx-auto ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: size.width, height: size.height }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
