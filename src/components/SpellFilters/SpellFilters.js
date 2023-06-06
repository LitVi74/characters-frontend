import useFilterAction from "./hooks/useFilterAction";

import { SPELL } from "../../constants/constants";
import Filters from "../Filters/Filters";

function SpellFilters({ filterActionList, setFilterActionList }) {
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

  return (
    <div className="d-flex align-items-center justify-content-center gap-3 p-lg-5">
      <Filters
        filters={filters}
        handleSearchInputBlur={filterActionList.handleSearchInputBlur}
      />
    </div>
  );
}

export default SpellFilters;
