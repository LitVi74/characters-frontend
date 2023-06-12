import { useEffect, useState } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import LogIn from "./pages/LogIn/LogIn";
import Characters from "./pages/Characters/Characters";
import Spells from "./pages/Spells/Spells";
import SignUp from "./pages/SignUp/SignUp";

import ProtectedRoute from "./utils/ProtectedRoute";
import AuthService from "./service/AuthService/AuthService";

import { PATHS } from "./constants/constants";

import { CurrentUserContext } from "./contexts/currentUserContext";
import Error404 from "./pages/Error404/Error404";
import Home from "./pages/Home/Home";

export default function App() {
  const navigate = useNavigate();
  const [hasFirstLoader, setHasFirstLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    role: "",
    isActivated: false,
  });
  const [chars, setChars] = useState([]);

  const cbLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      setCurrentUser({ _id: "", email: "", role: "", isActivated: false });
      navigate(PATHS.login);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const response = await AuthService.checkAuth();
      const { _id, email, role, isActivated, accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      setCurrentUser({ _id, email, role, isActivated });
    } catch (err) {
      console.log(err);
    } finally {
      setHasFirstLoader(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    }
  }, []);

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
      path: PATHS.spells + "/:charID",
      element: <Spells charList={true} />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: PATHS.characters,
          element: <Characters chars={chars} setChars={setChars} />,
        },
        {
          path: PATHS.spells,
          element: <Spells charList={false} />,
        },
      ],
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Navigate to={PATHS.page404} />,
    },
    {
      path: PATHS.page404,
      element: <Error404 />,
    },
  ]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Header cbLogout={cbLogout} />
      {hasFirstLoader && routes}
    </CurrentUserContext.Provider>
  );
}
