import React, { useState } from "react";

import "../style/AnswerPost.css";

const server = process.env.SERVER;

const ReplyContent = (props) => {
  const [showMore, setShowMore] = useState(false);

  if (props.children.length > 200 || props.image) {
    return (
      <React.Fragment>
        {!showMore ? (
          <React.Fragment>
            <div className="answer__body" style={{ marginLeft: "20px" }}>
              {props.children.substr(0, 197)}...
            </div>
            <button onClick={() => setShowMore(true)} className="show__button">
              {" "}
              SHOW MORE
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="reply__content" style={{ marginLeft: "20px" }}>
              {props.children}
              <img
                src={`https://mighty-badlands-64956.herokuapp.com/Images/${props.image}`}
                className="post__image"
              />
            </div>
            <button onClick={() => setShowMore(false)} className="show__button">
              {" "}
              SHOW LESS
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="answer__body" style={{ marginLeft: "30px" }}>
          {props.children}
        </div>
      </React.Fragment>
    );
  }
};

export { ReplyContent };
