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

const BipolarTest = () => {
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

    setScore(
      answer1.value +
        answer2.value +
        answer3.value +
        answer4.value +
        answer5.value +
        answer6.value +
        answer7.value
    );

    setShowResult(true);
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (showResult) {
    return (
      <Result
        title={
          lenguage === "español"
            ? "RESULTADO DE TEST DE SINTOMAS SOBRE TRANSTORNO BIPOLAR"
            : "RESULT OF BIPOLAR DISORDER SYMPTOMS TEST"
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
  }

  return (
    <div>
      <NavBar />

      <TestBar />
      <TestBarMovil />

      <div className="main__container">
        <form onSubmit={submitHandler}>
          <h1>
            {lenguage === "español"
              ? "TEST DE SINTOMAS SOBRE TRANSTORNO BIPOLAR"
              : "SYMPTOM TEST ON BIPOLAR DISORDER"}
          </h1>
          <Question setQuestion={setAnswer1}>
            {lenguage === "español"
              ? "¿SIENTES QUE TIENES UNANIMO INUSITADAMENTE ALTO?"
              : "DO YOU FEEL THAT YOU HAVE UNUSITALLY HIGH UNANIME?"}
          </Question>
          <Question setQuestion={setAnswer2}>
            {lenguage === "español"
              ? "¿TE HAS MOSTRADO IRRITABLE?"
              : "HAVE YOU BEEN IRRITABLE?"}
          </Question>
          <Question setQuestion={setAnswer3}>
            {lenguage === "español"
              ? "¿MANIFIESTAS MAYOR CONFIANZA EN TI MISMO?"
              : "DO YOU EXPRESS GREATER CONFIDENCE IN YOURSELF?"}
          </Question>
          <Question setQuestion={setAnswer4}>
            {lenguage === "español"
              ? "¿SUELES ESTAR MAS LOCUAZ?"
              : "DO YOU USUALLY TALK MORE THAN AVERAGE"}
          </Question>
          <Question setQuestion={setAnswer5}>
            {lenguage === "español"
              ? "¿TE DISTRAES FACILMENTE?"
              : "ARE YOU DISTURBED EASILY?"}
          </Question>
          <Question setQuestion={setAnswer6}>
            {lenguage === "español"
              ? "¿CARECES DE CRITERIO?"
              : "DO YOU HAVE LACK OF CRITERION?"}
          </Question>
          <Question setQuestion={setAnswer7}>
            {lenguage === "español"
              ? "¿SOLO REQUIERES DE POCAS HORAS DE SUEÑO?"
              : "DO YOU ONLY REQUIRE A FEW HOURS OF SLEEP?"}
          </Question>

          <button type="submit">
            {lenguage === "españo" ? "ENVIAR" : "SEND"}
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

export default BipolarTest;
