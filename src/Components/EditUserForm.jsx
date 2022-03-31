import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import "../Components/Modal.css";
import { UPDATE_PROFILE } from "../graphql/mutations";
import { LenguageContext } from "../context/Lengauge";
import { AuthContext } from "../context/Auth";

const EditUserForm = ({ open, close, bio, userName }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profile, setProfile] = useState({
    biography: "",
    userName: "",
  });

  const { lenguage } = useContext(LenguageContext);
  const [err, setError] = useState("");

  const context = useContext(AuthContext);

  const [uploadFile] = useMutation(UPDATE_PROFILE, {
    onCompleted: (data) => console.log(data),

    onError: (err) => {
      setError(err.message);
    },
    update(proxy, { data }) {
      context.login(data.updateProfile);
      close();
      window.location.reload();
    },
  });

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;

    setProfilePicture(file);

    console.log(profilePicture);
    console.log(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadFile({
      variables: {
        image: profilePicture,
        biography: profile.biography,
        lenguage: lenguage,
        userName: profile.userName,
      },
    });
  };

  const handleBioChange = (e) => {
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (!open) return null;

  return (
    <React.Fragment>
      <div className="overlay">
        <div className="modal">
          <form action="modal__content" onSubmit={submitHandler}>
            <input
              type="text"
              name="userName"
              onChange={handleBioChange}
              className="title__input"
              //value={userName}
            />
            <textarea
              name="biography"
              id=""
              cols="30"
              rows="10"
              className="text__input"
              onChange={handleBioChange}
            >
              {bio}
            </textarea>

            <div className="image__cont">
              <input
                type="file"
                onChange={handleFileChange}
                className="image__input"
                name="img"
                accept="image/*"
              />
            </div>
            <div className="center__modal__actions">
              <button className="button__modal" type="submit">
                GUARDAR
              </button>
              <button onClick={close} className="button__modal">
                CANCEL
              </button>
            </div>
          </form>

          {err && <li className="modal__error">{err}</li>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditUserForm;
