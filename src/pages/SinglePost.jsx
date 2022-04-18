import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import "../style/IndividualPost.css";
import NavBar from "../Components/Navbar";
import { GET_POST } from "../graphql/queries";
import { AuthContext } from "../context/Auth";
import { REPORT_USER } from "../graphql/mutations";
import ConfirmationModal from "../Components/ConfirmationModal";
import CreateDiscusionPost from "../Components/CreateDiscusionForm";
import Banned from "./Banned";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { LenguageContext } from "../context/Lengauge";
import { Backdrop, CircularProgress } from "@material-ui/core";

const SinglePost = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const { loading, data, refetch } = useQuery(GET_POST, {
    variables: {
      postId: params.postId,
    },

    onError: (err) => {
      setErr(err.message);
    },
  });

  const { lenguage } = useContext(LenguageContext);
  const context = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const post = data?.getPost;

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: post?.user,
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

  const handleClick = () => {
    refetch();
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
    <React.Fragment>
      <NavBar />
      <h1 className="post__title">
        {lenguage === "español" ? "DISCUSIONES" : "DISCUSIONS"}
      </h1>

      {err && (
        <h1 className="error__message">
          {lenguage === "español"
            ? "DISCUSION NO ENCONTRADA"
            : "DISCUSION NOT FOUND"}
        </h1>
      )}

      {post && (
        <div className="container">
          <div className="headerContainer">
            <h1>{post.title}</h1>

            <div className="postData">
              <p>{post.publicPublisher}</p>
              <p>{post.createdAt.substr(0, 10)}</p>
            </div>
          </div>

          <hr />

          <div className="body__container">
            <p>{post.body}</p>

            {post.image.filename && (
              <img
                src={`https://mighty-badlands-64956.herokuapp.com/Images/${post?.image?.filename}`}
                className="post__image"
              />
            )}
          </div>
          {context.user.id !== post?.user && (
            <div className="actions__container">
              <button onClick={() => setOpen2(true)}>
                {lenguage === "español" ? "REPORTAR" : "REPORT"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="btn__container">
        <button className="btn__post" onClick={() => setOpen(true)}>
          {lenguage === "español"
            ? "CREAR UNA DISCUSION"
            : "CREATE A DISCUSION"}
        </button>

        <button className="btn__post" onClick={handleClick}>
          {lenguage === "español"
            ? "VER OTRA DISCUSION"
            : "WATCH ANOTHER DISCUSION"}
        </button>

        {post && (
          <Link to={`/answers/${post.id}`}>
            <button className="btn__post">
              {lenguage === "español" ? "RESPONDER" : "RESPOND"}
            </button>
          </Link>
        )}
      </div>

      <CreateDiscusionPost open={open} close={() => setOpen(false)} />

      <ConfirmationModal
        open={open2}
        close={() => setOpen2(false)}
        title={
          lenguage === "español" ? "REPORTAR DISCUSION" : "REPORT DISCUSION"
        }
        message={
          lenguage === "español"
            ? "¿ESTAS SEGURO QUE QUIERES REPORTAR ESTA DISCUSION?"
            : "ARE YOU SURE YOU WANT TO REPORT THIS DISCUSION?"
        }
        action={reportUser}
      />
    </React.Fragment>
  );
};

export default SinglePost;
