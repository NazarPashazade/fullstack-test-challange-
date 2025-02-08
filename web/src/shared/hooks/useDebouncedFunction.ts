import { useMemo } from "react";

import { debounce } from "@shared/utils";
import { AnyType } from "@shared/interfaces";

export default function useDebouncedFunction<F extends (...args: AnyType) => AnyType>(func?: F, delay = 500) {
  return useMemo(() => {
    if (!func) return;

    return debounce(func, delay);
  }, [func, delay]);
}
