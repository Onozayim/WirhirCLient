import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../Components/ErrorMdal";
import NavBar from "../Components/Navbar";
import Question from "../Components/Question";
import Result from "../Components/Result";
import TestBar from "../Components/TestBar";
import TestBarMovil from "../Components/TestBarMovil";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const BurnoutTest = () => {
  const { lenguage } = useContext(LenguageContext);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [result, showResult] = useState(false);
  const [score, setScore] = useState(0);

  const [answer1, setAnswer1] = useState({ value: 0, completed: false });
  const [answer2, setAnswer2] = useState({ value: 0, completed: false });
  const [answer3, setAnswer3] = useState({ value: 0, completed: false });
  const [answer4, setAnswer4] = useState({ value: 0, completed: false });
  const [answer5, setAnswer5] = useState({ value: 0, completed: false });
  const [answer6, setAnswer6] = useState({ value: 0, completed: false });
  const [answer7, setAnswer7] = useState({ value: 0, completed: false });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !answer1.completed ||
      !answer2.completed ||
      !answer3.completed ||
      !answer4.completed ||
      !answer5.completed ||
      !answer6.completed ||
      !answer7.completed
    ) {
      setOpenModal(true);
      return;
    }

    showResult(true);

    setScore(
      answer1.value +
        answer2.value +
        answer3.value +
        answer4.value +
        answer5.value +
        answer6.value +
        answer7.value
    );
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (result)
    return (
      <Result
        title={
          lenguage === "español"
            ? "RESULTADO DE TEST DE SINTOMAS SOBRE BURNOUT"
            : "RESULT OF BURNOUT SYMPTOMS TEST"
        }
        message={
          lenguage === "español"
            ? "ESTE TEST NO SIRVE PARA QUE TE AUTO RECETES, PORFAVOR RECUERDA QUE ESTOS RESULTADOS NO SON OFICIALES, SI CREES QUE NECESITAS AYUDA, VE A BUSCARLA SIN IMPORTAR EL RESULTADO DEL TEST"
            : "THIS TEST IS NOT USED FOR YOU TO SELF-RECEIVE YOURSELF, PLEASE REMEMBER THAT THESE RESULTS ARE NOT OFFICIAL, IF YOU THINK YOU NEED HELP, GO AND SEEK IT REGARDLESS OF THE TEST RESULT"
        }
        score={score}
        maxScore={14}
      />
    );

  return (
    <div>
      <NavBar />

      <TestBar />
      <TestBarMovil />

      <div className="main__container">
        <h1>
          {lenguage === "español"
            ? "TEST DE SINTOMAS SOBRE BURNOUT"
            : "SYMPTOM TEST ON BURNOUT"}
        </h1>

        <form onSubmit={submitHandler}>
          <Question setQuestion={setAnswer1}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS SENTIDO AGOTAMIENTO FISICO Y MENTAL?"
              : "HAVE YOU LATELY FEELING PHYSICAL AND MENTAL EXHAUSTION?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS NOTADO UN CAMBIO EN TU PERSONALIDAD, SIENDO MAS INDIFERENTE A LOS DEMAS?"
              : "HAVE YOU LATELY FEELING PHYSICAL AND MENTAL EXHAUSTION?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE VAS VISTO UN DESCENSO EN LA PRODUCTIVIDAD LABORAL Y HAS SENTIDO DESMOTIVACIÓN?"
              : "HAVE YOU LATELY SEEN A DECREASE IN LABOR PRODUCTIVITY AND HAVE YOU FEELED DEMOTATION?"}
          </Question>

          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS NOTADO UN AUMENTO DE DISTANCIA MENTAL CON RESPECTO AL TRABAJO, O SENTIMIENTOS NEGATIVOS O CINICOS CON RESPECTO AL TRABAJO"
              : "HAVE YOU LATELY NOTICED A INCREASED MENTAL DISTANCE FROM WORK, OR NEGATIVE OR CYNICAL FEELINGS REGARDING WORK?"}
          </Question>

          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS NOTADO UNA DISMINUCIÓN EN TU AUTOESTIMA?"
              : "HAVE YOU RECENTLY NOTICED A DECREASE IN YOUR SELF-ESTEEM?"}
          </Question>

          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS TENIDO DIFICULTAD PARA CONCENTRARTE?"
              : "HAVE YOU BEEN HAVING DIFFICULTY CONCENTRATING LATELY?"}
          </Question>

          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS TENIDO SENSACIÓN DE FRACASO E IMPOTENCIA?"
              : "HAVE YOU HAD A FEELING OF FAILURE AND IMPOTENCE LATELY?"}
          </Question>

          <button type="submit">
            {lenguage === "español" ? "ENVIAR" : "SEND"}
          </button>
        </form>
      </div>

      <ErrorModal
        title={"ERROR"}
        message={
          lenguage === "español"
            ? "ERROR, DEBES COMPLETAR EL FORMULARIO"
            : "ERROR, YOU MUST COMPLETE THE FORMULARY"
        }
        open={openModal}
        close={() => setOpenModal(false)}
        action={() => setOpenModal(false)}
        key={1}
      />
    </div>
  );
};

export default BurnoutTest;
