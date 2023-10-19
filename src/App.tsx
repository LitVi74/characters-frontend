import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRoutes } from "react-router-dom";

import ROUTES from "./pages/routes";
import Header from "./shared/components/Header/Header";
import AuthService from "./shared/service/AuthService/AuthService";
import NavPopup from "./shared/components/NavPopup/NavPopup";

import { CurrentUserContext } from "./shared/contexts/currentUserContext";
import { IUser } from "./shared/constants/IConstants";
import { ESC } from "./shared/constants/constants";

export default function App() {
  const [hasFirstLoader, setHasFirstLoader] = useState(false);
  const [navPopup, setNavPopup] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<IUser>({
    _id: "",
    email: "",
    role: "User",
    isActivated: false,
  });

  const handleNavPopup = useCallback(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.keyCode === ESC) {
        setNavPopup(false);
      }
    };

    if(!navPopup) {
      document.addEventListener('keydown', handleEscClose);
    } else {
      document.removeEventListener('keydown', handleEscClose);
    }

    setNavPopup(!navPopup);
  }, [navPopup])

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setHasFirstLoader(true);
      return;
    }

    const { hasError, data } = await AuthService.checkAuth();

    if (!hasError && data) {
      const { _id, email, role, isActivated } = data;

      setCurrentUser({ _id, email, role, isActivated });
    }

    setHasFirstLoader(true);
  }, []);

  useEffect(() => {
    getUserData();
    // особенности работы navigate
    // если navigate в зависимости, то он перезапескает useEffect при изменении location
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserData]);

  const currentUserContextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  const routes = useRoutes(ROUTES);

  return (
    <CurrentUserContext.Provider value={currentUserContextValue}>
      <Header 
        cbNavPopup={handleNavPopup} 
      />
      {hasFirstLoader && routes}
      {currentUser.isActivated && 
        <NavPopup 
          navPopup={navPopup}
          cbNavPopup={handleNavPopup}
        />}
    </CurrentUserContext.Provider>
  );
}
