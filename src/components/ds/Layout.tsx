import { cn } from "@/lib/utils";

/** 최대 너비 1600px, 중앙 정렬 컨테이너 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-6 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}

/** 섹션 여백 */
export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>{children}</section>
  );
}

/** 섹션 헤더 (Eyebrow + Title + 설명) */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-12",
        align === "center" && "text-center items-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#13ec5b]">
          {eyebrow}
        </span>
      )}
      <div className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tighter text-[#1a2e1a]">
        {title}
      </div>
      {description && (
        <p className="text-[#4a664a] text-lg max-w-2xl">{description}</p>
      )}
    </div>
  );
}

/** 단청 도트 패턴 페이지 래퍼 */
export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen dancheong-light", className)}>
      {children}
    </div>
  );
}

/** 흰색 글래스 내비게이션 바 */
export function DsNav({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-white/95 backdrop-blur-lg",
        "border-b border-[rgba(212,175,55,0.15)]",
        "shadow-[0_1px_12px_rgba(26,46,26,0.05)]",
        className
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </Container>
    </header>
  );
}
