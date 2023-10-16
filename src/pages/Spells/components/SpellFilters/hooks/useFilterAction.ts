import { useCallback, useEffect, useState } from "react";

const useFilterAction = <T>(data: T[], setFilteredData: (t: T[]) => void) => {
  const [filterActionList, setFilterActionList] = useState(new Map());

  const deleteFilterFunctionByName = useCallback(
    (name: string) => {
      const filterActionClone = new Map(filterActionList);
      if (filterActionClone.delete(name)) {
        setFilterActionList(filterActionClone);
      }
    },
    [filterActionList]
  );

  const addFilterFunctionToList = useCallback(
    (name: string, filterFunc: (t: T[]) => void) => {
      const filterActionClone = new Map(filterActionList);
      filterActionClone.set(name, filterFunc);
      setFilterActionList(filterActionClone);
    },
    [filterActionList]
  );

  const createFilterHandler = useCallback(
    (functionName: string, handleFunction: (event: any) => (t: T[]) => void) =>
      (event: any) => {
        const searchFunction = handleFunction(event);

        if (!event?.length && !event?.currentTarget?.value) {
          deleteFilterFunctionByName(functionName);
          return;
        }

        addFilterFunctionToList(functionName, searchFunction);
      },
    [addFilterFunctionToList, deleteFilterFunctionByName]
  );

  useEffect(() => {
    let filteredData = [...data];

    if (!filterActionList.size) {
      setFilteredData(filteredData);
      return;
    }

    filterActionList.forEach((filterAction) => {
      filteredData = filterAction(filteredData);
    });

    setFilteredData(filteredData);
  }, [filterActionList, data, setFilteredData]);

  return {
    createFilterHandler,
  };
};

export default useFilterAction;
