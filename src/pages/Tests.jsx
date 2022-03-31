import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import NavBar from "../Components/Navbar";
import TestBar from "../Components/TestBar";
import TestBarMovil from "../Components/TestBarMovil";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const Tests = () => {
  const { lenguage } = useContext(LenguageContext);

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;
  return (
    <div>
      <NavBar />

      <TestBar />
      <TestBarMovil />

      <div className="main__container">
        <h1>TESTS</h1>

        <p>
          {lenguage === "español"
            ? "EN ESTA SECCION VAS A ENCONTRAR DIFERENTES TESTS CON LOS SINTOMAS DE DIFERENTES ENFERMEDADES MENTALES"
            : "IN THIS SECCION YOU WILL FIND DIFERENTS TESTS ABOUT SINTOMS OF DIFERENT MENTAL ILLNESS"}
        </p>

        <br />

        <p>
          {lenguage === "español"
            ? "HAY QUE TENER EN CUENTA QUE LOS RESULTADOS NO SON OFICIALES, SI TE SIENTES MAL, LO MEJOR ES IR A VER A UN PROFESIONAL"
            : "YOU MUST BE TAKEN INTO ACCOUNT THAT THE RESULTS ARE NOT OFFICIAL, IF YOU FEEL BAD, IT IS BEST TO GO SEE A PROFESSIONAL"}
        </p>
      </div>
    </div>
  );
};

export default Tests;
