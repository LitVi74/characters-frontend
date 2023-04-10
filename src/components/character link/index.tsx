import {Link} from "react-router-dom";
import {FC} from "react";
import {ICharacterLink} from "./interface";
import {Heading, LinkBox} from "@chakra-ui/react";

const CharacterLink: FC<ICharacterLink> = ({id, name}) => {
  return (
    <LinkBox as={Link} to={`/spells/${id}`} display="block"  w='sm' p='2' borderWidth='1px' rounded='md'>
      <Heading size='md' my='2'>
          {name}
      </Heading>
    </LinkBox>
  );
};

export default CharacterLink;