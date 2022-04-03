type AtomReadonlyValue<T, IsReadonly extends boolean = false> = IsReadonly extends true ? {
  readonly value: T
} : {
  value: T
};
export type Atom<T = any, IsReadonly extends boolean = false> = {
  readonly __s_isAtom: true
} & AtomReadonlyValue<T, IsReadonly>;
export type Mutate = (...args: any[]) => void | undefined;
export type StoreItem = Atom | Mutate;
export type Store = Record<string, StoreItem>;
export type StoreInstance<State> = State;

export type UnwrapAtom<T> = T extends Atom<infer V> ? V : T;
