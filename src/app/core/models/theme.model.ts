const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number]; // 'light' | 'dark'

// Narrow a stored string (e.g. from localStorage) to a supported union member.
// Built from the same `as const` source, so adding a theme updates this too.
const THEME_SET: ReadonlySet<string> = new Set<string>(THEMES);

export const isTheme = (value: string | null): value is Theme =>
  value !== null && THEME_SET.has(value);
