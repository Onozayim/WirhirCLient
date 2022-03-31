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
        THE TERM BURNOUT REFERS TO WORK STRESS. THIS IS MANIFEST THROUGH A STATE
        OF PHYSICAL AND MENTAL EXHAUST, IT COMES TO ALTER THE PERSONALITY AND
        SELF-ESTEEM OF THE WORKER
      </p>

      <p>
        OTHER FACTORS MAY CONTRIBUTE TO THE SITUATION, SUCH AS TASKS AND
        DEMANDING EXTRALABORAL ACTIVITIES, CERTAIN PERSONALITY TRAITS LIKE
        PERFECTIONISM AND A STRESSFUL LIFESTYLE
      </p>

      <p>
        THIS SYNDROME CAN AFFECT ANYONE. BUT USUALLY HAVE TO AFFECT THOSE WHO
        HAVE JOBS THAT ARE PHYSICAL OR EMOTIONALLY STRESSING, LIKE NURSES,
        POLICE, ASSISTANTS SOCIAL ETC. OR TO PEOPLE WHO ARE GOING THROUGH A
        STRESSFUL TIME IN LIFE OR ARE YOU SUPPORTING A BEING THAT IS GOING
        THROUGH A STRESSING MOMENT
      </p>

      <p>MORE INFORMATION IN:</p>

      <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642">
        https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/burnout/art-20046642
      </a>
      <br />
      <br />
      <a href="https://www.webmd.com/mental-health/burnout-symptoms-signs">
        https://www.webmd.com/mental-health/burnout-symptoms-signs
      </a>
    </div>
  );
};

const ContenidoEnEspañol = () => {
  return (
    <div className="main__container">
      <h1>BURNOUT</h1>

      <p>
        EL TERMINO BURNOUT HACE REFERENCIA AL ESTRES LABORAL. ESTE SE MANIFIESTA
        A TRAVÉS DE UN ESTADO DE AGOTAMIENTO FISICO Y MENTAL LLEGA A ALTERAR LA
        PERSONALIDAD Y AUTOESTIMA DEL TRABAJADOR
      </p>

      <p>
        OTROS FACTROES PUEDEN CONTRIBUIR CON LA SITUACIÓN, COMO TAREAS Y
        ACTIVIDADES EXTRALABORALES EXIGENTES, CIERTOS RASGOS DE PERSONALIDAD
        COMO EL PERFECCIONISMO Y UN ESTILO DE VIDA ESTRESANTE
      </p>

      <p>
        ESTE SINDROME PUEDE AFECTAR A CUALQUIER PERSONA. PERO USUALMENTE TIENDE
        A AFECTAR A AQUELLAS QUE TIENEN TRABAJOS QUE SON FISICOS O
        EMOCIONALMENTE ESTRESANTES, COMO ANFERMEROS, POLICIAS, ASISTENTES
        SOCIALES ETC. O A PERSONAS QUE ESTÁN ATRAVESANDO UN MOMENTO ESTRESANTE
        EN LA VIDA O ESTAN APOYANDO A UN SER QUE ESTA PASANDO POR UN MOMENTO
        ESTRESANTE
      </p>

      <p>MAS INFORMACION EN:</p>

      <a href="https://ada.com/es/conditions/burnout/">
        https://ada.com/es/conditions/burnout/
      </a>
      <br />
      <br />
      <a href="https://www.quironprevencion.com/blogs/es/prevenidos/sintomas-sindrome-burnout-identificarlo">
        https://www.quironprevencion.com/blogs/es/prevenidos/sintomas-sindrome-burnout-identificarlo
      </a>
    </div>
  );
};

export default Burnout;
