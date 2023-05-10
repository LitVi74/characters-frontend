import { Link } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";

import { PATHS } from "../../constants/constants";

import CardMenu from "../CardMenu/CardMenu";

export default function CharacterLink({char, cbForm, cbClose}) {
  const {_id, name} = char;

  const handleUpdate = () => {
    cbForm({
      isForm: true,
      char: char,
      update: true
    })
  };

  const handleDelete = () => {
    cbClose(char)
  };

  return (
    <ListGroupItem as={Link} to={PATHS.spells + `/${_id}`} action >
      {name}
      <CardMenu cbForm={handleUpdate} cbDell={handleDelete} />
    </ListGroupItem>
  );
}