import { useState, ChangeEvent, useCallback } from "react";
import { Funnel } from "react-bootstrap-icons";
import { FormControl, InputGroup } from "react-bootstrap";

import IconButton from "../IconButton/IconButton";
import FiltersModal from "../FiltersModal/FiltersModal";
import Filters from "../Filters/Filters";
import useDebounce from "../../utils/useDebounce";
import { IFilter } from "../../constants/IConstants";

interface PropsSearchPanel {
  filters: IFilter[];
  cbInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoader: boolean;
}

function SearchPanel({ filters, cbInputChange, isLoader }: PropsSearchPanel) {
  const [show, setShow] = useState<boolean>(false);
  
  const handleModalClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleSearchInputChange = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    cbInputChange(event)
  }, 350);

  return (
    <>
      <InputGroup>
        <FormControl
          onChange={handleSearchInputChange}
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
