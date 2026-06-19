"use client";

/**
 * /parents/vocab — WHITE 단어장 for the parent portal. Reuses the shared
 * <VocabStudy> in light theme inside the standard ParentHubShell.
 */

import ParentHubShell from "@/components/parents/ParentHubShell";
import VocabStudy from "@/components/vocab/VocabStudy";
import CreditGate from "@/components/parents/CreditGate";
import { CREDIT_COSTS } from "@/lib/credits";

export default function VocabClient() {
  return (
    <ParentHubShell
      eyebrow="📒 과목별 단어장"
      title="한국어로 보고, 영어로 외우는 필수 단어장"
      intro={
        <>
          미국 입시에서 가장 큰 약점 중 하나가 <strong>영어 어휘력</strong>입니다. 이미 아는 한국어 뜻에서
          영어 용어를 떠올리는 연습으로, 과목별 필수 용어를 빠르게 자기 것으로 만드세요.
          진짜 단어장처럼 <strong>Unit별로 번호가 매겨지고, 외운 단어는 체크</strong>해서 진도를 관리합니다.
          <br />
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>※ 단어장(체크·자가 테스트) · 플래시카드(암기) · 오늘의 단어 모드를 지원합니다. 과목은 과학·수학·통계 등 분야별로 묶여 있고, 한국어 핵심노트가 채워질수록 단어장도 자동으로 늘어납니다.</span>
        </>
      }
    >
      <VocabStudy
        theme="light"
        renderGate={(subjectId, content) => (
          <CreditGate
            key={subjectId}
            gateKey={`parents:vocab:${subjectId}`}
            cost={CREDIT_COSTS.VOCAB_SUBJECT}
            bundleKey="parents:vocab"
            bundleCost={CREDIT_COSTS.VOCAB}
            bundleLabel="전 과목 한 번에"
            title="📒 이 과목 단어장 잠금해제 — 25 크레딧"
            desc={`이 과목 필수 영어 용어를 한국어 뜻과 함께 — 단어장·플래시카드·오늘의 단어 모드까지. 과목 1개당 ${CREDIT_COSTS.VOCAB_SUBJECT} 크레딧이고, 전 과목을 한 번에 열려면 ${CREDIT_COSTS.VOCAB} 크레딧이에요.`}
          >
            {content}
          </CreditGate>
        )}
      />
    </ParentHubShell>
  );
}
