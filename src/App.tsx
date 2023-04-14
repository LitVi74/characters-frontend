import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {PAGES} from "./pages";
import Header from "./components/header";

function App() {
  const routers = useRoutes(PAGES)

  return (
    <>
      <Header />
      {routers}
    </>
  );
}

export default App;
