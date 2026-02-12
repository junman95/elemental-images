import { ElementType } from "@/types/elements";
import { AnalysisResult, FacialMeasurements, ElementScore } from "@/types/analysis";

interface ClaudeResponse {
  primaryElement: string;
  primaryScore: number;
  secondaryElement: string;
  secondaryScore: number;
  allScores: Record<string, number>;
  analysis: {
    faceShape: string;
    jawline: string;
    forehead: string;
    cheekbones: string;
    chin: string;
    overallImpression: string;
  };
  summary: string;
}

const VALID_ELEMENTS: ElementType[] = [
  "wood",
  "fire",
  "earth",
  "metal",
  "water",
];

function isValidElement(s: string): s is ElementType {
  return VALID_ELEMENTS.includes(s as ElementType);
}

function extractJSON(text: string): string {
  // Try to find JSON in code blocks
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) return codeBlockMatch[1].trim();

  // Try to find JSON object directly
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return jsonMatch[0];

  return text;
}

export function parseClaudeResponse(
  responseText: string,
  measurements: FacialMeasurements
): AnalysisResult {
  const jsonStr = extractJSON(responseText);
  let parsed: ClaudeResponse;

  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error("AI 응답을 파싱할 수 없습니다. 다시 시도해 주세요.");
  }

  if (!isValidElement(parsed.primaryElement)) {
    throw new Error("AI 응답에 유효하지 않은 오행 유형이 포함되어 있습니다.");
  }

  const primaryElement = parsed.primaryElement as ElementType;
  const secondaryElement = isValidElement(parsed.secondaryElement)
    ? (parsed.secondaryElement as ElementType)
    : VALID_ELEMENTS.find((e) => e !== primaryElement)!;

  const elementScores: ElementScore[] = VALID_ELEMENTS.map((element) => ({
    element,
    score: parsed.allScores?.[element] ?? 0,
    confidence: (parsed.allScores?.[element] ?? 0) / 100,
  })).sort((a, b) => b.score - a.score);

  return {
    primaryElement,
    primaryScore: Math.min(100, Math.max(0, parsed.primaryScore ?? 0)),
    secondaryElement,
    secondaryScore: Math.min(100, Math.max(0, parsed.secondaryScore ?? 0)),
    elementScores,
    measurements,
    analysisText: parsed.summary ?? "",
    featureDetails: {
      faceShape: parsed.analysis?.faceShape ?? "",
      jawline: parsed.analysis?.jawline ?? "",
      forehead: parsed.analysis?.forehead ?? "",
      cheekbones: parsed.analysis?.cheekbones ?? "",
      chin: parsed.analysis?.chin ?? "",
      overallImpression: parsed.analysis?.overallImpression ?? "",
    },
    timestamp: new Date().toISOString(),
  };
}
