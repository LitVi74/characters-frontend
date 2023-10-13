import "./CharacterLink.scss";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, MouseEvent } from "react";

import { PATHS } from "../../../../constants/constants";
import CardMenu from "../../../../components/CardMenu/CardMenu";
import { ICharacter } from "../../../../constants/IConstants";

interface PropsCharacterLink {
  char: ICharacter;
  cbForm: () => void;
  cbClose: (char: ICharacter) => Promise<void>;
}

export default function CharacterLink({ char, cbForm, cbClose }: PropsCharacterLink) {
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const { _id, name } = char;

  const handleUpdate = useCallback(() => {
    cbForm();
  }, [cbForm]);

  const handleDelete = useCallback(async () => {
    setIsLoader(true);
    await cbClose(char);
    setIsLoader(false);
  }, [cbClose, char]);

  const handleNavLink = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        navigate(`${PATHS.characters}/${_id}`);
      }
    },
    [_id, navigate]
  );

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center char"
      onClick={handleNavLink}
      aria-hidden="true"
    >
      {name}
      <CardMenu cbForm={handleUpdate} cbDell={handleDelete} isLoader={isLoader} />
    </li>
  );
}
