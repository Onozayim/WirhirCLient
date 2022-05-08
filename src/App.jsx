import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  split,
  ApolloProvider,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";

import LoginForm from "./pages/Login";
import { AuthContext } from "./context/Auth";
import { setContext } from "apollo-link-context";
import Home from "./pages/Home";
import Historias from "./pages/Historias";
import Register from "./pages/Register";
import Discusiones from "./pages/Discusiones";
import Answers from "./pages/Answers";
import Perfil from "./pages/Perfil";
import SingleStory from "./pages/SingleStory";
import SinglePost from "./pages/SinglePost";
import Solicitudes from "./pages/Solicitudes";
import Friends from "./pages/Friends";
import ChatPage from "./pages/Chat";
import CallsMenu from "./pages/CallsMenu";
import CallsServer from "./pages/CallsServer";
import { ContextProvider } from "./context/SocketContext";
import { CallNameProvider } from "./context/CallName";
import CallsHistory from "./pages/CallsHistory";
import Articles from "./pages/Articles";
import Burnout from "./pages/Burnout";
import SleepDisorder from "./pages/SleepDisorder";
import BipolarDisorder from "./pages/BipolarDisorder";
import Anxiety from "./pages/Anxiety";
import Depresion from "./pages/Depresion";
import Tests from "./pages/Tests";
import BurnoutTest from "./pages/BurnoutTest";
import SleepTest from "./pages/SleepTest";
import BipolarTest from "./pages/BipolarTest";
import AnxietyTest from "./pages/AnxietyTest";
import DepressionTest from "./pages/DepressionTest";
import RecoverPassword from "./pages/RecoverPassword";
import RecoverPasswordForm from "./pages/RecoverPasswordForm";
import { MediaProvider } from "./context/MediaContext";

const server = process.env.SERVER;

const wsLink = new WebSocketLink({
  uri: `wss://mighty-badlands-64956.herokuapp.com/graphql`,
  options: {
    reconnnect: true,
    timeout: 30000,
  },
});

const htppLink = new createUploadLink({
  uri: `https://mighty-badlands-64956.herokuapp.com/graphql`,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  htppLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

function App() {
  const context = useContext(AuthContext);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {context.user ? (
            <Route path="/login" element={<Navigate replace to="/" />} />
          ) : (
            <Route path="/login" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/register" element={<Navigate replace to="/" />} />
          ) : (
            <Route path="/register" element={<Register />} />
          )}

          <Route path="/password__form" element={<RecoverPasswordForm />} />

          {context.user ? (
            <Route path="/friendRequests" element={<Solicitudes />} />
          ) : (
            <Route path="/friendRequests" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route
              path="/calls"
              element={
                <MediaProvider>
                  <CallNameProvider>
                    <CallsMenu />
                  </CallNameProvider>
                </MediaProvider>
              }
            />
          ) : (
            <Route path="/calls" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route
              path="/calls/server"
              element={
                <MediaProvider>
                  <CallNameProvider>
                    <ContextProvider>
                      <CallsServer />
                    </ContextProvider>
                  </CallNameProvider>
                </MediaProvider>
              }
            />
          ) : (
            <Route path="/calls/server" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/calls/history" element={<CallsHistory />} />
          ) : (
            <Route path="/calls/history" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/friends" element={<Friends />} />
          ) : (
            <Route path="/friends" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/stories" element={<Historias />} />
          ) : (
            <Route path="/stories" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/discusions" element={<Discusiones />} />
          ) : (
            <Route path="/discusions" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/profile" element={<Perfil />} />
          ) : (
            <Route path="/profile" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/chat" element={<ChatPage />} />
          ) : (
            <Route path="/chat" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/articles" element={<Articles />} />
          ) : (
            <Route path="/articles" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests" element={<Tests />} />
          ) : (
            <Route path="/tests" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/articles/burnout" element={<Burnout />} />
          ) : (
            <Route path="/articles/burnout" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests/burnout" element={<BurnoutTest />} />
          ) : (
            <Route path="/tests/burnout" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests/sleep_disorder" element={<SleepTest />} />
          ) : (
            <Route path="/tests/sleep_disorder" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests/bipolar_disorder" element={<BipolarTest />} />
          ) : (
            <Route path="/tests/bipolar_disorder" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests/anxiety" element={<AnxietyTest />} />
          ) : (
            <Route path="/tests/anxiety" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/tests/depresion" element={<DepressionTest />} />
          ) : (
            <Route path="/tests/depresion" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route
              path="/articles/bipolar_disorder"
              element={<BipolarDisorder />}
            />
          ) : (
            <Route path="/articles/bipolar_disorder" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/articles/anxiety" element={<Anxiety />} />
          ) : (
            <Route path="/articles/anxiety" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/articles/depresion" element={<Depresion />} />
          ) : (
            <Route path="/articles/depresion" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route
              path="/articles/sleep_disorder"
              element={<SleepDisorder />}
            />
          ) : (
            <Route path="/articles/sleep_disorder" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/answers/:postId" element={<Answers />} />
          ) : (
            <Route path="/answers/:postId" element={<LoginForm />} />
          )}

          {context.user ? (
            <Route path="/discusion/:postId" element={<SinglePost />} />
          ) : (
            <Route path="/discusion/:postId" element={<LoginForm />} />
          )}

          <Route path="/recoverLink/:token" element={<RecoverPassword />} />

          {context.user ? (
            <Route path="/story/:postId" element={<SingleStory />} />
          ) : (
            <Route path="/story/:postId" element={<LoginForm />} />
          )}

          {!context.user ? (
            <Route path="/" element={<Navigate replace to="/login" />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
