const TEXTBOOK_SECTION_PRIORITY = [
  "HOOK",
  "HERO EXPLAIN 1",
  "HERO EXPLAIN 2",
  "GAP CRUNCH",
  "WRAP + TRAJECTORY CUE",
] as const;

type ScriptSectionName = (typeof TEXTBOOK_SECTION_PRIORITY)[number];

const SECTION_RE = /^##\s+(.+?)(?:\s+\(\d{1,2}:\d{2}(?:-\d{1,2}:\d{2})?\))?\s*$/i;
const NOISE_LINE_RE =
  /^(SPARK|GAP CRUNCH|TEACH BACK|QUESTION SPRINT|ANALYZER|TRAJECTORY)\b|^OVERLAYS JSON:?$/i;
const MCQ_LINE_RE =
  /^(Q\d+\b|Question:|Correct:|Explanation:|A\)|B\)|C\)|D\)|Options:\s*\[|Gap Type:|Message:)/i;

interface NamedSection {
  name: string;
  content: string[];
}

function normalizeSectionName(raw: string): string {
  return raw
    .replace(/\s+\(\d{1,2}:\d{2}(?:-\d{1,2}:\d{2})?\)\s*$/i, "")
    .trim()
    .toUpperCase();
}

function cleanLine(line: string): string {
  return line
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/[⚡🔴⏸🔍✦]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function trimAtSentenceBoundary(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;

  const sliced = text.slice(0, maxChars);
  const lastBoundary = Math.max(
    sliced.lastIndexOf(". "),
    sliced.lastIndexOf("? "),
    sliced.lastIndexOf("! "),
    sliced.lastIndexOf("\n\n")
  );

  if (lastBoundary > Math.floor(maxChars * 0.65)) {
    return sliced.slice(0, lastBoundary + 1).trim();
  }

  return `${sliced.trimEnd()}...`;
}

function parseStructuredSections(script: string): NamedSection[] {
  const sections: NamedSection[] = [];
  let current: NamedSection | null = null;

  for (const rawLine of script.replace(/\r/g, "").split("\n")) {
    const line = rawLine.trimEnd();
    const sectionMatch = line.trim().match(SECTION_RE);

    if (sectionMatch) {
      current = { name: normalizeSectionName(sectionMatch[1]), content: [] };
      sections.push(current);
      continue;
    }

    if (!current) continue;
    current.content.push(line);
  }

  return sections;
}

function buildFallbackDigest(script: string, maxChars: number): string {
  const cleaned = script
    .replace(/\r/g, "\n")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\(\d{1,2}:\d{2}(?:-\d{1,2}:\d{2})?\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return trimAtSentenceBoundary(cleaned, maxChars);
}

export function compactScriptForTextbook(script: string, maxChars = 6500): string {
  if (!script.trim()) return "";

  const sections = parseStructuredSections(script);
  if (sections.length === 0) return buildFallbackDigest(script, maxChars);

  const sectionMap = new Map<string, string>();

  for (const section of sections) {
    const name = normalizeSectionName(section.name);
    if (!TEXTBOOK_SECTION_PRIORITY.includes(name as ScriptSectionName)) continue;

    const lines = section.content
      .map(cleanLine)
      .filter((line) => line.length > 0)
      .filter((line) => !NOISE_LINE_RE.test(line))
      .filter((line) => !MCQ_LINE_RE.test(line));

    if (lines.length === 0) continue;

    if (name === "GAP CRUNCH") {
      const transformed = lines
        .map((line) => {
          if (/^statement:/i.test(line)) return line.replace(/^statement:\s*/i, "Key insight: ");
          if (/^trap:/i.test(line)) return line.replace(/^trap:\s*/i, "Common trap: ");
          if (/^correct:/i.test(line)) return line.replace(/^correct:\s*/i, "Correct framing: ");
          return line;
        })
        .join(" ");

      sectionMap.set(name, transformed);
      continue;
    }

    sectionMap.set(name, lines.join(" "));
  }

  const digestParts: string[] = [];

  for (const name of TEXTBOOK_SECTION_PRIORITY) {
    const value = sectionMap.get(name);
    if (!value) continue;

    const label =
      name === "HOOK"
        ? "Lesson framing"
        : name.startsWith("HERO EXPLAIN")
          ? "Core explanation"
          : name === "GAP CRUNCH"
            ? "Exam trap"
            : "Closing synthesis";

    digestParts.push(`${label}: ${value}`);
  }

  const digest = digestParts.join("\n\n").trim();
  if (!digest) return buildFallbackDigest(script, maxChars);

  return trimAtSentenceBoundary(digest, maxChars);
}
