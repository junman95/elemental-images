"use client";

import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** backdrop 클릭 시 닫기 (default: true) */
  closeOnBackdrop?: boolean;
  /** Portal 대상 CSS selector. 기본값: document.body */
  to?: string;
  className?: string;
}

// ─── Size config ───────────────────────────────────────────────────────────────
const sizeConfig: Record<ModalSize, { maxW: string; padding: string; title: string }> = {
  sm: { maxW: "max-w-sm",  padding: "p-5",  title: "text-lg"  },
  md: { maxW: "max-w-md",  padding: "p-6",  title: "text-xl"  },
  lg: { maxW: "max-w-lg",  padding: "p-8",  title: "text-2xl" },
  xl: { maxW: "max-w-2xl", padding: "p-10", title: "text-3xl" },
};

// ─── Modal Inner ───────────────────────────────────────────────────────────────
function ModalInner({
  open,
  onClose,
  size = "md",
  title,
  description,
  children,
  footer,
  closeOnBackdrop = true,
  className,
}: Omit<ModalProps, "to">) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // prevent body scroll
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setVisible(true), 10);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
  }, [open]);

  // ESC key to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open && !visible) return null;

  const cfg = sizeConfig[size];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[9998] transition-opacity duration-200",
          "bg-[rgba(16,34,22,0.6)] backdrop-blur-sm",
          visible ? "opacity-100" : "opacity-0"
        )}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-[9999] flex items-center justify-center p-4",
          "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "w-full pointer-events-auto",
            "bg-white/95 backdrop-blur-xl rounded-2xl",
            "border border-white/80 shadow-[0_8px_48px_rgba(26,46,26,0.18)]",
            "transition-all duration-200 ease-out",
            cfg.maxW,
            cfg.padding,
            visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4",
            className
          )}
        >
          {/* Header */}
          {(title || description) && (
            <div className="flex items-start justify-between mb-5">
              <div className="flex-1 pr-4">
                {title && (
                  <div className={cn("font-display font-bold text-[#1a2e1a] leading-tight", cfg.title)}>
                    {title}
                  </div>
                )}
                {description && (
                  <p className="mt-1.5 text-sm text-[#4a664a]">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                className={cn(
                  "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                  "text-[#8aaa8a] hover:text-[#1a2e1a] hover:bg-[rgba(26,46,26,0.06)]",
                  "transition-colors duration-150 cursor-pointer"
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          {children && (
            <div className={cn((title || description) ? "" : "")}>
              {children}
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-4 border-t border-[rgba(26,46,26,0.08)] flex items-center justify-end gap-3 flex-wrap">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Modal (with Portal) ───────────────────────────────────────────────────────
export default function Modal({ to, ...props }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    targetRef.current = to
      ? (document.querySelector(to) ?? document.body)
      : document.body;
    setMounted(true);
  }, [to]);

  if (!mounted || !targetRef.current) return null;

  return createPortal(<ModalInner {...props} />, targetRef.current);
}
