# PR #2: 결과 저장 + 24시간 공유 링크 + 이미지 캐싱

## Context
현재 분석 결과는 React 컴포넌트 state에만 존재하여 새로고침 시 소실됨.
두 가지 문제를 해결한다:
1. **결과 공유**: 분석 결과를 24시간 동안 공유 가능한 URL(`/result/[id]`)로 제공
2. **결과 일관성**: 같은 사진을 다시 분석하면 캐싱된 결과를 즉시 반환 (API 비용 절감 + 일관된 결과)

**저장소**: Upstash Redis (HTTP 기반, serverless 친화, 24h TTL 네이티브 지원)
**라이선스**: @upstash/redis = MIT → 소스 공개 의무 없음. SaaS 사용이므로 Redis AGPL도 해당 없음.

## 데이터 플로우

```
[사진 업로드]
    ↓
POST /api/analyze
    ├── 이미지 SHA-256 해시 계산 (클라이언트에서 전달)
    ├── Redis에서 cache:img:{hash} 조회
    │   ├── HIT → 저장된 resultId로 result:{id} 조회 → 즉시 반환 (API 호출 스킵)
    │   └── MISS → Claude Vision API 호출
    │         ├── nanoid 생성
    │         ├── result:{id} 저장 (TTL 24h) — AnalysisResult + 썸네일
    │         ├── cache:img:{hash} → resultId 저장 (TTL 24h)
    │         └── result + resultId 반환
    ↓
[결과 화면 + "공유하기" 버튼]
    ↓
/result/{id} 접속 시 → Redis에서 조회 → 결과 렌더링
```

## Redis 키 설계

| 키 패턴 | 값 | TTL |
|---|---|---|
| `result:{nanoid}` | `SharedResult` JSON (~60KB, 결과+WebP 512px 썸네일) | 24h |
| `cache:img:{sha256}` | nanoid 문자열 | 24h |

## 수정 대상 파일

### 새로 생성 (7개)
| 파일 | 역할 |
|---|---|
| `src/lib/redis.ts` | Upstash Redis 클라이언트 + storeResult/getResult/setCachePointer/getCachedResultId |
| `src/lib/utils/image-hash.ts` | 클라이언트 SHA-256 해시 (Web Crypto API) |
| `src/lib/utils/thumbnail.ts` | 클라이언트 캔버스 썸네일 생성 (WebP 512px, sharp 대신 canvas) |
| `src/app/api/result/[id]/route.ts` | GET — Redis에서 결과 조회 |
| `src/app/result/[id]/page.tsx` | 공유 결과 페이지 (Server Component, 동적 OG 메타) |
| `src/components/results/SharedResultView.tsx` | 공유 결과 뷰 (썸네일 + 만료 안내 + ResultCard 재사용 + CTA) |
| `src/components/results/ShareButton.tsx` | 공유 버튼 (Web Share API → clipboard 폴백) |

### 수정 (3개)
| 파일 | 변경 내용 |
|---|---|
| `src/types/analysis.ts` | `SharedResult` 타입 추가, `AnalyzeRequest`에 thumbnail/imageHash, `AnalyzeResponse`에 resultId/cached, `AnalysisState`에 resultId |
| `src/app/api/analyze/route.ts` | 캐시 체크 → Claude API → Redis 저장 → resultId 반환 |
| `src/components/analysis/AnalysisController.tsx` | 해시/썸네일 생성, resultId 추적, ShareButton 렌더링 |

## 구현 순서

### 1단계: 의존성 설치 + 환경변수
```bash
npm install @upstash/redis nanoid
```
`.env.local`에 `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` 추가

### 2단계: 타입 확장 (`src/types/analysis.ts`)
- `SharedResult` 인터페이스 추가
- `AnalyzeRequest`/`AnalyzeResponse`/`AnalysisState` 확장

### 3단계: Redis 클라이언트 (`src/lib/redis.ts`)
- storeResult, getResult, setCachePointer, getCachedResultId

### 4단계: 유틸리티 (`src/lib/utils/`)
- `image-hash.ts` — SHA-256 해시
- `thumbnail.ts` — WebP 512px 썸네일 (클라이언트 canvas)

### 5단계: API 수정 (`src/app/api/analyze/route.ts`)
- 캐시 체크 로직 추가
- Redis 저장 + resultId 반환

### 6단계: 클라이언트 수정 (`AnalysisController.tsx`)
- 해시/썸네일 생성 연동
- resultId state 추적
- "공유 링크 생성 중..." 단계 추가 (ProcessingSteps에 5번째 스텝)
- 해당 단계에서도 AdSlot 광고 계속 노출
- ShareButton 렌더링

### 7단계: 공유 기능
- `ShareButton.tsx`
- `GET /api/result/[id]` 라우트
- `SharedResultView.tsx`
- `/result/[id]/page.tsx` (OG 메타 포함)

## 검증

1. `npm run dev` → 사진 업로드 → 분석 완료 → "공유하기" 버튼 표시 확인
2. 공유 링크 복사 → 시크릿 탭에서 열기 → 결과 + 썸네일 표시 확인
3. 같은 사진 다시 분석 → `cached: true` 응답 + 동일 resultId 확인
4. 24시간 후 링크 만료 확인 (Upstash 콘솔에서 TTL 확인)
5. 모바일에서 Web Share API 동작 확인
6. `npm run build` 성공
