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
            ? "RESULTADO DE TEST DE SINTOMAS SOBRE ANSIEDAD"
            : "RESULT OF ANXIETY SYMPTOMS TESTS"
        }
        message={
          lenguage === "español"
            ? "ESTE TEST NO SIRVE PARA QUE TE AUTO RECETES, PORFAVOR RECUERDA QUE ESTOS RESULTADOS NO SON OFICIALES, SI CREES QUE NECESITAS AYUDA, VE A BUSCARLA SIN IMPORTAR EL RESULTADO DEL TEST"
            : "THIS TEST IS NOT USED FOR YOU TO SELF-RECEIVE YOURSELF, PLEASE REMEMBER THAT THESE RESULTS ARE NOT OFFICIAL, IF YOU THINK YOU NEED HELP, GO AND SEEK IT REGARDLESS OF THE TEST RESULT"
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
              ? "¿SUELES TENER SENSACION DE NERVIOSISMO, AGITACION Y TENSION?"
              : "DO YOU USE TO HAVE A SENSATION OF NERVOSISM, AGITATION AND TENSION?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿SUELES TENER SNESACION DE PELIGRO INMINENTE, PANICO O CATASTROFE?"
              : "DO YOU USE TO HAVE A FEELING OF IMMINENT DANGER, PANIC OR CATASTROPHE?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿SUELES TENER AUMENTO DEL RITMO CARDIACO CUANDO ESTAS PREOCUPADO DE ALGO?"
              : "DO YOU USUALLY HAVE INCREASED HEART RATE WHEN YOU ARE WORRY?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿SUELES TENER SENSACION DE DEBILIDAD O CANSANCIO CONSTANTE?"
              : "DO YOU USE TO HAVE A FEELING OF CONSTANt WEAKNESS OR TIREDNESS?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿SE TE SUELE ACELERAR LA RESPIRACION EN MOMENTOS DE PREOCUPACION?"
              : "DO YOU USUALLY ACCELERATE YOUR BREATHING IN MOMENTS OF CONCERN?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿SUELES TENER SUDORACION?"
              : "DO YOU USUALLY HAVE SWEATING?"}
          </Question>
          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿SUELES TENER TEMBLORES?"
              : "DO YOU USUALLY HAVE TREMORS"}
          </Question>
          <Question setQuestion={setAnswer8}>
            {lenguage === "español"
              ? "¿TIENES PROBLEMAS PARA CONCENTRARSE?"
              : "DO YOU HAVE TROUBLE FOCUSING?"}
          </Question>
          <Question setQuestion={setAnswer9}>
            {lenguage === "español"
              ? "¿SUELES TENER PROBLEMAS PARA CONCILIAR EL SUEÑO?"
              : "DO YOU USE TO HAVE PROBLEMS TO RECOVER YOUR SLEEP?"}
          </Question>
          <Question setQuestion={setAnswer10}>
            {lenguage === "español"
              ? "¿SUELES TENER PROBLEMAS GASTROINTENSINALES?"
              : "DO YOU USE TO HAVE GASTROINTENSINAL PROBLEMS?"}
          </Question>
          <Question setQuestion={setAnswer11}>
            {lenguage === "español"
              ? "¿TIENES DIFICULTADES PARA CONTROLAR LAS PREOCUPACIONES?"
              : "HAVING DIFFICULTY CONTROLLING WORRIES?"}
          </Question>
          <Question setQuestion={setAnswer12}>
            {lenguage === "español"
              ? "¿TIENES LA NECESIDAD DE EVITAR LAS SITUACIONES QUE TE GENERAN ANSIEDAD?"
              : "DO YOU HAVE THE NEED TO AVOID ANXIETY SITUATIONS?"}
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

export default AnxietyTest;
