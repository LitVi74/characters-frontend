import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
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

export default function App() {
  const [ currentUser, setCurrentUser ] = useState({ email: '', role: '', isActivated: false });
  const [ chars, setChars ] = useState([]);

  const cbRegister = async (email, password) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
    } catch(err) {
      console.log(err);
    }
  };

  const cbLogin = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const { email, role, isActivated, accessToken } = response.data;
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
      element: <SignUp cbRegister={cbRegister} />,
    },
    {
      path: PATHS.characters,
      element:
        <ProtectedRoute
          component={Characters}
          chars={chars}
          setChars={setChars}
        />
    },
    {
      path: PATHS.spells + '/:charID',
      element: <Spells charList={true} />
    },
    {
      path: PATHS.spells,
      element: 
        <ProtectedRoute 
          component={Spells}
          charList={false}
          chars={chars}
        />
    },
    {
      path: '*',
      element:         
        <ProtectedRoute 
          component={Characters}
        />
    }
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header cbLogout={cbLogout} />
      {routes}
    </CurrentUserContext.Provider>
  );
}
