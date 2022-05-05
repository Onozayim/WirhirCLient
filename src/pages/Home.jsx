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
          Wirhir es una red social que fue creada para darte un espacio donde
          puedas expresar tus emociones.
        </p>

        <p>
          Para mantener esta zona más segura para ti y los demás usuarios que te
          acompañaran, ten en cuenta que hay unas reglas que se tienen que
          seguir, las cuales son:
        </p>

        <br />

        <ul className="article__list">
          <li>Comentar siempre con respeto a los demás.</li>
          <li>No subir contenido pornográfico o sexual.</li>
          <li>No subir contenido que contengan violencia extrema.</li>
          <li>No acosar a los demás.</li>
        </ul>

        <br />
        <p>
          Sí ves a alguien que no esté cumpliendo estas reglas, puedes
          reportarlo.
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
          Wirhir is a social network that was created to give you a space where
          you can express your emotions.
        </p>

        <p>
          To keep this area safer for you and the other users that will
          accompany you, keep in mind that there are some rules that have to be
          follow, continue. Which are:
        </p>

        <br />

        <ul className="article__list">
          <li>Always comment with respect for others.</li>
          <li>Do not upload pornographic or sexual content.</li>
          <li>Do not upload content containing extreme violence.</li>
          <li>Do not harass anyone.</li>
        </ul>

        <br />
        <p>
          If you see someone who is not following these rules, you can report
          him/her
        </p>
      </div>
    </React.Fragment>
  );
};

export default Home;
