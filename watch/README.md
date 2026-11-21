# Apple Watch app

React Native does not run on watchOS. The watch app is a native SwiftUI app
that will live in this folder and be added to the generated Xcode project
through an Expo config plugin. It is Phase 5 in `docs/build-plan.md`. Do not
start it before Phases 1 and 2 are done: the watch reuses the guide format and
the SOS rules from the phone.

## Screens

Design references are in `docs/screens/`:

| Screen | Reference |
| --- | --- |
| Home | `WatchHome.png` |
| Listening | `WatchListen.png` |
| Answer | `WatchAnswer.png` |
| One step at a time | `WatchStep.png` |
| Quick asks | `WatchAsk.png` |
| Call | `WatchCall.png` |
| Scheduled check-in | `WatchCheckin.png` |
| Alert | `WatchAlert.png` |
| Offline guides | `WatchGuides.png` |

Colours are `watchBackground` and `watchButton` in `src/constants/theme.ts`.

## How it will work

- The phone sends a small set of reviewed guides to the watch over
  WatchConnectivity. They are stored on the watch.
- With the phone in reach, speech goes to the phone and the answer comes back.
- With the phone out of reach, the watch shows only its stored guides and says
  so.
- Call 911 uses the watch's own phone function.
