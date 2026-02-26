"use client";

import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ToastVariant  = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";
export type ToastSize = "sm" | "md" | "lg" | "xl";

export interface ToastItem {
  id:        number;
  message:   string;
  description?: string;
  variant?:  ToastVariant;
  position?: ToastPosition;
  duration?: number; // ms, 0 = persist
  size?:     ToastSize;
  action?:   { label: string; onClick: () => void };
}

// ─── Global Store (singleton, no external deps) ────────────────────────────────
let _id = 0;
let _toasts: ToastItem[] = [];
const _listeners = new Set<(toasts: ToastItem[]) => void>();

function _notify() {
  _listeners.forEach((fn) => fn([..._toasts]));
}

/** toast() — 어디서든 호출 가능 */
export function toast(
  message: string,
  options?: Partial<Omit<ToastItem, "id" | "message">>
): number {
  const id = ++_id;
  const item: ToastItem = {
    id,
    message,
    variant:  "default",
    position: "top-right",
    duration: 3500,
    size:     "md",
    ...options,
  };
  _toasts = [..._toasts, item];
  _notify();

  if ((item.duration ?? 0) > 0) {
    setTimeout(() => dismissToast(id), item.duration);
  }
  return id;
}

export function dismissToast(id: number) {
  _toasts = _toasts.filter((t) => t.id !== id);
  _notify();
}

function useToastStore(): ToastItem[] {
  const [items, setItems] = useState<ToastItem[]>([..._toasts]);

  useEffect(() => {
    setItems([..._toasts]);
    _listeners.add(setItems);
    return () => { _listeners.delete(setItems); };
  }, []);

  return items;
}

// ─── Visual config ─────────────────────────────────────────────────────────────
const variantConfig: Record<ToastVariant, { icon: string; cls: string }> = {
  default: {
    icon: "✦",
    cls:  "bg-white/95 border-white/80 text-[#1a2e1a]",
  },
  success: {
    icon: "✓",
    cls:  "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.25)] text-[#1a2e1a]",
  },
  error: {
    icon: "✕",
    cls:  "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.25)] text-[#1a2e1a]",
  },
  warning: {
    icon: "⚠",
    cls:  "bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.25)] text-[#1a2e1a]",
  },
  info: {
    icon: "ℹ",
    cls:  "bg-[rgba(59,130,246,0.08)] border-[rgba(59,130,246,0.25)] text-[#1a2e1a]",
  },
};

const iconColorMap: Record<ToastVariant, string> = {
  default: "#13ec5b",
  success: "#22c55e",
  error:   "#ef4444",
  warning: "#eab308",
  info:    "#3b82f6",
};

const sizeConfig: Record<ToastSize, { padding: string; text: string; desc: string; iconSize: string }> = {
  sm: { padding: "px-3 py-2",   text: "text-xs",  desc: "text-[11px]", iconSize: "text-xs" },
  md: { padding: "px-4 py-3",   text: "text-sm",  desc: "text-xs",     iconSize: "text-sm" },
  lg: { padding: "px-5 py-3.5", text: "text-base", desc: "text-sm",    iconSize: "text-base" },
  xl: { padding: "px-6 py-4",   text: "text-lg",  desc: "text-base",   iconSize: "text-lg" },
};

const positionStyles: Record<ToastPosition, string> = {
  "top-left":      "top-4 left-4 items-start",
  "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-4 right-4 items-end",
  "bottom-left":   "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-4 right-4 items-end",
};

// ─── Single Toast Item ─────────────────────────────────────────────────────────
function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // mount animation
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  function handleDismiss() {
    setLeaving(true);
    setTimeout(onDismiss, 200);
  }

  const variant = item.variant ?? "default";
  const size    = item.size    ?? "md";
  const cfg     = variantConfig[variant];
  const szCfg   = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border backdrop-blur-md shadow-[0_4px_24px_rgba(26,46,26,0.12)]",
        "transition-all duration-200 ease-out min-w-[240px] max-w-[380px]",
        cfg.cls,
        szCfg.padding,
        visible && !leaving ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
      )}
    >
      {/* Icon */}
      <span
        className={cn("shrink-0 font-bold leading-none mt-0.5", szCfg.iconSize)}
        style={{ color: iconColorMap[variant] }}
      >
        {cfg.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium leading-snug", szCfg.text)}>{item.message}</p>
        {item.description && (
          <p className={cn("mt-0.5 text-[#4a664a]", szCfg.desc)}>{item.description}</p>
        )}
        {item.action && (
          <button
            onClick={item.action.onClick}
            className={cn("mt-1.5 font-bold text-[#13ec5b] hover:underline", szCfg.desc)}
          >
            {item.action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        aria-label="닫기"
        className="shrink-0 text-[#8aaa8a] hover:text-[#1a2e1a] transition-colors cursor-pointer text-xs leading-none mt-0.5"
      >
        ✕
      </button>
    </div>
  );
}

// ─── Position Group ────────────────────────────────────────────────────────────
function PositionGroup({
  position,
  items,
  onDismiss,
}: {
  position: ToastPosition;
  items: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  if (items.length === 0) return null;

  const isBottom = position.startsWith("bottom");

  return (
    <div
      className={cn(
        "fixed z-[9999] flex flex-col gap-2 pointer-events-none",
        positionStyles[position],
        isBottom ? "flex-col-reverse" : "flex-col"
      )}
    >
      {items.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <ToastCard item={item} onDismiss={() => onDismiss(item.id)} />
        </div>
      ))}
    </div>
  );
}

// ─── Toaster Component ─────────────────────────────────────────────────────────
export interface ToasterProps {
  /** Portal 대상 CSS selector. 기본값: document.body */
  to?: string;
}

export default function Toaster({ to }: ToasterProps) {
  const toasts = useToastStore();
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    targetRef.current = to
      ? (document.querySelector(to) ?? document.body)
      : document.body;
    setMounted(true);
  }, [to]);

  if (!mounted || !targetRef.current) return null;

  // Group by position
  const positions = Object.keys(positionStyles) as ToastPosition[];
  const grouped = positions.reduce<Record<ToastPosition, ToastItem[]>>((acc, pos) => {
    acc[pos] = toasts.filter((t) => (t.position ?? "top-right") === pos);
    return acc;
  }, {} as Record<ToastPosition, ToastItem[]>);

  return createPortal(
    <>
      {positions.map((pos) => (
        <PositionGroup
          key={pos}
          position={pos}
          items={grouped[pos]}
          onDismiss={dismissToast}
        />
      ))}
    </>,
    targetRef.current
  );
}
