import { Button, Modal } from "react-bootstrap";
import { useCallback } from "react";

import SpellForm from "../SpellForm/SpellForm";
import ResourcesService from "../../../../service/ResoursesService/ResourcesService";

export default function SpellModalForm({ formState, handelHideForm, setSpells }) {
  const { show, chosenSpell } = formState;

  const handleSpellFormSubmit = useCallback(
    async (spell, spellID) => {
      const {
        hasError,
        data: { allSpells },
      } = spellID
        ? await ResourcesService.updateSpell(spellID, spell)
        : await ResourcesService.createSpell(spell);

      if (!hasError) {
        setSpells(allSpells);
        handelHideForm();
      }
    },
    [setSpells, handelHideForm]
  );

  return (
    <Modal show={show} onHide={handelHideForm}>
      <Modal.Header closeButton>
        <Modal.Title>{chosenSpell._id ? "Изменить" : "Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={chosenSpell} cbSubmit={handleSpellFormSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handelHideForm}>
          Отменить
        </Button>
        <Button
          variant="primary"
          type="submit"
          form={`spell-${chosenSpell ? chosenSpell._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
