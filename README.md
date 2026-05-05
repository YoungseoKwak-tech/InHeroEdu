# NovaIQ — 한국에서 아이비리그 가는 가장 현명한 방법

Cornell 재학생이 만든 AP 전문 학습 플랫폼. AI 즉시 설명, 대입 컨설팅, 칠판 강의로 아이비리그를 목표하세요.

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local`을 만들고 API 키를 입력하세요:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 Anthropic API 키를 입력하세요:

```
ANTHROPIC_API_KEY=sk-ant-xxxx...
```

Anthropic API 키는 [https://console.anthropic.com](https://console.anthropic.com) 에서 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 됩니다.

### 4. 빌드 (프로덕션)

```bash
npm run build
npm start
```

## 주요 기능

- **랜딩 페이지** (`/`) — 서비스 소개, 기능 카드, 과목 그리드, 후기
- **강의 목록** (`/courses`) — AP, AMC, SAT 과목 카드 + 필터
- **동영상 강의** (`/courses/[subject]/[lesson]`) — YouTube 임베드 + AI 설명 패널 + 대본 + 연습 문제
- **대시보드** (`/dashboard`) — 진도, 최근 강의, 취약 개념, 스트릭
- **요금제** (`/pricing`) — 3단계 플랜 + 기능 비교표

## AI 기능

강의 대본에서 보라색으로 표시된 용어를 클릭하면 Claude AI가 즉시 한국어로 설명합니다.

- **다시 설명해줘** — 더 쉬운 비유로 재설명
- **영어로도 설명해줘** — AP 시험 영어 용어로 설명
- 스트리밍 응답으로 빠른 피드백

## 기술 스택

- **Next.js 14** App Router
- **Tailwind CSS** — 반응형 디자인, 다크모드
- **Anthropic SDK** — Claude claude-haiku-4-5-20251001 스트리밍
- **TypeScript**

## Vercel 배포

1. [Vercel](https://vercel.com) 에 프로젝트 import
2. 환경 변수에 `ANTHROPIC_API_KEY` 추가
3. 자동 배포 완료

### Trajectory Lab preview deploy

`Trajectory Lab`의 deploy 단계에서 실제 Vercel preview를 생성하려면 아래 환경 변수가 필요합니다.

```bash
VERCEL_API_TOKEN=
VERCEL_PROJECT_ID=
VERCEL_TEAM_ID=
VERCEL_GIT_SOURCE_TYPE=github
VERCEL_GIT_SOURCE_REPO_ID=
VERCEL_GIT_SOURCE_REF=main
```

- `VERCEL_API_TOKEN`: Vercel personal/team token
- `VERCEL_PROJECT_ID`: preview를 생성할 대상 프로젝트 id
- `VERCEL_TEAM_ID`: 팀 프로젝트인 경우만 필요
- `VERCEL_GIT_SOURCE_TYPE`: 보통 `github`
- `VERCEL_GIT_SOURCE_REPO_ID`: 연결된 Git provider repo id
- `VERCEL_GIT_SOURCE_REF`: preview 생성 기준 브랜치. 보통 `main`

위 값이 없으면 deploy route는 안전하게 fallback 하며, preview spec만 반환합니다.

## 폴더 구조

```
novaiq/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 랜딩 페이지
│   ├── courses/            # 강의 목록 + 상세
│   │   └── [subject]/[lesson]/   # 동영상 강의
│   ├── dashboard/          # 대시보드
│   ├── pricing/            # 요금제
│   └── api/explain/        # AI 설명 API (SSE)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── landing/            # Hero, Features, SubjectGrid, Testimonials
│   ├── courses/            # CourseCard, CourseFilter
│   └── lesson/             # VideoPlayer, AIPanel, Transcript, PracticeQuestions
└── lib/
    └── data/               # courses.ts, lessons.ts (샘플 데이터)
```
# InHeroEdu
