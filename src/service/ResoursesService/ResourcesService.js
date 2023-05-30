import api from './ResourcesAxios';

export default class ResourcesService {
  static _extractData(res) {
    return res.data;
  }

  static async getSpells() {
    const res = await api.get('/spells');
    return this._extractData(res);
  }

  static async createSpell(data) {
    const res = await api.post('/spells', data);
    return this._extractData(res);
  }

  static async deleteSpell(spellId) {
    const res = await api.delete(`/spells/${spellId}`);
    return this._extractData(res);
  }

  static async updateSpell(spellId, data) {
    const res = await api.patch(`/spells/${spellId}`, data);
    return this._extractData(res);
  }

  static async getUserCharacters() {
    const res = await api.get('/characters');
    return this._extractData(res);
  }

  static async createCharacter(name) {
    const res = await api.post('/characters', {name});
    return this._extractData(res);
  }

  static async getCharacter(charId) {
    const res = await api.get(`/characters/${charId}`);
    return this._extractData(res);
  }

  static async deleteCharacter(charId) {
    const res = await api.delete(`/characters/${charId}`);
    return this._extractData(res);
  }

  static async updateCharacter(charId, data) {
    const res = await api.patch(`/characters/${charId}`, {data});
    return this._extractData(res);
  }
}