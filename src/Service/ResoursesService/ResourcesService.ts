export default class ResoursesService {
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