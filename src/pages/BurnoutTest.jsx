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
            ? "Resultado de test de síntomas sobre síndrome de trabajador quemado"
            : "Result of burnout symptoms test"
        }
        message={
          lenguage === "español"
            ? "Este test no sirve para que te autorrecetes, por favor recuerda que estos resultados no son oficiales, si crees que necesitas ayuda, ve a buscarla sin importar el resultado del test."
            : "This test is not used for you to self-receive yourself, please remember that these results are not official, if you think you need help, go and seek it regardless of the test result."
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
              ? "¿Últimamente has sentido agotamiento físico y mental?"
              : "Have you lately feeling physical and mental exhaustion?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿Últimamente has notado un cambio en tu personalidad, siendo mas indiferente a los demás?"
              : "Últimamente has notado un cambio en tu personalidad, siendo mas indiferente a los demás?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿Últimamente vas visto un descenso en la productividad laboral y has sentido desmotivación?"
              : "Have you lately seen a decrease in labor productivity and have you felt denotation?"}
          </Question>

          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿Últimamente has notado un aumento de distancia mental con respecto al trabajo, o sentimientos negativos o cínicos con respecto al trabajo"
              : "Have you lately noticed an increased mental distance from work, or negative or cynical feelings regarding work?"}
          </Question>

          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿Últimamente has notado una disminución en tu autoestima?"
              : "Have you recently noticed a decrease in your self-esteem?"}
          </Question>

          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿Últimamente has tenido dificultad para concentrarte?"
              : "Have you been having difficulty concentrating lately?"}
          </Question>

          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿Últimamente has tenido sensación de fracaso e impotencia?"
              : "Have you had a feeling of failure and impotence lately?"}
          </Question>

          <button type="submit">
            {lenguage === "español" ? "ENVIAR" : "SEND"}
          </button>

          <br />
          <br />
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
