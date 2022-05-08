import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Components/Navbar";
import { AuthContext } from "../context/Auth";
import { UserCallNameContext } from "../context/CallName";
import { LenguageContext } from "../context/Lengauge";
import { SocketContext } from "../context/SocketContext";
import { ADD_TO_HISTORY, SEND_FRIEND_REQUEST } from "../graphql/mutations";
import "../style/CallsStyle.css";
import { BsFillMicMuteFill, BsTelephoneXFill, BsMicFill } from "react-icons/bs";
import ConfirmationModal from "../Components/ConfirmationModal";
import { MediaContext } from "../context/MediaContext";

const CallsServer = ({ stream, myVideo }) => {
  const userContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const mediaContext = useContext(MediaContext);
  const userName = useContext(UserCallNameContext);

  const navigate = useNavigate();
  const { lenguage } = useContext(LenguageContext);
  const [muteMic, setMuteMic] = useState(false);

  const [open, setOpen] = useState(false);

  const date = new Date();

  const requestDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      senderName: socketContext.user.name,
      receiverId: socketContext.partner.id,
      receiverName: socketContext.partner.name,
      requestContext:
        lenguage === "español"
          ? "Llamada: " + requestDate
          : "Call: " + requestDate,
    },
  });

  const [addToHistory] = useMutation(ADD_TO_HISTORY, {
    variables: {
      userId: socketContext.partner.id,
      userName: socketContext.partner.name,
      name: socketContext.user.name,
    },
  });

  useEffect(() => {
    socketContext.connectToSocket(
      userContext.user.id,
      userName.userName || userName.name
    );
  }, []);

  useEffect(() => {
    if (socketContext.partner.id)
      addToHistory({
        onError: (err) => {
          navigate("/login");
          window.location.reload();
        },
      });
  }, [socketContext.partner.id]);

  const mute = () => {
    const videoTrack = mediaContext.stream
      .getTracks()
      .find((track) => track.kind === "audio");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setMuteMic(true);
    } else {
      videoTrack.enabled = true;
      setMuteMic(false);
    }
  };

  const leaveServer = () => {
    navigate("/calls");

    window.location.reload();
  };

  const endCall = () => {
    window.location.reload();
  };

  const handleOpenModal = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="call__server__container">
        <React.Fragment>
          {socketContext.user.socketId && (
            <React.Fragment>
              <p className="nombre__publico">
                {lenguage === "español"
                  ? `NOMBRE PUBLICO: ${socketContext.user.name}`
                  : `PUBLIC NAME: ${socketContext.user.name}`}
              </p>
              {socketContext.partner.partnerSocketID ? (
                <h1>{socketContext.partner.name}</h1>
              ) : (
                <h1>
                  {lenguage === "español"
                    ? "ESTAS EN LA SALA DE ESPERA"
                    : "YOU ARE ON THE WAITING ROOM"}
                </h1>
              )}

              <div className="call__server__actions__container">
                <button onClick={mute}>
                  {muteMic ? <BsFillMicMuteFill /> : <BsMicFill />}
                </button>
                <div style={{ width: "50px" }} />
                <button onClick={endCall}>
                  <BsTelephoneXFill />
                </button>
              </div>
            </React.Fragment>
          )}
          <audio playsInline ref={mediaContext?.myVideo} autoPlay muted></audio>

          {socketContext.partner.partnerSocketID && (
            <audio playsInline ref={socketContext.userVideo} autoPlay></audio>
          )}
        </React.Fragment>
      </div>
      {socketContext.call.isReceivedCall ? (
        <React.Fragment>
          {socketContext.partner.partnerSocketID &&
            !socketContext.callAccepted && (
              <button
                onClick={socketContext.answerCall}
                className="leave__server__button"
              >
                {lenguage === "español" ? "ACEPTAR LLAMADA" : "ACCEPT CALL"}
              </button>
            )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {socketContext.partner.partnerSocketID &&
            !socketContext.callAccepted && (
              <button
                onClick={() =>
                  socketContext.startCall(socketContext.partner.partnerSocketID)
                }
                className="leave__server__button"
              >
                {lenguage === "español" ? "EMPEZAR LLAMADA" : "START CALL"}
              </button>
            )}
        </React.Fragment>
      )}

      <ConfirmationModal
        open={open}
        close={handleOpenModal}
        action={sendFriendRequest}
        title={
          lenguage === "español"
            ? "MANDAR SOLICITUD DE AMISTAD"
            : "SEND FRIEND REQUEST"
        }
        message={
          lenguage === "español"
            ? `¿LE QUIERES MANDAR UNA SOLICITUD DE AMISTAD A ${socketContext.partner.name}?`
            : `DOU YOU WANT TO SEND A FRIEND REQUEST TO ${socketContext.partner.name}?`
        }
      />

      {socketContext.partner.partnerSocketID && (
        <button onClick={handleOpenModal} className="leave__server__button">
          {lenguage === "español"
            ? "MANDAR SOLICITD DE AMISTAD"
            : "SEND FRIEND REQUEST"}
        </button>
      )}

      <button onClick={leaveServer} className="leave__server__button">
        {lenguage === "español" ? "SALIR" : "EXIT"}
      </button>
    </React.Fragment>
  );
};

export default CallsServer;
