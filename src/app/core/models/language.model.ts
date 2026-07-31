export const LANGS = ['en', 'uk'] as const;

export type Lang = (typeof LANGS)[number]; // 'en' | 'uk'

// Fallback language when nothing is stored (deliberate default, not LANGS[0]).
export const DEFAULT_LANG: Lang = 'en';

// Narrow a stored string (e.g. from localStorage) to a supported union member.
// Built from the same `as const` source, so adding a language updates this too.
const LANG_SET: ReadonlySet<string> = new Set<string>(LANGS);

export const isLang = (value: string | null): value is Lang =>
  value !== null && LANG_SET.has(value);

export const LANG_LABELS: Record<Lang, string> = { en: 'EN', uk: 'UA' };

// Every user-facing string in the content lives in both languages.
// Written as a Record so a missing translation is a compile error, not a runtime blank.
export type Localized = Record<Lang, string>;
