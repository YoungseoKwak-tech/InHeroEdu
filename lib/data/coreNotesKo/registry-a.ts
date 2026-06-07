/**
 * Core Notes 한국어 레지스트리 A — 터미널 A 전용.
 * AP Chemistry → 과목 칩 위에서 아래로 (Environmental Science, Statistics,
 * Biology, Calculus AB, World History, Physics 2, Physics 1, CSA, Human
 * Geography ...). 새 데이터 파일을 추가하면 여기에만 import + spread 하세요.
 * 터미널 B는 이 파일을 절대 건드리지 않습니다 (registry-b.ts 사용).
 */
import type { CoreNote } from "@/lib/coreNotes";
import { AP_CHEM_U1A_KO } from "./ap-chemistry-u1a";
import { AP_CHEM_U1B_KO } from "./ap-chemistry-u1b";
import { AP_CHEM_U2A_KO } from "./ap-chemistry-u2a";
import { AP_CHEM_U2B_KO } from "./ap-chemistry-u2b";
import { AP_CHEM_U2C_U3A_KO } from "./ap-chemistry-u2c-u3a";
import { AP_CHEM_U3B_KO } from "./ap-chemistry-u3b";
import { AP_CHEM_U3C_KO } from "./ap-chemistry-u3c";
import { AP_CHEM_U3D_U4A_KO } from "./ap-chemistry-u3d-u4a";
import { AP_CHEM_U4B_KO } from "./ap-chemistry-u4b";
import { AP_CHEM_U4C_KO } from "./ap-chemistry-u4c";
import { AP_CHEM_U5A_KO } from "./ap-chemistry-u5a";
import { AP_CHEM_U5B_KO } from "./ap-chemistry-u5b";
import { AP_CHEM_U5C_U6A_KO } from "./ap-chemistry-u5c-u6a";
import { AP_CHEM_U6B_KO } from "./ap-chemistry-u6b";
import { AP_CHEM_U6C_KO } from "./ap-chemistry-u6c";
import { AP_CHEM_U6D_U7A_KO } from "./ap-chemistry-u6d-u7a";
import { AP_CHEM_U7B_KO } from "./ap-chemistry-u7b";
import { AP_CHEM_U7C_KO } from "./ap-chemistry-u7c";
import { AP_CHEM_U8A_KO } from "./ap-chemistry-u8a";
import { AP_CHEM_U8B_KO } from "./ap-chemistry-u8b";

export const REGISTRY_A: CoreNote[] = [
  ...AP_CHEM_U1A_KO,
  ...AP_CHEM_U1B_KO,
  ...AP_CHEM_U2A_KO,
  ...AP_CHEM_U2B_KO,
  ...AP_CHEM_U2C_U3A_KO,
  ...AP_CHEM_U3B_KO,
  ...AP_CHEM_U3C_KO,
  ...AP_CHEM_U3D_U4A_KO,
  ...AP_CHEM_U4B_KO,
  ...AP_CHEM_U4C_KO,
  ...AP_CHEM_U5A_KO,
  ...AP_CHEM_U5B_KO,
  ...AP_CHEM_U5C_U6A_KO,
  ...AP_CHEM_U6B_KO,
  ...AP_CHEM_U6C_KO,
  ...AP_CHEM_U6D_U7A_KO,
  ...AP_CHEM_U7B_KO,
  ...AP_CHEM_U7C_KO,
  ...AP_CHEM_U8A_KO,
  ...AP_CHEM_U8B_KO,
];
