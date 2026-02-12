export type ElementType = "wood" | "fire" | "earth" | "metal" | "water";

export interface ElementInfo {
  id: ElementType;
  nameKo: string;
  nameEn: string;
  hanja: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  faceCharacteristics: string[];
  personalityTraits: string[];
  season: string;
  direction: string;
  organ: string;
}
