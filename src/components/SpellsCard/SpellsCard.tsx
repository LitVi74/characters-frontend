import './SpellsCard.scss';

import { FC } from 'react';

import {SpellResponse} from "../../Service/ResoursesService/ResourcesResponse";
import CardMenu from '../CardMenu/CardMenu';

const SpellCard: FC<{spell: SpellResponse}> = ({spell}) => {
  const {
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
  } = spell

  return (
    <li className='spell'>
      <div className='spell__container'>
        <h3 className='spell__title'>{name}</h3>
        <CardMenu />
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

export default SpellCard;