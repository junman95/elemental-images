import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  /** 중앙 장식 기호 종류 */
  ornament?: "diamond" | "star" | "dot" | "none";
  /** 색상 테마 */
  color?: "gold" | "primary" | "subtle";
}

const ornamentMap = {
  diamond: "✦",
  star: "★",
  dot: "•",
  none: null,
};

const colorMap = {
  gold: {
    line: "rgba(212, 175, 55, 0.3)",
    text: "#d4af37",
  },
  primary: {
    line: "rgba(19, 236, 91, 0.25)",
    text: "#13ec5b",
  },
  subtle: {
    line: "rgba(26, 46, 26, 0.1)",
    text: "#8aaa8a",
  },
};

export default function Divider({
  className,
  ornament = "diamond",
  color = "gold",
}: DividerProps) {
  const { line, text } = colorMap[color];
  const symbol = ornamentMap[ornament];

  return (
    <div className={cn("flex items-center gap-4 w-full", className)}>
      <div className="flex-1 h-px" style={{ backgroundColor: line }} />
      {symbol && (
        <span className="text-xs shrink-0" style={{ color: text }}>
          {symbol}
        </span>
      )}
      <div className="flex-1 h-px" style={{ backgroundColor: line }} />
    </div>
  );
}
