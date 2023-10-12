enum School {
  Воплощение = 'Воплощение',
  Вызов = 'Вызов',
  Иллюзия = 'Иллюзия',
  Некромантия = 'Некромантия',
  Ограждение = 'Ограждение',
  Очарование = 'Очарование',
  Преобразование = 'Преобразование',
  Прорицание = 'Прорицание'
}

export enum Classes {
  Бард = 'Бард',
  Жрец = 'Жрец',
  Паладин = 'Паладин',
  Следопыт = 'Следопыт',
  Чародей = 'Чародей',
  Колдун = 'Колдун',
  Волшебник = 'Волшебник',
  Друид = 'Друид',
  Изобретатель = 'Изобретатель'
}

export interface SpellData {
  name: string;
  desc: string;
  higher_level?: string;
  range: string;
  components: ['В', 'С'?, 'М'?];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: School;
  classes: Classes[];
}

export interface ISpell extends SpellData {
  _id: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: 'User' | 'Admin';
  isActivated: boolean;
  accessToken?: string;
}

export interface ICharacter {
  name?: string;
  spells: ISpell[];
  owner?: string;
}

export interface FormState {
  show: boolean;
  chosenSpell: Partial<ISpell>;
}