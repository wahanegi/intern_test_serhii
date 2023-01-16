import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from "../store";

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});