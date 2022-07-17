import type { Store, StoreDefinition } from "./types";
import { unwrapAtom } from "./utils";

export function defineStore<State extends Store>(createStore: () => State) {
  const state = createStore();

  const useStore = () => new Proxy(state, {
    get(_, k) {
      const item = state[k as any];
      return unwrapAtom(item);
    },
  }) as StoreDefinition<State>;

  return useStore;
}
