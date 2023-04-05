import {RouteObject} from "react-router-dom"
import LogIn from "./login";
import Characters from "./characters";
import Spells from "./spells";

export const PAGES: RouteObject[] = [
  {
    path: 'login',
    element: <LogIn />
  },
  {
    path: 'characters',
    element: <Characters />
  },
  {
    path: 'spells',
    element: <Spells />
  },
];