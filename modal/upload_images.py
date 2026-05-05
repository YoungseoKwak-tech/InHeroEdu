"""
One-time script: upload all AP Bio images to Supabase Storage.

Usage:
    cd modal
    python upload_images.py

Requires:
    pip install supabase python-dotenv
    .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
"""

import os
import sys
import re
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(".env.local")
load_dotenv("../.env.local", override=False)  # fallback to project root

SUPABASE_URL = os.environ.get("SUPABASE_URL") or os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local")
    sys.exit(1)

from supabase import create_client
from image_manifest import AP_BIO_IMAGES

SOURCE_DIR = Path("/Users/kathleenk/Desktop/Education/Textbook/AP BIO IMAGES/All images")
BUCKET = "textbooks"
STORAGE_PREFIX = "images/ap-biology"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def normalize_filename(name: str) -> str:
    normalized = name.replace("\u202f", " ").replace("\xa0", " ")
    normalized = re.sub(r"\s+", " ", normalized).strip().lower()
    return normalized


actual_files = sorted([p for p in SOURCE_DIR.iterdir() if p.is_file()], key=lambda p: p.name)
manifest_by_original = {
    normalize_filename(img["original"]): img
    for img in AP_BIO_IMAGES
}
actual_by_name = {
    normalize_filename(p.name): p
    for p in actual_files
}

extra_files = [p.name for p in actual_files if normalize_filename(p.name) not in manifest_by_original]
missing_files = [
    img["original"]
    for img in AP_BIO_IMAGES
    if normalize_filename(img["original"]) not in actual_by_name
]

print(f"Found {len(actual_files)} files on disk, {len(AP_BIO_IMAGES)} in manifest")
if extra_files:
    print(f"Extra local files not in manifest: {len(extra_files)}")
    for name in extra_files[:10]:
        print(f"  EXTRA  {name}")
if missing_files:
    print(f"Manifest files missing on disk: {len(missing_files)}")
    for name in missing_files[:10]:
        print(f"  MISSING  {name}")

uploaded = 0
failed = 0

for img in AP_BIO_IMAGES:
    actual_path = actual_by_name.get(normalize_filename(img["original"]))
    if actual_path is None:
        print(f"  FAIL  {img['filename']}: source file not found for manifest entry {img['original']}")
        failed += 1
        continue

    dest = f"{STORAGE_PREFIX}/{img['filename']}"
    with open(actual_path, "rb") as f:
        data = f.read()

    try:
        supabase.storage.from_(BUCKET).upload(
            path=dest,
            file=data,
            file_options={"content-type": "image/png", "upsert": "true"},
        )
        print(f"  OK  {img['filename']}")
        uploaded += 1
    except Exception as e:
        print(f"  FAIL  {img['filename']}: {e}")
        failed += 1

print(f"\nDone: {uploaded} uploaded, {failed} failed")
print(f"\nBase URL: {SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{STORAGE_PREFIX}/")
