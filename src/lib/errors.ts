/**
 * 에러 분류 + 사용자 메시지 변환
 * 실용적인 수준으로만 — 클래스 계층 없이 함수로 처리
 */

export type ErrorCode =
  | "FACE_NOT_FOUND"
  | "MULTIPLE_FACES"
  | "RATE_LIMIT"
  | "NETWORK"
  | "INVALID_IMAGE"
  | "SERVER_CONFIG"
  | "UNKNOWN";

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  FACE_NOT_FOUND:  "얼굴을 찾을 수 없습니다. 정면을 바라보는 선명한 사진을 사용해주세요.",
  MULTIPLE_FACES:  "한 명만 나온 사진을 사용해주세요.",
  RATE_LIMIT:      "AI 서버가 혼잡합니다. 잠시 후 다시 시도해주세요.",
  NETWORK:         "네트워크 연결을 확인하고 다시 시도해주세요.",
  INVALID_IMAGE:   "이미지를 처리할 수 없습니다. 다른 사진을 사용해주세요.",
  SERVER_CONFIG:   "서버 설정 오류입니다. 관리자에게 문의하세요.",
  UNKNOWN:         "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
};

/** 에러 내용을 보고 코드로 분류 */
export function classifyError(error: unknown): ErrorCode {
  const msg = error instanceof Error ? error.message : String(error);

  if (/얼굴을 찾을 수 없/.test(msg))               return "FACE_NOT_FOUND";
  if (/여러 명/.test(msg))                          return "MULTIPLE_FACES";
  if (/rate.?limit|overloaded|429/i.test(msg))      return "RATE_LIMIT";
  if (/failed to fetch|network error|load failed/i.test(msg)) return "NETWORK";
  if (/invalid.?api.?key|authentication/i.test(msg)) return "SERVER_CONFIG";

  return "UNKNOWN";
}

/**
 * 에러 → 사용자에게 보여줄 메시지
 * - 이미 한국어 메시지이면 그대로 사용
 * - 아니면 ErrorCode에 맞는 기본 메시지 반환
 */
export function toUserMessage(error: unknown): string {
  if (error instanceof Error && /[가-힣]/.test(error.message)) {
    return error.message;
  }
  return ERROR_MESSAGES[classifyError(error)];
}

/**
 * HTTP status → ErrorCode
 * API fetch 응답 코드로 메시지 결정할 때 사용
 */
export function statusToMessage(status: number): string {
  if (status === 429 || status === 503) return ERROR_MESSAGES["RATE_LIMIT"];
  if (status === 500) return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  if (status === 400) return "잘못된 요청입니다.";
  return `오류가 발생했습니다. (${status})`;
}
