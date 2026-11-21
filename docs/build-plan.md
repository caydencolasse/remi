# Remii build plan

As of 20 November 2026.

Remii is one React Native app for iOS and Android plus a native Apple Watch
app. It answers from on-device models and saved guides first and calls OpenAI
only when a connection helps.

## Five corrections to the original brief

1. **The Apple Watch app cannot be React Native.** React Native does not run on
   watchOS. The watch app is a separate SwiftUI app in the same Xcode project
   that talks to the phone over WatchConnectivity.
2. **"Training" the offline AI on PDFs is really retrieval.** Each PDF or .md
   file is split into passages and indexed on the phone. When someone asks a
   question, Remii finds the matching passages and hands them to the model to
   answer from. Adding a guide takes seconds and the answer can cite its source.
3. **Android's on-device path has moved.** Google has put the MediaPipe LLM
   Inference API in maintenance-only mode and points new projects to LiteRT-LM.
   Build on LiteRT-LM running a Gemma model, with ML Kit GenAI (Gemini Nano
   through AICore) as a bonus on phones that have it.
4. **Apple's built-in model only exists on some iPhones.** The Foundation
   Models framework needs iOS 26 and an Apple Intelligence device, roughly
   iPhone 15 Pro and later. Apple ships no official React Native binding, so
   the app uses a community one. Every other iPhone needs a small model that
   Remii downloads itself.
5. **The OpenAI key cannot live in the app.** The phone calls a small Remii
   server, and that server calls OpenAI. The same server holds the resqme
   product catalogue and links.

On scope: an on-device model is small and will sometimes be wrong. For
life-safety topics Remii shows reviewed, fixed steps from the guide library
word for word and lets the model only choose which guide applies.

## The stack

| Layer | Choice | Why |
| --- | --- | --- |
| App shell | React Native with Expo, TypeScript, Expo Router | One codebase for iOS and Android |
| On-device model, newer iPhones | Apple Foundation Models through `@react-native-ai/apple` | No download, runs on the system model, supports tool calling |
| On-device model, every other phone | A 1 to 2 GB open model (Gemma or similar) through `react-native-executorch` or `llama.rn` | Works on iOS 17+ and Android 13+ once downloaded over Wi-Fi |
| On-device model, Android native | LiteRT-LM with Gemma; ML Kit GenAI where AICore is present | Google's current path, GPU accelerated |
| Offline knowledge | SQLite on the phone holding guide passages, a keyword index and an embedding index | Answers from PDFs and .md files with no signal |
| Online brain | OpenAI Responses API with the `web_search` tool, called from the Remii server | Product lookups, live alerts, anything the small model cannot answer |
| Server | A small API: OpenAI proxy, product catalogue, guide updates, accounts | Keeps the key off the phone; guides update without an app release |
| Check-ins | Local notifications scheduled on the phone | They fire with no signal |
| Voice | The phone's built-in speech recognition and speech synthesis | Works offline on both platforms |
| Apple Watch | SwiftUI app, WatchConnectivity, a few guides stored on the watch | Native only |
| Actions across apps | Deep links first (dialer, Messages, Maps, Settings), then App Intents on iOS | The doors the systems allow |

The exact fallback model and runtime are not chosen yet. That is the first
Phase 1 task and is decided by a test on two real phones.

## How Remii answers a question

1. **Check for danger words.** A short on-device rule set looks for signs of
   immediate danger. If it fires, the SOS screen comes first.
2. **Search the guide library.** The question is matched against the passages
   stored on the phone.
3. **A strong match on a safety topic shows the reviewed steps as written.**
   The model adds only a one-line lead-in.
4. **Otherwise the on-device model answers from the matched passages.**
5. **If there is a connection and the question needs it, the server asks
   OpenAI.** Product recommendations, local alerts, anything the guides do not
   cover. The answer is labelled Online.
6. **Offer a follow-up.** Remii proposes a check-in time; a local notification
   is scheduled.

With no connection, step 5 is skipped and Remii says so plainly.

## Build phases

Durations are estimates for one or two engineers working with AI coding tools.

| Phase | What gets built | Done when | Estimate |
| --- | --- | --- | --- |
| 0. Foundations | Expo project, design tokens, the five tabs and Remii profile as static screens | The app installs on one iPhone and one Android phone and every mocked screen is reachable | 1 to 2 weeks |
| 1. Offline brain | Guide import, passage index, on-device model on both platforms, model download screen, chat | In Airplane Mode, Remii answers 20 test questions from the guides and cites the guide used | 3 to 4 weeks |
| 2. Safety layer | Danger-word check, SOS screen, emergency contacts, reviewed fixed-step guides, disclaimers | A reviewer with first-aid training signs off every fixed guide; SOS reaches the dialer in two taps | 2 weeks |
| 3. Check-ins and plans | Scheduled check-ins, Plans tab with checklists, Activity log | A check-in fires on time in Airplane Mode and reopens the right conversation | 2 weeks |
| 4. Online brain | Remii server, OpenAI proxy with web search, resqme product cards, Briefing and Ideas tabs, approvals | Asking about a car kit returns real resqme products with working links | 3 weeks |
| 5. Apple Watch | SwiftUI app: home, voice, answers, step guides, call, check-ins, alerts, guides on watch | A step guide runs on the watch with the phone switched off | 3 weeks |
| 6. Beta | TestFlight and Play internal testing, store listings, privacy policy | 50 testers, crash-free sessions above 99%, store review passed | 3 to 4 weeks |

Voice mode, the browser view and the Remii email address are the first things
to cut if time is short.

## Open decisions

See "Waiting on the owner" in `TODO.md`.

## Sources

- MediaPipe LLM Inference guide (maintenance notice): https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference
- LiteRT-LM: https://developers.googleblog.com/en/blazing-fast-on-device-genai-with-litert-lm/
- React Native AI (Apple, Llama, MLC providers): https://github.com/callstackincubator/ai
- Apple Developer Forums, React Native and Foundation Models: https://developer.apple.com/forums/thread/833676
- React Native ExecuTorch: https://github.com/software-mansion/react-native-executorch
- OpenAI web search tool: https://developers.openai.com/api/docs/guides/tools-web-search
