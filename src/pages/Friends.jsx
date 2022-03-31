import React, { useContext, useState } from "react";
import NavBar from "../Components/Navbar";

import "../style/StyleSolicitudes.css";
import { useMutation, useQuery } from "@apollo/client";
import { SHOW_FRIENDS } from "../graphql/queries";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";
import { DELETE_FRIEND, REPORT_USER } from "../graphql/mutations";
import ConfirmationModal from "../Components/ConfirmationModal";
import { LenguageContext } from "../context/Lengauge";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Friends = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(SHOW_FRIENDS);

  const { lenguage } = useContext(LenguageContext);

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  const navigate = useNavigate();

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: userId,
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

  const [deleteFriend] = useMutation(DELETE_FRIEND, {
    variables: {
      userId: friendId,
    },

    onCompleted() {
      window.location.reload();
    },

    onError: (err) => {
      //   localStorage.removeItem("jwtToken");
      //   navigate("/login");
      //   window.location.reload();
    },
  });

  const handleReportUser = (input) => {
    setUserId(input);

    setOpen(true);
  };

  const handleDeleteFriend = (input) => {
    setFriendId(input);

    setOpen2(true);
  };

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
        {lenguage === "español" ? "LISTA DE AMIGOS" : "FRIENDS LIST"}
      </h1>
      {data?.showFriends?.map((item) => {
        return (
          <React.Fragment>
            <div
              className="friend__request__container"
              style={{ border: ".5px solid violet" }}
            >
              <div className="friend__request__display">
                <p>
                  {user.id !== item?.friend1Id
                    ? item?.friend1Name
                    : item?.friend2Name}
                </p>
                <div className="friend__request__actions">
                  <button
                    onClick={() =>
                      handleReportUser(
                        user.id !== item.friend1Id
                          ? item.friend1Id
                          : item.friend2Id
                      )
                    }
                  >
                    {lenguage === "español" ? "REPORTAR" : "REPORT"}
                  </button>
                  <button>
                    {lenguage === "español" ? "IR A CHAT" : "GO TO CHAT"}
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteFriend(
                        user.id !== item.friend1Id
                          ? item.friend1Id
                          : item.friend2Id
                      )
                    }
                  >
                    {lenguage === "español"
                      ? "ELIMINAR DE AMIGOS"
                      : "DELETE FROM FRIENDS"}
                  </button>
                </div>
              </div>
            </div>
            <ConfirmationModal
              open={open}
              close={() => setOpen(false)}
              title={
                lenguage === "español" ? "REPORTAR USUARIO" : "REPORT USER"
              }
              message={
                lenguage === "español"
                  ? `¿ESTAS SEGURO QUE QUIERES REPORTAR A ${
                      user.id !== item?.friend1Id
                        ? item?.friend1Name
                        : item?.friend2Name
                    }?`
                  : `ARE YOU SURE YOU WANT TO REPORT ${
                      user.id !== item?.friend1Id
                        ? item?.friend1Name
                        : item?.friend2Name
                    }?`
              }
              action={reportUser}
            />
            <ConfirmationModal
              open={open2}
              close={() => setOpen2(false)}
              message={
                lenguage === "español"
                  ? `¿ESTAS SEGURO QUE QUIERES ELIMINAR DE TU LISTA DE AMIGOS A ${
                      user.id !== item?.friend1Id
                        ? item?.friend1Name
                        : item?.friend2Name
                    }?`
                  : `ARE YOU SURE YOU WANT TO REMOVE ${
                      user.id !== item?.friend1Id
                        ? item?.friend1Name
                        : item?.friend2Name
                    } FROM YOUR FRIENDS LIST?`
              }
              title={
                lenguage === "español" ? "ELIMINAR AMIGO" : "DELETE FRIEND"
              }
              action={deleteFriend}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Friends;
