import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import SideBar from "../Components/ArticlesSideBar";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import "../style/ArticleStyle.css";
import Banned from "./Banned";

const SleepDisorder = () => {
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
      <h1>TRANSTORNO DEL SUEÑO</h1>

      <p>
        Son afecciones que provocan cambios en la forma de dormir. No son una
        patología grave en sí misma, pero tienen serias implicaciones en la boda
        diaria: agotamiento físico, sueño diurno, dificultad para cumplir con
        las obligaciones profesionales familiares o sociales.
      </p>

      <br />

      <p>
        Hay muchos tipos de trastornos del sueño. A menudo, se agrupan en
        categorías que explican por qué suceden o como te afectan. Los
        trastornos del sueño también se pueden clasificar de acuerdo con las
        conductas, los problemas de los ciclos naturales de sueño y vigilia, los
        problemas respiratorios, la dificultad de dormir o que tan somnoliento
        te sientas durante el día.
      </p>

      <br />

      <p>Estos son algunos tipos comunes de transtornos del sueño:</p>

      <br />

      <ul className="article__list">
        <li>
          Insomnio: que se le dificulta para conciliar el sueño p para
          permanecer dormido durante la noche.
        </li>

        <li>
          Apnes del sueño: que es tener patrones anormales en la respiración
          mientras estás dormido. Hay varios tíos de apnea del sueño.
        </li>

        <li>
          Síndrome de las piernas inquietas: un tipo de trastorno del
          movimientos del sueño. Este síndrome, también llamado enfermedad de
          wilis-ekbrom, causa una sensación incomoda y un impulso de mover las
          piernas cuando estas tratando de dormirte.
        </li>

        <li>
          Narcolepsia: una afección caracterizada por somnolencia extrema
          durante el día y quedarte dormido repentinamente durante el día.
        </li>
      </ul>

      <br />

      <p>Mas información en: </p>

      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/sleep-disorders/symptoms-causes/syc-20354018">
        https://www.mayoclinic.org/es-es/diseases-conditions/sleep-disorders/symptoms-causes/syc-20354018
      </a>

      <br />

      <a href="https://www.cun.es/enfermedades-tratamientos/enfermedades/trastornos-sueno">
        https://www.cun.es/enfermedades-tratamientos/enfermedades/trastornos-sueno
      </a>

      <br />
      <br />
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>SLEEP DISORDER</h1>

      <p>
        They are conditions that cause changes in the way you sleep. They are
        not a serious pathology in itself, but have serious implications on
        dairy life: exhaust, day sleep, difficulty to comply with the
        pre-official family or social obligations.
      </p>

      <br />

      <p>
        There are many kinds of sleep disorders. Often, they are grouped in
        categories that explain why they happen or how they affect you. The
        sleep disorders can also be classified according to the behaviors, the
        problems of the natural cycles of sleep and watch, the respiratory
        problems, difficulty sleeping or so sleeping you sit during the day.
      </p>

      <br />

      <p>These are some common types of sleep disorders:</p>

      <br />

      <ul className="article__list">
        <li>
          Insomnia: that is hard for you to recover the sleep to stay asleep
          through the night.
        </li>

        <li>
          Sleep apnes: what it is to have abnormal breathing patterns while
          you're asleep. There are several times of sleep apnea.
        </li>

        <li>
          Restless legs syndrome: a type of disorder of the sleep movements.
          This syndrome, also called wilis-ekbrom, causes an uncomfortable
          sensation and an impulse to move the legs when you're trying to sleep.
        </li>

        <li>
          Narcolepsy: a condition characterized by extreme drowsiness during the
          day and suddenly falling asleep during the day.
        </li>
      </ul>

      <br />

      <p>More information in: </p>

      <a href="https://www.healthline.com/health/sleep/disorders">
        https://www.healthline.com/health/sleep/disorders
      </a>

      <br />

      <a href="https://medlineplus.gov/sleepdisorders.html">
        https://medlineplus.gov/sleepdisorders.html
      </a>

      <br />
      <br />
    </div>
  );
};

export default SleepDisorder;
