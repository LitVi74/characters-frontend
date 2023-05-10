import {FormControl, InputGroup} from "react-bootstrap";
import {Funnel} from "react-bootstrap-icons";
import IconButton from "../IconButton/IconButton";
import {useCallback} from "react";

const SpellFilters = ({filterActionList, setFilterActionList}) => {

  const handleSearchInputBlur = useCallback((event) => {
    if (!event.currentTarget.value) {
      const filterList = filterActionList.filter(func => func.name !== 'searchSpellsByName');
      setFilterActionList(filterList);
      return;
    }

    const regExp = new RegExp(event.currentTarget.value, 'i');

    const searchSpellsByName = (spells) => {
      return spells.filter(spell => regExp.test(spell.name));
    };

    setFilterActionList([...filterActionList, searchSpellsByName]);
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 p-lg-5">
      <InputGroup>
        <FormControl onBlur={handleSearchInputBlur} onKeyDown={(event) => event.keyCode === 13 && event.currentTarget.blur()}/>
        <IconButton variant="outline-primary" icon={<Funnel size={20} />} />
      </InputGroup>
    </div>
  );
};

export default SpellFilters;