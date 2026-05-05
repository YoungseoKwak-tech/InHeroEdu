#!/usr/bin/env python3
"""
Batch-generates cosmic PDFs for all AP Biology lessons via Modal endpoint.
Reads lessons from Supabase, calls Modal for each, reports progress.
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error

SUPABASE_URL = "https://pxxdduhtnulwmseygojv.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eGRkdWh0bnVsd21zZXlnb2p2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQwMTcwNSwiZXhwIjoyMDkwOTc3NzA1fQ.PCRhCPzAXwUuUEbFIB9GCKqkBkwb6TH26Beu89EXZsc"
MODAL_URL   = "https://youngseokwak-tech--inhero-textbook-generate-textbook.modal.run"
COURSE_ID   = "ap-biology"
COURSE_NAME = "AP Biology"

LESSON_BREAKDOWN_PATH = os.path.join(os.path.dirname(__file__),
                                      "../lib/data/ap-lesson-breakdown.json")


def supabase_get(path: str) -> dict:
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    req = urllib.request.Request(url, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    })
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())


def post_json(url: str, payload: dict, timeout: int = 660) -> dict:
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def build_fallback_lessons():
    with open(LESSON_BREAKDOWN_PATH, encoding="utf-8") as f:
        breakdown = json.load(f)
    course = next(c for c in breakdown["courses"] if c["courseId"] == COURSE_ID)
    lessons = []
    for unit in course["units"]:
        for lesson in unit["lessons"]:
            lid = f"{COURSE_ID}-u{unit['unitNumber']}-l{lesson['lessonNumber']}"
            lessons.append({
                "id": lid,
                "unit_number": unit["unitNumber"],
                "unit_title": unit["unitTitle"],
                "lesson_number": lesson["lessonNumber"],
                "title": lesson["lessonTitle"],
            })
    return lessons


def main():
    # 1. Fetch lessons from DB; fall back to JSON breakdown
    try:
        rows = supabase_get(
            f"lessons?course_id=eq.{COURSE_ID}"
            f"&order=unit_number.asc,lesson_number.asc"
            f"&select=id,unit_number,unit_title,lesson_number,title"
        )
        lessons = rows if rows else build_fallback_lessons()
    except Exception as e:
        print(f"⚠ Could not fetch lessons from DB ({e}), using fallback JSON")
        lessons = build_fallback_lessons()

    total = len(lessons)
    print(f"✓ {total} lessons to regenerate\n")

    succeeded = []
    failed    = []

    for idx, lesson in enumerate(lessons, 1):
        lid    = lesson["id"]
        title  = lesson["title"]
        unit   = lesson.get("unit_title", "")
        u_num  = lesson.get("unit_number", 1)
        l_num  = lesson.get("lesson_number", idx)

        label  = f"U{u_num:02d}-{l_num:02d} {title}"
        print(f"[{idx:02d}/{total}] ⏳ {label}", flush=True)

        payload = {
            "lessonId":    lid,
            "lessonTitle": title,
            "subject":     COURSE_NAME,
            "unit":        unit,
            "category":    "AP",
            "script":      "",  # Modal fetches from DB
        }

        t0 = time.time()
        try:
            result  = post_json(MODAL_URL, payload, timeout=660)
            elapsed = time.time() - t0
            pdf_url = result.get("pdfUrl", "—")
            pages   = result.get("pages", "?")
            print(f"[{idx:02d}/{total}] ✅ {label} — {pages}p  ({elapsed:.0f}s)")
            print(f"         {pdf_url}\n", flush=True)
            succeeded.append(label)
        except urllib.error.HTTPError as e:
            elapsed = time.time() - t0
            body = e.read().decode(errors="replace")[:300]
            print(f"[{idx:02d}/{total}] ❌ {label} — HTTP {e.code}  ({elapsed:.0f}s)")
            print(f"         {body}\n", flush=True)
            failed.append((label, f"HTTP {e.code}: {body}"))
        except Exception as e:
            elapsed = time.time() - t0
            print(f"[{idx:02d}/{total}] ❌ {label} — {e}  ({elapsed:.0f}s)\n", flush=True)
            failed.append((label, str(e)))

    # Summary
    print("=" * 60)
    print(f"Done: {len(succeeded)}/{total} succeeded, {len(failed)} failed")
    if failed:
        print("\nFailed lessons:")
        for name, err in failed:
            print(f"  • {name}: {err[:120]}")
    print("=" * 60)


if __name__ == "__main__":
    main()
