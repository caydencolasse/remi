# TODO

Work from the top. One item per session. Tick an item only when
`npm run typecheck`, `npm run lint` and `npm test` all pass.

Phases are described in `docs/build-plan.md`.

## Demo sprint (do this first)

Goal: a scripted, tappable demo in the iOS Simulator. Prompts are in
`docs/demo-prompts.md`; paste them into Claude Code one at a time.

- [ ] Prompt 0: tools and first run
- [ ] Prompt 1: fonts, icons and shared components
- [ ] Prompt 2: Chat and the outage flow
- [ ] Prompt 3: car kit flow and Plans
- [ ] Prompt 4: Briefing, Ideas, Library
- [ ] Prompt 5: Remii profile and Share
- [ ] Prompt 6: side menu and Settings
- [ ] Prompt 7: Emergency SOS and Voice
- [ ] Prompt 8: polish and rehearsal

The demo sprint builds most of the Phase 0 screens. Tick the matching Phase 0
items below as each prompt lands.

## Phase 0: foundations

Done when the app installs on one iPhone and one Android phone and every mocked
screen is reachable and matches its design reference.

- [x] Expo project, theme tokens, one placeholder route per screen, tests for the route list
- [ ] Run the app on a real iPhone and a real Android phone with Expo Go and confirm all five tabs open
- [ ] Load the Inter font (400, 600, 700, 800) with `expo-font` and add shared `Text` components that use the sizes in `theme.ts`
- [ ] Add an icon set and build `Icon`, `CircleButton`, `Pill` and `Chip` components to match `docs/screens/Main.png`
- [ ] Build the shared screen header: menu button, Remii avatar and name, status pill, right-hand actions. Tapping Remii opens `/remii`
- [ ] Replace the stock tab bar with the floating pill tab bar from the designs
- [ ] Build Chat (`/`) as a static screen from `docs/screens/Main.png`: bubbles, step list, check-in card, composer. Hard-coded content
- [ ] Build the product-card chat variant from `docs/screens/ChatProducts.png` as a second hard-coded conversation
- [ ] Build Briefing (`/briefing`) from `docs/screens/Briefing.png`
- [ ] Build Ideas (`/ideas`) from `docs/screens/Ideas.png`
- [ ] Build Plans (`/plans`) and its create-plan bottom sheet from `Plans.png` and `PlanSheet.png`
- [ ] Build Library (`/library`, `/library/media`) from `Library.png` and `LibraryMedia.png`
- [ ] Build the Remii profile shell and its five sub-tabs from the `Profile*.png` references, plus the edit menu (`EditMenu.png`)
- [ ] Build Share Remii (`/remii/share`) from `Share.png`
- [ ] Build Emergency SOS (`/sos`) from `Emergency.png`. Call 911 opens the dialer with `tel:911`
- [ ] Build Voice (`/voice`) from `Voice.png` as a static screen
- [ ] Replace the Expo placeholder app icon and splash with Remii's. Needs a 1024 x 1024 icon from the owner; `assets/remii/app-icon-256.png` is too small
- [ ] Set `ios.bundleIdentifier` and `android.package` in `app.json`. Needs the owner's choice of identifier
- [ ] Set up EAS and make the first development build for both platforms

## Phase 1: offline brain

- [ ] Decide the fallback on-device model and runtime with a size and speed test on two real phones. Write the result into `docs/build-plan.md`
- [ ] Guide format: parse front matter and steps from `content/guides/*.md`, with tests
- [ ] Local database for guides, passages, conversations and plans
- [ ] Passage index: keyword search first, then embeddings
- [ ] On-device model wrapper with one interface over Apple Foundation Models and the fallback model
- [ ] Model download screen (`/welcome/model`) and offline settings (`/settings/offline`)
- [ ] Wire Chat to the real answer route in `docs/build-plan.md`, steps 2 to 4
- [ ] Import a PDF or note into the Library
- [ ] Offline test set: 20 questions with expected guide, run in Airplane Mode

## Phase 2: safety layer

- [ ] Danger-word check that routes to `/sos`
- [ ] Emergency contacts, stored on the phone
- [ ] Fixed-step guide reader (`/sos/guide/[id]`), one step per screen, read aloud
- [ ] Alert contacts by text message with location
- [ ] Release-build check that refuses any guide not marked `status: reviewed`
- [ ] Disclaimers and guide source list (`/settings/about`)

## Later phases

Phase 3 (check-ins and plans), Phase 4 (online brain), Phase 5 (Apple Watch),
Phase 6 (beta), Phase 7 (in-app checkout), Phase 8 (live event tracking) and
Phase 9 (RapidSOS) are outlined in `docs/build-plan.md`. Break each into tasks
here when the phase before it is done.

## Landing page (remii.ai)

The page is in `landing/`. Hosting steps are in `landing/README.md`.

- [x] Build the page from the design canvas, with the waitlist function and its tests
- [ ] Owner: create the Brevo list and API key, create the Vercel project with Root Directory `landing`, add the two settings, deploy
- [ ] Owner: point remii.ai and www.remii.ai at the Vercel project
- [ ] Sign up once by email and once by phone on the live site and confirm both reach the Brevo list
- [ ] Add a privacy policy page and link it in the footer
- [ ] Have the phone-number consent wording checked before any text message is sent

## Waiting on the owner

- [ ] Who reviews the safety guides (name and credential)
- [ ] Which guides ship first, and the licence for any that are not US government material
- [ ] Accounts or no accounts
- [ ] How Remii makes money, which decides how product links are disclosed
- [ ] Remi or Remii as the single spelling
- [ ] Whether a Wear OS watch app is wanted
- [ ] Ask RapidSOS whether a consumer app can send a silent, no-voice alert and whether their safety-agent step is required (the "I can't talk" flow in `docs/build-plan.md`)
- [ ] Apply to RapidSOS as a Tech Partner (developer.rapidsos.com). Ask about pricing, certification and whether a monitoring centre is required. Long lead time; Phase 9 cannot start without it
- [ ] Storefront API access to resqme's Shopify store for Remii (Phase 7), and confirmation the store's checkout is not on the old `checkout.liquid`
- [ ] Which hazards and countries come first for live event tracking (Phase 8), and confirm it means live emergencies near the user rather than app analytics
