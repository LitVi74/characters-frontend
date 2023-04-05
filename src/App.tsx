import { useRoutes } from "react-router-dom";

import {PAGES} from "./pages";

function App() {
  const routers = useRoutes(PAGES)

  return (
    <div>
      {routers}
    </div>
  );
}

export default App;
