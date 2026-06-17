
import modal

app = modal.App("inhero-textbook")

image = (
    modal.Image.debian_slim()
    .pip_install(
        "reportlab==4.0.9",
        "supabase==2.0.0",
        "anthropic==0.40.0",
        "Pillow==10.2.0",
        "fastapi==0.115.0",
    )
    .add_local_python_source("inhero_textbook")
    .add_local_python_source("image_manifest")
)

font_volume = modal.Volume.from_name("inhero-fonts", create_if_missing=True)


@app.function(
    image=image,
    volumes={"/fonts": font_volume},
    timeout=600,
    secrets=[
        modal.Secret.from_name("anthropic-api-key"),
        modal.Secret.from_name("supabase-credentials"),
    ],
)
@modal.fastapi_endpoint(method="POST")
def generate_textbook(payload: dict):
    import json
    import re
    import tempfile
    import os
    from datetime import datetime, timezone
    from anthropic import Anthropic
    from supabase import create_client

    lesson_id    = payload.get("lessonId", "")
    lesson_title = payload.get("lessonTitle", "")
    subject      = payload.get("subject", "")
    unit         = payload.get("unit", "")
    category     = payload.get("category", "") or _derive_category(subject)
    script       = payload.get("script", "")
    force_regen  = payload.get("forceRegenerate", False)

    supabase = create_client(
        os.environ["SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )
    supabase_url = os.environ["SUPABASE_URL"]

    # ── Check for cached chapter_json (skip Claude if found) ─────────────────
    chapter_data = None
    if lesson_id and not force_regen:
        cached = (
            supabase.table("lesson_scripts")
            .select("chapter_json, script")
            .eq("lesson_id", lesson_id)
            .maybe_single()
            .execute()
        )
        if cached.data:
            chapter_data = cached.data.get("chapter_json")
            if not script.strip():
                script = cached.data.get("script", "")

    # ── Fetch script from DB if still missing ────────────────────────────────
    if not script.strip() and lesson_id and chapter_data is None:
        result = (
            supabase.table("lesson_scripts")
            .select("script")
            .eq("lesson_id", lesson_id)
            .maybe_single()
            .execute()
        )
        script = (result.data or {}).get("script", "")

    if chapter_data is None and not script.strip():
        raise ValueError("No script found. Generate a script for this lesson first.")

    # ── Step 1: Generate chapter JSON via Claude (only if no cache) ───────────
    if chapter_data is None:
        client = Anthropic()

        prompt = f"""You are an expert {subject} textbook author writing a publication-quality chapter that matches the depth and rigor of top commercial AP study guides. Your output will be rendered into a 10-15 page cosmic-themed PDF.

LESSON: {lesson_title}
SUBJECT: {subject}
UNIT: {unit}
CATEGORY: {category}

SCRIPT:
{script}

DEPTH REQUIREMENTS (MATCHING REFERENCE TEXTBOOK):
- 3-4 sections per chapter
- Each section body: 350-500 words, multiple paragraphs, mechanism-first
- Each section: ONE AP EXAM ALERT box (60-90 word content — COMPLETE sentences, no truncation)
- Each section: 3-6 key terms with full definitions
- Practice: minimum 5 MCQ + 3 FRQ
- Each MCQ: 4 plausible choices, distractors must test specific traps
- Each FRQ: multi-part (a)(b)(c)(d), require mechanism in every part
- Each MCQ explanation: 80-120 words explaining WHY answer is right and what trap each distractor tests
- Each FRQ: 4-5 scoring point rubric + full model answer with mechanism

NEVER summarize. NEVER use vague language. Always mechanism: "X causes Y because Z protonates W".
NEVER use em dashes or en dashes in body text. Use commas, colons, or periods instead.
NEVER use Unicode subscripts or superscripts. Write CO2, H2O, ATP.

Return JSON ONLY (no markdown fences). Schema:
{{
  "unit_number": 1,
  "chapter_in_unit": 1,
  "chapter_title": "{lesson_title}",
  "subtitle": "mechanism statement",
  "unit_name": "{unit}",
  "learning_objectives": ["verb-first objective 1", "verb-first objective 2", "verb-first objective 3"],
  "sections": [
    {{
      "title": "Section Title",
      "subtitle": "italic mechanism focus",
      "body": "350-500 words SINGLE STRING. Paragraphs separated by \\n\\n. Mechanism-first.",
      "boxes": [
        ["AP EXAM ALERT", "60-90 word COMPLETE sentence content — do not truncate"]
      ],
      "key_terms": [
        ["Term", "Full definition with mechanism"],
        ["Term", "Full definition with mechanism"]
      ]
    }}
  ],
  "practice_questions": {{
    "mcq": [
      {{
        "question": "Full AP-level question text",
        "choices": ["Choice A", "Choice B", "Choice C", "Choice D"],
        "correct": 0,
        "explanation": "80-120 words: mechanism + trap analysis"
      }}
    ],
    "frq": [
      {{
        "question": "Multi-part FRQ (a)(b)(c)(d)",
        "rubric": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
        "model_answer": "200-400 words with mechanism"
      }}
    ]
  }}
}}

CRITICAL JSON RULES:
- "boxes" is LIST of LISTS: [["AP EXAM ALERT", "content"], ...]
- "key_terms" is LIST of LISTS: [["term", "definition"], ...]
- "choices" is exactly 4 strings
- "correct" is integer 0-3
- 5 MCQ minimum, 3 FRQ minimum
- Output raw JSON. Start with {{ end with }}
"""

        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=16000,
            messages=[{"role": "user", "content": prompt}],
        )

        raw = response.content[0].text
        fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", raw)
        cleaned = fence.group(1).strip() if fence else raw.strip()

        try:
            chapter_data = json.loads(cleaned)
        except json.JSONDecodeError:
            chapter_data = json.loads(_repair_truncated_json(cleaned))

        chapter_data = _sanitize_all(chapter_data)
        chapter_data = _normalize_chapter(chapter_data, category=category, subject=subject)

        # Cache chapter_json so future re-renders skip Claude entirely
        if lesson_id:
            supabase.table("lesson_scripts").update(
                {"chapter_json": chapter_data}
            ).eq("lesson_id", lesson_id).execute()
    else:
        # Re-using cached data — still sanitize/normalize in case schema evolved
        chapter_data = _sanitize_all(chapter_data)
        chapter_data = _normalize_chapter(chapter_data, category=category, subject=subject)

    # ── Add images via keyword matching (free — no Claude call) ──────────────
    _attach_images(chapter_data, supabase_url)

    # ── Step 2: Patch font path and build PDF ────────────────────────────────
    import inhero_textbook
    if "/fonts/" not in inhero_textbook.FONT_CANDIDATES:
        inhero_textbook.FONT_CANDIDATES.insert(0, "/fonts/")
        inhero_textbook._register_fonts()

    from inhero_textbook import generate_chapter_pdf

    output_path = tempfile.mktemp(suffix=".pdf")
    generate_chapter_pdf(ch=chapter_data, output_path=output_path, start_page=12)

    # ── Step 3: Upload to Supabase Storage ───────────────────────────────────
    with open(output_path, "rb") as f:
        pdf_bytes = f.read()

    version = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S")
    if lesson_id:
        storage_path = f"lessons/{lesson_id}/textbook-{version}.pdf"
    else:
        storage_path = f"lessons/adhoc/textbook-{version}.pdf"

    try:
        supabase.storage.from_("textbooks").upload(
            path=storage_path,
            file=pdf_bytes,
            file_options={
                "content-type": "application/pdf",
                "cache-control": "0",
                "upsert": "true",
            },
        )
    except Exception as exc:
        raise RuntimeError(f"Failed to upload PDF to Supabase Storage: {exc}") from exc

    signed = supabase.storage.from_("textbooks").create_signed_url(storage_path, 3600)
    signed_url = None
    if isinstance(signed, dict):
        signed_url = (
            signed.get("signedURL")
            or signed.get("signedUrl")
            or signed.get("signed_url")
        )
    public_url = supabase.storage.from_("textbooks").get_public_url(storage_path)

    supabase.table("lesson_textbooks").upsert(
        {"lesson_id": lesson_id, "pdf_url": storage_path, "status": "ready", "error": None},
        on_conflict="lesson_id",
    ).execute()

    real_sections = [s for s in chapter_data.get("sections", [])
                     if "QUICK REFERENCE" not in s.get("title", "").upper()]
    pages = 1 + len(real_sections) + (2 if chapter_data.get("generated_questions") else 0)

    return {"pdfUrl": signed_url or public_url, "pages": pages}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _derive_category(subject: str) -> str:
    import re
    if re.match(r"^ap ", subject, re.IGNORECASE):
        return "AP"
    if re.match(r"^honors ", subject, re.IGNORECASE):
        return "Honors"
    if re.search(r"amc|aime|olympiad|mathcounts", subject, re.IGNORECASE):
        return "Competition"
    if re.search(r"sat|act|psat", subject, re.IGNORECASE):
        return "Test Prep"
    return "Core"


import unicodedata as _ud

_EXPLICIT = str.maketrans({
    # em/en dashes
    "—": ",",   # — em dash
    "–": "-",   # – en dash
    "‒": "-",   # ‒ figure dash
    # arrows
    "→": "->",  # →
    "←": "<-",  # ←
    "⇒": "=>",  # ⇒
    # math
    "−": "-",   # − minus sign
    "±": "+/-", # ± plus-minus
    "×": "x",   # × multiplication
    "÷": "/",   # ÷ division
    "≈": "~",   # ≈ approximately
    "≠": "!=",  # ≠ not equal
    "≤": "<=",  # ≤
    "≥": ">=",  # ≥
    # bullets / symbols
    "•": "-",   # • bullet
    "°": " degrees",  # °
    "’": "'",   # ' right single quote
    "‘": "'",   # ' left single quote
    "“": '"',   # " left double quote
    "”": '"',   # " right double quote
    "…": "...", # … ellipsis
})

# DejaVu font glyph support: safe Unicode blocks
_SAFE_RANGES = [
    (0x0000, 0x024F),   # Basic Latin + Latin Extended A/B
    (0x0370, 0x03FF),   # Greek and Coptic
    (0x0400, 0x04FF),   # Cyrillic
    (0x2000, 0x206F),   # General Punctuation (only after explicit replacements)
    (0x2200, 0x22FF),   # Mathematical Operators
]

def _char_safe(ch: str) -> str:
    """Return ASCII-safe replacement for characters that render as boxes in DejaVu."""
    cp = ord(ch)
    # Already ASCII
    if cp < 128:
        return ch
    # Try NFKD decomposition first — handles sub/superscripts, fractions, etc.
    nfkd = _ud.normalize("NFKD", ch)
    if len(nfkd) == 1 and ord(nfkd) < 128:
        return nfkd
    if len(nfkd) > 1:
        ascii_part = nfkd.encode("ascii", "ignore").decode("ascii")
        if ascii_part:
            return ascii_part
    # Keep if in a safe Unicode range DejaVu covers
    for lo, hi in _SAFE_RANGES:
        if lo <= cp <= hi:
            return ch
    # Otherwise drop it (render nothing rather than a box)
    return ""


def _sanitize(text: str) -> str:
    """Replace problematic Unicode with ASCII so DejaVu renders clean."""
    if not isinstance(text, str):
        return text
    text = text.translate(_EXPLICIT)
    return "".join(_char_safe(ch) for ch in text)


def _sanitize_all(obj):
    """Recursively sanitize all strings in a nested dict/list structure."""
    if isinstance(obj, str):
        return _sanitize(obj)
    if isinstance(obj, list):
        return [_sanitize_all(v) for v in obj]
    if isinstance(obj, dict):
        return {k: _sanitize_all(v) for k, v in obj.items()}
    return obj


def _repair_truncated_json(raw: str) -> str:
    text = raw.rstrip().rstrip(",")
    in_string = False
    escape = False
    for ch in text:
        if escape:
            escape = False
            continue
        if ch == "\\" and in_string:
            escape = True
            continue
        if ch == '"':
            in_string = not in_string
    closing = ""
    if in_string:
        closing += '"'
    open_brackets = text.count("[") - text.count("]")
    open_braces   = text.count("{") - text.count("}")
    closing += "]" * max(open_brackets, 0)
    closing += "}" * max(open_braces, 0)
    return text + closing


def _attach_images(chapter_data: dict, supabase_url: str) -> None:
    from image_manifest import find_images_for_section, get_image_url
    used_filenames: set[str] = set()
    for section in chapter_data.get("sections", []):
        matches = find_images_for_section(
            section.get("title", ""),
            section.get("body", ""),
            max_images=5,
        )
        selected = None
        for img in matches:
            if img["filename"] not in used_filenames:
                selected = img
                break
        if selected:
            used_filenames.add(selected["filename"])
            section["image_url"] = get_image_url(selected["filename"], supabase_url)
            section["image_caption"] = selected.get("caption") or f"Figure: {selected['title']}"
        else:
            section["image_url"] = None
            section["image_caption"] = None


def _normalize_chapter(ch: dict, category: str = "", subject: str = "") -> dict:
    """Coerce Claude's output to exactly match inhero_textbook.py field expectations."""
    letters = ["A", "B", "C", "D"]

    for section in ch.get("sections", []):
        # body: handle both "body" (list or str) and "body_paragraphs" (list)
        if "body_paragraphs" in section and "body" not in section:
            section["body"] = "\n\n".join(section.pop("body_paragraphs"))
        body = section.get("body", "")
        if isinstance(body, list):
            section["body"] = "\n\n".join(str(p) for p in body)

        # boxes: handle single dict (not wrapped in list), list of dicts, or correct format
        raw_boxes = section.get("boxes", [])
        if isinstance(raw_boxes, dict):
            raw_boxes = [raw_boxes]  # single dict → wrap in list
        normalized_boxes = []
        for box in raw_boxes:
            if isinstance(box, dict):
                btype    = box.get("type") or box.get("title") or "AP EXAM ALERT"
                bcontent = box.get("content") or box.get("text") or ""
                normalized_boxes.append([str(btype), str(bcontent)])
            elif isinstance(box, (list, tuple)) and len(box) >= 2:
                normalized_boxes.append([str(box[0]), str(box[1])])
        # Map type labels → what draw_alert_box expects
        for box in normalized_boxes:
            t = box[0].upper()
            box[0] = "ap_alert" if ("AP" in t or "EXAM" in t or "ALERT" in t) else "competition"
        section["boxes"] = normalized_boxes

        # key_terms: each item must be [term_str, defn_str]
        normalized_kt = []
        for kt in section.get("key_terms", []):
            if isinstance(kt, dict):
                normalized_kt.append([
                    str(kt.get("term", "")),
                    str(kt.get("definition", kt.get("def", ""))),
                ])
            elif isinstance(kt, (list, tuple)) and len(kt) >= 2:
                normalized_kt.append([str(kt[0]), str(kt[1])])
        section["key_terms"] = normalized_kt

    # Handle both "practice_questions" and "generated_questions" key names
    if "practice_questions" in ch and "generated_questions" not in ch:
        ch["generated_questions"] = ch.pop("practice_questions")

    # Normalize MCQ: choices list→dict, correct int→answer letter
    qs = ch.get("generated_questions", {})
    if isinstance(qs, dict):
        for q in qs.get("mcq", []):
            choices = q.get("choices", [])
            if isinstance(choices, list):
                q["choices"] = {letters[i]: choices[i] for i in range(min(len(choices), 4))}
            if "answer" not in q:
                idx = q.pop("correct", 0)
                q["answer"] = letters[idx] if isinstance(idx, int) and 0 <= idx < 4 else "A"

    # Defaults for all fields draw_chapter_opening accesses
    ch.setdefault("unit_number", 1)
    ch.setdefault("chapter_in_unit", 1)
    ch.setdefault("subtitle", "")
    ch.setdefault("unit_name", "")
    ch.setdefault("learning_objectives", [])
    ch.setdefault("hook", "")
    ch.setdefault("category", category)
    ch.setdefault("subject", subject)

    return ch
