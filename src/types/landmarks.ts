export interface Point2D {
  x: number;
  y: number;
}

export interface FaceLandmarkData {
  jawOutline: Point2D[];
  leftEyebrow: Point2D[];
  rightEyebrow: Point2D[];
  noseBridge: Point2D[];
  noseBottom: Point2D[];
  leftEye: Point2D[];
  rightEye: Point2D[];
  outerLip: Point2D[];
  innerLip: Point2D[];
  allPoints: Point2D[];
}

export interface FaceDetectionResult {
  landmarks: FaceLandmarkData;
  detection: {
    score: number;
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  imageWidth: number;
  imageHeight: number;
}
