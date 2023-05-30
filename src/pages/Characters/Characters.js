import { ListGroup, Stack } from "react-bootstrap";
import { useState, useCallback, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";

import IconButton from "../../components/IconButton/IconButton";
import CharacterLink from "../../components/CharacterLink/CharacterLink";
import SpellModalForm from "../../components/SpellModalForm/SpellModalForm";
import ResourcesService from "../../service/ResoursesService/ResourcesService";

export default function Characters({ chars, setChars }) {
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

  const cbSubmit = async (data, update) => {
    try {
      const { _id, name } = data;
      const char = update
        ? await ResourcesService.updateCharacter(_id, name)
        : await ResourcesService.createCharacter(name);

      const newChars = update
        ? chars.map((s) => {
            if (char._id === s._id) {
              return char;
            }
            return s;
          })
        : [...chars, char];

      setChars(newChars);
      setIsForm({
        ...isForm,
        isShow: false,
      });
    } catch (err) {
      console.log(err);
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
      <SpellModalForm
        isForm={isForm}
        cbForm={setIsForm}
        cbSubmit={cbSubmit}
        isSpellForm={false}
      />
    </Stack>
  );
}
