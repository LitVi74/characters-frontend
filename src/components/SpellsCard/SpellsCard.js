import "./SpellsCard.scss";

import { useCallback, useContext, useState } from "react";
import { CloseButton } from "react-bootstrap";

import { Plus } from "react-bootstrap-icons";
import CardMenu from "../CardMenu/CardMenu";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import IconButton from "../IconButton/IconButton";

export default function SpellCard({
  handleShowForm,
  cbDell,
  cbClose,
  cbPlus,
  spell,
  charList,
  isCreator,
  inList,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    name,
    school,
    level,
    casting_time,
    range,
    components,
    material,
    concentration,
    duration,
    classes,
    desc,
    higher_level,
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

  const handleUpdate = useCallback(() => {
    handleShowForm(spell);
  }, [handleShowForm, spell]);

  const handleDelete = useCallback(async () => {
    setIsLoader(true);
    await cbDell(spell);
    setIsLoader(false);
  }, [cbDell, spell]);

  return (
    <li className="spell">
      <div className="spell__container">
        <h3 className="spell__title">{name}</h3>
        {charList ? (
          isCreator ? (
            isClosure ? (
              <CloseButton
                onClick={() => handleCharButton(true)}
                disabled={isLoader ? "disabled" : ""}
              />
            ) : (
              <IconButton
                icon={<Plus size={24} />}
                onClick={() => handleCharButton(false)}
                isLoader={isLoader}
                e
              />
            )
          ) : null
        ) : (
          currentUser.role === "Admin" && (
            <CardMenu
              cbForm={handleUpdate}
              cbDell={handleDelete}
              isSpell
              isLoader={isLoader}
            />
          )
        )}
      </div>
      <div className="spell__container">
        <p className="spell__text">
          {school} {ritual ? " (ритуал)" : ""}
        </p>
        <p className="spell__text">{`${level} уровень`}</p>
      </div>
      <p className="spell__text">{`Время накладывания: ${casting_time}`}</p>
      <p className="spell__text">{`Дистанция: ${range}`}</p>
      <p className="spell__text">{`Компоненты: ${components.join(", ")}${
        material ? `(${material})` : ""
      }`}</p>
      <p className="spell__text">{`Длительность: ${
        concentration ? "Концентрация, вплоть до " : ""
      }${duration}`}</p>
      <p className="spell__text">{`Классы: ${classes.join(", ")}`}</p>
      <p className="spell__text">{desc}</p>
      {higher_level ? (
        <p className="spell__text">{`На больших уровнях: ${higher_level}`}</p>
      ) : null}
    </li>
  );
}
