# PR #1: AI 분석 대기 중 광고 노출

## Context
AI 분석(Claude Vision API 호출)이 5~15초 걸리는데, 이 대기 시간에 사용자가 빈 화면만 보고 있다. 이 시간을 활용해 광고를 노출하여 수익화 기반을 마련한다.
현 단계에서는 모의 광고(placeholder) UI를 구현하고, 나중에 Google AdSense/카카오 애드핏 등 실제 광고로 교체할 수 있는 구조로 만든다.

## 수정 대상 파일

### 새로 생성
- `src/components/ad/AdSlot.tsx` — 광고 슬롯 (추상화 레이어, provider 분기)
- `src/components/ad/PlaceholderAd.tsx` — 모의 광고 구현체
- `src/components/ad/GoogleAd.tsx` — AdSense 구현체 (껍데기만, 향후 활성화)

### 수정
- `src/components/analysis/AnalysisController.tsx` — "analyzing-ai" 상태에서 AdSlot 노출

## 구현 계획

### 1. 광고 컴포넌트 추상화 구조

```
AdSlot (추상화 레이어)
  ├── NEXT_PUBLIC_AD_PROVIDER=none    → PlaceholderAd 렌더링
  ├── NEXT_PUBLIC_AD_PROVIDER=adsense → GoogleAd 렌더링
  └── NEXT_PUBLIC_AD_PROVIDER=kakao   → KakaoAd 렌더링 (향후)
```

호출부에서는 항상 `<AdSlot format="rectangle" />` 만 사용.
광고 플랫폼 변경 시 환경변수만 바꾸면 되고, 호출부 코드 변경 없음.

### 2. `AdSlot.tsx` — 추상화 레이어

```tsx
// Props
interface AdSlotProps {
  format: "banner" | "rectangle";  // banner: 320x100, rectangle: 300x250
  className?: string;
}

// 내부 로직
const provider = process.env.NEXT_PUBLIC_AD_PROVIDER || "none";
switch (provider) {
  case "adsense": return <GoogleAd format={format} />;
  case "none":
  default:        return <PlaceholderAd format={format} />;
}
```

### 3. `PlaceholderAd.tsx` — 모의 광고 구현체

- 오행 관련 재미 팁 5개를 3초 간격 fade 전환으로 순환
- 상단 "AD" 배지 표시
- 오행 색상 배경
- format에 맞는 반응형 사이즈

모의 콘텐츠 예시:
- "오행은 약 2,500년 전 중국 전국시대에 체계화되었습니다"
- "한의학에서 목(木)은 간, 화(火)는 심장과 연결됩니다"
- "봄은 목(木), 여름은 화(火), 가을은 금(金), 겨울은 수(水)의 계절입니다"

### 4. `GoogleAd.tsx` — AdSense 껍데기

- `adSlotId`, `adClient` props 받는 구조만 준비
- 실제 `<ins class="adsbygoogle">` 삽입 + `adsbygoogle.push()` 호출 로직
- `layout.tsx`에 AdSense 스크립트 태그 추가 필요 (향후 활성화 시)

### 5. `AnalysisController.tsx` 수정

ProcessingSteps 아래에 "analyzing-ai" 단계에서만 광고 표시:

```tsx
{isProcessing && (
  <Card>
    <CardContent>
      {이미지 프리뷰}
      <ProcessingSteps />
    </CardContent>
  </Card>
)}

{state.step === "analyzing-ai" && (
  <AdSlot format="rectangle" />
)}
```

"detecting-face"/"extracting-features"는 순식간이라 광고 노출 의미 없음.
"analyzing-ai"만 5~15초 걸려서 광고 노출 적합.

## 검증

1. `npm run dev` → `/analyze`에서 사진 업로드
2. "AI 분석 중..." 단계에서 광고 슬롯이 나타나는지 확인
3. 분석 완료 후 광고가 사라지는지 확인
4. 모바일 뷰에서 광고 크기/레이아웃 확인
5. `npm run build` 성공 확인

## 광고 플랫폼 전환 방법 (향후)

1. `.env.local`에서 `NEXT_PUBLIC_AD_PROVIDER=adsense` 설정
2. `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxx` 설정
3. `src/app/layout.tsx`에 AdSense 스크립트 태그 추가
4. `GoogleAd.tsx` 내부 로직 활성화
