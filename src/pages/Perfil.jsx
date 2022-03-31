import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { GET_USER_INFO } from "../graphql/queries";
import NavBar from "../Components/Navbar";
import { AuthContext } from "../context/Auth";
import { GET_USER_STORIES } from "../graphql/queries";
import { GET_USER_POSTS } from "../graphql/queries";
import EditUserForm from "../Components/EditUserForm";
import "../style/Perfil.css";
import { DELETE_PROFILE, ONBOOK_STORY } from "../graphql/mutations";
import { ONBOOK_POST } from "../graphql/mutations";
import { DELETE_STORY } from "../graphql/mutations";
import { DELETE_POST } from "../graphql/mutations";
import { CHECK_IF_BANNED } from "../graphql/queries";
import ConfirmationModal from "../Components/ConfirmationModal";
import Banned from "./Banned";
import { LenguageContext } from "../context/Lengauge";
import { Backdrop, CircularProgress } from "@material-ui/core";

const server = process.env.SERVER;

const Perfil = () => {
  const context = useContext(AuthContext);
  const { lenguage } = useContext(LenguageContext);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [postId, setPostId] = useState(false);
  const [err, setErr] = useState("");

  const naviagte = useNavigate();

  const { data: storiesQuery, loading: storyLoading } =
    useQuery(GET_USER_STORIES);
  const { data: postsQuery, loading: postLoading } = useQuery(GET_USER_POSTS);
  const { data: userQuery, loading: userLoading } = useQuery(GET_USER_INFO, {
    variables: {
      userId: context.user.id,
    },

    onError: (err) => {
      console.log(err);
      setErr(err.message);
    },
  });

  const [onBookPost] = useMutation(ONBOOK_POST);
  const [onBookStory] = useMutation(ONBOOK_STORY);
  const [deleteStory] = useMutation(DELETE_STORY);
  const [deletePost] = useMutation(DELETE_POST);
  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    update() {
      context.logout();
    },
  });

  const userInfo = userQuery?.getUserInfo;
  const userStoriesInfo = storiesQuery?.getUserStories;
  const userPostsInfo = postsQuery?.getUserPosts;

  const handleOnBookPost = () => {
    onBookPost({
      variables: { postId },
      onCompleted() {
        window.location.reload();
      },

      onError: (err) => {
        localStorage.removeItem("jwtToken");
        naviagte("/login");
        window.location.reload();
        setErr(err.message);
      },
    });
  };

  const handleOnBookStory = () => {
    onBookStory({
      variables: {
        storyId: postId,
      },

      onCompleted() {
        window.location.reload();
      },

      onError: (err) => {
        localStorage.removeItem("jwtToken");
        naviagte("/login");
        window.location.reload();
      },
    });
  };

  const handleDeleteStory = () => {
    deleteStory({
      variables: {
        storyId: postId,
      },

      onCompleted() {
        window.location.reload();
      },

      onError: (err) => {
        localStorage.removeItem("jwtToken");
        naviagte("/login");
        window.location.reload();
        setErr(err.message);
      },
    });
  };

  const handleDeletePost = () => {
    deletePost({
      variables: {
        postId,
      },

      onCompleted() {
        window.location.reload();
      },

      onError: (err) => {
        localStorage.removeItem("jwtToken");
        naviagte("/login");
        window.location.reload();
        setErr(err.message);
      },
    });
  };

  const popModal2 = (e) => {
    setPostId(e);
    setOpen2(true);
  };

  const popModal3 = (e) => {
    setPostId(e);
    setOpen3(true);
  };

  const popModal4 = (e) => {
    setPostId(e);
    setOpen4(true);
  };

  const popModal5 = (e) => {
    setPostId(e);
    setOpen5(true);
  };

  const { data: bannData } = useQuery(CHECK_IF_BANNED);

  const banned = bannData?.checkIfBanned;

  if (banned) return <Banned />;

  if (userLoading || storyLoading || postLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <NavBar />

      {userInfo && (
        <React.Fragment>
          <div className="user__section">
            <img
              src={
                userInfo.profilePicture.filename
                  ? `https://mighty-badlands-64956.herokuapp.com/Images/${userInfo?.profilePicture?.filename}`
                  : `https://mighty-badlands-64956.herokuapp.com/Images/default.png`
              }
              alt=""
              className="user__image"
            />
            <h1 className="user__name">{userInfo.userName}</h1>
            <p className="user__biography">{userInfo.biography}</p>
            <br />
            <div className="user__post__actions">
              <button onClick={() => setOpen(true)}>
                {lenguage === "español" ? "EDITAR PERFIL" : "EDIT PROFILE"}
              </button>
              <button onClick={() => setOpen6(true)}>
                {lenguage === "español" ? "ELIMINAR PERFIL" : "DELETE PROFILE"}
              </button>
            </div>
          </div>

          {err && <li>{err}</li>}

          <div className="user__post__section">
            <h1>{lenguage === "español" ? "TUS HISTORIAS" : "YOUR STORIES"}</h1>
            {userStoriesInfo?.map((item) => {
              return (
                <React.Fragment>
                  <div className="user__post__section__info">
                    <div className="user__post__info">
                      <p>{item.title.substring(0, 10)}...</p>
                      <p>{item.createdAt.substr(0, 10)}</p>
                    </div>
                    <div className="user__post__actions">
                      <Link to={`/story/${item.id}`}>
                        <button>
                          {lenguage === "español" ? "VER" : "WATCH"}
                        </button>
                      </Link>
                      <button onClick={() => popModal2(item.id)}>
                        {lenguage === "español" ? "ELIMINAR" : "DELETE"}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {userInfo?.storiesSaved?.map((item) => {
              return (
                <React.Fragment>
                  <div className="user__post__section__info">
                    <div className="user__post__info">
                      <p>{item.title.substring(0, 10)}...</p>
                      <p>{item.createdAt.substr(0, 10)}</p>
                    </div>
                    <div className="user__post__actions">
                      <Link to={`/story/${item.id}`}>
                        <button>
                          {lenguage === "español" ? "VER" : "WATCH"}
                        </button>
                      </Link>
                      <button onClick={() => popModal3(item.id)}>
                        {lenguage === "español" ? "SACAR" : "TAKE OUT"}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="user__post__section">
            <h1>
              {lenguage === "español" ? "TUS DISCUSIONES" : "YOUR DISCUSIONS"}
            </h1>
            {userPostsInfo?.map((item) => {
              return (
                <React.Fragment>
                  <div className="user__post__section__info">
                    <div className="user__post__info">
                      <p>{item.title.substring(0, 10)}...</p>
                      <p>{item.createdAt.substr(0, 10)}</p>
                    </div>
                    <div className="user__post__actions">
                      <Link to={`/discusion/${item.id}`}>
                        <button>
                          {lenguage === "español" ? "VER" : "WATCH"}
                        </button>
                      </Link>
                      <button onClick={() => popModal4(item.id)}>
                        {lenguage === "español" ? "ELIMINAR" : "DELETE"}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {userInfo?.discusionsSaved?.map((item) => {
              return (
                <React.Fragment>
                  <div className="user__post__section__info">
                    <div className="user__post__info">
                      <p>{item.title.substring(0, 10)}...</p>
                      <p>{item.createdAt.substr(0, 10)}</p>
                    </div>
                    <div className="user__post__actions">
                      <Link to={`/discusion/${item.id}`}>
                        <button>
                          {lenguage === "español" ? "VER" : "WATCH"}
                        </button>
                      </Link>
                      <button onClick={() => popModal5(item.id)}>
                        {lenguage === "español" ? "SACAR" : "TAKE OUT"}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <br />

          <EditUserForm
            open={open}
            close={() => setOpen(false)}
            bio={userInfo.biography}
            userName={userInfo.userName}
          ></EditUserForm>

          <ConfirmationModal
            close={() => setOpen2(false)}
            open={open2}
            title={
              lenguage === "español" ? "ELIMINAR HISRORIA" : "DELETE STORY"
            }
            message={
              lenguage === "español"
                ? "¿ESTAS SEGURO QUE QUIERES ELIMINAR ESTA HISTORIA?"
                : "ARE YOU SURE YOU WANT TO DELETE THIS STORY?"
            }
            action={handleDeleteStory}
          />
          <ConfirmationModal
            close={() => setOpen3(false)}
            open={open3}
            title={
              lenguage === "español"
                ? "DEJAR DE GUARDAR HISTORIA"
                : "STOP SAVING STORY"
            }
            message={
              lenguage === "español"
                ? "ESTAS SEGURO QUE QUIERES DEJAR DE GUARDAR ESTA HISTORIA"
                : "ARE YOU SURE YOU WANT TO STOP SAVING THIS STORY"
            }
            action={handleOnBookStory}
          />
          <ConfirmationModal
            close={() => setOpen4(false)}
            open={open4}
            title={
              lenguage === "español"
                ? "ELIMINAR DE GUARDAR DISCUSION"
                : "DELETE DISCUSION"
            }
            message={
              lenguage === "español"
                ? "ESTAS SEGURO QUE QUIERES ELIMINAR ESTA DISCUSION"
                : "ARE YOU SURE YOU WANT TO DELETE THIS DISCUSION"
            }
            action={handleDeletePost}
          />
          <ConfirmationModal
            close={() => setOpen5(false)}
            open={open5}
            title={
              lenguage === "español"
                ? "DEJAR DE GUARDAR DISCUSION"
                : "STOP SAVING DISCUSION"
            }
            message={
              lenguage === "español"
                ? "ESTAS SEGURO QUE QUIERES DEJAR DE GUARDAR ESTA DISCUSION"
                : "ARE YOU SURE YOU WANT TO STOP SAVING THIS DISCUSION"
            }
            action={handleOnBookPost}
          />

          <ConfirmationModal
            close={() => setOpen6(false)}
            open={open6}
            title={
              lenguage === "español"
                ? "ELIMINAR PERFIL"
                : "ESTAS SEGURO QUE QUIERES ELIMINAR TU PERFIL"
            }
            message={
              lenguage === "español"
                ? "¿ESTAS SEGURO QUE QUIERES ELIMINAR TU PERFIL?"
                : "ARE YOU SURE YOU WANT TO DELETE YOUR PROFILE ?"
            }
            action={deleteProfile}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Perfil;
