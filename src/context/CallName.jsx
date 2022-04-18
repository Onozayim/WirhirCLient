import React, { createContext, useState } from "react";
var name;

const createRandomName = () => {
  const elements = [
    "Perro",
    "Gato",
    "Hamster",
    "Oso",
    "Leon",
    "Tigre",
    "Jaguar",
    "Pantera",
    "Zebra",
    "Jirafa",
  ];

  const name = `${
    elements[Math.floor(Math.random() * elements.length)]
  }_${Math.floor(Math.random() * 100000).toString()}`;

  return name;
};

if (localStorage.getItem("userName")) {
  name = localStorage.getItem("userName");
} else {
  name = createRandomName();
}

const UserCallNameContext = createContext({
  userName: null,
  name: name,

  setName: () => {},
});

const CallNameProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  const setName = (input) => {
    setUserName(input);
    localStorage.setItem("userName", input);
  };
  return (
    <UserCallNameContext.Provider value={{ userName, setName, name }}>
      {children}
    </UserCallNameContext.Provider>
  );
};

export { CallNameProvider, UserCallNameContext };
