import {Button, Modal} from "react-bootstrap";

import SpellForm from "../SpellForm/SpellForm";

export default function SpellModalForm({isShow, cbShow, cbSubmit, spell}) {
  return (
    <Modal show={isShow} onHide={cbShow}>
      <Modal.Header closeButton>
        <Modal.Title>{spell ? "Изменить" : "Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={spell} cbSubmit={cbSubmit} update={spell ? true : false} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cbShow}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" form={`spell-${spell ? spell._id : "add"}-form`}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}