import {RouteObject} from "react-router-dom"
import LogIn from "./login";
import Characters from "./characters";
import Spells from "./spells";
import SignUp from "./signup";

export const PATHS = {
  login: "/login",
  signup: "/signup",
  characters: "/characters",
  spells: "/spells"
}

export const PAGES: RouteObject[] = [
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
    element: <Characters />
  },
  {
    path: PATHS.spells + '/:charID',
    element: <Spells />
  },
];