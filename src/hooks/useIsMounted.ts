import { useSyncExternalStore } from "react";

export function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true, // client에서는 true 로 변경되는 hook
    () => false, // 서버에서는 false
  );
}
