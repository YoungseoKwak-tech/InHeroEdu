import Link from "next/link";

export default function Hero() {
  return (
    <section style={{
      backgroundColor: "#000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "40px",
      paddingBottom: "60px",
    }}>

      {/* 로고 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-black.png"
        alt="InHero"
        style={{
          height: "180px",
          width: "auto",
          display: "block",
          marginBottom: "0px",
          background: "none",
          border: "none",
        }}
      />

      {/* 비디오 */}
      <div style={{
        width: "calc(100% - 40px)",
        maxWidth: "1400px",
        overflow: "hidden",
        borderRadius: "12px",
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <source src="/inhero-banner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 버튼들 */}
      <div style={{
        display: "flex",
        gap: "16px",
        marginTop: "32px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <Link
          href="/courses"
          className="btn-primary"
          style={{ fontSize: "16px", padding: "16px 32px", borderRadius: "16px" }}
        >
          무료로 시작하기 →
        </Link>
        <Link
          href="/courses/ap-biology/cell-structure"
          style={{
            fontSize: "16px",
            padding: "16px 32px",
            borderRadius: "16px",
            fontWeight: 600,
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "#ffffff",
            border: "2px solid rgba(255,255,255,0.3)",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          ▶ 무료 강의 미리보기
        </Link>
      </div>

      {/* 통계 바 */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        marginTop: "28px",
        fontSize: "14px",
        color: "rgba(255,255,255,0.55)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            {["🧠", "💡", "✏️", "🔬"].map((emoji, i) => (
              <div
                key={i}
                style={{
                  width: "32px", height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7F77DD, #6b63c9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px",
                  border: "2px solid rgba(255,255,255,0.2)",
                  marginLeft: i > 0 ? "-8px" : "0",
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <span><strong style={{ color: "#fff" }}>2,400+</strong> 명이 학습 중</span>
        </div>

        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", display: "inline-block" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {"★★★★★".split("").map((s, i) => (
            <span key={i} style={{ color: "#fbbf24" }}>{s}</span>
          ))}
          <span style={{ marginLeft: "4px" }}><strong style={{ color: "#fff" }}>4.9</strong>/5</span>
        </div>

        <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", display: "inline-block" }} />

        <span>전 세계 어디에도 없는 <strong style={{ color: "#fff" }}>Bilingual Thinking AI</strong></span>
      </div>

    </section>
  );
}
