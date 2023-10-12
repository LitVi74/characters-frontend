import { AxiosError } from "axios";
import api from "./ResourcesAxios";
import { ICharacter, ISpell } from "../../constants/IConstants";
import { ServicePrototype, Result } from "../ServicePrototype";

export default class ResourcesService extends ServicePrototype {
  static _extractData(res: any) {
    return res.data;
  }

  static async getSpells() {
    const result: Result<ISpell[]> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.get<ISpell[]>("/spells");
      const spells = response.data;
      
      sessionStorage.setItem("spellsData", JSON.stringify(spells));
      result.data = spells;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async createSpell(data: ISpell) {
    const result: Result<ISpell[]> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.post<ISpell>("/spells", data);

      const newSpell = response.data;
      let allSpells: ISpell[] = JSON.parse(sessionStorage.getItem("spellsData") || '[]');

      allSpells = [...allSpells, newSpell];

      sessionStorage.setItem("spellsData", JSON.stringify(allSpells));

      result.data = allSpells;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async deleteSpell(spellId: string) {
    const result: Result<ISpell[]> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      await api.delete<ISpell>(`/spells/${spellId}`);

      let spellsData = JSON.parse(sessionStorage.getItem("spellsData") || '[]');
      spellsData = spellsData.filter((s: ISpell) => s._id !== spellId);
      sessionStorage.setItem("spellsData", JSON.stringify(spellsData));

      result.data = spellsData;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async updateSpell(spellId: string, data: ISpell) {
    const result: Result<ISpell[]> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.patch<ISpell>(`/spells/${spellId}`, data);

      const newSpell = response.data;
      let allSpells = JSON.parse(sessionStorage.getItem("spellsData") || '[]');

      allSpells = allSpells.map((s: ISpell): ISpell => {
        if (newSpell._id === s._id) {
          return newSpell;
        }
        return s;
      });

      sessionStorage.setItem("spellsData", JSON.stringify(allSpells));

      result.data = allSpells;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }
    return result;
  }

  static async getUserCharacters() {
    const result: Result<ICharacter[]> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.get<ICharacter[]>("/characters");

      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async createCharacter(charData: ICharacter) {
    const result: Result<ICharacter> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.post<ICharacter>("/characters", charData);

      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async getCharacter(charId: string) {
    const result: Result<ICharacter> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.get<ICharacter>(`/characters/${charId}`);

      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async deleteCharacter(charId: string) {
    const result: Result<ICharacter> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.delete<ICharacter>(`/characters/${charId}`);

      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }

  static async updateCharacter(charId: string, obj: ICharacter) {
    const result: Result<ICharacter> = {
      hasError: false,
      errorMessage: "",
      data: null,
    };

    try {
      const response = await api.patch<ICharacter>(`/characters/${charId}`, obj);

      result.data = response.data;
    } catch (error) {
      const err = error as AxiosError;
      this._handlerError(result, err);
    }

    return result;
  }
}
