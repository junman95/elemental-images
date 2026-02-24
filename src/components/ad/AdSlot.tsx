"use client";

import PlaceholderAd from "./PlaceholderAd";
import GoogleAd from "./GoogleAd";

export type AdFormat = "banner" | "rectangle";

interface AdSlotProps {
  format?: AdFormat;
  className?: string;
}

const AD_PROVIDER = process.env.NEXT_PUBLIC_AD_PROVIDER || "none";

export default function AdSlot({
  format = "rectangle",
  className,
}: AdSlotProps) {
  switch (AD_PROVIDER) {
    case "adsense":
      return <GoogleAd format={format} className={className} />;
    case "none":
    default:
      return <PlaceholderAd format={format} className={className} />;
  }
}
