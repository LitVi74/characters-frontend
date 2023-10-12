import { Button, Modal } from "react-bootstrap";
import "./SpellModalForm.scss";
import { useCallback } from "react";

import SpellForm from "../SpellForm/SpellForm";
import ResourcesService from "../../../../service/ResoursesService/ResourcesService";

import { ISpell, FormState } from "../../../../constants/IConstants";

interface PropsSpellModalForm {
  formState: FormState;
  handelHideForm: () => void;
  setSpells: (x: ISpell[]) => void;
}

export default function SpellModalForm({ formState, handelHideForm, setSpells }: PropsSpellModalForm) {
  const { show, chosenSpell } = formState;

  const handleSpellFormSubmit = useCallback(
    async (spell: ISpell, spellID: string) => {
      const {
        hasError,
        data,
      } = spellID
        ? await ResourcesService.updateSpell(spellID, spell)
        : await ResourcesService.createSpell(spell);

      if (!hasError && data) {
        setSpells(data);
        handelHideForm();
      }
    },
    [setSpells, handelHideForm]
  );

  return (
    <Modal show={show} onHide={handelHideForm}>
      <Modal.Header>
        <Modal.Title>{chosenSpell?._id ? "Изменить" : "Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={chosenSpell} cbSubmit={handleSpellFormSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          type="submit"
          form={`spell-${chosenSpell ? chosenSpell._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}