#!/usr/bin/env python3
"""
Render chapter PDFs and a combined AP Biology textbook PDF from chapters_data.json.

Expected chapter structure:
  - hook
  - learning_objectives
  - sections[]
  - assessment{ mcq[5], frq[3] }

If assessment is missing, the script falls back to the legacy practice_questions
bullets so the PDF still builds, but the intended path is:
  1) python generate_questions.py
  2) python inhero_textbook.py
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, StyleSheet1, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_TEXTBOOK_DIR = ROOT.parent / "Textbook"
DEFAULT_CHAPTERS_JSON = DEFAULT_TEXTBOOK_DIR / "chapters_data.json"
DEFAULT_OUTPUT_DIR = DEFAULT_TEXTBOOK_DIR / "AP_Biology_PDFs_65"
DEFAULT_COMBINED_PDF = DEFAULT_TEXTBOOK_DIR / "InHero_AP_Biology_Complete.pdf"
DEFAULT_PREVIEW_PDF = DEFAULT_TEXTBOOK_DIR / "U01_01_with_practice_PREVIEW.pdf"


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
    parser = argparse.ArgumentParser(description="Build AP Biology chapter PDFs and a combined textbook.")
    parser.add_argument("--input", default=str(DEFAULT_CHAPTERS_JSON), help="Path to chapters_data.json")
    parser.add_argument("--chapter", type=int, default=None, help="Render one 1-based chapter only")
    parser.add_argument("--combined", action="store_true", help="Render one complete PDF")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Directory for per-chapter PDFs")
    parser.add_argument("--combined-output", default=str(DEFAULT_COMBINED_PDF), help="Path for the combined PDF")
    parser.add_argument("--preview-output", default=str(DEFAULT_PREVIEW_PDF), help="Path for single chapter preview PDF")
    return parser.parse_args()


def load_json(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("chapters_data.json must be a list of chapters")
    return data


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

        locators.append(ChapterLocator(idx, unit_number, lesson_number, unit_name))

    return locators


def slugify(text: str, max_len: int = 70) -> str:
    text = re.sub(r"[^\w\s-]", "", text, flags=re.UNICODE)
    text = re.sub(r"[\s_]+", "_", text.strip())
    return text[:max_len].strip("_") or "chapter"


def register_fonts() -> tuple[str, str]:
    candidates = [
        "/Library/Fonts/DejaVuSans.ttf",
        "/Library/Fonts/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]
    bold_candidates = [
        "/Library/Fonts/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]

    regular_name = "Helvetica"
    bold_name = "Helvetica-Bold"

    regular_path = next((p for p in candidates if Path(p).exists()), None)
    bold_path = next((p for p in bold_candidates if Path(p).exists()), None)

    if regular_path:
        pdfmetrics.registerFont(TTFont("InHeroSans", regular_path))
        regular_name = "InHeroSans"
    if bold_path:
        pdfmetrics.registerFont(TTFont("InHeroSansBold", bold_path))
        bold_name = "InHeroSansBold"
    elif regular_name == "InHeroSans":
        bold_name = regular_name

    return regular_name, bold_name


def build_styles(font_regular: str, font_bold: str) -> StyleSheet1:
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="CoverEyebrow",
        parent=styles["BodyText"],
        fontName=font_bold,
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#63D6B1"),
        spaceAfter=8,
        alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="CoverTitle",
        parent=styles["Title"],
        fontName=font_bold,
        fontSize=26,
        leading=31,
        textColor=colors.white,
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="CoverSubtitle",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=11,
        leading=16,
        textColor=colors.HexColor("#D1FAEC"),
        spaceAfter=14,
    ))
    styles.add(ParagraphStyle(
        name="Body",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=10.5,
        leading=15.2,
        textColor=colors.HexColor("#111111"),
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="SectionTitle",
        parent=styles["Heading2"],
        fontName=font_bold,
        fontSize=15,
        leading=18,
        textColor=colors.HexColor("#112034"),
        spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="SectionSubtitle",
        parent=styles["Italic"],
        fontName=font_regular,
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#54856F"),
        spaceAfter=10,
    ))
    styles.add(ParagraphStyle(
        name="Label",
        parent=styles["BodyText"],
        fontName=font_bold,
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#4C8A72"),
        spaceAfter=6,
        alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="Objective",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=10,
        leading=14,
        textColor=colors.white,
        leftIndent=8,
        bulletIndent=0,
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="Question",
        parent=styles["BodyText"],
        fontName=font_bold,
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#16243A"),
        spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="Choice",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=10,
        leading=13.5,
        textColor=colors.HexColor("#222222"),
        leftIndent=12,
        spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="AnswerHeading",
        parent=styles["BodyText"],
        fontName=font_bold,
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#0E7C61"),
        spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="Small",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#444444"),
        spaceAfter=3,
    ))
    styles.add(ParagraphStyle(
        name="Footer",
        parent=styles["BodyText"],
        fontName=font_regular,
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#7A8192"),
        alignment=TA_CENTER,
    ))
    return styles


def chapter_output_name(locator: ChapterLocator, chapter: dict[str, Any]) -> str:
    title_slug = slugify(chapter.get("chapter_title", "chapter"))
    return f"{locator.code}_with_practice_{title_slug}.pdf"


def on_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#7A8192"))
    canvas.drawCentredString(width / 2, 9 * mm, f"InHero AP Biology · Page {doc.page}")
    canvas.restoreState()


def cover_block(locator: ChapterLocator, chapter: dict[str, Any], styles: StyleSheet1) -> list[Any]:
    cover = Table(
        [[
            Paragraph(f"{locator.code} · {chapter.get('unit_name', '')}", styles["CoverEyebrow"]),
            Paragraph(chapter.get("chapter_title", ""), styles["CoverTitle"]),
            Paragraph(chapter.get("hook", ""), styles["CoverSubtitle"]),
        ]],
        colWidths=[170 * mm],
    )
    cover.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0B1020")),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#20304B")),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
    ]))

    objective_rows = [[Paragraph(f"Learning Objective {i+1}", styles["Label"]),
                       Paragraph(obj, styles["Objective"])]
                      for i, obj in enumerate(chapter.get("learning_objectives", []))]
    objectives = Table(objective_rows, colWidths=[38 * mm, 126 * mm]) if objective_rows else Spacer(1, 0)
    if objective_rows:
        objectives.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#111826")),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#20304B")),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#20304B")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))

    return [cover, Spacer(1, 8 * mm), objectives, PageBreak()]


def render_key_terms(key_terms: list[Any], styles: StyleSheet1) -> Any:
    rows = [[Paragraph("<b>Key Term</b>", styles["Small"]), Paragraph("<b>Meaning</b>", styles["Small"])]]
    for pair in key_terms:
        if isinstance(pair, list) and len(pair) >= 2:
            rows.append([Paragraph(str(pair[0]), styles["Small"]), Paragraph(str(pair[1]), styles["Small"])])
    table = Table(rows, colWidths=[42 * mm, 118 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7F6F0")),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#9FD8C3")),
        ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#CFEBDD")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def render_boxes(boxes: list[Any], styles: StyleSheet1) -> list[Any]:
    out: list[Any] = []
    for box in boxes or []:
        if not isinstance(box, list) or len(box) < 2:
            continue
        kind, text = box[0], box[1]
        label = "AP EXAM ALERT" if kind == "ap_alert" else "COMPETITION INSIGHT"
        bg = colors.HexColor("#FFF4E6") if kind == "ap_alert" else colors.HexColor("#EEF4FF")
        border = colors.HexColor("#F2994A") if kind == "ap_alert" else colors.HexColor("#6C8BFF")
        table = Table([[Paragraph(f"<b>{label}</b><br/>{text}", styles["Small"])]], colWidths=[160 * mm])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), bg),
            ("BOX", (0, 0), (-1, -1), 0.8, border),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))
        out.extend([table, Spacer(1, 4 * mm)])
    return out


def section_blocks(chapter: dict[str, Any], styles: StyleSheet1) -> list[Any]:
    story: list[Any] = []
    for idx, section in enumerate(chapter.get("sections", [])):
        title = section.get("title", "")
        subtitle = section.get("subtitle", "")
        body = section.get("body", "")
        key_terms = section.get("key_terms") or []
        boxes = section.get("boxes") or []

        if idx > 0:
            story.append(PageBreak())

        story.append(Paragraph(chapter.get("chapter_title", ""), styles["Label"]))
        story.append(Paragraph(title, styles["SectionTitle"]))
        if subtitle:
            story.append(Paragraph(subtitle, styles["SectionSubtitle"]))
        if body:
            story.append(Paragraph(body.replace("\n", "<br/>"), styles["Body"]))
        if key_terms:
            story.extend([Spacer(1, 3 * mm), render_key_terms(key_terms, styles), Spacer(1, 4 * mm)])
        story.extend(render_boxes(boxes, styles))
    return story


def normalize_assessment(chapter: dict[str, Any]) -> dict[str, Any]:
    assessment = chapter.get("assessment")
    if isinstance(assessment, dict):
        return assessment

    fallback_points = []
    for point in chapter.get("practice_questions", []) or []:
        if isinstance(point, list) and len(point) >= 2:
            fallback_points.append(str(point[1]))
        elif isinstance(point, str):
            fallback_points.append(point)

    mcq = []
    for idx, point in enumerate(fallback_points[:5], 1):
        mcq.append({
            "question": f"Quick review {idx}: Which statement best matches this chapter insight?",
            "choices": {"A": point, "B": "Opposite mechanism", "C": "Too generic", "D": "Incorrect framing"},
            "answer": "A",
            "explanation": point,
            "trap": "This chapter has not been upgraded to the full 5 MCQ + 3 FRQ assessment yet.",
        })

    frq = []
    for idx, point in enumerate(fallback_points[5:8], 1):
        frq.append({
            "prompt": f"FRQ {idx}: Explain the mechanism behind this idea: {point}",
            "rubric": ["Identifies the core biological mechanism", "Connects the mechanism to AP-level cause/effect", "Uses precise vocabulary"],
            "model_answer": point,
            "why_it_matters": "Fallback placeholder until full generated FRQ data is available.",
        })

    return {"mcq": mcq, "frq": frq}


def practice_blocks(chapter: dict[str, Any], locator: ChapterLocator, styles: StyleSheet1) -> list[Any]:
    assessment = normalize_assessment(chapter)
    story: list[Any] = [PageBreak()]

    story.append(Paragraph(f"{locator.code} · PRACTICE", styles["Label"]))
    story.append(Paragraph("MCQ + FRQ", styles["SectionTitle"]))
    story.append(Paragraph("Answer-free question pages for active study.", styles["SectionSubtitle"]))

    for idx, q in enumerate(assessment.get("mcq", []), 1):
        block = [
            Paragraph(f"MCQ {idx}. {q['question']}", styles["Question"]),
            Paragraph(f"A. {q['choices']['A']}", styles["Choice"]),
            Paragraph(f"B. {q['choices']['B']}", styles["Choice"]),
            Paragraph(f"C. {q['choices']['C']}", styles["Choice"]),
            Paragraph(f"D. {q['choices']['D']}", styles["Choice"]),
            Spacer(1, 3 * mm),
        ]
        story.append(KeepTogether(block))

    story.append(Spacer(1, 4 * mm))
    for idx, q in enumerate(assessment.get("frq", []), 1):
        block = [
            Paragraph(f"FRQ {idx}. {q['prompt']}", styles["Question"]),
            Spacer(1, 4 * mm),
        ]
        story.append(KeepTogether(block))

    return story


def answer_key_blocks(chapter: dict[str, Any], locator: ChapterLocator, styles: StyleSheet1) -> list[Any]:
    assessment = normalize_assessment(chapter)
    story: list[Any] = [PageBreak()]

    story.append(Paragraph(f"{locator.code} · ANSWER KEY", styles["Label"]))
    story.append(Paragraph("MCQ + FRQ Solutions", styles["SectionTitle"]))
    story.append(Paragraph("Mechanistic explanations, traps, and high-scoring model answers.", styles["SectionSubtitle"]))

    for idx, q in enumerate(assessment.get("mcq", []), 1):
        block = [
            Paragraph(f"MCQ {idx}. {q['question']}", styles["Question"]),
            Paragraph(f"Answer: {q['answer']}", styles["AnswerHeading"]),
            Paragraph(f"<b>Why this is right:</b> {q['explanation']}", styles["Body"]),
            Paragraph(f"<b>Trap:</b> {q['trap']}", styles["Small"]),
            Spacer(1, 3 * mm),
        ]
        story.append(KeepTogether(block))

    for idx, q in enumerate(assessment.get("frq", []), 1):
        rubric_lines = "<br/>".join(f"• {line}" for line in q.get("rubric", []))
        block = [
            Paragraph(f"FRQ {idx}. {q['prompt']}", styles["Question"]),
            Paragraph("<b>Rubric</b><br/>" + rubric_lines, styles["Small"]),
            Paragraph(f"<b>Model answer:</b> {q['model_answer']}", styles["Body"]),
            Paragraph(f"<b>Why it matters:</b> {q['why_it_matters']}", styles["Small"]),
            Spacer(1, 4 * mm),
        ]
        story.extend(block)

    return story


def chapter_story(chapter: dict[str, Any], locator: ChapterLocator, styles: StyleSheet1) -> list[Any]:
    story: list[Any] = []
    story.extend(cover_block(locator, chapter, styles))
    story.extend(section_blocks(chapter, styles))
    story.extend(practice_blocks(chapter, locator, styles))
    story.extend(answer_key_blocks(chapter, locator, styles))
    return story


def build_pdf(story: list[Any], output_path: Path, title: str) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=16 * mm,
        title=title,
        author="InHero",
    )
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


def main() -> int:
    args = parse_args()
    font_regular, font_bold = register_fonts()
    styles = build_styles(font_regular, font_bold)

    input_path = Path(args.input).expanduser().resolve()
    chapters = load_json(input_path)
    locators = enumerate_chapters(chapters)

    if args.chapter is not None:
        if args.chapter < 1 or args.chapter > len(chapters):
            raise SystemExit(f"--chapter must be between 1 and {len(chapters)}")
        locator = locators[args.chapter - 1]
        chapter = chapters[locator.index]
        story = chapter_story(chapter, locator, styles)
        preview_path = Path(args.preview_output).expanduser().resolve()
        build_pdf(story, preview_path, chapter.get("chapter_title", locator.code))
        print(f"✅ Preview chapter saved → {preview_path}")
        return 0

    if args.combined:
        combined_story: list[Any] = []
        for i, locator in enumerate(locators):
            chapter = chapters[locator.index]
            combined_story.extend(chapter_story(chapter, locator, styles))
            if i < len(locators) - 1:
                combined_story.append(PageBreak())
        combined_path = Path(args.combined_output).expanduser().resolve()
        build_pdf(combined_story, combined_path, "InHero AP Biology Complete")
        print(f"✅ Combined textbook saved → {combined_path}")
        return 0

    output_dir = Path(args.output_dir).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    for locator in locators:
        chapter = chapters[locator.index]
        story = chapter_story(chapter, locator, styles)
        out = output_dir / chapter_output_name(locator, chapter)
        build_pdf(story, out, chapter.get("chapter_title", locator.code))
        print(f"✓ {out.name}")

    print(f"\n✅ Built {len(locators)} chapter PDFs → {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
