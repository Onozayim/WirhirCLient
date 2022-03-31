import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { GET_POST } from "../graphql/queries";
import AnswerPost from "../Components/AnswerPost";
import NavBar from "../Components/Navbar";
import { ReplyContent } from "../Components/ReplyContnet";
import "../style/AnswerPost.css";
import CreateCommentForm from "../Components/CreateCommentForm";
import ConfirmationModal from "../Components/ConfirmationModal";
import { REPORT_USER, SEND_FRIEND_REQUEST } from "../graphql/mutations";
import { SHOW_PARTICIPANTS } from "../graphql/queries";
import { AuthContext } from "../context/Auth";
import Banned from "./Banned";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { LenguageContext } from "../context/Lengauge";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Answers = () => {
  const paramas = useParams();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [err, setErr] = useState("");
  const [requestData, setData] = useState({
    senderName: "",
    receiverId: "",
    receiverName: "",
  });

  const { data: mainData, loading: postLoading } = useQuery(GET_POST, {
    variables: {
      postId: paramas.postId,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const { data, loading: participantsLoading } = useQuery(SHOW_PARTICIPANTS, {
    variables: {
      mainPostId: paramas.postId,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const lenguage = useContext(LenguageContext);

  const mainPost = mainData?.getPost;

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      senderName: requestData.senderName,
      receiverId: requestData.receiverId,
      receiverName: requestData.receiverName,
      requestContext: "Discusion: " + mainPost?.title.substring(0, 15),
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: mainPost?.user,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const [flag, setFlag] = useState(true);
  const [userName, setUserName] = useState("");

  const context = useContext(AuthContext);

  useEffect(() => {
    data?.showParticipants.map((item) => {
      if (item.userId === context.user.id) {
        setFlag(false);
        setUserName(item.userName);
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

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (postLoading || participantsLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <NavBar />
      <br />

      {err && <h1 className="error__title">{err}</h1>}

      {mainPost ? (
        <React.Fragment>
          <div
            className="container"
            style={{ height: "fit-content", marginTop: "45px" }}
          >
            <div className="headerContainer">
              <h1>{mainPost.title}</h1>
              <div className="postData">
                <p>{mainPost.publicPublisher}</p>
                <p>{mainPost.createdAt.substr(0, 10)}</p>
              </div>
            </div>

            <ReplyContent image={mainPost?.image?.filename}>
              {mainPost.body}
            </ReplyContent>

            <div
              className="actions__container"
              style={{ height: "fit-content" }}
            >
              {mainPost.user !== context.user.id && (
                <button onClick={() => setOpen3(true)}>
                  {lenguage.lenguage === "español" ? "REPORTAR" : "REPORT"}
                </button>
              )}

              {mainPost.user !== context.user.id && (
                <button
                  onClick={() =>
                    HandleFriendRequest(
                      mainPost.user,
                      userName,
                      mainPost.publicPublisher
                    )
                  }
                >
                  {lenguage.lenguage === "español"
                    ? "AGREGAR A AMIGOS"
                    : "ADD TO FRIENDS"}
                </button>
              )}

              <button onClick={() => setOpen(true)}>
                {lenguage.lenguage === "español" ? "COMENTAR" : "COMMENT"}
              </button>
            </div>
          </div>
        </React.Fragment>
      ) : lenguage.lenguage === "español" ? (
        <h1 className="error__title">DISCUSION NO ENCONTRADA</h1>
      ) : (
        <h1 className="error__title">DISCUSION NOT FOUND</h1>
      )}

      <CreateCommentForm
        open={open}
        close={() => setOpen(false)}
        mainPostId={paramas.postId}
        postId={paramas.postId}
        responding={mainPost?.body}
        setFlag2={() => setFlag(false)}
        flag2={flag}
        setRequestDataSender={setUserName}
      />

      <AnswerPost
        flag2={flag}
        setFlag2={() => setFlag(false)}
        title={mainPost?.title}
      />

      {flag ? (
        <React.Fragment>
          <ConfirmationModal
            open={open2}
            close={() => setOpen2(false)}
            title={
              lenguage.lenguage === "español"
                ? "YOU CAN'T SEND FRIEND REQUESTS"
                : "NO PUEDES MANDAR SOLICITUDES DE AMISTAD"
            }
            message={
              lenguage.lenguage === "español"
                ? "PRIMERO TIENES QUE PARTICIPAR"
                : "YOU NEED TO PARTICIPATE FIRST"
            }
            action={() => setOpen2(false)}
          />
        </React.Fragment>
      ) : (
        <ConfirmationModal
          open={open2}
          close={() => setOpen2(false)}
          action={sendFriendRequest}
          title={
            lenguage.lenguage === "español"
              ? "MANDAR SOLICITUD DE AMISTAD"
              : "SEND FRIEND REQUEST"
          }
          message={
            lenguage.lenguage === "español"
              ? `¿LE QUIERES MANDAR UNA SOLICITUD DE AMISTAD A ${mainPost?.publicPublisher}?`
              : `DOU YOU WANT TO SEND A FRIEND REQUEST TO ${mainPost?.publicPublisher}?`
          }
        />
      )}

      <ConfirmationModal
        open={open3}
        close={() => setOpen3(false)}
        title={
          lenguage.lenguage === "español"
            ? "REPORTAR COMENTARIO"
            : "REPORT COMMENT"
        }
        message={
          lenguage.lenguage === "español"
            ? "¿ESTAS SEGURO QUE QUIERES REPORTAR ESTE COMENTARIO?"
            : "ARE YOU SURE YOU WANT TO REPORT THIS COMMENT?"
        }
        action={reportUser}
      />
    </React.Fragment>
  );
};

export default Answers;
