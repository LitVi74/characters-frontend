import "./SpellsCard.scss";

import { useContext, useState } from "react";
import { CloseButton } from "react-bootstrap";

import CardMenu from "../CardMenu/CardMenu";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import IconButton from "../IconButton/IconButton";
import { Plus } from "react-bootstrap-icons";

export default function SpellCard({
  cbForm,
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
  } = spell;
  const [isClosure, setIsClosure] = useState(inList);

  const handlePlusButton = () => {
    cbPlus(spell);
    setIsClosure(true);
  };

  const handleCloseButton = () => {
    cbClose(spell);
    setIsClosure(false);
  };

  const handleUpdate = () => {
    cbForm({
      isShow: true,
      data: spell,
      update: true,
    });
  };

  const handleDelete = () => {
    cbDell(spell);
  };

  return (
    <li className="spell">
      <div className="spell__container">
        <h3 className="spell__title">{name}</h3>
        {charList ? (
          isCreator && isClosure ? (
            <CloseButton onClick={handleCloseButton} />
          ) : (
            <IconButton icon={<Plus size={24} />} onClick={handlePlusButton} />
          )
        ) : (
          currentUser.role === "Admin" && (
            <CardMenu
              cbForm={handleUpdate}
              cbDell={handleDelete}
              isSpell={true}
            />
          )
        )}
      </div>
      <div className="spell__container">
        <p className="spell__text">{school}</p>
        <p className="spell__text">{`${level} уровень`}</p>
      </div>
      <p className="spell__text">{`Время накладывания: ${casting_time}`}</p>
      <p className="spell__text">{`Дистанция: ${range}`}</p>
      <p className="spell__text">{`Компоненты: ${components.join(", ")}${
        material ? "(" + material + ")" : ""
      }`}</p>
      <p className="spell__text">{`Длительность: ${
        concentration ? "Концентрация, вплоть до " : ""
      }${duration}`}</p>
      <p className="spell__text">{`Классы: ${classes.join(", ")}`}</p>
      <p className="spell__text">{desc}</p>
      <p className="spell__text">{`На больших уровнях: ${higher_level}`}</p>
    </li>
  );
}
