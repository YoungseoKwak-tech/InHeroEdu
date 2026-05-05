function stripCodeFences(raw: string) {
  return raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

function extractBalancedJson(raw: string) {
  const start = raw.indexOf("{");
  if (start === -1) return raw;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < raw.length; i += 1) {
    const ch = raw[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      continue;
    }

    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;

    if (depth === 0) {
      return raw.slice(start, i + 1);
    }
  }

  return raw.slice(start);
}

function escapeNewlinesInsideStrings(raw: string) {
  let result = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];

    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
        continue;
      }

      if (ch === "\\") {
        result += ch;
        escaped = true;
        continue;
      }

      if (ch === "\"") {
        result += ch;
        inString = false;
        continue;
      }

      if (ch === "\n") {
        result += "\\n";
        continue;
      }

      if (ch === "\r") {
        continue;
      }
    } else if (ch === "\"") {
      inString = true;
    }

    result += ch;
  }

  return result;
}

export function parseJsonBlock<T>(raw: string, fallback: T): T {
  try {
    const normalized = escapeNewlinesInsideStrings(extractBalancedJson(stripCodeFences(raw)));
    return JSON.parse(normalized);
  } catch {
    return fallback;
  }
}
