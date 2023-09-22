import "./SpellsCard.scss";

export default function SpellCard({ spell, button }) {
  const {
    name,
    school,
    level,
    casting_time: castingTime,
    range,
    components,
    material,
    concentration,
    duration,
    classes,
    desc,
    higher_level: higherLevel,
    ritual,
  } = spell;

  return (
    <li className="spell">
      <div className="spell__container">
        <h3 className="spell__title">{name}</h3>
        {button}
      </div>
      <div className="spell__grid grid">
        <div className="spell__container grid__element">
          <p className="spell__text">
            {school} {ritual ? " (ритуал)" : ""}
          </p>
          <p className="spell__text">{`${level} уровень`}</p>
        </div>
        <div className="grid__element">
          <p className="spell__text grid__text">{`Время накладывания: ${castingTime}`}</p>
          <p className="spell__text grid__text">{`Дистанция: ${range}`}</p>
          <p className="spell__text grid__text">{`Длительность: ${
            concentration ? "Концентрация, вплоть до " : ""
          }${duration}`}</p>
        </div>
        <p className="spell__text grid__element">{`Компоненты: ${components.join(", ")}${
          material ? `(${material})` : ""
        }`}</p>
      </div>
      <p className="spell__text">{`Классы: ${classes.join(", ")}`}</p>
      <p className="spell__text">{desc}</p>
      {higherLevel ? (
        <p className="spell__text">{`На больших уровнях: ${higherLevel}`}</p>
      ) : null}
    </li>
  );
}
