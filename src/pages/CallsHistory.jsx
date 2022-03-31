import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import ConfirmationModal from "../Components/ConfirmationModal";
import NavBar from "../Components/Navbar";
import { AuthContext } from "../context/Auth";
import { LenguageContext } from "../context/Lengauge";
import { REPORT_USER, SEND_FRIEND_REQUEST } from "../graphql/mutations";
import { CHECK_IF_BANNED, GET_CALLS, GET_USER_INFO } from "../graphql/queries";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Banned from "./Banned";

const CallsHistory = () => {
  const context = useContext(AuthContext);
  const { lenguage } = useContext(LenguageContext);

  const [requestData, setRequestData] = useState({
    senderName: "",
    receiverId: "",
    receiverName: "",
    requestContext: "",
  });
  const [idToReport, setIdToReport] = useState("");
  const [openFriendRequest, setOpenFriendRequest] = useState(false);
  const [openReportUser, setOpenReportUser] = useState(false);

  const { data, loading } = useQuery(GET_CALLS);
  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      senderName: requestData.senderName,
      receiverId: requestData.receiverId,
      receiverName: requestData.receiverName,
      requestContext:
        lenguage === "español"
          ? "Llamada: " + requestData.requestContext
          : "Call: " + requestData.requestContext,
    },
  });
  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: idToReport,
    },
  });

  const handleFriendRequest = (
    _senderName,
    _receiverId,
    _receiverName,
    _day,
    _hour
  ) => {
    setOpenFriendRequest(true);

    setRequestData({
      senderName: _senderName,
      receiverId: _receiverId,
      receiverName: _receiverName,
      requestContext: _day + " - " + _hour,
    });
  };

  const handleReportUser = (_idToReport) => {
    setOpenReportUser(true);

    setIdToReport(_idToReport);
  };

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
    <React.Fragment>
      <NavBar />

      <div className="history__container">
        {data?.getCalls?.map((item, cont) => {
          return (
            <div className="history__element" key={cont}>
              <div className="history__data">
                <p>{item.partnerName}</p>
              </div>

              <div className="history__data">
                <p>{item.day}</p>
                <p>{item.hour}</p>
              </div>

              <div className="history__actions">
                <button
                  onClick={() =>
                    handleFriendRequest(
                      item.userName,
                      item.partnerId,
                      item.partnerName,
                      item.day,
                      item.hour
                    )
                  }
                >
                  {lenguage === "español"
                    ? "MANDAR SOLICITUD"
                    : "SEND FRIEND REQUEST"}
                </button>
                <button
                  onClick={() => {
                    handleReportUser(item.partnerId);
                  }}
                >
                  {lenguage === "español" ? "REPORTAR" : "REPORT"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmationModal
        action={sendFriendRequest}
        close={() => setOpenFriendRequest(false)}
        open={openFriendRequest}
        message={`Le quieres mandar una solicitud de amistad a ${requestData.receiverName} ?`}
        title={
          lenguage === "español"
            ? "MANDAR SOLICITUD DE AMISTAD"
            : "SEND FRIEND REQUEST"
        }
      />

      <ConfirmationModal
        action={reportUser}
        close={() => setOpenReportUser(false)}
        open={openReportUser}
        message={
          lenguage === "español"
            ? `¿QUIERES REPORTAR A ${requestData.receiverName} ?`
            : `DO YOU WANT TO REPORT ${requestData.receiverName}?`
        }
        title={lenguage === "español" ? "REPORTAR USUARIO" : "REPORT USER"}
      />
    </React.Fragment>
  );
};

export default CallsHistory;
