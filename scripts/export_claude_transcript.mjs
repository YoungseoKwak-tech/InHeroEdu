#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function usage() {
  console.error(
    "Usage: node scripts/export_claude_transcript.mjs <input.jsonl> <output.md> " +
      "[--start ISO] [--end ISO] [--max-chars N]"
  );
  process.exit(1);
}

function parseArgs(argv) {
  if (argv.length < 2) usage();

  const options = {
    inputPath: path.resolve(argv[0]),
    outputPath: path.resolve(argv[1]),
    start: null,
    end: null,
    maxChars: 2400,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--start") {
      options.start = argv[i + 1] ?? usage();
      i += 1;
      continue;
    }

    if (arg === "--end") {
      options.end = argv[i + 1] ?? usage();
      i += 1;
      continue;
    }

    if (arg === "--max-chars") {
      const value = Number(argv[i + 1]);
      if (!Number.isFinite(value) || value <= 0) {
        console.error("--max-chars must be a positive number");
        process.exit(1);
      }
      options.maxChars = value;
      i += 1;
      continue;
    }

    console.error(`Unknown argument: ${arg}`);
    usage();
  }

  return options;
}

function ensureArray(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return [{ type: "text", text: value }];
  if (typeof value === "object") return [value];
  return [{ type: "text", text: String(value) }];
}

function redactSecrets(text) {
  if (!text) return text;

  let value = text;

  value = value.replace(
    /\b([A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Z0-9_]*)=([^\s"'`]+)/g,
    "$1=[REDACTED]"
  );

  value = value.replace(/\bsk-[A-Za-z0-9_-]+\b/g, "[REDACTED_API_KEY]");
  value = value.replace(
    /\beyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
    "[REDACTED_JWT]"
  );
  value = value.replace(/([?&](?:token|sig|signature)=)[^&\s]+/gi, "$1[REDACTED]");

  return value;
}

function truncateText(text, maxChars) {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[truncated ${text.length - maxChars} chars]`;
}

function toCodeFence(text, info = "text") {
  return `\`\`\`${info}\n${text}\n\`\`\``;
}

function simplifyToolInput(input) {
  if (!input || typeof input !== "object") return input;

  const simplified = { ...input };

  if (typeof simplified.old_string === "string") {
    simplified.old_string = "[omitted old_string]";
  }

  if (typeof simplified.new_string === "string") {
    simplified.new_string = "[omitted new_string]";
  }

  if (typeof simplified.content === "string" && simplified.content.length > 800) {
    simplified.content = truncateText(simplified.content, 800);
  }

  return simplified;
}

function formatJson(value, maxChars) {
  const json = JSON.stringify(value, null, 2);
  return truncateText(redactSecrets(json), maxChars);
}

function renderToolUse(item, maxChars) {
  const name = item.name || "Tool";
  const input = item.input || {};
  const description = input.description ? redactSecrets(String(input.description)) : "";

  const header = description ? `**Tool:** \`${name}\` - ${description}` : `**Tool:** \`${name}\``;

  if (typeof input.command === "string") {
    return `${header}\n\n${toCodeFence(truncateText(redactSecrets(input.command), maxChars), "bash")}`;
  }

  return `${header}\n\n${toCodeFence(formatJson(simplifyToolInput(input), maxChars), "json")}`;
}

function renderStructuredValue(value, maxChars) {
  if (typeof value === "string") {
    return truncateText(redactSecrets(value), maxChars);
  }

  if (Array.isArray(value)) {
    const renderedItems = value
      .map((entry) => {
        if (typeof entry === "string") return entry;
        if (entry && typeof entry === "object" && typeof entry.text === "string") {
          return entry.text;
        }
        return JSON.stringify(entry);
      })
      .join("\n");
    return truncateText(redactSecrets(renderedItems), maxChars);
  }

  if (value && typeof value === "object") {
    if (value.file && typeof value.file === "object") {
      const file = value.file;
      const lines = [
        `File: ${file.filePath ?? "[unknown]"}`,
        typeof file.startLine === "number" ? `Start line: ${file.startLine}` : null,
        typeof file.numLines === "number" ? `Lines shown: ${file.numLines}` : null,
        "",
        typeof file.content === "string" ? file.content : "",
      ]
        .filter(Boolean)
        .join("\n");
      return truncateText(redactSecrets(lines), maxChars);
    }

    return formatJson(value, maxChars);
  }

  return String(value);
}

function renderToolResult(item, record, maxChars) {
  if (record?.toolUseResult?.isImage) {
    return "[image output omitted]";
  }

  if (item && typeof item === "object" && "content" in item) {
    return renderStructuredValue(item.content, maxChars);
  }

  if (record && record.toolUseResult) {
    const toolResult = record.toolUseResult;

    if (toolResult.isImage) {
      return "[image output omitted]";
    }

    if (typeof toolResult.stdout === "string" && toolResult.stdout.trim()) {
      return truncateText(redactSecrets(toolResult.stdout), maxChars);
    }

    if (typeof toolResult === "string") {
      return truncateText(redactSecrets(toolResult), maxChars);
    }

    return formatJson(toolResult, maxChars);
  }

  return "[non-text tool result]";
}

function renderMessageBody(record, maxChars) {
  const message = record.message || {};
  const content = ensureArray(message.content);
  const blocks = [];

  for (const item of content) {
    if (!item || typeof item !== "object") continue;

    if (item.type === "thinking") {
      continue;
    }

    if (item.type === "text" && typeof item.text === "string") {
      const text = truncateText(redactSecrets(item.text), maxChars);
      if (text.trim()) blocks.push(text);
      continue;
    }

    if (item.type === "tool_use") {
      blocks.push(renderToolUse(item, maxChars));
      continue;
    }

    if (item.type === "tool_result") {
      const rendered = renderToolResult(item, record, maxChars);
      blocks.push(toCodeFence(rendered, "text"));
      continue;
    }
  }

  if (blocks.length === 0 && typeof message.content === "string") {
    blocks.push(truncateText(redactSecrets(message.content), maxChars));
  }

  if (blocks.length === 0 && record.isApiErrorMessage && typeof record.error === "string") {
    blocks.push(truncateText(redactSecrets(record.error), maxChars));
  }

  return blocks.join("\n\n");
}

function classifyRecord(record) {
  if (record.type === "assistant") {
    if (record.isApiErrorMessage) return "ASSISTANT ERROR";
    const content = ensureArray(record.message?.content);
    const hasToolUse = content.some((item) => item?.type === "tool_use");
    const hasVisibleText = content.some(
      (item) => item?.type === "text" && typeof item.text === "string" && item.text.trim()
    );

    if (hasToolUse && !hasVisibleText) return "ASSISTANT TOOL";
    return "ASSISTANT";
  }

  if (record.type === "user") {
    const content = ensureArray(record.message?.content);
    const hasToolResults = content.length > 0 && content.every((item) => item?.type === "tool_result");
    return hasToolResults ? "TOOL RESULT" : "USER";
  }

  return null;
}

function formatTimestamp(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return iso;

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Seoul",
  }).format(date);
}

function inRange(timestamp, start, end) {
  if (!timestamp) return false;
  if (start && timestamp < start) return false;
  if (end && timestamp > end) return false;
  return true;
}

function exportTranscript(options) {
  const raw = fs.readFileSync(options.inputPath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);

  let title = "";
  let sessionId = "";
  let firstTimestamp = null;
  let lastTimestamp = null;
  const cwds = new Set();
  const entries = [];

  for (const line of lines) {
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      continue;
    }

    if (typeof record.aiTitle === "string" && !title) {
      title = record.aiTitle;
    }

    if (typeof record.sessionId === "string" && !sessionId) {
      sessionId = record.sessionId;
    }

    if (typeof record.timestamp === "string") {
      if (!firstTimestamp || record.timestamp < firstTimestamp) firstTimestamp = record.timestamp;
      if (!lastTimestamp || record.timestamp > lastTimestamp) lastTimestamp = record.timestamp;
    }

    if (typeof record.cwd === "string") {
      cwds.add(record.cwd);
    }

    const label = classifyRecord(record);
    if (!label) continue;
    if (!inRange(record.timestamp, options.start, options.end)) continue;

    const body = renderMessageBody(record, options.maxChars);
    if (!body.trim()) continue;

    entries.push({
      label,
      timestamp: record.timestamp || "",
      body,
    });
  }

  const headerLines = [
    "# Claude Code Transcript Export",
    "",
    `- Title: ${title || "(untitled session)"}`,
    `- Session ID: \`${sessionId || "(unknown)"}\``,
    `- Source JSONL: \`${options.inputPath}\``,
    `- Exported: ${entries.length} visible transcript entries`,
    `- Session window: ${firstTimestamp ? formatTimestamp(firstTimestamp) : "(unknown)"} -> ${
      lastTimestamp ? formatTimestamp(lastTimestamp) : "(unknown)"
    }`,
    `- Working directories seen: ${Array.from(cwds).map((cwd) => `\`${cwd}\``).join(", ") || "(none)"}`,
    "",
    "Notes:",
    "- Hidden harness hooks, system metadata, binary blobs, and thinking blocks are omitted.",
    "- Secrets and tokens are redacted.",
    "- Long tool outputs are truncated for readability.",
    "",
    "---",
    "",
  ];

  const bodyLines = [];

  for (const entry of entries) {
    bodyLines.push(`## ${formatTimestamp(entry.timestamp)} · ${entry.label}`);
    bodyLines.push("");
    bodyLines.push(entry.body);
    bodyLines.push("");
  }

  const output = `${headerLines.join("\n")}${bodyLines.join("\n")}`.trimEnd() + "\n";

  fs.mkdirSync(path.dirname(options.outputPath), { recursive: true });
  fs.writeFileSync(options.outputPath, output, "utf8");

  console.log(`Wrote ${entries.length} entries to ${options.outputPath}`);
}

exportTranscript(parseArgs(process.argv.slice(2)));
