import { createContext } from "react";
import { IUser } from "../constants/IConstants";

interface IUserContext {
  currentUser: IUser | null;
  setCurrentUser: (x: IUser) => IUser | null;
}

const UserContext = {
  currentUser: null,
  setCurrentUser: () => null,
};

// eslint-disable-next-line import/prefer-default-export
export const CurrentUserContext = createContext<IUserContext>(UserContext);
