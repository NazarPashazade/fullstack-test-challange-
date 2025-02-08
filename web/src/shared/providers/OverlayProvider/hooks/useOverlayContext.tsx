import { useContext } from "react";

import { OverlayContext } from "../OverlayProvider";

const useOverlayContext = () => {
  const overlayContext = useContext(OverlayContext);

  if (!overlayContext) {
    throw new Error("Initialization of the overlay context is required");
  }

  return {
    ...overlayContext,
  };
};

export default useOverlayContext;
