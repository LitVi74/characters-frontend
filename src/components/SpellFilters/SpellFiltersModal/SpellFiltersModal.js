import {useState} from "react";
import {Accordion, Modal, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import useFilterAction from "../hooks/useFilterAction";

const SpellFiltersModal = ({filterActionList, setFilterActionList, show, handleModalClose}) => {
  const levels = useState([0, 1, 2 ,3, 4, 5, 6, 7, 8, 9])[0];

  const {handleLevelsChange, selectedLevels} = useFilterAction(filterActionList, setFilterActionList);

  return (
    <Modal className="" show={show}  onHide={handleModalClose}>
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
              <ToggleButtonGroup value={selectedLevels} type="checkbox" onChange={(handleLevelsChange)}>
                {levels.map((level) =>
                  <ToggleButton key={level} id={`level-${level}`} value={level} variant="outline-primary">
                    {level || "Заговор"}
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