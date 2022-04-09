import { useAppStore } from "../stores/app";

export default function FunctionalComp() {
  const appStore = useAppStore();

  return (
    <div>
      count is: {appStore.count}
    </div>
  );
}
