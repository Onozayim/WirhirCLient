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
        La ansiedad es un sentimiento de miedo, temor e inquietud. Puede hacer
        que sudes, te sientas inquieto, y tenso. Puedes sentirte ansioso cuando
        se enfrenta a un problema difícil en el trabajo, antes de tomar un
        examen o antes de tomar una decisión importante. Las personas con
        trastornos de ansiedad. El miedo no es temporal y puede ser abrumadora.
      </p>

      <br />

      <p>
        Los trastornos de ansiedad son afecciones en las que la ansiedad no
        desaparece y puede empeorar con el tiempo. Los síntomas pueden
        interferir con las actividades diarias, como el desempeño en el trabajo,
        la escuela y las relaciones entre personas.
      </p>

      <br />

      <p>Hay muchos tipos de trastornos de ansiedad, por ejemplo:</p>

      <ul className="article__list">
        <li>
          Trastorno de ansiedad generalizada: las personas con este trastorno se
          preocupan por problemas comunes como la salud, el dinero, le trabajo y
          la familia. Pero sus preocupaciones son excesivas y las tienen casi
          todos los días durante al menos 6 meses.
        </li>

        <li>
          Trastorno de pánico: las personas con trastorno de pánico sufren de
          ataques de pánico. Estos son repentinos y repetidos en momentos de
          miedo intenso sin haber un peligro aparente. Los ataques se producen
          rápidamente y pueden durar varios minutos o mas.
        </li>

        <li>
          Fobias: las personas tienen un miedo intenso a algo que presenta poco
          o ningún peligro real, el miedo puede ser por arañas, volar ir a
          lugares concurridos o estar en situaciones sociales (conocido como
          ansiedad social).
        </li>
      </ul>

      <br />

      <p>Mas información en:</p>

      <a href="https://medlineplus.gov/spanish/anxiety.html">
        https://medlineplus.gov/spanish/anxiety.html
      </a>
      <br />
      <a href="https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961">
        https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961
      </a>

      <br />
      <br />
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>ANXIETY</h1>

      <p>
        Anxiety is a feeling of fear and concern. It makes you sweat, you feel
        restless, and tight. Can you feel anxious when facing a difficult
        problem at work, before taking an exam or before making an important
        decision. People with disorders of anxiety. Fear is not temporary and
        can be overwhelming.
      </p>

      <br />

      <p>
        Anxiety disorders are conditions in which anxiety does not disappear and
        may get worse over time. Symptoms may interfere with daily activities,
        such as work performance, the school and relationships between people.
      </p>

      <br />

      <p>There are many types of anxiety disorders, for example:</p>

      <br />

      <ul className="article__list">
        <li>
          Generalized anxiety disorder: people with this disorder worry about
          common problems such as health, money, your work and family. But you
          concerns are excessive, and they have almost every day for at least 6
          months.
        </li>

        <li>
          Panic disorder: people with panic disorder suffer from panic attacks.
          These are suddenly and repeated in moments of intense fear without an
          apparent danger. Attacks occur quickly and may last several minutes or
          more.
        </li>

        <li>
          Phobias: people have an intense fear of something that presents little
          or no real danger, fear may be from spiders, fly, go to concurred
          places or being in social situations (known as social anxiety).
        </li>
      </ul>

      <br />

      <p>More information in:</p>

      <br />

      <a href="https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders">
        https://my.clevelandclinic.org/health/diseases/9536-anxiety-disorders
      </a>
      <br />
      <a href="https://www.nimh.nih.gov/health/topics/anxiety-disorders">
        https://www.mayoclinic.org/es-es/diseases-conditions/anxiety/symptoms-causes/syc-20350961
      </a>

      <br />
      <br />
    </div>
  );
};

export default Anxiety;
