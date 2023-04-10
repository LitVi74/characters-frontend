import {RouteObject} from "react-router-dom"
import LogIn from "./login";
import Characters from "./characters";
import Spells from "./spells";
import Authorization from "./authorization";
import SignUp from "./signup";

export const PAGES: RouteObject[] = [
  {
    path: 'authorization',
    element: <Authorization />,
    children: [
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ]
  },
  {
    path: 'characters',
    element: <Characters />
  },
  {
    path: 'spells/:charID',
    element: <Spells />
  },
];