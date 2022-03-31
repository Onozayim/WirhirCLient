import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

export const Home = () => {
  const { data } = useQuery(CHECK_IF_BANNED);
  const { lenguage } = useContext(LenguageContext);

  const banned = data?.checkIfBanned;

  if (banned) return <Banned />;

  return (
    <React.Fragment>
      <NavBar />

      {lenguage === "español" ? <SpanishHome /> : <EnglishHome />}
    </React.Fragment>
  );
};

const SpanishHome = () => {
  return (
    <React.Fragment>
      <h1 style={{ marginTop: "20px" }}>BIENVENIDO A WIRHIR!!</h1>

      <div className="text__container">
        <p>
          WIRHIR ES UNA RED SOCIAL QUE FUE CREADA PARA DARTE UN ESPACIO DONDE
          PUEDAS EXPRESAR TUS EMOCIONES, SIENTETE LIBRE Y NO TE PREOCUPES, NADIE
          PUEDE LEER TUS CONVERSACIONES O LO QUE PUBLICAS
        </p>

        <p>
          PARA MANTENER ESTA ZONA MAS SEGURA PARA TI Y LOS DEMAS USUARIOS QUE TE
          ACOMPAÑARAN, TEN EN CUENTA QUE HAY UNAS REGLAS QUE SE TIENEN QUE
          SEGUIR. LAS CUALES SON
        </p>

        <ul className="article__list">
          <li>COMENTAR SIEMPRE CON RESPETO A LOS DEMAS</li>
          <li>NO SUBIR CONTENIDO PORNOGRAFICO O SEXUAL</li>
          <li>NO SUBIR CONTENIDO QUE CONTENGAN VIOLENCIA EXTREMA</li>
          <li>NO ACOSAR A LOS DEMAS</li>
        </ul>

        <p>
          SI VES A ALGUIEN QUE NO ESTE CUMMPLIENDO ESTAS REGLAS, PUEDES
          REPORTARLO
        </p>
      </div>
    </React.Fragment>
  );
};

const EnglishHome = () => {
  return (
    <React.Fragment>
      <h1 style={{ marginTop: "20px" }}>WELCOME TO WIRHIR!!</h1>

      <div className="text__container">
        <p>
          WIRHIR IS A SOCIAL NETWORK THAT WAS CREATED TO GIVE YOU A SPACE WHERE
          YOU CAN EXPRESS YOUR EMOTIONS, FEEL FREE AND DO NOT WORRY, NO ONE CAN
          READ YOUR CONVERSATIONS OR WHAT YOU POST
        </p>

        <p>
          TO KEEP THIS AREA SAFER FOR YOU AND THE OTHER USERS THAT WILL
          ACCOMPANY YOU, KEEP IN MIND THAT THERE ARE SOME RULES THAT HAVE TO BE
          FOLLOW, CONTINUE. WHICH ARE
        </p>

        <ul className="article__list">
          <li>ALWAYS COMMENT WITH RESPECT FOR OTHERS</li>
          <li>DO NOT UPLOAD PORNOGRAPHIC OR SEXUAL CONTENT</li>
          <li>DO NOT UPLOAD CONTENT CONTAINING EXTREME VIOLENCE</li>
          <li>NO ACOSAR A LOS DEMAS</li>
        </ul>

        <p>
          IF YOU SEE SOMEONE WHO IS NOT FOLLOWING THESE RULES, YOU CAN REPORT
          HIM/HER
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
