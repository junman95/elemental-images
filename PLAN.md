# 오행(五行) 얼굴형 분석 웹 앱 구현 계획

## 개요
사용자가 사진을 업로드하면 얼굴 랜드마크를 추출하고, 비율 기반 사전분류 + Claude Vision API로 오행 체형(목·화·토·금·수)을 판별하는 Next.js 풀스택 웹 앱

## 기술 스택
| 항목 | 기술 |
|---|---|
| 프레임워크 | Next.js 15+ (App Router, src/ 디렉토리) |
| 언어 | TypeScript (strict) |
| 얼굴 감지 | `@vladmandic/face-api` (클라이언트, 68포인트 랜드마크) |
| AI 분석 | `@anthropic-ai/sdk` (서버, Claude Sonnet) |
| 스타일링 | Tailwind CSS + shadcn/ui |
| 차트 | SVG 직접 구현 (레이더 차트) |
| 폰트 | Noto Sans KR (next/font) |

## 분석 파이프라인

```
[사진 업로드] → [얼굴 감지 (클라이언트)] → [랜드마크 68포인트 추출]
    → [비율 계산 (7가지 지표)] → [룰 기반 사전분류]
    → [이미지 + 계측데이터 → Claude Vision API (서버)]
    → [최종 오행 판별 결과 표시]
```

### 7가지 얼굴 계측 지표
1. **얼굴 가로/세로 비율** — 목(길다) vs 수(둥글다)
2. **턱/이마 너비 비율** — 화(좁은턱) vs 토(넓은턱)
3. **이마 높이 비율** — 목/화(높은이마)
4. **턱 각도 (뾰족 vs 둥근)** — 화(뾰족) vs 수(둥근)
5. **광대뼈 돌출도** — 금(높은광대)
6. **좌우 대칭도** — 금(높은대칭)
7. **턱선 각진 정도** — 토(각진) vs 수(부드러운)

### 오행 얼굴형 기준
- **목(木)**: 길고 직사각형, 높은 이마, 두드러진 턱선
- **화(火)**: 역삼각형/하트형, 뾰족한 턱, 넓은 이마
- **토(土)**: 사각형, 넓은 턱, 균형 잡힌 비율
- **금(金)**: 타원형, 높은 광대뼈, 대칭적
- **수(水)**: 둥근 얼굴, 부드러운 이목구비, 동그란 턱

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (한국어, 폰트)
│   ├── page.tsx                # 랜딩 페이지
│   ├── globals.css
│   ├── analyze/
│   │   └── page.tsx            # 분석 페이지 (업로드 + 결과)
│   └── api/analyze/
│       └── route.ts            # Claude Vision API 호출
├── components/
│   ├── ui/                     # shadcn/ui (button, card, progress 등)
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── upload/
│   │   └── ImageUploader.tsx   # 드래그앤드롭 + 파일 선택 + 카메라
│   ├── analysis/
│   │   ├── AnalysisController.tsx  # 전체 파이프라인 오케스트레이터
│   │   ├── LandmarkCanvas.tsx      # 랜드마크 오버레이
│   │   └── ProcessingSteps.tsx     # 단계별 진행 표시
│   └── results/
│       ├── ResultCard.tsx          # 메인 결과 카드
│       ├── ElementBadge.tsx        # 오행 배지 (아이콘 + 색상)
│       ├── ElementDescription.tsx  # 오행 유형 설명
│       ├── FeatureBreakdown.tsx    # 세부 분석
│       └── ElementRadar.tsx        # 5각형 레이더 차트 (SVG)
├── lib/
│   ├── face-detection/
│   │   ├── initialize.ts       # 모델 로딩 (싱글톤)
│   │   ├── detect.ts           # 얼굴 감지 + 랜드마크 추출
│   │   ├── measurements.ts     # 비율 계산 알고리즘 (핵심)
│   │   └── draw.ts             # 캔버스 드로잉
│   ├── analysis/
│   │   ├── classifier.ts       # 룰 기반 사전분류
│   │   ├── prompt.ts           # Claude 프롬프트 구성
│   │   └── parse-response.ts   # 응답 JSON 파싱
│   ├── constants/
│   │   └── elements.ts         # 오행 데이터 (이름, 색상, 설명)
│   └── utils/
│       └── image.ts            # 이미지 리사이즈 + base64 변환
└── types/
    ├── elements.ts             # ElementType, ElementInfo
    ├── landmarks.ts            # Point2D, FaceLandmarkData
    └── analysis.ts             # FacialMeasurements, AnalysisResult, AnalysisState
```

## 핵심 파일 및 역할

| 파일 | 역할 |
|---|---|
| `src/lib/face-detection/measurements.ts` | 68개 랜드마크에서 7가지 비율을 계산하는 수학 로직 |
| `src/components/analysis/AnalysisController.tsx` | 전체 파이프라인 상태머신 관리 (useReducer) |
| `src/app/api/analyze/route.ts` | Claude Vision API 호출 및 응답 처리 |
| `src/lib/analysis/prompt.ts` | 오행 분석용 시스템/유저 프롬프트 구성 |
| `src/types/analysis.ts` | 전체 데이터 계약 정의 |

## UI/UX 흐름

1. **랜딩 페이지**: 오행 소개 + "분석 시작하기" 버튼
2. **업로드**: 드래그앤드롭 / 파일 선택 / 모바일 카메라
3. **분석 중**: 4단계 스텝 표시 (얼굴 감지 → 특징 추출 → AI 분석 → 결과 생성)
4. **결과**: 오행 배지 + 점수 + 레이더 차트 + 세부 분석 텍스트
5. **다시하기**: "다시 분석하기" 버튼으로 초기화

### 오행별 색상
- 목(木): 초록 `#22c55e` / 화(火): 빨강 `#ef4444` / 토(土): 노랑 `#eab308` / 금(金): 회색 `#a1a1aa` / 수(水): 파랑 `#3b82f6`

## 프라이버시
- 이미지 서버 저장 없음 (메모리에서만 처리 후 폐기)
- DB/세션/쿠키 없음
- 클라이언트에서 1024px로 리사이즈 후 서버 전송

## 구현 순서

### 1단계: 프로젝트 초기화
- `create-next-app` 스캐폴딩
- 의존성 설치 (`@vladmandic/face-api`, `@anthropic-ai/sdk`)
- shadcn/ui 초기화 + 컴포넌트 추가
- face-api.js 모델 파일 다운로드 → `public/models/`
- `.env.local` 설정, `next.config.ts` 설정

### 2단계: 타입 및 상수 정의
- `types/` 하위 3개 파일
- `lib/constants/elements.ts` (오행 데이터)

### 3단계: 얼굴 감지 파이프라인
- 모델 로딩 (`initialize.ts`)
- 얼굴 감지 (`detect.ts`)
- 비율 계산 (`measurements.ts`) — **핵심 알고리즘**
- 캔버스 드로잉 (`draw.ts`)

### 4단계: 분석 로직
- 룰 기반 사전분류 (`classifier.ts`)
- Claude 프롬프트 (`prompt.ts`)
- 응답 파싱 (`parse-response.ts`)
- 이미지 유틸 (`image.ts`)

### 5단계: API 라우트
- `POST /api/analyze` 구현

### 6단계: UI 컴포넌트
- 레이아웃 (Header, Footer)
- ImageUploader (드래그앤드롭)
- LandmarkCanvas, ProcessingSteps
- ResultCard, ElementBadge, ElementRadar 등 결과 컴포넌트

### 7단계: 페이지 조립
- 랜딩 페이지 (`page.tsx`)
- AnalysisController (오케스트레이터)
- 분석 페이지 (`analyze/page.tsx`)

### 8단계: 마무리
- 에러 핸들링 + Error Boundary
- 모바일 반응형 조정
- 면책 문구 추가 (엔터테인먼트 목적)

## 검증 방법
1. `npm run dev`로 로컬 서버 실행
2. 랜딩 페이지 접근 → "분석 시작하기" 클릭
3. 테스트 얼굴 사진 업로드
4. 얼굴 감지 → 랜드마크 오버레이 확인
5. AI 분석 완료 → 오행 결과 + 레이더 차트 표시 확인
6. 다른 얼굴형 사진으로 반복 테스트 (다양한 오행 결과 확인)
7. 모바일 뷰포트에서 반응형 확인
8. 에러 케이스 테스트 (얼굴 없는 사진, 다수 얼굴, 작은 이미지 등)
