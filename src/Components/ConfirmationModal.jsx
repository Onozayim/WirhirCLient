import React, { useContext } from "react";
import { LenguageContext } from "../context/Lengauge";

const ConfirmationModal = ({ message, title, open, close, action }) => {
  const { lenguage } = useContext(LenguageContext);
  if (!open) return null;

  const confirmAction = () => {
    action();
    close();
  };
  return (
    <React.Fragment>
      <div className="overlay">
        <div className="confirmation__modal">
          <div className="modal__title">
            <h1>{title}</h1>
          </div>
          <hr />
          <p className="modal__message">{message}</p>
          <hr />
          <div className="modal__actions">
            <button className="conf__button__modal" onClick={close}>
              {lenguage === "español" ? "CANCELAR" : "CANCEL"}
            </button>
            <button className="conf__button__modal" onClick={confirmAction}>
              {lenguage === "español" ? "CONFIRMAR" : "CONFIRM"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmationModal;
