import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { PAGES } from "./pages/pages";
import Header from "./components/Header/Header";
import { useState } from "react";

import { CurrentUserContext } from './contexts/currentUserContext';

export default function App() {
  const [ currentUser, setCurrentUser ] = useState({ name: '', role: 'User', isActivated: false, email: '' });
  const routers = useRoutes(PAGES);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      {routers}
    </CurrentUserContext.Provider>
  );
}
