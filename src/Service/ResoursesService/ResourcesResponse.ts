export interface SpellResponse {
  _id: String;
  name: String;
  desc: String;
  higher_level?: String;
  range: Number;
  components: [ String, String?, String? ];
  material: String;
  ritual: Boolean;
  duration: String;
  concentration: Boolean;
  casting_time: String;
  level: Number;
  school: String;
  classes: String[];
}

export interface CharactersResponse {
  _id: String;
  name: String;
  spells?: SpellResponse[];
  owner?: String;
}