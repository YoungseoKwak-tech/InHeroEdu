import Link from "next/link";
import { merchantInfo, refundPolicy } from "@/lib/legal";

const cardStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 22,
  background: "rgba(10,12,24,0.72)",
  padding: "28px",
} as const;

export const metadata = {
  title: "Legal Information | InHero",
  description: "InHero merchant disclosure, refund policy, terms, and privacy information.",
};

export default function LegalPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", background: "#02030a" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.22em",
            color: "#00FFB2",
            fontSize: 12,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Legal Center
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1, margin: "0 0 18px" }}>
          Merchant, refund, and terms.
        </h1>
        <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 720 }}>
          This page centralizes the commerce information required for card review and student trust.
          Update the merchant fields before enabling live NICEPAY checkout.
        </p>

        <section style={{ display: "grid", gap: 18, marginTop: 34 }}>
          <article style={cardStyle}>
            <h2 style={{ margin: "0 0 18px", fontSize: 24 }}>Business disclosure</h2>
            <dl style={{ display: "grid", gridTemplateColumns: "minmax(160px, 220px) 1fr", gap: "12px 18px", color: "rgba(255,255,255,0.72)" }}>
              <dt>상호 / Company</dt>
              <dd>{merchantInfo.companyName}</dd>
              <dt>대표자 / Representative</dt>
              <dd>{merchantInfo.representative}</dd>
              <dt>사업자등록번호</dt>
              <dd>{merchantInfo.businessRegistrationNumber}</dd>
              <dt>통신판매업 신고번호</dt>
              <dd>{merchantInfo.ecommerceRegistrationNumber}</dd>
              <dt>주소 / Address</dt>
              <dd>{merchantInfo.address}</dd>
              <dt>연락처 / Phone</dt>
              <dd>{merchantInfo.phone}</dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${merchantInfo.email}`} style={{ color: "#00FFB2" }}>
                  {merchantInfo.email}
                </a>
              </dd>
            </dl>
          </article>

          <article style={cardStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: 24 }}>{refundPolicy.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>{refundPolicy.summary}</p>
            <ul style={{ margin: "18px 0 0", paddingLeft: 20, color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
              {refundPolicy.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article style={cardStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: 24 }}>Terms of service</h2>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.75 }}>
              InHero provides digital course, textbook, AI tutoring, and study-planning services.
              Users are responsible for keeping account credentials secure and may not copy,
              redistribute, scrape, or resell course content without written permission.
            </p>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.75 }}>
              Paid plans unlock the service scope shown at checkout. One Subject Elite unlocks
              one selected subject. All Subject Elite unlocks all published subjects. Free users
              may access the first lesson of each course where available.
            </p>
          </article>

          <article style={cardStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: 24 }}>Privacy notice</h2>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.75 }}>
              InHero uses account, payment, course-progress, and learning telemetry data to provide
              access control, billing support, progress tracking, and personalization. Payment
              secrets are handled server-side. Billing keys are encrypted before storage.
            </p>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.75 }}>
              Students can contact support for account deletion, billing questions, or privacy
              requests at{" "}
              <a href={`mailto:${merchantInfo.email}`} style={{ color: "#00FFB2" }}>
                {merchantInfo.email}
              </a>
              .
            </p>
          </article>

          <article style={cardStyle}>
            <h2 style={{ margin: "0 0 14px", fontSize: 24 }}>AI-generated content</h2>
            <p style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.75 }}>
              InHero의 디지털 교재(Originals)와 한국어 핵심 노트는 아이비리그 재학생이 설계한 요점정리
              프롬프트로 AI가 생성하고 사람이 검수한 학습 보조 자료입니다. 시험 주관 기관의 공식 교재가
              아니며, 참고용으로 제공됩니다.
            </p>
            <p style={{ marginTop: 12 }}>
              <Link href="/ai-disclosure" style={{ color: "#00FFB2", textDecoration: "none" }}>
                AI 생성 콘텐츠 안내 전문 보기 →
              </Link>
            </p>
          </article>
        </section>

        <div style={{ marginTop: 30 }}>
          <Link href="/pricing" style={{ color: "#00FFB2", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
            Back to pricing →
          </Link>
        </div>
      </div>
    </main>
  );
}
