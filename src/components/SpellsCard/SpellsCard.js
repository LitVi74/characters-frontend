import "./SpellsCard.scss";

import { useCallback, useState } from "react";
import { CloseButton } from "react-bootstrap";

import { Plus } from "react-bootstrap-icons";

import IconButton from "../IconButton/IconButton";

export default function SpellCard({
  cbClose,
  cbPlus,
  spell,
  charList,
  isCreator,
  inList,
  button,
}) {
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
  const [isClosure, setIsClosure] = useState(inList);
  const [isLoader, setIsLoader] = useState(false);

  const handleCharButton = useCallback(
    async (isClose) => {
      setIsLoader(true);
      if (isClose) {
        await cbClose(spell);
      } else {
        await cbPlus(spell);
      }
      setIsClosure(!isClosure);
      setIsLoader(false);
    },
    [cbClose, cbPlus, isClosure, spell]
  );

  return (
    <li className="spell">
      <div className="spell__container">
        <h3 className="spell__title">{name}</h3>
        {charList &&
          (isCreator ? (
            isClosure ? (
              <CloseButton onClick={() => handleCharButton(true)} disabled={isLoader} />
            ) : (
              <IconButton
                icon={<Plus size={24} />}
                onClick={() => handleCharButton(false)}
                disabled={isLoader}
              />
            )
          ) : null)}
        {button}
      </div>
      <div className="spell__container">
        <p className="spell__text">
          {school} {ritual ? " (ритуал)" : ""}
        </p>
        <p className="spell__text">{`${level} уровень`}</p>
      </div>
      <p className="spell__text">{`Время накладывания: ${castingTime}`}</p>
      <p className="spell__text">{`Дистанция: ${range}`}</p>
      <p className="spell__text">{`Компоненты: ${components.join(", ")}${
        material ? `(${material})` : ""
      }`}</p>
      <p className="spell__text">{`Длительность: ${
        concentration ? "Концентрация, вплоть до " : ""
      }${duration}`}</p>
      <p className="spell__text">{`Классы: ${classes.join(", ")}`}</p>
      <p className="spell__text">{desc}</p>
      {higherLevel ? (
        <p className="spell__text">{`На больших уровнях: ${higherLevel}`}</p>
      ) : null}
    </li>
  );
}
