import React, { useContext, useState } from "react";
import { LenguageContext } from "../context/Lengauge";

import "../style/TestStyle.css";

const Question = ({ children, setQuestion }) => {
  const { lenguage } = useContext(LenguageContext);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionNo = (e) => {
    setSelectedOption(e.target.value);
    setQuestion({ value: 0, completed: true });
  };

  const handleOptionYes = (e) => {
    setSelectedOption(e.target.value);
    setQuestion({ value: 2, completed: true });
  };

  const handleOptionSometimes = (e) => {
    setSelectedOption(e.target.value);
    setQuestion({ value: 1, completed: true });
  };
  /*
	const handleOption = (e) => {
		setSelectedOption(e.target.value);
		if(e.target.value === true)
			setQuestion({ value: e.target.value, completed: true });
		elseif(e.target.value === false)
			setQuestion({ value: e.target.value, completed: true });
	};
	*/

  return (
    <div className="question__container">
      <p>{children}</p>

      <div>
        <label className="option">
          <input
            type="radio"
            value={"No"}
            onChange={handleOptionNo}
            checked={selectedOption === "No"}
          />
          NO
        </label>

        <label className="option">
          <input
            type="radio"
            value={"SOMETIMES"}
            onChange={handleOptionSometimes}
            checked={selectedOption === "SOMETIMES"}
          />
          {lenguage === "español" ? "A VECES" : "SOMETIMES"}
        </label>

        <label className="option">
          <input
            type="radio"
            value={"Yes"}
            onChange={handleOptionYes}
            checked={selectedOption === "Yes"}
          />
          {lenguage === "español" ? "SI" : "YES"}
        </label>
      </div>
    </div>
  );
};

export default Question;
