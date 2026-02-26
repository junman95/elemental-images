"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import DsSection, { type DsSectionProps } from "./DsSection";

export interface CollapsableSectionProps extends Omit<DsSectionProps, "headerAction"> {
  /** 초기 열림 상태 (default: true) */
  defaultOpen?: boolean;
  /** 열림 상태 제어 (외부 제어 모드) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 접기 버튼에 표시할 레이블 */
  collapseLabel?: string;
  expandLabel?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "transition-transform duration-300 ease-in-out text-[#4a664a]",
        open ? "rotate-0" : "-rotate-90"
      )}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function CollapsableSection({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  collapseLabel,
  expandLabel,
  children,
  size = "md",
  ...sectionProps
}: CollapsableSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  const toggleButton = (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-1.5 text-[#4a664a] hover:text-[#13ec5b]",
        "transition-colors duration-200 cursor-pointer select-none",
        size === "sm" ? "text-xs" : size === "xl" ? "text-base" : "text-sm"
      )}
      aria-expanded={isOpen}
    >
      {isOpen
        ? (collapseLabel ?? "")
        : (expandLabel ?? "")}
      <ChevronIcon open={isOpen} />
    </button>
  );

  return (
    <DsSection
      {...sectionProps}
      size={size}
      headerAction={toggleButton}
    >
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
        style={{
          maxHeight: isOpen ? "9999px" : "0px",
        }}
      >
        {children}
      </div>
    </DsSection>
  );
}
