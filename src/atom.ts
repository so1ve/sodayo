import { useState } from "react";
import type { Atom } from "./types";

export function useAtom<T>(value: (() => T)): Atom<T, true>;
export function useAtom<T>(value: T): Atom<T>;
export function useAtom(value: any): any {
  if (typeof value === "function") {
    return {
      __s_isAtom: true,
      get value() {
        return value();
      },
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [val, setVal] = useState(value);
  return {
    __s_isAtom: true,
    get value() {
      return val;
    },
    set value(newVal) {
      setVal(newVal);
    },
  };
}
