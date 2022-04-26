import React, { useContext } from "react";

import SideBar from "../Components/ArticlesSideBar";
import "../style/ArticleStyle.css";
import NavBar from "../Components/Navbar";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import { LenguageContext } from "../context/Lengauge";
import Banned from "./Banned";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const BipolarDisorder = () => {
  const { lenguage } = useContext(LenguageContext);

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  return (
    <React.Fragment>
      <NavBar />

      <SideBar />

      <ArticleBarMovil />

      {lenguage === "español" ? <ContenidoEnEspañol /> : <ContentInEnglish />}
    </React.Fragment>
  );
};

const ContenidoEnEspañol = () => {
  return (
    <div className="main__container">
      <h1>TRANSTORNO DE BIPOLARIDAD</h1>

      <p>
        EL TRANSTORNO BIPOLAR ANTES DENOMINADO DEPRESIÓN MANIACA, ES UNA
        ENFERMEDAD MENTAL QUE CAUSA CAMBIOS EXTREMOS EN EL ESTADO ANIMICO QUE
        COMPRENDEN ELTOS EMOCIONALES Y BAJOS EMOCIONALES
      </p>

      <br />

      <p>
        LOS EPISODIOS DE CAMBIO EN EL ESTADO DE ANIMO PUEDEN OCURRIR EN RARAS
        OCASIONES O MUCHAS VECES POR AÑO. AUNQUE LA MAYORIA DE LASPERSONAS
        PRESENTEN SINTOMAS EMOCIONALERES ENTRE LOS EPISODIOS, ES POSIBLE QUE
        ALGUNAS NO PRESENTEN NINGUNO
      </p>

      <br />

      <p>
        AUNQUE EL TRANSTORNO BIPOLAR ES UN AFECCION DE POR VIDA, PUEDES
        CONTROLAR LOS CAMBIOS EN EL ESTADO DE ANIMO Y OTROS SINTOMAS SIGUIENDO
        UN PLAN DE TRATAMIENTO. LA MAYORIA DE LOS CASOS SE TRATAN CON
        MEDICAMENTEOS Y APOYO PSICOLOGICO
      </p>

      <br />

      <p>
        NO SE CONOCEN LA CUASA EXACTA DEL TRANSTORNO BIPOLAR. ES PROBABLE QUE
        VARIOS FACTORES INFLUYAN EN ESTA AFECCIÓN INCLUYENDO LA GENETICA, LA
        ESTRUCTURA Y FUNCION DEL CEREBRO Y SU AMBIENTE
      </p>

      <br />

      <p>MAS INFORMACION EN: </p>

      <a href="https://medlineplus.gov/spanish/bipolardisorder.html">
        https://medlineplus.gov/spanish/bipolardisorder.html
      </a>

      <br />

      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955">
        https://www.mayoclinic.org/es-es/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955
      </a>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>BIPOLAR DISORDER</h1>

      <p>
        THE BIPOLAR DISORDER FORMERLY CALLED MANIC DEPRESSION, IS A MENTAL
        ILLNESS THAT CAUSES EXTREME CHANGES IN THE MOOD THAT INCLUDE EMOTIONAL
        HIGHS AND EMOTIONAL LOWS
      </p>

      <br />

      <p>
        EPISODES OF CHANGE IN MOOD MAY OCCUR IN RARE OCCASIONS OR MANY TIMES PER
        YEAR. ALTHOUGH MOST PEOPLE PRESENT EMOTIONAL SYMPTOMS BETWEEN THE
        EPISODES, IT IS POSSIBLE THAT SOME DO NOT PRESENT ANY
      </p>

      <br />

      <p>
        ALTHOUGH BIPOLAR DISORDER IS A LIFETIME CONDITION, YOU CAN MONITOR
        CHANGES IN MOOD AND OTHER SYMPTOMS BY FOLLOWING A TREATMENT PLAN. MOST
        CASES ARE TREATED WITH MEDICATIONS AND PSYCHOLOGICAL SUPPORT
      </p>

      <br />

      <p>
        ALTHOUGH THE BIPOLAR DISORDER IS A LIFETIME CONDITION, YOU CAN MONITOR
        CHANGES IN MOOD AND OTHER SYMPTOMS BY FOLLOWING A TREATMENT PLAN. MOST
        CASES ARE TREATED WITH MEDICATION AND PSYCHOLOGICAL SUPPORT
      </p>

      <br />

      <p>MORE INFORMATION IN: </p>

      <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder">
        https://www.nimh.nih.gov/health/topics/bipolar-disorder
      </a>

      <br />

      <a href="https://www.healthline.com/health/bipolar-disorder">
        https://www.healthline.com/health/bipolar-disorder
      </a>
    </div>
  );
};

export default BipolarDisorder;
