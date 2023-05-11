import {Accordion, Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {SPELL} from "../../../constants/constants";

const SpellFiltersModal = ({filterAction, show, handleModalClose}) => {

  return (
    <Modal as="aside" show={show}  onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Фильтр
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto d-flex flex-column gap-2" style={{maxHeight: "75vh"}}>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Уровень</Accordion.Header>
            <Accordion.Body>
              <ToggleButtonGroup
                className="flex-wrap"
                type="checkbox"
                value={filterAction.selectedLevels}
                onChange={(filterAction.handleLevelsChange)}
              >
                {SPELL.levels.map((level) =>
                  <ToggleButton
                    className="m-1 rounded flex-grow-0"
                    key={level}
                    id={`level-${level}`}
                    value={level}
                    variant="outline-primary"
                  >
                    {level || "Заговор"}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Классы</Accordion.Header>
            <Accordion.Body>
              <ToggleButtonGroup
                className="flex-wrap"
                type="checkbox"
                value={filterAction.selectedClasses}
                onChange={(filterAction.handleClassesChange)}
              >
                {SPELL.classes.map((spellClass, index) =>
                  <ToggleButton
                    className="m-1 rounded flex-grow-0"
                    key={spellClass}
                    id={`class-${index}`}
                    value={spellClass}
                    variant="outline-primary"
                  >
                    {spellClass}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <p>Фильтры применяются автоматически!</p>
      </Modal.Footer>
    </Modal>
  );
};

export default SpellFiltersModal;