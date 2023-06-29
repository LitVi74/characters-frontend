import Dropdown from "react-bootstrap/Dropdown";

export default function CardMenu({ cbForm, cbDell, isLoader }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={cbForm}>Изменить</Dropdown.Item>
        <Dropdown.Item onClick={cbDell} disabled={isLoader}>
          Удалить
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
