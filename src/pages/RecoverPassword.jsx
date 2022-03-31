import { useMutation } from "@apollo/client";
import jwt from "jsonwebtoken";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LenguageContext } from "../context/Lengauge";
import { RECOVER_PASSWORD } from "../graphql/mutations";
import "../style/RecoverPassword.css";

const RecoverPassword = () => {
  const { lenguage, changeLenguage } = useContext(LenguageContext);

  const [info, setInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useParams();
  let decodedToken = jwt.verify(token, "some very secret key");

  const [sendNewPassword] = useMutation(RECOVER_PASSWORD, {
    variables: {
      email: info.email,
      confirmEmail: decodedToken.email,
      password: info.password,
      confirmPassword: info.confirmPassword,
      lenguage: lenguage,
    },

    onError: (err) => {
      setError(err.message);
      setMessage("");
    },

    onCompleted: (data) => {
      setMessage(data.recoverPassword);
      setError("");
    },
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendNewPassword();
  };

  useEffect(() => {}, []);

  if (decodedToken.exp * 1000 < Date.now()) return <h1>LINK EXPIRED</h1>;

  return (
    <React.Fragment>
      <div className="div__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="title">
            {lenguage === "español"
              ? "RECUPERA TU CONTRASEÑA"
              : "RECOVER YOUR PASSWORD"}
          </h1>
          <input
            type="email"
            className="input__form"
            placeholder="email..."
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            className="input__form"
            placeholder="password..."
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            className="input__form"
            placeholder="Confirm password..."
            name="confirmPassword"
            onChange={handleChange}
          />
          <button className="btn__form" type="submit">
            {lenguage === "español" ? "RECUPERAR" : "RECOVER"}
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

export default RecoverPassword;
