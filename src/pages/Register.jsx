import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth";
import { REGISTER_MUTATION } from "../graphql/mutations";
import "../style/ErrorsStyle.css";
import { LenguageContext } from "../context/Lengauge";

const Register = () => {
  const [registerInput, setRegister] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const { changeLenguage, lenguage } = useContext(LenguageContext);

  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [register] = useMutation(REGISTER_MUTATION, {
    update(proxy, { data }) {
      context.login(data.register);
      navigate("/");
    },
    onError(err) {
      try {
        setErrors(err?.graphQLErrors[0].extensions.errors);
      } catch (error) {
        return;
      }
    },
    variables: {
      registerInput: {
        userName: registerInput.userName,
        email: registerInput.email,
        password: registerInput.password,
        confirmPassword: registerInput.confirmPassword,
        lenguage: lenguage,
      },
    },
  });

  const changeHandler = (e) => {
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    register();

    console.log(context);
  };

  return (
    <React.Fragment>
      <div className="div__container">
        <h1 className="title">WIRHIR</h1>
        <form className="login__form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={
              lenguage === "español" ? "Nombre de usuario..." : "Username..."
            }
            className="input__form"
            onChange={changeHandler}
            name="userName"
          />
          <input
            type="text"
            placeholder={lenguage === "español" ? "Correo..." : "Email..."}
            className="input__form"
            onChange={changeHandler}
            name="email"
          />
          <input
            type="password"
            placeholder={
              lenguage === "español" ? "Contraseña..." : "Password..."
            }
            className="input__form"
            onChange={changeHandler}
            name="password"
          />
          <input
            type="password"
            placeholder={
              lenguage === "español"
                ? "Confirmar Contraseña..."
                : "Confirm password..."
            }
            className="input__form"
            onChange={changeHandler}
            name="confirmPassword"
          />
          <button className="btn__form" onClick={() => navigate("/register")}>
            {lenguage === "español" ? "CREAR UNA CUENTA" : "CREATE AN ACCOUNT"}
          </button>
          <a href="/login" className="label__form">
            {lenguage === "español"
              ? "¿Tienes cuenta? Inicia sesion"
              : "Dou you have an account? Login"}
          </a>
        </form>

        {Object.keys(errors).length > 0 && (
          <div className="error__messages">
            <ul className="error__list">
              {Object.values(errors).map((value) => {
                return <li key={value}>{value}</li>;
              })}
            </ul>
          </div>
        )}
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

export default Register;
