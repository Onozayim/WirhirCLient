// import React from 'react'

// const TestBarMovil = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default TestBarMovil

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LenguageContext } from "../context/Lengauge";
import "../style/ArticleStyle.css";

const TestBarMovil = () => {
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
            <h2 onClick={() => navigate("/tests/burnout")}>
              {lenguage === "español"
                ? "SINDROME DEL TRABAJADOR QUEMADO"
                : "BURNOUT"}
            </h2>
            <h2 onClick={() => navigate("/tests/sleep_disorder")}>
              {lenguage === "español" ? "SINDROME DEL SUEÑO" : "SLEEP DISORDER"}
            </h2>
            <h2 onClick={() => navigate("/tests/bipolar_disorder")}>
              {lenguage === "español"
                ? "TRANSTORNO DE BIPOLARIDAD"
                : "BIPOLAR DISORDER"}
            </h2>
            <h2 onClick={() => navigate("/tests/anxiety")}>
              {lenguage === "español" ? "ANXIETY" : "ANSIEDAD"}
            </h2>
            <h2 onClick={() => navigate("/tests/depresion")}>DEPRESION</h2>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TestBarMovil;
