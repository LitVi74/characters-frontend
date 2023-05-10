import {useState, useContext, useEffect, useCallback} from 'react';
import {CloseButton, Button} from 'react-bootstrap';

import {spellsData} from "../../constants/constants";

import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from '../../components/SpellModalForm/SpellModalForm';

import { CurrentUserContext } from '../../contexts/currentUserContext';
import SpellFilters from "../../components/SpellFilters/SpellFilters";

let charSpells = [
  {
    _id: "1",
    name: "Священное пламя",
    desc: `На существо, которое вы видите в пределах дистанции, нисходит сияние, похожее на огонь. Цель должна преуспеть в спасброске Ловкости, иначе получит 1к8 урона излучением. Для этого спасброска цель не получает преимуществ от укрытия.`,
    higher_level: "Урон этого заклинания увеличивается на 1к8, когда вы достигаете 5-го уровня (2к8), 11-го уровня (3к8) и 17-го уровня (4к8).",
    range: 60,
    components: [
      "В",
      "С"
    ],
    material: "",
    ritual: false,
    duration: "Мгновенная",
    concentration: false,
    casting_time: "1 действие",
    level: 0,
    school: "Воплощение",
    classes: ["Жрец"],
  }
];

export default function Spells({charList}) {
  const { role } = useContext(CurrentUserContext);

  const [isForm, setIsForm] = useState({
    isShow: false,
    spell: {},
    update: false
  });
  const [spells, setSpells] = useState([]);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false);

  const handleAddInAllSpells = () => {
    setIsForm({
      isShow: true,
      spell: {},
      update: false
    })
  };

  const cbSubmit = (spell, update) => {
    const newSpells = update
      ? spells.map(s => {
          if(spell._id === s._id) {
            return spell
          }
          return s
        })
      : [...spells, spell];
    
    sessionStorage.setItem('spellsData', JSON.stringify(newSpells));
    setSpells(newSpells);
    setIsForm({
      ...isForm,
      isShow: false
    });
  };

  const getAllSpells = () => {
    let spells = JSON.parse(sessionStorage.getItem('spellsData'));

    if(!spells) {
      sessionStorage.setItem('spellsData', JSON.stringify(spellsData));
      spells = spellsData;
    }
    return spells
  }

  const renderAllSpells = useCallback(() => {
    let spells = getAllSpells();

    spells = spells.map(spell => {
      spell.inList = charSpells.some(s => s._id === spell._id);
      return spell;
    });
    setSpells(spells);
  }, []);

  const renderCharSpells = () => {
    const spells = charSpells.map(spell => {
      spell.inList = true;
      return spell
    });
    setSpells(spells);
  };

  const handleCloseButton = () => {
    renderCharSpells();
    setIsAddLiseElements(false);
  };

  const handlePlusButton = () => {
    renderAllSpells();
    setIsAddLiseElements(true);
  }

  const cbClose = (spell) => {
    charSpells = charSpells.filter(s => s._id !== spell._id);
    if(!isAddLiseElements) {
      setSpells(charSpells);
    }
  };

  const cbPlus = (spell) => {
    charSpells.push(spell);
  };

  useEffect(() => {
    if(!charList) {
      const spells = getAllSpells();
      
      setSpells(spells);
    } else if(!charSpells.length) {
      setIsAddLiseElements(true);
      renderAllSpells();
    } else {
      renderCharSpells();
    }
  }, [charList, renderAllSpells]);

  return (
    <main>
        <SpellFilters />
        {charList
          ? isAddLiseElements
            ? <CloseButton onClick={handleCloseButton} />
            : <Button onClick={handlePlusButton} />
          : role === 'Admin' && <Button onClick={handleAddInAllSpells} />
        }
      <MasonryContainer cbForm={setIsForm} spells={spells} charList={charList} cbClose={cbClose} cbPlus={cbPlus} />
      <SpellModalForm isForm={isForm} cbForm={setIsForm} cbSubmit={cbSubmit} />
    </main>
  );
}