import { defineStore, useAtom } from "../../../src/index";

export const useAppStore = () => {
  const useDefine = () => {
    const count = useAtom(0);
    const inc = () => { count.value++; };
    return {
      count,
      inc,
    };
  };
  return defineStore(useDefine);
};
