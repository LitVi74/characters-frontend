import { createContext } from "react";
import { IUser } from "../constants/constants";

interface IUserContext {
  currentUser: IUser | null;
  setCurrentUser: () => IUser | null;
}

const UserContext = {
  currentUser: null,
  setCurrentUser: () => null,
};

// eslint-disable-next-line import/prefer-default-export
export const CurrentUserContext = createContext<IUserContext>(UserContext);
