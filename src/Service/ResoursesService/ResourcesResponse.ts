export interface SpellResponse {
  _id: string;
  name: string;
  desc: string;
  higher_level?: string;
  range: number;
  components: [ string, string?, string? ];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: string;
  classes: string[];
}

export interface CharactersResponse {
  _id: string;
  name: string;
  spells?: SpellResponse[];
  owner?: string;
}