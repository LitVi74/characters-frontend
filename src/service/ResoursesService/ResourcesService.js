/* eslint-disable no-console */
import api from "./ResourcesAxios";

export default class ResourcesService {
  static _extractData(res) {
    return res.data;
  }

  static async getSpells() {
    const res = await api.get("/spells");
    return this._extractData(res);
  }

  static async createSpell(data) {
    const res = await api.post("/spells", data);
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
    const res = await api.get("/characters");
    return this._extractData(res);
  }

  static async createCharacter(charName) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };
    try {
      const response = await api.post("/characters", { charName });

      result.data = response.data;
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async getCharacter(charId) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.get(`/characters/${charId}`);

      result.data = response.data;
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async deleteCharacter(charId) {
    const res = await api.delete(`/characters/${charId}`);
    return this._extractData(res);
  }

  static async updateCharacter(charId, obj) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };
    try {
      const response = await api.patch(`/characters/${charId}`, obj);

      result.data = response.data;
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err.response.data.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }
}
