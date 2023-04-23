import LogIn from "./LogIn/LogIn";
import Characters from "./Characters/Characters";
import Spells from "./Spells/Spells";
import SignUp from "./SignUp/SignUp";

export const PATHS = {
  login: "/login",
  signup: "/signup",
  characters: "/characters",
  spells: "/spells"
}

export const PAGES = [
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