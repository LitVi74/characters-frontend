import { useState, FocusEvent, useCallback } from "react";
import { Funnel } from "react-bootstrap-icons";
import { FormControl, InputGroup } from "react-bootstrap";

import IconButton from "../IconButton/IconButton";
import FiltersModal from "../FiltersModal/FiltersModal";
import Filters from "../Filters/Filters";
import { IFilter } from "../../constants/IConstants";

interface PropsSearchPanel {
  filters: IFilter[];
  handleSearchInputBlur: (event: FocusEvent<HTMLInputElement>) => void;
  isLoader: boolean;
}

function SearchPanel({ filters, handleSearchInputBlur, isLoader }: PropsSearchPanel) {
  const [show, setShow] = useState<boolean>(false);
  
  const handleModalClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <InputGroup>
        <FormControl
          onChange={handleSearchInputBlur}
          disabled={isLoader}
        />
        <IconButton
          variant="outline-warning"
          icon={<Funnel size={20} />}
          className="mobile-only"
          onClick={() => setShow(true)}
          disabled={isLoader}
        />
      <FiltersModal filters={filters} show={show} handleModalClose={handleModalClose} />
      </InputGroup>
      <Filters className="desktop-mode"filters={filters} />
    </>
  );
}

export default SearchPanel;
