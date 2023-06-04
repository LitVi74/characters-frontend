import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import ROUTES from "./pages/routes";
import Header from "./components/Header/Header";
import AuthService from "./service/AuthService/AuthService";
import { PATHS } from "./constants/constants";
import { CurrentUserContext } from "./contexts/currentUserContext";

export default function App() {
  const navigate = useNavigate();
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

    return hasError;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData().then((hasError) => !hasError && navigate(PATHS.characters));
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
      {routes}
    </CurrentUserContext.Provider>
  );
}
