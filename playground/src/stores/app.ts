import { defineStore, useAtom } from "../../../src/index";

export const useAppStore = () => {
  const useDefine = () => {
    const count = useAtom(0);
    const inc = (n = 1) => { count.value += n; };
    return {
      count,
      inc,
    };
  };
  return defineStore(useDefine);
};
