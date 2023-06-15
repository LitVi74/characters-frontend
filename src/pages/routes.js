import { Navigate } from "react-router-dom";

import { PATHS } from "../constants/constants";

import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Spells from "./Spells/Spells";
import ProtectedRoute from "../utils/ProtectedRoute";
import Characters from "./Characters/Characters";
import Error404 from "./Error404/Error404";
import Home from "./Home/Home";

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
    path: `${PATHS.spells}/:charID`,
    element: <Spells />,
  },
  {
    path: "/",
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
];

export default ROUTES;
