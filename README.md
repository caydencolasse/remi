# Remii

Emergency agent and safety assistant from resqme. One React Native (Expo) app
for iOS and Android, plus a native Apple Watch app.

## Run it

You need Node 20 or newer.

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app on a phone. The first tab links to a list
of every screen. All screens are placeholders at this stage.

Once on-device models are added (Phase 1), Expo Go stops being enough and you
will need a development build on a real iPhone and a real Android phone.

## Build it with Claude Code

```bash
claude
```

Then say: `Do the next unchecked item in TODO.md.`

Claude Code reads `CLAUDE.md` on its own. That file holds the project rules.

## What is where

- `docs/build-plan.md`: the plan
- `docs/sitemap.md`: every screen
- `docs/screens/`: the design for each mocked screen
- `TODO.md`: the task list
- `CLAUDE.md`: instructions for Claude Code
