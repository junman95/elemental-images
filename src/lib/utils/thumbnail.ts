/**
 * 클라이언트에서 Canvas API를 사용해 WebP 512px 썸네일을 생성합니다.
 * 긴 변을 512px로 맞추고 비율 유지.
 */
export async function createThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const MAX_SIZE = 512;
        let { width, height } = img;

        // 긴 변을 512px로 맞추기
        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas 2D context를 생성할 수 없습니다."));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // WebP로 변환 (quality 0.8)
        const dataUrl = canvas.toDataURL("image/webp", 0.8);

        // data:image/webp;base64, 접두사 제거
        const base64 = dataUrl.split(",")[1];
        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error("이미지 로드에 실패했습니다."));
    img.src = URL.createObjectURL(file);
  });
}
