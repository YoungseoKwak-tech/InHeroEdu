-- 테스트 유저 auth.users에 삽입
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token
)
values (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'test@inhero.com',
  crypt('test_password_123', gen_salt('bf')),
  now(), now(), now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false, ''
)
on conflict (id) do nothing;

-- Pattern Bank
insert into pattern_bank (user_id, hero_code_core, hero_code_state, hero_code_status, processing_style, total_hours)
values ('00000000-0000-0000-0000-000000000001', 'CF', 4, 'provisional', 'visual_sequential', 23.5)
on conflict do nothing;

-- Spark Bank
insert into spark_bank (user_id, trigger_type, intensity, fired_count, subject)
values ('00000000-0000-0000-0000-000000000001', 'pattern_disruption', 0.87, 3, 'AP_Calc')
on conflict do nothing;

-- Moment Bank
insert into moment_bank (user_id, moment_text, subject, moment_type, session_id)
values
('00000000-0000-0000-0000-000000000001', '처음으로 공식 스스로 유도함', 'AP_Calc', 'essay_seed', 'test_001'),
('00000000-0000-0000-0000-000000000001', '효소-기질 비유 직접 만듦', 'AP_Bio', 'growth', 'test_002');
