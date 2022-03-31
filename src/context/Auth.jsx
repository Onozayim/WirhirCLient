import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";

const initialState = {
	user: null,
};

if (localStorage.getItem("jwtToken")) {
	let decodedToken;
	try {
		decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
	} catch (err) {
		localStorage.removeItem("jwtToken");
	}

	if (
		decodedToken?.exp * 1000 < Date.now() &&
		localStorage.getItem("jwtToken")
	) {
		localStorage.removeItem("jwtToken");
	} else {
		try {
			initialState.user = decodedToken;
		} catch (err) {
			localStorage.removeItem("jwtToken");
		}
	}
}

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {},
});

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};

		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (userData) => {
		localStorage.setItem("jwtToken", userData.token);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
		dispatch({ type: "LOGOUT" });
	};

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
