import React, { createContext, useEffect, useRef, useState } from "react";

const MediaContext = createContext({
  stream: null,
  myVideo: null,

  setStream: () => {},
});

const MediaProvider = ({ children }) => {
  const [stream, setStream] = useState(null);

  const myVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
  }, []);

  return (
    <MediaContext.Provider value={{ myVideo, setStream, stream }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
