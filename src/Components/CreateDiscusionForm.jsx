import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_POST_MUTATION } from "../graphql/mutations";
import "../Components/modal.css";

const CreateDiscusionPost = ({ open, close, lenguage }) => {
	const [values, setValues] = useState({
		title: "",
		body: "",
	});
	const [err, setErr] = useState("");
	const [picture, setPicture] = useState(null);

	const [publish] = useMutation(CREATE_POST_MUTATION);
	const [check, setCheck] = useState(false);

	if (!open) return null;

	const changeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (!file) return;

		setPicture(file);

		console.log(picture);
		console.log(file);
	};

	const submitHanlder = (e) => {
		e.preventDefault();

		if (!lenguage) window.location.reload();

		publish({
			update(proxy, { data }) {
				close();
				setErr("");
			},
			variables: {
				title: values.title,
				body: values.body,
				confident: check,
				lenguage: lenguage,
				image: picture,
			},
			onError: (err) => {
				setErr(err.message);
			},
		});

		setValues({ title: "", body: "" });
		setPicture(null);
		setCheck(false);
	};

	return (
		<React.Fragment>
			<div className="overlay">
				<div className="modal">
					<form className="modal__content" onSubmit={submitHanlder}>
						<p>
							{lenguage === "español"
								? "PORFAVOR, COMENTA EN ESPAÑOL"
								: "PLEASE, PUBLISH IN ENGLISH"}
						</p>
						<input
							type="text"
							placeholder={lenguage === "español" ? "TITULO..." : "TITLE..."}
							className="title__input"
							name="title"
							onChange={changeHandler}
						/>
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
						<div className="check__cont">
							<input
								type="checkbox"
								className="check__input"
								checked={check}
								onChange={() => setCheck(!check)}
								name="confident"
							/>
							{lenguage === "español"
								? "PUBLICAR ANONIMAMENTE"
								: "PUBLISH ANONYMOUSLY"}
						</div>
						<div className="center__modal__actions">
							<button className="button__modal" type="submit">
								{lenguage === "español" ? "PUBLICAR" : "PUBLISH"}
							</button>

							<button onClick={close} className="button__modal">
								{lenguage === "español" ? "CANCELAR" : "CANCEL"}
							</button>
						</div>
					</form>

					{err && <li className="modal__err">{err}</li>}
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateDiscusionPost;
