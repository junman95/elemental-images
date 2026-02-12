export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("이미지를 불러올 수 없습니다."));
    };
    img.src = url;
  });
}

export async function prepareImageForApi(
  file: File,
  maxDimension: number = 1024
): Promise<{
  base64: string;
  mediaType: "image/jpeg" | "image/png" | "image/webp";
}> {
  const img = await loadImage(file);

  const canvas = document.createElement("canvas");
  let { naturalWidth: w, naturalHeight: h } = img;

  if (w > maxDimension || h > maxDimension) {
    const scale = maxDimension / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context를 생성할 수 없습니다.");
  ctx.drawImage(img, 0, 0, w, h);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");

  return { base64, mediaType: "image/jpeg" };
}

export function validateImageFile(file: File): string | null {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return "지원하지 않는 파일 형식입니다. JPG, PNG, WebP 파일을 사용해 주세요.";
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return "파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해 주세요.";
  }

  return null;
}
