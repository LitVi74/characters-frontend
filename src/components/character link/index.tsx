import {Link} from "react-router-dom";
import {FC} from "react";
import {ICharacterLink} from "./interface";
import {ListGroupItem} from "react-bootstrap";

const CharacterLink: FC<ICharacterLink> = ({id, name}) => {
  return (
    <ListGroupItem as={Link} to={`/spells/${id}`} action >
      {name}
    </ListGroupItem>
  );
};

export default CharacterLink;