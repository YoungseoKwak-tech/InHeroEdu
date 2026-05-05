-- 인지 로그 테이블
CREATE TABLE cognitive_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT NOT NULL,

  -- 학습 컨텍스트
  subject TEXT,
  topic TEXT,
  grade_level TEXT, -- '9th', '10th', '11th', '12th'

  -- 사고 패턴 분류
  gap_type TEXT CHECK (gap_type IN (
    'CONCEPT_GAP',
    'APPLICATION_GAP',
    'LANGUAGE_GAP',
    'LOGIC_GAP',
    'NONE'
  )),

  -- 사고 패턴 데이터 (민감정보 제외)
  question_complexity INTEGER CHECK (question_complexity BETWEEN 1 AND 5),
  thinking_approach TEXT, -- 'direct', 'analytical', 'creative', 'stuck'
  resolution_time INTEGER, -- 초 단위
  had_breakthrough BOOLEAN DEFAULT false,

  -- 성장 지표
  confidence_before INTEGER CHECK (confidence_before BETWEEN 1 AND 5),
  confidence_after INTEGER CHECK (confidence_after BETWEEN 1 AND 5),

  -- 에세이 소재 가능성 (AI가 판단)
  essay_potential BOOLEAN DEFAULT false,
  essay_theme TEXT, -- 'perseverance', 'curiosity', 'connection', 'growth'

  -- 법적 요구사항
  data_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),

  -- 자동 삭제 (3년 후)
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '3 years')
);

-- 사고 진화 요약 테이블 (분기별)
CREATE TABLE thinking_evolution (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  period TEXT NOT NULL, -- '2024-Q1', '2024-Q2'
  grade_level TEXT,

  -- 집계 데이터만 저장 (원본 아님)
  dominant_gap_type TEXT,
  avg_complexity DECIMAL,
  breakthrough_count INTEGER,
  total_sessions INTEGER,
  strongest_subject TEXT,
  growth_area TEXT,

  -- 에세이 소재 후보 (주제만, 내용 아님)
  essay_themes TEXT[], -- ['perseverance', 'curiosity']

  created_at TIMESTAMP DEFAULT NOW()
);

-- 개인정보 동의 테이블
CREATE TABLE privacy_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  consent_type TEXT NOT NULL, -- 'cognitive_logging', 'essay_analysis'
  consented BOOLEAN DEFAULT false,
  consent_date TIMESTAMP,
  ip_address TEXT, -- 동의 증거
  version TEXT DEFAULT '1.0', -- 약관 버전
  created_at TIMESTAMP DEFAULT NOW()
);

-- 삭제 요청 테이블
CREATE TABLE deletion_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  requested_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  status TEXT DEFAULT 'pending'
);

-- RLS 정책 (본인 데이터만 접근)
ALTER TABLE cognitive_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE thinking_evolution ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see own logs"
  ON cognitive_logs FOR ALL
  USING (user_id = auth.uid()::text);

CREATE POLICY "Users can only see own evolution"
  ON thinking_evolution FOR ALL
  USING (user_id = auth.uid()::text);
