import { Button, Modal } from "react-bootstrap";

import { useCallback } from "react";
import CharForm from "../CharForm/CharForm";
import ResourcesService from "../../../../service/ResoursesService/ResourcesService";

export default function CharacterModalForm({ formState, handelHideForm, updateChars }) {
  const { show, chosenChar } = formState;

  const handleCharFormSubmit = useCallback(
    async (charId, char) => {
      const { hasError, data: newChar } = charId
        ? await ResourcesService.updateCharacter(charId, char)
        : await ResourcesService.createCharacter(char);

      if (!hasError) {
        updateChars(newChar, !!charId);
        handelHideForm();
      }
    },
    [handelHideForm, updateChars]
  );

  return (
    <Modal show={show} onHide={handelHideForm}>
      <Modal.Header closeButton>
        <Modal.Title>{chosenChar?._id ? "Изменить" : "Добавить"} название</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CharForm char={chosenChar} cbSubmit={handleCharFormSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handelHideForm}>
          Отменить
        </Button>
        <Button
          variant="primary"
          type="submit"
          form={`character-${chosenChar ? chosenChar._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
