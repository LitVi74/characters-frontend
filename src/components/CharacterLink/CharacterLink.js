import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

import { PATHS } from "../../constants/constants";

import CardMenu from "../CardMenu/CardMenu";

export default function CharacterLink({ char, cbForm, cbClose }) {
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const { _id, name } = char;

  const handleUpdate = useCallback(() => {
    cbForm({
      isShow: true,
      data: char,
      update: true,
    });
  }, [cbForm, char]);

  const handleDelete = useCallback(() => {
    setIsLoader(true);
    cbClose(char);
    setIsLoader(false);
  }, [cbClose, char]);

  const handleNavLink = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        navigate(`${PATHS.characters}/${_id}`);
      }
    },
    [_id, navigate]
  );

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={handleNavLink}
    >
      {name}
      <CardMenu cbForm={handleUpdate} cbDell={handleDelete} isLoader={isLoader} />
    </li>
  );
}
