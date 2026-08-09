import { WritableSignal } from '@angular/core';
import { toggleMembership } from './collections';

/** What a template needs from a set of open accordion rows. */
export interface OpenRows {
  isOpen(id: string): boolean;
  toggle(id: string): void;
}

/**
 * Reads and writes which rows are open, over a set of ids the caller owns.
 *
 * The set is passed in rather than created here because the two callers hold it
 * differently: the feed keeps a plain signal that outlives everything, while the
 * timeline keeps a linkedSignal that empties itself whenever another release is
 * picked. That difference is the whole reason they cannot share a service - but
 * everything downstream of the set is identical, and this is it.
 */
export function openRows(expanded: WritableSignal<ReadonlySet<string>>): OpenRows {
  return {
    isOpen: (id) => expanded().has(id),
    toggle: (id) => expanded.update((ids) => toggleMembership(ids, id)),
  };
}
