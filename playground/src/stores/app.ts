import { defineStore, useAtom } from "../../../src/index";

export const useAppStore = () => {
  const useDefine = () => {
    const count = useAtom(0);
    const tenTimesCount = useAtom(() => {
      return count.value * 10;
    });
    const inc = (n = 1) => { count.value += n; };
    return {
      count,
      tenTimesCount,
      inc,
    };
  };
  return defineStore(useDefine);
};
