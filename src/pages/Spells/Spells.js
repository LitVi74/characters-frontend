import { useState, useContext, useEffect, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "./components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import { trottle } from "../../utils/Decorations";

import SpellCard from "../../components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";
import CardMenu from "../../components/CardMenu/CardMenu";

export default function Spells() {
  const { currentUser } = useContext(CurrentUserContext);

  const [spells, setSpells] = useState([]);
  const [currentSpells, setCurrentSpells] = useState([]);
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
    const currentLength = currentSpells.length;

    if (currentLength === 0) {
      setCurrentSpells(spells.slice(0, currentLength + 20));
    } else {
      setCurrentSpells(spells.slice(0, currentLength));
    }
  }, [spells]);

  useEffect(() => {
    const currentLength = currentSpells.length;

    if (spells.length > currentLength) {
      const exeEventScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1000 >=
          document.scrollingElement.scrollHeight
        ) {
          const card = spells.slice(0, currentLength + 20);
          setCurrentSpells(card);
        }
      };

      const handleScroll = trottle(exeEventScroll, 30);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return undefined;
  }, [currentSpells.length]);

  return (
    <main>
      <SpellFilters spells={currentSpells} setFilteredSpells={setFilteredSpells} />
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
        {filteredSpells.map((spell) => (
          <SpellCard
            key={spell._id}
            spell={spell}
            inList={() => {}}
            charList={false}
            cbClose={() => {}}
            cbPlus={() => {}}
            isCreator={false}
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
