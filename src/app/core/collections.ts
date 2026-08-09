/**
 * Small pure helpers over plain collections. Nothing here touches Angular, so it
 * is testable on its own and safe to call from a computed or an update callback.
 */

/**
 * Returns a set with `id` added, or removed if it was already in. Always a new
 * set: signals compare by reference, so mutating the one held in the signal
 * would change what a reader sees without ever notifying them.
 *
 * Both accordions keep their open rows this way - the feed's questions and the
 * timeline's changes - and the delete-or-add dance is the part worth having in
 * one place.
 */
export function toggleMembership<T>(items: ReadonlySet<T>, item: T): ReadonlySet<T> {
  const next = new Set(items);
  if (!next.delete(item)) {
    next.add(item);
  }
  return next;
}
