import {FormControl, InputGroup} from "react-bootstrap";
import {Funnel} from "react-bootstrap-icons";
import IconButton from "../IconButton/IconButton";
import useFilterAction from "./hooks/useFilterAction";
import SpellFiltersModal from "./SpellFiltersModal/SpellFiltersModal";
import {useState} from "react";

const SpellFilters = ({filterActionList, setFilterActionList}) => {
  const [show, setShow] = useState(false);

  const {handleSearchInputBlur} = useFilterAction(filterActionList, setFilterActionList);

  const handleModalClose = () => {
    setShow(false)
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 p-lg-5">
      <InputGroup>
        <FormControl onBlur={handleSearchInputBlur} onKeyDown={(event) => event.keyCode === 13 && event.currentTarget.blur()}/>
        <IconButton variant="outline-primary" icon={<Funnel size={20} />} onClick={() => setShow(true)} />
      </InputGroup>
      <SpellFiltersModal filterActionList={filterActionList} setFilterActionList={setFilterActionList} show={show} handleModalClose={handleModalClose} />
    </div>
  );
};

export default SpellFilters;