# InHero AP Biology Textbook Pipeline

This folder turns `chapters_data.json` into:

- one chapter assessment PDF per chapter
- one complete AP Biology textbook PDF
- a reusable question-generation pipeline powered by Claude

## Outputs

By default the scripts read from the sibling `../Textbook` folder and write back there:

- `../Textbook/chapters_data.json`
- `../Textbook/AP_Biology_PDFs_65/U01_01_with_practice_*.pdf`
- `../Textbook/InHero_AP_Biology_Complete.pdf`
- `../Textbook/U01_01_with_practice_PREVIEW.pdf`

## File roles

- `generate_questions.py`
  - calls Claude
  - generates `5 MCQ + 3 FRQ` per chapter
  - writes them into `chapter["assessment"]`

- `inhero_textbook.py`
  - reads the enriched JSON
  - renders each chapter PDF
  - renders one combined AP Biology PDF

## Expected chapter JSON shape

Each chapter should contain:

- `unit_name`
- `category`
- `chapter_title`
- `hook`
- `learning_objectives`
- `sections`
- `assessment`

The `assessment` field should look like:

```json
{
  "mcq": [
    {
      "question": "...",
      "choices": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "answer": "A",
      "explanation": "...",
      "trap": "..."
    }
  ],
  "frq": [
    {
      "prompt": "...",
      "rubric": ["...", "...", "..."],
      "model_answer": "...",
      "why_it_matters": "..."
    }
  ]
}
```

## Install

```bash
python3 -m pip install -r scripts/textbook/requirements.txt
```

## Step 1: Generate chapter questions

This adds `assessment` objects into the JSON.

```bash
export ANTHROPIC_API_KEY=sk-ant-...
python3 scripts/textbook/generate_questions.py --resume
```

Useful options:

```bash
python3 scripts/textbook/generate_questions.py --chapter 1
python3 scripts/textbook/generate_questions.py --chapter 12 --model claude-sonnet-4-6
python3 scripts/textbook/generate_questions.py --resume --delay 1.5
```

## Step 2: Render one preview chapter

```bash
python3 scripts/textbook/inhero_textbook.py --chapter 1
```

Default output:

```text
../Textbook/U01_01_with_practice_PREVIEW.pdf
```

## Step 3: Render all chapter PDFs

```bash
python3 scripts/textbook/inhero_textbook.py
```

Default output folder:

```text
../Textbook/AP_Biology_PDFs_65/
```

Each chapter file will look like:

```text
U01_01_with_practice_Chemistry_of_Life.pdf
U01_02_with_practice_Water_and_Life.pdf
...
```

## Step 4: Render the complete AP Biology textbook

```bash
python3 scripts/textbook/inhero_textbook.py --combined
```

Default output:

```text
../Textbook/InHero_AP_Biology_Complete.pdf
```

## Important note

If `assessment` is missing, `inhero_textbook.py` falls back to legacy `practice_questions` bullets so the PDF still builds, but that is only a placeholder mode.

For the real final textbook, run:

1. `generate_questions.py`
2. `inhero_textbook.py`

