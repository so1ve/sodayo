type AtomMaybeReadonlyValue<
  T,
  IsReadonly extends boolean,
> = IsReadonly extends true ? { readonly value: T } : { value: T };
export type Atom<
  T = any,
  IsReadonly extends boolean = false,
> = { readonly __s_isAtom: true } & AtomMaybeReadonlyValue<T, IsReadonly>;
export type Mutate = (...args: any[]) => any;
export type StoreItem = Atom | Mutate;
export type Store = Record<string, StoreItem>;
export type UnwrapAtom<T> = T extends Atom<infer V> ? V : T;
export type StoreDefinition<State extends Store> = {
  readonly [K in keyof State]: UnwrapAtom<State[K]>
};
