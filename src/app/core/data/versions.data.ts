import { VersionEntry } from '../models/content.model';
import { ANGULARJS } from './versions/angularjs.data';
import { V2 } from './versions/v2.data';
import { V4 } from './versions/v4.data';
import { V5 } from './versions/v5.data';
import { V6 } from './versions/v6.data';
import { V7 } from './versions/v7.data';
import { V8 } from './versions/v8.data';
import { V9 } from './versions/v9.data';
import { V10 } from './versions/v10.data';
import { V11 } from './versions/v11.data';
import { V12 } from './versions/v12.data';
import { V13 } from './versions/v13.data';
import { V14 } from './versions/v14.data';
import { V15 } from './versions/v15.data';
import { V16 } from './versions/v16.data';
import { V17 } from './versions/v17.data';
import { V18 } from './versions/v18.data';
import { V19 } from './versions/v19.data';
import { V20 } from './versions/v20.data';
import { V21 } from './versions/v21.data';
import { V22 } from './versions/v22.data';

// Every Angular major, oldest first - the rail renders them in this order and
// opens on the last one. One file per release, the way the question bank keeps
// one file per category: a release is written once, in full, in one place.
//
// Written against the release notes rather than from memory - the announcement
// posts on blog.angular.dev and the CHANGELOG.md in angular/angular. A point
// says which release something landed in and what state it landed in
// (experimental, developer preview, stable), because for anything since v16
// that distinction is most of the answer.
//
// There is no v3: the router package had already reached 3.x, so the number was
// skipped to bring every package back onto one version line.
//
// A release whose highlights are still unwritten carries no title and no points,
// and its panel shows the "on the way" note rather than filler prose pretending
// to be content. Nothing is in that state today; the next major will be, until
// it is written.
export const VERSIONS: VersionEntry[] = [
  ANGULARJS,
  V2,
  V4,
  V5,
  V6,
  V7,
  V8,
  V9,
  V10,
  V11,
  V12,
  V13,
  V14,
  V15,
  V16,
  V17,
  V18,
  V19,
  V20,
  V21,
  V22,
];
