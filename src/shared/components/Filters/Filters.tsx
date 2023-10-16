import { useState, FocusEvent } from "react";
import { Funnel } from "react-bootstrap-icons";
import { FormControl, InputGroup } from "react-bootstrap";

import IconButton from "../IconButton/IconButton";
import FiltersModal from "../FiltersModal/FiltersModal";
import { IFilter } from "../../constants/IConstants";

interface PropsFilters {
  filters: IFilter[];
  handleSearchInputBlur: (event: FocusEvent<HTMLInputElement>) => void;
  isLoader: boolean;
}

function Filters({ filters, handleSearchInputBlur, isLoader }: PropsFilters) {
  const [show, setShow] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  };
  return (
    <InputGroup>
      <FormControl
        onBlur={handleSearchInputBlur}
        onKeyDown={(event) => event.keyCode === 13 && event.currentTarget.blur()}
        disabled={isLoader}
      />
      <IconButton
        variant="outline-warning"
        icon={<Funnel size={20} />}
        onClick={() => setShow(true)}
        disabled={isLoader}
      />
      <FiltersModal filters={filters} show={show} handleModalClose={handleModalClose} />
    </InputGroup>
  );
}

export default Filters;
