import { useCallback, useState } from "react";

const useFilterAction = (filterActionList, setFilterActionList) => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedRitual, setSelectedRitual] = useState([]);
  const [selectedConcentration, setsSelectedConcentration] = useState([]);
  const [selectedCastingTime, setSelectedCastingTime] = useState([]);

  const deleteFilterFunctionByName = useCallback(
    (name) => {
      const filterActionClone = new Map(filterActionList);
      if (filterActionClone.delete(name)) {
        setFilterActionList(filterActionClone);
      }
    },
    [filterActionList, setFilterActionList]
  );

  const addFilterFunctionToList = useCallback(
    (name, filterFunc) => {
      const filterActionClone = new Map(filterActionList);
      filterActionClone.set(name, filterFunc);
      setFilterActionList(filterActionClone);
    },
    [filterActionList, setFilterActionList]
  );

  const handleSearchInputBlur = useCallback(
    (event) => {
      if (!event.currentTarget.value) {
        deleteFilterFunctionByName("searchSpellsByName");
        return;
      }

      const regExp = new RegExp(event.currentTarget.value, "i");
      const searchSpellsByName = (spells) =>
        spells.filter((spell) => regExp.test(spell.name));

      addFilterFunctionToList("searchSpellsByName", searchSpellsByName);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleLevelsChange = useCallback(
    (event) => {
      setSelectedLevels(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsByLevel");
        return;
      }

      const searchSpellsByLevel = (spells) =>
        spells.filter((spell) => event.includes(spell.level));

      addFilterFunctionToList("searchSpellsByLevel", searchSpellsByLevel);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleClassesChange = useCallback(
    (event) => {
      setSelectedClasses(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsByClass");
        return;
      }

      const searchSpellsByClass = (spells) =>
        spells.filter((spell) =>
          spell.classes.some((spellClass) => event.includes(spellClass))
        );

      addFilterFunctionToList("searchSpellsByClass", searchSpellsByClass);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleSchoolsChange = useCallback(
    (event) => {
      setSelectedSchools(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsBySchool");
        return;
      }

      const searchSpellsBySchool = (spells) =>
        spells.filter((spell) => event.includes(spell.school));

      addFilterFunctionToList("searchSpellsBySchool", searchSpellsBySchool);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleRitualChange = useCallback(
    (event) => {
      setSelectedRitual(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsByRitual");
        return;
      }

      const searchSpellsByRitual = (spells) =>
        spells.filter((spell) => event.includes(spell.ritual));

      addFilterFunctionToList("searchSpellsBySchool", searchSpellsByRitual);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleConcentrationChange = useCallback(
    (event) => {
      setsSelectedConcentration(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsByConcentration");
        return;
      }

      const searchSpellsByConcentration = (spells) =>
        spells.filter((spell) => event.includes(spell.ritual));

      addFilterFunctionToList("searchSpellsByConcentration", searchSpellsByConcentration);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  const handleCastingTimeChange = useCallback(
    (event) => {
      setSelectedCastingTime(event);

      if (!event.length) {
        deleteFilterFunctionByName("searchSpellsByCastingTime");
        return;
      }

      const regExp = new RegExp(event.join("|"), "i");

      const searchSpellsByCastingTime = (spells) =>
        spells.filter((spell) => regExp.test(spell.casting_time));

      addFilterFunctionToList("searchSpellsByCastingTime", searchSpellsByCastingTime);
    },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  return {
    handleSearchInputBlur,
    selectedLevels,
    handleLevelsChange,
    selectedClasses,
    handleClassesChange,
    selectedSchools,
    handleSchoolsChange,
    selectedRitual,
    handleRitualChange,
    selectedConcentration,
    handleConcentrationChange,
    selectedCastingTime,
    handleCastingTimeChange,
  };
};

export default useFilterAction;
