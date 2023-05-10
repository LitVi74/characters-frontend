import { useState, useCallback, useEffect } from 'react';
import { ListGroup, Stack } from 'react-bootstrap';

import ResourcesService from '../../service/ResoursesService/ResourcesService';
import CharacterLink from "../../components/CharacterLink/CharacterLink";

export default function Characters() {
  const [ chars, setChars ] = useState([]);
  const [ isForm, setIsForm ] = useState({
    isShow: false,
    char: {},
    update: false
  });

  const cbForm = async () => {
    try {

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
      <ListGroup>
        {chars.map((char) =>
          <CharacterLink key={char._id} char={char} cbClose={cbClose} cbForm={cbForm} />
        )}
      </ListGroup>

    </Stack>
  );
}