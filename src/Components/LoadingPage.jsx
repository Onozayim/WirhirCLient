import React from "react";
import { CircleLoader, DotLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          width: "100vh",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DotLoader color="violet" size={200} />
      </div>
    </React.Fragment>
  );
};

export default LoadingPage;
