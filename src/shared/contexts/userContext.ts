import { makeAutoObservable } from 'mobx';
import { IUser } from "../constants/IConstants";

class User {
  data = {
    _id: '',
    email: '',
    role: 'User',
    isActivated: false
  }

  constructor() {
    makeAutoObservable(this);
  }

  setUser(data: IUser) {
    this.data = data;
  }
}

export default new User;

