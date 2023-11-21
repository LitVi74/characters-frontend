/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './NavPopup.scss';
import { useCallback } from "react";
import { useLocation, NavLink } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import { PATHS } from '../../constants/constants';
import user from "../../contexts/userContext";

import AuthService from "../../service/AuthService/AuthService";

interface PropsNavPopup {
  navPopup: boolean;
  cbNavPopup: () => void;
}

const NavPopup = observer(({ navPopup, cbNavPopup }: PropsNavPopup) => {
  const { pathname } = useLocation();

  const handleExitButtonClick = useCallback(async () => {
    cbNavPopup();
    
    const { hasError } = await AuthService.logout();
    if (!hasError) {
      user.setUser({
        _id: "",
        email: "",
        role: "User",
        isActivated: false,
      });
    }
  }, [cbNavPopup]);

  const handleClickLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if(pathname !== e.currentTarget.pathname) {
      cbNavPopup();
    }
  }, [cbNavPopup, pathname])

  const handlerClickClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      cbNavPopup();
    }
  }, [cbNavPopup])

  return (
    <div className={`menu${navPopup ? ' menu_active' : ''}`} onClick={handlerClickClose} >
      <nav className='menu__container'>
        <button onClick={cbNavPopup} className='menu__close button'></button>
        <div className='menu__nav'>
          <NavLink onClick={handleClickLink} to={PATHS.spells} className={`menu__link${pathname === PATHS.spells ? ' menu__link_active' : ''} link`}>Заклинания</NavLink>
          <NavLink onClick={handleClickLink} to={PATHS.characters} className={`menu__link${pathname === PATHS.characters ? ' menu__link_active' : ''} link`}>Персонажи</NavLink>
        </div>
        <NavLink onClick={handleExitButtonClick} to={PATHS.login} className='menu__link menu__link_profile link'>Выход</NavLink>
      </nav>
    </div>
  )
});

export default NavPopup;