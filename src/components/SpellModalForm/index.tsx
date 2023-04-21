import {Button, Modal} from "react-bootstrap";
import {FC, useState} from "react";
import {ISpellModalFormProps} from "./SpellModalFormInterface";
import SpellForm from "../SpellForm";

const SpellModalForm: FC<ISpellModalFormProps> = ({isShow, spell}) => {
  const [show, setShow] = useState(isShow);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{spell ? "Изменить" :"Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={spell} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" form={`spell-${spell ? spell._id : "add"}-form`}>
          Созранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpellModalForm;