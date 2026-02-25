import { cn } from "@/lib/utils";
import type { SVGAttributes } from "react";

// ─── Icon Names ──────────────────────────────────────────────────────────────
export type IconName =
  // UI General
  | "close" | "check" | "plus" | "minus" | "menu" | "search"
  | "chevronDown" | "chevronUp" | "chevronLeft" | "chevronRight"
  | "arrowRight" | "arrowLeft" | "arrowUp" | "arrowDown"
  // Actions
  | "share" | "camera" | "rotate" | "upload" | "download"
  | "copy" | "link" | "externalLink" | "edit"
  // Status
  | "info" | "warning" | "error" | "success"
  // Social / Misc
  | "star" | "heart" | "sparkles" | "eye" | "eyeOff"
  | "user" | "calendar" | "phone"
  // Five Elements (오행)
  | "wood" | "fire" | "earth" | "metal" | "water"
  // App specific
  | "face" | "scan" | "loader";

export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconMode = "stroke" | "fill";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  mode?: IconMode;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────
const SIZE_PX: Record<IconSize, number> = {
  sm: 14,
  md: 20,
  lg: 24,
  xl: 32,
};

// ─── Icon Renderers ───────────────────────────────────────────────────────────
type IR = (sw: number) => React.ReactNode;

const ICONS: Record<IconName, IR> = {
  // ── UI ──
  close: (sw) => <path strokeWidth={sw} d="M6 18L18 6M6 6l12 12" />,
  check: (sw) => <path strokeWidth={sw} d="M5 13l4 4L19 7" />,
  plus:  (sw) => <path strokeWidth={sw} d="M12 5v14M5 12h14" />,
  minus: (sw) => <path strokeWidth={sw} d="M5 12h14" />,
  menu:  (sw) => <path strokeWidth={sw} d="M4 6h16M4 12h16M4 18h16" />,
  search:(sw) => <path strokeWidth={sw} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />,

  chevronDown:  (sw) => <path strokeWidth={sw} d="M6 9l6 6 6-6" />,
  chevronUp:    (sw) => <path strokeWidth={sw} d="M18 15l-6-6-6 6" />,
  chevronLeft:  (sw) => <path strokeWidth={sw} d="M15 18l-6-6 6-6" />,
  chevronRight: (sw) => <path strokeWidth={sw} d="M9 18l6-6-6-6" />,

  arrowRight: (sw) => <path strokeWidth={sw} d="M5 12h14M12 5l7 7-7 7" />,
  arrowLeft:  (sw) => <path strokeWidth={sw} d="M19 12H5M12 19l-7-7 7-7" />,
  arrowUp:    (sw) => <path strokeWidth={sw} d="M12 19V5M5 12l7-7 7 7" />,
  arrowDown:  (sw) => <path strokeWidth={sw} d="M12 5v14M19 12l-7 7-7-7" />,

  // ── Actions ──
  share: (sw) => (
    <>
      <path strokeWidth={sw} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
      <polyline strokeWidth={sw} points="16 6 12 2 8 6" />
      <line strokeWidth={sw} x1="12" y1="2" x2="12" y2="15" />
    </>
  ),
  camera: (sw) => (
    <>
      <path strokeWidth={sw} d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle strokeWidth={sw} cx="12" cy="13" r="4" />
    </>
  ),
  rotate: (sw) => (
    <>
      <polyline strokeWidth={sw} points="1 4 1 10 7 10" />
      <polyline strokeWidth={sw} points="23 20 23 14 17 14" />
      <path strokeWidth={sw} d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
    </>
  ),
  upload: (sw) => (
    <>
      <polyline strokeWidth={sw} points="16 16 12 12 8 16" />
      <line strokeWidth={sw} x1="12" y1="12" x2="12" y2="21" />
      <path strokeWidth={sw} d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </>
  ),
  download: (sw) => (
    <>
      <polyline strokeWidth={sw} points="8 17 12 21 16 17" />
      <line strokeWidth={sw} x1="12" y1="12" x2="12" y2="21" />
      <path strokeWidth={sw} d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
    </>
  ),
  copy: (sw) => (
    <>
      <rect strokeWidth={sw} x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path strokeWidth={sw} d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </>
  ),
  link: (sw) => (
    <path strokeWidth={sw} d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  ),
  externalLink: (sw) => (
    <>
      <path strokeWidth={sw} d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline strokeWidth={sw} points="15 3 21 3 21 9" />
      <line strokeWidth={sw} x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  edit: (sw) => (
    <>
      <path strokeWidth={sw} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path strokeWidth={sw} d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),

  // ── Status ──
  info: (sw) => (
    <>
      <circle strokeWidth={sw} cx="12" cy="12" r="10" />
      <line strokeWidth={sw} x1="12" y1="16" x2="12" y2="12" />
      <line strokeWidth={sw} x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
  warning: (sw) => (
    <>
      <path strokeWidth={sw} d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line strokeWidth={sw} x1="12" y1="9" x2="12" y2="13" />
      <line strokeWidth={sw} x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  error: (sw) => (
    <>
      <circle strokeWidth={sw} cx="12" cy="12" r="10" />
      <line strokeWidth={sw} x1="15" y1="9" x2="9" y2="15" />
      <line strokeWidth={sw} x1="9" y1="9" x2="15" y2="15" />
    </>
  ),
  success: (sw) => (
    <>
      <path strokeWidth={sw} d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline strokeWidth={sw} points="22 4 12 14.01 9 11.01" />
    </>
  ),

  // ── Social / Misc ──
  star: (sw) => (
    <polygon strokeWidth={sw} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  heart: (sw) => (
    <path strokeWidth={sw} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  ),
  sparkles: (sw) => (
    <>
      <path strokeWidth={sw} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path strokeWidth={sw} d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
      <path strokeWidth={sw} d="M5 6l.5 1.5L7 8l-1.5.5L5 10l-.5-1.5L3 8l1.5-.5L5 6z" />
    </>
  ),
  eye: (sw) => (
    <>
      <path strokeWidth={sw} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle strokeWidth={sw} cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (sw) => (
    <>
      <path strokeWidth={sw} d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line strokeWidth={sw} x1="1" y1="1" x2="23" y2="23" />
    </>
  ),
  user: (sw) => (
    <>
      <path strokeWidth={sw} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle strokeWidth={sw} cx="12" cy="7" r="4" />
    </>
  ),
  calendar: (sw) => (
    <>
      <rect strokeWidth={sw} x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line strokeWidth={sw} x1="16" y1="2" x2="16" y2="6" />
      <line strokeWidth={sw} x1="8"  y1="2" x2="8"  y2="6" />
      <line strokeWidth={sw} x1="3"  y1="10" x2="21" y2="10" />
    </>
  ),
  phone: (sw) => (
    <path strokeWidth={sw} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 12.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.5 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.32 6.32l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  ),

  // ── Five Elements (오행) ──
  wood: (sw) => (
    <>
      <path strokeWidth={sw} d="M12 22v-9" />
      <path strokeWidth={sw} d="M5 9l7-7 7 7" />
      <path strokeWidth={sw} d="M4 22h16" />
      <path strokeWidth={sw} d="M7 22v-4h10v4" />
    </>
  ),
  fire: (sw) => (
    <path strokeWidth={sw} d="M12 2c0 5-5 7-5 12a5 5 0 0010 0c0-5-5-7-5-12zM9.5 17.5c0-2 1.5-3.5 2.5-5.5 1 2 2.5 3.5 2.5 5.5a2.5 2.5 0 01-5 0z" />
  ),
  earth: (sw) => (
    <>
      <path strokeWidth={sw} d="M3 20h18" />
      <path strokeWidth={sw} d="M7 20V10l5-7 5 7v10" />
      <line strokeWidth={sw} x1="7" y1="14" x2="17" y2="14" />
    </>
  ),
  metal: (sw) => (
    <path strokeWidth={sw} d="M12 2l9 5v10l-9 5-9-5V7z" />
  ),
  water: (sw) => (
    <path strokeWidth={sw} d="M12 22a9 9 0 009-9C21 7 12 2 12 2S3 7 3 13a9 9 0 009 9z" />
  ),

  // ── App Specific ──
  face: (sw) => (
    <>
      <circle strokeWidth={sw} cx="12" cy="12" r="9" />
      <path strokeWidth={sw} d="M9 9.5a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
      <path strokeWidth={sw} d="M9 15s1.5 2 3 2 3-2 3-2" />
      <path strokeWidth={sw} d="M7 7.5C8 6 10 5.5 12 5.5s4 .5 5 2" />
    </>
  ),
  scan: (sw) => (
    <>
      <path strokeWidth={sw} d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
      <rect strokeWidth={sw} x="7" y="7" width="10" height="10" rx="1" />
    </>
  ),
  loader: (sw) => (
    <>
      <line strokeWidth={sw} x1="12" y1="2"  x2="12" y2="6"  />
      <line strokeWidth={sw} x1="12" y1="18" x2="12" y2="22" />
      <line strokeWidth={sw} x1="4.93"  y1="4.93"  x2="7.76"  y2="7.76"  />
      <line strokeWidth={sw} x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line strokeWidth={sw} x1="2"  y1="12" x2="6"  y2="12" />
      <line strokeWidth={sw} x1="18" y1="12" x2="22" y2="12" />
      <line strokeWidth={sw} x1="4.93"  y1="19.07" x2="7.76"  y2="16.24" />
      <line strokeWidth={sw} x1="16.24" y1="7.76"  x2="19.07" y2="4.93"  />
    </>
  ),
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Icon({
  name,
  size = "md",
  mode = "stroke",
  color,
  strokeWidth = 2,
  className,
  ...svgProps
}: IconProps) {
  const px = SIZE_PX[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill={mode === "fill" ? (color ?? "currentColor") : "none"}
      stroke={mode === "stroke" ? (color ?? "currentColor") : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
      {...svgProps}
    >
      {ICONS[name](strokeWidth)}
    </svg>
  );
}

// ─── Icon Name List (for tooling / storybook) ─────────────────────────────────
export const ICON_NAMES: IconName[] = [
  "close","check","plus","minus","menu","search",
  "chevronDown","chevronUp","chevronLeft","chevronRight",
  "arrowRight","arrowLeft","arrowUp","arrowDown",
  "share","camera","rotate","upload","download","copy","link","externalLink","edit",
  "info","warning","error","success",
  "star","heart","sparkles","eye","eyeOff","user","calendar","phone",
  "wood","fire","earth","metal","water",
  "face","scan","loader",
];
