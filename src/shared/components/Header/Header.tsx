/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./Header.scss";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/constants";
import logo from "../../../assets/logo.svg";

import UnauthorizedNavbar from "../UnauthorizedNavbar/UnauthorizedNavbar";

import { CurrentUserContext } from "../../contexts/currentUserContext";

interface PropsHeader {
  cbNavPopup: () => void
}

export default function Header({ cbNavPopup }: PropsHeader) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const reg = /\/characters\/[a-z0-9]+/;
  const headerFixed = reg.test(location.pathname) ||  location.pathname === PATHS.spells;

  return (
    <header className={`d-flex align-items-center justify-content-between w-100 ${headerFixed ? 'desctop-header' : ''}`}>
      <img 
        alt="" 
        src={logo} 
        width="42" 
        height="42" 
        onClick={cbNavPopup} 
        className={currentUser.isActivated ? 'image-button' : ''}
      />
      {!currentUser.isActivated 
        ? <UnauthorizedNavbar /> 
        : <p>{currentUser.email}</p>
        }
    </header>
  );
}
