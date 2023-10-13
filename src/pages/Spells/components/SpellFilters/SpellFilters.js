import { useState } from "react";

import useFilterAction from "./hooks/useFilterAction";

import { SPELL } from "../../../../constants/constants";
import Filters from "../../../../components/Filters/Filters";

/*
interface SpellsFilterState {
  selectedLevels: MouseEvent[],
  selectedClasses: MouseEvent[],
  selectedSchools: MouseEvent[],
  selectedRitual: MouseEvent[],
  selectedConcentration: MouseEvent[],
  selectedCastingTime: MouseEvent[],
}

interface PropsSpellFilters {
  spells: ISpell[];
  setFilteredSpells: (x: ISpell[]) => void;
  isLoader: boolean;
}
*/

function SpellFilters({ spells, setFilteredSpells, isLoader }) {
  const [spellsFilterState, setSpellsFilterState] = useState({
    selectedLevels: [],
    selectedClasses: [],
    selectedSchools: [],
    selectedRitual: [],
    selectedConcentration: [],
    selectedCastingTime: [],
  });

  const { createFilterHandler } = useFilterAction(spells, setFilteredSpells);
  const filters = [
    {
      name: "Уровень",
      selectedValue: spellsFilterState.selectedLevels,
      onChange: createFilterHandler("searchSpellsByLevel", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedLevels: event,
        });
        return (currentSpells) =>
          currentSpells.filter((spell) => event.includes(spell.level));
      }),
      values: SPELL.levels,
      valuesName: ["Заговор"],
    },
    {
      name: "Класс",
      selectedValue: spellsFilterState.selectedClasses,
      onChange: createFilterHandler("searchSpellsByClass", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedClasses: event,
        });
        return (currentSpells) =>
          currentSpells.filter((spell) =>
            spell.classes.some((spellClass) => event.includes(spellClass))
          );
      }),
      values: SPELL.classes,
    },
    {
      name: "Школа",
      selectedValue: spellsFilterState.selectedSchools,
      onChange: createFilterHandler("searchSpellsBySchool", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedSchools: event,
        });
        return (currentSpells) =>
          currentSpells.filter((spell) => event.includes(spell.school));
      }),
      values: SPELL.schools,
    },
    {
      name: "Ритуал",
      selectedValue: spellsFilterState.selectedRitual,
      onChange: createFilterHandler("searchSpellsByRitual", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedRitual: event,
        });
        return (currentSpells) =>
          currentSpells.filter((spell) => event.includes(spell.ritual));
      }),
      values: [true, false],
      valuesName: ["Ритуал", "Не ритуал"],
    },
    {
      name: "Концентрация",
      selectedValue: spellsFilterState.selectedConcentration,
      onChange: createFilterHandler("searchSpellsByConcentration", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedConcentration: event,
        });
        return (currentSpells) =>
          currentSpells.filter((spell) => event.includes(spell.concentration));
      }),
      values: [true, false],
      valuesName: ["Требует концентрации", "Не требует концентрации"],
    },
    {
      name: "Время наложения",
      selectedValue: spellsFilterState.selectedCastingTime,
      onChange: createFilterHandler("searchSpellsByConcentration", (event) => {
        setSpellsFilterState({
          ...spellsFilterState,
          selectedCastingTime: event,
        });

        const regExp = new RegExp(event.join("|"), "i");

        return (currentSpells) =>
          currentSpells.filter((spell) => regExp.test(spell.casting_time));
      }),
      values: SPELL.castingTime,
    },
  ];

  const handleSearchInputBlur = createFilterHandler("searchSpellsByName", (event) => {
    const regExp = new RegExp(event.currentTarget.value, "i");

    return (currentSpells) => currentSpells.filter((spell) => regExp.test(spell.name));
  });

  return (
    <div className="d-flex justify-content-center flex-grow-1">
      <Filters filters={filters} handleSearchInputBlur={handleSearchInputBlur} isLoader={isLoader} />
    </div>
  );
}

export default SpellFilters;
