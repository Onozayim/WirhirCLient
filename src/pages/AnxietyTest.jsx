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

const AnxietyTest = () => {
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
  const [answer10, setAnswer10] = useState({ value: 0, completed: false });
  const [answer11, setAnswer11] = useState({ value: 0, completed: false });
  const [answer12, setAnswer12] = useState({ value: 0, completed: false });

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
      !answer9.completed ||
      !answer10.completed ||
      !answer11.completed ||
      !answer12.completed
    ) {
      setOpenModal(true);
      return;
    }

    setScore(
      answer1.value +
        answer1.value +
        answer2.value +
        answer3.value +
        answer4.value +
        answer5.value +
        answer6.value +
        answer7.value +
        answer8.value +
        answer9.value +
        answer10.value +
        answer11.value
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
            ? "Resultado de test de sintomas sobre ansiedad"
            : "Result of anxiety symptoms tests"
        }
        message={
          lenguage === "español"
            ? "Este test no sirve para que te autorrecetes, por favor recuerda que estos resultados no son oficiales, si crees que necesitas ayuda, ve a buscarla sin importar el resultado del test."
            : "This test is not used for you to self-receive yourself, please remember that these results are not official, if you think you need help, go and seek it regardless of the test result."
        }
        score={score}
        maxScore={24}
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
              ? "TEST DE SINTOMAS SOBRE ANSIEDAD"
              : "SYMPTOM TEST ON ANXIETY"}
          </h1>
          <Question setQuestion={setAnswer1}>
            {lenguage === "español"
              ? "¿Sueles tener sensación de nerviosismo, agitación y tensión?"
              : "Do you use to have a sensation of nervosism, agitation and tension?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿Sueles tener sensación de peligro inminente, pánico o catástrofe?"
              : "Do you use to have a feeling of imminent danger, panic or catastrophe?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿Sueles tener aumento del ritmo cardiaco cuando estas preocupado de algo?"
              : "Do you usually have increased heart rate when you are worried?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿Sueles tener sensación de debilidad o cansancio constante?"
              : "Do you use to have a feeling of constant weakness or tiredness?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿Se te suele acelerar la respiración en momentos de preocupación?"
              : "Do you usually accelerate your breathing in moments of concern?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿Sueles tener sudoración?"
              : "Do you usually have sweating?"}
          </Question>
          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿Sueles tener temblores?"
              : "Do you usually have tremors?"}
          </Question>
          <Question setQuestion={setAnswer8}>
            {lenguage === "español"
              ? "¿Tienes problemas para concentrarse?"
              : "Do you have trouble focusing?"}
          </Question>
          <Question setQuestion={setAnswer9}>
            {lenguage === "español"
              ? "¿Sueles tener problemas para conciliar el sueño?"
              : "Do you use to have problems to recover your sleep?"}
          </Question>
          <Question setQuestion={setAnswer10}>
            {lenguage === "español"
              ? "¿Sueles tener problemas gastrointestinales?"
              : "Do you use to have gastrointestinal problems?"}
          </Question>
          <Question setQuestion={setAnswer11}>
            {lenguage === "español"
              ? "¿Tienes dificultades para controlar las preocupaciones?"
              : "Having difficulty controlling worries?"}
          </Question>
          <Question setQuestion={setAnswer12}>
            {lenguage === "español"
              ? "¿Tienes la necesidad de evitar las situaciones que te generan ansiedad?"
              : "Do you have the need to avoid anxiety situations?"}
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

export default AnxietyTest;
