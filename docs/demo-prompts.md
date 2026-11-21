# Demo prompts

Nine prompts that take the repo from placeholders to a scripted, tappable demo
running in the iOS Simulator. Paste them into Claude Code one at a time, in
order. Each one ends by telling you what to look at.

The demo is scripted. Remii's answers are written in advance and played back;
no AI model runs. Present it as a prototype of the experience.

## Before you start (you, once)

1. Install Xcode from the Mac App Store and open it once so it finishes
   setting up. This gives you the iOS Simulator.
2. Install Node 20 or newer from nodejs.org.
3. In Terminal:

   ```bash
   git clone https://github.com/caydencolasse/remi
   cd remi
   npm install
   claude
   ```

## How to run each prompt

- Paste the prompt. Let Claude Code finish. It will say what to check.
- Look at the result in the Simulator next to the reference image it names.
- If it looks wrong, say what is wrong in plain words ("the tab bar is too
  low", "the bubble should be blue") and let it fix that before moving on.
- When you are happy, say `commit this` and move to the next prompt.
- Start a fresh session (`/clear`) between prompts so each starts clean.

Rough time: prompts 0 to 2 take the longest. Allow about an hour each for 1
and 2, and 30 to 45 minutes for each of the rest.

---

## Prompt 0: tools and first run

```text
Read CLAUDE.md, AGENTS.md and docs/demo-prompts.md. We are doing the demo
sprint. This is prompt 0.

1. Run npx expo-doctor and fix anything it reports.
2. Install what the demo needs, using npx expo install only:
   expo-linear-gradient, react-native-svg, lucide-react-native,
   @expo-google-fonts/inter. I approve these dependencies. Check the Expo
   SDK 58 docs before using any of their APIs.
3. Confirm npm run typecheck, npm run lint and npm test all pass.
4. Start the app with npx expo start and tell me exactly which key to press to
   open it in the iOS Simulator, and what I should see.

Do not build any screens yet. If the Simulator will not open, stop and tell me
what to do in plain language.
```

**You should see:** an iPhone on screen showing the placeholder Chat tab with
five tabs along the bottom.

---

## Prompt 1: fonts, icons and shared components

```text
Demo sprint, prompt 1. Read CLAUDE.md first. Look at docs/screens/Main.png,
docs/screens/Plans.png and docs/screens/Profile.png before writing code.

Build the shared pieces every screen uses, in src/components/, using only
values from src/constants/theme.ts (add tokens there if one is missing):

- Load Inter (400, 600, 700, 800) and keep the splash screen up until it is
  ready. Add a Text component with variants matching Type in theme.ts.
- Icon: a thin wrapper over lucide-react-native with size and colour props.
- GradientView: wraps expo-linear-gradient with variant "brand" or "user"
  from Gradients in theme.ts, top-left to bottom-right.
- PrimaryButton (brand gradient, white label, pill, 54 high) and
  SecondaryButton (white or chip fill, ink label).
- CircleButton: 44 point white circle with an icon and an accessibilityLabel.
- Avatar: circular, white background, shows
  assets/remii/avatar-<expression>.jpg, sizes 30, 64, 72 and 104.
- StatusIcon: Wi-Fi icon in a small pill, grey for on-device, green for online.
- ScreenHeader: menu button on the left (opens /menu), Avatar with "Remii"
  and StatusIcon in the centre (tapping it opens /remii), and a slot for
  right-hand buttons.
- FloatingTabBar: the white floating pill with five icons from the designs.
  Wire it into src/app/(tabs)/_layout.tsx in place of the stock tab bar. The
  active tab has a chip-coloured pill behind its icon.
- SegmentedControl: the white pill with two or more options used on Library
  and the Remii profile.

Then make a temporary screen at /dev/components that shows every component so
I can check them, and add it to src/constants/routes.ts and docs/sitemap.md.

Write tests for any logic. Finish with typecheck, lint and tests passing, then
tell me how to open /dev/components in the Simulator and what to compare it
against.
```

**You should see:** the floating tab bar on every tab, and a components page
whose buttons, avatar and header match the designs.

---

## Prompt 2: Chat and the outage flow

```text
Demo sprint, prompt 2. Read CLAUDE.md. Study docs/screens/Main.png closely.

Build the Chat tab (src/app/(tabs)/index.tsx) and a scripted demo engine.

Demo engine, in src/demo/:
- A typed script format: a flow is a list of turns. A turn is either a user
  message, or a Remii reply made of blocks (text, numbered steps, check-in
  card, product cards, action chips), plus which Remii expression to show and
  whether the reply is "on-device" or "online".
- A useDemoChat hook that holds the conversation in memory, plays the next
  Remii turn after a typing indicator of about 1.2 seconds, and reveals
  numbered steps one at a time.
- No network, no model, no API keys. Put a comment at the top of the folder's
  index file saying this is scripted demo content and not the real answer path.

Chat screen:
- ScreenHeader with a phone button (opens /voice) and the SOS pill (brand
  gradient, opens /sos).
- User bubbles use the user gradient with white text, right aligned. Remii
  bubbles are white, left aligned. Step numbers are small brand-gradient
  circles. The check-in card matches the design.
- Composer with a plus button, a text field and a gradient mic button. It
  must stay above the keyboard and above the tab bar.
- When the conversation is empty, show Remii (avatar-welcome, large) with
  "What's going on?" and two suggestion chips: "The power just went out" and
  "What should I keep in my car?".
- Tapping a suggestion sends that flow's first user message. Later user turns
  in a flow appear as a single suggestion chip above the composer.
- If I type something that is not in a script, Remii replies: "This is a
  prototype, so I can only follow the examples for now. Try one of the
  suggestions."
- Long-pressing Remii's name in the header resets the demo.

Script the outage flow with this exact wording.
  User: Power just went out in the storm and my phone's at 34%. What do I do?
  Remii (sober, on-device): You have time. 34% lasts the night if we're
    careful. In this order:
    1. Use your phone light to find a flashlight, or candles and matches.
    2. Fill a jug of water while the taps still run.
    3. Look for a power bank, or plug into a charged laptop.
  User: Found a flashlight. No power bank.
  Remii (sober, on-device): Good. Now Low Power Mode and Airplane Mode on.
    It's late, so read a few pages and sleep. Tell me how it looks when you
    wake up.
    Then a check-in card: "Check-in set for 7:00 AM" / "Works without signal".

When the check-in card appears, add "Scheduled a check-in" to a shared
in-memory activity list that the Remii profile will read later.

Test the hook's turn logic. Finish with typecheck, lint and tests passing, and
tell me the taps to run the outage flow from start to finish.
```

**You should see:** tap "The power just went out", watch Remii type and list
the steps, tap the follow-up, and see the check-in card. It should look like
`docs/screens/Main.png`.

---

## Prompt 3: car kit flow and Plans

```text
Demo sprint, prompt 3. Read CLAUDE.md. Study docs/screens/ChatProducts.png,
Plans.png and PlanSheet.png.

1. Add the car kit flow to src/demo with this wording.
   User: What should I keep in my car for emergencies?
   Remii (explaining, online): Three jobs for a car kit: get out, get seen,
     get through the wait. Start with these. I picked ones that fit a glovebox.
     Then a horizontally scrolling row of product cards:
       GET OUT / resqme car escape tool / Cuts a jammed seatbelt, breaks a
         side window.
       GET SEEN / Roadside flare or beacon / Other drivers see you before
         they reach you.
       WAIT IT OUT / Compact first-aid kit / Covers cuts and burns until help
         arrives.
     Each card has a photo area, a [PRICE] placeholder and a gradient "View"
     button that opens https://resqme.com in the browser.
     Then the line "Links open resqme.com in your browser." and one chip:
     "Add all to my Vehicle plan".
   Keep product data in src/demo/products.ts so real photos and prices can be
   dropped in later. While this flow is showing, the header StatusIcon is
   green.

2. Build Plans (src/app/(tabs)/plans.tsx) from the designs: the Tracking
   list with checkboxes, then "Create a plan" with Home, Vehicle, Family and
   Outdoors rows. Tapping a row opens the bottom sheet from PlanSheet.png.
   "Let's do it" closes the sheet, switches to Chat and starts the car kit
   flow. "Not now" closes it.

3. Plans state lives in an in-memory store in src/demo. It starts with
   "Power outage kit" and "Car emergency kit" as in the design. Tapping "Add
   all to my Vehicle plan" in Chat updates "Car emergency kit" to "3 items
   added from your chat with Remii", shows a small confirmation in Chat, and
   adds "Updated your car kit" to the activity list.

Finish with typecheck, lint and tests passing. Tell me the taps to run the car
kit flow and see Plans change.
```

**You should see:** product cards in Chat, and the Car emergency kit line on
Plans changing after you tap "Add all to my Vehicle plan".

---

## Prompt 4: Briefing, Ideas and Library

```text
Demo sprint, prompt 4. Read CLAUDE.md. Study docs/screens/Briefing.png,
Ideas.png, Library.png and LibraryMedia.png.

Build these three tabs as scrolling screens with the content shown in the
designs, kept in src/demo as data:

- Briefing: the "What should I watch for you?" field and the three items.
  The heart toggles filled. "Discuss" switches to Chat and has Remii say one
  scripted line about that item (attention expression for the wind advisory).
- Ideas: the five ideas. Tapping "I can build your car kit from what you
  already own" switches to Chat and starts the car kit flow. Tapping "I can
  check on you during the next storm" starts the outage flow. The others show
  a short "Coming soon in this prototype" note.
- Library: SegmentedControl with Guides and Media. Guides lists the five
  files from the design plus the "Add a PDF or note" button (it only shows a
  "Not in this prototype" note). Tapping a guide opens /library/[id] showing
  that guide's text; for power-outage and vehicle-escape, read the real files
  in content/guides. Media shows the empty state.

Each screen uses ScreenHeader with the expression from its design. Lists must
scroll under the floating tab bar with enough bottom padding to reach the last
item.

Finish with typecheck, lint and tests passing, and tell me what to tap.
```

**You should see:** all five tabs filled in and matching their designs.

---

## Prompt 5: Remii profile and Share

```text
Demo sprint, prompt 5. Read CLAUDE.md. Study docs/screens/Profile.png,
ProfileApprovals.png, ProfileBrowser.png, ProfileIdentity.png,
ProfileEmail.png, EditMenu.png and Share.png.

Build the Remii profile under src/app/remii/ with a shared layout: close
button (goes back), large Avatar with the pencil button, share button, "Remii",
"Ready offline", and the five-icon SegmentedControl that switches between:

- Activity (/remii): day groups that expand and collapse. "Today" reads from
  the shared activity list, so actions taken in Chat during the demo appear
  here, newest first, above the four seeded items from the design. Icons sit
  in brand-gradient circles.
- Approvals: the "Nothing waiting" empty state.
- Browser: the preview card with "Open browser" (shows a "Not in this
  prototype" note).
- About you: the Household card (brand gradient) and Memory card (user
  gradient), the Edit button and the "stored on this phone" line.
- Email: the empty state with the gradient "Create an email" button.

The pencil opens the edit menu from EditMenu.png. "Change expression" cycles
Remii's avatar through the expressions for the rest of the session; skip
"wink".

The share button opens /remii/share from Share.png: the card with
body-welcome.png, Remii's speech bubble in the brand gradient, and the four
share targets. "Share" opens the system share sheet with the text "Meet
Remii"; the others show a note.

Finish with typecheck, lint and tests passing, and tell me what to tap.
```

**You should see:** tapping Remii in any header opens the profile, and the
check-in from the outage flow is listed under Today.

---

## Prompt 6: side menu and Settings

```text
Demo sprint, prompt 6. Read CLAUDE.md. Study docs/screens/SideMenu.png and
Settings.png.

- Side menu: the menu button in ScreenHeader slides the current screen to the
  right with rounded corners and a shadow, revealing the menu underneath, as
  in the design. Tapping the visible edge of the screen closes it. Use
  react-native-reanimated, which is already installed. The menu lists the five
  tabs with the current one highlighted (tapping one switches tab and closes
  the menu), "Create a space" with its description, the Side chats section,
  and the bottom row: settings button (opens /settings), Search field, and
  new-chat button (resets the demo conversation and opens Chat).
- Settings (/settings): one scrolling screen matching the design: the "Ready
  offline" card, the three grouped lists, "Your account", "Erase all Remii
  data" in red, and the version line. Rows that have a route in
  src/constants/routes.ts open that placeholder. "Erase all Remii data" asks
  for confirmation, then resets the demo.

Keep /menu as a route for the test in src/constants/__tests__ and update
docs/sitemap.md if anything about the routes changes.

Finish with typecheck, lint and tests passing, and tell me what to tap.
```

**You should see:** the screen sliding aside to show the menu, and Settings
opening from the gear.

---

## Prompt 7: Emergency SOS and Voice

```text
Demo sprint, prompt 7. Read CLAUDE.md, especially rules 3, 4 and 5. Study
docs/screens/Emergency.png and Voice.png.

- Emergency SOS (/sos): match the design, with Remii's sober avatar. "Call
  911" uses the brand gradient. In this prototype it must NOT place a call:
  show a confirmation that says "Prototype: this would open the phone dialer
  to 911." "Alert my contacts" shows a similar note. "First aid, step by
  step" shows "Not in this prototype".
- "I'm trapped in a vehicle" opens /sos/guide/vehicle-escape: one step per
  screen in very large type with a step counter, a progress bar, Back and
  Next, read from content/guides/vehicle-escape.md word for word. That guide
  is a draft, so show a visible "Draft, not reviewed" label on every step.
  Do not reword the steps.
- Voice (/voice): match the design: body-calm.png, animated bars, the caption
  "The road is flooded ahead. Should I drive through?", "Listening", and the
  three bottom buttons. After three seconds the caption is replaced by Remii's
  scripted reply: "No. Turn around. Six inches of moving water can knock you
  down and a foot can float a car. Find another route." Mark this line in
  src/demo as placeholder wording that needs a reviewed source before release.
  The chat button returns to Chat; SOS opens /sos.

Finish with typecheck, lint and tests passing, and tell me what to tap.
```

**You should see:** SOS from Chat opening the emergency screen, and the
vehicle escape steps one at a time with a "Draft" label.

---

## Prompt 8: polish and rehearsal

```text
Demo sprint, prompt 8. Read CLAUDE.md.

1. Go through every built screen in the iOS Simulator on an iPhone 16 and an
   iPhone SE size. Fix anything clipped, overlapping the tab bar or the
   notch, or hidden behind the keyboard.
2. Compare each screen with its file in docs/screens and list the visible
   differences. Fix the ones that take under ten minutes; tell me the rest.
3. Add a "Prototype" label: small grey text under the status icon in the
   header, controlled by one constant in src/demo so I can turn it off.
4. Make sure a full reset (long-press Remii's name) returns every screen to
   its starting state.
5. Write docs/demo-script.md: a two-minute walkthrough for me to follow on
   Monday, as a numbered list of taps and what to say at each, covering the
   outage flow, the car kit flow into Plans, the Remii profile activity, the
   side menu and Settings, and SOS into vehicle escape.
6. Tell me how to record the Simulator screen to a video file as a backup.

Finish with typecheck, lint and tests passing.
```

**You should see:** a clean run through `docs/demo-script.md` without touching
the keyboard.

---

## If something breaks

Paste this, filling in the blanks:

```text
Something is wrong in the demo. What I did: ____. What I expected: ____. What
happened instead: ____. Find the cause, fix it, and explain in plain language
what was wrong. Do not change anything unrelated.
```

If the Simulator shows a red error screen, also paste the first few lines of
the red text.

## After the demo

The scripted content in `src/demo/` gets replaced by the real answer path in
Phase 1. The components, screens and navigation built here stay.
