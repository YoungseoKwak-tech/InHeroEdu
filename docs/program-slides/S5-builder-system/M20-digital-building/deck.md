---
marp: true
theme: default
paginate: true
header: "InHero · Ivy League OS · Module 20"
---

# Module 20 · Digital Building
### 시즌 5 · 빌더 시스템 — Track C: 디지털 제작

> "코딩을 모른다"는 이유로 **빈 포트폴리오**를 갖고 있는 학생이 너무 많다.
> 아이비 합격생들은 달랐다: **노코드로 시작해 코드로 끝냈다.**

**이 모듈을 끝내면 손에 쥐는 것**
- ✅ 실제 배포된 웹사이트 1개 (URL 있음)
- ✅ 앱 또는 AI 프로젝트 프로토타입 1개
- ✅ 포트폴리오 사이트 — 사정관이 클릭할 링크
→ **GitHub + 배포 링크가 달린 작업물 세트**

`[그림: InHero 수강생 포트폴리오 사이트 스크린샷 — 실제 URL 노출]`

---

# 이 모듈 지도 (Agenda)

| 파트 | 강의 | 내용 | 산출물 |
|---|---|---|---|
| 1 | 강의 84 | 웹사이트 만들기 | 배포된 URL |
| 2 | 강의 85 | 앱 만들기 | 앱 프로토타입 |
| 3 | 강의 86 | AI 프로젝트 | AI 데모 링크 |
| 4 | 강의 87 | 포트폴리오 사이트 | 완성 포트폴리오 |

🕐 예상 소요: 영상 60분 + 실습 4–8시간 (수준별 차이 큼).

> **Track C**는 코딩 경험 0에서 시작해도 된다. 노코드 → 로우코드 → 코드 순서로 간다.

---

# 0. 왜 디지털 제작인가 — 입학사정관의 시선

```
일반 학생:   "저는 코딩에 관심 있어요" (말만)
빌더 학생:   "제가 만든 사이트입니다 → [링크]" (증거)
```

**숫자로 보는 현실**
| | 말만 하는 학생 | 링크 있는 학생 |
|---|---|---|
| 사정관 기억률 | ~5% | ~60% |
| 인터뷰 대화소재 | 없음 | 무한 |
| 추천서 구체성 | 추상 | "그 앱을 직접 만든 학생" |
| 에세이 소재 | 빈곤 | 풍부 |

🎓 **Ivy Tip (Princeton 재학생)**: "면접관이 제 포트폴리오 링크를 면접 중에 직접 열었다. 그 순간이 합격을 만들었다."

---

# 0-1. 노코드 → 코드 스펙트럼 (전체 지도)

```
난이도   낮음 ────────────────────────────────── 높음
         │
레벨 1   Framer / Webflow / Notion + Super   ← 오늘 시작
레벨 2   GitHub Pages + HTML/CSS             ← 이번 주
레벨 3   Next.js / React                     ← 이번 달
레벨 4   풀스택 (DB + Auth + API)            ← 이번 학기
레벨 5   AI 모델 통합 / 논문급 프로젝트      ← 스파이크 완성
         │
산출물   "사이트 있어요"                     링크+코드+임팩트 지표
```

> 레벨 1도 **배포된 URL이 있으면 포트폴리오다**. 레벨에 부끄러움 없다.

---

# 강의 84 · 웹사이트 만들기

## 단계 ①: 목적 먼저 — "무엇을 위한 사이트인가"

| 목적 유형 | 예시 | 추천 스택 |
|---|---|---|
| 내 소개/포트폴리오 | "Kim's Projects" | Framer 또는 Next.js |
| 리서치/프로젝트 공개 | 환경 데이터 대시보드 | GitHub Pages + Chart.js |
| 커뮤니티/정보 사이트 | 학교 신문 디지털판 | Webflow |
| 제품 런칭 페이지 | 앱 소개 페이지 | Framer + Vercel |

✍️ 30초 결정: 내 사이트는 **어떤 목적**인가? 1줄로 써라.

🎓 **Ivy Tip 1 (Columbia, CS 2026)**: "Framer 무료 플랜으로 만든 1페이지 포트폴리오를 Common App Additional Information에 URL로 넣었다. 사정관 코멘트: '직접 배포한 경험이 인상적이었다'."

🎓 **Ivy Tip 2**: 목적이 불분명한 사이트는 **사정관도 기억 못 한다**. '왜 이 사이트가 세상에 존재해야 하는가' 1줄부터 써라.

---

# 84-1. 단계 ②: 스택 선택 — 노코드부터

**완전 노코드 (코딩 0줄)**
```
Framer.com  — framer.com
  무료 플랜: 커스텀 도메인 없이 .framer.app 영구 무료
  유료 Mini($5/월): 커스텀 도메인 연결 가능
  첫 사이트: 템플릿 → 텍스트 교체 → Publish = 2–4시간

Webflow  — webflow.com
  무료 Starter: 2개 프로젝트, webflow.io 서브도메인
  CMS 플랜($23/월): 블로그·뉴스 사이트에 추천
  학생 할인: webflow.com/university → 1년 무료 Lite
```

**로우코드 (HTML 기초면 됨)**
```
GitHub Pages + Tailwind CSS
  github.com → New repo → Settings → Pages → main branch
  첫 배포: 10분. 도메인: username.github.io/repo-name
  Tailwind CDN: <link href="https://cdn.tailwindcss.com">
  → HTML 파일 1개로 완성 가능
```

🎓 **Ivy Tip**: 노코드로 만든 사이트도 "직접 디자인·기획·배포"하면 **100% 본인 작업**이다.

---

# 84-2. GitHub Pages 5분 배포 — 실제 코드

**index.html (최소 포트폴리오)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Minjun Kim — Builder</title>
  <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="bg-gray-950 text-white font-sans">
  <main class="max-w-2xl mx-auto py-24 px-6">
    <h1 class="text-4xl font-bold">Minjun Kim</h1>
    <p class="mt-2 text-gray-400">
      High school builder. Climate × Software.
    </p>
    <div class="mt-8 space-y-4">
      <a href="https://github.com/minjun" class="block text-blue-400">
        → GitHub
      </a>
      <a href="mailto:minjun@email.com" class="block text-blue-400">
        → Email
      </a>
    </div>
  </main>
</body>
</html>
```
→ 이 파일 1개를 GitHub에 올리면 **오늘 URL이 생긴다.**

---

# 84-3. 📂 실물 — InHero 수강생 첫 웹사이트

`[그림: InHero 수강생 A (국제학생, 코딩 경험 0) — Framer로 만든 환경 리서치 사이트. 배포 후 72시간 만에 학교 교장 공유]`

**이 사이트가 갖춘 것**
- 프로젝트 배경 (Why)
- 데이터 시각화 3개 (임팩트)
- 연락처 + GitHub 링크
- 모바일 최적화

→ Common App Activity에 URL 기재 → 사정관이 직접 접속

---

# 84-4. Framer 빠른 시작 (30분 루틴)

```
1. framer.com → Sign up (무료, 구글 계정 OK)
2. New Project → 템플릿 선택 (Portfolio 카테고리에서 고르기)
3. 텍스트 클릭 → 내 이름·소개·프로젝트명으로 교체
4. 이미지: Framer 내장 Unsplash 연동 (무료 — 검색창에 키워드 입력)
5. Pages 패널 → 섹션 추가: Hero / About / Projects / Contact
6. Preview → 모바일 탭 클릭해서 레이아웃 확인
7. Publish → 무료 도메인 yourname.framer.app 즉시 배포
8. 링크 복사 → 친구·선생님에게 보내서 첫 피드백 받기
```

✍️ **실습**: Framer 계정 만들고 사이트 초안 1페이지 완성 → URL 강의실 공유.

🎓 **Ivy Tip (Yale, 사회학+CS 재학생)**: "Framer 기본 템플릿에 텍스트만 바꿔서 지원했다. 사정관은 디자인이 아니라 **내용**을 본다."

🎓 **Ivy Tip (한국 국제학생 → MIT 합격)**: "Vercel에 배포하면 글로벌 CDN이 자동 적용돼서 한국에서 접속해도 빠르다. .vercel.app 도메인은 사정관이 충분히 클릭한다."

---

# 84-5. 흔한 실수 ❌ + FAQ

**❌ 흔한 실수**
- "완벽해지면 배포하겠다" → **배포가 먼저**, 완성은 나중
- 템플릿 그대로 방치 → 텍스트·색상 하나라도 바꿔라
- 내 연락처 없음 → 이메일 or 링크드인 필수
- 모바일 확인 안 함 → 사정관은 핸드폰으로도 본다
- Google Analytics 미설치 → 방문자 수 0이면 숫자 증거 없음

**Q. 도메인 구매해야 하나요?**
A. 처음엔 불필요. `.framer.app`, `.vercel.app`, `.github.io` 모두 사정관이 클릭한다.

**Q. 영어로 만들어야 하나요?**
A. 미국 대학 지원이면 영어 필수. 한국어 병행은 선택.

---

# 🎓 강의 84 실전 꿀팁 모음

- **Framer 무료 플랜**으로 시작 — framer.com, `.framer.app` 도메인 영구 무료. 커스텀 도메인 필요하면 $5/월 Mini 플랜.
- **Google Analytics 4 설치** — framer.com 프로젝트 Settings → Integrations → Google Analytics. 방문자 수가 Activity 숫자 증거가 된다.
- **GitHub Pages 10분 배포** — `index.html` 1개만 있으면 된다. `username.github.io` 주소가 생긴다. 완전 무료·영구.
- **Vercel 배포** — Next.js 또는 HTML 프로젝트를 `vercel.com`에 드래그앤드롭. 30초 만에 글로벌 CDN 배포. 무료 Hobby 플랜으로 충분.
- **Webflow 학생 1년 무료** — webflow.com/university 등록하면 Lite 플랜($16/월 가치) 1년 무료. CMS 내장이라 학교 신문·블로그에 최적.
- **Notion + Super.so** — Notion 페이지를 사이트로 바꿔준다. super.so 무료 플랜 → 즉시 배포. 코딩 없이 블로그·리서치 페이지 완성.
- **오픈소스 포트폴리오 템플릿** — github.com/nicholasgasior/next-portfolio 같은 무료 Next.js 템플릿을 fork → Vercel 연동 → 3분 배포.
- **Princeton 재학생 팁**: "배포 URL은 Common App의 Additional Information 섹션 맨 첫 줄에 넣어라. 사정관이 가장 먼저 본다."

---

# 강의 85 · 앱 만들기

## 단계 ①: 앱 vs 웹앱 — 무엇을 만들 것인가

```
네이티브 앱 (iOS/Android)
  ↳ 노코드: Glide Apps, Adalo, Thunkable
  ↳ 코드: Swift (iOS), Flutter (크로스)
  장점: 앱스토어 등재 가능
  단점: 배포 복잡, 심사 필요

웹앱 (브라우저에서 실행)
  ↳ 노코드: Glide, Bubble
  ↳ 코드: Next.js, React
  장점: URL 하나로 공유, 배포 즉시
  단점: 오프라인 기능 제한

🔑 첫 앱: 웹앱 권장. URL이 곧 포트폴리오다.
```

🎓 **Ivy Tip (MIT 재학생)**: "합격 에세이의 앱은 기능 3개짜리 MVP였다. 코드보다 '왜 만들었나'가 핵심이었다."

🎓 **Ivy Tip (Cornell, 정보과학 재학생)**: "Glide로 만든 앱을 학교 선생님 100명에게 배포했다. '사용자 100명' 숫자 하나가 Activity 설명을 압도했다."

---

# 85-1. 앱 아이디어 → 실현 가능 점검표

```
아이디어: ___________________________

체크리스트 (모두 YES면 시작)
  □ 내가 직접 쓸 앱인가?          → YES면 동기 있음
  □ 사용자 5명 인터뷰 가능한가?   → YES면 방향 잡힘
  □ 핵심 기능 1개만 먼저인가?     → YES면 MVP 가능
  □ 2주 안에 초안 나오는가?       → YES면 시작
  □ 누군가의 문제를 푸는가?       → YES면 에세이 소재
```

🎓 **Tip**: 아이디어가 없으면 **학교 내 불편한 점 5가지**를 종이에 써라. 그 중 하나가 앱이 된다.

---

# 85-2. Glide 앱 — 실제 30분 시작 코드 (노코드)

**Google Sheets → Glide 앱 만들기**
```
Step 1. docs.google.com/spreadsheets → 새 시트 만들기
        열 이름 예시: Name | Category | Description | ImageURL

Step 2. glideapps.com → New App → Google Sheets 연동
        (구글 계정으로 로그인 → 내 시트 선택)

Step 3. Layout 탭 → List 또는 Cards 뷰 선택
        → 각 열을 Title / Subtitle / Image에 매핑

Step 4. Actions 탭 → 사용자가 탭했을 때 동작 설정
        (예: 상세 페이지 이동, 이메일 보내기)

Step 5. Share → Public link 생성 → URL 즉시 공유 가능

무료 플랜: 앱 1개, 사용자 500명, Glide 워터마크 있음
Pro 플랜 ($49/월): 워터마크 제거, 사용자 무제한
→ 무료로도 Activity 기재 충분
```

---

# 85-3. 추천 스택 — 수준별

| 수준 | 스택 | 예상 소요 | 결과물 |
|---|---|---|---|
| 완전 노코드 | Glide (스프레드시트→앱) | 1–2일 | 실제 앱 URL |
| 로우코드 | Bubble + 템플릿 | 3–5일 | DB 연동 앱 |
| 기초 코드 | Next.js + Vercel | 1–2주 | 배포된 웹앱 |
| 중급 | Next.js + Supabase | 2–4주 | 로그인+DB |
| 고급 | 풀스택 + AI API | 1–3개월 | 논문급 프로젝트 |

> Glide 앱도 **실제 사용자가 있으면** 임팩트 섹션에 쓸 수 있다.

🎓 **Ivy Tip (Brown, 컴공 재학생)**: "Bubble 무료 플랜으로 만든 학교 튜터 매칭 앱. 가입자 47명을 '사용자 지표'로 에세이에 썼다. 숫자가 없으면 말뿐이다."

🎓 **Ivy Tip**: Bubble(bubble.io) 무료 플랜은 DB + 사용자 인증까지 포함. 로그인 기능 있는 앱을 **코딩 없이** 만들 수 있다.

---

# 85-4. 📂 실물 — InHero 수강생 앱 제작 과정

`[그림: InHero 수강생 B — Glide로 만든 "학교 급식 알레르기 알림 앱". 제작 4일, 학교 전체 배포. 스크린샷 시퀀스]`

**제작 타임라인**
```
Day 1: 문제 정의 + 사용자 3명 인터뷰
Day 2: Glide 스프레드시트 설계
Day 3: UI 완성 + 친구 5명 테스트
Day 4: 학교 교사 승인 → 전교 배포
Day 7: 사용자 120명 돌파
       → Activity 기재: "120명이 사용하는 앱 개발 및 운영"
```

---

# 85-5. 흔한 실수 ❌ + FAQ

**❌ 흔한 실수**
- 기능을 너무 많이 욕심냄 → **핵심 1개 먼저** 완성
- 혼자 만들고 테스트 없음 → 출시 전 **5명 이상** 써봐야
- 사용자 수 기록 안 함 → 숫자가 Activity 항목이 됨
- 앱스토어 올리기 집착 → URL 공유 가능이면 충분

**Q. 코딩을 전혀 못해도 앱을 만들 수 있나요?**
A. 가능하다. Glide는 구글 시트를 앱으로 바꿔준다.

**Q. 앱이 완성 안 되면요?**
A. "개발 중(in development)" 상태도 쓸 수 있다. **왜 만드는지**가 핵심이다.

---

# 🎓 강의 85 실전 꿀팁 모음

- **Glide 무료 플랜** (glideapps.com) — 구글 시트만 있으면 앱 완성. 공유 URL 즉시 생성. 사용자 500명까지 무료.
- **Bubble 무료 플랜** (bubble.io) — 로그인/DB/API 연동까지 노코드로 가능. 템플릿 마켓에서 '클론' 골라 수정하면 1–2일 만에 작동하는 앱.
- **Adalo** (adalo.com) — iOS·Android 네이티브 앱을 노코드로 제작. 무료 플랜으로 내부 테스트 가능. 앱스토어 등재는 $50/월 플랜 필요.
- **Thunkable** (thunkable.com) — 드래그앤드롭 모바일 앱 빌더. 무료 플랜: 앱 1개, Thunkable 워터마크. 학교 프로젝트용으로 충분.
- **사용자 수 측정** — Glide/Bubble 모두 대시보드에서 사용자 수 확인 가능. 스크린샷 찍어두면 나중에 에세이·Activity 증거가 된다.
- **Harvard 재학생 팁**: "앱 README에 '왜 이 문제를 골랐는가' 섹션을 넣어라. 사정관이 GitHub를 열면 그 한 단락이 인터뷰 첫 질문이 된다."
- **MVP 원칙** — 기능 1개만 작동해도 배포하라. 'v0.1' 태그를 GitHub에 찍으면 개발 히스토리가 생긴다.
- **피드백 루프** — 배포 후 Google Form으로 사용자 피드백 수집. 응답 10개만 있어도 '사용자 리서치 기반 반복 개발' 한 줄이 생긴다.

---

# 강의 86 · AI 프로젝트

## AI 프로젝트 = 코딩 실력 테스트 ❌ · 문제 해결 사례 ✅

```
잘못된 접근:  "AI 공부해서 나중에 뭔가 만들겠다"
맞는 접근:   "이 문제를 AI로 풀겠다 → 오늘 프로토타입"
```

**AI 프로젝트 3가지 유형**

| 유형 | 예시 | 난이도 | 도구 |
|---|---|---|---|
| AI API 활용 | 챗봇, 요약기, 번역기 | ★★☆ | OpenAI API |
| 데이터 분석 | 학교 데이터 시각화 | ★★☆ | Python + Colab |
| AI 모델 훈련 | 이미지 분류기 | ★★★ | Teachable Machine |

🎓 **Ivy Tip (Harvard, 통계 재학생)**: "Teachable Machine으로 만든 식물 질병 감지 모델로 지역 농가 3곳과 파일럿을 진행했다. 기술보다 **임팩트 스토리**가 합격을 만들었다."

---

# 86-1. Teachable Machine — 코딩 0줄 AI 프로젝트

**Teachable Machine (완전 노코드)**
```
1. teachablemachine.withgoogle.com 접속 (구글 계정 필요)
2. Image Project → Standard image model 선택
3. Class 1: 예) "플라스틱" → 웹캠으로 사진 20장 촬영 or 업로드
4. Class 2: "종이" → 사진 20장
5. Class 3: "유리" → 사진 20장
6. Train Model 클릭 (브라우저에서 자동 학습, 약 2분)
7. Preview 탭에서 실시간 테스트
8. Export Model → TensorFlow.js → 코드 스니펫 복사
9. GitHub Pages HTML에 붙여넣기 → 배포

소요: 1–2시간
Activity 기재: "AI 이미지 분류 모델 제작 및 웹 배포 (정확도 XX%)"
```

🎓 **Ivy Tip**: 정확도가 낮아도(60%도) **괜찮다**. '모델 개선 과정'이 에세이 소재다.

---

# 86-2. OpenAI API 챗봇 — 30줄 코드로 시작

**OpenAI API 챗봇 (중급)**
```python
# 필요한 것: Python 설치, OpenAI API 키 (무료 크레딧 $5 제공)
# 설치: pip install openai
import openai

client = openai.OpenAI(api_key="your-api-key")  # platform.openai.com에서 발급

def ask(question):
    response = client.chat.completions.create(
        model="gpt-4o-mini",          # 가장 저렴 ($0.15/1M 토큰)
        messages=[
            {"role": "system", "content": "당신은 AP Chemistry 튜터입니다."},
            {"role": "user",   "content": question}
        ]
    )
    return response.choices[0].message.content

print(ask("몰 농도 계산 방법 설명해줘"))
```

→ 이걸 **Streamlit**으로 감싸면 배포 가능한 웹앱이 된다.

---

# 86-3. Streamlit으로 AI 앱 웹 배포 (무료)

**Streamlit 배포 — 10분 완성**
```python
# app.py
import streamlit as st
import openai

client = openai.OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

st.title("AP Chemistry AI Tutor")
question = st.text_input("질문을 입력하세요")

if question:
    with st.spinner("생각 중..."):
        answer = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "AP Chemistry 전문 튜터입니다."},
                {"role": "user", "content": question}
            ]
        ).choices[0].message.content
    st.write(answer)
```

```bash
# 배포: streamlit.io/cloud (무료)
# 1. GitHub에 app.py + requirements.txt 올리기
# 2. streamlit.io/cloud → New app → GitHub 연동
# 3. Secrets에 OPENAI_API_KEY 입력 → Deploy
# → yourapp.streamlit.app URL 즉시 생성
```

---

# 86-4. Google Colab 데이터 분석 프로젝트

**Python + Colab — 무료 GPU, 설치 불필요**
```python
# colab.google에서 새 노트북 열기 → 바로 시작

# 예시: 학교 기후 데이터 시각화
import pandas as pd
import matplotlib.pyplot as plt

# 1. 데이터 로드 (CSV 업로드 or Google Sheets 연동)
df = pd.read_csv('school_data.csv')

# 2. 간단한 분석
print(df.describe())

# 3. 시각화
df['recycling_rate'].plot(kind='bar', color='green')
plt.title('Monthly Recycling Rate — My School 2025')
plt.ylabel('Rate (%)')
plt.savefig('chart.png')

# 4. 노트북 공유: File → Share → 링크 복사
#    → GitHub에 .ipynb 올리면 자동 렌더링
```

🎓 **Ivy Tip (MIT, 환경공학 재학생)**: "Colab 노트북 링크 하나를 GitHub에 올렸다. 사정관이 직접 실행해봤다고 면접에서 말했다."

---

# 86-5. 📂 실물 — InHero 수강생 AI 프로젝트

`[그림: InHero 수강생 C — "학교 폐지 재활용율 예측 AI". Google Colab 노트북 스크린샷 + 실제 예측 결과 그래프]`

**프로젝트 구조 (1개월 완성)**
```
Week 1: 문제 정의 → "우리 학교 재활용율이 왜 30%인가?"
Week 2: 데이터 수집 (설문 200명 + 학교 기록)
Week 3: Python Colab으로 분석 + 시각화
Week 4: 발표 자료 + GitHub 공개 + 학교 제출
임팩트: 학교 측 재활용 정책 수정 → 45%로 향상
```

→ Common App: "데이터 기반 환경 프로젝트로 학교 정책 변경"

---

# 🎓 강의 86 실전 꿀팁 모음

- **Teachable Machine** (teachablemachine.withgoogle.com) — 완전 무료, 코딩 0줄. 이미지·음성·포즈 분류 모델 모두 가능. 완성 후 GitHub Pages에 임베드해서 URL 생성.
- **OpenAI API 무료 크레딧** — platform.openai.com 신규 가입 시 $5 크레딧 자동 지급. `gpt-4o-mini`는 1M 토큰당 $0.15로 학생 프로젝트 충분.
- **Streamlit 무료 배포** — streamlit.io/cloud, 무료 플랜으로 공개 앱 무제한 배포. API 키는 Secrets에 저장해서 GitHub에 노출 안 됨.
- **Google Colab 무료 GPU** — colab.google, T4 GPU 무료 제공 (세션당 약 12시간). 이미지 분류·NLP 모델 훈련에 충분.
- **HuggingFace Spaces** — huggingface.co/spaces, Gradio 또는 Streamlit 앱을 무료로 호스팅. AI 모델 데모에 최적. URL이 생겨서 포트폴리오에 바로 추가 가능.
- **GitHub Colab 배지** — README에 `[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](링크)` 추가. 사정관이 클릭 한 번으로 노트북 실행 가능.
- **Yale 재학생 팁**: "AI 프로젝트 GitHub README 첫 줄에 '이 프로젝트로 XX명의 XX 문제를 해결했다'고 써라. 기술 설명보다 임팩트 한 줄이 먼저다."
- **Kaggle 대회 참가** — kaggle.com 무료. 데이터 분석 대회 참가 기록이 하나만 있어도 'ML/데이터과학 실전 경험' Activity가 된다. 순위보다 **참가 자체**가 증거.

---

# 강의 87 · 포트폴리오 사이트

## 포트폴리오 사이트 = 나의 디지털 본사

> 사정관이 Common App을 닫고 **다음으로 여는 탭**이 내 포트폴리오다.

**포트폴리오 사이트가 해야 할 일 3가지**
```
1. "이 학생이 누구인지" → 3초 안에 전달
2. "무엇을 만들었는지" → 링크+스크린샷+숫자
3. "왜 이걸 했는지" → 스파이크 스토리 연결
```

🎓 **Ivy Tip (Yale 재학생)**: "사정관은 8분을 준다. 포트폴리오는 **2분짜리** 스크롤로 설계해라."

🎓 **Ivy Tip (Columbia, 건축+CS 재학생)**: "Hero 섹션 첫 줄에 숫자를 넣어라. '3개 프로젝트, 사용자 500명, 2개국 배포' — 스크롤 전에 사정관의 눈을 멈춰야 한다."

---

# 87-1. 포트폴리오 사이트 필수 섹션 7가지

```
┌─────────────────────────────────────────────┐
│  Hero: 이름 + 한 줄 소개 + 대표 프로젝트 CTA  │
├─────────────────────────────────────────────┤
│  About: 스파이크 스토리 + 사진 (100단어 이내)  │
├─────────────────────────────────────────────┤
│  Projects: 카드 3–5개 (각각: 제목+링크+숫자)  │
├─────────────────────────────────────────────┤
│  Skills: 기술 스택 (아이콘 + 수준)            │
├─────────────────────────────────────────────┤
│  Experience: 클럽, 수상, 인턴 (시간순 역순)   │
├─────────────────────────────────────────────┤
│  Writing/Research: 논문, 블로그, 기사 링크    │
├─────────────────────────────────────────────┤
│  Contact: 이메일 + GitHub + LinkedIn         │
└─────────────────────────────────────────────┘
```

---

# 87-2. Hero 섹션 — 잘 쓴 예시 vs 못 쓴 예시

**❌ 못 쓴 Hero**
```
안녕하세요, 저는 Minjun Kim입니다.
코딩을 좋아하는 고등학생입니다.
```

**✅ 잘 쓴 Hero (스파이크 명확)**
```
Minjun Kim
Climate × Code — 데이터로 학교를 바꾸는 고등학생

📌 대표 프로젝트: EcoScan AI — 학교 재활용율 30%→45%
→ [데모 보기]  [GitHub]  [이메일 보내기]
```

**왜 다른가?**
- 스파이크(기후 × 소프트웨어)가 첫 줄에 나옴
- 숫자(30%→45%)가 있어서 구체적
- CTA(버튼)가 있어서 사정관이 다음 행동을 안다

🎓 **Ivy Tip (Dartmouth, 환경학 재학생)**: "Hero 한 줄이 에세이 1편을 대체한다. '무엇을 왜' 를 10단어 이내로 압축하라."

---

# 87-3. 프로젝트 카드 — 채워진 예시

**❌ 빈 카드**
```
프로젝트명: 환경 앱
설명: 환경 관련 앱을 만들었습니다.
```

**✅ 잘 쓴 카드**
```
프로젝트명: EcoScan — 학교 재활용 AI 도우미
설명: 학교 폐지 분류율 30%→45% 향상에 기여한
      이미지 분류 AI 모델. Teachable Machine + 학생 200명 설문.

[데모 →]  [GitHub →]  [발표자료 →]

기술: Python · Google Colab · Teachable Machine
기간: 2025.09 – 2025.11
```

---

# 87-4. GitHub README — 사정관이 보는 두 번째 페이지

**잘 쓴 README 구조**
```markdown
# EcoScan — AI Recycling Classifier

> Helping my school improve recycling rates from 30% to 45%
> using an image classification model trained on 1,200 photos.

## Demo
[Live Demo](https://ecoscan.streamlit.app) | [Slides](링크)

## Impact
- 200 students surveyed
- 45% recycling rate (up from 30%)
- School policy updated based on findings

## How to Run
pip install -r requirements.txt
streamlit run app.py

## Tech Stack
Python · TensorFlow.js · Streamlit · Google Colab
```

🎓 **Ivy Tip (Harvard 재학생)**: "GitHub README가 훌륭하면 그것만으로 충분했다. 코드 품질보다 **커밋 기록**이 꾸준함을 보여준다."

---

# 87-5. 📂 실물 — InHero 수강생 포트폴리오

`[그림: InHero 수강생 D 포트폴리오 사이트 — Hero 섹션 + Projects 3개. Framer 제작. 실제 URL 노출]`

**이 포트폴리오의 강점**
- Hero: "환경공학 × 소프트웨어로 학교를 바꾸는 고등학생" (스파이크 명확)
- Project 1: EcoScan (AI, 임팩트 수치 있음)
- Project 2: 학교 신문 디지털판 (웹사이트, 독자 수)
- Project 3: 기후 리서치 논문 (PDF 링크)
- 모바일 완벽 최적화
- Google Analytics로 방문자 수 추적 중

→ 면접관이 면접 중 사이트 직접 열어 20분 대화

---

# 87-6. 포트폴리오 자기 점검 루브릭

**루브릭 (각 1–3점, 16점↑ 완성)**
| 섹션 | 미달 | 통과 |
|---|---|---|
| Hero | 이름만 | 스파이크 한 줄 + CTA |
| About | 자기소개서 복붙 | 100단어 이내 + 사진 |
| Projects | 나열만 | 링크+숫자 있는 카드 3개↑ |
| Contact | 없음 | 이메일+GitHub+LinkedIn |
| 모바일 | 깨짐 | 정상 렌더링 |
| 속도 | 느림 (3초↑) | 빠름 (2초↓) |

✍️ **실습**: 루브릭 자가 채점 후, 낮은 항목 1개 오늘 수정.

🎓 **Ivy Tip**: 사이트 속도는 PageSpeed Insights (pagespeed.web.dev) 에서 무료 측정. 90점↑ 목표. Vercel/Framer 배포 시 대부분 자동으로 달성된다.

---

# 🎓 강의 87 실전 꿀팁 모음

- **Framer 포트폴리오 템플릿** — framer.com/templates/portfolio 카테고리에서 무료 템플릿 선택. 텍스트·색상만 바꾸면 전문적인 사이트 완성.
- **오픈소스 Next.js 포트폴리오** — github.com/leerob/leerob.io (Vercel 직원 공개 코드). fork → Vercel 배포 → 내용만 수정. 완전 무료.
- **Google Analytics 4 설치** — analytics.google.com → 새 속성 → 측정 ID 발급 → Framer/Webflow Settings에 붙여넣기. 방문자 수·체류 시간 측정 가능. 이 숫자가 Activity 증거.
- **LinkedIn 학생 계정** — linkedin.com/학생 이메일로 가입. 프리미엄 1년 무료 (학생 인증). 포트폴리오 사이트를 Featured 섹션에 핀해두기.
- **Notion 포트폴리오** — notion.so에 프로젝트 페이지 만들고 Public으로 설정 → URL 공유. super.so ($12/월) 연동 시 커스텀 도메인 가능.
- **사이트 속도 체크** — pagespeed.web.dev에 URL 입력 → 무료 진단. Vercel 배포 사이트는 대부분 90점↑ 자동 달성.
- **Princeton 재학생 팁**: "Common App의 Portfolio URL 칸(Additional Info 섹션)을 비워두는 학생이 60% 이상이다. 채우는 것만으로 상위 40%가 된다."
- **인터뷰 준비** — 포트폴리오 링크를 면접 전날 다시 열어보고, 각 프로젝트마다 '왜 만들었나 → 어떻게 만들었나 → 임팩트' 30초 답변을 연습해라.

---

# 국제학생 실전 가이드

**국제학생이 특히 주의할 점**

| 항목 | 위험 | 해결 |
|---|---|---|
| 도메인 접근 | 중국에서 GitHub 차단 | Gitee 또는 VPN 대비책 |
| 언어 | 한국어만 사이트 | 영어 버전 필수 |
| 사진 | 없음 | 전문적 프로필 사진 추가 |
| 결제 | 해외카드 없음 | 부모님 카드 or 무료 플랜 |
| 시간대 | 한국 서버 느림 | Vercel/Netlify (글로벌 CDN) |

🎓 **Ivy Tip 1**: 포트폴리오에 **"International Student from Korea"** 명시는 다양성 어필이 된다 — 숨기지 마라.

🎓 **Ivy Tip 2 (서울 → Yale 합격 학생)**: "한국의 교육 환경·입시 압박을 스파이크 스토리에 녹였다. '그 환경에서 이 앱을 만들었다'는 맥락 자체가 차별화였다."

🎓 **Ivy Tip 3**: GitHub 계정 이름을 **실명 또는 이니셜**로 설정하라. `github.com/minjunkim` 처럼 사정관이 기억하기 쉬운 URL이 된다.

---

# 전체 빌드 타임라인 (4주 플랜)

```
Week 1 — 웹사이트
  월: Framer 계정 + 템플릿 선택 (2시간)
  수: 내용 채우기 (About + Contact + Projects 초안)
  금: 첫 배포 → URL 공유 → Google Analytics 설치

Week 2 — 앱/AI 프로젝트 착수
  월: 문제 정의 + 스택 결정 (Glide or Teachable Machine)
  수: 프로토타입 v0.1 완성
  금: 친구 3명 피드백 + 사용자 수 측정 시작

Week 3 — 프로젝트 완성
  월: 피드백 반영 v0.2
  수: 숫자 측정 (사용자 수, 반응 등) + README 작성
  금: GitHub 공개 + 포트폴리오 사이트에 프로젝트 카드 추가

Week 4 — 포트폴리오 통합
  월: 루브릭 자가 채점 → 낮은 항목 수정
  수: 모바일 최적화 + 속도 체크 (pagespeed.web.dev)
  금: 완성 → Common App Additional Info에 URL 기재
```

---

# 아이비 재학생 팁 모음

**Harvard · CS 전공 재학생**
> "포트폴리오는 GitHub README가 훌륭하면 그것만으로 충분했다. 코드 품질보다 **커밋 기록**이 꾸준함을 보여준다. 매일 1커밋 습관만 지켜도 초록 잔디밭이 생긴다."

**MIT · 환경공학 재학생**
> "AI 프로젝트는 정확도보다 **왜 이 문제를 골랐는가**가 훨씬 중요했다. 면접 1시간을 그 이야기로만 했다. Colab 노트북 링크 하나가 대화 소재가 됐다."

**Princeton · 컴공+정책 재학생**
> "노코드로 만든 사이트도 '직접 기획·디자인·배포'한 프로젝트다. Framer로 만들어도 '나는 이 사이트를 직접 배포한 사람'이라는 사실은 변하지 않는다."

**Yale · 사회학+CS 재학생**
> "포트폴리오 사이트에 '진행 중인 프로젝트'를 올려라. 사정관은 **현재 성장 중인 학생**을 원한다. 'Work in Progress' 섹션을 따로 만들었다."

**Columbia · 건축+CS 재학생**
> "Common App Additional Information 650자를 포트폴리오 URL 한 줄로 시작했다. 나머지 649자는 그 링크를 왜 클릭해야 하는지 설명에 썼다."

---

# 기술 스택 레퍼런스 카드

```
🌐 웹사이트
  Framer        → framer.com         (노코드, 무료 .framer.app)
  Webflow       → webflow.com        (노코드, 학생 1년 무료)
  Next.js       → nextjs.org         (코드, 풀스택 가능)
  배포: Vercel  → vercel.com         (무료 Hobby, 글로벌 CDN)
  배포: Netlify → netlify.com        (무료, GitHub 연동)

📱 앱
  Glide         → glideapps.com      (노코드, 시트→앱, 무료 500명)
  Bubble        → bubble.io          (노코드, DB+Auth 포함)
  Adalo         → adalo.com          (노코드, 네이티브 앱)
  Flutter       → flutter.dev        (코드, iOS+Android)

🤖 AI
  Teachable Machine → teachablemachine.withgoogle.com (완전 무료)
  Google Colab      → colab.google   (Python, 무료 GPU T4)
  OpenAI API        → platform.openai.com ($5 무료 크레딧)
  Streamlit         → streamlit.io   (Python→웹앱, 무료 배포)
  HuggingFace Spaces→ huggingface.co/spaces (AI 데모, 무료)

📂 코드 관리
  GitHub        → github.com         (필수, 무료, 퍼블릭 레포 무제한)
```

---

# 모듈 20 통합 정리

**4주 후 갖게 되는 것**
```
포트폴리오 사이트 (URL)
   ├── 프로젝트 1: 웹사이트 (강의 84)
   ├── 프로젝트 2: 앱 또는 AI 프로젝트 (강의 85/86)
   └── 프로젝트 3: 진행 중인 빌드 (선택)

GitHub 계정
   ├── 코드 공개 레포 (README 포함)
   └── 커밋 히스토리 (초록 잔디밭)

Common App에 기재 가능한 Activity 2–3개
   + 면접에서 꺼낼 수 있는 링크 1개
   + Google Analytics 방문자 수 스크린샷
```

---

# 자기 점검 루브릭 (제출 전 최종)

| 항목 | 미달 | 통과 |
|---|---|---|
| 웹사이트 | 없음 | 배포된 URL 있음 |
| 앱/AI 프로젝트 | 아이디어만 | 작동하는 프로토타입 |
| 포트폴리오 사이트 | 없음 | 섹션 5개↑ + 링크 |
| 숫자 | 없음 | 각 프로젝트에 측정값 1개↑ |
| GitHub | 비공개 | 공개 레포 1개↑ |
| 모바일 | 깨짐 | 정상 렌더링 |
| Analytics | 미설치 | 방문자 수 측정 중 |

→ **7개 모두 통과**하면 Module 21 unlock.

---

# 모듈 20 정리 + 다음 unlock

✅ 산출물: 웹사이트 URL · 앱/AI 프로토타입 · 포트폴리오 사이트 완성.

```
M20 (디지털 제작 — 링크 있는 포트폴리오)
   ↓ unlock
M21 (임팩트 측정 시스템) — 숫자로 말하는 Activity
```

> 링크가 생겼다. 다음은 그 링크 뒤에 **숫자(임팩트)** 를 붙이는 법을 배운다.

🎓 **Ivy Tip**: Common App Activity에 URL을 넣으면 글자 수가 아니라 **클릭 한 번**으로 전부를 보여줄 수 있다. 오늘 배포한 URL이 합격 편지의 첫 줄이 된다.
