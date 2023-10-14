import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./CardMenu.scss";
import tdvertical from "../../assets/tdvertical.svg"

interface PropsCardMenu {
  cbForm: () => void;
  cbDell: () => void | Promise<void>;
  isLoader: boolean;
}

interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
  ({ children, onClick }: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
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

export default function CardMenu({ cbForm, cbDell, isLoader }: PropsCardMenu) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic" size="sm" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={cbForm} disabled={isLoader}>
          Изменить
        </Dropdown.Item>
        <Dropdown.Item onClick={cbDell} disabled={isLoader}>
          Удалить
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
