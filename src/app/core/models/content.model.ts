// Derive the unions from a single source (`as const`) so the allowed values and
// the type can never drift apart - no scattered magic strings.
const LANGS = ['en', 'ua'] as const;
const THEMES = ['light', 'dark'] as const;

export type Lang = (typeof LANGS)[number]; // 'en' | 'ua'
export type Theme = (typeof THEMES)[number]; // 'light' | 'dark'

// A string that exists in every supported language.
export type Localized = Record<Lang, string>;

// Narrow a stored string (e.g. from localStorage) to a supported union member.
// Built from the same `as const` source, so adding a value updates these too.
const LANG_SET: ReadonlySet<string> = new Set<string>(LANGS);
const THEME_SET: ReadonlySet<string> = new Set<string>(THEMES);

export const isLang = (value: string | null): value is Lang =>
  value !== null && LANG_SET.has(value);

export const isTheme = (value: string | null): value is Theme =>
  value !== null && THEME_SET.has(value);
