import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import LogIn from "./pages/LogIn/LogIn";
import Characters from "./pages/Characters/Characters";
import Spells from "./pages/Spells/Spells";
import SignUp from "./pages/SignUp/SignUp";

import ProtectedRoute from "./utils/ProtectedRoute";

import { PATHS } from './constants/constants';

import { CurrentUserContext } from './contexts/currentUserContext';

export default function App() {
  const [ currentUser, setCurrentUser ] = useState({ name: '', role: 'Admin', isActivated: true, email: '' });
  const [ loggedIn, setLoggedIn ] = useState(false);

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
      path: PATHS.characters,
      element:
        <ProtectedRoute 
          component={Characters}
          loggedIn={loggedIn}
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
          loggedIn={loggedIn}
          charList={false}
        />
    },
    {
      path: '*',
      element:         
        <ProtectedRoute 
          component={Characters}
          loggedIn={loggedIn}
        />
    }
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      {routes}
    </CurrentUserContext.Provider>
  );
}
