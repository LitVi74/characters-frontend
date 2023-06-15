import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { useRoutes } from "react-router-dom";

import ROUTES from "./pages/routes";
import Header from "./components/Header/Header";
import AuthService from "./service/AuthService/AuthService";
import { CurrentUserContext } from "./contexts/currentUserContext";

export default function App() {
  const [hasFirstLoader, setHasFirstLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    role: "",
    isActivated: false,
  });

  const getUserData = async () => {
    const { hasError, data } = await AuthService.checkAuth();
    const { _id, email, role, isActivated } = data;

    if (!hasError) {
      setCurrentUser({ _id, email, role, isActivated });
    }

    setHasFirstLoader(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    }
    // особенности работы navigate
    // если navigate в зависимости, то он перезапескает useEffect при изменении location
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentUserContextValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  const routes = useRoutes(ROUTES);

  return (
    <CurrentUserContext.Provider value={currentUserContextValue}>
      <Header />
      {hasFirstLoader && routes}
    </CurrentUserContext.Provider>
  );
}
