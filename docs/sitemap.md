# Remii app sitemap

Version 0.2, 20 November 2026. Covers the React Native phone app (iOS and Android) and the native Apple Watch app.

Legend: **[M]** mocked up on the design canvas, **[ ]** not yet designed, *(offline)* works with no connection, *(online)* needs a connection.

Route names are the paths the app's router will use (Expo Router file names).

---

## 1. Phone app

### 1.1 First run (shown once)

| Route | Screen | Purpose | Status |
| --- | --- | --- | --- |
| `/welcome` | Welcome | Remii introduces itself; what it does and does not do | [ ] |
| `/welcome/permissions` | Permissions | Notifications (for check-ins), microphone, location; each explained and skippable | [ ] |
| `/welcome/model` | Offline setup | Checks the phone, downloads the on-device model over Wi-Fi, shows progress | [ ] |
| `/welcome/contacts` | Emergency contacts | Add one or more people Remii may text in an emergency | [ ] |
| `/welcome/household` | About you | Household, vehicle, region; all optional, stored on the phone | [ ] |

### 1.2 Main tabs (floating tab bar, always visible)

```
/                       Chat            (tab 1)
/briefing               Briefing        (tab 2)
/ideas                  Ideas           (tab 3)
/plans                  Plans           (tab 4)
/library                Library         (tab 5)
```

#### Tab 1 — Chat `/`

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/` | Chat, on-device | Default. Header pill reads On-device. Step lists, check-in cards *(offline)* | [M] Chat — power outage |
| `/` (online reply) | Chat, online | Product cards with photo, reason, price, link out *(online)* | [M] Chat — product recommendations |
| `/voice` | Voice | Full-screen Remii, waveform, live transcript, mic and SOS *(offline)* | [M] Voice |
| `/` + attach sheet | Add photo or file | Camera, photo library, file picker | [ ] |
| `/` + check-in sheet | Schedule a check-in | Pick a time; choose whether a missed check-in alerts a contact | [ ] |
| `/history` | Past conversations | Opened from Search in the side menu | [ ] |

#### Tab 2 — Briefing `/briefing`

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/briefing` | Briefing feed | Local alerts, seasonal reminders, items tied to the user's plans *(online, last copy kept offline)* | [M] Briefing |
| `/briefing/[id]` | Briefing item | Full item with sources; Discuss opens Chat with the item attached | [ ] |
| `/briefing/settings` | What Remii watches | Region, alert types, quiet hours | [ ] |

#### Tab 3 — Ideas `/ideas`

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/ideas` | Ideas list | Things Remii offers to do; tapping one starts it in Chat *(offline)* | [M] Ideas |

#### Tab 4 — Plans `/plans`

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/plans` | Plans | Tracked plans, then Create a plan by area: Home, Vehicle, Family, Outdoors *(offline)* | [M] Plans |
| `/plans` + create sheet | Create a plan | Explains the chat interview; Let's do it opens Chat | [M] Plans — create sheet |
| `/plans/[id]` | Plan detail | Checklist items, what is missing, product links for gaps | [ ] |
| `/plans/[id]/share` | Share a plan | Export a one-page PDF or send to a family member | [ ] |

#### Tab 5 — Library `/library`

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/library` | Guides | PDFs and .md files Remii can answer from; which are also on the watch *(offline)* | [M] Library — guides |
| `/library/media` | Media | Photos, maps and videos Remii saved | [M] Library — media, empty |
| `/library/[id]` | Guide reader | Read a guide; step-by-step mode for reviewed guides | [ ] |
| `/library` + add sheet | Add a guide | Import a PDF or note; shows indexing progress | [ ] |

### 1.3 Remii profile (opened by tapping Remii in any header)

```
/remii                  Activity        (sub-tab 1)
/remii/approvals        Approvals       (sub-tab 2)
/remii/browser          Browser         (sub-tab 3)
/remii/about-you        About you       (sub-tab 4)
/remii/email            Email           (sub-tab 5)
```

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/remii` | Activity | What Remii did, grouped by day | [M] Remii profile — activity |
| `/remii/approvals` | Approvals | Anything Remii wants to buy, book or send waits here | [M] Remii profile — approvals |
| `/remii/browser` | Browser | Live view of pages Remii opens *(online)* | [M] Remii profile — browser |
| `/remii/about-you` | About you | Household and Memory cards; read, edit, erase | [M] Remii profile — about you |
| `/remii/about-you/household` | Household | People, vehicle, medical notes, emergency contacts | [ ] |
| `/remii/about-you/memory` | Memory | List of what Remii remembers, each item deletable | [ ] |
| `/remii/email` | Email | Give Remii its own address *(online)* | [M] Remii profile — email |
| `/remii` + edit menu | Edit Remii | Change expression, edit name, change voice | [M] Remii profile — edit menu |
| `/remii/share` | Share Remii | Invite card and share targets | [M] Share Remii |

### 1.4 Emergency (reachable from the red SOS button on Chat and Voice)

| Route / state | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/sos` | Emergency SOS | Call 911, alert contacts, first aid, trapped in a vehicle *(offline)* | [M] Emergency SOS |
| `/sos/guide/[id]` | Emergency steps | One reviewed step per screen, large type, read aloud | [ ] |
| `/sos/alert-sent` | Contacts alerted | Confirms who was texted and with what location | [ ] |

### 1.5 Side menu and settings (opened from the menu button in any header)

| Route | Screen | Notes | Status |
| --- | --- | --- | --- |
| `/menu` | Side menu | Slides in from the left over the current screen. Tabs, Create a space, side chats, Settings, Search, New chat | [M] Side menu |
| `/menu` + create space | Create a space | Add a space for a trip, a vehicle or a person; hold a tab to reorder | [ ] |
| `/settings` | Settings | "Ready offline" card, then the rows below | [M] Settings |
| `/settings/offline` | Offline model | Model in use, storage used, re-download, on-device only switch | [ ] |
| `/settings/contacts` | Emergency contacts | Add, remove, test message | [ ] |
| `/settings/watch` | Apple Watch | Which guides sync to the watch | [ ] |
| `/settings/permissions` | Permissions | Notifications, microphone, location, contacts | [ ] |
| `/settings/connected-apps` | Connected apps | Apps Remii may act in *(online)* | [ ] |
| `/settings/notifications` | Check-ins and alerts | Quiet hours, missed check-in behaviour | [ ] |
| `/settings/appearance` | Appearance | Text size, light and dark | [ ] |
| `/settings/voice` | Voice | Remii's voice and read-aloud speed | [ ] |
| `/settings/privacy` | Privacy and data | What stays on the phone, what goes online, erase everything | [ ] |
| `/settings/report` | Report an issue | Send a problem report | [ ] |
| `/settings/help` | Help and support | Guides to using Remii, contact | [ ] |
| `/settings/about` | About and legal | Disclaimers, guide sources and licences, version | [ ] |
| `/settings/account` | Account | Optional sign-in, subscription | [ ] |
| `/dev` | All screens (development) | Index of every route for testing. Not part of the product | n/a |

### 1.6 System surfaces (outside the app)

| Surface | Purpose | Status |
| --- | --- | --- |
| Check-in notification | "Morning. Is the power back on?" with Yes and No, plan next steps actions | [ ] |
| Alert notification | Weather or safety alert with What to do | [ ] |
| Home screen widget | Plan readiness and one-tap SOS | [ ] |
| Share extension | Send a PDF or web page to Remii's library from another app | [ ] |

---

## 2. Apple Watch app (native SwiftUI)

| Screen | Purpose | Reached from | Status |
| --- | --- | --- | --- |
| Home | Remii with Call, Quick asks and Speak buttons | App launch | [M] your design |
| Listening | Waveform and live transcript; cancel or send | Home, Speak | [M] |
| Answer | Short answer; Steps and read-aloud *(offline for saved guides)* | Listening, Quick asks | [M] |
| One step at a time | Step counter, progress bar, one instruction, Done | Answer, Alert, Guides | [M] |
| Quick asks | Power is out, Car trouble, Someone is hurt, I'm lost | Home, chat button | [M] |
| Call | Call 911, Call ICE 1 (first emergency contact), Talk to Remii | Home, phone button | [M] |
| Scheduled check-in | Question with Yes and No, plan next steps | Notification | [M] |
| Alert | Advisory text with What to do | Notification | [M] |
| Offline guides | Guides stored on the watch | Scroll down from Home | [M] |
| Complication | Remii face; tap opens Home | Watch face | [ ] |
| Phone not reachable | Explains that only saved guides are available | Automatic | [ ] |

---

## 3. Main paths through the app

1. **Outage at night (offline).** Chat → Remii's steps → user reports back → check-in scheduled → next morning notification → Chat.
2. **Car kit (online).** Chat or Ideas → product cards → resqme.com → Add all to my Vehicle plan → Plans.
3. **Emergency.** SOS button → Emergency SOS → Call 911 or Emergency steps → Contacts alerted.
4. **Preparing for a trip.** Briefing item → Discuss → Library → guides synced to watch → Watch, Offline guides.
5. **Building trust.** Remii profile → About you → Memory → erase an item.
