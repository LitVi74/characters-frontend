import { Link } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";
import { PATHS } from "../../pages/pages";

export default function CharacterLink({id, name}) {
  return (
    <ListGroupItem as={Link} to={PATHS.spells + `/${id}`} action >
      {name}
    </ListGroupItem>
  );
}