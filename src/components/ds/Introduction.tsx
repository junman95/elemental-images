import { cn } from "@/lib/utils";

export type IntroductionSize = "sm" | "md" | "lg" | "xl";
export type IntroductionAlign = "left" | "center";

export interface IntroductionProps {
  /** 상단 작은 태그 텍스트 */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** CTA 버튼 영역 */
  actions?: React.ReactNode;
  size?: IntroductionSize;
  align?: IntroductionAlign;
  className?: string;
}

const sizeConfig: Record<
  IntroductionSize,
  { py: string; eyebrow: string; title: string; desc: string; gap: string }
> = {
  sm: {
    py:      "py-10",
    eyebrow: "text-[10px] tracking-[0.25em]",
    title:   "text-2xl md:text-3xl",
    desc:    "text-sm",
    gap:     "gap-3",
  },
  md: {
    py:      "py-16",
    eyebrow: "text-xs tracking-[0.3em]",
    title:   "text-4xl md:text-5xl",
    desc:    "text-base md:text-lg",
    gap:     "gap-4",
  },
  lg: {
    py:      "py-20 md:py-28",
    eyebrow: "text-xs tracking-[0.35em]",
    title:   "text-5xl md:text-6xl",
    desc:    "text-lg md:text-xl",
    gap:     "gap-5",
  },
  xl: {
    py:      "py-24 md:py-36",
    eyebrow: "text-sm tracking-[0.4em]",
    title:   "text-6xl md:text-7xl",
    desc:    "text-xl md:text-2xl",
    gap:     "gap-6",
  },
};

export default function Introduction({
  eyebrow,
  title,
  description,
  actions,
  size = "md",
  align = "center",
  className,
}: IntroductionProps) {
  const cfg = sizeConfig[size];
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "w-full",
        cfg.py,
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          cfg.gap,
          isCenter && "items-center text-center"
        )}
      >
        {eyebrow && (
          <span
            className={cn(
              "font-bold uppercase text-[#13ec5b]",
              cfg.eyebrow
            )}
          >
            {eyebrow}
          </span>
        )}

        <h1
          className={cn(
            "font-display font-black leading-tight tracking-tighter text-[#1a2e1a]",
            cfg.title,
            isCenter && "max-w-4xl"
          )}
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              "text-[#4a664a] leading-relaxed",
              cfg.desc,
              isCenter && "max-w-2xl"
            )}
          >
            {description}
          </p>
        )}

        {actions && (
          <div
            className={cn(
              "flex flex-wrap gap-3 pt-2",
              isCenter && "justify-center"
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
