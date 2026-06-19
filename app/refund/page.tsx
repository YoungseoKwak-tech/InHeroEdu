import type { Metadata } from "next";
import Link from "next/link";
import { merchantInfo, creditProducts } from "@/lib/legal";

export const metadata: Metadata = {
  title: "환불정책 · 이용약관",
  description: "InHero Edu 크레딧·구독 상품의 결제 안내, 환불 규정, 콘텐츠 이용 주의사항 및 사업자 정보.",
  alternates: { canonical: "/refund" },
};

export default function RefundPolicyPage() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "120px 22px 100px", color: "#1a1a1f", fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>환불정책 및 이용약관</h1>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>전자상거래 등에서의 소비자보호에 관한 법률에 따른 결제·환불 안내입니다.</p>

      {/* 결제 상품 안내 */}
      <section style={{ marginBottom: 34 }}>
        <h2 style={sectionH}>결제 상품 안내</h2>
        <div style={{ border: "1px solid #e6e8ec", borderRadius: 12, overflow: "hidden" }}>
          {creditProducts.map((p, i) => (
            <div key={p.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 16px", fontSize: 14.5, borderTop: i ? "1px solid #eef1f4" : "none" }}>
              <span style={{ fontWeight: 700 }}>{p.label}</span>
              <span style={{ color: "#334155" }}>{p.price} <span style={{ color: "#94a3b8", fontSize: 12.5 }}>({p.note})</span></span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginTop: 12 }}>
          ※ 본 상품은 결제 즉시 크레딧이 계정에 적립되며, 디지털 콘텐츠 특성상 크레딧을 사용한 이후에는 환불이 제한될 수 있습니다.
        </p>
      </section>

      {/* 제1조 */}
      <section style={{ marginBottom: 30 }}>
        <h2 style={sectionH}>제1조 (크레딧 및 구독 서비스의 환불)</h2>
        <p style={{ fontSize: 14.5, color: "#334155" }}>
          본 서비스는 「전자상거래 등에서의 소비자보호에 관한 법률」 및 「학원의 설립·운영 및 과외교습에 관한 법률」(인터넷 개인교습 한정)을 준수합니다.
        </p>

        <h3 style={subH}>단발성 크레딧 충전 상품 (200 / 500 / 1,000 크레딧)</h3>
        <ul style={ulStyle}>
          <li><strong>구매 후 7일 이내 (미사용 시):</strong> 크레딧을 전혀 사용하지 않은 경우 전자상거래법에 의하여 100% 전액 환불이 가능합니다.</li>
          <li><strong>구매 후 7일 이내 (일부 사용 시):</strong> 충전된 크레딧 중 일부를 사용하여 디지털 교재·에세이·문제은행 등의 콘텐츠를 열람한 경우, 디지털 콘텐츠 특성상 원천적으로 환불이 불가능하거나 사용한 크레딧의 단가(정가 기준) 및 결제 수수료를 차감한 잔액이 환불됩니다.</li>
          <li><strong>구매 후 7일이 경과한 경우:</strong> 잔여 크레딧에 대한 환불이 제한될 수 있습니다.</li>
        </ul>

        <h3 style={subH}>자료실 정기 구독권 (월간 멤버십)</h3>
        <ul style={ulStyle}>
          <li>결제 후 제공되는 혜택(정기 크레딧, 한국어 핵심 노트 등)을 전혀 이용하지 않고 7일 이내에 환불을 요청하는 경우 전액 환불됩니다.</li>
          <li>서비스 이용 도중 중도 해지 시에는 당월 이미 사용한 일수 또는 다운로드(열람)한 콘텐츠 가치를 일할 계산하여 차감한 후 잔액을 환불 처리합니다.</li>
        </ul>
      </section>

      {/* 제2조 */}
      <section style={{ marginBottom: 30 }}>
        <h2 style={sectionH}>제2조 (콘텐츠 이용 주의사항)</h2>
        <p style={{ fontSize: 14.5, color: "#334155" }}>
          InHero 자료실에서 제공하는 모든 디지털 교재(1,000페이지 분량), AP 문제은행, 합격 에세이 등은 저작권법의 보호를 받습니다.
          구매(열람) 완료된 자료의 무단 전재·배포·캡처 및 공유 행위가 적발될 경우 회원 자격이 박탈되며 법적 책임을 물을 수 있습니다.
        </p>
      </section>

      {/* 환불 요청 */}
      <section style={{ marginBottom: 30 }}>
        <h2 style={sectionH}>환불 요청 방법</h2>
        <p style={{ fontSize: 14.5, color: "#334155" }}>
          환불 또는 구독 해지는 이메일(<a href={`mailto:${merchantInfo.email}`} style={{ color: "#047a45" }}>{merchantInfo.email}</a>)로 요청해 주시면 영업일 기준 3일 이내 처리됩니다.
        </p>
      </section>

      {/* 사업자 정보 */}
      <section style={{ borderTop: "1px solid #e6e8ec", paddingTop: 22 }}>
        <h2 style={sectionH}>사업자 정보</h2>
        <div style={{ fontSize: 13.5, color: "#475569", display: "grid", gap: 4 }}>
          <span>상호명: {merchantInfo.companyName}</span>
          <span>대표자명: {merchantInfo.representative}</span>
          <span>사업자등록번호: {merchantInfo.businessRegistrationNumber}</span>
          <span>이메일: {merchantInfo.email}</span>
        </div>
        <p style={{ marginTop: 18, fontSize: 13 }}>
          <Link href="/terms" style={{ color: "#047a45" }}>이용약관</Link>
          <span style={{ color: "#cbd5e1", margin: "0 8px" }}>|</span>
          <Link href="/privacy" style={{ color: "#047a45" }}>개인정보처리방침</Link>
          <span style={{ color: "#cbd5e1", margin: "0 8px" }}>|</span>
          <Link href="/refund" style={{ color: "#047a45" }}>환불정책</Link>
        </p>
      </section>
    </main>
  );
}

const sectionH: React.CSSProperties = { fontSize: 18, fontWeight: 800, marginBottom: 12 };
const subH: React.CSSProperties = { fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", margin: "16px 0 8px" };
const ulStyle: React.CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 8, fontSize: 14, color: "#334155" };
