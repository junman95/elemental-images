/**
 * 클라이언트에서 이미지 파일의 SHA-256 해시를 생성합니다.
 * Web Crypto API를 사용하여 빠르고 안전한 해시를 계산합니다.
 */
export async function computeImageHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
