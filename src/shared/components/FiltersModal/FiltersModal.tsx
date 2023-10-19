import { Modal } from "react-bootstrap";
import "./FiltersModal.scss";
import Filters from "../Filters/Filters";
import { IFilter } from "../../constants/IConstants";

interface PropsFiltersModal {
  filters: IFilter[];
  show: boolean;
  handleModalClose: () => void;
}

function FiltersModal({ filters, show, handleModalClose }: PropsFiltersModal) {
  return (
    <Modal as="aside" show={show} onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>Фильтр</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="overflow-auto d-flex flex-column gap-2"
        style={{ maxHeight: "75vh" }}
      >
        <Filters filters={filters} />
      </Modal.Body>
      <Modal.Footer>
        <p>Фильтры применяются автоматически!</p>
      </Modal.Footer>
    </Modal>
  );
}

export default FiltersModal;
