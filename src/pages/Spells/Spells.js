import {useState, useContext, useEffect} from 'react';

import {spellsData} from "../../constants/constants";

import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from '../../components/SpellModalForm/SpellModalForm';
import PlusButton from '../../components/PlusButton/PlusButton';

import { CurrentUserContext } from '../../contexts/currentUserContext';

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

  const [isShowForm, setIsShowForm] = useState(false);
  const [spellForm, setSpellForm] = useState({});
  const [spells, setSpells] = useState([]);

  const cbShowForm = (spell = {}) => {
    if(isShowForm) {
      console.log(isShowForm);
      setIsShowForm(false);
    } else {
      setIsShowForm(() => {
        setSpellForm(spell);
        return true;
      });
    }
  };

  const renderAllSpells = () => {
    let spells = JSON.parse(sessionStorage.getItem('spellsData'));

    if(!spells) {
      spells = spellsData.map(spell => {
        spell.inList = charSpells.some(s => s._id === spell._id);
        return spell;
      });

      sessionStorage.setItem('spellsData', JSON.stringify(spells));
    }
    setSpells(spells);
  }

  useEffect(() => {
    if(!charList) {
      renderAllSpells();
    } else {
      const spells = charSpells.map(spell => {
        spell.inList = true;
        return spell
      })
      setSpells(spells);
    }
  }, [])

  return (
    <main className="w-100 flex-grow-1">
      {charList 
        ? <PlusButton onClick={renderAllSpells} />
        : role === 'Admin' && <PlusButton onClick={cbShowForm} />
      }
      <MasonryContainer cbShow={cbShowForm} spells={spells} charList={charList} />
      <SpellModalForm isShow={isShowForm} cbShow={cbShowForm} spell={spellForm} />
    </main>
  );
}