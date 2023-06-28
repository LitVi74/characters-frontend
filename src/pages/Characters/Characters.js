import { ListGroup, Stack } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";

import IconButton from "../../components/IconButton/IconButton";
import Spinner from "../../components/Spinner/Spinner";
import ResourcesService from "../../service/ResoursesService/ResourcesService";
import CharacterLink from "../../components/CharacterLink/CharacterLink";
import CharacterModalForm from "./comtonents/CharacterModalForm/CharacterModalForm";

export default function Characters() {
  const [chars, setChars] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const [formState, setFormState] = useState({
    show: false,
    chosenChar: {},
  });

  const handleShowForm = useCallback((char = {}) => {
    setFormState({
      show: true,
      chosenChar: char,
    });
  }, []);

  const handelHideForm = useCallback(() => {
    setFormState({
      show: false,
      chosenChar: {},
    });
  }, []);

  const updateChars = useCallback(
    async (newChar, isUpdate) => {
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
    async (char) => {
      try {
        const { _id: charID } = char;
        const charData = await ResourcesService.deleteCharacter(charID);
        const newChars = chars.filter((c) => c._id !== charData._id);
        setChars(newChars);
      } catch (err) {
        console.log(err);
      }
    },
    [chars, setChars]
  );

  const getCharacters = useCallback(async () => {
    try {
      const initialChars = await ResourcesService.getUserCharacters();

      setChars(initialChars);
    } catch (err) {
      console.log(err);
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
        onClick={() => handleShowForm()}
        className="mb-3 mx-auto"
        isLoader={isLoader}
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
