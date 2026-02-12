import { FacialMeasurements, ElementScore } from "@/types/analysis";
import { ElementType } from "@/types/elements";

export function preClassify(m: FacialMeasurements): ElementScore[] {
  const scores: Record<ElementType, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };

  // Face width-to-height ratio
  if (m.faceWidthToHeightRatio < 0.75) {
    scores.wood += 25;
  } else if (m.faceWidthToHeightRatio < 0.82) {
    scores.metal += 15;
    scores.wood += 10;
  } else if (m.faceWidthToHeightRatio < 0.9) {
    scores.fire += 10;
    scores.metal += 10;
  } else if (m.faceWidthToHeightRatio < 1.0) {
    scores.earth += 15;
    scores.water += 10;
  } else {
    scores.water += 20;
    scores.earth += 5;
  }

  // Chin angle
  if (m.chinAngle < 110) {
    scores.fire += 25;
  } else if (m.chinAngle < 125) {
    scores.fire += 10;
    scores.metal += 10;
  } else if (m.chinAngle < 140) {
    scores.earth += 15;
  } else {
    scores.water += 20;
  }

  // Jaw-to-forehead ratio
  if (m.jawToForeheadRatio < 0.8) {
    scores.fire += 20;
  } else if (m.jawToForeheadRatio < 0.95) {
    scores.metal += 15;
  } else if (m.jawToForeheadRatio < 1.05) {
    scores.earth += 20;
  } else {
    scores.earth += 10;
    scores.wood += 10;
  }

  // Cheekbone prominence
  if (m.cheekboneProminence > 1.08) {
    scores.metal += 20;
  } else if (m.cheekboneProminence > 1.02) {
    scores.metal += 10;
  }

  // Facial symmetry
  if (m.facialSymmetry > 0.95) {
    scores.metal += 15;
  } else if (m.facialSymmetry > 0.9) {
    scores.metal += 5;
  }

  // Jaw angularity
  if (m.jawAngularity > 0.6) {
    scores.earth += 15;
  } else if (m.jawAngularity < 0.3) {
    scores.water += 15;
  }

  // Forehead height
  if (m.foreheadHeightRatio > 0.38) {
    scores.wood += 15;
    scores.fire += 10;
  } else if (m.foreheadHeightRatio > 0.3) {
    scores.wood += 5;
  }

  // Chin roundness
  if (m.chinRoundness > 0.5) {
    scores.water += 10;
  } else if (m.chinRoundness < 0.2) {
    scores.fire += 5;
  }

  // Normalize to 100
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) {
    return Object.keys(scores).map((element) => ({
      element: element as ElementType,
      score: 20,
      confidence: 0.2,
    }));
  }

  return (Object.entries(scores) as [ElementType, number][])
    .map(([element, score]) => ({
      element,
      score: Math.round((score / total) * 100),
      confidence: score / total,
    }))
    .sort((a, b) => b.score - a.score);
}
