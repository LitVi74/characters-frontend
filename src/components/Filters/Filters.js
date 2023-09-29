import { useState } from "react";
import { Funnel } from "react-bootstrap-icons";
import { FormControl, InputGroup } from "react-bootstrap";

import IconButton from "../IconButton/IconButton";
import FiltersModal from "../FiltersModal/FiltersModal";

function Filters({ filters, handleSearchInputBlur, isLoader }) {
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
