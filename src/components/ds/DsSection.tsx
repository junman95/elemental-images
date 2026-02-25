import { cn } from "@/lib/utils";

export type DsSectionSize = "sm" | "md" | "lg" | "xl";
export type DsSectionVariant = "default" | "glass" | "surface" | "primary";

export interface DsSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** 헤더 우측 액션 영역 */
  headerAction?: React.ReactNode;
  children?: React.ReactNode;
  size?: DsSectionSize;
  variant?: DsSectionVariant;
  divider?: boolean;
  className?: string;
}

const sizeConfig: Record<
  DsSectionSize,
  { padding: string; eyebrow: string; title: string; desc: string; gap: string; headerGap: string }
> = {
  sm: {
    padding:   "p-4",
    eyebrow:   "text-[10px] tracking-[0.25em]",
    title:     "text-base",
    desc:      "text-xs",
    gap:       "gap-1.5",
    headerGap: "mb-3",
  },
  md: {
    padding:   "p-6",
    eyebrow:   "text-xs tracking-[0.3em]",
    title:     "text-xl",
    desc:      "text-sm",
    gap:       "gap-2",
    headerGap: "mb-4",
  },
  lg: {
    padding:   "p-8",
    eyebrow:   "text-xs tracking-[0.3em]",
    title:     "text-2xl",
    desc:      "text-base",
    gap:       "gap-2.5",
    headerGap: "mb-6",
  },
  xl: {
    padding:   "p-10",
    eyebrow:   "text-sm tracking-[0.35em]",
    title:     "text-3xl",
    desc:      "text-lg",
    gap:       "gap-3",
    headerGap: "mb-8",
  },
};

const variantStyles: Record<DsSectionVariant, string> = {
  default: "bg-transparent",
  glass:   "bg-white/65 backdrop-blur-md border border-white/80 rounded-2xl shadow-[0_4px_24px_rgba(26,46,26,0.07)]",
  surface: "bg-[#f6f8f6] border border-[rgba(26,46,26,0.08)] rounded-2xl",
  primary: "bg-[rgba(19,236,91,0.05)] backdrop-blur-sm border border-[rgba(19,236,91,0.15)] rounded-2xl",
};

export default function DsSection({
  eyebrow,
  title,
  description,
  headerAction,
  children,
  size = "md",
  variant = "default",
  divider = false,
  className,
}: DsSectionProps) {
  const cfg = sizeConfig[size];
  const hasHeader = eyebrow || title || description || headerAction;

  return (
    <div className={cn(variantStyles[variant], cfg.padding, className)}>
      {hasHeader && (
        <div className={cn("flex items-start justify-between", cfg.headerGap)}>
          <div className={cn("flex flex-col", cfg.gap)}>
            {eyebrow && (
              <span className={cn("font-bold uppercase text-[#13ec5b]", cfg.eyebrow)}>
                {eyebrow}
              </span>
            )}
            {title && (
              <div className={cn("font-display font-bold text-[#1a2e1a]", cfg.title)}>
                {title}
              </div>
            )}
            {description && (
              <p className={cn("text-[#4a664a]", cfg.desc)}>
                {description}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="shrink-0 ml-4">{headerAction}</div>
          )}
        </div>
      )}

      {hasHeader && divider && (
        <div className="border-t border-[rgba(212,175,55,0.2)] mb-4" />
      )}

      {children}
    </div>
  );
}
