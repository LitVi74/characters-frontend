import { createContext } from "react";

const UserContext = {
  currentUser: {},
  setCurrentUser: () => {},
};

// eslint-disable-next-line import/prefer-default-export
export const CurrentUserContext = createContext(UserContext);
