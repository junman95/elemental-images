import { cn } from "@/lib/utils";
import type { ElementType } from "@/types/elements";

export type ThumbnailSize = "sm" | "md" | "lg" | "xl";
export type ThumbnailType = "circle" | "square";
export type ThumbnailFrame = "none" | "gold" | "primary" | "element";

export interface ThumbnailProps {
  src?: string;
  alt?: string;
  size?: ThumbnailSize;
  type?: ThumbnailType;
  frame?: ThumbnailFrame;
  /** frame="element" 일 때 사용할 오행 요소 */
  element?: ElementType;
  /** 이미지 없을 때 보여줄 텍스트 (이니셜 등) */
  fallback?: string;
  className?: string;
}

const SIZE_MAP: Record<ThumbnailSize, { px: number; text: string }> = {
  sm: { px: 48,  text: "text-base" },
  md: { px: 72,  text: "text-xl"  },
  lg: { px: 96,  text: "text-2xl" },
  xl: { px: 128, text: "text-4xl" },
};

const ELEMENT_FRAME: Record<ElementType, string> = {
  wood:  "#22c55e",
  fire:  "#ef4444",
  earth: "#eab308",
  metal: "#a1a1aa",
  water: "#3b82f6",
};

function getFrameStyle(frame: ThumbnailFrame, element?: ElementType): React.CSSProperties {
  if (frame === "gold")
    return { boxShadow: "0 0 0 3px #d4af37, 0 4px 20px rgba(212,175,55,0.3)" };
  if (frame === "primary")
    return { boxShadow: "0 0 0 3px #13ec5b, 0 4px 20px rgba(19,236,91,0.3)" };
  if (frame === "element" && element) {
    const c = ELEMENT_FRAME[element];
    return { boxShadow: `0 0 0 3px ${c}, 0 4px 20px ${c}50` };
  }
  return {};
}

export default function Thumbnail({
  src,
  alt = "",
  size = "md",
  type = "circle",
  frame = "none",
  element,
  fallback,
  className,
}: ThumbnailProps) {
  const { px, text } = SIZE_MAP[size];
  const radius = type === "circle" ? "9999px" : "12px";
  const frameStyle = getFrameStyle(frame, element);

  return (
    <div
      className={cn("relative inline-flex shrink-0 overflow-hidden", className)}
      style={{ width: px, height: px, borderRadius: radius, ...frameStyle }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ borderRadius: radius }}
        />
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center",
            "bg-[rgba(19,236,91,0.08)] text-[#4a664a] font-display font-bold select-none",
            text
          )}
          style={{ borderRadius: radius }}
        >
          {fallback ?? "?"}
        </div>
      )}
    </div>
  );
}
