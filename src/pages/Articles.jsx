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
        ULTIMAMENTE HAN SIDO AÑOS DIFICILES PARA MUCHAS PERSONAS, CON LA
        PANDEMIA SE HA VISTO UN INCREMENTE EN LOS CASOS DE DIFERENTES
        ENFERMEDADES MENTALES, LOS CASOS DE DEPRESION GRAVE Y ANSIEDAD
        AUMENTARON EN UN 28 Y UN 26 %
      </p>

      <p>
        AQUÍ ENCONTRARAS INFORMACION BASICA SOBRE DIFERENTES ENFERMEDADES
        MENTALES, ASÍ COMO LINKS DE ARTICULOS MAS COMPLETOS PARA QUE PUEDAS
        SEGUIR LEYENDO
      </p>

      <p>
        SI LEYENDO SOBRE LAS DIFERENTES ENFERMEDADES MENTALES ENCUNTRAS ALGUNAS
        SIMILITUDES CON EL COMO TE SIENTES, CONSIDERA EL IR CON UN EXPERTO COMO
        UN PSICOLOGO, NO TIENE NADA DE MALO EL PEDIR AYUDA. Y ELLOS TE DARAN
        TODA LA AYUDA QUE NECESITAS
      </p>

      <p>
        Y PORFAVOR RECUERDA QUE EN ESTE SITIO NO SE ENCUENTRA LA VERDAD
        ABSOLUTA, LA INTENCION DE ESTE SITIO NO ES EL DE DARTE UN PRONOSTICO
        EXACTO, SINO EL DE BRINDARTE ALGO DE AYUDA PARA QUE TE PUEDAS CONOCER
        MEJOR, O SENTIRTE MEJOR
      </p>
    </div>
  );
};

const ContentInEnglish = () => {
  return (
    <div className="main__container">
      <h1>ARTICLES</h1>
      <p>
        LATEST YEARS HAVE BEEN DIFFICULT FOR MANY PEOPLE, WITH THE PANDEMIC HAS
        BEEN SEEN AN INCREASE IN CASES OF DIFFERENT MENTAL ILLNESSES, CASES OF
        SERIOUS DEPRESSION AND ANXIETY INCREASED BY 28 AND 26%
      </p>

      <p>
        HERE YOU WILL FIND BASIC INFORMATION ON DIFFERENT MENTAL ILLNESSES, AS
        WELL AS LINKS TO MORE COMPLETE ARTICLES SO YOU CAN KEEP READING
      </p>

      <p>
        IF READING ABOUT THE DIFFERENT MENTAL ILLNESSES, YOU FIND SOME
        SIMILARITIES WITH HOW YOU FEEL, CONSIDER GOING WITH AN EXPERT LIKE A
        PSYCHOLOGIST, THERE IS NOTHING BAD ASKING FOR HELP. AND THEY WILL GIVE
        YOU ALL THE HELP YOU NEED
      </p>

      <p>
        AND PLEASE REMEMBER THAT THE ABSOULTE TRUTH IS NOT FOUND ON THIS SITE,
        THE INTENTION OF THIS SITE IS NOT TO GIVE YOU AN EXACT FORECAST, BUT OF
        GIVING YOU SOME HELP SO YOU CAN KNOW YOURSELF BETTER, OR FEEL BETTER
      </p>
    </div>
  );
};

export default Articles;
