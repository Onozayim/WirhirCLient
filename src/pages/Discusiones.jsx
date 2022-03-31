import React, { useContext, useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

import "../style/IndividualPost.css";
import NavBar from "../Components/Navbar";
import { GET_RANDOM_POST } from "../graphql/queries";
import { AuthContext } from "../context/Auth";
import { REPORT_USER, SAVE_DISCUSION } from "../graphql/mutations";
import ConfirmationModal from "../Components/ConfirmationModal";
import CreateDiscusionPost from "../Components/CreateDiscusionForm";
import { GET_USER_INFO } from "../graphql/queries";
import { CHECK_IF_BANNED } from "../graphql/queries";
import Banned from "./Banned";
import { LenguageContext } from "../context/Lengauge";
import { Backdrop, CircularProgress } from "@material-ui/core";

const server = process.env.SERVER;

const Discusiones = () => {
  const lengauge = useContext(LenguageContext);

  const { loading, data, refetch } = useQuery(GET_RANDOM_POST, {
    variables: {
      lenguage: lengauge.lenguage,
    },
  });

  const context = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const post = data?.getRandomPost;

  const navigate = useNavigate();

  const [updateUser] = useLazyQuery(GET_USER_INFO, {
    variables: {
      userId: context.user.id,
    },
  });

  const [saveDiscusion] = useMutation(SAVE_DISCUSION, {
    variables: {
      discusionId: post?.id,
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

  const [reportDiscusion] = useMutation(REPORT_USER, {
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
        {lengauge.lenguage === "español" ? "DISCUSIONES" : "DISCUSIONS"}
      </h1>

      {loading && <h1>LOADING...</h1>}

      {post && (
        <div className="container">
          <div className="headerContainer">
            <h1>{post.title}</h1>

            <div className="postData">
              <p>{post.publicPublisher}</p>
              <p>{post.createdAt.substr(0, 10)}</p>
            </div>
          </div>

          <div className="body__container">
            <p>{post.body}</p>
            {post.image.filename && (
              <img
                src={`https://${server}/Images/${post?.image?.filename}`}
                className="post__image"
              />
            )}
          </div>

          {context.user.id !== post.user && (
            <div className="actions__container">
              <button onClick={() => setOpen3(true)}>
                {lengauge.lenguage === "español" ? "REPORTAR" : "REPORT"}
              </button>
              <button onClick={() => setOpen2(true)}>
                {lengauge.lenguage === "español" ? "GUARDAR" : "SAVE"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="btn__container">
        <button className="btn__post" onClick={() => setOpen(true)}>
          {lengauge.lenguage === "español"
            ? "CREAR UNA DISCUSION"
            : "CREATE A DISCUSION"}
        </button>

        <button className="btn__post" onClick={handleClick}>
          {lengauge.lenguage === "español"
            ? "VER OTRA DISCUSION"
            : "WATCH OTHER DISCUSION"}
        </button>

        {post && (
          <Link to={`/answers/${post.id}`}>
            <button className="btn__post">
              {lengauge.lenguage === "español" ? "COMENTAR" : "COMMNENT"}
            </button>
          </Link>
        )}
      </div>

      <CreateDiscusionPost
        open={open}
        close={() => setOpen(false)}
        lenguage={lengauge.lenguage}
      />

      <ConfirmationModal
        open={open2}
        close={() => setOpen2(false)}
        title={"GUARDAR DISCUSION"}
        message={"ESTAS SEGURO QUE QUIERES GUARDAR ESTA DISCUSION"}
        action={saveDiscusion}
      />

      <ConfirmationModal
        open={open3}
        close={() => setOpen3(false)}
        title={"REPORTAR DISCUSION"}
        message={"ESTAS SEGURO QUE QUIERES REPORTAR ESTA DISCUSION"}
        action={reportDiscusion}
      />
    </React.Fragment>
  );
};

export default Discusiones;
