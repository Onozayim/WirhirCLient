import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import ArticleBarMovil from "../Components/ArticleBarMovil";
import SideBar from "../Components/ArticlesSideBar";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import "../style/ArticleStyle.css";
import Banned from "./Banned";

const Articles = () => {
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
      <h1>ARTICULOS</h1>
      <p>
        Últimamente han sido años difíciles para muchas personas, con la
        pandemia se ha visto un incremente en los casos de diferentes
        enfermedades mentales, los casos de depresión grave y ansiedad
        aumentaron en un 28 y un 26 %.
      </p>

      <p>
        Aquí encontraras información básica sobre diferentes enfermedades
        mentales, así como links de artículos más completos para que puedas
        seguir leyendo.
      </p>

      <p>
        Sí leyendo sobre las diferentes enfermedades mentales encuentras algunas
        similitudes con el cómo te sientes, considera el ir con un experto como
        un psicólogo, no tiene nada de malo el pedir ayuda. y ellos te darán
        toda la ayuda que necesitas.
      </p>

      <p>
        Y por favor recuerda que en este sitio no se encuentra la verdad
        absoluta, la intención de este sitio no es el de darte un pronostico
        exacto, sino el de brindarte algo de ayuda para que te puedas conocer
        mejor, o sentirte mejor.
      </p>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>ARTICLES</h1>
      <p>
        Latest years have been difficult for many people, with the pandemic has
        been seen an increase in cases of different mental illnesses, cases of
        serious depression and anxiety increased by 28 and 26%.
      </p>

      <p>
        Here you will find basic information on different mental illnesses, as
        well as links to more complete articles, so you can keep reading.
      </p>

      <p>
        If reading about the different mental illnesses, you find some
        similarities with how you feel, consider going with an expert like a
        psychologist, there is nothing bad asking for help. And they will give
        you all the help you need.
      </p>

      <p>
        And please remember that the absolute truth is not found on this site,
        the intention of this site is not to give you an exact forecast, but of
        giving you some help, so you can know yourself better, or feel better.
      </p>
    </div>
  );
};

export default Articles;
