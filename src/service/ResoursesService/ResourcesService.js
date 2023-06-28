/* eslint-disable no-console */
import api from "./ResourcesAxios";

export default class ResourcesService {
  static _extractData(res) {
    return res.data;
  }

  static async getSpells() {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      let spells = JSON.parse(sessionStorage.getItem("spellsData"));

      if (!spells) {
        const response = await api.get("/spells");
        spells = response.data;

        sessionStorage.setItem("spellsData", JSON.stringify(spells));
      }

      result.data = { spells };
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async createSpell(data) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.post("/spells", data);

      const newSpell = response.data;
      let allSpells = JSON.parse(sessionStorage.getItem("spellsData"));

      allSpells = [...allSpells, newSpell];

      sessionStorage.setItem("spellsData", JSON.stringify(allSpells));

      result.data = {
        newSpell,
        allSpells,
      };
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async deleteSpell(spellId) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      await api.delete(`/spells/${spellId}`);

      let spellsData = JSON.parse(sessionStorage.getItem("spellsData"));
      spellsData = spellsData.filter((s) => s._id !== spellId);
      sessionStorage.setItem("spellsData", JSON.stringify(spellsData));

      result.data = {
        spells: spellsData,
      };
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
      console.log(err);
    }

    return result;
  }

  static async updateSpell(spellId, data) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.patch(`/spells/${spellId}`, data);

      const newSpell = response.data;
      let allSpells = JSON.parse(sessionStorage.getItem("spellsData"));

      allSpells = allSpells.map((s) => {
        if (newSpell._id === s._id) {
          return newSpell;
        }
        return s;
      });

      sessionStorage.setItem("spellsData", JSON.stringify(allSpells));

      result.data = {
        newSpell,
        allSpells,
      };
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }

  static async getUserCharacters() {
    const res = await api.get("/characters");
    return this._extractData(res);
  }

  static async createCharacter(charData) {
    const result = {
      hasError: false,
      errorMessage: "",
      data: {},
    };

    try {
      const response = await api.post("/characters", charData);

      result.data = response.data;
    } catch (err) {
      result.data = {};
      result.hasError = true;
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
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
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
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
      result.errorMessage = err?.response?.data?.message || "Что-то сильно пошло не так";
      console.log(err);
    }
    return result;
  }
}
