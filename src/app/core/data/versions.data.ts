import { VersionEntry } from '../models/content.model';

// Every Angular major, oldest first - the rail renders them in this order and
// opens on the last one.
//
// There is no v3: the router package had already reached 3.x, so the team skipped
// the number to bring every package back onto one version line.
//
// Highlights are written one release at a time. An entry with no `title` and no
// `points` is a version whose panel still says "on the way" - that is the
// placeholder, rather than filler prose pretending to be content. v17 below shows
// the shape a filled entry takes.
export const VERSIONS: VersionEntry[] = [
  { id: 'angularjs', label: 'AngularJS', year: 2010 },
  { id: 'v2', label: 'v2', year: 2016 },
  { id: 'v4', label: 'v4', year: 2017 },
  { id: 'v5', label: 'v5', year: 2017 },
  { id: 'v6', label: 'v6', year: 2018 },
  { id: 'v7', label: 'v7', year: 2018 },
  { id: 'v8', label: 'v8', year: 2019 },
  { id: 'v9', label: 'v9', year: 2020 },
  { id: 'v10', label: 'v10', year: 2020 },
  { id: 'v11', label: 'v11', year: 2020 },
  { id: 'v12', label: 'v12', year: 2021 },
  { id: 'v13', label: 'v13', year: 2021 },
  { id: 'v14', label: 'v14', year: 2022 },
  { id: 'v15', label: 'v15', year: 2022 },
  { id: 'v16', label: 'v16', year: 2023 },
  {
    id: 'v17',
    label: 'v17',
    year: 2023,
    title: {
      en: 'Built-in control flow and deferrable views',
      uk: 'Вбудований control flow і deferrable views',
    },
    points: [
      {
        head: { en: 'New control flow', uk: 'Новий control flow' },
        body: {
          en: '@if, @for and @switch replace the structural directives: nothing to import, and the compiler narrows types through them.',
          uk: '@if, @for і @switch замінюють структурні директиви: нічого не потрібно імпортувати, і компілятор звужує типи через них.',
        },
      },
      {
        head: { en: 'Deferrable views', uk: 'Deferrable views' },
        body: {
          en: '@defer moves a template and its dependencies into a lazy chunk, with triggers that decide when to fetch it.',
          uk: '@defer переносить шаблон і його залежності в лінивий чанк, а тригери вирішують, коли його завантажити.',
        },
      },
      {
        head: { en: 'esbuild and Vite by default', uk: 'esbuild і Vite за замовчуванням' },
        body: {
          en: 'The application builder became the default, cutting cold build and dev-server start times.',
          uk: 'Application builder став типовим, скоротивши час холодної збірки та старту dev-сервера.',
        },
      },
    ],
  },
  { id: 'v18', label: 'v18', year: 2024 },
  { id: 'v19', label: 'v19', year: 2024 },
  { id: 'v20', label: 'v20', year: 2025 },
  { id: 'v21', label: 'v21', year: 2025 },
  { id: 'v22', label: 'v22', year: 2026 },
];
