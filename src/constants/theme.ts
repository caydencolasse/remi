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
