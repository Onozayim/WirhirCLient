import { useQuery } from "@apollo/client";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { GET_COMMENTS } from "../graphql/queries";
import "../style/AnswerPost.css";
import { ReplyContent } from "./ReplyContnet";
import { AuthContext } from "../context/Auth";
import CreateCommentForm from "./CreateCommentForm";
import { SHOW_PARTICIPANTS } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { REPORT_USER, SEND_FRIEND_REQUEST } from "../graphql/mutations";
import ConfirmationModal from "./ConfirmationModal";
import { LenguageContext } from "../context/Lengauge";
import { Box, CircularProgress } from "@material-ui/core";

const AnswerPost = ({ flag2, setFlag2, title }) => {
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [userId, setUserId] = useState("");
  const [err, setErr] = useState("");
  const [requestData, setData] = useState({
    senderName: "",
    receiverId: "",
    receiverName: "",
  });

  const context = useContext(AuthContext);
  const { lenguage } = useContext(LenguageContext);

  const { data: fetchAnswersData, loading: commentsLoading } = useQuery(
    GET_COMMENTS,
    {
      variables: {
        answeringId: params.postId,
      },

      onError: (err) => {
        setErr(err.message);
      },
    }
  );

  const { data, loading: participantsLoading } = useQuery(SHOW_PARTICIPANTS, {
    variables: {
      mainPostId: params.postId,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const answersData = fetchAnswersData?.getComments;

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      senderName: requestData.senderName,
      receiverId: requestData.receiverId,
      receiverName: requestData.receiverName,
      requestContext: "Discusion: " + title,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: userId,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const [flag, setFlag] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    data?.showParticipants.map((item) => {
      if (item.userId === context.user.id) {
        setFlag(false);
        setUserName(item.userName);
        return null;
      }
      return null;
    });
  }, [data, context.user.id]);

  const HandleFriendRequest = (receiverId, senderName, receiverName) => {
    setData({
      receiverId,
      senderName,
      receiverName,
    });

    setOpen2(true);
  };

  const HandleReportUser = (input) => {
    setUserId(input);

    setOpen3(true);
  };

  if (commentsLoading || participantsLoading) {
    return (
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={"30px"}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <React.Fragment>
      {/* {err && <h1 className="error__message">{err}</h1>} */}
      {answersData?.map((item) => {
        return (
          <React.Fragment>
            <div
              className="container"
              key={item.id}
              style={{ marginTop: "20px", width: "70%" }}
            >
              <div className="answer__info">
                <div className="headerContainer">
                  <div className="postData">
                    <p>{item.publicPublisher}</p>
                    <p>{item.createdAt.substr(0, 10)}</p>
                  </div>
                </div>
              </div>

              <p className="reply__content" style={{ marginLeft: "10px" }}>
                {lenguage === "español"
                  ? `RESPONDIENDO: ${item.answeringTo.body.substring(0, 10)}...`
                  : `ANSWERING: ${item.answeringTo.body.substring(0, 20)}...`}
              </p>
              <ReplyContent image={item.image.filename}>
                {item.body}
              </ReplyContent>

              <div className="answer__actions">
                {item.user !== context.user.id && (
                  <button onClick={() => HandleReportUser(item.user)}>
                    {lenguage === "español" ? "REPORTAR" : "REPORT"}
                  </button>
                )}
                {item.user !== context.user.id && (
                  <button
                    onClick={() =>
                      HandleFriendRequest(
                        item.user,
                        userName,
                        item.publicPublisher
                      )
                    }
                  >
                    {lenguage === "español"
                      ? "AGREGAR A AMIGOS"
                      : "ADD TO FRIENDS"}
                  </button>
                )}
                <button onClick={() => setOpen(true)}>
                  {lenguage === "español" ? "COMENTAR" : "COMMENT"}
                </button>
              </div>
            </div>

            <br />

            <CreateCommentForm
              open={open}
              close={() => setOpen(false)}
              mainPostId={params.postId}
              responding={item.body}
              postId={item.id}
              comments={answersData}
              flag2={flag2}
              setFlag2={() => setFlag2()}
              setRequestDataSender={setUserName}
            />

            {flag2 ? (
              <React.Fragment>
                <ConfirmationModal
                  open={open2}
                  close={() => setOpen2(false)}
                  title={"NO PUEDES MANDAR SOLICITUD DE AMISTAD"}
                  message={"PRIMERO TIENES QUE PARTICIPAR"}
                  action={() => setOpen2(false)}
                />
              </React.Fragment>
            ) : (
              <ConfirmationModal
                open={open2}
                close={() => setOpen2(false)}
                action={sendFriendRequest}
                title={"MANDAR SOLICITUD DE AMISTAD"}
                message={
                  "¿LE QUIERES MANDAR UNA SOLICITUD DE AMISAD A " +
                  requestData.receiverName +
                  "?"
                }
              />
            )}

            <ConfirmationModal
              open={open3}
              close={() => setOpen3(false)}
              title={"REPORTAR COMENTARIO"}
              message={"¿ESTÁS SEGURO QUE QUIERES REPORTAR ESTE COMENTARIO?"}
              action={reportUser}
            />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default AnswerPost;
