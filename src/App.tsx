import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {PAGES} from "./pages";
import Header from "./components/header";
import {IUser, UserContext} from "./hooks/useUsetContext";
import {useState} from "react";

function App() {
  const routers = useRoutes(PAGES)

  const [user, setUser] = useState<IUser>();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Header isAuthorized={!!user} />
      {routers}
    </UserContext.Provider>
  );
}

export default App;
