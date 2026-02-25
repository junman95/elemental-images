import { cn } from "@/lib/utils";
import type { ElementType } from "@/types/elements";

const ELEMENT_CONFIG: Record<
  ElementType,
  { label: string; hanja: string; color: string; bg: string; border: string }
> = {
  wood: {
    label: "목",
    hanja: "木",
    color: "#166534",
    bg: "rgba(34, 197, 94, 0.1)",
    border: "rgba(34, 197, 94, 0.3)",
  },
  fire: {
    label: "화",
    hanja: "火",
    color: "#991b1b",
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.3)",
  },
  earth: {
    label: "토",
    hanja: "土",
    color: "#854d0e",
    bg: "rgba(234, 179, 8, 0.1)",
    border: "rgba(234, 179, 8, 0.3)",
  },
  metal: {
    label: "금",
    hanja: "金",
    color: "#3f3f46",
    bg: "rgba(161, 161, 170, 0.12)",
    border: "rgba(161, 161, 170, 0.3)",
  },
  water: {
    label: "수",
    hanja: "水",
    color: "#1e40af",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.3)",
  },
};

type ElementTagSize = "xs" | "sm" | "md" | "lg";

interface ElementTagProps {
  element: ElementType;
  size?: ElementTagSize;
  showHanja?: boolean;
  className?: string;
}

const sizeStyles: Record<ElementTagSize, string> = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-1.5 text-sm",
  lg: "px-5 py-2 text-base",
};

export default function ElementTag({
  element,
  size = "sm",
  showHanja = true,
  className,
}: ElementTagProps) {
  const cfg = ELEMENT_CONFIG[element];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold backdrop-blur-sm",
        sizeStyles[size],
        className
      )}
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {showHanja && <span className="font-display">{cfg.hanja}</span>}
      {cfg.label}
    </span>
  );
}

/** 오행 5개 전체를 가로로 나열 */
export function ElementTagRow({
  className,
}: {
  className?: string;
}) {
  const elements: ElementType[] = ["wood", "fire", "earth", "metal", "water"];
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {elements.map((el) => (
        <ElementTag key={el} element={el} size="sm" />
      ))}
    </div>
  );
}
