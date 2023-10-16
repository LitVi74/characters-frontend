import { Navigate } from "react-router-dom";

import { PATHS } from "../shared/constants/constants";

import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Spells from "./Spells/Spells";
import ProtectedRoute from "../shared/utils/ProtectedRoute";
import Characters from "./Characters/Characters";
import Error404 from "./Error404/Error404";
import Home from "./Home/Home";
import CharacterSpells from "./Spells/CharacterSpells";

const ROUTES = [
  {
    path: PATHS.login,
    element: <LogIn />,
  },
  {
    path: PATHS.signup,
    element: <SignUp />,
  },
  {
    path: `${PATHS.characters}/:charID`,
    element: <CharacterSpells />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: PATHS.characters,
        element: <Characters />,
      },
      {
        path: PATHS.spells,
        element: <Spells />,
      },
    ],
  },
  {
    path: PATHS.home,
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
];

export default ROUTES;
