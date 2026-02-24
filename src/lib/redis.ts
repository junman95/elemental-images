import { Redis } from "@upstash/redis";
import { SharedResult } from "@/types/analysis";

const RESULT_TTL = 60 * 60 * 24; // 24시간 (초)

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token || url === "your-upstash-redis-url") {
    return null;
  }

  return new Redis({ url, token });
}

/** 분석 결과를 Redis에 저장 */
export async function storeResult(
  id: string,
  data: SharedResult
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.set(`result:${id}`, JSON.stringify(data), { ex: RESULT_TTL });
    return true;
  } catch (error) {
    console.error("Redis storeResult error:", error);
    return false;
  }
}

/** Redis에서 분석 결과 조회 */
export async function getResult(id: string): Promise<SharedResult | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get<string>(`result:${id}`);
    if (!data) return null;
    return typeof data === "string" ? JSON.parse(data) : (data as unknown as SharedResult);
  } catch (error) {
    console.error("Redis getResult error:", error);
    return null;
  }
}

/** 이미지 해시 → resultId 캐시 포인터 저장 */
export async function setCachePointer(
  imageHash: string,
  resultId: string
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.set(`cache:img:${imageHash}`, resultId, { ex: RESULT_TTL });
    return true;
  } catch (error) {
    console.error("Redis setCachePointer error:", error);
    return false;
  }
}

/** 이미지 해시로 캐싱된 resultId 조회 */
export async function getCachedResultId(
  imageHash: string
): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    return await redis.get<string>(`cache:img:${imageHash}`);
  } catch (error) {
    console.error("Redis getCachedResultId error:", error);
    return null;
  }
}
