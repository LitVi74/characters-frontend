import Dropdown from 'react-bootstrap/Dropdown';

export default function CardMenu({cbForm, spell}) {
  const handlerUpdate = () => {
    cbForm({
      isShow: true,
      spell: spell,
      update: true
    })
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handlerUpdate}>Изменить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}