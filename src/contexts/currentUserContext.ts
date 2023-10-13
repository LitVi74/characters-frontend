import { createContext } from "react";
import { IUser } from "../constants/IConstants";

interface IUserContext {
  currentUser: IUser;
  setCurrentUser: (x: IUser) => null;
}

const UserContext = {
  currentUser: {
    _id: '',
    email: '',
    role: 'User' as 'User',
    isActivated: false
  },
  setCurrentUser: () => null,
};

// eslint-disable-next-line import/prefer-default-export
export const CurrentUserContext = createContext<IUserContext>(UserContext);
