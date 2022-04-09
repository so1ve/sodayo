import type { Store, UnwrapAtom } from "./types";
import { unwrapAtom } from "./utils";

export type DefineStoreResult<State extends Store> = {
  readonly [K in keyof State]: UnwrapAtom<State[K]>
};
export function defineStore<State extends Store>(createStore: () => State) {
  const state = createStore();

  return () => new Proxy(state, {
    get(_, key) {
      const item = state[key as keyof State];
      return unwrapAtom(item);
    },
  }) as unknown as DefineStoreResult<State>;
}
