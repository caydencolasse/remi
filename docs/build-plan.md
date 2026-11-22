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

### After the beta: three additions

Added 20 November 2026. These come after Phase 6 in build order, but each has
paperwork with a long lead time, so the "start now" step should not wait.

| Phase | What gets built | Done when | Estimate | Start now |
| --- | --- | --- | --- | --- |
| 7. In-app checkout | Buy a recommended product without leaving Remii: a cart built from resqme's Shopify store, paid in Shopify's own checkout sheet with Apple Pay, Google Pay or Shop Pay | A tester buys a resqme tool from a product card in chat on iPhone and on Android, and the order appears in resqme's Shopify admin | 2 to 3 weeks | Ask whoever runs resqme.com's Shopify store for Storefront API access for Remii |
| 8. Live event tracking | Alerts for the places a person saves (home, cabin, a route): severe weather, earthquakes, wildfire. A live events list in Briefing, a push alert when something starts, and the matching saved guide one tap away | A test weather alert for a saved place reaches the phone as a notification within 2 minutes and opens the right guide. With no signal, Remii shows the last alerts it fetched and says how old they are | 3 to 4 weeks | Decide which hazards and which countries come first |
| 9. RapidSOS | When someone calls 911 from Remii, their location and the profile they chose to share (name, medical notes, emergency contacts) are sent to the 911 centre through RapidSOS | RapidSOS signs off the integration in its test environment, and a supervised test call shows Remii's data on a 911 centre screen | 6 to 10 weeks, mostly waiting on RapidSOS | Apply to RapidSOS as a Tech Partner. Nothing can be built until they approve and issue credentials |

Phase 7 only needs Phase 4 (the server and product cards), so it can run
alongside Phase 5 or 6 if the store access arrives early.

**How each one works, and what it must not break**

- **Checkout (Phase 7).** resqme.com runs on Shopify. The Remii server asks
  Shopify's Storefront API to create a cart and gets back a checkout link. The
  app opens that link in Shopify's Checkout Kit, a sheet that slides up over
  Remii. Shopify takes the payment, applies tax and creates the order, so
  Remii never sees or stores card numbers. Physical goods are allowed to use
  this kind of checkout on both app stores; Apple's and Google's own in-app
  purchase systems are for digital goods. Checkout Kit is native code, so it
  needs a development build rather than Expo Go, and it requires React Native
  0.77 or later with the New Architecture, which this project already has.
  Product cards keep saying which items are resqme's own, and the "open in
  browser" link stays as the fallback when checkout cannot load.
- **Live events (Phase 8).** "Live event tracking" is read here as tracking
  live emergencies near the user, not app analytics. First sources are free US
  government feeds: National Weather Service alerts and USGS earthquakes, with
  wildfire and FEMA feeds next. The server watches the feeds and sends a push
  notification. To do that it has to know roughly where a person's saved
  places are, which means location leaves the phone. Under rule 6 that is an
  opt-in feature with a screen that says exactly what is sent, and coarse
  areas (county or forecast zone) are sent rather than street addresses. An
  alert is shown in the issuing agency's own words; Remii does not rewrite it.
- **RapidSOS (Phase 9).** RapidSOS is the service most US 911 centres use to
  see extra data about a caller. It is not an open API: access is by
  partnership. Its developer site describes two kinds of partner, and Remii
  would be a Tech Partner, the kind that sends emergency information in. Its
  products include an Alerts service that routes safety information to
  emergency services, and its paid emergency API can add voice, text and a
  staffed monitoring centre. Pricing, certification steps and whether a
  monitoring centre is required are not published; that is the first thing to
  ask them. Credentials live on the Remii server, never in the app. Rule 5
  does not change: Call 911 still opens the phone dialer immediately, and the
  RapidSOS data is sent alongside the call. If RapidSOS is slow or down, the
  call is not delayed by a single second. Medical details are shared only if
  the person turned that on and saw what would be sent.

Until Phase 9 ships, nothing in the app, the store listing or remii.ai may say
or imply that Remii sends data to 911.

### "I can't talk": the silent alert (part of Phase 9)

Designed 21 November 2026. Screens: `SilentAlert`, `SilentChat`, `WatchSilent`
and `WatchSilentSent` in `docs/screens/`, plus a new row on Emergency SOS and
on the watch's Call list.

**What the person does**

1. Opens SOS and taps "I can't talk", the second row, directly under Call 911.
2. Sees exactly what will be sent: live location, name and phone, medical
   notes, and which contacts get a text. Can tap a reason ("I'm hurt",
   "Someone is hurting me", "Break-in", "Fire"). The reason is optional.
3. Holds the button for 2 seconds. The hold is there to stop pocket presses.
4. Lands on a status screen with four steps, each ticked only when it has
   really happened: alert sent, contacts texted, a safety agent is checking,
   passed to 911.
5. Can answer the agent by tapping a quick reply or typing. Remii makes no
   sound and no vibration while this screen is open.

**How it works behind the screen**

- The app sends the alert to the Remii server. The server raises a RapidSOS
  digital alert and, separately, texts the emergency contacts through a
  text-message provider. RapidSOS credentials and the text provider's key
  live on the server only.
- RapidSOS describes this kind of alert as checked by a live safety agent, who
  then passes the data to the 911 center and can chat with it. The chat on the
  status screen is with that agent. Whether a consumer app can skip the agent
  step is an open question for RapidSOS.
- Contact texts do not depend on RapidSOS. They can ship earlier, in Phase 2
  or 3, as the existing "Alert my contacts" row.

**Rules this feature must keep**

- Call 911 stays first on the SOS screen and is on every silent-alert screen.
  The silent alert never replaces or delays a call (rule 5).
- It needs a data connection. With no signal the screen says "this can't send,
  so call 911" and does not show a send button that will fail.
- No step is shown as done until the server confirms it. In particular the
  app never says 911 has the alert until RapidSOS reports it delivered.
- Location, medical notes and contact details leave the phone only when the
  person sends the alert, and the screen lists them first (rule 6). What is
  shared is set up in advance under About you and can be edited from the
  confirm screen.
- Wording on these screens is fixed text, not generated (rule 3).

**Questions to settle before building**

- Does RapidSOS allow a consumer app to send alerts, and is its agent step
  required? What does it cost per alert or per user?
- Which text-message provider sends the contact texts, and who registers the
  sender with US carriers?
- How are accidental and false alerts cancelled, and what does the person see
  if the agent cannot reach them?
- Should the watch be able to send on its own over cellular, or only through
  the phone?

## Open decisions

See "Waiting on the owner" in `TODO.md`.

## Sources

- MediaPipe LLM Inference guide (maintenance notice): https://developers.google.com/edge/mediapipe/solutions/genai/llm_inference
- LiteRT-LM: https://developers.googleblog.com/en/blazing-fast-on-device-genai-with-litert-lm/
- React Native AI (Apple, Llama, MLC providers): https://github.com/callstackincubator/ai
- Apple Developer Forums, React Native and Foundation Models: https://developer.apple.com/forums/thread/833676
- React Native ExecuTorch: https://github.com/software-mansion/react-native-executorch
- OpenAI web search tool: https://developers.openai.com/api/docs/guides/tools-web-search
- RapidSOS developer portal: https://developer.rapidsos.com/
- RapidSOS integration guidance (partner types): https://developer.rapidsos.com/getting_started/default/guidance
- Shopify Checkout Kit: https://shopify.dev/docs/storefronts/mobile-next/checkout-kit
- National Weather Service alerts API: https://www.weather.gov/documentation/services-web-api
- USGS earthquake feeds: https://earthquake.usgs.gov/earthquakes/feed/
