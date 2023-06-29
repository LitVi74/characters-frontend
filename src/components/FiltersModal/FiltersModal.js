import {
  Accordion,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

function FiltersModal({ filters, show, handleModalClose }) {
  return (
    <Modal as="aside" show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Фильтр</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="overflow-auto d-flex flex-column gap-2"
        style={{ maxHeight: "75vh" }}
      >
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {filters.map((filter, index) => (
            <Accordion.Item key={filter.name} eventKey={index.toString()}>
              <Accordion.Header>{filter.name}</Accordion.Header>
              <Accordion.Body>
                <ToggleButtonGroup
                  className="flex-wrap"
                  type="checkbox"
                  value={filter.selectedValue}
                  onChange={filter.onChange}
                >
                  {filter.values.map((value, valueIndex) => (
                    <ToggleButton
                      className="m-1 rounded flex-grow-0"
                      key={value}
                      id={`tgb-${index}-${value}`}
                      value={value}
                      variant="outline-primary"
                    >
                      {filter?.valuesName?.[valueIndex] ?? value}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <p>Фильтры применяются автоматически!</p>
      </Modal.Footer>
    </Modal>
  );
}

export default FiltersModal;
