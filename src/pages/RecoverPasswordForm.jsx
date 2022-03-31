import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { LenguageContext } from "../context/Lengauge";
import { FORGOT_PASSWORD_EMAIL } from "../graphql/mutations";

const RecoverPasswordForm = () => {
  const { lenguage, changeLenguage } = useContext(LenguageContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [sendEmail] = useMutation(FORGOT_PASSWORD_EMAIL, {
    variables: {
      email: email,
      lenguage: lenguage,
    },

    onError: (err) => {
      setError(err.message);
      setMessage("");
    },

    onCompleted: (data) => {
      setMessage(data.forgetPassword);
      setError("");
    },
  });

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sendEmail();
  };

  return (
    <React.Fragment>
      <div className="div__container">
        <h1 className="title">WIRHIR</h1>
        <form className="login__form" onSubmit={submitHandler}>
          <p className="form__message">
            {lenguage === "español"
              ? "INGRESA TU CORREO, TE MANDAREMOS UN LINK PARA QUE RECUPERES TU CONTRASEÑA"
              : "GIVE US YOUR EMAIL, WE WILL SEND AN EMAIL TO RECOVER YOUR PASSWORD"}
          </p>
          <input
            type={"text"}
            placeholder={lenguage === "español" ? "Correo..." : "Email..."}
            className="input__form"
            name="email"
            onChange={onChangeHandler}
          />

          <button className="btn__form" type="submit">
            {lenguage === "español" ? "MANDAR CORREO" : "SEND EMAIL"}
          </button>
        </form>

        {message && <p className="validate__messages">{message}</p>}
        {error && <p className="error__messages">{error}</p>}
      </div>

      <div className="lenguage__container">
        <p className>
          {lenguage === "español" ? "IDIOMA: ESPAÑOL" : "LENGUAGE: ENGLISH"}
        </p>
        <div
          className="change__lenguage"
          onClick={() => {
            changeLenguage();
            window.location.reload();
          }}
        >
          {lenguage === "español" ? "CHANGE TO ENGLISH" : "CAMBIAR A ESPAÑOL"}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecoverPasswordForm;
