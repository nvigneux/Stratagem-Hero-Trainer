# New stratagem icon PRs

The automation only copies new SVGs and opens a PR. It never edits the game catalogue,
looks up codes, or merges anything. There is no extra catalogue, approval system, GitHub
App, LLM API key, or synchronization database.

## Setup

1. Merge the Trainer workflow first, then the source notification workflow.
2. In the Trainer's Settings → Actions → General, enable **Allow GitHub Actions to create
   and approve pull requests**. The workflow uses the built-in `GITHUB_TOKEN` with Contents
   and Pull requests write permissions; it never submits an approval.
3. In the icon repository, add Actions secret `TRAINER_DISPATCH_TOKEN`: a fine-grained PAT
   restricted to Stratagem-Hero-Trainer with **Contents: read/write** (required by GitHub's
   repository_dispatch endpoint). Set an expiration and rotate it before expiry.
4. Run **Propose new stratagem icons** manually once after installation.

SVG changes on source master trigger the workflow. A daily 05:17 UTC run and the manual
trigger provide fallback. Dispatch payloads are ignored; icons always come from source master.
If GitHub asks for permission to run checks on a bot-created PR, approve the workflow runs.
You may make **Tests and build** a required master branch check.

## Your workflow

Keep creating and pushing icons as usual. The bot PR contains new SVGs in their original
department/Warbond folders, icon previews, and a ready-to-use Codex prompt.

Ask Codex to complete that PR. It researches codes, adds the few necessary lines directly
to `app/lib/placeholder-data-helldivers.js`, reuses or adds categories, and updates the
existing service-worker asset list/version. Codes and source URLs are reviewed in the PR;
uncertain entries stay out of the game catalogue. You review and merge manually.

While an icon PR is open, synchronization waits instead of changing your work. New upstream
icons are picked up by the next daily/manual run after that PR is merged or closed.
Repeated runs do not create duplicate PRs or overwrite existing icons. Punctuation and
Guard Dog quote differences are ignored, and Gas Mine maps to existing Gas Mines.
Modified or deleted upstream icons are left alone. Experimental folders are skipped.

## Local check

Requires Python 3.10+; no Python dependencies:

```sh
python3 -m unittest discover -s tests -v
python3 scripts/sync-icons.py --source ../helldivers-2-stratagems-icons-svg \
  --branch local-preview --report /tmp/icon-pr.md
```

The script validates new SVGs before copying. Run it on a working branch; it adds files
under `public/icons/stratagems` and writes the proposed PR description to the report path.
Normal application checks remain `npm run lint` and `npm run build`, using Node.js 26.
