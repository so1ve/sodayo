import type { Store, UnwrapAtom } from "./types";
import { unAtom } from "./utils";

export type DefineStoreResult<State extends Store> = () => {
  [K in keyof State]: UnwrapAtom<State[K]>
};
export function defineStore<State extends Store>(createStore: () => State): DefineStoreResult<State> {
  const state = createStore();

  return new Proxy(state, {
    get(_, key) {
      const item = state[key as keyof State];
      return unAtom(item);
    },
  }) as unknown as DefineStoreResult<State>;
}
