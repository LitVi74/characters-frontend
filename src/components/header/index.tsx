import logo from "./../../assets/ligo.svg";
import AuthorizedNavbar from "./authorized navbar";
import UnauthorizedNavbar from "./unauthorized navbar";
import {FC} from "react";
import {IHeaderProps} from "./interface";

const Header:FC<IHeaderProps> = ({isAuthorized = false}) => {
  return (
    <header className="d-flex flex-row align-content-center w-100 px-2">
      <img
        alt=""
        src={logo}
        width="42"
        height="42"
      />
      {isAuthorized
        ? <AuthorizedNavbar />
        : <UnauthorizedNavbar />}
    </header>
  );
};

export default Header;