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
            ? "ESTE TEST NO SIRVE PARA QUE TE AUTO RECETES, PORFAVOR RECUERDA QUE ESTOS RESULTADOS NO SON OFICIALES, SI CREES QUE NECESITAS AYUDA, VE A BUSCARLA SIN IMPORTAR EL RESULTADO DEL TEST"
            : "THIS TEST IS NOT USED FOR YOU TO SELF-RECEIVE YOURSELF, PLEASE REMEMBER THAT THESE RESULTS ARE NOT OFFICIAL, IF YOU THINK YOU NEED HELP, GO AND SEEK IT REGARDLESS OF THE TEST RESULT"
        }
        score={score}
        maxScore={18}
      />
    );

  return (
    <div>
      <NavBar />
      E
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
              ? "¿SUELES TENER SENTIMIENTOS PERSITENTES DE TRISTEZA, ANSIEDAD O VACIO?"
              : "DO YOU USE TO HAVE PERSITENT FEELINGS OF SADNESS, ANXIETY, OR EMPTINESS?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿SUELES TENER SENTIMIENTOS DE DESESPERANZA O PESIMISMO?"
              : "DO YOU USE TO HAVE FEELINGS OF DESPERANCY OR PASSIMISM?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿SUELES TENER SENTIMIENTOS DE IRRITABILIDAD, FRUSTRACION O INTRAQUILIDAD?"
              : "DO YOU USUALLY HAVE FEELINGS OF IRRITABILITY, FRUSTRATION OR INTRAQUILITY?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿SUELES TENER SENTIMIENTOS DE CULPABILIDAD, INUTILIDAD O IMPOTENCIA?"
              : "DO YOU USUALLY HAVE FEELINGS OF GUILT, WORTHLESSNESS, or HELPLESSNESS?"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS PERDIDO EL INTERES O PLACER EN TUS PASATIEMPOS O ACTIVIDADES?"
              : ""}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿ULTIMAMENTE HAS TENIDO FATIGA, DISNIMUCION DE ENERGIA O SENSACION DE QUE VAS MAS LENTO?"
              : "HAVE YOU LATELY LOST INTEREST OR PLEASURE IN YOUR HOBBIES OR ACTIVITIES?"}
          </Question>
          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿TIENES DIFICULTAD PARA CONCENTRARSE, RECORDAR O TOMAR DECISIONES?"
              : "DO YOU HAVE DIFFICULTY TO FOCUS, REMEMBER OR MAKE DECISIONS?"}
          </Question>
          <Question setQuestion={setAnswer8}>
            {lenguage === "español"
              ? "¿TIENES DIFICULTASD PARA DORMIR, TE DESPIERTAS MUY TEMPRANO O DUERMES DEMASIADO?"
              : "DO YOU HAVE DIFFICULTIES SLEEPING, DO YOU WAKE UP TOO EARLY OR DO YOU SLEEP TOO LONG?"}
          </Question>
          <Question setQuestion={setAnswer9}>
            {lenguage === "español"
              ? "¿HAS SENTIDO CAMBIOS EN EL APETITO?"
              : "HAVE YOU FEELED CHANGES IN THE APPETITE?"}
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

export default DepressionTest;
