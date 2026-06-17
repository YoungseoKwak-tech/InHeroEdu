#!/usr/bin/env python3
"""
Generate book covers for the Core Notes → Original textbooks.

Reads scripts/textbook/build/<courseId>/manifest.json and writes a 2:3
typographic cover to public/textbook-covers/<slug>.png — on-brand with the
Library cover surface (dark navy gradient + per-subject accent + title +
"The Ultimate Guide" + "InHero Original"). Matches the .orig-cover CSS bg.

  python3 scripts/textbook/make-covers.py            # all built subjects
  python3 scripts/textbook/make-covers.py <courseId> # one
"""
from __future__ import annotations
import colorsys
import hashlib
import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
BUILD = ROOT / "scripts" / "textbook" / "build"
OUT = ROOT / "public" / "textbook-covers"
W, H = 660, 990  # 2:3

FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_UNI = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"


def accent_for(slug: str) -> tuple[int, int, int]:
    """Deterministic, pleasant accent per slug (stable across runs)."""
    h = int(hashlib.md5(slug.encode()).hexdigest(), 16)
    hue = (h % 360) / 360.0
    r, g, b = colorsys.hls_to_rgb(hue, 0.62, 0.62)
    return int(r * 255), int(g * 255), int(b * 255)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.truetype(FONT_UNI, size)


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make_cover(slug: str, title: str, subtitle: str, eyebrow: str, author: str, tag: str):
    accent = accent_for(slug)
    top, bot = (12, 20, 36), (5, 8, 17)  # #0c1424 → #050811

    img = Image.new("RGB", (W, H), bot)
    px = img.load()
    for y in range(H):
        row = lerp(top, bot, y / H)
        for x in range(W):
            px[x, y] = row
    d = ImageDraw.Draw(img, "RGBA")

    # Soft accent glow top-center.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W * 0.1, -H * 0.18, W * 0.9, H * 0.42], fill=accent + (46,))
    img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))
    d = ImageDraw.Draw(img, "RGBA")

    pad = 64
    # Accent rule + eyebrow.
    d.rounded_rectangle([pad, 150, pad + 70, 158], radius=4, fill=accent)
    d.text((pad, 178), eyebrow.upper(), font=font(FONT_BOLD, 23), fill=accent + (255,))

    # Category tag pill.
    if tag:
        tf = font(FONT_BOLD, 21)
        tw = d.textlength(tag, font=tf)
        d.rounded_rectangle([W - pad - tw - 28, 176, W - pad, 212], radius=18,
                            outline=(255, 255, 255, 70), width=2)
        d.text((W - pad - tw - 14, 182), tag, font=tf, fill=(220, 230, 240, 255))

    # Title (bottom-anchored block).
    tf = font(FONT_BOLD, 70)
    lines = wrap(d, title, tf, W - 2 * pad)
    if len(lines) > 3:  # shrink very long titles
        tf = font(FONT_BOLD, 56)
        lines = wrap(d, title, tf, W - 2 * pad)
    line_h = int(tf.size * 1.12)
    block_h = line_h * len(lines)
    ty = int(H * 0.60) - block_h
    for ln in lines:
        d.text((pad, ty), ln, font=tf, fill=(255, 255, 255, 255))
        ty += line_h

    # Subtitle.
    ty += 12
    d.text((pad, ty), subtitle, font=font(FONT_REG, 33), fill=(150, 168, 188, 255))

    # Accent base bar + author + brand.
    d.rectangle([0, H - 92, W, H - 88], fill=accent)
    d.text((pad, H - 66), f"by {author}", font=font(FONT_REG, 24), fill=(120, 138, 158, 255))
    bf = font(FONT_BOLD, 26)
    bw = d.textlength("InHero", font=bf)
    d.text((W - pad - bw, H - 68), "InHero", font=bf, fill=(255, 255, 255, 255))

    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{slug}.png"
    img.save(path, "PNG")
    return path


def tag_for(course_id: str) -> str:
    if course_id.startswith("ap-"):
        return "AP"
    if course_id.startswith("honors-"):
        return "HONORS"
    if course_id.startswith("ib-"):
        return "IB"
    return ""


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    dirs = [BUILD / only] if only else sorted(p for p in BUILD.iterdir() if p.is_dir())
    n = 0
    for dpath in dirs:
        mf = dpath / "manifest.json"
        if not mf.exists():
            continue
        m = json.loads(mf.read_text())
        path = make_cover(
            slug=m["slug"], title=m["title"], subtitle=m.get("subtitle", "The Ultimate Guide"),
            eyebrow="InHero Original", author=m.get("author", "Youngseo Kwak"),
            tag=tag_for(m["courseId"]),
        )
        print(f"✓ {path.relative_to(ROOT)}")
        n += 1
    print(f"\n✅ {n} covers → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
