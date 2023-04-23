import {FC} from 'react';
import {ListGroup, Stack} from 'react-bootstrap';
import CharacterLink from "../../components/CharacterLink";

const characters = [
  {
    id: "1",
    name: "Character 1",
  },
  {
    id: "2",
    name: "Character 2",
  },
  {
    id: "3",
    name: "Character 3",
  },
]

const Characters: FC= () => {
  return (
    <Stack as="main" className="gap-2 align-self-center">
      <h1>Characters Page</h1>
      <ListGroup>
        {characters.map(({id, name}) =>
          <CharacterLink key={id} id={id} name={name} />
        )}
      </ListGroup>

    </Stack>
  );
};

export default Characters;