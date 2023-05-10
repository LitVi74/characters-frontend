import {useCallback, useState} from "react";

const useFilterAction = (filterActionList, setFilterActionList) => {
  const [selectedLevels, setSelectedLevels] = useState([]);

  const deleteFilterFunctionByName = useCallback((name) => {
    setFilterActionList(filterActionList.filter(func => func.name !== name));
  }, [filterActionList]);

  const addFilterFunctionToList = useCallback((filterFunc) => {
    const functionList = filterActionList.filter(func => func.name !== filterFunc.name)
    setFilterActionList([...functionList, filterFunc]);
  }, [filterActionList])

  const handleSearchInputBlur = useCallback((event) => {
    if (!event.currentTarget.value) {
      deleteFilterFunctionByName("searchSpellsByName");
      return;
    }

    const regExp = new RegExp(event.currentTarget.value, 'i');
    const searchSpellsByName = (spells) => {
      return spells.filter(spell => regExp.test(spell.name));
    };

    addFilterFunctionToList(searchSpellsByName);
  }, []);

  const handleLevelsChange = useCallback((event) => {
    setSelectedLevels(event);

    if (!event.length) {
      deleteFilterFunctionByName("searchSpellsByLevel");
      return;
    }

    const searchSpellsByLevel = (spells) => {
      return spells.filter(spell => event.includes(spell.level));
    }

    addFilterFunctionToList(searchSpellsByLevel);
  }, []);

  return {handleSearchInputBlur, handleLevelsChange, selectedLevels};
}

export default useFilterAction;