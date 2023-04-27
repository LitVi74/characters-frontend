import logo from "./../../assets/logo.svg";

import { useContext } from 'react';

import AuthorizedNavbar from "../AuthorizedNavbar/AuthorizedNavbar";
import UnauthorizedNavbar from "../UnauthorizedNavbar/UnauthorizedNavbar";

import { CurrentUserContext } from '../../contexts/currentUserContext';

export default function Header({cbLogout}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="d-flex flex-row align-content-center w-100 px-2">
      <img
        alt=""
        src={logo}
        width="42"
        height="42"
      />
      {currentUser.isActivated
        ? <AuthorizedNavbar cbLogout={cbLogout} />
        : <UnauthorizedNavbar />}
    </header>
  );
}