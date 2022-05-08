import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { MediaContext } from "./MediaContext";

const SocketContext = createContext({
  user: {
    socketId: null,
    id: null,
    name: null,
  },

  partner: {
    partnerSocketID: null,
    id: null,
    name: null,
  },

  call: {
    isReceivedCall: null,
    from: null,
    name: null,
    signal: null,
  },

  stream: null,
  myVideo: null,
  userVideo: null,
  callAccepted: false,

  connectToSocket: (id, name) => {},
  startCall: () => {},
  answerCall: () => {},
  setStream: () => {},
});

const socket = io("https://wirhir-socket.herokuapp.com", {
  transports: ["websocket"],
});

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    socketId: null,
    id: null,
    name: null,
  });
  const [partner, setPartner] = useState({
    partnerSocketID: null,
    id: null,
    name: null,
  });

  const { stream } = useContext(MediaContext);

  const [call, setcall] = useState({
    isReceivedCall: null,
    from: null,
    name: null,
    signal: null,
  });
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ audio: true, video: false })
    //   .then((currentStream) => {
    //     setStream(currentStream);

    //     myVideo.current.srcObject = currentStream;
    //   });

    socket.on("welcome", ({ socketId, id, name }) => {
      setUser({
        socketId: socketId,
        id: id,
        name: name,
      });
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setcall({ isReceivedCall: true, from, name: callerName, signal });
    });

    socket.on("partnerLeave", () => {
      setPartner({
        partnerSocketID: null,
        id: null,
        name: null,
      });

      setcall({ isReceivedCall: null, from: null, name: null });
      setCallAccepted(false);

      window.location.reload();
      connectionRef.current.destroy();
    });

    socket.on("partner2", ({ partnerId, name, id }) => {
      setPartner({
        partnerSocketID: partnerId,
        name: name,
        id: id,
      });

      // addToHistory();
    });

    socket.on(
      "partner",
      ({ socketId, name, id, partnerName, partnerSocketId, partnerId }) => {
        setPartner({
          partnerSocketID: socketId,
          name,
          id,
        });

        // addToHistory();

        socket.emit("welcomePartner", {
          socketId: partnerSocketId,
          id: partnerId,
          name: partnerName,
          partnerId: socketId,
        });
      }
    );
  }, []);

  const connectToSocket = (id, name) => {
    socket.emit("join", { id: id, name: name });
  };

  const startCall = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user.socketId,
        name: user.name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: partner.partnerSocketID });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    connectionRef.current = peer;
    peer.signal(call.signal);
  };

  return (
    <SocketContext.Provider
      value={{
        connectToSocket,
        user,
        partner,
        userVideo,
        call,
        callAccepted,
        startCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
