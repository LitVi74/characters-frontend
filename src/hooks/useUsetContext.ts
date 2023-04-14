import {createContext, useContext} from "react";

interface IUser{
  id: string;
  role: string;
  email: string;
}

interface IUserContext {
  user?: IUser;
  setUser: (newUser: IUser) => void
}

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: (newUser) => {}
});

const useGetUser: () => IUserContext = () => {
  return useContext(UserContext);
}

export { UserContext, useGetUser};
export type { IUser }