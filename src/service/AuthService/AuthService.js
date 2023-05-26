import api from './AuthAxios';

export default class AuthService {
  static async registration(email, password) {
    let result = {
      hasError: false,
      errorMessage: "",
    }
    try {
      const response =  await api.post('/signup', {email, password});

      localStorage.setItem('token', response.data.accessToken);
    } catch(err) {
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err.message)
    }
    return result;
  }

  static async login(email, password) {
    return api.post('/signin', {email, password})
  }

  static async logout() {
    return api.post('/signout')
  }

  static async checkAuth() {
    return api.get('/refresh')
  }
}