#!/usr/bin/env python3
"""
Generate AP Biology chapter assessments with Claude and save them into chapters_data.json.

Default input/output targets the sibling ../Textbook workspace so the pipeline can
work with the files you already have there.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from anthropic import Anthropic


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_TEXTBOOK_DIR = ROOT.parent / "Textbook"
DEFAULT_CHAPTERS_JSON = DEFAULT_TEXTBOOK_DIR / "chapters_data.json"


@dataclass
class ChapterLocator:
    index: int
    unit_number: int
    lesson_number: int
    unit_name: str

    @property
    def code(self) -> str:
        return f"U{self.unit_number:02d}_{self.lesson_number:02d}"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate 5 MCQ + 3 FRQ per AP Bio chapter.")
    parser.add_argument("--input", default=str(DEFAULT_CHAPTERS_JSON), help="Path to chapters_data.json")
    parser.add_argument("--output", default=None, help="Path to write updated JSON (default: overwrite input)")
    parser.add_argument("--chapter", type=int, default=None, help="1-based chapter number to generate")
    parser.add_argument("--start", type=int, default=None, help="1-based start chapter for a range")
    parser.add_argument("--end", type=int, default=None, help="1-based end chapter for a range")
    parser.add_argument("--resume", action="store_true", help="Skip chapters that already have full assessments")
    parser.add_argument("--model", default="claude-sonnet-4-6", help="Anthropic model name")
    parser.add_argument("--delay", type=float, default=0.0, help="Optional pause between chapters")
    return parser.parse_args()


def load_json(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("chapters_data.json must be a list of chapters")
    return data


def save_json(path: Path, data: list[dict[str, Any]]) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def enumerate_chapters(chapters: list[dict[str, Any]]) -> list[ChapterLocator]:
    locators: list[ChapterLocator] = []
    current_unit_name: str | None = None
    unit_number = 0
    lesson_number = 0

    for idx, chapter in enumerate(chapters):
        unit_name = str(chapter.get("unit_name", "GENERAL")).strip() or "GENERAL"
        if unit_name != current_unit_name:
            current_unit_name = unit_name
            unit_number += 1
            lesson_number = 1
        else:
            lesson_number += 1

        locators.append(
            ChapterLocator(
                index=idx,
                unit_number=unit_number,
                lesson_number=lesson_number,
                unit_name=unit_name,
            )
        )

    return locators


def chapter_has_complete_assessment(chapter: dict[str, Any]) -> bool:
    assessment = chapter.get("assessment")
    if not isinstance(assessment, dict):
        return False

    mcq = assessment.get("mcq")
    frq = assessment.get("frq")
    if not isinstance(mcq, list) or not isinstance(frq, list):
        return False

    return len(mcq) == 5 and len(frq) == 3


def clean_json_block(text: str) -> str:
    stripped = text.strip()
    if "```" in stripped:
        parts = stripped.split("```")
        for part in parts:
            candidate = part.strip()
            if candidate.startswith("{"):
                return candidate
            if candidate.startswith("json"):
                candidate = candidate[4:].strip()
                if candidate.startswith("{"):
                    return candidate
    start = stripped.find("{")
    end = stripped.rfind("}")
    if start != -1 and end != -1 and end > start:
        return stripped[start : end + 1]
    return stripped


def repair_json_with_claude(client: Anthropic, model: str, raw_text: str) -> dict[str, Any]:
    repair_prompt = f"""
The following content was supposed to be valid JSON but has formatting mistakes.
Repair it into valid raw JSON only.

Do not change the meaning, difficulty, answer keys, or biology content.
Only fix JSON syntax.

Return ONLY a valid JSON object with this shape:
{{
  "mcq": [
    {{
      "question": "...",
      "choices": {{"A":"...","B":"...","C":"...","D":"..."}},
      "answer": "A",
      "explanation": "...",
      "trap": "..."
    }}
  ],
  "frq": [
    {{
      "prompt": "...",
      "rubric": ["...", "...", "..."],
      "model_answer": "...",
      "why_it_matters": "..."
    }}
  ]
}}

Malformed content:
{raw_text}
""".strip()

    repair = client.messages.create(
        model=model,
        max_tokens=5000,
        temperature=0,
        messages=[{"role": "user", "content": repair_prompt}],
    )
    repaired_raw = "".join(block.text for block in repair.content if getattr(block, "type", None) == "text")
    repaired_clean = clean_json_block(repaired_raw)
    return json.loads(repaired_clean)


def assessment_tool_schema() -> dict[str, Any]:
    return {
        "name": "submit_assessment",
        "description": "Submit the finished AP Biology assessment with 5 MCQ and 3 FRQ.",
        "input_schema": {
            "type": "object",
            "properties": {
                "mcq": {
                    "type": "array",
                    "minItems": 5,
                    "maxItems": 5,
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {"type": "string"},
                            "choices": {
                                "type": "object",
                                "properties": {
                                    "A": {"type": "string"},
                                    "B": {"type": "string"},
                                    "C": {"type": "string"},
                                    "D": {"type": "string"},
                                },
                                "required": ["A", "B", "C", "D"],
                            },
                            "answer": {"type": "string", "enum": ["A", "B", "C", "D"]},
                            "explanation": {"type": "string"},
                            "trap": {"type": "string"},
                        },
                        "required": ["question", "choices", "answer", "explanation", "trap"],
                    },
                },
                "frq": {
                    "type": "array",
                    "minItems": 3,
                    "maxItems": 3,
                    "items": {
                        "type": "object",
                        "properties": {
                            "prompt": {"type": "string"},
                            "rubric": {
                                "type": "array",
                                "minItems": 3,
                                "items": {"type": "string"},
                            },
                            "model_answer": {"type": "string"},
                            "why_it_matters": {"type": "string"},
                        },
                        "required": ["prompt", "rubric", "model_answer", "why_it_matters"],
                    },
                },
            },
            "required": ["mcq", "frq"],
        },
    }


def mcq_tool_schema() -> dict[str, Any]:
    return {
        "name": "submit_mcq_set",
        "description": "Submit exactly 5 AP Biology multiple-choice questions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "mcq": {
                    "type": "array",
                    "minItems": 5,
                    "maxItems": 5,
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {"type": "string"},
                            "choices": {
                                "type": "object",
                                "properties": {
                                    "A": {"type": "string"},
                                    "B": {"type": "string"},
                                    "C": {"type": "string"},
                                    "D": {"type": "string"},
                                },
                                "required": ["A", "B", "C", "D"],
                            },
                            "answer": {"type": "string", "enum": ["A", "B", "C", "D"]},
                            "explanation": {"type": "string"},
                            "trap": {"type": "string"},
                        },
                        "required": ["question", "choices", "answer", "explanation", "trap"],
                    },
                },
            },
            "required": ["mcq"],
        },
    }


def frq_tool_schema() -> dict[str, Any]:
    return {
        "name": "submit_frq_set",
        "description": "Submit exactly 3 AP Biology free-response questions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "frq": {
                    "type": "array",
                    "minItems": 3,
                    "maxItems": 3,
                    "items": {
                        "type": "object",
                        "properties": {
                            "prompt": {"type": "string"},
                            "rubric": {
                                "type": "array",
                                "minItems": 3,
                                "items": {"type": "string"},
                            },
                            "model_answer": {"type": "string"},
                            "why_it_matters": {"type": "string"},
                        },
                        "required": ["prompt", "rubric", "model_answer", "why_it_matters"],
                    },
                },
            },
            "required": ["frq"],
        },
    }


def validate_assessment(payload: dict[str, Any]) -> dict[str, Any]:
    mcq = payload.get("mcq")
    frq = payload.get("frq")
    if not isinstance(mcq, list) or len(mcq) != 5:
        raise ValueError("Claude output must contain exactly 5 MCQ items")
    if not isinstance(frq, list) or len(frq) != 3:
        raise ValueError("Claude output must contain exactly 3 FRQ items")

    for idx, item in enumerate(mcq, 1):
        if not isinstance(item, dict):
            raise ValueError(f"MCQ {idx} is not an object")
        required = {"question", "choices", "answer", "explanation", "trap"}
        missing = required - set(item.keys())
        if missing:
            raise ValueError(f"MCQ {idx} missing keys: {sorted(missing)}")
        if not isinstance(item["choices"], dict) or set(item["choices"].keys()) != {"A", "B", "C", "D"}:
            raise ValueError(f"MCQ {idx} must have A/B/C/D choices")
        if item["answer"] not in {"A", "B", "C", "D"}:
            raise ValueError(f"MCQ {idx} answer must be A/B/C/D")

    for idx, item in enumerate(frq, 1):
        if not isinstance(item, dict):
            raise ValueError(f"FRQ {idx} is not an object")
        required = {"prompt", "rubric", "model_answer", "why_it_matters"}
        missing = required - set(item.keys())
        if missing:
            raise ValueError(f"FRQ {idx} missing keys: {sorted(missing)}")
        if not isinstance(item["rubric"], list) or len(item["rubric"]) < 3:
            raise ValueError(f"FRQ {idx} rubric must have at least 3 bullets")

    return {"mcq": mcq, "frq": frq}


def call_tool_payload(client: Anthropic, model: str, prompt: str, tool_schema: dict[str, Any]) -> dict[str, Any]:
    response = client.messages.create(
        model=model,
        max_tokens=5000,
        temperature=0,
        tools=[tool_schema],
        tool_choice={"type": "tool", "name": tool_schema["name"]},
        messages=[{"role": "user", "content": prompt}],
    )
    tool_payload = next((block.input for block in response.content if getattr(block, "type", None) == "tool_use"), None)
    if tool_payload is not None:
        return tool_payload

    raw = "".join(block.text for block in response.content if getattr(block, "type", None) == "text")
    cleaned = clean_json_block(raw)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return repair_json_with_claude(client, model, raw)


def build_context_block(locator: ChapterLocator, chapter: dict[str, Any]) -> str:
    section_digest = []
    for section in chapter.get("sections", [])[:4]:
        title = section.get("title", "")
        subtitle = section.get("subtitle", "")
        body = str(section.get("body", "")).strip()
        body = body[:1400]
        section_digest.append(f"{title} — {subtitle}\n{body}")

    quick_points = chapter.get("practice_questions", []) or []
    quick_reference = []
    for point in quick_points[:8]:
        if isinstance(point, list) and len(point) >= 2:
            quick_reference.append(str(point[1]))
        elif isinstance(point, str):
            quick_reference.append(point)

    return f"""
Chapter code: {locator.code}
Unit: {chapter.get("unit_name", "")}
Category: {chapter.get("category", "")}
Chapter title: {chapter.get("chapter_title", "")}
Hook: {chapter.get("hook", "")}

Learning objectives:
{json.dumps(chapter.get("learning_objectives", []), ensure_ascii=False)}

Sections:
{chr(10).join(section_digest)}

Quick reference / high-yield points:
{json.dumps(quick_reference, ensure_ascii=False)}
""".strip()


def build_mcq_prompt(locator: ChapterLocator, chapter: dict[str, Any]) -> str:
    context = build_context_block(locator, chapter)
    return f"""
You are an elite AP Biology assessment writer.

Generate exactly 5 AP Biology multiple-choice questions for this chapter.
They must be trap-aware, mechanism-first, and exam-authentic.

{context}

Use this exact shape:
{{
  "mcq": [
    {{
      "question": "...",
      "choices": {{"A":"...","B":"...","C":"...","D":"..."}},
      "answer": "A",
      "explanation": "Explain why the correct answer is right in AP Bio terms.",
      "trap": "Name the misconception behind the tempting wrong answer."
    }}
  ]
}}

Rules:
- Exactly 5 MCQ
- Make the MCQ exam-realistic, not trivia
- Use chapter-specific biology, not generic study skills
""".strip()


def build_frq_prompt(locator: ChapterLocator, chapter: dict[str, Any]) -> str:
    context = build_context_block(locator, chapter)
    return f"""
You are an elite AP Biology FRQ writer.

Generate exactly 3 AP Biology free-response questions for this chapter.
They must demand mechanism, causation, comparison, prediction, or experimental reasoning.

{context}

Use this exact shape:
{{
  "frq": [
    {{
      "prompt": "...",
      "rubric": ["point 1", "point 2", "point 3"],
      "model_answer": "A compact but high-scoring AP-style answer.",
      "why_it_matters": "What concept/mechanism this FRQ is really testing."
    }}
  ]
}}

Rules:
- Exactly 3 FRQ
- Make them feel like real AP Biology free-response prompts
- Use chapter-specific biology, not generic study skills
- Keep model answers compact but rigorous
""".strip()


def generate_assessment(client: Anthropic, model: str, locator: ChapterLocator, chapter: dict[str, Any]) -> dict[str, Any]:
    last_error: Exception | None = None

    for _attempt in range(3):
        try:
            mcq_payload = call_tool_payload(client, model, build_mcq_prompt(locator, chapter), mcq_tool_schema())
            frq_payload = call_tool_payload(client, model, build_frq_prompt(locator, chapter), frq_tool_schema())
            payload = {
                "mcq": mcq_payload.get("mcq", []),
                "frq": frq_payload.get("frq", []),
            }
            return validate_assessment(payload)
        except ValueError as exc:
            last_error = exc
            continue

    if last_error is not None:
        raise last_error
    raise RuntimeError("Unknown assessment generation failure")


def main() -> int:
    args = parse_args()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ANTHROPIC_API_KEY is not set.", file=sys.stderr)
        return 1

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve() if args.output else input_path
    chapters = load_json(input_path)
    locators = enumerate_chapters(chapters)
    client = Anthropic(api_key=api_key)

    targets: list[ChapterLocator]
    if args.chapter is not None and (args.start is not None or args.end is not None):
        raise SystemExit("Use either --chapter or --start/--end, not both.")

    if args.chapter is not None:
        if args.chapter < 1 or args.chapter > len(chapters):
            raise SystemExit(f"--chapter must be between 1 and {len(chapters)}")
        targets = [locators[args.chapter - 1]]
    elif args.start is not None or args.end is not None:
        start = args.start or 1
        end = args.end or len(chapters)
        if start < 1 or end > len(chapters) or start > end:
            raise SystemExit(f"--start/--end must define a range within 1 and {len(chapters)}")
        targets = locators[start - 1:end]
    else:
        targets = locators

    updated = 0
    for locator in targets:
        chapter = chapters[locator.index]
        title = chapter.get("chapter_title", f"Chapter {locator.index + 1}")

        if args.resume and chapter_has_complete_assessment(chapter):
            print(f"↷ Skipping {locator.code} {title} (already has 5 MCQ + 3 FRQ)")
            continue

        print(f"→ Generating {locator.code} {title}")
        try:
            assessment = generate_assessment(client, args.model, locator, chapter)
        except Exception as exc:
            print(f"✗ Failed on {locator.code} {title}: {exc}", file=sys.stderr)
            save_json(output_path, chapters)
            return 1

        chapter["assessment"] = assessment
        updated += 1
        save_json(output_path, chapters)
        print(f"✓ Saved {locator.code} {title}")

        if args.delay > 0:
            time.sleep(args.delay)

    print(f"\nDone. Updated {updated} chapter(s). Output: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
