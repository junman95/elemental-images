import { FacialMeasurements, ElementScore } from "@/types/analysis";

export function buildSystemPrompt(): string {
  return `당신은 오행 체형론(五行 體形論)에 기반한 관상학 전문가입니다.
사용자가 제공하는 얼굴 사진과 계측 데이터를 분석하여 오행(목·화·토·금·수) 중 어떤 유형에 해당하는지 판별해 주세요.

## 오행 얼굴형 기준

### 목(木) - Wood
- 길고 직사각형에 가까운 얼굴. 두드러진 턱선, 높은 이마. 갸름하고 긴 인상.
- 가로세로 비율이 낮음 (좁고 긴 얼굴)
- 이마가 높고 넓음

### 화(火) - Fire
- 역삼각형/하트형 얼굴. 뾰족한 턱, 넓은 이마. 날카로운 이목구비.
- 턱이 이마보다 좁음
- 턱 각도가 뾰족함 (작은 턱 각도)

### 토(土) - Earth
- 사각형/둥근 사각형 얼굴. 넓은 턱, 균형 잡힌 비율. 풍성하고 넉넉한 인상.
- 턱이 넓고 각짐
- 이마와 턱의 너비가 비슷함

### 금(金) - Metal
- 타원형 얼굴. 높은 광대뼈, 뚜렷한 이목구비. 대칭적이고 세련된 인상.
- 좌우 대칭도가 높음
- 광대뼈가 두드러짐

### 수(水) - Water
- 둥근 얼굴. 부드러운 이목구비, 동그란 턱. 풍만하고 부드러운 인상.
- 가로세로 비율이 높음 (넓고 둥근 얼굴)
- 턱이 둥글고 부드러운 곡선

## 응답 규칙
1. 사진과 계측 데이터를 모두 종합적으로 고려하세요.
2. 계측 데이터의 사전 분류 점수는 참고만 하고, 사진을 직접 관찰하여 최종 판단하세요.
3. 반드시 아래 JSON 형식으로만 응답하세요. JSON 외의 텍스트는 포함하지 마세요.`;
}

export function buildUserMessage(
  measurements: FacialMeasurements,
  preScores: ElementScore[]
): string {
  const shapeKo: Record<string, string> = {
    long: "긴형",
    oval: "타원형",
    round: "둥근형",
    square: "사각형",
    heart: "하트형",
    diamond: "다이아몬드형",
  };

  return `아래는 얼굴 계측 데이터와 사전 분류 결과입니다.
이 데이터와 첨부된 얼굴 사진을 종합적으로 분석하여 오행 유형을 판별해 주세요.

## 계측 데이터
- 얼굴 가로세로 비율: ${measurements.faceWidthToHeightRatio.toFixed(3)}
- 턱/이마 너비 비율: ${measurements.jawToForeheadRatio.toFixed(3)}
- 이마 높이 비율: ${measurements.foreheadHeightRatio.toFixed(3)}
- 턱 각도: ${measurements.chinAngle.toFixed(1)}°
- 턱 둥글기: ${measurements.chinRoundness.toFixed(3)}
- 광대뼈 돌출도: ${measurements.cheekboneProminence.toFixed(3)}
- 턱선 각진 정도: ${measurements.jawAngularity.toFixed(3)}
- 좌우 대칭도: ${measurements.facialSymmetry.toFixed(3)}
- 얼굴형 분류: ${shapeKo[measurements.faceShapeCategory] || measurements.faceShapeCategory}

## 사전 분류 점수
${preScores.map((s) => `- ${s.element}: ${s.score}점`).join("\n")}

아래 JSON 형식으로 응답하세요:
{
  "primaryElement": "wood|fire|earth|metal|water",
  "primaryScore": 0-100,
  "secondaryElement": "wood|fire|earth|metal|water",
  "secondaryScore": 0-100,
  "allScores": { "wood": 0-100, "fire": 0-100, "earth": 0-100, "metal": 0-100, "water": 0-100 },
  "analysis": {
    "faceShape": "얼굴형에 대한 설명 (1-2문장)",
    "jawline": "턱선 분석 (1-2문장)",
    "forehead": "이마 분석 (1-2문장)",
    "cheekbones": "광대뼈 분석 (1-2문장)",
    "chin": "턱 분석 (1-2문장)",
    "overallImpression": "종합 인상 (2-3문장)"
  },
  "summary": "종합 분석 요약 (3-4문장)"
}`;
}
