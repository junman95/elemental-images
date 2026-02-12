import { faceapi, ensureModelsLoaded } from "./initialize";
import { FaceDetectionResult, FaceLandmarkData, Point2D } from "@/types/landmarks";

export async function detectFace(
  image: HTMLImageElement | HTMLCanvasElement
): Promise<FaceDetectionResult> {
  await ensureModelsLoaded();

  const detections = await faceapi
    .detectAllFaces(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    .withFaceLandmarks();

  if (detections.length === 0) {
    throw new Error("얼굴을 찾을 수 없습니다. 정면 사진을 업로드해 주세요.");
  }

  if (detections.length > 1) {
    throw new Error(
      "여러 명의 얼굴이 감지되었습니다. 한 명만 나온 사진을 사용해 주세요."
    );
  }

  const detection = detections[0];
  const landmarks = detection.landmarks;
  const positions = landmarks.positions;

  const toPoint = (p: faceapi.Point): Point2D => ({ x: p.x, y: p.y });

  const landmarkData: FaceLandmarkData = {
    jawOutline: landmarks.getJawOutline().map(toPoint),
    leftEyebrow: landmarks.getLeftEyeBrow().map(toPoint),
    rightEyebrow: landmarks.getRightEyeBrow().map(toPoint),
    noseBridge: positions.slice(27, 31).map(toPoint),
    noseBottom: positions.slice(31, 36).map(toPoint),
    leftEye: landmarks.getLeftEye().map(toPoint),
    rightEye: landmarks.getRightEye().map(toPoint),
    outerLip: positions.slice(48, 60).map(toPoint),
    innerLip: positions.slice(60, 68).map(toPoint),
    allPoints: positions.map(toPoint),
  };

  const box = detection.detection.box;
  const imageWidth =
    image instanceof HTMLImageElement ? image.naturalWidth : image.width;
  const imageHeight =
    image instanceof HTMLImageElement ? image.naturalHeight : image.height;

  return {
    landmarks: landmarkData,
    detection: {
      score: detection.detection.score,
      box: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    },
    imageWidth,
    imageHeight,
  };
}
