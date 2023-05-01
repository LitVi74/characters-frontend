import api from './AuthAxios';

export default class AuthService {
  static async registration(email, password) {
    return api.post('/signup', {email, password})
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