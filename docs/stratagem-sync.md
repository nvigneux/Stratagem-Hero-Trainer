# Automated stratagem synchronization

Keep creating, organizing and pushing SVGs to the source repository as usual. A source
master SVG push requests a Trainer sync; the Trainer also supports manual runs and a daily
05:17 UTC fallback. Schedules may be delayed by GitHub. All changes arrive in a review PR;
nothing is automatically merged.

See [the audit and technical plan](stratagem-sync-audit.md) for the existing architecture.

## Install

1. Publish the implementation branches for both repositories and merge them manually.
   `repository_dispatch` and scheduled workflows must exist on the default branch
   (`master`). For an initial branch test use workflow_dispatch with the implementation
   branch selected, after the workflow has been registered on the default branch.
2. Create a GitHub App for synchronization. Give it repository **Contents: read/write**
   and **Pull requests: read/write** only; install it only on Stratagem-Hero-Trainer.
   In the Trainer's Actions variables set `SYNC_APP_ID` to its App ID. In Actions secrets
   set `SYNC_APP_PRIVATE_KEY` to its generated PEM private key. The workflow mints a
   short-lived installation token. The PR author is the bot so you can approve the PR
   yourself; do not replace this with your own PAT, since authors cannot approve their PRs.
3. Create a fine-grained PAT restricted to the Trainer with **Contents: read/write**
   (GitHub's permission requirement for repository_dispatch) and an expiration. Store it
   as `TRAINER_DISPATCH_TOKEN` in the **source** repository's Actions secrets. It needs
   no workflow, administration, issues or account-wide permissions. A GitHub App token
   produced in the source workflow can replace this PAT if desired.
4. In Trainer branch protection/rulesets for master, require PRs and the checks
   **Stratagem owner approval** and **Stratagem tests and build**. Disable bypasses for
   routine merges and dismiss stale reviews. No repository setting is changed by these files.
   Approval defaults to `nvigneux`; optionally set Actions variable `STRATAGEM_APPROVER`
   to the specific maintainer login who may verify codes.
5. Run **Synchronize stratagem icons** manually. Inspect the bot PR and the downloadable
   `stratagem-review-report` artifact. Check the first real Actions run before relying on
   the dispatch chain. Rotate credentials before expiration; never commit them.

The workflows' built-in token has only read permissions. The bot's write token is limited
to the synchronization job. PR validation has no write token or repository secrets and
uses `pull_request`, never privileged `pull_request_target` execution.

GitHub references: [dispatch event](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#repository_dispatch),
[dispatch token permissions](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event),
[workflow triggering and bot tokens](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

## Review a proposal

The PR description contains the initial icon/name/group, readable arrow sequence and source
URLs. A marked bot comment contains the latest report after additional upstream changes;
manual PR text and comments remain untouched. Full evidence is committed in
`app/lib/sync/catalog.json`: each source has a URL, result status and any discovered code.

For each new entry:

1. Compare the proposed sequence against the game or the linked sources. Conflicts leave
   `code: []`; unavailable sources are explicitly recorded. Source agreement is evidence,
   never automatic verification.
2. Edit `code` in the PR using lowercase direction words, correct any metadata, and set
   `verification` to `verified`. Add a source URL/evidence entry for your manual correction.
   To release it to gameplay, also set `enabled: true` and `experimental: false` only when
   appropriate. Unknown/experimental entries remain disabled by default.
3. Commit the correction, regenerate the worker using the command below, and push. The
   owner-approval check fails until the designated maintainer **approves the exact current
   head commit** using GitHub's Approve review. A later correction or new sync commit
   requires approval again. A comment or the bot's source agreement cannot verify a code.
4. Wait for validation/build/Cypress and merge manually. You may merge an unverified,
   disabled proposal to retain its icon without making it playable.

The runtime loader excludes every synchronized row unless its code is valid, verification
is `verified`, enabled is exactly true, and experimental is exactly false. Existing legacy
rows retain their established behavior; the automation never rewrites their codes.

## Local development and validation

Requires Python 3.10+ and Node 22 (no Python dependencies):

```sh
npm ci --legacy-peer-deps
python3 scripts/stratagem_sync/sync.py --source ../helldivers-2-stratagems-icons-svg
python3 scripts/stratagem_sync/cache.py
python3 scripts/stratagem_sync/sync.py --check
python3 -m unittest discover -s tests/sync -v
node --test tests/sync/*.test.cjs
npm run lint
npm run build
# In a second terminal, after npm run start:
npx cypress run --browser chrome
node scripts/stratagem_sync/offline-browser.cjs
```

`--offline` skips external lookups and retains pending proposals; use it for deterministic
local replay. The report defaults to `/tmp/stratagem-sync-report.md`. Check mode validates
all SVGs and proposals, and rejects an outdated worker without leaving file changes.
Regenerate the worker after changing app code, catalogue data, dependencies or assets.
CI runs validation/build and browser tests before PR merge. The standalone Chrome offline test
waits for worker installation, disconnects its network, reloads and checks hydration and
SVG availability. Set `CHROME_BIN` if Chrome is not on the default path. Cypress tests
isolate worker registration so their injected proxy HTML is never cached; the independent
Chrome test runs without that proxy.
Worker unit tests also verify real asset paths, cached icons, navigation fallback and
origin cache isolation. Offline functionality requires one successful online installation.

## Maintenance and recovery

- `catalog.json` is review-owned: name, group, code, category, enablement, experimental and
  verification edits survive later syncs. `proposed_code` tracks the previous automatic
  suggestion; edit `code`, not that ownership field. Pending evidence is refreshed on
  online runs. A code changed by a reviewer is preserved, even while unverified.
- `state.json` tracks immutable UUID identities, source paths, source SHA-256 hashes,
  target paths, missing flags and the upstream Git revision. Do not regenerate IDs.
  Ordinary Git renames preserve UUIDs and Trainer display paths. Unique hash/name
  matches provide fallback; ambiguous identities stop synchronization for review.
- Removed upstream files are marked missing and reported on every run. Icons and game
  records remain. Removal from gameplay is a separate reviewed change.
- A rename and total icon rewrite that Git cannot recognize requires moving the old
  state entry to the new source path before retrying. Keep its UUID and target. For
  unrelated duplicate names, correct the naming or establish an explicit reviewed mapping.
- The six department names are in `DEPARTMENTS` in `sync.py`. All other ordinary groups
  are Warbonds; review this classification for new folders. Category UUIDs are reused or
  deterministically generated. Display folders follow Trainer conventions.
- Name normalization removes punctuation/quotes and model prefixes containing digits,
  with a small explicit alias map. It does not accept arbitrary fuzzy matches. Update
  `sources.py` with a fixture test if a source changes its markup/schema. Current sources:
  [wiki](https://helldivers.wiki.gg/wiki/Stratagems) and
  [generator](https://github.com/k33bs/Helldivers-2-Stratagem-JSON-Generator).
- HTTP failures do not manufacture codes. Pending records report missing/unavailable
  evidence and stay disabled. Retry manually or use the daily fallback.
- One concurrency group serializes syncs. Runs resume `codex/stratagem-sync` and merge
  master without rebasing/force-pushing. A simultaneous reviewer push fails safely;
  rerun to incorporate it. Resolve merge conflicts manually on that branch, then rerun.
  Keep that branch while its PR is open; after merge it may be deleted normally.
- The worker version hashes app/public content plus dependency/config inputs. Installation
  uses fresh HTTP responses and precaches page JS/CSS; a failed precache rejects the new
  installation, retaining the old worker. Only Trainer-owned old caches are deleted.
- If checks fail because the cache is stale after a manual correction, regenerate it and
  push before approving. Never approve before the final commit.

No secrets, subscriptions, paid dependencies or per-sync LLM calls are needed.
