import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./CardMenu.scss";
import tdvertical from "../../assets/tdvertical.svg"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <img className="button-menu" src={tdvertical} alt="меню" />
  </a>
));

export default function CardMenu({ cbForm, cbDell, isLoader }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" size="sm" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={cbForm}>Изменить</Dropdown.Item>
        <Dropdown.Item onClick={cbDell} disabled={isLoader}>
          Удалить
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
