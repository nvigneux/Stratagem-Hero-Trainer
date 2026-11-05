# Synchronization audit and implementation plan

Audit performed before implementation on 5 November 2026 against both local master checkouts.

## Source repository

The source has 111 SVGs directly below category folders. Filenames generally omit model
prefixes; exceptions include StA-X3, CQC-20, EAT-411, GL-28 and newer weapons. The source
uses unquoted Guard Dog names; Trainer assets use typographic quotation marks. Gas Mine
is an explicit alias of the existing Trainer Gas Mines. SVGs contain paths, basic shapes,
clipping definitions and some inline drawing styles. No source workflows or tests existed.

Six ship departments are Bridge, Engineering Bay, Hangar, Orbital Cannons, Patriotic
Administration Center and Robotics Workshop. General Stratagems is a separate group.
Other source folders are Warbonds: Borderline Justice, Castellan’s Creed, Chemical Agents,
Control Group, Dust Devils, Entrenched Division, Exo Experts, Force of Law, Masters of
Ceremony, Python Commandos, Redacted Regiment, Scope of Authority, Servants of Freedom,
Siege Breakers and Urban Legends. A folder containing “experimental” is quarantined.

## Trainer architecture

Next.js App Router with React. `app/lib/placeholder-data-helldivers.js` exports 99 static
stratagems and 19 categories. Rows contain `name`, `code`, `category_id`; category IDs
are UUID strings. Directions are lowercase words: up, down, left, right. The active
read path is `fetchStratagems()` in `app/lib/data.js`; SQL helpers and the seed script
are ancillary. The UI constructs `/icons/stratagems/<category>/<name>.svg` paths.
The design must preserve these conventions and existing rows.

The original worker had a manually maintained v1 cache, stale quote variants, a missing
`/index.html`, incomplete stratagem coverage and no registration from the app. Installation
errors were swallowed, and activation deleted unrelated origin caches. Global headers
cache assets immutably for a year, so worker installation must bypass the HTTP cache.

Existing CI runs Cypress desktop/mobile gameplay tests and ESLint only after master
pushes, then deploys to Vercel. There were no synchronization/model/unit tests or PR build
checks. Dependencies were already installed locally; Cypress's browser binary was absent.

## Technical plan

1. Notify the Trainer on master SVG pushes, with manual and daily fallback runs.
2. Fetch a trusted full master snapshot, independent of dispatch payloads.
3. Use stdlib Python for identity tracking, SVG validation, code-source adapters and
   review reports; reuse Node to read the existing CommonJS catalogue.
4. Keep legacy data unchanged. Store new proposals and provenance in JSON, separate from
   source identity/hash state. Extend the existing data loader with a fail-closed gate.
5. Match exact normalized names and recognized model prefixes. Compare existing Trainer,
   wiki infobox and generator evidence. Never invent or resolve conflicting codes.
6. Maintain one bot-authored PR branch, merge current master, preserve manual commits and
   code corrections, refuse merge conflicts and non-fast-forward pushes, retain removals.
7. Require current-head owner approval for newly verified or corrected verified codes.
   Configure mandatory branch checks; never merge automatically.
8. Generate a content-based worker version and complete public-asset manifest; install
   referenced Next.js chunks for offline hydration. Add regression, model, source, worker,
   offline browser and PR build checks.

## Known boundaries

Git rename detection plus unique content/name matching covers normal renames. A complete
rewrite with an unrelated name and no Git rename match needs an explicit identity mapping
in state; ambiguous names fail closed. A new top-level group is treated as a Warbond unless
it is one of the six known departments, General Stratagems or experimental; maintain the
allowlist if a future game update adds a ship department. External outages remain visible
in evidence. No paid API, database migration or LLM service is required.
