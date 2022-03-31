import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import NavBar from "../Components/Navbar";
import "../style/StyleSolicitudes.css";

import { SHOW_FRIEND_REQUESTS } from "../graphql/queries";
import ConfirmationModal from "../Components/ConfirmationModal";
import {
  ACCEPT_FRIEND_REQUEST,
  DENNY_FRIEND_REQUEST,
} from "../graphql/mutations";
import Banned from "./Banned";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { LenguageContext } from "../context/Lengauge";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Solicitudes = () => {
  const { data, loading } = useQuery(SHOW_FRIEND_REQUESTS);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { lenguage } = useContext(LenguageContext);

  const friendRequestData = data?.showFriendRequests;

  const [requestData, setRequestData] = useState({
    senderId: "",
    senderName: "",
    receiverName: "",
  });

  const navigate = useNavigate();

  const [denny] = useMutation(DENNY_FRIEND_REQUEST, {
    variables: {
      senderId: requestData.senderId,
    },

    update(proxy) {
      const data = proxy.readQuery({
        query: SHOW_FRIEND_REQUESTS,
      });

      proxy.writeQuery({
        query: SHOW_FRIEND_REQUESTS,
        data: {
          showFriendRequests: data.showFriendRequests.filter(
            (p) => p.senderId !== requestData.senderId
          ),
        },
      });
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

  const [accept] = useMutation(ACCEPT_FRIEND_REQUEST, {
    variables: {
      senderId: requestData.senderId,
      senderName: requestData.senderName,
      receiverName: requestData.receiverName,
    },

    update(proxy) {
      const data = proxy.readQuery({
        query: SHOW_FRIEND_REQUESTS,
      });

      proxy.writeQuery({
        query: SHOW_FRIEND_REQUESTS,
        data: {
          showFriendRequests: data.showFriendRequests.filter(
            (p) => p.senderId !== requestData.senderId
          ),
        },
      });
    },

    onError: (err) => {
      // localStorage.removeItem("jwtToken");
      // navigate("/login");
      // window.location.reload();
    },
  });

  const handleDennyRequest = (senderId) => {
    setRequestData({
      senderId,
    });

    setOpen(true);
  };

  const handleAcceptRequest = (senderId, senderName, receiverName) => {
    setRequestData({
      senderId,
      senderName,
      receiverName,
    });

    setOpen2(true);
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center", color: "violet", marginTop: "10px" }}>
        {lenguage === "español" ? "SOLICITUDES DE AMISTAD" : "FRIENDS REQUESTS"}
      </h1>

      <p style={{ width: "70%", textAlign: "center", margin: "auto" }}>
        {lenguage === "español"
          ? "NO MOSTRAMOS LA INFORMACION DE LAS SOLICITUDES QUE MANDASTE PARA PROTEGER LA PRIVACIDAD DE NUESTROS USUARIOS, SI VES QUE NO AH SIDO ACEPTADA, NO TE PREOCUPES, ESO NO BAJA TU VALOR COMO PERSONA <3"
          : "WE DO NOT SHOW THE INFORMATION OF THE REQUESTS YOU SENT TO PROTECT THE PRIVACY OF OUR USERS, IF YOU SEE THAT IT HAS NOT BEEN ACCEPTED, DO NOT WORRY, THAT DOES NOT LOWER YOUR VALUE AS A PERSON <3"}
      </p>
      {friendRequestData?.map((item) => {
        return (
          <div className="friend__request__container" key={item.senderId}>
            <div
              className="friend__request__display"
              style={{ backgroundColor: "violet" }}
            >
              <p>
                {lenguage === "español"
                  ? "Contexto (" + item.requestContext + ")"
                  : "Context (" + item.requestContext + ")"}
              </p>

              <p className="date">{item.createdAt.substr(0, 10)}</p>
            </div>

            <div className="friend__request__display">
              <div className="friend__request_info">
                <p style={{ marginLeft: "20px" }}>{item.senderName}</p>
              </div>
              <div className="friend__request__actions">
                <button
                  onClick={() =>
                    handleAcceptRequest(
                      item.senderId,
                      item.senderName,
                      item.receiverName
                    )
                  }
                >
                  {lenguage === "español" ? "ACEPTAR" : "ACCEPT"}
                </button>
                <button onClick={() => handleDennyRequest(item.senderId)}>
                  {lenguage === "español" ? "RECHAZAR" : "DENNY"}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <ConfirmationModal
        open={open}
        close={() => setOpen(false)}
        title={
          lenguage === "español"
            ? "RECHAZAR SOLICITUD DE AMISTAD"
            : "DENNY FRIEND REQUEST"
        }
        message={
          lenguage === "español"
            ? "¿ESTAS SEGURO QUE QUIERES RECHAZAR LA SOLICITUD DE AMISTAD?"
            : "ARE YOU SURE YOU WANT TO DENNY THE FRIEND REQUEST?"
        }
        action={denny}
      />

      <ConfirmationModal
        open={open2}
        close={() => setOpen2(false)}
        title={
          lenguage === "español"
            ? "ACEPTAR SOLICITUD DE AMISTAD"
            : "ACCEPT FRIEND REQUEST"
        }
        message={
          lenguage === "español"
            ? "¿ESTAS SEGURO QUE QUIERES ACEPTAR LA SOLICITUD DE AMISTAD?"
            : "ARE YOU SURE YOU WANT TO ACCEPT THE FRIEND REQUEST?"
        }
        action={accept}
      />
    </div>
  );
};

export default Solicitudes;
