import { useState, FocusEvent, useCallback, useEffect } from "react";
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
  const [mobileVariant, setMobileVariant] = useState<boolean>(false);
  
  const handleModalClose = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    const handlerResize = () => {
      if(window.innerWidth > 1024) {
        setMobileVariant(false);
      } else {
        setMobileVariant(true);
      }
    }

    handlerResize();
    window.addEventListener('resize', handlerResize);
    return () => {
      window.removeEventListener('resize', handlerResize);
    }
  }, []);

  return (
    <>
      <InputGroup>
        <FormControl
          onChange={handleSearchInputBlur}
          disabled={isLoader}
        />
        {mobileVariant &&
          <IconButton
            variant="outline-warning"
            icon={<Funnel size={20} />}
            onClick={() => setShow(true)}
            disabled={isLoader}
          />}
        <FiltersModal filters={filters} show={mobileVariant ? show : false} handleModalClose={handleModalClose} />
      </InputGroup>
      <Filters className="desktop-mode"filters={filters} />
    </>
  );
}

export default SearchPanel;
