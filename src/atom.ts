import ReactDOM from "react-dom";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import type { Atom } from "./types";

const batch = ReactDOM.unstable_batchedUpdates;

type Fn = () => void;

export function atom<T>(value: T): Atom<T> {
  // Thanks to nanxiaobei!!!! Copied from resso

  const listeners = new Set<Fn>();
  let v = value;
  const subscribe = (listener: Fn) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getSnapshot = () => v;
  const setSnapshot = (val: any) => {
    if (val === v) return;
    v = val;
    batch(() => listeners.forEach(listener => listener()));
  };
  const useSnapshot = () => {
    return useSyncExternalStore(
      subscribe,
      getSnapshot,
    );
  };

  const wrapper = {
    get value() {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useSnapshot();
      } catch (e) {
        return v;
      }
    },
    set value(newVal) {
      setSnapshot(newVal);
    },
  };
  Object.defineProperty(wrapper, "__s_isAtom", { value: true });

  return wrapper as Atom<T>;
}

export function mota<T>(value: (() => T)): Atom<T, true> {
  const wrapper = {
    get value() {
      return value();
    },
  };
  Object.defineProperty(wrapper, "__s_isAtom", { value: true });

  return wrapper as Atom<T, true>;
}
