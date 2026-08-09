import { toggleMembership } from './collections';

describe('toggleMembership', () => {
  it('adds an item that is not in the set', () => {
    expect([...toggleMembership(new Set(['a']), 'b')]).toEqual(['a', 'b']);
  });

  it('removes an item that is', () => {
    expect([...toggleMembership(new Set(['a', 'b']), 'a')]).toEqual(['b']);
  });

  // Signals compare by reference: mutating the set in place would change what a
  // reader sees while telling no one it had changed.
  it('leaves the original set alone and returns a different one', () => {
    const before = new Set(['a']);
    const after = toggleMembership(before, 'b');

    expect(after).not.toBe(before);
    expect([...before]).toEqual(['a']);
  });
});
