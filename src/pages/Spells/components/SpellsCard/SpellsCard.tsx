import "./SpellsCard.scss";
import { FC, ReactNode } from "react";
import { ISpell } from "../../../../shared/constants/IConstants";

interface SpellCardProps {
  spell: ISpell;
  button: ReactNode;
}

const SpellCard: FC<SpellCardProps> = ({ spell, button }) => {
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
          <p className="spell__text spell__text_padding-none spell__text_style_italic">
            {school} {ritual ? " (ритуал)" : ""}
          </p>
          <p className="spell__text spell__text_padding-none spell__text_style_italic">{`${level} уровень`}</p>
        </div>
        <div className="grid__element">
          <p className="spell__text">
            <span className="spell__classes">Время накладывания: </span>
            {castingTime}
          </p>
          <p className="spell__text">
            <span className="spell__classes">Дистанция: </span>
            {range}
          </p>
          <p className="spell__text spell__text_padding-none">
            <span className="spell__classes">Длительность: </span>
            {`${concentration ? "Концентрация, вплоть до " : ""}${duration}`}
          </p>
        </div>
        <p className="spell__text grid__element">
          <span className="spell__classes">Компоненты: </span>
          {`${components.join(", ")}${material ? `(${material})` : ""}`}
        </p>
      </div>
      <p className="spell__text spell__text_style_size-16">
        <span className="spell__classes">Классы: </span>
        {classes.join(", ")}
      </p>
      <p className="spell__text spell__text_style_size-16">{desc}</p>
      {higherLevel ? (
        <p className="spell__text spell__text_padding-none spell__text_style_size-16">
          <span className="spell__classes">На больших уровнях: </span>
          {higherLevel}
        </p>
      ) : null}
    </li>
  );
};

export default SpellCard;
