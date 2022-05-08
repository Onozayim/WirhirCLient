import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/Auth";
import { LenguageProvider } from "./context/Lengauge";

ReactDOM.render(
  <LenguageProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LenguageProvider>,
  document.getElementById("root")
);
