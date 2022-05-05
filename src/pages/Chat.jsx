import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useCallback, useContext, useEffect, useState } from "react";

import NavBar from "../Components/Navbar";
import { AuthContext } from "../context/Auth";
import { SEND_MESSAGE } from "../graphql/mutations";
import { GET_CHATS, SHOW_FRIENDS, SHOW_MESSAGES } from "../graphql/queries";
import { SUBSCRIBE_MESSAGES } from "../graphql/subscriptions";
import ReactScrollableFeed from "react-scrollable-feed";
import "../style/ChatStyle.css";
import { LenguageContext } from "../context/Lengauge";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Backdrop, CircularProgress } from "@material-ui/core";

const ChatPage = () => {
  const context = useContext(AuthContext);

  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
  });
  const [messages, setMessages] = useState(null);
  const [body, setBody] = useState("");
  const [chatInfo, setChatInfo] = useState([null]);
  const { lenguage } = useContext(LenguageContext);
  const [viewUserDiv, setViewUserDiv] = useState(true);

  const navigate = useNavigate();

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    variables: {
      body: body,
      to: selectedUser.id,
    },

    onError: (err) => {
      localStorage.removeItem("jwtToken");
      navigate("/login");
      window.location.reload();
    },
  });

  const { data: messagesQueried, loading: messagesLoading } =
    useQuery(SHOW_MESSAGES);
  const { data: chatsData, loading: friendsLoading } = useQuery(SHOW_FRIENDS);
  const { data: subMessages } = useSubscription(SUBSCRIBE_MESSAGES, {
    variables: {
      userId: context.user.id,
    },
  });

  const setLastMessage = useCallback(() => {
    const array = [];

    chatInfo.map((item) => {
      if (
        subMessages?.messages?.to === item.firend1Id ||
        subMessages?.messages?.from === item.friend1Id ||
        subMessages?.messages?.to === item.firend2Id ||
        subMessages?.messages?.from === item.friend2Id
      ) {
        const newData = {
          __typeaname: "Friend",
          friend1Id: item.friend1Id,
          friend1Name: item.friend1Name,
          friend1Conf: item.friend1Conf,
          friend2Id: item.friend2Id,
          friend2Name: item.friend2Name,
          friend2Conf: item.friend2Conf,
          lastMessage: subMessages?.messages?.body,
        };
        array.push(newData);
      } else {
        array.push(item);
      }
      return null;
    });

    setChatInfo(array);
    return null;
  }, [subMessages]);

  useEffect(() => {
    setMessages(messagesQueried?.showMessages);
  }, [messagesQueried]);

  useEffect(() => {
    if (subMessages) {
      setMessages((oldArray) => [...oldArray, subMessages?.messages]);
      setLastMessage();
    }
  }, [subMessages, setLastMessage]);

  useEffect(() => {
    setChatInfo(chatsData?.showFriends);
  }, [chatsData]);

  const onChangeHandler = (e) => {
    setBody(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (body === "") return;
    sendMessage();
    setBody("");
  };

  const checkIfSelected = (input) => {
    if (input === selectedUser.id) return "user__info__container__selected";
    else return "user__info__container";
  };

  if (messagesLoading || friendsLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <NavBar />
      {chatInfo?.length > 0 ? (
        <div className="chat__container" style={{ marginTop: "60px" }}>
          <div className="users__container">
            {chatInfo?.map((item) => {
              return (
                <React.Fragment>
                  <UserInfo
                    key={
                      context.user.id !== item?.friend1Id
                        ? item?.friend1Id
                        : item?.friend2Id
                    }
                    user={
                      context.user.id !== item?.friend1Id
                        ? item?.friend1Name
                        : item?.friend2Name
                    }
                    setUser={() =>
                      setSelectedUser({
                        id:
                          context.user.id !== item?.friend1Id
                            ? item?.friend1Id
                            : item?.friend2Id,
                        name:
                          context.user.id !== item?.friend1Id
                            ? item?.friend1Name
                            : item?.friend2Name,
                      })
                    }
                    lastMessage={item?.lastMessage}
                    check={checkIfSelected(
                      context.user.id !== item?.friend1Id
                        ? item?.friend1Id
                        : item?.friend2Id
                    )}
                  />
                </React.Fragment>
              );
            })}
          </div>

          {viewUserDiv && (
            <div className="users__container__movil">
              {chatInfo?.map((item) => {
                return (
                  <React.Fragment>
                    <div onClick={() => setViewUserDiv(false)}>
                      <UserInfo
                        key={
                          context.user.id !== item?.friend1Id
                            ? item?.friend1Id
                            : item?.friend2Id
                        }
                        user={
                          context.user.id !== item?.friend1Id
                            ? item?.friend1Name
                            : item?.friend2Name
                        }
                        setUser={() =>
                          setSelectedUser({
                            id:
                              context.user.id !== item?.friend1Id
                                ? item?.friend1Id
                                : item?.friend2Id,
                            name:
                              context.user.id !== item?.friend1Id
                                ? item?.friend1Name
                                : item?.friend2Name,
                          })
                        }
                        lastMessage={item?.lastMessage}
                        check={checkIfSelected(
                          context.user.id !== item?.friend1Id
                            ? item?.friend1Id
                            : item?.friend2Id
                        )}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}

          <div className="messages__session">
            {selectedUser.id && (
              <div className="upper__bar">
                <FaArrowLeft
                  className="arrow__icon"
                  onClick={() => setViewUserDiv(true)}
                />
                <p>{selectedUser.name}</p>
              </div>
            )}

            <ReactScrollableFeed>
              <div className="all__messages">
                {selectedUser.id ? (
                  <React.Fragment>
                    {messages?.map((item) => {
                      if (
                        item.from === context.user.id &&
                        item.to === selectedUser.id
                      ) {
                        return (
                          <div
                            className="message__container__right"
                            key={item.id}
                          >
                            {item.body}
                          </div>
                        );
                      } else if (
                        item.from === selectedUser.id &&
                        item.to === context.user.id
                      ) {
                        return (
                          <div
                            className="message__container__left"
                            key={item.id}
                          >
                            {item.body}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h1 style={{ padding: "10px" }}>
                      {lenguage === "español"
                        ? "ESCOGE UN CHAT!"
                        : "CHOOSE A CHAT!"}
                    </h1>

                    <h1 style={{ padding: "10px" }}>
                      {lenguage === "español"
                        ? "Se respetuoso por favor"
                        : "Be respectful please"}
                    </h1>
                  </React.Fragment>
                )}
              </div>
            </ReactScrollableFeed>

            {selectedUser.id && (
              <form className="message__input" onSubmit={onSubmitHandler}>
                {selectedUser.name && (
                  <React.Fragment>
                    <input
                      type="text"
                      onChange={onChangeHandler}
                      value={body}
                    />
                    <button type="submit">
                      {lenguage === "español" ? "ENVIAR" : "SEND"}
                    </button>
                  </React.Fragment>
                )}
              </form>
            )}
          </div>
        </div>
      ) : (
        <h1>
          {lenguage === "español"
            ? "NO HAY CHATS DISPONIBLES, SI QUIERES CHATERAR TENDRÁS QUE HACER AMIGOS EN ESTE SITIO WEB PRIMERO"
            : "NO CHATS AVAILABLE, IF YOU WANT TO CHAT YOU WILL HAVE TO MAKE FRIENDS ON THIS WEBSITE FIRST"}
        </h1>
      )}
    </React.Fragment>
  );
};

const UserInfo = ({ user, setUser, lastMessage, check }) => {
  return (
    <React.Fragment>
      <div className={check} onClick={setUser}>
        <p>{user}</p>
        <p className="last__message">
          {lastMessage?.substring(0, 5) || "Nuevo Chat"}
        </p>
      </div>
    </React.Fragment>
  );
};

export default ChatPage;
