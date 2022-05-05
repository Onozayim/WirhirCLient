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
        La depresión clínica es un trastorno del estado animoso en el cual los
        sentimientos de tristeza, perdida ira o frustración interfieren con la
        vida diaria durante un periodo de algunas semanas o más. La depresión
        puede suceder en personas de todas las edades.
      </p>

      <br />

      <p>Los tipos principales de depresión incluyen:</p>

      <br />

      <ul className="article__list">
        <li>
          Depresión mayor: sucede cuando los sentimientos de tristeza, perdida
          ira o frustración interfieren con la vida por semanas o periodos mas
          largos de tiempo.
        </li>

        <li>
          Trastorno depresivo persistente: se trata de un estado de animo
          depresivo que dura 2 años. A lo largo de ese periodo de tiempo, puede
          tener momentos de depresión mayor junto con épocas en las que síntomas
          son menos graves.
        </li>
      </ul>

      <br />

      <p>Otras formas comunes de depresión incluye: </p>

      <br />

      <ul className="article__list">
        <li>
          Depresión posparto: muchas mujeres se sienten algo deprimidas después
          de tener un bebe, pero la verdad depresión posparto es más grave e
          incluye los síntomas de la depresión mayor.
        </li>

        <li>
          Trastorno de depresión premenstrual (tdpm): síntomas que ocurren 1
          semana antes de la menstruación y desaparece después de menstruar.
        </li>

        <li>
          Trastorno afectivo estacional (tae), ocurre con mayor frecuencia
          durante las estaciones de otoño e invierno, y desparece durante la
          primavera y el verano, muy probablemente debido a la falta de luz
          solar.
        </li>

        <li>
          Depresión mayor con características psicóticas: sucede cuando una
          persona padece depresión con una falta de contacto con la realidad
          (psicosis).
        </li>
      </ul>

      <br />

      <p>Mas información en:</p>

      <br />

      <a href="https://medlineplus.gov/spanish/ency/article/003213.htm">
        https://medlineplus.gov/spanish/ency/article/003213.htm
      </a>
      <br />
      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/depression/symptoms-causes/syc-20356007">
        https://www.mayoclinic.org/es-es/diseases-conditions/depression/symptoms-causes/syc-20356007
      </a>

      <br />
      <br />
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>DEPRESSION</h1>

      <p>
        Clinical depression is a mood disorder in which feelings of sadness,
        lost anger or frustration interfere with the life for a period of a few
        weeks or more. The depression, it can happen in people of all ages.
      </p>

      <p>The main types of depression include:</p>

      <ul className="article__list">
        <li>
          Major depression: it happens when feelings of sadness, loss anger or
          frustration interfere with life for more weeks or periods long time.
        </li>

        <li>
          Persistent depressive disorder: it is a mood depressive that lasts 2
          years. Throughout that period of time, you can have moments of major
          depression together with times when you have symptoms that are less
          serious.
        </li>
      </ul>

      <br />

      <p>Other common forms of depression include: </p>

      <ul className="article__list">
        <li>
          Postpartum depression: many women feel some depressed after having a
          baby, but the true postpartum depression is more serious and includes
          the symptoms of major depression.
        </li>

        <li>
          Premenstrual depression disorder: symptoms that occur 1 week before
          menstruation and disappears after menstruation.
        </li>

        <li>
          Seasonal affective disorder: occurs more frequently during the autumn
          and winter seasons, and disappears during the spring and summer, very
          likely due to lack of light solar.
        </li>

        <li>
          Major depression with psychotic characteristics: it happens when a
          person suffers from depression with a lack of contact with reality
          (psychosis).
        </li>
      </ul>

      <br />

      <p>You can see more in:</p>

      <br />

      <a href="https://www.psychiatry.org/patients-families/depression/what-is-depression">
        https://www.psychiatry.org/patients-families/depression/what-is-depression
      </a>
      <br />
      <a href="https://www.nimh.nih.gov/health/topics/depression">
        https://www.nimh.nih.gov/health/topics/depression
      </a>

      <br />
      <br />
    </div>
  );
};

export default Depresion;
