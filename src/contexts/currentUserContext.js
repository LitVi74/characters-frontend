import { createContext } from 'react';

const UserContext = {
  currentUser: {},
  setCurrentUser: (value) => {},
}

export const CurrentUserContext = createContext(UserContext);