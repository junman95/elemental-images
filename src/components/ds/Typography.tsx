import { cn } from "@/lib/utils";

/** 소제목 위 작은 레이블 (예: "The Imperial Registry") */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-bold tracking-[0.3em] uppercase",
        "text-[#13ec5b]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** 페이지 메인 타이틀 — Noto Serif KR */
export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-display text-5xl md:text-6xl font-black leading-tight tracking-tighter",
        "text-[#1a2e1a]",
        className
      )}
    >
      {children}
    </h1>
  );
}

/** 섹션 타이틀 */
export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-2xl md:text-3xl font-bold",
        "text-[#1a2e1a]",
        className
      )}
    >
      {children}
    </h2>
  );
}

/** 카드 타이틀 */
export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-bold",
        "text-[#1a2e1a]",
        className
      )}
    >
      {children}
    </h3>
  );
}

/** 본문 */
export function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-base text-[#1a2e1a]", className)}>{children}</p>
  );
}

/** 보조 텍스트 */
export function Muted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-[#8aaa8a]", className)}>{children}</p>
  );
}

/** 이탤릭 인용 문구 */
export function Quote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-display text-lg italic text-[#4a664a]",
        className
      )}
    >
      &ldquo;{children}&rdquo;
    </p>
  );
}
