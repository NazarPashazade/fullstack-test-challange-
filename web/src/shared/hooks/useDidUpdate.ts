import { DependencyList, useEffect, useRef } from "react";

import useDebouncedFunction from "./useDebouncedFunction";

export const useDidUpdate = (effect: () => void, dependencies: DependencyList = []) => {
  const isMounted = useRef(false);

  const handleMount = useDebouncedFunction(() => {
    isMounted.current = true;
  }, 50);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    }
    handleMount?.();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDidUpdate;
