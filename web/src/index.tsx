import React from "react";
import { createRoot } from "react-dom/client";

import App from "./containers/App/App";
import "@assets/styles/index.scss";
import AppWrapper from "./AppWrapper";

const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
);
