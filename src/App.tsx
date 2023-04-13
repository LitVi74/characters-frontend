import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {PAGES} from "./pages";

function App() {
  const routers = useRoutes(PAGES)

  return (
    <>
      {routers}
    </>
  );
}

export default App;
