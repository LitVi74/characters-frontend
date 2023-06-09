import { useContext } from "react";
import logo from "../../assets/logo.svg";

import AuthorizedNavbar from "../AuthorizedNavbar/AuthorizedNavbar";
import UnauthorizedNavbar from "../UnauthorizedNavbar/UnauthorizedNavbar";

import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="d-flex flex-row align-content-center w-100 px-5">
      <img alt="" src={logo} width="42" height="42" />
      {currentUser.isActivated ? <AuthorizedNavbar /> : <UnauthorizedNavbar />}
    </header>
  );
}
