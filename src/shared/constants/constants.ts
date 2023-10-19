const PATHS = {
  home: "/",
  login: "/login",
  signup: "/signup",
  characters: "/characters",
  spells: "/spells",
  page404: "/404",
};

const ESC = 13;

const SPELL = {
  levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  classes: [
    "Бард",
    "Волшебник",
    "Друид",
    "Изобретатель",
    "Жрец",
    "Колдун",
    "Манах",
    "Паладин",
    "Плут",
    "Следопыт",
    "Чародей",
  ],
  schools: [
    "Вызов",
    "Воплощение",
    "Илюзия",
    "Некромантия",
    "Ограждение",
    "Очарование",
    "Преобразование",
    "Прорицание",
  ],
  castingTime: ["1 действие", "1 бонусное действие", "1 реакция"],
};

const API_URL = "https://dnd-characters.ru/api";

export { PATHS, API_URL, SPELL, ESC };
