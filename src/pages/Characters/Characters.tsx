import { ListGroup, Stack } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";

import IconButton from "../../shared/components/IconButton/IconButton";
import Spinner from "../../shared/components/Spinner/Spinner";
import ResourcesService from "../../shared/service/ResoursesService/ResourcesService";
import CharacterLink from "./components/CharacterLink/CharacterLink";
import CharacterModalForm from "./components/CharacterModalForm/CharacterModalForm";

import { FormState, ICharacter } from "../../shared/constants/IConstants";

export default function Characters() {
  const [chars, setChars] = useState<ICharacter[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState<ICharacter>>({
    show: false,
    chosenRes: {},
  });

  const handleShowForm = useCallback((char = {}) => {
    setFormState({
      show: true,
      chosenRes: char,
    });
  }, []);

  const handelHideForm = useCallback(() => {
    setFormState({
      show: false,
      chosenRes: {},
    });
  }, []);

  const updateChars = useCallback(
    async (newChar: ICharacter, isUpdate: boolean) => {
      const newChars = isUpdate
        ? chars.map((char) => {
            if (newChar._id === char._id) {
              return newChar;
            }
            return char;
          })
        : [...chars, newChar];

      setChars(newChars);
    },
    [chars]
  );

  const cbClose = useCallback(
    async (char: ICharacter) => {
      const { _id: charID } = char;
      const { hasError, data: charData } = await ResourcesService.deleteCharacter(charID);

      if (!hasError) {
        const newChars = chars.filter((c) => c._id !== charData?._id);
        setChars(newChars);
      }
    },
    [chars, setChars]
  );

  const getCharacters = useCallback(async () => {
    const { hasError, data: initialChars } = await ResourcesService.getUserCharacters();

    if (!hasError && initialChars) {
      setChars(initialChars);
    }
  }, [setChars]);

  const renderPage = useCallback(async () => {
    setIsLoader(true);
    await getCharacters();
    setIsLoader(false);
  }, [getCharacters]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return (
    <Stack as="main" className="gap-2 align-self-center px-5">
      <IconButton
        icon={<Plus size={24} />}
        variant="outline-warning"
        onClick={() => handleShowForm()}
        className="mb-3 mt-4 mx-auto"
        disabled={isLoader}
      >
        Добавить персонажа
      </IconButton>
      {isLoader ? (
        <Spinner />
      ) : (
        <ListGroup as="ul">
          {chars.map((char) => (
            <CharacterLink
              key={char._id}
              char={char}
              cbClose={cbClose}
              cbForm={() => handleShowForm(char)}
            />
          ))}
        </ListGroup>
      )}
      <CharacterModalForm
        formState={formState}
        handelHideForm={handelHideForm}
        updateChars={updateChars}
      />
    </Stack>
  );
}
