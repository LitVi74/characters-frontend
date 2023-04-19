import { AxiosResponse } from 'axios';

import api from './ResourcesAxios';
import { SpellResponse, CharactersResponse } from './ResourcesResponse'

export default class ResourcesService {
  static async getSpells(): Promise<AxiosResponse<SpellResponse[]>> {
    return api.get<SpellResponse[]>('/spells')
  }

  static async createSpell(data: SpellResponse): Promise<AxiosResponse<SpellResponse>> {
    return api.post<SpellResponse>('/spells', data)
  }

  static async deleteSpell(spellId: String): Promise<AxiosResponse<SpellResponse>> {
    return api.delete<SpellResponse>(`/spells/${spellId}`)
  }

  static async updateSpell(spellId: String, data: SpellResponse): Promise<AxiosResponse<SpellResponse>> {
    return api.patch<SpellResponse>(`/spells/${spellId}`, data)
  }

  static async getUserCharacters(): Promise<AxiosResponse<CharactersResponse[]>> {
    return api.get<CharactersResponse[]>('/characters')
  }

  static async createCharacters(name: String): Promise<AxiosResponse<CharactersResponse>> {
    return api.post<CharactersResponse>('/characters', {name})
  }

  static async getCharacter(charId: String): Promise<AxiosResponse<CharactersResponse>> {
    return api.get<CharactersResponse>(`/characters/${charId}`)
  }

  static async deleteCharacter(charId: String): Promise<AxiosResponse<CharactersResponse>> {
    return api.delete<CharactersResponse>(`/characters/${charId}`)
  }

  static async updateCharacter(charId: String): Promise<AxiosResponse<CharactersResponse>> {
    return api.patch<CharactersResponse>(`/characters/${charId}`)
  }
}