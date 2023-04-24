import {Button, Modal} from "react-bootstrap";

import SpellForm from "../SpellForm/SpellForm";

export default function SpellModalForm({isForm, cbForm, cbSubmit}) {
  const { isShow, spell, update } = isForm;

  const handleCloseForm = () => {
    cbForm({
      ...isForm,
      isShow: false
    })
  }

  return (
    <Modal show={isShow} onHide={handleCloseForm}>
      <Modal.Header closeButton>
        <Modal.Title>{update ? "Изменить" : "Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={spell} cbSubmit={cbSubmit} update={update} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseForm}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" form={`spell-${spell ? spell._id : "add"}-form`}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}