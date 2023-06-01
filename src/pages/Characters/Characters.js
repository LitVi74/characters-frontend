import { ListGroup, Stack } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";

import IconButton from "../../components/IconButton/IconButton";
import CharacterLink from "../../components/CharacterLink/CharacterLink";
import CharacterModalForm from "./comtonents/CharacterModalForm/CharacterModalForm";

import ResourcesService from "../../service/ResoursesService/ResourcesService";

export default function Characters() {
  const [chars, setChars] = useState([]);
  const [isForm, setIsForm] = useState({
    isShow: false,
    data: {},
    update: false,
  });

  const handleAddUserChar = () => {
    setIsForm({
      isShow: true,
      data: {},
      update: false,
    });
  };

  const cbSubmit = async (char, update) => {
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
  };

  const cbClose = async (char) => {
    try {
      const { _id: charID } = char;
      const charData = await ResourcesService.deleteCharacter(charID);
      const newChars = chars.filter((c) => c._id !== charData._id);
      setChars(newChars);
    } catch (err) {
      console.log(err);
    }
  };

  const renderInitialCharacters = useCallback(async () => {
    try {
      const initialChars = await ResourcesService.getUserCharacters();

      setChars(initialChars);
    } catch (err) {
      console.log(err);
    }
  }, [setChars]);

  useEffect(() => {
    renderInitialCharacters();
  }, [renderInitialCharacters]);

  return (
    <Stack as="main" className="gap-2 align-self-center px-5">
      <h1>Characters Page</h1>
      <IconButton
        icon={<Plus size={24} />}
        onClick={handleAddUserChar}
        className="my-0 mx-auto"
      />
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
      <CharacterModalForm isForm={isForm} cbForm={setIsForm} cbSubmit={cbSubmit} />
    </Stack>
  );
}
