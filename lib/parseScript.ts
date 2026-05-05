/**
 * parseScript
 *
 * Splits a lesson script string into sections by ## headers.
 * Each ## header line has the form:
 *   ## TITLE (timestamp)
 * or just:
 *   ## TITLE
 *
 * Returns an array of { title, timestamp, content } objects.
 */

export interface ScriptSection {
  title: string;
  timestamp: string;
  content: string;
}

export function parseScript(script: string): ScriptSection[] {
  if (!script) return [];

  const lines = script.split("\n");
  const sections: ScriptSection[] = [];
  let current: ScriptSection | null = null;

  for (const line of lines) {
    // Match: ## TITLE (0:00-1:30)  or  ## TITLE
    const match = line.match(/^##\s+(.+?)(?:\s+\(([^)]+)\))?\s*$/);
    if (match) {
      if (current) {
        sections.push({ ...current, content: current.content.trimEnd() });
      }
      current = {
        title: match[1].trim(),
        timestamp: match[2] ?? "",
        content: "",
      };
    } else if (current) {
      current.content += line + "\n";
    }
  }

  if (current) {
    sections.push({ ...current, content: current.content.trimEnd() });
  }

  return sections;
}

/**
 * Converts a timestamp string like "1:30" or "1:30-2:45" to seconds.
 * Takes the start of a range (before any "-").
 */
export function timestampToSeconds(ts: string): number {
  const start = ts.split("-")[0].trim();
  const parts = start.split(":").map(Number);
  if (parts.length === 2) return (parts[0] * 60) + parts[1];
  if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  return 0;
}
