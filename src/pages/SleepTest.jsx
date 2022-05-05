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

const SleepTest = () => {
  const { lenguage } = useContext(LenguageContext);

  const [openModal, setOpenModal] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [answer1, setAnswer1] = useState({ value: 0, completed: false });
  const [answer2, setAnswer2] = useState({ value: 0, completed: false });
  const [answer3, setAnswer3] = useState({ value: 0, completed: false });
  const [answer4, setAnswer4] = useState({ value: 0, completed: false });
  const [answer5, setAnswer5] = useState({ value: 0, completed: false });
  const [answer6, setAnswer6] = useState({ value: 0, completed: false });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !answer1.completed ||
      !answer2.completed ||
      !answer3.completed ||
      !answer4.completed ||
      !answer5.completed ||
      !answer6.completed
    ) {
      setOpenModal(true);
      return;
    }

    setScore(
      answer1.value +
        answer6.value +
        answer2.value +
        answer3.value +
        answer4.value +
        answer5.value
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
            ? "Resultado de test de síntomas sobre trastorno de sueño"
            : "Result of test of symptoms about sleep disorder"
        }
        message={
          lenguage === "español"
            ? "Este test no sirve para que te auto recetes, por favor recuerda que estos resultados no son oficiales, si crees que necesitas ayuda, ve a buscarla sin importar el resultado del test."
            : "This test is not used for you to self-receive yourself, please remember that these results are not official, if you think you need help, go and seek it regardless of the test result."
        }
        score={score}
        maxScore={12}
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
            ? "TEST DE SINTOMAS SOBRE TRANSTORNO DE SUEÑO"
            : "SYMPTOM TEST ON SLEEP DISORDER"}
        </h1>
        <form onSubmit={submitHandler}>
          <Question setQuestion={setAnswer1}>
            {lenguage === "español"
              ? "¿Te es imposible conciliar el sueño?"
              : "Is it impossible to reconcile your sleep?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿Sueles despertarte temprano?"
              : "Do you use to wake up early?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿Sueles tener agotamiento físico?"
              : "Do you usually have physical exhaustion?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿Consideras que tienes bajo rendimiento?"
              : "Do you consider that you have low performance?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿Sueles tener sueño diurno?"
              : "Do you usually have day sleep?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿Sueles tener dificultad con las obligaciones profesionales, familiares o sociales?"
              : "Do you use to have difficulty with professional, family or social obligations?"}
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

export default SleepTest;
