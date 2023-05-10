import './SpellsCard.scss';

import { useContext, useState } from 'react';
import {Button, CloseButton} from 'react-bootstrap';

import CardMenu from '../CardMenu/CardMenu';
import PlusButton from '../PlusButton/PlusButton';

import { CurrentUserContext } from '../../contexts/currentUserContext';

export default function SpellCard({cbForm, cbDell, cbClose, cbPlus, spell, charList}) {
  const { role } = useContext(CurrentUserContext);
  const {
    inList,
    name,
    school,
    level,
    casting_time,
    range,
    components,
    material,
    concentration,
    duration,
    classes,
    desc,
    higher_level
  } = spell;
  const [isСlosure, setIsСlosure] = useState(inList);

  const handlePlusButton = () => {
    cbPlus(spell);
    setIsСlosure(true);
  };

  const handleCloseButton = () => {
    cbClose(spell);
    setIsСlosure(false);
  }

  return (
    <li className='spell'>
      <div className='spell__container'>
        <h3 className='spell__title'>{name}</h3>
        {charList
          ? isСlosure
              ? <CloseButton onClick={handleCloseButton} />
              : <Button onClick={handlePlusButton} />
          : role === 'Admin' && <CardMenu cbForm={cbForm} cbDell={cbDell} spell={spell} />
        }
      </div>
      <div className='spell__container'>
        <p className='spell__text'>{school}</p>
        <p className='spell__text'>{`${level} уровень`}</p>
      </div>
      <p className='spell__text'>{`Время накладывания: ${casting_time}`}</p>
      <p className='spell__text'>{`Дистанция: ${range}`}</p>
      <p className='spell__text'>{`Компоненты: ${components.join(', ')}${material ? '(' + material + ')' : ''}`}</p>
      <p className='spell__text'>{`Длительность: ${concentration ? 'Концентрация, вплоть до ' : ''}${duration}`}</p>
      <p className='spell__text'>{`Классы: ${classes.join(', ')}`}</p>
      <p className='spell__text'>{desc}</p>
      <p className='spell__text'>{`На больших уровнях: ${higher_level}`}</p>
    </li>
  )
}