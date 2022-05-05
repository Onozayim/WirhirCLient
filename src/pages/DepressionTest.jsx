import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import ErrorModal from "../Components/ErrorMdal";
import NavBar from "../Components/Navbar";
import Question from "../Components/Question";
import Result from "../Components/Result";
import TestBar from "../Components/TestBar";
import TestBarMovil from "../Components/TestBarMovil";
import { LenguageContext } from "../context/Lengauge";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";

const DepressionTest = () => {
  const { lenguage } = useContext(LenguageContext);

  const [openModal, setOpenModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [answer1, setAnswer1] = useState({ value: 0, completed: false });
  const [answer2, setAnswer2] = useState({ value: 0, completed: false });
  const [answer3, setAnswer3] = useState({ value: 0, completed: false });
  const [answer4, setAnswer4] = useState({ value: 0, completed: false });
  const [answer5, setAnswer5] = useState({ value: 0, completed: false });
  const [answer6, setAnswer6] = useState({ value: 0, completed: false });
  const [answer7, setAnswer7] = useState({ value: 0, completed: false });
  const [answer8, setAnswer8] = useState({ value: 0, completed: false });
  const [answer9, setAnswer9] = useState({ value: 0, completed: false });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !answer1.completed ||
      !answer2.completed ||
      !answer3.completed ||
      !answer4.completed ||
      !answer5.completed ||
      !answer6.completed ||
      !answer7.completed ||
      !answer8.completed ||
      !answer9.completed
    ) {
      setOpenModal(true);
      return;
    }

    setScore(
      answer1.value +
        answer2.value +
        answer3.value +
        answer4.value +
        answer5.value +
        answer6.value +
        answer7.value +
        answer8.value +
        answer9.value
    );
    setShowResult(true);
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (showResult)
    return (
      <Result
        title={
          lenguage === "español"
            ? "RESULTADO DE TEST DE SINTOMAS SOBRE DEPRESION"
            : "RESULT OF DEPRESION SYMPTOMS TEST"
        }
        message={
          lenguage === "español"
            ? "Este test no sirve para que te auto recetes, por favor recuerda que estos resultados no son oficiales, si crees que necesitas ayuda, ve a buscarla sin importar el resultado del test."
            : "This test is not used for you to self-receive yourself, please remember that these results are not official, if you think you need help, go and seek it regardless of the test result."
        }
        score={score}
        maxScore={18}
      />
    );

  return (
    <div>
      <NavBar />

      <TestBar />
      <TestBarMovil />
      <div className="main__container">
        <form onSubmit={submitHandler}>
          <h1>
            {lenguage === "español"
              ? "TEST DE SINTOMAS SOBRE DEPRESION"
              : "SYMPTOM TEST ON DEPRESSION"}
          </h1>

          <Question setQuestion={setAnswer1}>
            {lenguage === "español"
              ? "¿Sueles tener sentimientos persistentes de tristeza, ansiedad o vacío?"
              : "Do you use to have persistent feelings of sadness, anxiety, or emptiness?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿Sueles tener sentimientos de desesperanza o pesimismo?"
              : "Do you use to have feelings of desperate or pessimism?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿Sueles tener sentimientos de irritabilidad, frustración o intranquilidad?"
              : "Do you usually have feelings of irritability, frustration or intranquility?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿Sueles tener sentimientos de culpabilidad, inutilidad o impotencia?"
              : "Do you usually have feelings of guilt, worthlessness, or helplessness?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿Últimamente has perdido el interés o placer en tus pasatiempos o actividades?"
              : "Have you lately lose interest in your hobbies?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿Últimamente has tenido fatiga, disminución de energía o sensación de que vas mas lento?"
              : "Have you lately lost interest or pleasure in your hobbies or activities? "}
          </Question>
          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿Tienes dificultad para concentrarse, recordar o tomar decisiones?"
              : "Do you have difficulty to focus, remember or make decisions?"}
          </Question>
          <Question setQuestion={setAnswer8}>
            {lenguage === "español"
              ? "¿Tienes dificultad para dormir, te despiertas muy temprano o duermes demasiado?"
              : "Do you have difficulties sleeping, do you wake up too early, or do you sleep too long?"}
          </Question>
          <Question setQuestion={setAnswer9}>
            {lenguage === "español"
              ? "¿Has sentido cambios en el apetito?"
              : "Have you felt changes in the appetite?"}
          </Question>

          <button type="submit">
            {lenguage === "español" ? "ENVIAR" : "SEND"}
          </button>

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

export default DepressionTest;
