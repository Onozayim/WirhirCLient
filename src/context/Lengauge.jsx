import React, { createContext } from "react";

const LenguageContext = createContext({
	lenguage: "",

	changeLenguage: () => {},
});

var lenguage;

if (!localStorage.getItem("lenguage")) {
	lenguage = "english";
	localStorage.setItem("lenguage", lenguage);
} else {
	lenguage = localStorage.getItem("lenguage");
	if (lenguage !== "english" && lenguage !== "español") {
		localStorage.setItem("lenguage", "english");
		window.location.reload();
	}
}

const LenguageProvider = ({ children }) => {
	const changeLenguage = () => {
		if (lenguage === "english") lenguage = "español";
		else lenguage = "english";

		localStorage.setItem("lenguage", lenguage);
	};
	return (
		<LenguageContext.Provider value={{ lenguage, changeLenguage }}>
			{children}
		</LenguageContext.Provider>
	);
};

export { LenguageProvider, LenguageContext };
