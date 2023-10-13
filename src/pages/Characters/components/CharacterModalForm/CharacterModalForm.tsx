import { Button, Modal } from "react-bootstrap";

import { useCallback } from "react";
import CharForm from "../CharForm/CharForm";
import ResourcesService from "../../../../service/ResoursesService/ResourcesService";

import { CharData, FormState, ICharacter } from "../../../../constants/IConstants";

interface PropsCharacterModalForm {
  formState: FormState<ICharacter>;
  handelHideForm: () => void;
  updateChars: (newChar: ICharacter, isUpdate: boolean) => Promise<void>;
}

export default function CharacterModalForm({ formState, handelHideForm, updateChars }: PropsCharacterModalForm) {
  const { show, chosenRes } = formState;

  const handleCharFormSubmit = useCallback(
    async (charId: string | undefined, char: CharData) => {
      const { hasError, data: newChar } = charId
        ? await ResourcesService.updateCharacter(charId, char)
        : await ResourcesService.createCharacter(char);

      if (!hasError && newChar) {
        updateChars(newChar, !!charId);
        handelHideForm();
      }
    },
    [handelHideForm, updateChars]
  );

  return (
    <Modal show={show} onHide={handelHideForm}>
      <Modal.Header>
        <Modal.Title>{chosenRes?._id ? "Изменить" : "Добавить"} название</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CharForm char={chosenRes} cbSubmit={handleCharFormSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          type="submit"
          form={`character-${chosenRes ? chosenRes._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
