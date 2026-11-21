# Remii

Remii is an emergency agent and safety assistant from resqme. It is a phone app
(iOS and Android) plus an Apple Watch app. It answers from on-device models and
saved guides first, and goes online only when a connection helps.

The people who use it are preppers, parents, first responders, hikers, campers,
off-roaders and scouts. Many of them distrust AI and big tech. They will use
Remii when they are stressed, in the dark, or without signal.

The owner of this repo is a non-technical founder. Explain what you did in plain
language, say what to check on a phone, and do not assume they can read a stack
trace.

@AGENTS.md

## Where things are

| Path | What it is |
| --- | --- |
| `docs/build-plan.md` | Stack decisions, how a question gets answered, build phases |
| `docs/sitemap.md` | Every screen, its route, and whether it is designed |
| `docs/screens/*.png` | The design reference for each mocked screen. Look at the image before building a screen |
| `TODO.md` | The task list. Work from the top unchecked item unless told otherwise |
| `src/app/` | Routes (Expo Router). One file per screen |
| `src/constants/theme.ts` | Colours, spacing, type sizes. Use these, never raw hex values in screens |
| `src/constants/routes.ts` | List of all routes. A test checks it matches `src/app` |
| `assets/remii/` | Remii character renders and logos |
| `content/guides/` | Guides Remii answers from offline |
| `watch/` | Notes for the native Apple Watch app (Phase 5) |

## Commands

```bash
npm install            # after cloning
npx expo start         # run the app; scan the QR code with a phone
npm run typecheck      # must pass before a task is done
npm run lint           # must pass before a task is done
npm test               # must pass before a task is done
```

Adding a package: `npx expo install <package>`, never `npm install <package>`.

## Rules that must not be broken

1. **No secrets in the app.** No OpenAI key, no other API key, in any file under
   `src/`, in `app.json`, or in any `EXPO_PUBLIC_` variable. The app calls the
   Remii server; the server calls OpenAI.
2. **Offline first.** Chat, Plans, Library, check-ins and SOS must work in
   Airplane Mode. If a feature needs a connection, it says so on screen and the
   rest of the app keeps working.
3. **Life-safety answers are not generated.** For first aid, CPR, bleeding,
   vehicle escape, carbon monoxide and similar topics, show the reviewed steps
   from `content/guides/` word for word. The model may choose which guide
   applies and add a one-line lead-in. It may not write or reword the steps.
4. **A guide marked `status: draft` never reaches users.** Only guides marked
   `status: reviewed` with a named reviewer ship in a release build.
5. **Never block the way to help.** The SOS button is always one tap from Chat
   and Voice. Calling 911 opens the phone dialer. Nothing in the app sits
   between the user and that call: no sign-in, no loading state, no paywall.
6. **Personal data stays on the phone** unless the user has turned on a feature
   that needs to send it, and that screen says what is sent.
7. **Do not edit `ios/` or `android/` by hand.** They are generated.

## How Remii talks

- Calm, short, concrete. One instruction per step. Most important step first.
- No exclamation marks, no jokes, no hedging paragraphs in an emergency answer.
- Say what it does not know. Offline, say "I can't check that without a
  connection" and give what the saved guides do cover.
- Product recommendations name the reason for each item and link out. Label
  resqme's own products as resqme's.

## Remii's face

Seven expressions live in `assets/remii/`. The brand rules:

- One expression per screen, chosen to fit the message.
- `sober` for any prevention, emergency or sensitive topic.
- `wink` only occasionally and never on a safety message.
- `attention` for alerts, `explaining` for guides and product advice, `welcome`
  for greetings and sharing, `happy` for a finished plan, `calm` as the default.
- Remii stays calm and credible. No exaggerated reactions.

## Code conventions

- TypeScript, strict. No `any` without a comment saying why.
- Screens are thin. Put logic in `src/lib/` or hooks, and write a test for it.
- File names are kebab-case. Components are named exports.
- Touch targets are at least 44 points. Every icon-only button has an
  `accessibilityLabel`. Text meets 4.5:1 contrast.
- When you build a screen, replace its `PlaceholderScreen` and keep the route
  path unchanged. If you add or remove a route, update `src/constants/routes.ts`
  and `docs/sitemap.md` in the same change.
- Match the design reference. If the reference and the sitemap disagree, stop
  and ask.

## Working with the owner

- One TODO item per session unless asked for more. Tick it in `TODO.md` when
  typecheck, lint and tests pass.
- End each task with: what changed, how to see it on a phone, and anything that
  needs a decision.
- Ask before adding a paid service, changing a stack decision in
  `docs/build-plan.md`, or adding a dependency with native code.
- Commit only when asked.
