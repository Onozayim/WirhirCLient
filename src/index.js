import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/Auth";
import { LenguageProvider } from "./context/Lengauge";
import Hola from "./Hola";

ReactDOM.render(
  <LenguageProvider>
    <AuthProvider>
      <h1>HOLA</h1>
      <Hola />
    </AuthProvider>
  </LenguageProvider>,
  document.getElementById("root")
);
