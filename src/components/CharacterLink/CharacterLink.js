import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { PATHS } from "../../constants/constants";

import CardMenu from "../CardMenu/CardMenu";

export default function CharacterLink({char, cbForm, cbClose}) {
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const {_id, name} = char;

  const handleUpdate = () => {
    cbForm({
      isShow: true,
      data: char,
      update: true
    })
  };

  const handleDelete = () => {
    setIsLoader(true);
    cbClose(char);
    setIsLoader(false);
  };

  const handleNavLink = (e) => {
    if(e.target === e.currentTarget) {
      navigate(PATHS.spells + `/${_id}`);
    }
  };

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center' onClick={handleNavLink}>
      {name}
      <CardMenu cbForm={handleUpdate} cbDell={handleDelete} isLoader={isLoader}/>
    </li>
  );
}