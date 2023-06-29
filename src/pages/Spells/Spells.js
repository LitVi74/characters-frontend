import { useState, useContext, useEffect, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "./components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import { trottle } from "../../utils/Decorations";

import SpellCard from "./components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";
import CardMenu from "../../components/CardMenu/CardMenu";

export default function Spells() {
  const { currentUser } = useContext(CurrentUserContext);

  const [spells, setSpells] = useState([]);
  const [spellsLength, setSpellsLength] = useState(30);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const [formState, setFormState] = useState({
    show: false,
    chosenSpell: {},
  });

  const [isLoader, setIsLoader] = useState(true);

  const handleShowForm = useCallback((spell = {}) => {
    setFormState({
      show: true,
      chosenSpell: spell,
    });
  }, []);

  const handelHideForm = useCallback(() => {
    setFormState({
      show: false,
      chosenSpell: {},
    });
  }, []);

  const getAllSpells = useCallback(async () => {
    setIsLoader(true);
    const { hasError, data } = await ResourcesService.getSpells();
    const { spells: allSpells } = data;

    if (!hasError) {
      setSpells(allSpells);
    }
    setIsLoader(false);
  }, []);

  const handleDeleteSpell = useCallback(async (spellID) => {
    const { hasError, data } = await ResourcesService.deleteSpell(spellID);

    if (!hasError) {
      setSpells(data.spells);
    }
  }, []);

  useEffect(() => {
    getAllSpells();
  }, [getAllSpells]);

  useEffect(() => {
    if (spells.length > spellsLength) {
      const exeEventScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1000 >=
          document.scrollingElement.scrollHeight
        ) {
          setSpellsLength(spellsLength + 30);
        }
      };

      const handleScroll = trottle(exeEventScroll, 30);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return undefined;
  }, [spells, spellsLength]);

  return (
    <main>
      <SpellFilters spells={spells} setFilteredSpells={setFilteredSpells} />
      {currentUser.role === "Admin" && (
        <IconButton
          icon={<Plus size={24} />}
          onClick={() => handleShowForm()}
          className="mb-3 mx-auto"
          disabled={isLoader}
        >
          Добавить заклинание
        </IconButton>
      )}
      <MasonryContainer>
        {filteredSpells.slice(0, spellsLength).map((spell) => (
          <SpellCard
            key={spell._id}
            spell={spell}
            button={
              currentUser.role === "Admin" && (
                <CardMenu
                  cbForm={() => handleShowForm(spell)}
                  cbDell={() => handleDeleteSpell(spell._id)}
                  isLoader={isLoader}
                />
              )
            }
          />
        ))}
      </MasonryContainer>
      {isLoader && <Spinner />}
      {currentUser.role === "Admin" && (
        <SpellModalForm
          formState={formState}
          handelHideForm={handelHideForm}
          setSpells={setSpells}
        />
      )}
    </main>
  );
}
