import React from "react";
import ReactDOM from "react-dom/client";
import DriveRockApp from "./DriveRockApp.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DriveRockApp />
    </Provider>
  </React.StrictMode>
);
