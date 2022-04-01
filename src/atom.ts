import { useState } from "react";
import type { Atom } from "./types";

export function useAtom<T>(value: T): Atom<T> {
  const [val, setVal] = useState(value);
  return {
    __s_isAtom: true,
    get value() {
      return val;
    },
    set value(newVal: T) {
      setVal(newVal);
    },
  };
}
