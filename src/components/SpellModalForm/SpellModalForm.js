import {Button, Modal} from "react-bootstrap";

import SpellForm from "../SpellForm/SpellForm";

export default function SpellModalForm({isShow, cdShow, spell}) {
  return (
    <Modal show={isShow} onHide={cdShow}>
      <Modal.Header closeButton>
        <Modal.Title>{spell ? "Изменить" :"Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={spell} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cdShow}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" form={`spell-${spell ? spell._id : "add"}-form`}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}