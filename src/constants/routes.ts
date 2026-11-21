/**
 * Every screen in the phone app, mirroring docs/sitemap.md.
 * `mockup` points at the design reference; `phase` is the build phase in docs/build-plan.md.
 * Keep this list in step with the files under src/app when you add or remove a route.
 */
export type AppRoute = {
  route: string;
  title: string;
  mockup: string | null;
  phase: number;
};

export const APP_ROUTES: readonly AppRoute[] = [
  { route: '/', title: 'Chat', mockup: "docs/screens/Main.png", phase: 1 },
  { route: '/briefing', title: 'Briefing', mockup: "docs/screens/Briefing.png", phase: 4 },
  { route: '/ideas', title: 'Ideas', mockup: "docs/screens/Ideas.png", phase: 4 },
  { route: '/plans', title: 'Plans', mockup: "docs/screens/Plans.png", phase: 3 },
  { route: '/library', title: 'Library', mockup: "docs/screens/Library.png", phase: 1 },
  { route: '/voice', title: 'Voice', mockup: "docs/screens/Voice.png", phase: 4 },
  { route: '/history', title: 'Past conversations', mockup: null, phase: 1 },
  { route: '/menu', title: 'Menu', mockup: null, phase: 0 },
  { route: '/briefing/[id]', title: 'Briefing item', mockup: null, phase: 4 },
  { route: '/briefing/settings', title: 'What Remii watches', mockup: null, phase: 4 },
  { route: '/plans/[id]', title: 'Plan detail', mockup: null, phase: 3 },
  { route: '/plans/[id]/share', title: 'Share a plan', mockup: null, phase: 3 },
  { route: '/library/media', title: 'Media', mockup: "docs/screens/LibraryMedia.png", phase: 1 },
  { route: '/library/[id]', title: 'Guide reader', mockup: null, phase: 1 },
  { route: '/remii', title: 'Remii: activity', mockup: "docs/screens/Profile.png", phase: 3 },
  { route: '/remii/approvals', title: 'Remii: approvals', mockup: "docs/screens/ProfileApprovals.png", phase: 4 },
  { route: '/remii/browser', title: 'Remii: browser', mockup: "docs/screens/ProfileBrowser.png", phase: 4 },
  { route: '/remii/about-you', title: 'Remii: about you', mockup: "docs/screens/ProfileIdentity.png", phase: 3 },
  { route: '/remii/about-you/household', title: 'Household', mockup: null, phase: 3 },
  { route: '/remii/about-you/memory', title: 'Memory', mockup: null, phase: 3 },
  { route: '/remii/email', title: 'Remii: email', mockup: "docs/screens/ProfileEmail.png", phase: 4 },
  { route: '/remii/share', title: 'Share Remii', mockup: "docs/screens/Share.png", phase: 6 },
  { route: '/sos', title: 'Emergency SOS', mockup: "docs/screens/Emergency.png", phase: 2 },
  { route: '/sos/guide/[id]', title: 'Emergency steps', mockup: null, phase: 2 },
  { route: '/sos/alert-sent', title: 'Contacts alerted', mockup: null, phase: 2 },
  { route: '/welcome', title: 'Welcome', mockup: null, phase: 6 },
  { route: '/welcome/permissions', title: 'Permissions', mockup: null, phase: 6 },
  { route: '/welcome/model', title: 'Offline setup', mockup: null, phase: 1 },
  { route: '/welcome/contacts', title: 'Emergency contacts', mockup: null, phase: 2 },
  { route: '/welcome/household', title: 'About you', mockup: null, phase: 3 },
  { route: '/settings', title: 'Settings', mockup: null, phase: 0 },
  { route: '/settings/offline', title: 'Offline model', mockup: null, phase: 1 },
  { route: '/settings/contacts', title: 'Emergency contacts', mockup: null, phase: 2 },
  { route: '/settings/notifications', title: 'Check-ins and alerts', mockup: null, phase: 3 },
  { route: '/settings/privacy', title: 'Privacy', mockup: null, phase: 6 },
  { route: '/settings/watch', title: 'Apple Watch', mockup: null, phase: 5 },
  { route: '/settings/account', title: 'Account', mockup: null, phase: 6 },
  { route: '/settings/about', title: 'About', mockup: null, phase: 6 },
];
