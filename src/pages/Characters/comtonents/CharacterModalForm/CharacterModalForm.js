import { Button, Modal } from "react-bootstrap";

import CharForm from "../CharForm/CharForm";

export default function CharacterModalForm({ isForm, cbForm, cbSubmit }) {
  const { isShow, data, update } = isForm;

  const handleCloseForm = () => {
    cbForm({
      ...isForm,
      isShow: false,
    });
  };

  return (
    <Modal show={isShow} onHide={handleCloseForm}>
      <Modal.Header closeButton>
        <Modal.Title>{update ? "Изменить" : "Добавить"} название</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CharForm char={data} cbSubmit={cbSubmit} update={update} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseForm}>
          Отменить
        </Button>
        <Button
          variant="primary"
          type="submit"
          form={`character-${data ? data._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
