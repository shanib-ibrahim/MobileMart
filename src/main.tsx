import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { store } from "./app/store.ts";

import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
