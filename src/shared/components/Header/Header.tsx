/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./Header.scss";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { PATHS } from "../../constants/constants";
import logo from "../../../assets/logo.svg";

import UnauthorizedNavbar from "../UnauthorizedNavbar/UnauthorizedNavbar";

import user from "../../contexts/userContext";

interface PropsHeader {
  cbNavPopup: () => void
}

const Header = observer(({ cbNavPopup }: PropsHeader) => {
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
        className={user.data.isActivated ? 'image-button' : ''}
      />
      {!user.data.isActivated 
        ? <UnauthorizedNavbar /> 
        : <p>{user.data.email}</p>
        }
    </header>
  );
});

export default Header;
