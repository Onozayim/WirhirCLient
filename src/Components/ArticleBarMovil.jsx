import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LenguageContext } from "../context/Lengauge";
import "../style/ArticleStyle.css";

const ArticleBarMovil = () => {
  const [articleSideBarMovil, setArticleSideBarMovil] = useState(false);

  const navigate = useNavigate();

  const { lenguage } = useContext(LenguageContext);

  return (
    <React.Fragment>
      {!articleSideBarMovil && (
        <div className="toggle__side__bar__movil">
          <p onClick={() => setArticleSideBarMovil(true)}>
            {lenguage === "español" ? "Opciones" : "Options"}
          </p>
        </div>
      )}

      {articleSideBarMovil && (
        <React.Fragment>
          <div
            className="side__bar__background__movil"
            onClick={() => setArticleSideBarMovil(false)}
          />

          <div className="article__side__bar__movil">
            <h2 onClick={() => navigate("/articles/burnout")}>
              {lenguage === "español"
                ? "SINDROME DEL TRABAJADOR QUEMADO"
                : "BURNOUT"}
            </h2>
            <h2 onClick={() => navigate("/articles/sleep_disorder")}>
              {lenguage === "español"
                ? "TRANSTORNO DEL SUEÑO"
                : "SLEEP DISORDER"}
            </h2>
            <h2 onClick={() => navigate("/articles/bipolar_disorder")}>
              {lenguage === "español"
                ? "TRANSTORNO DE BIPOLARIDAD"
                : "BIPOLAR DISORDER"}
            </h2>
            <h2 onClick={() => navigate("/articles/anxiety")}>
              {lenguage === "español"
                ? "TRANSTORNO DE BIPOLARIDAD"
                : "BIPOLAR DISORDER"}
            </h2>
            <h2 onClick={() => navigate("/articles/depresion")}>DEPRESION</h2>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ArticleBarMovil;
