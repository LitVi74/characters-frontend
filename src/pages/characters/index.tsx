import { Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import {FC} from 'react';
import CharacterLink from "../../components/character link";

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
    <Flex as="main" direction="column" gap="2">
      <Heading>Characters Page</Heading>
      {characters.map(({id, name}) =>
      <CharacterLink id={id} name={name} />
      )}
    </Flex>
  );
};

export default Characters;