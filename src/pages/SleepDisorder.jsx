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
        SON AFECCIONES QUE PROVOCAN CAMBIOS EN LA FORMA DE DORMIR. NO SON UNA
        PATOLOGÍA GRAVE EN SI MISMA, PER TIENEN SERIAS IMPLICACIONES EN LA VODA
        DIARIA: AGOTAMIENTP DISICO, SUEÑO DIURNO, DIFICULTAD PARA CUMPLIR CON
        LAS OBLIGACIONES PREOFESIONALES FAMILIARES O SOCIALES
      </p>

      <br />

      <p>
        HAY MUCHOS TIPOS DE TRANSTORNOS DEL SUEÑO. A MENUDO, SE AGRUPAN EN
        CATEGORIAS QUE EXPLICAN POR QUE SUCEDEN O COMO TE AFECTAN. LOS
        TRANSTORNOS DEL USEÑO TAMBIEN SE PUEDEN CLASIFICAR DE ACUERDO CON LAS
        CONDUCTAS, LOS PROBLEMAS DE LOS CICLOS NATURALES DE SUEÑO Y VIGILIA, LOS
        PROBLEMAS RESPIRATORIOS , LA DIFICULTAD DE DORMIR O QUE TAN SOMNOLIENOT
        TE SIENTAS DURANTE EL DÍA
      </p>

      <br />

      <p>ESTOS SON ALGUNOS TIPOS COMUNES DE TRANSTORNOS DEL SUEÑO:</p>

      <br />

      <ul className="article__list">
        <li>
          INSOMIO: QUE SE LE DIFICULTA PARA CONCILIAR EL SUEÑO P PARA PERMANECER
          DORMIDO DURANTE LA NOCHE
        </li>

        <li>
          APNES DEL SUEÑO: QUE ES TENER PATRONES ANORMALES EN LA RESPIRACIÓN
          MIENTRAS ESTÁS DORMIDO. HAY VARIOS TIÓS DE APNEA DEL SUEÑO
        </li>

        <li>
          SINDROME DE LAS PIERNAS INQUIENTAS: UN TIPO DE TRANSTORNO DEL
          MOVIMIENTOS DEL SUEÑO. ESTE SINDROME, TAMBIEN LLAMADO ENFERMEDAD DE
          WILIS-EKBROM, CAUSA UNA SENSACION INCOMODA Y UNIMMPULSO DE MOVER LAS
          PIERNAS CUANDO ESTAS TRATANDO DE DORMIRTE
        </li>

        <li>
          MARCOLEPSIA: UNA AFECCION CARACTERIZADA POR SOMNOLENCIA EXTREMA
          DIURANTE EL DIA Y QUEDARTE DORMIDO REPENTINAMENTE SURANTE EL DIA
        </li>
      </ul>

      <br />

      <p>MAS INFORMACION EN: </p>

      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/sleep-disorders/symptoms-causes/syc-20354018">
        https://www.mayoclinic.org/es-es/diseases-conditions/sleep-disorders/symptoms-causes/syc-20354018
      </a>

      <br />
      <br />

      <a href="https://www.cun.es/enfermedades-tratamientos/enfermedades/trastornos-sueno">
        https://www.cun.es/enfermedades-tratamientos/enfermedades/trastornos-sueno
      </a>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>SLEEP DISORDER</h1>

      <p>
        THEY ARE CONDITIONS THAT CAUSE CHANGES IN THE WAY YOU SLEEP. THEY ARE
        NOT A SERIOUS PATHOLOGY IN ITSELF, BUT HAVE SERIOUS IMPLICATIONS ON
        DAIRY LIFE: DISIC EXHAUST, DAY SLEEP, DIFFICULTY TO COMPLY WITH THE
        PRE-OFFICIAL FAMILY OR SOCIAL OBLIGATIONS
      </p>

      <br />

      <p>
        THERE ARE MANY KINDS OF SLEEP DISORDERS. OFTEN, THEY ARE GROUPED IN
        CATEGORIES THAT EXPLAIN WHY THEY HAPPEN OR HOW THEY AFFECT YOU. THE
        SLEEP DISORDERS CAN ALSO BE CLASSIFIED ACCORDING TO THE BEHAVIORS, THE
        PROBLEMS OF THE NATURAL CYCLES OF SLEEP AND WATCH, THE RESPIRATORY
        PROBLEMS, DIFFICULTY SLEEPING OR SO SLEEPING YOU SIT DURING THE DAY
      </p>

      <br />

      <p>THESE ARE SOME COMMON TYPES OF SLEEP DISORDERS:</p>

      <br />

      <ul className="article__list">
        <li>
          INSOMIO: THAT IS HARD FOR YOU TO RECOVER THE SLEEP TO STAY ASLEEP
          THROUGH THE NIGHT
        </li>

        <li>
          SLEEP APNES: WHAT IT IS TO HAVE ABNORMAL BREATHING PATTERNS WHILE
          YOU'RE ASLEEP. THERE ARE SEVERAL TIMES OF SLEEP APNEA
        </li>

        <li>
          RESTLESS LEGS SYNDROME: A TYPE OF DISORDER OF THE SLEEP MOVEMENTS.
          THIS SYNDROME, ALSO CALLED WILIS-EKBROM, CAUSES AN UNCOMFORTABLE
          SENSATION AND AN IMPULSE TO MOVE THE LEGS WHEN YOU'RE TRYING TO SLEEP
        </li>

        <li>
          MARCOLEPSIA: A CONDITION CHARACTERIZED BY EXTREME DROWSINESS DURING
          THE DAY AND SUDDENLY FALLING ASLEEP DURING THE DAY
        </li>
      </ul>

      <br />

      <p>MORE INFORMATION IN: </p>

      <a href="https://www.healthline.com/health/sleep/disorders">
        https://www.healthline.com/health/sleep/disorders
      </a>

      <br />
      <br />

      <a href="https://medlineplus.gov/sleepdisorders.html">
        https://medlineplus.gov/sleepdisorders.html
      </a>
    </div>
  );
};

export default SleepDisorder;
