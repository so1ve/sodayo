export interface Atom<T = any> {
  value: T
  __s_isAtom: true
}
export type Mutate = () => void | undefined;
export type StoreItem = Atom | Mutate;
export type Store = Record<string, StoreItem>;
export type StoreInstance<State> = State;

export type UnwrapAtom<T> = T extends Atom<infer V> ? V : T;
