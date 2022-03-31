import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import SideBar from "../Components/ArticlesSideBar";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const Depresion = () => {
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
      <h1>DEPRESION</h1>

      <p>
        LA DEPRESION CLINICA ES UN TRANSTORNO DEL ESTADO ANIMOCO EN EL CUAL LOS
        SENTIMIENTOS DE TRISTEZA, PERDIAD IRA O FRUSTACION INTERFIEREN CON LA
        VIDA DIARA DURANTE UN PERIODO DE ALGUNAS SEMANAS O MAS. LA DEPRESION
        PUEDE SUCEDER EN PERSONAS DE TODAS LAS EDADES
      </p>

      <br />

      <p>LOS TIPOS PRINICPALES DE DEPRESION INCLUYEN</p>

      <ul className="article__list">
        <li>
          DEPRESION MAYOR: SUCEDE CUANDO LOS SENTIMIENTOS DE TRISTEZA, PERDIDA
          IRA O FRUSTACION INTERFIEREN CON LA VIDA POR SEMANAS O PERIODOS MAS
          LARGOS DE TIEMPO
        </li>

        <li>
          TRANSTORNO DEPRESIVO PERSISTENTE: SE TRATA DE UN ESTADO DE ANIMO
          DEPRESIVO QUE DURA 2 AÑOS. A LO LARGO DE ESE PERIODO DE TIEMPO, PUEDE
          TENER MOMMENTS DE DEPRESION MAYOR JUNTO CON EPOCAS EN LAS QUE SINTOMAS
          SON MENOS GRAVES
        </li>
      </ul>

      <br />

      <p>OTROS FORMAS COMUNES DE DEPRESION INCLUYE: </p>

      <ul className="article__list">
        <li>
          DEPRESION POSPARTO: MUCHAS MUJERES SE SIENTEN ALGO DEPRIMIDAS DESPUES
          DE TENER UN BEBE, PER LA VERDAD DEPRESION POSPARTO ES MAS GRAVE E
          INCLUYE LOS SINTOMAS DE LA DEPRESION MAYOR
        </li>

        <li>
          TRANSTORNO DE DEPRESION PREMENSTRUAL (TDPM): SINTOMAS QUE OCURREN 1
          SEMANA ANTES DE LA MENSTRUACION Y DESAPARECE DESPUES DE MENSTRUAR
        </li>

        <li>
          TRANSTORNO AFECTIVO ESTACIONAL (TAE), OCURRE CON MAYOR FRECUENCIA
          DURANTE LAS ESTACIONES DE OTOÑO E INVIERNO, Y DESPARECE DURANTE LA
          PRIMAVERA Y EL VREANO, MUYT PROBABLEMENTE DEBJIO A LA FALTA DE LUZ
          SOLAR
        </li>

        <li>
          DEPRESION MAYOR CON CARACTERISTICAS PSICOTICAS: SUCEDE CUANDO UNA
          PERSONA PADECE DEPRESION CON UN AFALTA DE CONTACTO CON LA REALIDAD
          (PSICOSIS)
        </li>

        <br />

        <p> PUEDES VER MAS EN:</p>

        <a href="https://medlineplus.gov/spanish/ency/article/003213.htm">
          https://medlineplus.gov/spanish/ency/article/003213.htm
        </a>
        <br />
        <a href="https://www.mayoclinic.org/es-es/diseases-conditions/depression/symptoms-causes/syc-20356007">
          https://www.mayoclinic.org/es-es/diseases-conditions/depression/symptoms-causes/syc-20356007
        </a>
      </ul>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>DEPRESSION</h1>

      <p>
        CLINICAL DEPRESSION IS A MOOD DISORDER IN WHICH FEELINGS OF SADNESS,
        LOST ANGER OR FRUSTATION INTERFERE WITH THE LIFE FOR A PERIOD OF A FEW
        WEEKS OR MORE. THE DEPRESSION IT CAN HAPPEN IN PEOPLE OF ALL AGES
      </p>

      <br />

      <p>THE MAIN TYPES OF DEPRESSION INCLUDE:</p>

      <ul className="article__list">
        <li>
          MAJOR DEPRESSION: IT HAPPENS WHEN FEELINGS OF SADNESS, LOSS ANGER OR
          FRUSTATION INTERFERE WITH LIFE FOR MORE WEEKS OR PERIODS LONG TIME
        </li>

        <li>
          PERSISTENT DEPRESSIVE DISORDER: IT IS A MOOD DEPRESSIVE THAT LASTS 2
          YEARS. THROUGHOUT THAT PERIOD OF TIME, YOU CAN HAVING MOMMENTS OF
          MAJOR DEPRESSION TOGETHER WITH TIMES WHEN YOU HAVE SYMPTOMS THAT ARE
          LESS SERIOUS
        </li>
      </ul>

      <br />

      <p>OTHER COMMON FORMS OF DEPRESSION INCLUDE: </p>

      <ul className="article__list">
        <li>
          POSTPARTUM DEPRESSION: MANY WOMEN FEEL SOME DEPRESSED AFTER HAVING A
          BABY, BUT THE TRUE POSTPARTUM DEPRESSION IS MORE SERIOUS AND INCLUDES
          THE SYMPTOMS OF MAJOR DEPRESSION
        </li>

        <li>
          PREMENSTRUAL DEPRESSION DISORDER: SYMPTOMS THAT OCCUR 1 WEEK BEFORE
          MENSTRUATION AND DISAPPEARS AFTER MENSTRUATION
        </li>

        <li>
          SEASONAL AFFECTIVE DISORDER: OCCURS MORE FREQUENTLY DURING THE AUTUMN
          AND WINTER SEASONS, AND DISAPPEARS DURING THE SPRING AND VREAN, VERY
          LIKELY DUE TO LACK OF LIGHT SOLAR
        </li>

        <li>
          MAJOR DEPRESSION WITH PSYCHOTIC CHARACTERISTICS: IT HAPPENS WHEN A
          PERSON SUFFERS FROM DEPRESSION WITH A LACK OF CONTACT WITH REALITY
          (PSYCHOSIS)
        </li>

        <br />

        <p>YOU CAN SEE MORE IN:</p>

        <a href="https://www.psychiatry.org/patients-families/depression/what-is-depression">
          https://www.psychiatry.org/patients-families/depression/what-is-depression
        </a>
        <br />
        <a href="https://www.nimh.nih.gov/health/topics/depression">
          https://www.nimh.nih.gov/health/topics/depression
        </a>
      </ul>
    </div>
  );
};

export default Depresion;
