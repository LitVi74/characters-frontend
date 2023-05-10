import Dropdown from 'react-bootstrap/Dropdown';

export default function CardMenu({cbForm, cbDell, spell}) {
  const handleUpdate = () => {
    cbForm({
      isShow: true,
      spell: spell,
      update: true
    })
  };

  const handleDelete = () => {
    cbDell(spell)
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleUpdate}>Изменить</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete} >Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}