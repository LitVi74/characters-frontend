import { AxiosResponse } from 'axios';

import api from './ResourcesAxios';
import { SpellResponse } from './ResourcesResponse'

export default class ResoursesService {
  static async getSpells(): Promise<AxiosResponse<SpellResponse>> {
    return api.get<SpellResponse>('/spells')
  }

  static async createSpell(data): Promise<AxiosResponse<SpellResponse>> {
    return api.post<SpellResponse>('/spells', {...data})
  }

  static async deleteSpell(spellId: String): Promise<AxiosResponse<SpellResponse>> {
    return api.delete<SpellResponse>(`/spells/${spellId}`)
  }

  static async updateSpell(spellId: String): Promise<AxiosResponse<SpellResponse>> {
    return api.update<SpellResponse>(`/spells/${spellId}`)
  }
}