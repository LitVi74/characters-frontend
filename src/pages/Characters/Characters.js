import { useState, useCallback, useEffect } from 'react';
import { ListGroup, Stack, Button } from 'react-bootstrap';

import ResourcesService from '../../service/ResoursesService/ResourcesService';
import CharacterLink from "../../components/CharacterLink/CharacterLink";

export default function Characters() {
  const [ chars, setChars ] = useState([]);
  const [ isForm, setIsForm ] = useState({
    isShow: false,
    data: {},
    update: false
  });

  const handleAddUserChar = () => {
    setIsForm({
      isShow: true,
      data: {},
      update: false
    });
  };

  const cbSubmit = async (data, update) => {
    try {
      const { _id, name } = data;
      const char = update
        ? await ResourcesService.updateCharacter(_id, name)
        : await ResourcesService.createCharacter(name)

      const newChars = update
        ? chars.map(s => {
            if(char._id === s._id) {
              return char
            }
            return s
          })
        : [...spells, spell];
      
      setSpells(newChars);
      setIsForm({
        ...isForm,
        isShow: false
      });
    } catch(err) {
      console.log(err);
    }
  };

  const cbClose = async (char) => {
    try {
      const { _id: charID } = char;
      const charData = await ResourcesService.deleteCharacter(charID);
      const newChars = chars.filter(c => c._id !== charData._id);
      setChars(newChars)
    } catch(err) {
      console.log(err);
    }
  };

  const renderInitialCharacters = useCallback(async () => {
    const charData = await ResourcesService.getUserCharacters();

    setChars(charData);
  }, [setChars]);

  useEffect(() => {
    renderInitialCharacters();
  }, [renderInitialCharacters]);

  return (
    <Stack as="main" className="gap-2 align-self-center">
      <h1>Characters Page</h1>
      <Button onClick={handleAddUserChar} />
      <ListGroup>
        {chars.map((char) =>
          <CharacterLink key={char._id} char={char} cbClose={cbClose} cbForm={setIsForm} />
        )}
      </ListGroup>
      <SpellModalForm isForm={isForm} cbForm={setIsForm} cbSubmit={cbSubmit} />
    </Stack>
  );
}