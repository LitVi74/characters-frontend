import api from './ResourcesAxios';

export default class ResourcesService {
  static async getSpells() {
    return api.get('/spells')
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

  static async createCharacters(name) {
    return api.post('/characters', {name})
  }

  static async getCharacter(charId) {
    return api.get(`/characters/${charId}`)
  }

  static async deleteCharacter(charId) {
    return api.delete(`/characters/${charId}`)
  }

  static async updateCharacter(charId, spells) {
    return api.patch(`/characters/${charId}`, {spells})
  }
}