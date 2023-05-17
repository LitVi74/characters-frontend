import api from './ResourcesAxios';

export default class ResourcesService {
  static async getSpells() {
    const response = await api.get('/spells');
    return response.data;
  }

  static async createSpell(data) {
    return api.post('/spells', data)
  }

  static async deleteSpell(spellId) {
    return api.delete(`/spells/${spellId}`)
  }

  static async updateSpell(spellId, data) {
    return api.patch(`/spells/${spellId}`, data)
  }

  static async getUserCharacters() {
    return api.get('/characters')
  }

  static async createCharacter(name) {
    return api.post('/characters', {name})
  }

  static async getCharacter(charId) {
    return api.get(`/characters/${charId}`)
  }

  static async deleteCharacter(charId) {
    return api.delete(`/characters/${charId}`)
  }

  static async updateCharacter(charId, name) {
    return api.patch(`/characters/${charId}`, {name})
  }
}