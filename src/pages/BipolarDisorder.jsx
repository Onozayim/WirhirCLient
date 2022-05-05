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
        El trastorno bipolar antes denominado depresión maniaca, es una
        enfermedad mental que causa cambios extremos en el estado anímico que
        comprenden altos emocionales y bajos emocionales.
      </p>

      <br />

      <p>
        Los episodios de cambio en el estado de ánimo pueden ocurrir en raras
        ocasiones o muchas veces por año. Aunque la mayoría de las personas
        presenten síntomas emocionales entre los episodios, es posible que
        algunas no presenten ninguno.
      </p>

      <br />

      <p>
        Aunque el trastorno bipolar es una afección de por vida, puedes
        controlar los cambios en el estado de ánimo y otros síntomas siguiendo
        un plan de tratamiento. La mayoría de los casos se tratan con
        medicamentos y apoyo psicológico.
      </p>

      <br />

      <p>
        No se conocen la causa exacta del trastorno bipolar. Es probable que
        varios factores influyan en esta afección incluyendo la genética, la
        estructura y función del cerebro y su ambiente.
      </p>

      <br />

      <p>Mas información en: </p>

      <br />

      <a href="https://medlineplus.gov/spanish/bipolardisorder.html">
        https://medlineplus.gov/spanish/bipolardisorder.html
      </a>

      <br />

      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955">
        https://www.mayoclinic.org/es-es/diseases-conditions/bipolar-disorder/symptoms-causes/syc-20355955
      </a>

      <br />
      <br />
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>BIPOLAR DISORDER</h1>

      <p>
        The bipolar disorder, formerly called manic depression, is a mental
        illness that causes extreme changes in the mood that include emotional
        highs and emotional lows.
      </p>

      <br />

      <p>
        Episodes of change in mood may occur in rare occasions or many times per
        year. Although most people present emotional symptoms between the
        episodes, it is possible that some do not present any.
      </p>

      <br />

      <p>
        Although bipolar disorder is a lifetime condition, you can monitor
        changes in mood and other symptoms by following a treatment plan. Most
        cases are treated with medications and psychological support.
      </p>

      <br />

      <p>
        Although the bipolar disorder is a lifetime condition, you can monitor
        changes in mood and other symptoms by following a treatment plan. Most
        cases are treated with medication and psychological support.
      </p>

      <br />

      <p>More information in: </p>

      <br />

      <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder">
        https://www.nimh.nih.gov/health/topics/bipolar-disorder
      </a>

      <br />

      <a href="https://www.healthline.com/health/bipolar-disorder">
        https://www.healthline.com/health/bipolar-disorder
      </a>

      <br />
      <br />
    </div>
  );
};

export default BipolarDisorder;
