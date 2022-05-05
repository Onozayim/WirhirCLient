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
          Diferentes usuarios han considerado que tu actividad en este sitio fue
          inadecuada, por lo que se ha decidido banearte de tu cuenta.
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
          Different users have considered that your activity on this site was
          inadequate, so it has been decided to ban you from your account.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Banned;
