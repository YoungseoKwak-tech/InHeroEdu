/**
 * Purchasable credit packages (shared client + server). Prices in KRW for the
 * parent portal; benchmarked to the student passes (₩1,550/$). The order's
 * serviceId is `credits:<id>` so the NicePay approve hook can grant credits.
 */

export interface CreditPackage {
  id: string;
  credits: number;
  krw: number;
  name: string;
  note?: string;
  best?: boolean;
  /** Only shown to the founder account (real-payment test). */
  adminOnly?: boolean;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: "credits-test", credits: 10, krw: 1000, name: "테스트 충전 (1,000원)", note: "결제 테스트용 · 관리자 전용", adminOnly: true },
  { id: "credits-25", credits: 25, krw: 5000, name: "InHero 크레딧 25", note: "소액 충전 (5,000원)" },
  { id: "credits-200", credits: 200, krw: 33000, name: "InHero 크레딧 200", note: "단발 충전" },
  { id: "credits-500", credits: 500, krw: 75000, name: "InHero 크레딧 500", note: "★ 한 과목 전체패스 가치", best: true },
  { id: "credits-1000", credits: 1000, krw: 139000, name: "InHero 크레딧 1000", note: "전 과목 가기 전 징검다리" },
];

export function getCreditPackage(id: string): CreditPackage | undefined {
  return CREDIT_PACKAGES.find((p) => p.id === id);
}

export const CREDIT_SERVICE_PREFIX = "credits:";

export function creditServiceId(id: string): string {
  return `${CREDIT_SERVICE_PREFIX}${id}`;
}

/** Resolve an order serviceId (`credits:<id>`) back to its package. */
export function parseCreditServiceId(serviceId: string): CreditPackage | undefined {
  if (!serviceId.startsWith(CREDIT_SERVICE_PREFIX)) return undefined;
  return getCreditPackage(serviceId.slice(CREDIT_SERVICE_PREFIX.length));
}
