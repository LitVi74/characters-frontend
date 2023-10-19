import "./Header.scss";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/constants";
import logo from "../../../assets/logo.svg";

import AuthorizedNavbar from "../AuthorizedNavbar/AuthorizedNavbar";
import UnauthorizedNavbar from "../UnauthorizedNavbar/UnauthorizedNavbar";

import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const reg = /\/characters\/[a-z0-9]+/;
  const headerFixed = reg.test(location.pathname) ||  location.pathname === PATHS.spells;

  return (
    <header className={`d-flex flex-row align-content-center w-100 ${headerFixed ? 'desctop-header' : ''}`}>
      <img alt="" src={logo} width="42" height="42" />
      {currentUser.isActivated ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
    </header>
  );
}
