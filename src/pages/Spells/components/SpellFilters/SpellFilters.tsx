import { FocusEvent, useState } from "react";

import useFilterAction from "./hooks/useFilterAction";

import { SPELL } from "../../../../shared/constants/constants";
import SearchPanel from "../../../../shared/components/SearchPanel/SearchPanel";
import { IFilter, ISpell } from "../../../../shared/constants/IConstants";

interface SpellsFilterState {
  selectedLevels: number[];
  selectedClasses: string[];
  selectedSchools: string[];
  selectedRitual: boolean[];
  selectedConcentration: boolean[];
  selectedCastingTime: string[];
}

interface PropsSpellFilters {
  spells: ISpell[];
  setFilteredSpells: (x: ISpell[]) => void;
  isLoader: boolean;
}

function SpellFilters({ spells, setFilteredSpells, isLoader }: PropsSpellFilters) {
  const [spellsFilterState, setSpellsFilterState] = useState<SpellsFilterState>({
    selectedLevels: [],
    selectedClasses: [],
    selectedSchools: [],
    selectedRitual: [],
    selectedConcentration: [],
    selectedCastingTime: [],
  });

  const { createFilterHandler } = useFilterAction<ISpell>(spells, setFilteredSpells);
  const filters: IFilter[] = [
    {
      name: "Уровень",
      selectedValue: spellsFilterState.selectedLevels,
      onChange: createFilterHandler("searchSpellsByLevel", (event: number[]) => {
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
      onChange: createFilterHandler("searchSpellsByClass", (event: string[]) => {
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
      onChange: createFilterHandler("searchSpellsBySchool", (event: string[]) => {
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
      onChange: createFilterHandler("searchSpellsByRitual", (event: boolean[]) => {
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
      onChange: createFilterHandler("searchSpellsByConcentration", (event: boolean[]) => {
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
      onChange: createFilterHandler("searchSpellsByConcentration", (event: string[]) => {
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

  const handleSearchInputBlur = createFilterHandler(
    "searchSpellsByName",
    (event: FocusEvent<HTMLInputElement>) => {
      const regExp = new RegExp(event.currentTarget.value, "i");

      return (currentSpells) => currentSpells.filter((spell) => regExp.test(spell.name));
    }
  );

  return (
    <div className="d-flex justify-content-center flex-grow-1">
      <SearchPanel
        filters={filters}
        handleSearchInputBlur={handleSearchInputBlur}
        isLoader={isLoader}
      />
    </div>
  );
}

export default SpellFilters;
