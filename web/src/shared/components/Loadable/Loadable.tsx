import React, { Suspense, ExoticComponent } from "react";

import { TopLoader } from "../TopLoader";

const Loadable = (Component: ExoticComponent) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<TopLoader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
