import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import "../style/IndividualPost.css";
import NavBar from "../Components/Navbar";
import { GET_STORY } from "../graphql/queries";
import { AuthContext } from "../context/Auth";
import CreateStoryPost from "../Components/CreateStoryForm";
import ConfirmationModal from "../Components/ConfirmationModal";
import { REPORT_USER } from "../graphql/mutations";
import Banned from "./Banned";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { LenguageContext } from "../context/Lengauge";
import { Backdrop, CircularProgress } from "@material-ui/core";

const SingleStory = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_STORY, {
    variables: {
      storyId: params.postId,
    },
  });

  const context = useContext(AuthContext);
  const { lenguage } = useContext(LenguageContext);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const story = data?.getStory;

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: story?.publisher,
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

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
        {lenguage === "español" ? "HISTORIAS" : "STORIES"}
      </h1>

      {story ? (
        <div className="container">
          <div className="headerContainer">
            <h1>{story.title}</h1>
            <div className="postData">
              <p>{story.publicPublisher}</p>
              <p>{moment(story.createdAt).fromNow()}</p>
            </div>
          </div>

          <hr />
          <div className="body__container">
            <p>{story.body}</p>

            {story.image.filename && (
              <img
                src={`https://mighty-badlands-64956.herokuapp.com/Images/${story?.image?.filename}`}
                className="post__image"
              />
            )}
          </div>
          {context.user.id !== story?.publisher && (
            <div className="actions__container">
              <button onClick={() => setOpen2(true)}>
                {lenguage === "español" ? "REPORTAR" : "REPORT"}
              </button>
            </div>
          )}
        </div>
      ) : lenguage === "español" ? (
        <h1 className="error__message">HISTORIA NO ENCONTRADA</h1>
      ) : (
        <h1 className="error__message">STORY NOT FOUND</h1>
      )}
      <div className="btn__container">
        <button className="btn__post" onClick={() => setOpen(true)}>
          {lenguage === "español" ? "HACER UNA HISTORIA" : "CREATE A STORY"}
        </button>
      </div>
      <CreateStoryPost open={open} close={() => setOpen(false)} />

      <ConfirmationModal
        open={open2}
        close={() => setOpen2(false)}
        title={lenguage === "español" ? "REPORTAR HISTORIA" : "REPORT STORY"}
        message={
          lenguage === "español"
            ? "¿ESTAS SEGURO QUE QUIERES REPORTAR LA HISTORIA?"
            : "ARE YOU SURE YOU WANT TO REPORT THIS STORY?"
        }
        action={reportUser}
      />
    </React.Fragment>
  );
};

export default SingleStory;
