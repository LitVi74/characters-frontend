import { AxiosResponse } from 'axios';

import api from './AuthAxios';
import { AuthResponse } from './AuthResponse';

export default class AuthService {
  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/signup', {email, password})
  }

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/signin', {email, password})
  }

  static async logout(): Promise<void> {
    return api.post('/signout')
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return api.get<AuthResponse>('/refresh')
  }
}