import { cn } from "@/lib/utils";

type DsCardVariant = "glass" | "glass-subtle" | "glass-primary" | "surface" | "featured";

interface DsCardProps {
  variant?: DsCardVariant;
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

const variantStyles: Record<DsCardVariant, string> = {
  /** 기본 글래스 카드 — 흰 반투명 + backdrop blur */
  glass:
    "bg-white/65 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(26,46,26,0.07)]",
  /** 더 투명한 글래스 */
  "glass-subtle":
    "bg-white/45 backdrop-blur-sm border border-white/60 shadow-[0_2px_12px_rgba(26,46,26,0.05)]",
  /** 초록 틴트 글래스 */
  "glass-primary":
    "bg-[rgba(19,236,91,0.06)] backdrop-blur-sm border border-[rgba(19,236,91,0.18)]",
  /** 불투명 서피스 */
  surface:
    "bg-[#f6f8f6] border border-[rgba(26,46,26,0.08)]",
  /** 피쳐드 아이템 — primary 틴트 */
  featured:
    "bg-[rgba(19,236,91,0.05)] backdrop-blur-sm border border-[rgba(19,236,91,0.12)] shadow-[0_2px_12px_rgba(19,236,91,0.06)]",
};

export default function DsCard({
  variant = "glass",
  className,
  children,
  hover = false,
}: DsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variantStyles[variant],
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,46,26,0.12)] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

/** 카드 내부 섹션 구분용 */
export function DsCardSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("pt-4 mt-4 border-t border-[rgba(26,46,26,0.07)]", className)}>
      {children}
    </div>
  );
}
