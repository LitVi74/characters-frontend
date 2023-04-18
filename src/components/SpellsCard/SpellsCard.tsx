import './SpellsCard.scss';

import { FC } from 'react';

const SpellCard: FC = ({card}) => {
  return (
    <li className='spell'>
      <button className='spell__nav'>Меню</button>
      <h3 className='spell__title'>{card.name}</h3>
      <div className='spell__container'>
        <p className='spell__text'>{card.school}</p>
        <p className='spell__text'>{`${card.level} уровень`}</p>
      </div>
      <p className='spell__text'>{`Время накладывания: ${card.casting_time}`}</p>
      <p className='spell__text'>{`Дистанция: ${card.range}`}</p>
      <p className='spell__text'>{`Компоненты: ${card.components.join(', ')}${card.materials ? '(' + card.materials + ')' : ''}`}</p>
      <p className='spell__text'>{`Длительность: ${card.concentration ? 'Концентрация, вплоть до ' : ''}${card.duration}`}</p>
      <p className='spell__text'>{`Классы: ${card.classes.join(', ')}`}</p>
      <p className='spell__text'>{card.desc}</p>
      <p className='spell__text'>{`На больших уровнях: ${card.higher_level}`}</p>
    </li>
  )
}

export default SpellCard;