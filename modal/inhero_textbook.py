"""
InHero AP Biology Textbook — Auto PDF Generator
================================================
Reads parsed chapters_data.json and generates one PDF per chapter
in the InHero cosmic theme.

Usage:
    python inhero_textbook.py                    # generates all 65 chapters
    python inhero_textbook.py --chapter 1        # generates just chapter 1
    python inhero_textbook.py --combined         # one big PDF with all chapters

Output: ./output/UNIT_XX_chapter_title.pdf
"""

import json
import os
import argparse
import random
import math
import re
import unicodedata
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Frame
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

# ── Unicode-safe text rendering ───────────────────────────────────────────────
_SUB_DIGITS = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")
_SUP_DIGITS = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")
_DIRECT = str.maketrans({
    # Superscript/subscript symbols not covered by digits
    "⁺": "+",  "⁻": "-",  "⁼": "=",
    "₊": "+",  "₋": "-",
    "²": "2",  "³": "3",  "¹": "1",
    # Dashes
    "—": ",",  "–": "-",  "‒": "-",  "−": "-",
    # Quotes
    "“": '"', "”": '"', "‘": "'", "’": "'",
    # Spaces / zero-width
    " ": " ", " ": " ", "​": "", "‌": "", "‍": "", "﻿": "",
    # Misc
    "…": "...", "•": "-", "→": "->", "←": "<-", "×": "x", "±": "+/-",
})

def safe_text(s) -> str:
    """Guarantee every string is renderable by DejaVu fonts — no black boxes."""
    if s is None:
        return ""
    if not isinstance(s, str):
        s = str(s)
    s = s.translate(_SUB_DIGITS).translate(_SUP_DIGITS).translate(_DIRECT)
    result = []
    for ch in s:
        cp = ord(ch)
        if cp < 128:                          # ASCII always fine
            result.append(ch)
        elif 0x00A0 <= cp <= 0x024F:          # Latin Extended
            result.append(ch)
        elif 0x0370 <= cp <= 0x03FF:          # Greek (α β γ Δ μ …)
            result.append(ch)
        elif 0x2000 <= cp <= 0x206F:          # General Punctuation
            result.append(ch)
        elif 0x2190 <= cp <= 0x21FF:          # Arrows
            result.append(ch)
        elif 0x2200 <= cp <= 0x22FF:          # Mathematical Operators
            result.append(ch)
        else:
            # Try NFKD decomposition as last resort
            nfkd = unicodedata.normalize("NFKD", ch)
            ascii_form = nfkd.encode("ascii", "ignore").decode("ascii")
            result.append(ascii_form if ascii_form else "")
    return "".join(result)


PAGE_W, PAGE_H = A4

COSMIC_BG       = (0.020, 0.031, 0.078)
SAND_ACCENT     = (0.831, 0.722, 0.588)
CORAL_ACCENT    = (0.847, 0.353, 0.188)
INK_PRIMARY     = (0.102, 0.114, 0.180)
INK_BODY        = (0.173, 0.173, 0.165)
INK_MUTED       = (0.533, 0.529, 0.502)
INK_FAINT       = (0.706, 0.698, 0.659)
DARK_TEXT_LIGHT = (0.910, 0.925, 0.953)
DARK_TEXT_BLUE  = (0.722, 0.753, 0.855)
DARK_TEXT_DIM   = (0.522, 0.565, 0.702)
DARK_TEXT_FAINT = (0.353, 0.416, 0.600)
DARK_LINE       = (0.227, 0.271, 0.400)
DIVIDER         = (0.827, 0.820, 0.780)

FONT_SERIF      = "DejaVuSerif"
FONT_SERIF_IT   = "DejaVuSerif-Italic"
FONT_SERIF_BD   = "DejaVuSerif-Bold"
FONT_SANS       = "DejaVuSans"
FONT_SANS_BD    = "DejaVuSans-Bold"
FONT_MONO       = "DejaVuSansMono"
FONT_MONO_BD    = "DejaVuSansMono-Bold"

# Try multiple candidate font directories. macOS, Linux, custom path.
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/",
    "/Library/Fonts/",
    "/System/Library/Fonts/Supplemental/",
    "./fonts/",
]

def _register_fonts():
    """Register DejaVu fonts. Looks in standard system locations.
    Falls back to ReportLab built-ins if not found (degrades silently)."""
    import os
    global FONT_SERIF, FONT_SERIF_IT, FONT_SERIF_BD
    global FONT_SANS, FONT_SANS_BD, FONT_MONO, FONT_MONO_BD

    pairs = [
        ("DejaVuSerif", "DejaVuSerif.ttf"),
        ("DejaVuSerif-Italic", "DejaVuSerif-Italic.ttf"),
        ("DejaVuSerif-Bold", "DejaVuSerif-Bold.ttf"),
        ("DejaVuSans", "DejaVuSans.ttf"),
        ("DejaVuSans-Bold", "DejaVuSans-Bold.ttf"),
        ("DejaVuSansMono", "DejaVuSansMono.ttf"),
        ("DejaVuSansMono-Bold", "DejaVuSansMono-Bold.ttf"),
    ]
    registered = 0
    for name, fn in pairs:
        for cand_dir in FONT_CANDIDATES:
            path = os.path.join(cand_dir, fn)
            if os.path.exists(path):
                try:
                    pdfmetrics.registerFont(TTFont(name, path))
                    registered += 1
                    break
                except Exception:
                    continue
    if registered < 7:
        # Fall back to built-ins if DejaVu not found
        print(f"WARNING: only {registered}/7 DejaVu fonts found. "
              f"Some unicode chars may render as boxes. "
              f"Install DejaVu fonts or place TTF files in ./fonts/")
        FONT_SERIF = "Times-Roman"
        FONT_SERIF_IT = "Times-Italic"
        FONT_SERIF_BD = "Times-Bold"
        FONT_SANS = "Helvetica"
        FONT_SANS_BD = "Helvetica-Bold"
        FONT_MONO = "Courier"
        FONT_MONO_BD = "Courier-Bold"

_register_fonts()

MARGIN_X        = 18 * mm
MARGIN_TOP      = 14 * mm
MARGIN_BOTTOM   = 14 * mm
SIDEBAR_W       = 28 * mm


def hex_to_rgb(hex_str):
    h = hex_str.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255 for i in (0, 2, 4))


def draw_starfield(c, x, y, w, h, density=0.0012, seed=42, exclude_zones=None):
    """Draw stars, optionally excluding rectangular zones (where text lives).
    exclude_zones: list of (x1, y1, x2, y2) tuples in canvas coords."""
    rng = random.Random(seed)
    n_stars = max(60, int(w * h * density))
    placed = 0
    attempts = 0
    while placed < n_stars and attempts < n_stars * 4:
        attempts += 1
        sx = x + rng.uniform(0, w)
        sy = y + rng.uniform(0, h)

        # Skip if inside exclude zone
        if exclude_zones:
            in_zone = False
            for x1, y1, x2, y2 in exclude_zones:
                if x1 <= sx <= x2 and y1 <= sy <= y2:
                    in_zone = True
                    break
            if in_zone:
                continue

        roll = rng.random()
        if roll < 0.7:
            size = rng.uniform(0.4, 0.7)
            opacity = rng.uniform(0.3, 0.55)
        elif roll < 0.93:
            size = rng.uniform(0.7, 1.1)
            opacity = rng.uniform(0.55, 0.8)
        else:
            size = rng.uniform(1.1, 1.6)
            opacity = rng.uniform(0.75, 0.95)

        if rng.random() < 0.18:
            c.setFillColorRGB(1, 1, 1, alpha=opacity)
        else:
            c.setFillColorRGB(0.659, 0.702, 0.800, alpha=opacity)
        c.circle(sx, sy, size, stroke=0, fill=1)
        placed += 1
    c.setFillAlpha(1)


def draw_water_molecule(c, cx, cy, scale=1.0):
    s = scale
    # orbital rings
    c.setStrokeColorRGB(*DARK_LINE, alpha=0.6)
    c.setLineWidth(0.4)
    c.ellipse(cx - 80*s, cy - 22*s, cx + 80*s, cy + 22*s, stroke=1, fill=0)
    c.setStrokeColorRGB(0.290, 0.337, 0.502, alpha=0.5)
    c.ellipse(cx - 58*s, cy - 16*s, cx + 58*s, cy + 16*s, stroke=1, fill=0)
    c.setStrokeColorRGB(0.353, 0.416, 0.600, alpha=0.4)
    c.ellipse(cx - 35*s, cy - 9*s, cx + 35*s, cy + 9*s, stroke=1, fill=0)

    # oxygen
    c.setFillColorRGB(0.118, 0.227, 0.373)
    c.setStrokeColorRGB(0.290, 0.565, 0.851, alpha=0.7)
    c.setLineWidth(0.5)
    c.circle(cx, cy, 14*s, stroke=1, fill=1)
    c.setFillColorRGB(0.176, 0.322, 0.522, alpha=0.6)
    c.circle(cx - 4*s, cy + 4*s, 4*s, stroke=0, fill=1)
    c.setFont(FONT_SANS_BD, 8*s)
    c.setFillColorRGB(0.659, 0.784, 0.941)
    c.drawCentredString(cx, cy - 2.5*s, "O")

    # H atoms
    h_positions = [(cx + 56*s, cy + 12*s), (cx - 56*s, cy - 14*s)]
    for hx, hy in h_positions:
        c.setFillColorRGB(0.353, 0.290, 0.227)
        c.setStrokeColorRGB(0.616, 0.502, 0.408)
        c.setLineWidth(0.4)
        c.circle(hx, hy, 5*s, stroke=1, fill=1)
        c.setFont(FONT_SANS_BD, 6*s)
        c.setFillColorRGB(0.831, 0.722, 0.588)
        c.drawCentredString(hx, hy - 2*s, "H")

    # bonds
    c.setStrokeColorRGB(0.290, 0.337, 0.502, alpha=0.7)
    c.setDash(2, 3)
    c.setLineWidth(0.4)
    c.line(cx + 12*s, cy + 6*s, cx + 51*s, cy + 11*s)
    c.line(cx - 12*s, cy - 6*s, cx - 51*s, cy - 13*s)
    c.setDash()


def wrap_text(c, text, font_name, font_size, max_width):
    """Greedy word-wrap. Returns list of lines."""
    words = text.split()
    lines = []
    current = []
    for word in words:
        trial = (' '.join(current + [word])) if current else word
        if c.stringWidth(trial, font_name, font_size) <= max_width:
            current.append(word)
        else:
            if current:
                lines.append(' '.join(current))
            current = [word]
    if current:
        lines.append(' '.join(current))
    return lines


def draw_wrapped(c, text, x, y, font_name, font_size, max_width, leading,
                 color=None, max_lines=None):
    """Draws wrapped text top-down, returns the y position AFTER the last line."""
    if color:
        c.setFillColorRGB(*color)
    c.setFont(font_name, font_size)
    lines = wrap_text(c, safe_text(text), font_name, font_size, max_width)
    if max_lines:
        lines = lines[:max_lines]
    cur_y = y
    for line in lines:
        c.drawString(x, cur_y, line)
        cur_y -= leading
    return cur_y


def draw_chapter_opening(c, ch, page_num, chapter_in_unit):
    """Page 1 of each chapter: cosmic top half + white bottom with learning objectives + nav."""
    DARK_H = PAGE_H * 0.56  # top 56% dark cosmic

    # --- Dark cosmic top section ---
    c.setFillColorRGB(*COSMIC_BG)
    c.rect(0, PAGE_H - DARK_H, PAGE_W, DARK_H, stroke=0, fill=1)

    # Starfield (avoid title area)
    DARK_TOP = PAGE_H - DARK_H
    title_zone_x_max = PAGE_W * 0.55
    opening_text_zones = [
        # Top header
        (MARGIN_X - 4, PAGE_H - 22*mm, PAGE_W - MARGIN_X + 4, PAGE_H - 14*mm),
        # Title block (mission label + title + hook)
        (MARGIN_X - 4, DARK_TOP + 12*mm,
         title_zone_x_max, PAGE_H - DARK_H * 0.30),
    ]
    draw_starfield(c, 0, DARK_TOP, PAGE_W, DARK_H,
                   density=0.00018,
                   seed=hash(ch['chapter_title']) % 1000,
                   exclude_zones=opening_text_zones)

    # Water molecule (or chapter-themed icon — for now, water for ch 1, generic for rest)
    mol_cx = PAGE_W * 0.78
    mol_cy = PAGE_H - DARK_H * 0.65
    draw_water_molecule(c, mol_cx, mol_cy, scale=1.2)

    # Top header row
    top_y = PAGE_H - 18*mm
    c.setFillColorRGB(*SAND_ACCENT)
    c.circle(MARGIN_X + 1.5, top_y + 2, 1.8, stroke=0, fill=1)
    c.setFont(FONT_MONO_BD, 7.5)
    c.setFillColorRGB(*DARK_TEXT_DIM)
    subject_label = ch.get('subject', 'AP BIOLOGY').upper()
    c.drawString(MARGIN_X + 8, top_y, f"INHERO  ·  {subject_label}")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*DARK_TEXT_FAINT)
    unit_num = ch.get('unit_number', 1)
    ch_num = ch.get('chapter_in_unit', chapter_in_unit)
    nav_text = f"UNIT {unit_num:02d} / CHAPTER {ch_num:02d}"
    c.drawRightString(PAGE_W - MARGIN_X, top_y, nav_text)

    # Mission label
    mission_y = PAGE_H - DARK_H * 0.42
    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*SAND_ACCENT)
    cat = ch.get('category', '').upper()
    c.drawString(MARGIN_X, mission_y, f"— MISSION {unit_num:02d}  ·  {cat}")

    # Title — split intelligently
    title = ch['chapter_title']
    title_y = mission_y - 14*mm
    c.setFillColorRGB(*DARK_TEXT_LIGHT)

    # Try to split title into 2 lines
    parts = split_title(title)
    line_h = 30
    for i, line in enumerate(parts):
        font = FONT_SERIF_IT if i == 1 and len(parts) > 1 else FONT_SERIF
        c.setFont(font, 30)
        c.drawString(MARGIN_X, title_y - i * line_h, line)

    # Divider under title
    div_y = title_y - len(parts) * line_h + 4
    c.setStrokeColorRGB(*DARK_LINE)
    c.setLineWidth(0.4)
    c.line(MARGIN_X, div_y, MARGIN_X + 18*mm, div_y)

    # Hook text
    hook_y = div_y - 6*mm
    hook_max_w = PAGE_W * 0.48
    c.setFont(FONT_SERIF_IT, 10)
    hook_lines = wrap_text(c, safe_text(ch.get('hook') or ''), FONT_SERIF_IT, 10, hook_max_w)
    c.setFillColorRGB(*DARK_TEXT_BLUE)
    for line in hook_lines[:5]:
        c.drawString(MARGIN_X, hook_y, line)
        hook_y -= 13

    # --- White bottom section ---
    white_top = PAGE_H - DARK_H
    content_x = MARGIN_X
    content_w = PAGE_W - 2 * MARGIN_X

    # Learning objectives header
    lo_y = white_top - 14*mm
    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(content_x, lo_y, "— LEARNING OBJECTIVES")
    c.setFont(FONT_MONO, 8)
    c.setFillColorRGB(*INK_FAINT)
    c.drawRightString(content_x + content_w, lo_y, f"{unit_num:02d}.{ch_num:02d}")

    # divider
    c.setStrokeColorRGB(*DIVIDER)
    c.setLineWidth(0.3)
    c.line(content_x, lo_y - 3*mm, content_x + content_w, lo_y - 3*mm)

    # Objectives list
    obj_y = lo_y - 9*mm
    obj_x = content_x + 12*mm
    obj_w = content_w - 12*mm
    for i, obj in enumerate(ch['learning_objectives']):
        # strip leading "1." pattern
        obj_clean = re.sub(r'^\d+\.\s*', '', obj.strip())
        c.setFont(FONT_MONO_BD, 8.5)
        c.setFillColorRGB(*CORAL_ACCENT)
        c.drawString(content_x, obj_y, f"{i+1:02d}")
        # body
        c.setFont(FONT_SERIF, 10)
        c.setFillColorRGB(*INK_BODY)
        lines = wrap_text(c, safe_text(obj_clean), FONT_SERIF, 10, obj_w)
        for line in lines:
            c.drawString(obj_x, obj_y, line)
            obj_y -= 13
        obj_y -= 4

    # Navigation (sections list)
    obj_y -= 6*mm
    c.setStrokeColorRGB(*DIVIDER)
    c.line(content_x, obj_y, content_x + content_w, obj_y)
    obj_y -= 7*mm

    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(content_x, obj_y, "— NAVIGATION")
    obj_y -= 6*mm

    # Section nav grid — use short labels to prevent column overflow
    real_sections = [s for s in ch['sections']
                     if 'QUICK REFERENCE' not in s['title'].upper()]
    n_sec = len(real_sections)
    if n_sec > 0:
        col_w = content_w / n_sec
        for i, sec in enumerate(real_sections):
            cx = content_x + i * col_w
            c.setFont(FONT_MONO_BD, 8)
            c.setFillColorRGB(*SAND_ACCENT)
            c.drawString(cx, obj_y, f"{i+1:02d}")
            c.setFont(FONT_SANS_BD, 8.5)
            c.setFillColorRGB(*INK_BODY)
            # Two-line nav label: first two significant words
            words = [w for w in re.split(r'[\s,\-:]+', sec['title'])
                     if w and w.upper() not in {'AND','THE','OF','A','AS','AN'}]
            nav_line1 = smart_titlecase(words[0]) if words else ''
            nav_line2 = smart_titlecase(words[1]) if len(words) > 1 else ''
            # Truncate to fit column
            max_w = col_w - 6
            if c.stringWidth(nav_line1, FONT_SANS_BD, 8.5) > max_w:
                while nav_line1 and c.stringWidth(nav_line1 + '.', FONT_SANS_BD, 8.5) > max_w:
                    nav_line1 = nav_line1[:-1]
                nav_line1 += '.'
            c.drawString(cx, obj_y - 5*mm, nav_line1)
            if nav_line2:
                if c.stringWidth(nav_line2, FONT_SANS_BD, 8.5) > max_w:
                    while nav_line2 and c.stringWidth(nav_line2 + '.', FONT_SANS_BD, 8.5) > max_w:
                        nav_line2 = nav_line2[:-1]
                    nav_line2 += '.'
                c.drawString(cx, obj_y - 5*mm - 11, nav_line2)

    # Footer
    draw_footer(c, page_num, ch, footer_color=INK_MUTED)


def split_title(title):
    """Split title smartly into 1 or 2 lines for headers.
    Prefers splitting on comma, em-dash, or colon. Keeps case as-is."""
    # Try comma split first
    if ',' in title:
        parts = title.split(',', 1)
        return [parts[0].strip() + ',', parts[1].strip()]
    # Try em-dash or hyphen
    for sep in [' — ', '—', ' - ', ': ']:
        if sep in title:
            parts = title.split(sep, 1)
            return [parts[0].strip(), parts[1].strip()]
    # Fall back to word-count midpoint
    words = title.split()
    if len(words) <= 3:
        return [title]
    half = len(words) // 2
    line1 = ' '.join(words[:half])
    line2 = ' '.join(words[half:])
    return [line1, line2]


def smart_titlecase(text):
    """Title case but preserve known biology acronyms (case-insensitive match).
    Handles all-caps input from docx by mapping back to proper case."""
    # Map of lowercase -> proper-cased version (these win even if input is all-caps)
    preserve_map = {
        'ph': 'pH', 'mrna': 'mRNA', 'trna': 'tRNA', 'rrna': 'rRNA', 'snrna': 'snRNA',
        'sirna': 'siRNA', 'ncrna': 'ncRNA', 'mtdna': 'mtDNA', 'dna': 'DNA', 'rna': 'RNA',
        'atp': 'ATP', 'adp': 'ADP', 'amp': 'AMP', 'camp': 'cAMP',
        'gtp': 'GTP', 'gdp': 'GDP', 'nadh': 'NADH', 'nadph': 'NADPH', 'fadh': 'FADH',
        'er': 'ER', 'atpase': 'ATPase', 'gtpase': 'GTPase',
        'co2': 'CO2', 'o2': 'O2', 'h2o': 'H2O', 'nacl': 'NaCl', 'oh': 'OH-',
        'ap': 'AP', 'ibo': 'IBO', 'usabo': 'USABO',
        'pcr': 'PCR', 'cas9': 'Cas9', 'crispr': 'CRISPR',
    }
    minor = {'and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for',
             'with', 'as', 'by', 'is', 'are', 'vs'}
    words = text.split()
    out = []
    for i, w in enumerate(words):
        clean = w.strip(',.:;—-—')
        suffix = w[len(clean):]
        prefix_chars = ''
        # Handle leading punctuation too
        while clean and clean[0] in ',.:;—-—':
            prefix_chars += clean[0]
            clean = clean[1:]
        clean_lower = clean.lower()
        if clean_lower in preserve_map:
            out.append(prefix_chars + preserve_map[clean_lower] + suffix)
        elif i > 0 and clean_lower in minor:
            out.append(prefix_chars + clean_lower + suffix)
        else:
            out.append(prefix_chars + clean.capitalize() + suffix)
    return ' '.join(out)


def draw_footer(c, page_num, ch, footer_color):
    foot_y = 8*mm
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*footer_color)
    unit = ch.get('unit_number', 1)
    chapn = ch.get('chapter_in_unit', 1)
    c.drawString(MARGIN_X, foot_y, f"COORD · {unit:02d}.{chapn:02d}")
    c.drawCentredString(PAGE_W / 2, foot_y, "INHEROEDU.COM")
    c.drawRightString(PAGE_W - MARGIN_X, foot_y, f"{page_num:03d}")


def draw_sidebar(c, ch, current_section_idx, real_sections):
    """Cosmic sidebar on body pages."""
    c.setFillColorRGB(*COSMIC_BG)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, stroke=0, fill=1)

    # Exclude zones where sidebar text lives (so stars don't collide)
    sidebar_text_zones = [
        (4*mm, PAGE_H - 24*mm, SIDEBAR_W - 4*mm, PAGE_H - 8*mm),     # Unit num + label
        (4*mm, PAGE_H - 36*mm, SIDEBAR_W - 4*mm, PAGE_H - 26*mm),    # Chapter keyword
    ]
    # Section list zones (one per section)
    sec_zone_y = PAGE_H - 50*mm
    for i in range(len(real_sections)):
        sidebar_text_zones.append(
            (4*mm, sec_zone_y - 14*mm - i*14*mm,
             SIDEBAR_W - 4*mm, sec_zone_y + 4*mm - i*14*mm)
        )
    # Page number bottom
    sidebar_text_zones.append((0, 4*mm, SIDEBAR_W, 14*mm))

    draw_starfield(c, 0, 0, SIDEBAR_W, PAGE_H, density=0.0001,
                   seed=ch.get('unit_number', 1), exclude_zones=sidebar_text_zones)

    unit = ch.get('unit_number', 1)
    # Unit number top
    c.setFont(FONT_MONO_BD, 11)
    c.setFillColorRGB(*SAND_ACCENT)
    c.drawString(8*mm, PAGE_H - 16*mm, f"{unit:02d}")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*DARK_TEXT_FAINT)
    c.drawString(8*mm, PAGE_H - 20*mm, "UNIT")

    # Chapter keyword (first significant word from title)
    title_words = ch['chapter_title'].split()
    keyword = next((w for w in title_words if w.lower() not in
                    {'the', 'a', 'an', 'of', 'and', 'how', 'why', 'when', 'what'}),
                   title_words[0] if title_words else '')
    keyword = keyword.strip(',.:;—-—')
    c.setFont(FONT_SERIF_IT, 11)
    c.setFillColorRGB(*DARK_TEXT_LIGHT)
    c.drawString(8*mm, PAGE_H - 32*mm, keyword[:10])
    c.setStrokeColorRGB(*DARK_LINE)
    c.setLineWidth(0.4)
    c.line(8*mm, PAGE_H - 34*mm, 8*mm + 8*mm, PAGE_H - 34*mm)

    # Section list — current highlighted
    y = PAGE_H - 50*mm
    for i, sec in enumerate(real_sections):
        if i == current_section_idx:
            c.setFillColorRGB(*SAND_ACCENT)
            label_color = (0.784, 0.816, 0.910)
        else:
            c.setFillColorRGB(*DARK_TEXT_FAINT)
            label_color = (0.522, 0.565, 0.702)
        c.setFont(FONT_MONO_BD, 8)
        c.drawString(8*mm, y, f"{i+1:02d}")
        c.setFont(FONT_SANS, 7)
        c.setFillColorRGB(*label_color)
        # Two short lines: first two significant words, each max 11 chars
        words = [w for w in re.split(r'[\s,\-:]+', sec['title'])
                 if w and w.upper() not in {'AND','THE','OF','A','AS','AN'}]
        line1 = smart_titlecase(words[0])[:11] if words else ''
        line2 = smart_titlecase(words[1])[:11] if len(words) > 1 else ''
        c.drawString(8*mm, y - 4*mm, line1)
        if line2:
            c.drawString(8*mm, y - 8*mm, line2)
        y -= 16*mm

    # Page number bottom
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*DARK_TEXT_FAINT)


def section_short_label(title):
    """Return a short 1-2 word label from a section title."""
    title = title.strip()
    words = re.split(r'[\s,—\-:·&]+', title)
    words = [w for w in words if w and w.upper() not in {'AND', 'THE', 'OF', 'A', 'AS'}]
    if not words:
        return title[:12]
    label = smart_titlecase(words[0])
    if len(label) < 5 and len(words) > 1:
        label += ' ' + smart_titlecase(words[1])
    return label[:14]


def draw_body_section(c, ch, section, section_idx, real_sections, page_num):
    """Body page for one section; overflows to new pages as needed. Returns page_num."""
    BOTTOM = MARGIN_BOTTOM + 4*mm  # absolute bottom boundary (~20 mm)

    def _new_page():
        nonlocal page_num
        draw_footer(c, page_num, ch, footer_color=INK_MUTED)
        c.showPage()
        page_num += 1
        draw_sidebar(c, ch, section_idx, real_sections)
        cx = SIDEBAR_W + 14*mm
        cw = PAGE_W - cx - MARGIN_X
        ny = PAGE_H - 16*mm
        c.setFont(FONT_MONO, 7)
        c.setFillColorRGB(*INK_FAINT)
        c.drawString(cx, ny, safe_text(f"{section['title'].upper()[:55]}  ·  CONTINUED"))
        c.setStrokeColorRGB(*DIVIDER)
        c.setLineWidth(0.3)
        c.line(cx, ny - 3*mm, cx + cw, ny - 3*mm)
        return ny - 10*mm

    draw_sidebar(c, ch, section_idx, real_sections)

    content_x = SIDEBAR_W + 14*mm
    content_w = PAGE_W - content_x - MARGIN_X
    y = PAGE_H - 22*mm
    unit = ch.get('unit_number', 1)
    ch_num = ch.get('chapter_in_unit', 1)

    # Top section breadcrumb
    c.setFont(FONT_MONO_BD, 7.5)
    c.setFillColorRGB(*INK_MUTED)
    breadcrumb = f"SECTION {section_idx+1:02d}  ·  {section['title'].upper()[:60]}"
    c.drawString(content_x, y, breadcrumb)
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*INK_FAINT)
    c.drawRightString(content_x + content_w, y,
                      f"{unit:02d}.{ch_num:02d}.{section_idx+1:02d}")
    y -= 4*mm
    c.setStrokeColorRGB(*DIVIDER)
    c.setLineWidth(0.3)
    c.line(content_x, y, content_x + content_w, y)
    y -= 10*mm

    # Section title — split into 2 lines, second italic
    sec_title = smart_titlecase(section['title'])
    parts = split_title(sec_title)
    c.setFillColorRGB(*INK_PRIMARY)
    for i, line in enumerate(parts[:2]):
        font = FONT_SERIF_IT if i == 1 else FONT_SERIF
        c.setFont(font, 22)
        c.drawString(content_x, y, line)
        y -= 24

    # Subtitle
    if section.get('subtitle'):
        y -= 2*mm
        c.setFont(FONT_SANS, 9)
        c.setFillColorRGB(*INK_MUTED)
        c.drawString(content_x, y, safe_text(section['subtitle']))
        y -= 8*mm
    else:
        y -= 4*mm

    # Body paragraphs — overflow to new pages
    body = section.get('body', '')
    paragraphs = [p.strip() for p in body.split('\n\n') if p.strip()]
    c.setFont(FONT_SERIF, 10.5)
    c.setFillColorRGB(*INK_BODY)
    for para in paragraphs:
        lines = wrap_text(c, safe_text(para), FONT_SERIF, 10.5, content_w)
        for line in lines:
            if y < BOTTOM:
                y = _new_page()
                c.setFont(FONT_SERIF, 10.5)
                c.setFillColorRGB(*INK_BODY)
            c.drawString(content_x, y, line)
            y -= 14
        y -= 6  # paragraph gap

    # Inline diagram image (if provided)
    image_url = section.get('image_url')
    if image_url:
        img_path = _fetch_image(image_url)
        if img_path:
            try:
                from PIL import Image as PILImage
                with PILImage.open(img_path) as pil_img:
                    iw, ih = pil_img.size
                aspect = ih / iw if iw > 0 else 0.6
                img_render_w = min(content_w, content_w * 0.88)
                img_render_h = img_render_w * aspect
                max_h = 80 * mm
                if img_render_h > max_h:
                    img_render_h = max_h
                    img_render_w = img_render_h / aspect
                # Pre-calculate caption so we can include its height in the page-space check
                caption = safe_text(section.get('image_caption') or '')
                c.setFont(FONT_SANS, 8)
                cap_lines = wrap_text(c, caption, FONT_SANS, 8, img_render_w) if caption else []
                cap_h = len(cap_lines) * 10 + (4 * mm if cap_lines else 0)
                needed = img_render_h + 14 + cap_h
                if y - needed < BOTTOM:
                    y = _new_page()
                    c.setFont(FONT_SERIF, 10.5)
                    c.setFillColorRGB(*INK_BODY)
                img_x = content_x + (content_w - img_render_w) / 2
                c.drawImage(img_path, img_x, y - img_render_h,
                            width=img_render_w, height=img_render_h,
                            preserveAspectRatio=True, mask='auto')
                y -= img_render_h + 4
                if cap_lines:
                    c.setFont(FONT_SANS, 8)
                    c.setFillColorRGB(*INK_MUTED)
                    for line in cap_lines:
                        if y < BOTTOM + 10:
                            break
                        cx_cap = img_x + (img_render_w - c.stringWidth(line, FONT_SANS, 8)) / 2
                        c.drawString(cx_cap, y, line)
                        y -= 10
                y -= 4 * mm
            except Exception:
                pass  # silently skip broken images

    # AP Exam Alert / Competition Insight box
    boxes = section.get('boxes', [])
    if boxes:
        box = boxes[0]
        pad = 5*mm
        est_lines = len(wrap_text(c, safe_text(box[1]), FONT_SERIF_IT, 9.5, content_w - 2*pad))
        needed = pad * 2 + 5*mm + est_lines * 13 + 6*mm
        if y - needed < BOTTOM:
            y = _new_page()
        box_h = draw_alert_box(c, box[0], box[1], content_x, y, content_w)
        y -= box_h + 6*mm

    # Key Terms
    if section.get('key_terms'):
        if y < BOTTOM + 20*mm:
            y = _new_page()
        c.setStrokeColorRGB(*DIVIDER)
        c.setLineWidth(0.3)
        c.line(content_x, y, content_x + content_w, y)
        y -= 5*mm
        c.setFont(FONT_MONO_BD, 7.5)
        c.setFillColorRGB(*INK_MUTED)
        c.drawString(content_x, y, "— KEY TERMS")
        y -= 6*mm

        for i, kt in enumerate(section['key_terms']):
            term_text = safe_text(kt[0])
            defn_text = kt[1]
            term_x = content_x + 8*mm
            # Pre-compute definition wrap to get exact height before drawing anything
            term_w_px = c.stringWidth(term_text, FONT_SERIF_BD, 9.5)
            def_x = term_x + term_w_px + 4
            def_w = content_w - (def_x - content_x)
            full_def = "— " + defn_text
            def_lines = wrap_text(c, safe_text(full_def), FONT_SERIF, 9.5, def_w)
            term_height = max(len(def_lines), 1) * 12 + 2  # all lines + small gap
            # Check atomically: if the whole term entry doesn't fit, push to next page
            if y - term_height < BOTTOM:
                y = _new_page()
            # Draw number badge
            c.setFont(FONT_MONO_BD, 7.5)
            c.setFillColorRGB(*CORAL_ACCENT)
            c.drawString(content_x, y, f"{i+1:02d}")
            # Draw term
            c.setFont(FONT_SERIF_BD, 9.5)
            c.setFillColorRGB(*INK_PRIMARY)
            c.drawString(term_x, y, term_text)
            # Draw definition — first line inline with term, continuations indented
            c.setFont(FONT_SERIF, 9.5)
            c.setFillColorRGB(*INK_BODY)
            if def_lines:
                c.drawString(def_x, y, def_lines[0])
                for line in def_lines[1:]:
                    y -= 12
                    c.drawString(term_x, y, line)
            y -= 14

    draw_footer(c, page_num, ch, footer_color=INK_MUTED)
    return page_num


def draw_alert_box(c, box_type, content, x, y, w):
    """Draw AP Exam Alert / Competition Insight cosmic box. Returns height used."""
    pad = 5*mm
    label = "AP EXAM ALERT" if box_type == 'ap_alert' else "COMPETITION INSIGHT"

    # Determine height needed
    text_w = w - 2 * pad
    lines = wrap_text(c, safe_text(content), FONT_SERIF_IT, 9.5, text_w)
    line_h = 13
    box_h = pad * 2 + 5*mm + len(lines) * line_h

    # Draw cosmic background
    c.setFillColorRGB(*COSMIC_BG)
    c.rect(x, y - box_h, w, box_h, stroke=0, fill=1)

    # Label
    c.setFont(FONT_MONO_BD, 7.5)
    c.setFillColorRGB(*SAND_ACCENT)
    c.drawString(x + pad, y - pad - 6, label)

    # Body
    c.setFont(FONT_SERIF_IT, 9.5)
    c.setFillColorRGB(*DARK_TEXT_BLUE)
    cur_y = y - pad - 6 - 6*mm
    for line in lines:
        c.drawString(x + pad, cur_y, line)
        cur_y -= line_h

    return box_h


def draw_practice_questions(c, ch, real_sections, page_num):
    """Practice Questions page — questions only, no answers."""
    qs = ch.get('generated_questions')
    if not qs:
        return page_num  # nothing to draw
    draw_sidebar_practice(c, ch, real_sections)

    content_x = SIDEBAR_W + 14*mm
    content_w = PAGE_W - content_x - MARGIN_X
    y = PAGE_H - 22*mm
    unit = ch.get('unit_number', 1)
    ch_num = ch.get('chapter_in_unit', 1)

    # Header
    c.setFont(FONT_MONO_BD, 7.5)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(content_x, y, "PRACTICE  ·  TEST YOUR UNDERSTANDING")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*INK_FAINT)
    c.drawRightString(content_x + content_w, y, f"{unit:02d}.{ch_num:02d}.P")
    y -= 4*mm
    c.setStrokeColorRGB(*DIVIDER)
    c.setLineWidth(0.3)
    c.line(content_x, y, content_x + content_w, y)
    y -= 10*mm

    # Title
    c.setFillColorRGB(*INK_PRIMARY)
    c.setFont(FONT_SERIF, 22)
    c.drawString(content_x, y, "Practice")
    y -= 24
    c.setFont(FONT_SERIF_IT, 22)
    c.drawString(content_x, y, "Questions")
    y -= 8

    c.setFont(FONT_SANS, 9)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(content_x, y - 4*mm, "Multiple choice and free response — solutions on the next page")
    y -= 12*mm

    # MCQ section header
    y = draw_qs_section_header(c, "— MULTIPLE CHOICE", content_x, y, content_w)

    def _new_page_practice():
        nonlocal page_num
        draw_footer(c, page_num, ch, footer_color=INK_MUTED)
        c.showPage()
        page_num += 1
        draw_sidebar_practice(c, ch, real_sections)
        return PAGE_H - 22*mm

    # MCQs — atomic: if it doesn't fit, new page then force-draw
    for i, q in enumerate(qs['mcq']):
        new_y = draw_mcq(c, i+1, q, content_x, y, content_w)
        if new_y is None:
            y = _new_page_practice()
            new_y = draw_mcq(c, i+1, q, content_x, y, content_w, force=True)
        y = new_y

    # FRQ section header — new page if tight
    if y < 50*mm:
        y = _new_page_practice()

    y -= 6*mm
    y = draw_qs_section_header(c, "— FREE RESPONSE", content_x, y, content_w)

    # FRQs — atomic: if it doesn't fit, new page then force-draw
    for i, q in enumerate(qs['frq']):
        new_y = draw_frq_question(c, i+1, q, content_x, y, content_w)
        if new_y is None:
            y = _new_page_practice()
            new_y = draw_frq_question(c, i+1, q, content_x, y, content_w, force=True)
        y = new_y

    draw_footer(c, page_num, ch, footer_color=INK_MUTED)
    return page_num


def draw_qs_section_header(c, label, x, y, w):
    c.setFont(FONT_MONO_BD, 9)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(x, y, label)
    return y - 7*mm


def draw_mcq(c, num, q, x, y, w, force=False):
    """Render one MCQ atomically.
    Returns new y, or None if the question doesn't fit (unless force=True)."""
    BOTTOM = MARGIN_BOTTOM + 4*mm
    text_x = x + 10*mm
    text_w = w - 10*mm
    choice_x = text_x + 7*mm
    choice_w = text_w - 7*mm

    # Pre-compute all wrapped content so we know exact height before drawing
    q_lines = wrap_text(c, safe_text(q['question']), FONT_SERIF, 10.5, text_w)
    choice_blocks = []
    for letter in 'ABCD':
        ch_lines = wrap_text(c, safe_text(q['choices'][letter]), FONT_SERIF, 10, choice_w)
        choice_blocks.append((letter, ch_lines))

    total = len(q_lines) * 13 + 4  # question + small gap
    for _, ch_lines in choice_blocks:
        total += len(ch_lines) * 12 + 2  # each choice
    total += 6*mm  # trailing gap

    if not force and y - total < BOTTOM:
        return None  # doesn't fit — caller should new_page then retry with force=True

    # Draw question number
    c.setFont(FONT_MONO_BD, 9)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(x, y, f"{num:02d}")

    # Draw question text
    c.setFont(FONT_SERIF, 10.5)
    c.setFillColorRGB(*INK_BODY)
    for line in q_lines:
        c.drawString(text_x, y, line)
        y -= 13
    y -= 4

    # Draw all four choices
    for letter, ch_lines in choice_blocks:
        c.setFont(FONT_MONO_BD, 9)
        c.setFillColorRGB(*INK_MUTED)
        c.drawString(text_x, y, letter)
        c.setFont(FONT_SERIF, 10)
        c.setFillColorRGB(*INK_BODY)
        for line in ch_lines:
            c.drawString(choice_x, y, line)
            y -= 12
        y -= 2

    y -= 6*mm
    return y


def draw_frq_question(c, num, q, x, y, w, force=False):
    """Render one FRQ question only (not rubric/answer) atomically.
    Returns new y, or None if it doesn't fit (unless force=True)."""
    BOTTOM = MARGIN_BOTTOM + 4*mm
    text_x = x + 10*mm
    text_w = w - 10*mm

    # Pre-compute all parts so we know total height before drawing
    parts = q['question'].split('\n')
    part_blocks = []
    for part in parts:
        if not part.strip():
            part_blocks.append(None)  # blank line = small gap
        else:
            part_blocks.append(wrap_text(c, safe_text(part.strip()), FONT_SERIF, 10.5, text_w))

    total = sum(4 if b is None else len(b) * 13 for b in part_blocks) + 8*mm

    if not force and y - total < BOTTOM:
        return None  # doesn't fit — caller should new_page then retry with force=True

    c.setFont(FONT_MONO_BD, 9)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(x, y, f"{num:02d}")

    c.setFont(FONT_SERIF, 10.5)
    c.setFillColorRGB(*INK_BODY)
    for block in part_blocks:
        if block is None:
            y -= 4
        else:
            for line in block:
                c.drawString(text_x, y, line)
                y -= 13

    y -= 8*mm
    return y


def draw_answer_key(c, ch, real_sections, page_num):
    """Answer key page(s) — explanations, rubric, model answers."""
    qs = ch.get('generated_questions')
    if not qs:
        return page_num
    draw_sidebar_practice(c, ch, real_sections)

    content_x = SIDEBAR_W + 14*mm
    content_w = PAGE_W - content_x - MARGIN_X
    y = PAGE_H - 22*mm
    unit = ch.get('unit_number', 1)
    ch_num = ch.get('chapter_in_unit', 1)

    # Header
    c.setFont(FONT_MONO_BD, 7.5)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(content_x, y, "ANSWER KEY  ·  WORKED SOLUTIONS")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*INK_FAINT)
    c.drawRightString(content_x + content_w, y, f"{unit:02d}.{ch_num:02d}.A")
    y -= 4*mm
    c.setStrokeColorRGB(*DIVIDER)
    c.setLineWidth(0.3)
    c.line(content_x, y, content_x + content_w, y)
    y -= 10*mm

    # Title
    c.setFillColorRGB(*INK_PRIMARY)
    c.setFont(FONT_SERIF, 22)
    c.drawString(content_x, y, "Answers")
    y -= 24
    c.setFont(FONT_SERIF_IT, 22)
    c.drawString(content_x, y, "and explanations")
    y -= 12*mm

    # MCQ answers
    y = draw_qs_section_header(c, "— MULTIPLE CHOICE  ·  WORKED EXPLANATIONS", content_x, y, content_w)

    def _new_page_answers():
        nonlocal page_num
        draw_footer(c, page_num, ch, footer_color=INK_MUTED)
        c.showPage()
        page_num += 1
        draw_sidebar_practice(c, ch, real_sections)
        return PAGE_H - 22*mm

    # MCQ answers — atomic: if it doesn't fit, new page then force-draw
    for i, q in enumerate(qs['mcq']):
        new_y = draw_mcq_answer(c, i+1, q, content_x, y, content_w)
        if new_y is None:
            y = _new_page_answers()
            new_y = draw_mcq_answer(c, i+1, q, content_x, y, content_w, force=True)
        y = new_y

    # FRQ rubrics
    if y < 50*mm:
        y = _new_page_answers()

    y -= 6*mm
    y = draw_qs_section_header(c, "— FREE RESPONSE  ·  RUBRIC AND MODEL ANSWERS", content_x, y, content_w)

    for i, q in enumerate(qs['frq']):
        # Check if even the rubric header would fit; otherwise new page
        if y < 50*mm:
            y = _new_page_answers()
            y = PAGE_H - 22*mm
        y, page_num = draw_frq_answer(c, i+1, q, content_x, y, content_w,
                                       ch, real_sections, page_num)

    draw_footer(c, page_num, ch, footer_color=INK_MUTED)
    return page_num


def draw_mcq_answer(c, num, q, x, y, w, force=False):
    """Render MCQ answer + explanation atomically.
    Returns new y, or None if it doesn't fit (unless force=True)."""
    BOTTOM = MARGIN_BOTTOM + 4*mm
    text_x = x + 10*mm
    text_w = w - 10*mm

    expl_lines = wrap_text(c, safe_text(q['explanation']), FONT_SERIF, 10, text_w)
    total = 16 + len(expl_lines) * 12 + 6*mm  # answer line + explanation + gap

    if not force and y - total < BOTTOM:
        return None  # doesn't fit — caller should new_page then retry with force=True

    c.setFont(FONT_MONO_BD, 9)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(x, y, f"{num:02d}")

    c.setFont(FONT_SERIF_BD, 12)
    c.setFillColorRGB(*INK_PRIMARY)
    c.drawString(text_x, y, f"Answer: {q['answer']}")
    y -= 16

    c.setFont(FONT_SERIF, 10)
    c.setFillColorRGB(*INK_BODY)
    for line in expl_lines:
        c.drawString(text_x, y, line)
        y -= 12

    y -= 6*mm
    return y


def draw_frq_answer(c, num, q, x, y, w, ch, real_sections, page_num):
    """Render FRQ rubric + model answer with proper inline page breaks.
    Returns (new_y, new_page_num)."""
    text_x = x + 10*mm
    text_w = w - 10*mm

    def newpage():
        nonlocal page_num
        draw_footer(c, page_num, ch, footer_color=INK_MUTED)
        c.showPage()
        page_num += 1
        draw_sidebar_practice(c, ch, real_sections)
        return PAGE_H - 22*mm

    def need(needed):
        nonlocal y
        if y - needed < MARGIN_BOTTOM + 5*mm:
            y = newpage()

    # Number badge (only on the page where this FRQ starts)
    c.setFont(FONT_MONO_BD, 9)
    c.setFillColorRGB(*CORAL_ACCENT)
    c.drawString(x, y, f"{num:02d}")

    # RUBRIC label
    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(text_x, y, "RUBRIC  ·  SCORING POINTS")
    y -= 5*mm

    # Rubric points
    for j, point in enumerate(q['rubric']):
        c.setFont(FONT_SERIF, 9.5)
        bullet_x = text_x + 5*mm
        lines = wrap_text(c, safe_text(point), FONT_SERIF, 9.5, text_w - 5*mm)
        # Check space
        need(len(lines) * 12 + 4)
        c.setFont(FONT_MONO_BD, 8)
        c.setFillColorRGB(*INK_FAINT)
        c.drawString(text_x, y, f"{j+1}.")
        c.setFont(FONT_SERIF, 9.5)
        c.setFillColorRGB(*INK_BODY)
        for line in lines:
            c.drawString(bullet_x, y, line)
            y -= 12
        y -= 2

    y -= 4*mm

    need(8*mm)
    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*INK_MUTED)
    c.drawString(text_x, y, "MODEL ANSWER")
    y -= 5*mm

    # Model answer body — line-by-line with page break checks
    c.setFont(FONT_SERIF_IT, 9.5)
    c.setFillColorRGB(*INK_BODY)
    paras = q['model_answer'].split('\n\n')
    for para in paras:
        if not para.strip():
            continue
        lines = wrap_text(c, safe_text(para.strip()), FONT_SERIF_IT, 9.5, text_w)
        for line in lines:
            need(12)
            c.setFont(FONT_SERIF_IT, 9.5)
            c.setFillColorRGB(*INK_BODY)
            c.drawString(text_x, y, line)
            y -= 12
        y -= 4

    y -= 6*mm
    return y, page_num


def draw_sidebar_practice(c, ch, real_sections):
    """Sidebar variant for practice/answer pages — shows 'PRACTICE' label."""
    c.setFillColorRGB(*COSMIC_BG)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, stroke=0, fill=1)

    sidebar_text_zones = [
        (4*mm, PAGE_H - 24*mm, SIDEBAR_W - 4*mm, PAGE_H - 8*mm),
        (4*mm, PAGE_H - 36*mm, SIDEBAR_W - 4*mm, PAGE_H - 26*mm),
        (4*mm, PAGE_H - 56*mm, SIDEBAR_W - 4*mm, PAGE_H - 44*mm),
        (0, 4*mm, SIDEBAR_W, 14*mm),
    ]
    draw_starfield(c, 0, 0, SIDEBAR_W, PAGE_H, density=0.0001,
                   seed=ch.get('unit_number', 1), exclude_zones=sidebar_text_zones)

    unit = ch.get('unit_number', 1)
    c.setFont(FONT_MONO_BD, 11)
    c.setFillColorRGB(*SAND_ACCENT)
    c.drawString(8*mm, PAGE_H - 16*mm, f"{unit:02d}")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*DARK_TEXT_FAINT)
    c.drawString(8*mm, PAGE_H - 20*mm, "UNIT")

    title_words = ch['chapter_title'].split()
    keyword = next((w for w in title_words if w.lower() not in
                    {'the', 'a', 'an', 'of', 'and', 'how', 'why', 'when', 'what'}),
                   title_words[0] if title_words else '')
    keyword = keyword.strip(',.:;—-—')
    c.setFont(FONT_SERIF_IT, 11)
    c.setFillColorRGB(*DARK_TEXT_LIGHT)
    c.drawString(8*mm, PAGE_H - 32*mm, keyword[:10])
    c.setStrokeColorRGB(*DARK_LINE)
    c.setLineWidth(0.4)
    c.line(8*mm, PAGE_H - 34*mm, 8*mm + 8*mm, PAGE_H - 34*mm)

    # "PRACTICE" indicator
    c.setFont(FONT_MONO_BD, 8)
    c.setFillColorRGB(*SAND_ACCENT)
    c.drawString(8*mm, PAGE_H - 50*mm, "PRACTICE")
    c.setFont(FONT_MONO, 7.5)
    c.setFillColorRGB(*DARK_TEXT_DIM)
    c.drawString(8*mm, PAGE_H - 54*mm, "MCQ + FRQ")


def generate_chapter_pdf(ch, output_path, start_page=12):
    """Generate one PDF for one chapter."""
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle(ch['chapter_title'])
    c.setAuthor("InHero Education")

    # Filter out QUICK REFERENCE sections — they get a separate page
    real_sections = [s for s in ch['sections']
                     if 'QUICK REFERENCE' not in s['title'].upper()]

    # Page 1: opening
    page_num = start_page
    draw_chapter_opening(c, ch, page_num, ch.get('chapter_in_unit', 1))
    c.showPage()

    # Page 2+: one page per section (may overflow to additional pages)
    for i, sec in enumerate(real_sections):
        page_num += 1
        page_num = draw_body_section(c, ch, sec, i, real_sections, page_num)
        c.showPage()

    # Practice questions (if generated)
    if ch.get('generated_questions'):
        page_num += 1
        page_num = draw_practice_questions(c, ch, real_sections, page_num)
        c.showPage()
        page_num += 1
        page_num = draw_answer_key(c, ch, real_sections, page_num)
        c.showPage()

    c.save()


def assign_unit_numbers(chapters):
    """Assign unit_number (1-8) and chapter_in_unit (1-N) based on unit_name."""
    unit_order = []
    for ch in chapters:
        if ch['unit_name'] not in unit_order:
            unit_order.append(ch['unit_name'])

    unit_idx = {name: i+1 for i, name in enumerate(unit_order)}
    unit_counter = {}
    for ch in chapters:
        u = ch['unit_name']
        ch['unit_number'] = unit_idx[u]
        unit_counter[u] = unit_counter.get(u, 0) + 1
        ch['chapter_in_unit'] = unit_counter[u]
    return chapters


def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    text = re.sub(r'[\s_-]+', '_', text)
    return text[:50]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--chapter', type=int, help='Generate single chapter (1-65)')
    parser.add_argument('--combined', action='store_true', help='One big PDF')
    parser.add_argument('--data', default='chapters_data.json')
    parser.add_argument('--out', default='output')
    args = parser.parse_args()

    with open(args.data, 'r', encoding='utf-8') as f:
        chapters = json.load(f)

    chapters = assign_unit_numbers(chapters)

    os.makedirs(args.out, exist_ok=True)

    if args.chapter:
        ch = chapters[args.chapter - 1]
        fn = f"U{ch['unit_number']:02d}_{ch['chapter_in_unit']:02d}_{slugify(ch['chapter_title'])}.pdf"
        path = os.path.join(args.out, fn)
        generate_chapter_pdf(ch, path)
        print(f"Generated: {path}")
    elif args.combined:
        path = os.path.join(args.out, "InHero_AP_Biology_Complete.pdf")
        c = canvas.Canvas(path, pagesize=A4)
        c.setTitle("InHero AP Biology")
        c.setAuthor("InHero Education")
        page_num = 12
        for ch in chapters:
            real_sections = [s for s in ch['sections']
                             if 'QUICK REFERENCE' not in s['title'].upper()]
            draw_chapter_opening(c, ch, page_num, ch.get('chapter_in_unit', 1))
            c.showPage()
            for i, sec in enumerate(real_sections):
                page_num += 1
                page_num = draw_body_section(c, ch, sec, i, real_sections, page_num)
                c.showPage()
            if ch.get('generated_questions'):
                page_num += 1
                page_num = draw_practice_questions(c, ch, real_sections, page_num)
                c.showPage()
                page_num += 1
                page_num = draw_answer_key(c, ch, real_sections, page_num)
                c.showPage()
            page_num += 1
        c.save()
        print(f"Generated combined: {path}")
    else:
        for ch in chapters:
            fn = f"U{ch['unit_number']:02d}_{ch['chapter_in_unit']:02d}_{slugify(ch['chapter_title'])}.pdf"
            path = os.path.join(args.out, fn)
            generate_chapter_pdf(ch, path)
        print(f"Generated {len(chapters)} chapters in {args.out}/")


def _fetch_image(url: str) -> str | None:
    """Download image URL to a temp file. Returns path or None on failure."""
    import urllib.request
    import tempfile
    try:
        suffix = ".png" if ".png" in url.lower() else ".jpg"
        tmp = tempfile.mktemp(suffix=suffix)
        urllib.request.urlretrieve(url, tmp)
        return tmp
    except Exception:
        return None


if __name__ == '__main__':
    main()
