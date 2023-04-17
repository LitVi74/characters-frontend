import axios from 'axios';

import api from '../Axios';
import { AuthResponse } from './MainResponse';

const API_URL = 'http://localhost:3000';

export default class MainApi {
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  static async registration(email: string, password: string): Promise<axios.AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/signup', {email, password});

    // return fetch(`${this._URL}signup`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({password, email})
    // })
    // .then(this._checkResponse)
  }

  static async login(email: string, password: string): Promise<axios.AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/signin', {email, password});
    
    // fetch(`${this._URL}signin`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({password, email})
    // })
    // .then(this._checkResponse)
  }

  static async logout(): Promise<void> {
    return api.post('/signout')
  }

  static async checkAuth(): Promise<axios.AxiosResponse<AuthResponse>> {
    return axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
  }

  getContent(token) {
    return fetch(`${this._URL}users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  }

  getUserCards() {
    return fetch(`${this._URL}spells`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._URL}movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  createCard(card) {
    return fetch(`${this._URL}movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card)
    })
    .then(this._checkResponse);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._URL}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }
}