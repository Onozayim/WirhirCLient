import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Navbar";
import { AuthContext } from "../context/Auth";
import { UserCallNameContext } from "../context/CallName";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED, GET_RANDON_NAMES } from "../graphql/queries";
import { Backdrop, CircularProgress } from "@material-ui/core";
import "../style/CallsStyle.css";
import Banned from "./Banned";
import { ADD_RANDON_NAME } from "../graphql/mutations";
import { SocketContext } from "../context/SocketContext";
import { MediaContext } from "../context/MediaContext";

const CallsMenu = () => {
  const navigate = useNavigate();

  const context = useContext(UserCallNameContext);
  const { lenguage } = useContext(LenguageContext);
  const authContext = useContext(AuthContext);
  const callContext = useContext(MediaContext);

  const { data, loading } = useQuery(GET_RANDON_NAMES);

  const [addName] = useMutation(ADD_RANDON_NAME);

  const createRandomName = () => {
    let elements;
    let colors;

    if (lenguage === "español") {
      elements = [
        "Perro",
        "Gato",
        "Hamster",
        "Oso",
        "Leon",
        "Tigre",
        "Jaguar",
        "Pantera",
        "Zebra",
        "Jirafa",
      ];

      colors = [
        "Rojo",
        "Azul",
        "Verde",
        "Naranja",
        "Amarillo",
        "Rosa",
        "Blanco",
        "Negro",
      ];
    } else {
      elements = [
        "Dog",
        "Cat",
        "Hamster",
        "Bear",
        "Lion",
        "Tiger",
        "Jaguar",
        "Panther",
        "Zebra",
        "Giraffe",
      ];

      colors = [
        "Red",
        "Blue",
        "Green",
        "Orange",
        "Yellow",
        "Pink",
        "White",
        "Black",
      ];
    }

    let flag = true;
    let name;

    const date = new Date();

    const month = date.getUTCMonth();
    const day = date.getDate();
    const hour = date.getHours();

    const complement = month + day + hour + "";

    do {
      if (lenguage === "español") {
        name = `${elements[Math.floor(Math.random() * elements.length)]}_${
          colors[Math.floor(Math.random() * colors.length)]
        }_${Math.floor(Math.random() * 100000).toString()}_${complement}`;
      } else {
        name = `${colors[Math.floor(Math.random() * colors.length)]}_${
          elements[Math.floor(Math.random() * elements.length)]
        }_${Math.floor(Math.random() * 100000).toString()}_${complement}`;
      }

      data?.getAllRandonNames?.map((item) => {
        if (item.name === name) flag = false;
      });
    } while (!flag);

    addName({
      variables: {
        name: name,
      },
    });
    return name;
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <NavBar />
      <audio playsInline ref={callContext?.myVideo} muted></audio>

      <div className="calls__info__container">
        <p>
          {lenguage === "español"
            ? "LLAMADAS DE SOLO AUDIO CON UNA PERSONA ALEATORIA"
            : "ONLY AUDIO CALLS WITH A RANDOM PERSON"}
        </p>
      </div>

      <div className="calls__actions">
        {callContext.stream ? (
          <React.Fragment>
            <button
              className="calls__button"
              onClick={() => {
                navigate("/calls/server");
                context.setName(authContext.user.userName);
              }}
            >
              {lenguage === "español"
                ? "ENTRAR PUBLICAMENTE"
                : "ENTER PUBLICLY"}
            </button>
            <button
              className="calls__button"
              onClick={() => {
                navigate("/calls/server");
                context.setName(createRandomName());
              }}
            >
              {lenguage === "español"
                ? "ENTRAR ANONIMAMENTE"
                : "ENTER ANONYMOUSLY"}
            </button>
          </React.Fragment>
        ) : (
          <p
            style={{
              margin: "auto",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            {lenguage === "español"
              ? "TIENES QUE DAR PERMISO PARA ACCEDER A TU MICROFONO PARA ENTRAR A LAS LLAMADAS"
              : "YOU NEED TO GIVE PERMISION TO ACCESS YOUR MICROPHONE TO ENTER A CALL"}
          </p>
        )}

        <button
          className="calls__button"
          onClick={() => navigate("/calls/history")}
        >
          {lenguage === "español" ? "HISTORIAL DE LLAMADAS" : "CALLS HISTORY"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default CallsMenu;
