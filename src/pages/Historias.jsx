import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import "../style/IndividualPost.css";
import NavBar from "../Components/Navbar";
import { GET_RANDOM_SOTRY } from "../graphql/queries";
import { AuthContext } from "../context/Auth";
import CreateStoryPost from "../Components/CreateStoryForm";
import ConfirmationModal from "../Components/ConfirmationModal";
import { CHECK_IF_BANNED } from "../graphql/queries";
import { REPORT_USER, SAVE_STORY } from "../graphql/mutations";
import Banned from "./Banned";
import { LenguageContext } from "../context/Lengauge";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";

const server = process.env.SERVER;

const Historias = () => {
  const { lenguage } = useContext(LenguageContext);

  const { loading, data, refetch } = useQuery(GET_RANDOM_SOTRY, {
    variables: {
      lenguage: lenguage,
    },
  });

  const context = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const story = data?.getRandomStory;

  const [saveStory] = useMutation(SAVE_STORY, {
    variables: {
      storyId: story?.id,
    },

    onError: (err) => {
      navigate("/login");
      window.location.reload();
      localStorage.removeItem("jwtToken");
      setErr(err.message);
    },
  });

  const [reportUser] = useMutation(REPORT_USER, {
    variables: {
      userId: story?.publisher,
    },

    onError: (err) => {
      navigate("/login");
      window.location.reload();
      localStorage.removeItem("jwtToken");
      setErr(err.message);
    },
  });

  const handleClick = () => {
    console.log(story);
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
        {lenguage === "español" ? "HISTORIAS" : "STORIES"}{" "}
      </h1>

      {err && <li className="error">{err}</li>}

      {story && (
        <div className="container">
          <div className="headerContainer">
            <h1>{story.title}</h1>
            <div className="postData">
              <p>{story.publicPublisher}</p>
              <p>{story.createdAt.substr(0, 10)}</p>
            </div>
          </div>
          {/* <hr /> */}
          <div className="body__container">
            <p>{story.body}</p>

            {story.image.filename && (
              <img
                src={`https://mighty-badlands-64956.herokuapp.com/Images/${story?.image?.filename}`}
                className="post__image"
              />
            )}
          </div>
          <div className="actions__container">
            {context.user.id !== story.publisher && (
              <React.Fragment>
                {/* <hr /> */}
                <button onClick={() => setOpen3(true)}>
                  {lenguage === "español" ? "REPORTAR" : "REPORT"}
                </button>
                <button onClick={() => setOpen2(true)}>
                  {lenguage === "español" ? "GUARDAR" : "SAVE"}
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      )}

      <div className="btn__container">
        <button className="btn__post" onClick={() => setOpen(true)}>
          {lenguage === "español" ? "CREAR UNA HISTORIA" : "CREATE A STORY"}
        </button>
        <button className="btn__post" onClick={handleClick}>
          {lenguage === "español" ? "VER OTRA HISTORIA" : "WATCH ANOTHER STORY"}
        </button>
      </div>

      <CreateStoryPost
        open={open}
        close={() => setOpen(false)}
        lenguage={lenguage}
      />

      <ConfirmationModal
        open={open2}
        close={() => setOpen2(false)}
        title={lenguage === "español" ? "GUARDAR HISTORIA" : "SAVE STORY"}
        message={
          lenguage === "español"
            ? "¿ESTAS SEGUR@ QUE QUIERES GUARDAR ESTA HISTORIA"
            : "ARE YOU SURE YOU WANT TO SAVE THIS STORY?"
        }
        action={saveStory}
      />

      <ConfirmationModal
        open={open3}
        close={() => setOpen3(false)}
        title={lenguage === "español" ? "REPORTAR HISTORIA" : "REPORT STORY"}
        message={
          lenguage === "español"
            ? "ESTAS SEGUR@ QUE QUIERES REPORTAR LA HISTORIA"
            : "ARE YOU SURE YOU WANT TO REPORT THIS STORY"
        }
        action={reportUser}
      />
    </React.Fragment>
  );
};

export default Historias;
