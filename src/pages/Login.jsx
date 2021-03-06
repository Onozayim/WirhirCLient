import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_WITH_GOOGLE, LOGIN__MUTATION } from "../graphql/mutations";
import { AuthContext } from "../context/Auth";
import { GoogleLogin } from "react-google-login";
import "../style/ErrorsStyle.css";
import { FcGoogle } from "react-icons/fc";
import { LenguageContext } from "../context/Lengauge";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { lenguage, changeLenguage } = useContext(LenguageContext);
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [login] = useMutation(LOGIN__MUTATION, {
    update(proxy, { data }) {
      context.login(data.login);
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
      email: values.email,
      password: values.password,
      lenguage: lenguage,
    },
  });

  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE, {
    update(proxy, { data }) {
      context.login(data.loginWithGoogle);
      navigate("/");
    },
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };

  const responseGoogle = (response) => {
    setValues({
      email: response.profileObj.email,
      password: "password:" + response.profileObj.googleId + "18300303",
    });

    loginWithGoogle({
      variables: {
        userName: response.profileObj.givenName,
        email: response.profileObj.email,
        password: "password:" + response.profileObj.googleId + "18300303",
      },
    });
  };

  const rejectGoogle = (response) => {
    setErrors(response);
  };

  return (
    <React.Fragment>
      <div className="div__container">
        <h1 className="title">WIRHIR</h1>
        <form className="login__form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={lenguage === "espa??ol" ? "Correo..." : "Email..."}
            className="input__form"
            onChange={changeHandler}
            name="email"
          />
          <input
            type="password"
            placeholder={
              lenguage === "espa??ol" ? "Contrase??a..." : "Password..."
            }
            className="input__form"
            onChange={changeHandler}
            name="password"
          />
          <button className="btn__form">
            {lenguage === "espa??ol" ? "Iniciar Sesion" : "Login"}
          </button>
          <a
            href="https://wirhir.netlify.app/password__form"
            className="label__form"
          >
            {lenguage === "espa??ol"
              ? "??Olvidaste tu Contrase??a?"
              : "Do you forget your password"}
          </a>
          <button className="btn__form" onClick={() => navigate("/register")}>
            {lenguage === "espa??ol" ? "CREAR UNA CUENTA" : "CREATE AN ACCOUNT"}
          </button>
          <GoogleLogin
            clientId="210172707100-ptc1rplt0v1timtsrq7shqmbmqedpqe3.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="btn__form"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ backgroundColor: "white", color: "black" }}
              >
                <FcGoogle style={{ fontSize: "20px" }} />
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={rejectGoogle}
            cookiePolicy="single_host_origin"
          />
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
          {lenguage === "espa??ol" ? "IDIOMA: ESPA??OL" : "LENGUAGE: ENGLISH"}
        </p>
        <div
          className="change__lenguage"
          onClick={() => {
            changeLenguage();
            window.location.reload();
          }}
        >
          {lenguage === "espa??ol" ? "CHANGE TO ENGLISH" : "CAMBIAR A ESPA??OL"}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
