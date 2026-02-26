import { cn } from "@/lib/utils";

export type SpinnerSize  = "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "gold" | "muted" | "white";

export interface LoadingSpinnerProps {
  size?:  SpinnerSize;
  color?: SpinnerColor;
  /** sr-only 접근성 레이블 */
  label?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4  h-4  border-2",
  md: "w-8  h-8  border-2",
  lg: "w-12 h-12 border-[3px]",
  xl: "w-16 h-16 border-4",
};

const colorMap: Record<SpinnerColor, { track: string; head: string }> = {
  primary: {
    track: "border-[rgba(19,236,91,0.2)]",
    head:  "border-t-[#13ec5b]",
  },
  gold: {
    track: "border-[rgba(212,175,55,0.2)]",
    head:  "border-t-[#d4af37]",
  },
  muted: {
    track: "border-[rgba(26,46,26,0.1)]",
    head:  "border-t-[#8aaa8a]",
  },
  white: {
    track: "border-white/20",
    head:  "border-t-white",
  },
};

export default function LoadingSpinner({
  size  = "md",
  color = "primary",
  label = "로딩 중...",
  className,
}: LoadingSpinnerProps) {
  const { track, head } = colorMap[color];

  return (
    <span
      role="status"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn(
          "block rounded-full animate-spin",
          sizeMap[size],
          track,
          head
        )}
      />
    </span>
  );
}
