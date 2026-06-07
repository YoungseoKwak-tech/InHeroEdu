"use client";

/**
 * /parents/essay — a real Cornell Engineering (Biomedical) admit essay,
 * broken down paragraph by paragraph with very detailed Korean analysis of
 * what works. Real content shared by the founder (their own admit essay).
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientSession } from "@/lib/client-auth";

const GREEN = "#00b85f";

interface Note { tag: string; text: string; }
interface Segment { label: string; en: string; notes: Note[]; }

const TAG_COLOR: Record<string, string> = {
  "후킹": "#dc2626", "디테일": "#0891b2", "메타포": "#7c3aed", "목소리·문체": "#b45309",
  "취약성": "#be185d", "전공 적합성": "#047857", "주도성": "#2563eb", "임팩트": "#ca8a04",
  "구조": "#475569", "결말": "#9333ea",
};

const SEGMENTS: Segment[] = [
  {
    label: "1문단 · 후킹 (속초 해변, 죽은 해파리)",
    en: "Strolling along Sokcho beach in Korea, something wobbled underfoot and my nerves in my ankle suddenly sang loudly. Oops! I'd inadvertently stumbled on a dead jellyfish. Wincing from the sting, I questioned the purpose of this dead-yet-venomous creature. Is there anything good about it? Little did I know that later this question of dead jellyfish would emerge very useful, as I struggled to assimilate into American high school.",
    notes: [
      { tag: "후킹", text: "설명이 아니라 '장면'으로 시작합니다(in medias res). '나는 한국에서 자랐다' 같은 요약 대신, 속초 해변을 걷다 무언가를 밟는 그 순간 속으로 독자를 곧장 끌어들입니다. 첫 문장에서 독자가 '무슨 일이지?' 하고 궁금해지면 절반은 성공입니다." },
      { tag: "디테일", text: "'my nerves in my ankle suddenly sang loudly(발목 신경이 갑자기 크게 노래했다)'. 흔한 'it hurt(아팠다)' 대신 신경이 '노래한다'는 의인화·공감각 표현을 썼습니다. 똑같은 통증도 이렇게 쓰면 생생하게 살아납니다. 구체와 감각이 글을 기억에 남게 합니다." },
      { tag: "목소리·문체", text: "'Oops!' 한 단어가 10대다운 진짜 목소리를 줍니다. 입학사정관은 완벽하게 다듬어진 문장보다 '이 학생의 진짜 목소리'를 찾습니다. 짧은 감탄사·솔직한 말투가 사람 냄새를 냅니다." },
      { tag: "구조", text: "1문단에서 에세이 전체를 관통할 질문을 미리 심습니다 — 'Is there anything good about it?(이게 뭐 하나라도 쓸모가 있나?)'. 이 질문이 마지막 문단에서 답으로 돌아옵니다. 좋은 에세이는 첫 문단에 '씨앗'을, 마지막 문단에 '열매'를 둡니다." },
      { tag: "메타포", text: "마지막 문장이 '다리' 역할을 합니다: 죽은 해파리 → 미국 고교 적응. 죽은 해파리라는 소재가 단순한 일화가 아니라, 앞으로 펼쳐질 '이민·동화' 이야기의 상징임을 예고합니다('Little did I know' = 복선)." },
    ],
  },
  {
    label: "2~3문단 · 취약성 (침묵하던 나)",
    en: "Americans do not see class conversations as luxuries, yet from my perspective, coming of age in Korea, I was floored by this freedom… Remembering how my Korean teachers labeled loud students \"impolite,\" I stayed silent, armed with two phrases: \"Good morning\" and \"Thank you.\" … I felt people saw me as a dead jellyfish, with nothing to offer beyond silence and sting.",
    notes: [
      { tag: "구조", text: "자신의 배경(한국 교육)을 '설명'하지 않고 '갈등'으로 보여줍니다. 한국식 강의·침묵 문화 vs 미국식 토론 문화의 대조가 곧 이 학생이 겪는 내적 긴장입니다. 배경 설명은 지루하지만, 배경이 만든 '갈등'은 흥미롭습니다." },
      { tag: "취약성", text: "'armed with two phrases: Good morning and Thank you(무기라곤 두 마디뿐)'. 가장 강력한 한 줄입니다. 실패를 구체적이고 겸손하게 인정합니다. 입학사정관은 '나는 완벽했다'는 학생보다, 진짜 약점을 솔직히 드러내고 거기서 자란 학생을 신뢰합니다." },
      { tag: "메타포", text: "'people saw me as a dead jellyfish, with nothing to offer beyond silence and sting'. 1문단의 죽은 해파리가 여기서 '나 자신'이 됩니다. 외부의 사물(해파리)과 내부의 자아(나)를 하나의 이미지로 묶어, 메타포가 장식이 아니라 이야기의 뼈대가 됩니다." },
      { tag: "디테일", text: "'silence and sting(침묵과 독침)' — 해파리의 두 특성(죽어서 가만히 있음 + 그래도 쏨)을 자기 처지(말 못 함 + 그래서 오해받음)에 정확히 겹칩니다. 메타포를 끝까지 일관되게 밀어붙이는 솜씨입니다." },
    ],
  },
  {
    label: "4~5문단 · 전환 (해파리 연구 — 전공 적합성)",
    en: "A fascinating phenomenon plagued my tenth grade class. Students with electronic watches complained of burning irritation… Dead jellyfish, as I'd read, retain their unique semipermeable membrane, which transmits ions and biofluids… I got poison-eliminated jellyfish from a local fish store and lobbied my biology teacher to use school chemicals. Cutting. Filtering. Precipitating. Modeling. I relished in the rhythm of research… I finally found a weirdly comfortable freedom.",
    notes: [
      { tag: "전공 적합성", text: "에세이의 핵심 장치입니다. 전자시계 피부 자극 → 죽은 해파리의 반투과막(semipermeable membrane)으로 biofeedback을 전달한다는 발상 = 바이오센서·생체재료, 즉 '생의공학(biomedical engineering)' 그 자체입니다. '저는 생의공학에 관심 많아요'라고 말하지 않고, 이야기 속 실제 프로젝트로 전공 적합성을 증명합니다. 자랑(telling)이 아니라 보여주기(showing)." },
      { tag: "주도성", text: "'got jellyfish from a local fish store and lobbied my biology teacher(동네 생선가게에서 해파리를 구하고 생물 선생님을 설득해 학교 약품을 썼다)'. 누가 시켜서가 아니라 스스로 자원을 구하고 사람을 움직였습니다. 입학사정관이 찾는 'agency(주도성)'를 구체적 행동으로 보여줍니다." },
      { tag: "목소리·문체", text: "'Cutting. Filtering. Precipitating. Modeling.' 한 단어 단문 4개의 리듬이 실제 실험의 반복적 리듬을 흉내 냅니다. 문장 길이를 의도적으로 바꿔 '연구의 몰입감'을 독자가 느끼게 합니다. 문체로 감정을 전달하는 고급 기술입니다." },
      { tag: "구조", text: "'weirdly comfortable freedom(묘하게 편안한 자유)'. 2문단에서 '자유(토론)'에 짓눌렸던 학생이, 조용한 실험실에서 비로소 자기만의 자유와 소속감을 찾습니다. 같은 단어('freedom')를 앞뒤로 대비시켜 성장의 전환점을 표시합니다." },
    ],
  },
  {
    label: "6~7문단 · 종합 (재맥락화 + 환원, Ska 리더십)",
    en: "It turns out that dead jellyfish are useful, once recontextualized. Maybe the same held true for me!… I created the school's first peer tutoring period: I taught science and math, my Mexican friend Andrea taught Spanish… The dorm Ska transformed my study 'party' from one to twenty-one.",
    notes: [
      { tag: "메타포", text: "메타포의 결정적 피벗입니다 — 'dead jellyfish are useful, once recontextualized. Maybe the same held true for me!'. 해파리에서 얻은 교훈(쓸모없어 보여도 맥락을 바꾸면 가치가 있다)을 곧바로 '나/내 문화'에 적용합니다. 사물의 교훈 → 자아의 깨달음으로 자연스럽게 넘어가는, 이 에세이의 심장입니다." },
      { tag: "주도성", text: "한국의 'Ska(스터디카페)' 개념을 미국 기숙사에 가져오되, 한국 Ska의 단점(침묵 때문에 또래 멘토링이 불가능)을 보완해 '동료 튜터링'을 더합니다. 단순 이식이 아니라 '비판적 재창조' — 자기 문화를 그대로 옮기지 않고, 장점만 취해 새 환경에 맞게 개선합니다." },
      { tag: "임팩트", text: "'from one to twenty-one(혼자에서 스물한 명으로)'. 추상적인 '많은 친구들'이 아니라 숫자로 영향력을 보여줍니다. 'school's first peer tutoring period(학교 최초의 또래 튜터링 시간)' — 최초·창설이라는 리더십까지. 입학사정관은 '영향의 규모와 구체성'을 봅니다." },
      { tag: "전공 적합성", text: "30개국 친구들, Andrea(스페인어) 등 다양성을 '활용'합니다. 침묵하던 학생이 이제 공동체를 '설계'합니다(communal zone / independent zone로 공간을 나눔 — 엔지니어의 시스템 설계 마인드까지 은근히 드러남)." },
    ],
  },
  {
    label: "8문단 · 결말 (정직한 성장)",
    en: "I still apprehensively contribute to class discussion. I remember my Korean hometown classroom and my throat tightens up. But then I also remember my dead jellyfish, and the beauty that comes from cutting, filtering and recontextualizing presumably \"dead\" material. My culture may sometimes feel like a dead jellyfish, but I've learned that, through a slight change of perspective, it is far from useless.",
    notes: [
      { tag: "결말", text: "가짜 해피엔딩이 아닙니다 — 'I still apprehensively contribute… my throat tightens up(여전히 토론이 떨리고 목이 조여온다)'. '완전히 극복했다'고 거짓말하지 않습니다. 진짜 성장은 미완성이라는 걸 인정하는 이 정직함이, 오히려 글 전체의 신뢰도를 끌어올립니다. 입학사정관은 '완벽한 극복' 서사를 의심합니다." },
      { tag: "메타포", text: "수미상관(首尾相關). 실험 동사 'cutting, filtering and recontextualizing'를 이번엔 인생에 그대로 적용합니다. 해파리 연구의 과정이 곧 자기 정체성을 다루는 방식이 됩니다 — 소재(해파리)·과학(연구)·자아(정체성)가 하나의 동사로 묶입니다." },
      { tag: "구조", text: "1문단의 질문('Is there anything good about it?')에 마지막 문장이 답합니다 — 'it is far from useless(결코 쓸모없지 않다)'. 처음에 던진 씨앗 질문을, 성장한 시점에서 회수합니다. 원이 깔끔하게 닫힙니다." },
      { tag: "취약성", text: "'My culture may sometimes feel like a dead jellyfish' — 자기 문화에 대한 양가감정을 끝까지 솔직하게 둡니다. '나는 내 뿌리가 자랑스럽다'는 뻔한 결론 대신, '때론 쓸모없게 느껴지지만 관점을 바꾸면 그렇지 않다'는 더 정직하고 어른스러운 결론에 도달합니다." },
    ],
  },
];

const TAKEAWAYS = [
  { t: "하나의 강력한 메타포로 전체를 묶어라", d: "'죽은 해파리'가 처음·중간·끝에 모두 등장하며 소재·과학·자아를 하나로 엮습니다. 흩어진 일화 나열보다, 하나의 이미지로 관통하는 에세이가 훨씬 강합니다." },
  { t: "약점을 솔직히 — 완벽한 척하지 마라", d: "'Good morning, Thank you 두 마디뿐'처럼 진짜 취약함을 드러내고, 결말도 '여전히 떨린다'로 정직하게 둡니다. 입학사정관은 완벽한 영웅담을 의심합니다." },
  { t: "전공 적합성은 '자랑'이 아니라 '이야기 속에'", d: "'생의공학에 관심 있다'고 말하지 않고, 해파리 반투과막 바이오센서 프로젝트로 증명합니다. Telling이 아니라 Showing." },
  { t: "추상 대신 구체", d: "속초 해변, 전자시계, 'Good morning', 'one to twenty-one' — 구체적 디테일과 숫자가 글을 기억에 남게 하고 신뢰를 줍니다." },
  { t: "결말은 '완벽한 극복'이 아니라 '성장한 관점'으로", d: "문제를 다 해결했다가 아니라, 같은 상황을 새로운 관점으로 보게 됐다 — 이것이 더 성숙하고 진짜인 마무리입니다." },
];

export default function EssayClient() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);
  const mentor = () => {
    if (loggedIn) router.push("/dm/yng0802");
    else window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/dm/yng0802" } }));
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 20px 100px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#b45309", background: "#fef3c7", borderRadius: 6, padding: "3px 9px" }}>🏆 합격 에세이 분석</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#047857", background: "#e9fbf2", borderRadius: 6, padding: "3px 9px" }}>Cornell · Biomedical Engineering</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
          코넬 공대 합격 에세이, 한 문단씩 뜯어보기
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
          실제 <strong>코넬대학교 공과대학(생의공학)</strong> 합격생의 Common App 메인 에세이입니다. '죽은 해파리(dead jellyfish)'라는
          하나의 메타포로 한국 출신의 정체성을 가치로 바꿔낸 글을, <strong>무엇이 왜 잘 됐는지</strong> 한 문단씩 쪼개 분석했습니다.
        </p>
        <a href="/parents/cornell-bme-essay.pdf" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 9, padding: "10px 18px", fontSize: 13.5, fontWeight: 800, marginBottom: 26 }}>
          📄 원문 에세이 전체 PDF 보기 →
        </a>

        {/* Overview */}
        <div style={{ background: "linear-gradient(180deg,#fbfcfe,#fff)", border: "1px solid #e2e6ea", borderRadius: 14, padding: "20px 22px", marginBottom: 30 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", marginBottom: 10 }}>한눈에 — 이 에세이가 강한 4가지 이유</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
            <li style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}><strong>① 하나의 메타포</strong>(죽은 해파리)로 소재·과학·자아를 끝까지 일관되게 엮음</li>
            <li style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}><strong>② 전공 적합성</strong>을 '자랑'이 아니라 실제 프로젝트(반투과막 바이오센서)로 증명</li>
            <li style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}><strong>③ 취약성</strong>을 솔직히 드러내고, 결말도 '완벽한 극복'이 아닌 정직한 성장으로</li>
            <li style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}><strong>④ 구체적 디테일·숫자</strong>(속초 해변, 1→21명)로 기억에 남고 신뢰를 줌</li>
          </ul>
        </div>

        {/* Segment-by-segment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SEGMENTS.map((seg, i) => (
            <section key={i} style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 15.5, fontWeight: 800, color: "#7c3aed", margin: "0 0 12px" }}>{seg.label}</h2>
              <blockquote style={{ margin: "0 0 18px", padding: "14px 16px", background: "#f7f8fa", borderLeft: "3px solid #cbd5e1", borderRadius: 8, fontSize: 13.5, color: "#475569", lineHeight: 1.7, fontStyle: "italic" }}>
                "{seg.en}"
              </blockquote>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {seg.notes.map((n, k) => (
                  <div key={k}>
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#fff", background: TAG_COLOR[n.tag] ?? "#475569", borderRadius: 6, padding: "2px 9px", marginBottom: 6 }}>{n.tag}</span>
                    <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.85, margin: 0 }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Takeaways */}
        <section style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "24px 24px", marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px" }}>✍️ 이 에세이에서 배울 5가지</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {TAKEAWAYS.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#1a1a1f", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", marginBottom: 3 }}>{t.t}</div>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor CTA */}
        <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", borderRadius: 16, padding: "28px 26px", marginTop: 24, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>내 자녀 에세이도 이렇게 봐줄 멘토가 필요하신가요?</div>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13.5, lineHeight: 1.7, marginBottom: 18, maxWidth: 440, margin: "0 auto 18px" }}>
            이 에세이를 쓴 코넬 공대 합격생 멘토에게 1:1로 직접 물어보세요. 에세이 방향·소재·구조를 함께 잡아드립니다.
          </p>
          <button onClick={mentor} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "13px 30px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
            멘토에게 1:1로 물어보기 →
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 22, lineHeight: 1.7 }}>
          ※ 실제 합격생 본인이 공유한 에세이입니다. 표현·아이디어를 그대로 베끼는 것은 표절이며, '기법'을 배워 자신만의 이야기에 적용하세요.
        </p>
      </div>
    </div>
  );
}
