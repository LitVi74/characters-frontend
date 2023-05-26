const spellsData = [
  {
    _id: "1",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь. Цель должна преуспеть в спасброске Ловкости, иначе получит 1к8 урона излучением. Для этого спасброска цель не получает преимуществ от укрытия.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Жрец"],
  },
  {
    _id: "2",
    name: "Адское возмездие",
    desc: `Вы указываете пальцем, и существо, причинившее вам урон, мгновенно окружается пламенем. Существо должно совершить спасбросок Ловкости. Оно получает 2к10 урона огнём при провале, или половину этого урона при успехе.`,
    higher_level: "Если вы накладываете это заклинание, используя ячейку 2-го уровня или выше, урон увеличивается на 1к10 за каждый уровень ячейки выше первого.",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 реакция, совершаемая вами, когда вы получаете урон от существа, находящегося в пределах 60 футов от вас и видимого вами",
    level: 1,
    school: "Воплощение",
    classes: ["Жрец"],
  },
  {
    _id: "3",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Колдун"],
  },
  {
    _id: "4",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Колдун"],
  },
  {
    _id: "5",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Колдун"],
  },
  {
    _id: "6",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Колдун"],
  },
];

const PATHS = {
  login: "/login",
  signup: "/signup",
  characters: "/characters",
  spells: "/spells",
  page404: "/404",
}

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
  castingTime: [
    "1 действие",
    "1 бонусное действие",
    "1 реакция",
  ],
}

const API_URL = 'https://dnd-characters.ru/api';

export { spellsData, PATHS, API_URL, SPELL };