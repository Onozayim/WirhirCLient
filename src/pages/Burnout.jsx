import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import SideBar from "../Components/ArticlesSideBar";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const Burnout = () => {
  const { lenguage } = useContext(LenguageContext);

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  return (
    <div>
      <React.Fragment>
        <NavBar />

        <SideBar />
        <ArticleBarMovil />

        {lenguage === "español" ? <ContenidoEnEspañol /> : <ContentInEnglish />}
      </React.Fragment>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>BURNOUT</h1>

      <p>
        The term burnout refers to work stress. This is manifest through a state
        of physical and mental exhaust, it comes to alter the personality and
        self-esteem of the worker.
      </p>

      <br />

      <p>
        Other factors may contribute to the situation, such as tasks and
        demanding extrafloral activities, certain personality traits like
        perfectionism and a stressful lifestyle.
      </p>

      <br />
      <p>
        This syndrome can affect anyone. But usually have to affect those who
        have jobs that are physical or emotionally stressing, like nurses,
        police, assistants social etc. Or to people who are going through a
        stressful time in life or are you supporting a being that is going
        through a stressing moment.
      </p>

      <br />
      <p>More information in:</p>

      <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642">
        https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642
      </a>
      <br />
      <a href="https://www.webmd.com/mental-health/burnout-symptoms-signs">
        https://www.webmd.com/mental-health/burnout-symptoms-signs
      </a>

      <br />
      <br />
    </div>
  );
};

const ContenidoEnEspañol = () => {
  return (
    <div className="main__container">
      <h1>BURNOUT</h1>

      <p>
        El termino burnout hace referencia al estrés laboral. Este se manifiesta
        a través de un estado de agotamiento físico y mental llega a alterar la
        personalidad y autoestima del trabajador.
      </p>

      <br />

      <p>
        Otros factores pueden contribuir con la situación, como tareas y
        actividades extralaborales exigentes, ciertos rasgos de personalidad
        como el perfeccionismo y un estilo de vida estresante.
      </p>
      <br />
      <p>
        Este síndrome puede afectar a cualquier persona. Pero usualmente tiende
        a afectar a aquellas que tienen trabajos que son físicos o
        emocionalmente estresantes, como enfermeros, policías, asistentes
        sociales etc. O a personas que están atravesando un momento estresante
        en la vida o están apoyando a un ser que está pasando por un momento
        estresante.
      </p>
      <br />
      <p>Mas información en:</p>
      <br />
      <a href="https://ada.com/es/conditions/burnout/">
        https://ada.com/es/conditions/burnout/
      </a>
      <br />

      <a href="https://www.quironprevencion.com/blogs/es/prevenidos/sintomas-sindrome-burnout-identificarlo">
        https://www.quironprevencion.com/blogs/es/prevenidos/sintomas-sindrome-burnout-identificarlo
      </a>

      <br />
      <br />
    </div>
  );
};

export default Burnout;
