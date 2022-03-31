import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LenguageContext } from "../context/Lengauge";

import "../style/ArticleStyle.css";

const TestBar = () => {
  const navigate = useNavigate();

  const { lenguage } = useContext(LenguageContext);

  return (
    <div className="side__bar">
      <h2 onClick={() => navigate("/tests/burnout")}>
        {lenguage === "español" ? "SINDROME DEL TRABAJADOR QUEMADO" : "BURNOUT"}
      </h2>
      <h2 onClick={() => navigate("/tests/sleep_disorder")}>
        {lenguage === "español" ? "TRANSTORNO DEL SUEÑO" : "SLEEP DISORDER"}
      </h2>
      <h2 onClick={() => navigate("/tests/bipolar_disorder")}>
        {lenguage === "español"
          ? "TRANSTORNO DE BIPOLARIDAD"
          : "BIPOLAR DISORDER"}
      </h2>
      <h2 onClick={() => navigate("/tests/anxiety")}>
        {lenguage === "español" ? "ANSIEDAD" : "ANXIETY"}
      </h2>
      <h2 onClick={() => navigate("/tests/depresion")}>DEPRESION</h2>
    </div>
  );
};

export default TestBar;
