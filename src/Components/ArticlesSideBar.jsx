import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LenguageContext } from "../context/Lengauge";
import "../style/ArticleStyle.css";

const SideBar = () => {
  const navigate = useNavigate();
  const { lenguage } = useContext(LenguageContext);

  return (
    <div className="side__bar">
      <h2 onClick={() => navigate("/articles/burnout")}>
        {lenguage === "español" ? "SINDROME DEL TRABAJADOR QUEMADO" : "BURNOUT"}
      </h2>
      <h2 onClick={() => navigate("/articles/sleep_disorder")}>
        {lenguage === "español" ? "TRANSTORNO DEL SUEÑO" : "SLEEP DISORDER"}
      </h2>
      <h2 onClick={() => navigate("/articles/bipolar_disorder")}>
        {lenguage === "español"
          ? "TRANSTORNO DE BIPOLARIDAD"
          : "BIPOLAR DISORDER"}
      </h2>
      <h2 onClick={() => navigate("/articles/anxiety")}>
        {lenguage === "español" ? "ANSIEDAD" : "ANXIETY"}
      </h2>
      <h2 onClick={() => navigate("/articles/depresion")}>DEPRESION</h2>
    </div>
  );
};

export default SideBar;
