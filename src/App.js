import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import LogIn from "./pages/LogIn/LogIn";
import Characters from "./pages/Characters/Characters";
import Spells from "./pages/Spells/Spells";
import SignUp from "./pages/SignUp/SignUp";

import ProtectedRoute from "./utils/ProtectedRoute";
import AuthService from "./service/AuthService/AuthService";

import { PATHS } from './constants/constants';

import { CurrentUserContext } from './contexts/currentUserContext';
import Error404 from "./pages/Error404/Error404";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState({ email: '', role: 'Admin', isActivated: true});
  const [ chars, setChars ] = useState([]);

  const cbLogin = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const { role, isActivated, accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      setCurrentUser({email, role, isActivated});
    } catch(err) {
      console.log(err);
    }
  };

  const cbLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      setCurrentUser({});
    } catch(err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const response = await AuthService.checkAuth();
      const { email, role, isActivated, accessToken } = response.data;
      localStorage.setItem('token', accessToken);
      setCurrentUser({email, role, isActivated});
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserData();
    }
  }, [])

  const routes = useRoutes([
    {
      path: PATHS.login,
      element: <LogIn cbLogin={cbLogin} />,
    },
    {
      path: PATHS.signup,
      element: <SignUp />,
    },
    {
      path: PATHS.spells + '/:charID',
      element: <Spells charList={true} chars={chars} />
    },
    {
      path: '/',
      element:<ProtectedRoute />,
      children: [
        {
          path: PATHS.characters,
          element: <Characters chars={chars} setChars={setChars}/>
        },
        {
          path: PATHS.spells,
          element: <Spells charList={false} />
        },
        {
          path: '*',
          element: <Navigate to={PATHS.page404} />
        }
      ]
    },
    {
      path: PATHS.page404,
      element: <Error404 />
    }
  ]);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(PATHS.characters);
    }
  }, [location])

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <Header cbLogout={cbLogout} />
      {routes}
    </CurrentUserContext.Provider>
  );
}
