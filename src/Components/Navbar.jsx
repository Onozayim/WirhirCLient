import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth";
import { LenguageContext } from "../context/Lengauge";

const NavBar = (props) => {
  const lengauge = useContext(LenguageContext);
  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [showLeftBar, setShowLeftBar] = useState(false);
  const [showRightBar, setShowRightBar] = useState(false);

  return (
    <React.Fragment>
      <nav className="navbar">
        <ul className="navbar__bar">
          <li className="nav__item">
            <div className="icon__button">
              <a href="/">
                {lengauge.lenguage === "español" ? "INICIO" : "HOME"}
              </a>
            </div>
          </li>
          <NavItem
            text={
              lengauge.lenguage === "español"
                ? "CONOCETE MEJOR"
                : "KNOW YOU BETTER"
            }
          >
            <DropDownMenu lengauge={lengauge.lenguage} />
          </NavItem>
          <NavItem
            text={
              lengauge.lenguage === "español" ? "CONOCE A OTROS" : "MEET OTHERS"
            }
          >
            <DropDownMenu2 lengauge={lengauge.lenguage} />
          </NavItem>
          <NavItem text={`${context.user.userName}`}>
            <DropDownMenu3 lengauge={lengauge.lenguage} />
          </NavItem>
        </ul>

        <ul className="navbar__bar__movil">
          <li
            onClick={() => {
              setShowLeftBar(!showLeftBar);
              setShowRightBar(false);
            }}
          >
            options
          </li>
          <li
            onClick={() => {
              setShowLeftBar(!showLeftBar);
              setShowRightBar(false);
              navigate("/");
            }}
          >
            WIRHIR
          </li>
          <li
            onClick={() => {
              setShowRightBar(!showRightBar);
              setShowLeftBar(false);
            }}
          >
            {context.user.userName}
          </li>
        </ul>
      </nav>
      {showLeftBar && (
        <React.Fragment>
          <div className="side__bar__movil">
            <h3>
              {lengauge.lenguage === "español"
                ? "CONOCE A LOS DEMAS"
                : "MEET OTHERS"}
            </h3>
            <ul className="side__bar__list">
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/stories");
                      window.location.reload();
                    } else {
                      navigate("/stories");
                    }
                  }}
                  href={"/stories"}
                >
                  {lengauge.lenguage === "español" ? "HISTORIAS" : "STORIES"}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/discusions");
                      window.location.reload();
                    } else {
                      navigate("/discusions");
                    }
                  }}
                  href={"/discusions"}
                >
                  {lengauge.lenguage === "español"
                    ? "DISCUSIONES"
                    : "DISCUSIONS"}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/calls");
                      window.location.reload();
                    } else {
                      navigate("/calls");
                    }
                  }}
                  href={"/calls"}
                >
                  {lengauge.lenguage === "español" ? "LLAMADAS" : "CALLS"}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/chat");
                      window.location.reload();
                    } else {
                      navigate("/chat");
                    }
                  }}
                  href={"/chat"}
                >
                  CHAT
                </a>
              </li>
            </ul>

            <h3>
              {lengauge.lenguage === "español"
                ? "CONOCETE MEJOR"
                : "KNOW YOU BETTER"}
            </h3>
            <ul className="side__bar__list2">
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/articles");
                      window.location.reload();
                    } else {
                      navigate("/articles");
                    }
                  }}
                  href={"/articles"}
                >
                  {lengauge.lenguage === "español" ? "ARTICULOS" : "ARTICLES"}
                </a>
              </li>
              <li
                onClick={() => {
                  if (
                    window.location.href ===
                    "https://wirhir.netlify.app/llamadas/server"
                  ) {
                    navigate("/tests");
                    window.location.reload();
                  } else {
                    navigate("/tests");
                  }
                }}
                href={"/tests"}
              >
                <a>TESTS</a>
              </li>
            </ul>
          </div>

          <div
            className="side__bar__background__movil"
            onClick={() => setShowLeftBar(false)}
          />
        </React.Fragment>
      )}

      {showRightBar && (
        <React.Fragment>
          <div
            className="right__bar__background__movil"
            onClick={() => setShowRightBar(false)}
          />

          <div className="right__bar__movil">
            <ul className="right__bar__list">
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/profile");
                      window.location.reload();
                    } else {
                      navigate("/profile");
                    }
                  }}
                  href={"/profile"}
                >
                  {lengauge.lenguage === "español" ? "PERFIL" : "PROFILE"}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/friends");
                      window.location.reload();
                    } else {
                      navigate("/friends");
                    }
                  }}
                  href="/friends"
                >
                  {lengauge.lenguage === "español" ? "AMIGOS" : "FRIENDS"}
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (
                      window.location.href ===
                      "https://wirhir.netlify.app/llamadas/server"
                    ) {
                      navigate("/friendRequests");
                      window.location.reload();
                    } else {
                      navigate("/friendRequests");
                    }
                  }}
                  href="/friendRequests"
                >
                  {lengauge.lenguage === "español"
                    ? "SOLICITUDES DE AMISTAD"
                    : "FRIENDS REQUEST"}
                </a>
              </li>
              <LogOut>
                {lengauge === "español" ? "CERRAR SESION" : "LOGOUT"}
              </LogOut>

              <ChangeLenguage />
            </ul>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav__item">
      <div
        className="icon__button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {props.text}

        {open && props.children}
      </div>
    </li>
  );
};

function DropDownItem(props) {
  const navigate = useNavigate();
  return (
    <a
      className="menu__item"
      onClick={() => {
        if (
          window.location.href === "https://wirhir.netlify.app/llamadas/server"
        ) {
          navigate(`/${props.link}`);
          window.location.reload();
        } else {
          navigate(`/${props.link}`);
        }
      }}
      href={`/${props.link}`}
    >
      {props.children}
    </a>
  );
}

function LogOut(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    context.logout();
    navigate("/login");
  };

  return (
    <a className="menu__item" onClick={logOutHandler} href="/login">
      {props.children}
    </a>
  );
}

const ChangeLenguage = (props) => {
  const lenguage = useContext(LenguageContext);

  const changeLenguage = () => {
    lenguage.changeLenguage();
    window.location.reload();
  };

  return (
    <div onClick={changeLenguage} className="menu__item">
      {lenguage.lenguage === "español"
        ? "CHANGE TO ENGLISH"
        : "CAMBIAR A ESPAÑOL"}
    </div>
  );
};

const DropDownMenu = ({ lengauge }) => {
  return (
    <div className="dropdown">
      <DropDownItem link="articles">
        {lengauge === "español" ? "ARTICULOS" : "ARTICLES"}
      </DropDownItem>
      <DropDownItem link="tests">TESTS</DropDownItem>
    </div>
  );
};

const DropDownMenu2 = ({ lengauge }) => {
  return (
    <div className="dropdown">
      <DropDownItem link="stories">
        {lengauge === "español" ? "HISTORIAS" : "STORIES"}
      </DropDownItem>
      <DropDownItem link="discusions">
        {lengauge === "español" ? "DISCUSIONES" : "DISCUSIONS"}
      </DropDownItem>
      <DropDownItem link="calls">
        {lengauge === "español" ? "LLAMADAS" : "CALLS"}
      </DropDownItem>
      <DropDownItem link="chat">CHAT</DropDownItem>
    </div>
  );
};

const DropDownMenu3 = ({ lengauge }) => {
  return (
    <div className="dropdown">
      <DropDownItem link="profile">
        {lengauge === "español" ? "PERFIL" : "PROFILE"}
      </DropDownItem>
      <DropDownItem link="friends">
        {lengauge === "español" ? "AMIGOS" : "FRIENDS"}
      </DropDownItem>
      <DropDownItem link="friendRequests">
        {lengauge === "español" ? "SOLICITUDES DE AMISTAD" : "FRIEND REQUESTS"}
      </DropDownItem>
      <LogOut> {lengauge === "español" ? "CERRAR SESION" : "LOGOUT"} </LogOut>
      <ChangeLenguage />
    </div>
  );
};

export default NavBar;
