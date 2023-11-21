import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRoutes } from "react-router-dom";

import ROUTES from "./pages/routes";
import Header from "./shared/components/Header/Header";
import AuthService from "./shared/service/AuthService/AuthService";
import NavPopup from "./shared/components/NavPopup/NavPopup";

import user from "./shared/contexts/userContext";
import { ESC } from "./shared/constants/constants";

const App = observer(() => {
  const [hasFirstLoader, setHasFirstLoader] = useState(false);
  const [navPopup, setNavPopup] = useState<boolean>(false)

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

      user.setUser({ _id, email, role, isActivated });
    }

    setHasFirstLoader(true);
  }, []);

  useEffect(() => {
    getUserData();
    // особенности работы navigate
    // если navigate в зависимости, то он перезапескает useEffect при изменении location
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserData]);

  const routes = useRoutes(ROUTES);

  return (
    <>
      <Header 
        cbNavPopup={handleNavPopup} 
      />
      {hasFirstLoader && routes}
      {user.data.isActivated && 
        <NavPopup 
          navPopup={navPopup}
          cbNavPopup={handleNavPopup}
        />}
    </>
  );
});

export default App;
