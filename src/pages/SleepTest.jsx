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
            ? "RESULTADO DE TEST DE SINTOMAS SOBRE TRANSTORNO DE SUEÑO"
            : "RESULT OF TEST OF SYMPTOMS ABOUT SLEEP DISORDER"
        }
        message={
          lenguage === "español"
            ? "ESTE TEST NO SIRVE PARA QUE TE AUTO RECETES, PORFAVOR RECUERDA QUE ESTOS RESULTADOS NO SON OFICIALES, SI CREES QUE NECESITAS AYUDA, VE A BUSCARLA SIN IMPORTAR EL RESULTADO DEL TEST"
            : "THIS TEST IS NOT USED FOR YOU TO SELF-RECEIVE YOURSELF, PLEASE REMEMBER THAT THESE RESULTS ARE NOT OFFICIAL, IF YOU THINK YOU NEED HELP, GO AND SEEK IT REGARDLESS OF THE TEST RESULT"
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
              ? "¿TE ES IMPOSIBLE CONCILIAR EL SUEÑO?"
              : "IS IT IMPOSSIBLE TO RECONCILE YOUR SLEEP?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿SUELES DESPERTARTE TEMPRANO?"
              : "DO YOU USE TO WAKE UP EARLY?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿SUELES TENER AGOTAMIENTO FISICO?"
              : "DO YOU USUALLY HAVE PHYSICAL EXHAUSTION?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿CONSIDERAS QUE TIENES BAJO RENDIMIENTO?"
              : "DO YOU CONSIDER THAT YOU HAVE LOW PERFORMANCE?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿SUELES TENER SUEÑO DIURNO?"
              : "DO YOU USUALLY HAVE DAY SLEEP?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿SUELES TENER DIFICULTAD CON LAS OBLIGACIONES PROFESIONALES, FAMILIARES O SOCIALES?"
              : "DO YOU USE TO HAVE DIFFICULTY WITH PROFESSIONAL, FAMILY OR SOCIAL OBLIGATIONS?"}
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

export default SleepTest;
