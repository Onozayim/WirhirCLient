import React, { useContext } from "react";
import { LenguageContext } from "../context/Lengauge";

const ErrorModal = ({ message, title, open, close }) => {
  const { lenguage } = useContext(LenguageContext);

  if (!open) return null;

  return (
    <React.Fragment>
      <div className="overlay" onClick={close}>
        <div className="confirmation__modal">
          <div className="modal__title">
            <h1>{title}</h1>
          </div>
          <hr />
          <p className="modal__message">{message}</p>
          <hr />
          <div className="modal__actions">
            <button
              className="conf__button__modal"
              onClick={close}
              style={{ width: "150px" }}
            >
              {lenguage === "español" ? "CANCELAR" : "CANCEL"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
