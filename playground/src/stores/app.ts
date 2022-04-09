import { defineStore, atom } from "../../../src/index";

export const useAppStore = () => {
  const useDefine = () => {
    const count = atom(0);
    const tenTimesCount = atom(() => {
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
