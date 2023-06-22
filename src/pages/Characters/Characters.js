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
  const [isForm, setIsForm] = useState({
    isShow: false,
    data: {},
    update: false,
  });

  const handleAddUserChar = useCallback(() => {
    setIsForm({
      isShow: true,
      data: {},
      update: false,
    });
  }, []);

  const cbSubmit = useCallback(
    async (char, update) => {
      const { _id, name } = char;
      const { hasError, data: newChar } = update
        ? await ResourcesService.updateCharacter(_id, { name })
        : await ResourcesService.createCharacter(name);

      if (!hasError) {
        const newChars = update
          ? chars.map((s) => {
              if (newChar._id === s._id) {
                return newChar;
              }
              return s;
            })
          : [...chars, newChar];

        setChars(newChars);
        setIsForm({
          ...isForm,
          isShow: false,
        });
      }
    },
    [chars, isForm, setChars]
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
        onClick={handleAddUserChar}
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
              cbForm={setIsForm}
            />
          ))}
        </ListGroup>
      )}
      <CharacterModalForm isForm={isForm} cbForm={setIsForm} cbSubmit={cbSubmit} />
    </Stack>
  );
}
