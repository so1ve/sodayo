import type { Atom } from "./types";

export function isAtom<T>(a: Atom<T> | unknown): a is Atom<T>;
export function isAtom(a: any): a is Atom {
  return !!(a && a.__s_isAtom === true);
}
export function unwrapAtom<T>(atom: T | Atom<T>): T {
  return isAtom(atom) ? (atom.value as any) : atom;
}
