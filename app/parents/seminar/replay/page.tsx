import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "무료 세미나 다시보기 — 아이비리그 자기주도 완전정복 | InHero 학부모",
  description: "사교육 없이 코넬 공대에 간 학생의 무료 세미나 풀영상 다시보기 + 발표자료(PDF). 과목 선정·합격 활동·합격 에세이·GPA/SAT 전략까지.",
  alternates: { canonical: "/parents/seminar/replay" },
  robots: { index: false, follow: false },
};

const VIDEO_URL = "https://pxxdduhtnulwmseygojv.supabase.co/storage/v1/object/public/lesson-videos/seminar/2026-06-13/replay.mp4";
const DECK_URL = "https://pxxdduhtnulwmseygojv.supabase.co/storage/v1/object/public/textbooks/seminar/2026-06-13/deck.pdf";
const GREEN = "#00b85f";

export default function SeminarReplayPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents/seminar" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 세미나</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>🎥 무료 세미나 다시보기</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
          아이비리그 자기주도 완전정복 — 세미나 풀영상
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.7, marginBottom: 22 }}>
          사교육 없이 코넬 공대에 간 학생이 직접 진행한 무료 세미나 전체 영상입니다. 과목 선정 · 합격 활동(스파이크) · 합격 에세이 · GPA/SAT 전략까지.
        </p>

        {/* Video */}
        <div style={{ background: "#000", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e6ea", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
          <video controls playsInline preload="metadata" style={{ width: "100%", display: "block", aspectRatio: "16 / 9", background: "#000" }}>
            <source src={VIDEO_URL} type="video/mp4" />
            영상을 재생할 수 없어요. 아래 링크로 직접 열어주세요.
          </video>
        </div>
        <div style={{ marginTop: 10, fontSize: 12.5, color: "#94a3b8" }}>
          재생이 안 되면 <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#0369a1", fontWeight: 700 }}>여기서 영상 직접 열기 →</a>
        </div>

        {/* Deck */}
        <div style={{ marginTop: 30, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.01em" }}>📑 세미나 발표자료 (PDF)</h2>
              <p style={{ fontSize: 13.5, color: "#64748b", margin: 0 }}>세미나에서 쓴 슬라이드 전체를 PDF로 보고 다운로드하세요.</p>
            </div>
            <a href={DECK_URL} target="_blank" rel="noopener noreferrer"
              style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 10, padding: "12px 20px", fontWeight: 800, fontSize: 14 }}>
              발표자료 열기 / 다운로드 →
            </a>
          </div>
          <div style={{ marginTop: 18, borderRadius: 12, overflow: "hidden", border: "1px solid #e6e8ec" }}>
            <iframe src={`${DECK_URL}#view=FitH`} title="세미나 발표자료" style={{ width: "100%", height: 540, border: "none", display: "block" }} />
          </div>
        </div>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/parents" style={{ color: "#1a1a1f", fontWeight: 800, fontSize: 14, textDecoration: "none", border: "1.5px solid #1a1a1f", borderRadius: 10, padding: "12px 22px", display: "inline-block" }}>
            ← 학부모 자료실로
          </Link>
        </div>
      </div>
    </div>
  );
}
