import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";

import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Spells from "./pages/Spells/Spells";
import Header from "./components/Header/Header";
import Error404 from "./pages/Error404/Error404";
import Characters from "./pages/Characters/Characters";

import AuthService from "./service/AuthService/AuthService";
import ProtectedRoute from "./utils/ProtectedRoute";

import { PATHS } from "./constants/constants";

import { CurrentUserContext } from "./contexts/currentUserContext";

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    role: "",
    isActivated: false,
  });
  const [chars, setChars] = useState([]);

  const getUserData = async () => {
    const { hasError, data } = await AuthService.checkAuth();

    if (!hasError) {
      setCurrentUser(data);
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

  const routes = useRoutes([
    {
      path: PATHS.login,
      element: <LogIn />,
    },
    {
      path: PATHS.signup,
      element: <SignUp />,
    },
    {
      path: `${PATHS.spells}/:charID`,
      element: <Spells />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: PATHS.characters,
          element: <Characters chars={chars} setChars={setChars} />,
        },
        {
          path: PATHS.spells,
          element: <Spells />,
        },
        {
          path: "*",
          element: <Navigate to={PATHS.page404} />,
        },
      ],
    },
    {
      path: PATHS.page404,
      element: <Error404 />,
    },
  ]);

  return (
    <CurrentUserContext.Provider value={currentUserContextValue}>
      <Header />
      {routes}
    </CurrentUserContext.Provider>
  );
}
