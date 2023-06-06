import { FormControl, InputGroup } from "react-bootstrap";
import { Funnel } from "react-bootstrap-icons";
import IconButton from "../IconButton/IconButton";
import useFilterAction from "./hooks/useFilterAction";
import FiltersModal from "../FiltersModal/FiltersModal";
import { useState } from "react";
import { SPELL } from "../../constants/constants";

const SpellFilters = ({ filterActionList, setFilterActionList }) => {
  const [show, setShow] = useState(false);

  const filterAction = useFilterAction(filterActionList, setFilterActionList);
  const filters = [
    {
      name: "Уровень",
      selectedValue: filterAction.selectedLevels,
      onChange: filterAction.handleLevelsChange,
      values: SPELL.levels,
      valuesName: ["Заговор"],
    },
    {
      name: "Класс",
      selectedValue: filterAction.selectedClasses,
      onChange: filterAction.handleClassesChange,
      values: SPELL.classes,
    },
    {
      name: "Школа",
      selectedValue: filterAction.selectedSchools,
      onChange: filterAction.handleSchoolsChange,
      values: SPELL.schools,
    },
    {
      name: "Ритуал",
      selectedValue: filterAction.selectedRitual,
      onChange: filterAction.handleRitualChange,
      values: [true, false],
      valuesName: ["Ритуал", "Не ритуал"],
    },
    {
      name: "Концентрация",
      selectedValue: filterAction.selectedConcentration,
      onChange: filterAction.handleConcentrationChange,
      values: [true, false],
      valuesName: ["Требует концентрации", "Не требует концентрации"],
    },
    {
      name: "Время наложения",
      selectedValue: filterAction.selectedCastingTime,
      onChange: filterAction.handleCastingTimeChange,
      values: SPELL.castingTime,
    },
  ];

  const handleModalClose = () => {
    setShow(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 p-lg-5">
      <InputGroup>
        <FormControl
          onBlur={filterAction.handleSearchInputBlur}
          onKeyDown={(event) =>
            event.keyCode === 13 && event.currentTarget.blur()
          }
        />
        <IconButton
          variant="outline-primary"
          icon={<Funnel size={20} />}
          onClick={() => setShow(true)}
        />
      </InputGroup>
      <FiltersModal
        filters={filters}
        show={show}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default SpellFilters;
