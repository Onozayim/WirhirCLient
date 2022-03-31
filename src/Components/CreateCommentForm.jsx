import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import {
  CREATE_COMMENT_MUTATION,
  SEND_FRIEND_REQUEST,
} from "../graphql/mutations";
import "../Components/Modal.css";
import { GET_COMMENTS } from "../graphql/queries";
import { LenguageContext } from "../context/Lengauge";

const CreateCommentForm = ({
  open,
  close,
  postId,
  mainPostId,
  responding,
  flag2,
  setFlag2,
  setRequestDataSender,
}) => {
  const [body, setBody] = useState("");
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState("");
  const [picture, setPicture] = useState(null);

  const [publish] = useMutation(CREATE_COMMENT_MUTATION);

  const changeHandler = (e) => {
    setBody(e.target.value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;

    setPicture(file);

    console.log(picture);
    console.log(file);
  };

  const { lenguage } = useContext(LenguageContext);

  const submitHanlder = (e) => {
    e.preventDefault();

    if (!lenguage) window.location.reload();

    publish({
      update(proxy, result) {
        setRequestDataSender(result.data.createComment.publicPublisher);
        console.log(result.data.createComment.publicPublisher);

        const data = proxy.readQuery({
          query: GET_COMMENTS,

          variables: {
            answeringId: mainPostId,
          },
        });

        proxy.writeQuery({
          query: GET_COMMENTS,

          data: {
            getComments: [...data.getComments, result.data.createComment],
          },

          variables: {
            answeringId: mainPostId,
          },
        });

        close();
      },

      variables: {
        body: body,
        confident: check,
        postId: postId,
        mainPostId: mainPostId,
        lenguage: lenguage,
        image: picture,
      },

      onError: (err) => {
        setErr(err.message);
      },
    });

    setFlag2();

    setBody("");
    setCheck(false);
    setErr("");
    setPicture(null);
  };

  if (!open) return null;

  return (
    <React.Fragment>
      <div className="overlay">
        <div className="modal">
          <form className="modal__content" onSubmit={submitHanlder}>
            <p>
              {lenguage === "español"
                ? `RESPONDIENDO: ${responding.substr(0, 10)} ...`
                : `ANSWERING: ${responding.substr(0, 10)} ...`}
            </p>
            <br />
            <textarea
              name="body"
              id=""
              cols="30"
              rows="10"
              className="text__input"
              onChange={changeHandler}
            ></textarea>
            <div className="image__cont">
              <input
                type="file"
                className="image__input"
                alt=""
                name="img"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {flag2 && (
              <div className="check__cont">
                <input
                  type="checkbox"
                  className="check__input"
                  checked={check}
                  onChange={() => setCheck(!check)}
                  name="confident"
                />
                publicar anonimamente
              </div>
            )}
            <div className="center__modal__actions">
              <button className="button__modal" type="submit">
                {lenguage === "español" ? "PUBLICAR" : "PUBLISH"}
              </button>

              <button onClick={close} className="button__modal">
                {lenguage === "español" ? "CANCELAR" : "CANCEL"}
              </button>
            </div>
          </form>

          {err && <li className="modal__error">{err}</li>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCommentForm;
