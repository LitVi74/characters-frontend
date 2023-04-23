import {useState} from 'react';
import {spells} from "../../const/spalls_const";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from '../../components/SpellModalForm/SpellModalForm';

export default function Spells() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [spellForm, setSpellForm] = useState({});

  const cbShowForm = () => {
    setIsShowForm(!isShowForm);
  };

  return (
    <main className="w-100 flex-grow-1">
      <h1 className="text-center">
        Spells Page
      </h1>
      <MasonryContainer spells={spells} />
      <SpellModalForm isShow={isShowForm} cbShow={cbShowForm} spell={spellForm} />
    </main>
  );
}