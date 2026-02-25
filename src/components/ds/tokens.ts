/**
 * 오행 관상 분석 디자인 시스템 토큰
 * Stitch "Five Elements Face Analysis" 테마 기반 Light 버전
 */

export const DS_COLORS = {
  /** 브랜드 초록 (Stitch primary #13ec5b) */
  primary: "#13ec5b",
  primaryDark: "#0db849",
  primaryForeground: "#102216",

  /** 금색 포인트 */
  gold: "#d4af37",
  goldLight: "rgba(212, 175, 55, 0.15)",

  /** 배경 */
  bg: "#f6f8f6",
  bgDark: "#102216",

  /** 텍스트 */
  text: "#1a2e1a",
  textSecondary: "#4a664a",
  textMuted: "#8aaa8a",

  /** 보더 */
  border: "rgba(19, 236, 91, 0.15)",
  borderGold: "rgba(212, 175, 55, 0.3)",
  borderSubtle: "rgba(26, 46, 26, 0.08)",

  /** 오행 컬러 */
  element: {
    wood: "#22c55e",
    fire: "#ef4444",
    earth: "#eab308",
    metal: "#a1a1aa",
    water: "#3b82f6",
  },
} as const;

export const DS_FONT = {
  display: "var(--font-display), 'Noto Serif KR', serif",
  body: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif",
} as const;

export const DS_LAYOUT = {
  maxWidth: "1600px",
  containerPadding: "1.5rem",
  containerPaddingLg: "2.5rem",
} as const;

export const DS_RADIUS = {
  sm: "0.375rem",
  md: "0.625rem",
  lg: "0.875rem",
  xl: "1.25rem",
  pill: "9999px",
} as const;

export const DS_SHADOW = {
  glass: "0 4px 24px rgba(26, 46, 26, 0.07)",
  glassHover: "0 8px 32px rgba(26, 46, 26, 0.12)",
  gold: "0 4px 16px rgba(212, 175, 55, 0.15)",
  primary: "0 4px 16px rgba(19, 236, 91, 0.2)",
} as const;
