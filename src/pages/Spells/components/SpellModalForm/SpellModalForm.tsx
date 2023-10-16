import { Button, Modal } from "react-bootstrap";
import "./SpellModalForm.scss";
import { useCallback } from "react";

import SpellForm from "../SpellForm/SpellForm";
import ResourcesService from "../../../../shared/service/ResoursesService/ResourcesService";

import { ISpell, FormState, SpellData } from "../../../../shared/constants/IConstants";

interface PropsSpellModalForm {
  formState: FormState<ISpell>;
  handelHideForm: () => void;
  setSpells: (x: ISpell[]) => void;
}

export default function SpellModalForm({
  formState,
  handelHideForm,
  setSpells,
}: PropsSpellModalForm) {
  const { show, chosenRes } = formState;

  const handleSpellFormSubmit = useCallback(
    async (spell: SpellData, spellID: string | undefined) => {
      const { hasError, data } = spellID
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
        <Modal.Title>{chosenRes?._id ? "Изменить" : "Добавить"} заклинание</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SpellForm spell={chosenRes} cbSubmit={handleSpellFormSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          type="submit"
          form={`spell-${chosenRes ? chosenRes._id : "add"}-form`}
        >
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
