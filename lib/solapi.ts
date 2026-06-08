import "server-only";
import crypto from "crypto";

/**
 * Solapi (https://solapi.com) client for Kakao 알림톡 / 친구톡 / SMS.
 *
 * Everything here is ENV-GATED: when the Solapi keys are absent the module is
 * "not configured" and every send becomes a no-op that returns a dry_run
 * result. This lets the whole notification feature ship and run in
 * production immediately; it starts actually sending the moment the keys +
 * an approved 발신프로필/템플릿 are added — no code change required.
 *
 * Required env to go live:
 *   SOLAPI_API_KEY            Solapi API key
 *   SOLAPI_API_SECRET         Solapi API secret
 *   SOLAPI_SENDER_PHONE       registered sender number (발신번호, e.g. 01012345678)
 *   SOLAPI_KAKAO_PFID         Kakao channel 발신프로필 key (pfId)
 *   SOLAPI_ALIMTALK_WELCOME_TEMPLATE_ID   approved 알림톡 template id for signup
 *
 * Compliance note (do NOT remove): 알림톡 = 정보성(거래성) only and must use an
 * approved template. 친구톡 = 광고성 — only to recipients who added the channel
 * AND gave 광고 수신동의, and never 20:50–08:00 KST. The broadcast route
 * enforces consent; nighttime guarding is the sender's responsibility.
 */

const API_BASE = "https://api.solapi.com";

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export function isSolapiConfigured(): boolean {
  return !!(env("SOLAPI_API_KEY") && env("SOLAPI_API_SECRET") && env("SOLAPI_SENDER_PHONE"));
}

export function isAlimtalkConfigured(): boolean {
  return isSolapiConfigured() && !!env("SOLAPI_KAKAO_PFID");
}

/** Solapi HMAC-SHA256 auth header (date + salt signed with the API secret). */
function authHeader(): string {
  const apiKey = env("SOLAPI_API_KEY")!;
  const apiSecret = env("SOLAPI_API_SECRET")!;
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString("hex");
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

/** Normalize a Korean phone number to Solapi's expected digit form (01012345678). */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("+82")) d = "0" + d.slice(3);
  else if (d.startsWith("82") && !d.startsWith("0")) d = "0" + d.slice(2);
  d = d.replace(/\D/g, "");
  // Korean mobile: 010xxxxxxxx (11 digits) — accept 10–11 digit local forms.
  if (!/^01\d{8,9}$/.test(d)) return null;
  return d;
}

interface SendResult {
  ok: boolean;
  dryRun: boolean;
  groupId?: string;
  accepted: number;
  failed: number;
  error?: string;
}

interface KakaoOptions {
  pfId: string;
  templateId?: string;        // required for 알림톡, omitted for 친구톡
  variables?: Record<string, string>;
  disableSms?: boolean;       // if true, do NOT fall back to SMS on failure
}

interface OutboundMessage {
  to: string;                 // normalized recipient phone
  text: string;
  kakaoOptions?: KakaoOptions;
}

/**
 * Low-level batch send via Solapi /messages/v4/send-many.
 * Returns a dry_run result (no network) when Solapi isn't configured.
 */
async function sendMany(messages: OutboundMessage[]): Promise<SendResult> {
  if (messages.length === 0) return { ok: true, dryRun: false, accepted: 0, failed: 0 };
  if (!isSolapiConfigured()) {
    return { ok: true, dryRun: true, accepted: 0, failed: messages.length };
  }

  const from = env("SOLAPI_SENDER_PHONE")!;
  const payload = {
    messages: messages.map((m) => ({
      to: m.to,
      from,
      text: m.text,
      ...(m.kakaoOptions
        ? {
            type: m.kakaoOptions.templateId ? "ATA" : "CTA", // ATA=알림톡, CTA=친구톡
            kakaoOptions: {
              pfId: m.kakaoOptions.pfId,
              ...(m.kakaoOptions.templateId ? { templateId: m.kakaoOptions.templateId } : {}),
              ...(m.kakaoOptions.variables ? { variables: m.kakaoOptions.variables } : {}),
              disableSms: m.kakaoOptions.disableSms ?? false,
            },
          }
        : {}),
    })),
  };

  try {
    const res = await fetch(`${API_BASE}/messages/v4/send-many/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: authHeader() },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as {
      groupId?: string;
      groupInfo?: { count?: { total?: number; registeredSuccess?: number; registeredFailed?: number } };
      errorMessage?: string;
    };
    if (!res.ok) {
      return { ok: false, dryRun: false, accepted: 0, failed: messages.length, error: json.errorMessage || `HTTP ${res.status}` };
    }
    const c = json.groupInfo?.count ?? {};
    const accepted = c.registeredSuccess ?? messages.length;
    const failed = c.registeredFailed ?? 0;
    return { ok: failed === 0, dryRun: false, groupId: json.groupId, accepted, failed };
  } catch (e) {
    return { ok: false, dryRun: false, accepted: 0, failed: messages.length, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Send the one-time signup 알림톡 (정보성). Falls back to a plain no-op when
 * either Solapi or the welcome template is unconfigured.
 */
export async function sendWelcomeAlimtalk(opts: {
  phone: string;
  name?: string | null;
}): Promise<SendResult> {
  const to = normalizePhone(opts.phone);
  if (!to) return { ok: false, dryRun: false, accepted: 0, failed: 1, error: "invalid phone" };

  const pfId = env("SOLAPI_KAKAO_PFID");
  const templateId = env("SOLAPI_ALIMTALK_WELCOME_TEMPLATE_ID");
  const name = (opts.name || "학부모").trim();

  // Require a fully-configured 알림톡 (pfId + approved template) before sending.
  // Without it we would fall through to a paid SMS — avoid that surprise and
  // no-op (dry_run) instead, so it starts sending only once 알림톡 is ready.
  if (!isAlimtalkConfigured() || !templateId || !pfId) {
    return { ok: true, dryRun: true, accepted: 0, failed: 1 };
  }

  // Text mirrors the approved template body; #{변수} are filled via variables.
  const text =
    `[InHero] ${name}님, 인히어로 에두 가입을 환영합니다!\n` +
    `이제 AP 문제은행·개념정리·합격 자료와 멘토 1:1 Q&A를 모두 이용하실 수 있습니다.`;

  return sendMany([
    {
      to,
      text,
      ...(isAlimtalkConfigured() && templateId && pfId
        ? { kakaoOptions: { pfId, templateId, variables: { "#{이름}": name }, disableSms: false } }
        : {}),
    },
  ]);
}

/**
 * Send a marketing 친구톡 broadcast (광고성) to many recipients.
 * Caller MUST pass only consent-filtered, normalized phone numbers.
 */
export async function sendFriendtalkBroadcast(opts: {
  phones: string[];
  text: string;
}): Promise<SendResult> {
  const pfId = env("SOLAPI_KAKAO_PFID");
  const tos = opts.phones.map(normalizePhone).filter((p): p is string => !!p);
  if (tos.length === 0) return { ok: true, dryRun: false, accepted: 0, failed: 0 };

  return sendMany(
    tos.map((to) => ({
      to,
      text: opts.text,
      ...(isAlimtalkConfigured() && pfId
        ? { kakaoOptions: { pfId, disableSms: true } } // 친구톡: no template, no SMS fallback
        : {}),
    }))
  );
}
