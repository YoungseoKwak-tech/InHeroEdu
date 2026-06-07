/**
 * Core Notes 한국어 스토리텔링 버전 — lessonId로 조회하는 정적 맵.
 * 런타임 AI 생성 없음 — Claude가 직접 작성한 정적 콘텐츠입니다.
 *
 * ⚠️ 이 파일은 동결(frozen)되었습니다. 병렬 작업 충돌을 피하려고
 * 레지스트리를 둘로 나눴어요 — 새 콘텐츠는 registry-a.ts(터미널 A) 또는
 * registry-b.ts(터미널 B)에만 추가하고, 이 파일은 건드리지 마세요.
 * lessonId가 겹치면 나중 항목이 이깁니다(B가 A를 덮어씀).
 */
import type { CoreNote } from "@/lib/coreNotes";
import { REGISTRY_A } from "./registry-a";
import { REGISTRY_B } from "./registry-b";

const ALL_KO: CoreNote[] = [...REGISTRY_A, ...REGISTRY_B];

export const CORE_NOTES_KO: ReadonlyMap<string, CoreNote> = new Map(
  ALL_KO.map((n) => [n.lessonId, n])
);

export function getCoreNoteKo(lessonId: string): CoreNote | null {
  return CORE_NOTES_KO.get(lessonId) ?? null;
}
