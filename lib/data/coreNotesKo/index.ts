/**
 * Core Notes 한국어 스토리텔링 버전 — lessonId로 조회하는 정적 맵.
 * 새 과목/단원을 작성하면 파일을 추가하고 여기 spread에 합치면 끝.
 * 런타임 AI 생성 없음 — Claude가 직접 작성한 정적 콘텐츠입니다.
 */
import type { CoreNote } from "@/lib/coreNotes";
import { AP_CHEM_U1A_KO } from "./ap-chemistry-u1a";
import { AP_CHEM_U1B_KO } from "./ap-chemistry-u1b";
import { AP_CHEM_U2A_KO } from "./ap-chemistry-u2a";
import { AP_CHEM_U2B_KO } from "./ap-chemistry-u2b";
import { AP_CHEM_U2C_U3A_KO } from "./ap-chemistry-u2c-u3a";

const ALL_KO: CoreNote[] = [
  ...AP_CHEM_U1A_KO,
  ...AP_CHEM_U1B_KO,
  ...AP_CHEM_U2A_KO,
  ...AP_CHEM_U2B_KO,
  ...AP_CHEM_U2C_U3A_KO,
];

export const CORE_NOTES_KO: ReadonlyMap<string, CoreNote> = new Map(
  ALL_KO.map((n) => [n.lessonId, n])
);

export function getCoreNoteKo(lessonId: string): CoreNote | null {
  return CORE_NOTES_KO.get(lessonId) ?? null;
}
