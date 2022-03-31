import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import SideBar from "../Components/ArticlesSideBar";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const Anxiety = () => {
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
      <h1>ANSIEDAD</h1>

      <p>
        LA ANSIEDAD ES UN SENTIMIENTO DE MIEDO, TEMOR E INQUIETUD. MPUEDE HACER
        QUE SUDES, TE SIENTAS INQUIETO, Y TENSO. PUYEDES SENTIRTE ANSIOSO CUANDO
        SE ENFRETA A UN PROBLEMA DIFICIL EN EL TRABAJO, ANTES DE TOMAR UN EXAMEN
        O ANTESDE TOMAR UNA DECISIN IMPORTANTE. LAS PERSONAS CON TRANSTORNOS DE
        ANSIEDAD. EL MIEDO NO ES TEMPORAL Y PUEDE SER ABRUMADORA
      </p>

      <br />

      <p>
        LOS TRANSTORNOS DE ANSIEDAD SON AFECCIONES EN LAS QUE LA ANSIEDAD NO
        DESAPARECE Y PUEDE EMPEORAR CON EL TIEMPO. LOS SINTOMAS PUEDEN
        INTERFERIR CON LAS ACTIVIDADES DIARIAS, COMO EL DESEMPEÑO EN EL TRABAJO,
        LA ESCUELA Y LAS RELACIONES ENTRE PERSONAS{" "}
      </p>

      <br />

      <p>HAY MUCHOS TIPOS DE TRANSTORNOS DE ANSIEDAD, POR EJEMPLO:</p>

      <ul className="article__list">
        <li>
          TRANSTORNO DE ANSIEDAD GENERALIZADA: LAS PERSONAS CON ESTE TRASNTORNO
          SE PREOCUPAN POR PROBLEMAS COMUNES COMO LAS SALUD, EL DINERO, LE
          TRABAJO Y LA FAMILIA. PERO SUS PREOCUPACIONES SON EXCESIVAS Y LAS
          TIENEN CASI TODOS LOS DIAS DURANTE AL MENOS 6 MESES
        </li>

        <li>
          TRANSTORNO DE PANICO: LAS PERSONAS CON TRANSTORNO DE PANICO SUFREN DE
          ATAQUES DE PANICO. ESTOS SON REPENTINOS Y REPETIDOS EN MOMENTOS DE
          MIEDO INTENSO SIN HABER UN PELIGRO APARENTE. LOS ATAQUES SE PRODUCEN
          RAPIDAMENTE Y PUEDEN DURAR VARIOS MINUTOS O MAS
        </li>

        <li>
          FOBIAS: LAS PERSONAS TIENEN UN MIEDO INTENSO A ALGO QUE PRESENTA POCO
          O NINGUN PELIGRO REAL, EL MIEDO PUEDE SER POR ARAÑAS, VOLAR IR A
          LUGARES CONCURRIDOS O ESTAR EN SITUACIONS SOCIALES (CONOCIDO COMO
          ANSIEDAD SOCIAL)
        </li>
      </ul>

      <br />

      <p>MAS INFORMACION EN:</p>

      <a href="https://medlineplus.gov/spanish/anxiety.html">
        https://medlineplus.gov/spanish/anxiety.html
      </a>
      <br />
      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961">
        https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961
      </a>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>ANXIETY</h1>

      <p>
        ANXIETY IS A FEELING OF FEAR AND CONCERN. IT MAKES YOU SWEAT, YOU FEEL
        RESTLESS, AND TIGHT. CAN YOU FEEL ANXIOUS WHEN FACING A DIFFICULT
        PROBLEM AT WORK, BEFORE TAKING AN EXAM OR BEFORE MAKING AN IMPORTANT
        DECISION. PEOPLE WITH DISORDERS OF ANXIETY. FEAR IS NOT TEMPORARY AND
        CAN BE OVERWHELMING
      </p>

      <br />

      <p>
        ANXIETY DISORDERS ARE CONDITIONS IN WHICH ANXIETY DOES NOT DISAPPEARS
        AND MAY GET WORSE OVER TIME. SYMPTOMS MAY INTERFERE WITH DAILY
        ACTIVITIES, SUCH AS WORK PERFORMANCE, THE SCHOOL AND RELATIONSHIPS
        BETWEEN PEOPLE
      </p>

      <br />

      <p>THERE ARE MANY TYPES OF ANXIETY DISORDERS, FOR EXAMPLE:</p>

      <ul className="article__list">
        <li>
          GENERALIZED ANXIETY DISORDER: PEOPLE WITH THIS DISORDER WORRY ABOUT
          COMMON PROBLEMS SUCH AS HEALTH, MONEY, YOU WORK AND FAMILY. BUT YOUR
          CONCERNS ARE EXCESSIVE AND THE THEY HAVE ALMOST EVERY DAY FOR AT LEAST
          6 MONTHS
        </li>

        <li>
          PANIC DISORDER: PEOPLE WITH PANIC DISORDER SUFFER FROM PANIC ATTACKS.
          THESE ARE SUDDENLY AND REPEATED IN MOMENTS OF INTENSE FEAR WITHOUT AN
          APPARENT DANGER. ATTACKS OCCUR QUICKLY AND MAY LAST SEVERAL MINUTES OR
          MORE
        </li>

        <li>
          PHOBIAS: PEOPLE HAVE AN INTENSE FEAR OF SOMETHING THAT PRESENTS LITTLE
          OR NO REAL DANGER, FEAR MAY BE FROM SPIDERS, FLY, GO TO CONCURRED
          PLACES OR BEING IN SOCIAL SITUATIONS (KNOWN AS SOCIAL ANXIETY)
        </li>
      </ul>

      <br />

      <p>MORE INFORMATION IN:</p>

      <a href="https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders">
        https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders
      </a>
      <br />
      <a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders">
        https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961
      </a>
    </div>
  );
};

export default Anxiety;
