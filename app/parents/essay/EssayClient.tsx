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

interface Note { tag: string; text: string; weak?: string; }
interface Segment { label: string; en: string; gist: string; notes: Note[]; }

const TAG_COLOR: Record<string, string> = {
  "후킹": "#dc2626", "디테일": "#0891b2", "메타포": "#7c3aed", "목소리·문체": "#b45309",
  "취약성": "#be185d", "전공 적합성": "#047857", "주도성": "#2563eb", "임팩트": "#ca8a04",
  "구조": "#475569", "결말": "#9333ea", "입학사정관의 시선": "#0f766e",
};

const SEGMENTS: Segment[] = [
  {
    label: "1문단 · 후킹",
    gist: "해변에서 죽은 해파리를 밟는 '장면'으로 시작하고, 에세이 전체를 관통할 질문('쓸모가 있나?')을 1문단에 심는다.",
    en: "Strolling along Sokcho beach in Korea, something wobbled underfoot and my nerves in my ankle suddenly sang loudly. Oops! I'd inadvertently stumbled on a dead jellyfish. Wincing from the sting, I questioned the purpose of this dead-yet-venomous creature. Is there anything good about it? Little did I know that later this question of dead jellyfish would emerge very useful, as I struggled to assimilate into American high school.",
    notes: [
      { tag: "후킹", text: "첫 문장이 '설명'이 아니라 '장면 한가운데'에서 시작합니다(in medias res). 대부분의 평범한 에세이는 '나는 한국에서 태어나 미국으로 왔다' 같은 배경 요약으로 시작해 첫 3초 안에 독자를 잃습니다. 이 글은 속초 해변을 걷다 무언가를 '밟는' 그 물리적 순간에 독자를 던져 넣어, '뭘 밟은 거지?'라는 궁금증으로 다음 문장을 읽게 만듭니다. 입학사정관은 하루 수십 편을 읽습니다 — 첫 문장에서 '어, 이건 좀 다른데'를 만들어야 합니다.", weak: "'I have always been fascinated by science since I was young.' 같은 첫 문장은 1초 만에 잊힙니다 — 추상적이고, 누구나 쓰고, 장면이 없습니다." },
      { tag: "디테일", text: "'my nerves in my ankle suddenly sang loudly(발목 신경이 갑자기 크게 노래했다)' — 통증을 'it hurt'로 말하지 않고 신경이 '노래한다'는 공감각·의인화로 씁니다. 이런 한 줄이 글에 '감각'을 입힙니다. 입학사정관은 머리로 이해하는 글보다 몸으로 느껴지는 글을 기억합니다. 추상어(painful)를 구체적 신체감각(나의 신경이 노래함)으로 바꾸는 것이 '보여주기(show)'의 핵심입니다." },
      { tag: "목소리·문체", text: "'Oops!' 한 단어가 글에 진짜 10대의 목소리를 부여합니다. 완벽하게 격식 차린 문장만 늘어놓으면 'AI가 쓴 듯한' 무미건조함이 됩니다. 짧은 감탄사·자기 비하적 유머가 '진짜 사람'을 느끼게 합니다. 에세이는 결국 '이 학생과 4년을 함께 보내고 싶은가'를 판단하는 글 — 호감 가는 목소리가 무기입니다." },
      { tag: "메타포", text: "'dead-yet-venomous creature(죽었는데도 독을 품은 생물)' — 이 모순적 묘사가 메타포의 씨앗입니다. '죽었다(쓸모없어 보임) + 그래도 쏜다(존재감은 있음)'라는 이중성이, 뒤에서 '침묵하지만 오해를 사는 이방인'인 자기 자신과 정확히 겹쳐집니다. 좋은 메타포는 우연히 예쁜 비유가 아니라, 화자의 상황과 구조적으로 일치하는 이미지입니다." },
      { tag: "구조", text: "'Is there anything good about it?(이게 뭐 하나라도 쓸모가 있나?)' — 에세이 전체가 답하게 될 '핵심 질문'을 1문단에 심습니다. 마지막 문단에서 이 질문이 'it is far from useless'라는 답으로 되돌아옵니다. 잘 짜인 에세이는 1문단에 '질문/씨앗'을, 마지막 문단에 '답/열매'를 두어 원을 닫습니다. 독자는 의식하지 못해도 이 완결성에서 만족을 느낍니다." },
      { tag: "구조", text: "'Little did I know… as I struggled to assimilate into American high school' — 마지막 문장이 '다리(bridge)' 역할을 합니다. 해변의 해파리(구체적 일화)를 미국 고교 적응(진짜 주제)에 연결하며, '이 글은 사실 이민·정체성 이야기다'를 예고합니다. 'Little did I know'는 복선 장치 — 독자에게 '곧 반전이 온다'는 기대를 겁니다." },
    ],
  },
  {
    label: "2문단 · 배경을 '갈등'으로",
    gist: "자기 배경(한국 교육)을 지루하게 설명하지 않고, 미국과의 '대조'를 통해 곧 닥칠 내적 갈등의 무대를 깐다.",
    en: "Americans do not see class conversations as luxuries, yet from my perspective, coming of age in Korea, I was floored by this freedom. Debate in Korean education is rare: classes are tightly structured lectures and any extra time is used to preview upcoming material. I frequently used our entire short break period to ask questions, as I loved forming close relationships with teachers and understanding my coursework deeply.",
    notes: [
      { tag: "구조", text: "배경 정보를 '정보'가 아니라 '대조'로 전달합니다. '미국인은 토론을 사치로 여기지 않는다 — 그런데 한국에서 자란 나는 그 자유에 압도됐다.' 같은 문화의 같은 행동(토론)이 두 사람에게 완전히 다르게 다가온다는 대비가, 앞으로 벌어질 갈등의 무대를 깝니다. 배경 설명은 지루하지만, 배경이 만드는 '긴장'은 흥미롭습니다." },
      { tag: "전공 적합성", text: "'I frequently used our entire short break period to ask questions… understanding my coursework deeply.' 쉬는 시간 전부를 질문에 쓰는 학생 — 지적 호기심과 깊이 파는 성향을 '자랑'이 아니라 '습관 묘사'로 보여줍니다. 'I am curious(나는 호기심이 많다)'라고 말하는 대신, 호기심이 많은 사람이 실제로 하는 행동을 보여줍니다. 이게 공대(연구자형 인재) 적합성의 첫 복선입니다." },
      { tag: "디테일", text: "'I was floored by this freedom(이 자유에 나는 바닥에 주저앉았다)' — 'surprised/amazed' 같은 밋밋한 단어 대신 'floored(쓰러질 만큼 충격받은)'라는 신체적 동사를 씁니다. 감정을 형용사가 아니라 '몸의 반응'으로 표현하는 일관된 습관이 글 전체의 생생함을 만듭니다." },
      { tag: "입학사정관의 시선", text: "이 문단은 '문화적 맥락(context)'을 제공합니다. 입학사정관은 지원자를 그 사람의 환경 속에서 평가합니다 — '토론이 드문 교육에서 자랐다'는 맥락을 알아야, 뒤에 나오는 '침묵'이 게으름이 아니라 문화 충돌임을 이해합니다. 자기 약점의 '배경'을 먼저 깔아두면, 약점이 변명이 아니라 극복 서사가 됩니다." },
    ],
  },
  {
    label: "3문단 · 취약성 (가장 중요한 문단)",
    gist: "완벽한 척하지 않고 '두 마디뿐이었다'는 진짜 약점을 드러낸다. 그리고 1문단의 해파리를 '나 자신'으로 연결한다.",
    en: "My parents had always spoken highly of American education, and I was excited to start at an American high school. But while I eagerly attended lectures and plowed through readings, I was perplexed by class discussions. Remembering how my Korean teachers labeled loud students \"impolite,\" I stayed silent, armed with two phrases: \"Good morning\" and \"Thank you.\" Confused by this new mode of class interaction, my social life suffered too. I felt people saw me as a dead jellyfish, with nothing to offer beyond silence and sting. This all changed when, bent over a lab bench, I explored the wonderful potential of dead jellyfish and tried to give the valueless value.",
    notes: [
      { tag: "취약성", text: "'armed with two phrases: Good morning and Thank you(무기라곤 두 마디뿐)' — 이 글에서 가장 강력한 한 줄입니다. 실패를 추상적으로('I struggled to adapt') 말하지 않고, '내가 할 줄 아는 말이 딱 두 개였다'는 구체적이고 아플 만큼 솔직한 디테일로 보여줍니다. 'armed(무장한)'이라는 단어 선택도 절묘 — 두 마디를 '무기'라 부르며, 그게 얼마나 빈약한 무장인지를 자조적으로 드러냅니다.", weak: "'I had a hard time making friends and speaking up in class.' — 사실이지만 누구나 쓰고, 구체성이 없어 마음을 움직이지 못합니다." },
      { tag: "입학사정관의 시선", text: "입학사정관은 '완벽한 영웅담'을 의심합니다. 모든 게 술술 풀린 학생보다, 진짜 약점을 인정하고 거기서 자란 학생을 신뢰합니다. 취약성은 '나는 약하다'는 고백이 아니라 '나는 솔직하고, 성장할 줄 안다'는 신호입니다. 단, 약점은 반드시 '극복/성장'으로 이어져야 합니다 — 약점만 나열하면 그냥 우는 소리가 됩니다(이 글은 다음 문장에서 곧장 전환합니다)." },
      { tag: "메타포", text: "'I felt people saw me as a dead jellyfish, with nothing to offer beyond silence and sting.' 드디어 1문단의 해파리가 '나 자신'이 됩니다. 외부의 사물(해변의 해파리)과 내부의 자아(침묵하는 나)가 하나의 이미지로 포개집니다. 'silence and sting(침묵과 독침)'은 해파리의 두 특성을 자기 처지에 정확히 매핑한 것 — 말을 못 함(침묵) + 그래서 오해받음(독침). 메타포가 장식이 아니라 '자기 인식의 언어'가 됩니다." },
      { tag: "구조", text: "'This all changed when, bent over a lab bench…' — 문단 끝에서 명확한 전환점(turning point)을 선언합니다. 'tried to give the valueless value(가치 없는 것에 가치를 주려 했다)'는 에세이 전체의 주제문(thesis)을 압축한 문장입니다. 독자에게 '여기서부터 이야기가 바뀐다'는 신호를 주어, 갈등에서 해결로 넘어가는 다리를 놓습니다." },
      { tag: "디테일", text: "'plowed through readings(독서를 갈아엎듯 헤쳐나갔다)' / 'bent over a lab bench(실험대에 몸을 숙인 채)' — 추상적 상태가 아니라 '몸의 자세·동작'으로 장면을 그립니다. 독자가 그 모습을 머릿속에 그릴 수 있게 하는 동사 선택이 글을 영화처럼 보이게 합니다." },
    ],
  },
  {
    label: "4문단 · 전환 (전공 적합성의 핵심)",
    gist: "일상의 문제(전자시계 피부 자극)를 죽은 해파리의 반투과막으로 풀려는 발상 — 생의공학 그 자체를 이야기 속에 녹인다.",
    en: "A fascinating phenomenon plagued my tenth grade class. Students with electronic watches complained of burning irritation on the skin under their watch. While reading articles on the subject, I was struck by the idea that maybe my jellyfish could help. Watches need direct contact with skin to report biofeedback on heart rate and glucose levels. Dead jellyfish, as I'd read, retain their unique semipermeable membrane, which transmits ions and biofluids. Maybe they could prevent direct skin-to-watch contact while also transmitting the valuable information.",
    notes: [
      { tag: "전공 적합성", text: "이 문단이 에세이의 '엔진'입니다. 전자시계 피부 자극 → 죽은 해파리의 반투과막(semipermeable membrane)으로 biofeedback(심박·혈당)을 전달한다는 발상은, 바이오센서·생체재료·웨어러블 — 즉 '생의공학(biomedical engineering)' 그 자체입니다. 지원 전공을 단 한 번도 '저는 생의공학에 관심 있어요'라고 말하지 않으면서, 이야기 속 실제 프로젝트로 전공 적합성을 완벽히 증명합니다. 이것이 'Show, don't tell'의 교과서적 실행입니다.", weak: "'I am passionate about biomedical engineering and want to help people with technology.' — 백 명이 똑같이 쓰는 문장. 증거 없는 선언은 입학사정관에게 0점입니다." },
      { tag: "전공 적합성", text: "주목할 점: 발상의 출발이 '논문을 읽다가(While reading articles)'입니다. 호기심이 독서로, 독서가 아이디어로, 아이디어가 실험으로 이어지는 '연구자의 사고 흐름'을 그대로 보여줍니다. 공대는 '문제를 발견하고 → 자료를 찾고 → 가설을 세우는' 사람을 원합니다. 이 문단은 그 사고 과정을 한 문단에 압축했습니다." },
      { tag: "메타포", text: "메타포가 여기서 '과학적으로' 작동합니다. '쓸모없어 보이는 죽은 해파리'가 사실은 '독특한 반투과막'이라는 진짜 가치를 품고 있다 — 이건 1문단의 질문('쓸모가 있나?')에 대한 과학적 답이자, 동시에 '쓸모없어 보이는 내 배경도 사실 가치가 있다'는 주제의 은유적 답입니다. 메타포·과학·자아가 하나의 이미지에서 동시에 작동합니다." },
      { tag: "디테일", text: "'A fascinating phenomenon plagued my tenth grade class(흥미로운 현상이 우리 10학년 교실을 괴롭혔다)' — 'plagued(역병처럼 괴롭혔다)'라는 과장된 동사가 작은 일(시계 자국)을 '풀어야 할 미스터리'로 격상시킵니다. 사소한 관찰을 탐구 거리로 프레이밍하는 솜씨 — 연구는 거창한 데서 시작하지 않고 '일상의 짜증'에서 시작한다는 걸 보여줍니다." },
    ],
  },
  {
    label: "5문단 · 주도성과 문체",
    gist: "스스로 재료를 구하고 선생님을 설득하는 '주도성', 그리고 단문 리듬으로 연구의 몰입을 '문체'로 전달한다.",
    en: "Excited by my novel idea, I got poison-eliminated jellyfish from a local fish store and lobbied my biology teacher to use school chemicals. Cutting. Filtering. Precipitating. Modeling. I relished in the rhythm of research - at my quiet lab bench, surrounded by dead jellyfish and chemicals, I finally found a weirdly comfortable freedom.",
    notes: [
      { tag: "주도성", text: "'got poison-eliminated jellyfish from a local fish store and lobbied my biology teacher(동네 생선가게에서 독 제거한 해파리를 구하고, 생물 선생님을 설득해 학교 약품을 썼다)' — 누가 시켜서가 아니라 스스로 자원을 조달하고 사람을 움직였습니다. 입학사정관이 가장 찾는 자질이 'agency(주도성)' — 환경을 탓하지 않고 스스로 길을 내는 사람입니다. 'lobbied(로비했다)'라는 단어가 특히 좋습니다 — 단순히 '허락받았다'가 아니라 능동적으로 설득했다는 뉘앙스." },
      { tag: "목소리·문체", text: "'Cutting. Filtering. Precipitating. Modeling.' 한 단어짜리 단문 4개. 이 짧고 끊어지는 리듬이 실제 실험의 반복적·집중적 리듬을 '소리 내어' 흉내 냅니다. 문장의 길이와 호흡 자체로 감정·분위기를 전달하는 고급 기법입니다. 긴 문장만 이어지면 단조롭지만, 이렇게 박자를 끊으면 독자가 그 몰입을 '느낍니다'. 문체가 곧 내용이 되는 순간입니다." },
      { tag: "구조", text: "'a weirdly comfortable freedom(묘하게 편안한 자유)' — 2문단에서 '자유(미국식 토론)'에 압도당해 주저앉았던 바로 그 단어 'freedom'이, 여기서는 정반대로 '내가 비로소 찾은 편안함'으로 되돌아옵니다. 같은 단어를 앞뒤로 대비시켜(고통의 자유 → 안식의 자유) 성장의 전환을 단 한 단어로 표시합니다. 의도된 반복(callback)은 우연이 아니라 설계입니다." },
      { tag: "전공 적합성", text: "'I relished in the rhythm of research(연구의 리듬을 음미했다)' — 결과가 아니라 '과정 자체를 즐긴다'고 말합니다. 공대·연구 트랙이 원하는 사람은 '성공해서 기뻐하는 사람'이 아니라 '실험하는 과정 자체에서 행복을 느끼는 사람'입니다. 이 한 줄이 그 기질을 정확히 증명합니다." },
    ],
  },
  {
    label: "6문단 · 재맥락화 (메타포의 피벗)",
    gist: "해파리에서 얻은 교훈을 곧바로 '나/내 문화'에 적용한다. 사물의 깨달음 → 자아의 깨달음으로 넘어가는 이 글의 심장.",
    en: "It turns out that dead jellyfish are useful, once recontextualized. Maybe the same held true for me! As a Korean transplant, I could uniquely critique the U.S. system and even offer advice. One of my favorite educational mainstays in Korea was \"Ska,\" a study cafe I attended after school. Skas are designated for intense work, often divided into different zones so students can fine-tune their study habits. Skas are also completely silent.",
    notes: [
      { tag: "메타포", text: "'It turns out that dead jellyfish are useful, once recontextualized. Maybe the same held true for me!' — 에세이 전체의 결정적 피벗(pivot)입니다. 'recontextualized(맥락을 바꾸니)'라는 단어 하나가 과학 실험과 정체성을 잇는 경첩 역할을 합니다. 해파리에서 배운 원리(쓸모없어 보여도 맥락을 바꾸면 가치가 드러난다)를 그대로 자기 자신에게 적용합니다. 사물의 교훈 → 자아의 깨달음으로 넘어가는, 이 글이 '단순한 과학 일화'가 아니라 '성장 서사'가 되는 지점입니다." },
      { tag: "주도성", text: "'I could uniquely critique the U.S. system and even offer advice(나는 미국 시스템을 독특한 시각으로 비판하고, 심지어 조언까지 할 수 있다)' — 이방인이라는 약점을 '독특한 관점'이라는 강점으로 재정의합니다. 입학사정관이 좋아하는 사고 — '나는 다르다'를 결핍이 아니라 자산으로 보는 태도. 대학 공동체에 '내가 무엇을 기여할 수 있는가'를 보여주는 대목이기도 합니다." },
      { tag: "디테일", text: "한국의 'Ska(스터디카페)'를 설명할 때, 모르는 독자(미국 입학사정관)를 위해 '구역이 나뉘어 있고, 완전히 조용하다'고 구체적으로 그려줍니다. 자기 문화를 소개할 때 '설명충'이 되지 않으면서도, 뒤에 나올 '개선'을 이해시키기 위한 정보만 골라 깝니다. 독자가 모르는 개념을 다룰 때의 모범적인 균형입니다." },
      { tag: "구조", text: "'Skas are also completely silent.' — 짧은 한 문장으로 문단을 끝내며, 다음 문단의 반전('그 침묵이 문제였다')을 위한 발판을 놓습니다. '완전히 조용하다'를 일부러 강조해, 곧 '내가 그 침묵을 깨뜨렸다'는 전개를 더 극적으로 만듭니다. 문단 끝의 한 문장을 '미끼'로 쓰는 구성." },
    ],
  },
  {
    label: "7문단 · 비판적 재창조와 임팩트",
    gist: "한국 문화를 그대로 옮기지 않고 단점(침묵)을 고쳐 '또래 멘토링'을 더한다. 그리고 '1→21명'으로 영향력을 숫자로 보여준다.",
    en: "I wanted to bring the benefits of Ska to the U.S.… I created a small Ska in the dorm lounge with a communal zone for group conversation and an independent zone with desk lamps for quiet study. One thing I hated about Korean Ska was that the silence precluded peer mentoring… I created the school's first peer tutoring period: I taught science and math, my Mexican friend Andrea taught Spanish, and many other students shared their expertise in their respective fields. The dorm Ska transformed my study 'party' from one to twenty-one.",
    notes: [
      { tag: "주도성", text: "핵심은 '비판적 재창조'입니다. 한국 Ska를 그대로 미국에 복사한 게 아니라, '내가 싫었던 점(침묵 때문에 또래 멘토링이 불가능)'을 정확히 짚고, 그 단점을 고쳐 '동료 튜터링'을 더했습니다. 자기 문화를 맹목적으로 옮기지도, 버리지도 않고 — 장점만 취해 새 환경에 맞게 개량합니다. 이게 진짜 '재맥락화'의 실천이자, 엔지니어의 사고(기존 설계의 결함을 진단하고 개선)와도 정확히 닮았습니다." },
      { tag: "임팩트", text: "'transformed my study party from one to twenty-one(공부 모임을 혼자에서 스물한 명으로 바꿨다)' — 추상적인 '많은 친구들'이 아니라 정확한 숫자(1→21)로 영향력을 보여줍니다. 숫자는 거짓말을 못 하고, 규모를 즉시 각인시킵니다. 'school's first peer tutoring period(학교 최초의 또래 튜터링 시간)' — '최초·창설'이라는 단어로 리더십과 주도성까지 한 번에 증명합니다.", weak: "'Many students joined and it became very popular.' — 'many/very'는 측정 불가능한 빈 단어. 숫자가 없으면 임팩트도 없습니다." },
      { tag: "전공 적합성", text: "'communal zone(공용 구역)'과 'independent zone with desk lamps(스탠드가 있는 독립 구역)'으로 공간을 '설계'합니다. 침묵하던 이방인이 이제 사람들의 학습 환경을 시스템으로 구축합니다 — 문제(고립된 공부)를 진단하고, 구역을 나눠 해결하는 이 사고가 바로 엔지니어의 설계 마인드입니다. 전공 적합성이 실험실 밖(공동체 설계)에서도 일관되게 드러납니다." },
      { tag: "입학사정관의 시선", text: "'my Mexican friend Andrea taught Spanish… students from over 30 countries' — 다양성을 '나는 다양성을 존중한다'고 선언하지 않고, 30개국 친구들과 함께 만든 구체적 시스템으로 보여줍니다. 대학은 '캠퍼스 공동체에 무엇을 더할 사람인가'를 봅니다. 이 학생은 '서로의 강점을 나누는 판'을 직접 만든 사람 — 입학 후의 기여를 미리 증명한 셈입니다." },
    ],
  },
  {
    label: "8문단 · 정직한 결말",
    gist: "'다 극복했다'고 거짓말하지 않는다. '여전히 떨린다'는 정직함이 글 전체의 신뢰를 끌어올리고, 1문단의 질문에 답한다.",
    en: "I still apprehensively contribute to class discussion. I remember my Korean hometown classroom and my throat tightens up. But then I also remember my dead jellyfish, and the beauty that comes from cutting, filtering and recontextualizing presumably \"dead\" material. My culture may sometimes feel like a dead jellyfish, but I've learned that, through a slight change of perspective, it is far from useless.",
    notes: [
      { tag: "결말", text: "'I still apprehensively contribute… my throat tightens up(여전히 토론에 조심스럽게 참여하고, 목이 조여온다)' — 가짜 해피엔딩을 거부합니다. '나는 이제 완전히 자신감 넘치는 사람이 됐다'고 쓰는 순간 글은 거짓말처럼 들립니다. 진짜 성장은 미완성이라는 걸 인정하는 이 정직함이, 역설적으로 글 전체의 신뢰도를 끌어올립니다. 입학사정관은 '문제를 다 해결한 학생'이 아니라 '문제를 정직하게 마주하고 자라는 학생'을 믿습니다.", weak: "'Now I confidently lead every class discussion and never feel afraid.' — 과장된 완결은 오히려 의심을 부릅니다. 18세가 모든 걸 극복했다는 건 비현실적입니다." },
      { tag: "메타포", text: "'cutting, filtering and recontextualizing presumably dead material' — 5문단의 실험 동사(자르고, 거르고)를 이번엔 '인생'에 그대로 적용합니다. 해파리를 다루던 손길이 곧 자기 정체성을 다루는 방식이 됩니다. 소재(해파리)·과학(연구)·자아(정체성)가 마지막에 하나의 동사로 완전히 융합됩니다. 메타포를 끝까지 일관되게 끌고 와 닫는, 흔치 않은 완성도입니다." },
      { tag: "구조", text: "'it is far from useless(결코 쓸모없지 않다)' — 1문단에서 던진 질문 'Is there anything good about it?'에 마지막 문장이 정확히 답합니다. 수미상관(首尾相關)이 완성되며 원이 닫힙니다. 독자는 의식하지 못해도 '아, 처음 그 질문이 여기서 답해지는구나' 하는 무의식적 만족을 느낍니다. 좋은 결말은 새로운 이야기를 꺼내지 않고, 처음에 심은 씨앗을 거둡니다." },
      { tag: "취약성", text: "'My culture may sometimes feel like a dead jellyfish, but…' — 자기 문화에 대한 양가감정을 끝까지 솔직하게 둡니다. '나는 내 뿌리가 항상 자랑스럽다'는 뻔하고 안전한 결론 대신, '때론 쓸모없게 느껴지지만, 관점을 바꾸면 그렇지 않다'는 더 정직하고 성숙한 결론에 도달합니다. 18세다운 진짜 깨달음 — 완벽한 자부심이 아니라, 불완전함을 끌어안는 어른스러움입니다." },
    ],
  },
];

const TAKEAWAYS = [
  { t: "하나의 강력한 메타포로 전체를 묶어라", d: "'죽은 해파리'가 ① 해변(문자 그대로) ② 실험실(과학) ③ 정체성(자아) 세 번 등장하며 소재·과학·자아를 하나로 엮습니다. 흩어진 일화 나열보다, 하나의 이미지로 처음부터 끝까지 관통하는 에세이가 압도적으로 강합니다. 단, 메타포는 화자의 상황과 '구조적으로' 맞아야 합니다(쓸모없어 보임 = 나의 처지)." },
  { t: "약점을 구체적으로, 그리고 솔직하게", d: "'Good morning, Thank you 두 마디뿐'처럼 아플 만큼 구체적인 약점을 드러내고, 결말도 '여전히 떨린다'로 정직하게 둡니다. 입학사정관은 완벽한 영웅담을 의심합니다. 단, 약점은 반드시 성장·행동으로 이어져야 합니다." },
  { t: "전공 적합성은 '선언'이 아니라 '증명'", d: "'생의공학에 관심 있다'고 말하지 않고, 해파리 반투과막 바이오센서 프로젝트로 보여줍니다. 'I am passionate about X'는 백 명이 쓰는 빈 문장 — 대신 X에 빠진 사람이 실제로 한 행동·사고를 보여주세요. Show, don't tell." },
  { t: "추상어를 구체와 숫자로 바꿔라", d: "속초 해변, 전자시계, 'Good morning', 'one to twenty-one' — 구체적 디테일과 정확한 숫자가 글을 기억에 남게 하고 신뢰를 줍니다. 'many/very/passionate' 같은 측정 불가능한 단어를 의심하세요." },
  { t: "문체로 감정을 전달하라", d: "'Cutting. Filtering. Precipitating.' 같은 단문 리듬, 'floored/plagued/sang' 같은 신체적 동사 — 문장의 길이와 단어 선택 자체가 분위기를 만듭니다. 무슨 말을 하느냐만큼 '어떻게' 말하느냐가 중요합니다." },
  { t: "결말은 '완벽한 극복'이 아니라 '성장한 관점'", d: "문제를 다 해결했다가 아니라, 같은 상황을 새 관점으로 보게 됐다 — 더 성숙하고 진짜인 마무리입니다. 그리고 1문단에 심은 질문/이미지를 마지막에 회수해 원을 닫으세요(수미상관)." },
  { t: "약점 → 강점의 재정의(reframing)", d: "'이방인'이라는 결핍을 '독특한 관점·기여'로 다시 정의합니다. 입시 에세이의 본질은 '나의 다름이 이 공동체에 무엇을 더하는가'를 보여주는 것입니다." },
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
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "36px 20px 100px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#b45309", background: "#fef3c7", borderRadius: 6, padding: "3px 9px" }}>🏆 합격 에세이 분석</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: "#047857", background: "#e9fbf2", borderRadius: 6, padding: "3px 9px" }}>Cornell · Biomedical Engineering</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>
          코넬 공대 합격 에세이, 한 문단씩 뜯어보기
        </h1>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
          실제 <strong>코넬대학교 공과대학(생의공학)</strong> 합격생의 Common App 메인 에세이입니다. '죽은 해파리(dead jellyfish)'라는
          하나의 메타포로 한국 출신의 정체성을 가치로 바꿔낸 글을, <strong>무엇이 왜 잘 됐는지</strong> 문단마다 기법·원리·“약하게 썼다면”까지 쪼개 분석했습니다.
        </p>
        <a href="/parents/cornell-bme-essay.pdf" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 9, padding: "10px 18px", fontSize: 13.5, fontWeight: 800, marginBottom: 26 }}>
          📄 원문 에세이 전체 PDF 보기 →
        </a>

        {/* Architecture overview */}
        <div style={{ background: "linear-gradient(180deg,#fbfcfe,#fff)", border: "1px solid #e2e6ea", borderRadius: 14, padding: "22px 24px", marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", marginBottom: 12 }}>먼저 — 이 에세이의 '설계도'</div>
          <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, margin: "0 0 14px" }}>
            <strong>주제 한 줄:</strong> 쓸모없어 보이는 것도 맥락을 바꾸면 가치가 있다 — 죽은 해파리처럼, 내 한국 배경도.
          </p>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#475569", marginBottom: 8 }}>서사의 흐름(arc)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 16, fontSize: 12.5, color: "#475569" }}>
            {["갈등 — 침묵하는 이방인", "전환 — 해파리 연구", "깨달음 — 재맥락화", "행동 — Ska 리더십", "정직한 성장"].map((s, i, a) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "#f1f5f9", borderRadius: 6, padding: "5px 10px", fontWeight: 700 }}>{s}</span>
                {i < a.length - 1 && <span style={{ color: "#cbd5e1" }}>→</span>}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#475569", marginBottom: 8 }}>'죽은 해파리' 메타포가 세 번 등장</div>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>① 해변(문자 그대로)</strong> — 해파리를 밟고 '쓸모가 있나?' 질문</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>② 실험실(과학)</strong> — 해파리의 반투과막에 진짜 가치가 있음을 발견</li>
            <li style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}><strong>③ 정체성(자아)</strong> — '쓸모없어 보이는 내 배경'도 재맥락화하면 가치가 있음</li>
          </ul>
        </div>

        {/* Segment-by-segment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SEGMENTS.map((seg, i) => (
            <section key={i} style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "22px 24px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#7c3aed", margin: "0 0 4px" }}>{seg.label}</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 14px" }}>{seg.gist}</p>
              <blockquote style={{ margin: "0 0 18px", padding: "14px 16px", background: "#f7f8fa", borderLeft: "3px solid #cbd5e1", borderRadius: 8, fontSize: 13.5, color: "#475569", lineHeight: 1.7, fontStyle: "italic" }}>
                "{seg.en}"
              </blockquote>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {seg.notes.map((n, k) => (
                  <div key={k}>
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#fff", background: TAG_COLOR[n.tag] ?? "#475569", borderRadius: 6, padding: "2px 9px", marginBottom: 6 }}>{n.tag}</span>
                    <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.9, margin: 0 }}>{n.text}</p>
                    {n.weak && (
                      <p style={{ fontSize: 13, color: "#b91c1c", lineHeight: 1.7, margin: "8px 0 0", padding: "9px 12px", background: "#fef2f2", borderRadius: 8 }}>
                        <strong>✗ 약하게 썼다면:</strong> {n.weak}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Takeaways */}
        <section style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 16, padding: "24px 24px", marginTop: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 16px" }}>✍️ 이 에세이에서 배울 7가지</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TAKEAWAYS.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#1a1a1f", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: "#1a1a1f", marginBottom: 3 }}>{t.t}</div>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75, margin: 0 }}>{t.d}</p>
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
