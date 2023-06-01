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
      setFilterActionList(filterActionList.filter((func) => func.name !== name));
    },
    [filterActionList, setFilterActionList]
  );

  const addFilterFunctionToList = useCallback(
    (filterFunc) => {
      const functionList = filterActionList.filter(
        (func) => func.name !== filterFunc.name
      );
      setFilterActionList([...functionList, filterFunc]);
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

      addFilterFunctionToList(searchSpellsByName);
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

      addFilterFunctionToList(searchSpellsByLevel);
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

      const searchSpellsByClass = (spell) =>
        spell.filter((spell) =>
          spell.classes.some((spellClass) => event.includes(spellClass))
        );

      addFilterFunctionToList(searchSpellsByClass);
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

      const searchSpellsBySchool = (spell) =>
        spell.filter((spell) => event.includes(spell.school));

      addFilterFunctionToList(searchSpellsBySchool);
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

      const searchSpellsByRitual = (spell) =>
        spell.filter((spell) => event.includes(spell.ritual));

      addFilterFunctionToList(searchSpellsByRitual);
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

      const searchSpellsByConcentration = (spell) =>
        spell.filter((spell) => event.includes(spell.ritual));

      addFilterFunctionToList(searchSpellsByConcentration);
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
      const searchSpellsByCastingTime = (spell) =>
        spell.filter((spell) => regExp.test(spell.casting_time));

      addFilterFunctionToList(searchSpellsByCastingTime);
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
