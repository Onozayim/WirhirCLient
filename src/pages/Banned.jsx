import React, { useContext } from "react";
import NavBar from "../Components/Navbar";
import { LenguageContext } from "../context/Lengauge";

const Banned = () => {
  const { lenguage } = useContext(LenguageContext);

  return (
    <div>
      <NavBar />

      {lenguage === "español" ? <SpanishBanned /> : <EnglishBanned />}
    </div>
  );
};

const SpanishBanned = () => {
  return (
    <React.Fragment>
      <div className="text__container">
        <h1>HAS SIDO BANEADO</h1>

        <p>
          DIFERENTES USUARIOS HAN CONSIDERADO QUE TU ACTIVIDAD EN ESTE SITIO FUE
          INADECUADA, POR LO QUE SE HA DECIDIDO BANEARTE DE TU CUENTA
        </p>
      </div>
    </React.Fragment>
  );
};

const EnglishBanned = () => {
  return (
    <React.Fragment>
      <div className="text__container">
        <h1>YOU HABE BEEN BANNED</h1>

        <p>
          DIFFERENT USERS HAVE CONSIDERED THAT YOUR ACTIVITY ON THIS SITE WAS
          INADEQUATE, SO IT HAS BEEN DECIDED TO BAN YOU FROM YOUR ACCOUNT
        </p>
      </div>
    </React.Fragment>
  );
};

export default Banned;
