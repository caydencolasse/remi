/**
 * Remii design tokens. Values come from the mockups in docs/screens.
 * The app is light-only for now; red is reserved for SOS and urgent alerts.
 */
export const Colors = {
  background: '#F4F3F1',
  card: '#FFFFFF',
  ink: '#161616',
  textSecondary: '#5C5B57',
  line: '#E2E0DC',
  chip: '#E9E7E2',
  red: '#D4202A',
  /** Start of the brand gradient. Not for flat fills; use `red` for those. */
  brandRed: '#EA0437',
  /** Start of the gradient on the user's own chat bubbles. */
  userBlue: '#4285F4',
  /** Shared dark end of both gradients. */
  gradientDark: '#1B1B1B',
  redTint: '#FBE4E5',
  green: '#1F7A3D',
  greenTint: '#E3EFE6',
  onInk: '#FFFFFF',
  onRed: '#FFFFFF',
  scrim: 'rgba(22,22,22,0.38)',
  /** Apple Watch reference values, used by the native watch app. */
  watchBackground: '#E9E8E6',
  watchButton: '#5E6A80',
} as const;

/**
 * Gradients run top-left to bottom-right (135 degrees).
 * With expo-linear-gradient: start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}.
 *
 * - `brand`: primary buttons, SOS and Call 911, step numbers, activity icons,
 *   the Household card and Remii's speech bubble on the share card.
 * - `user`: the user's own chat bubbles and the Memory card. The start colour is
 *   #4285F4 darkened 15% toward #1B1B1B so white text keeps 4.5:1 contrast.
 */
export const Gradients = {
  brand: { colors: ['#EA0437', '#1B1B1B'], locations: [0, 1] },
  user: { colors: ['#3C75D3', '#1B1B1B'], locations: [0, 1] },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const Radius = {
  bubble: 20,
  card: 18,
  sheet: 36,
  pill: 999,
} as const;

/** Minimum touch target on both platforms. */
export const TouchTarget = 44;

export const Type = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  heading: { fontSize: 17, lineHeight: 22, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 21, fontWeight: '700' },
  secondary: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
} as const;
