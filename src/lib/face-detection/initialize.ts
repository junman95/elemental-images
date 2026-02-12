import * as faceapi from "@vladmandic/face-api";

let modelsLoaded = false;
let loadingPromise: Promise<void> | null = null;

export async function ensureModelsLoaded(): Promise<void> {
  if (modelsLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);
      modelsLoaded = true;
    } catch (error) {
      loadingPromise = null;
      throw new Error("분석 모델을 불러오는 데 실패했습니다. 페이지를 새로고침해 주세요.");
    }
  })();

  return loadingPromise;
}

export { faceapi };
