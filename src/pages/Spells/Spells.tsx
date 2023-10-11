import { useState, useContext, useEffect, useCallback } from "react";
import { Plus } from "react-bootstrap-icons";

import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "./components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import trottle from "../../utils/Decorations";

import Spinner from "../../components/Spinner/Spinner";
import SpellCard from "./components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";
import CardMenu from "../../components/CardMenu/CardMenu";

import { ISpell } from "../../constants/constants";

interface FormState {
  show: boolean;
  chosenSpell: object;
}

export default function Spells() {
  const { currentUser } = useContext(CurrentUserContext);

  const [spells, setSpells] = useState<ISpell[]>([]);
  const [spellsLength, setSpellsLength] = useState<number>(30);
  const [filteredSpells, setFilteredSpells] = useState<ISpell[]>([]);

  const [formState, setFormState] = useState<FormState>({
    show: false,
    chosenSpell: {},
  });

  const [isLoader, setIsLoader] = useState<boolean>(false);

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
    const allSpells = sessionStorage.getItem("spellsData");

    if(allSpells) {
      setSpells(JSON.parse(allSpells));
      return;
    }

    setIsLoader(true);
    const { hasError, data } = await ResourcesService.getSpells();

    if (!hasError && data) {
      setSpells(data);
    }
    setIsLoader(false);
  }, []);

  const handleDeleteSpell = useCallback(async (spellID: string) => {
    setIsLoader(true);
    const { hasError, data } = await ResourcesService.deleteSpell(spellID);

    if (!hasError && data) {
      setSpells(data);
    }
    setIsLoader(false);
  }, []);

  useEffect(() => {
    getAllSpells();
  }, [getAllSpells]);

  useEffect(() => {
    if (spells.length > spellsLength) {
      const exeEventScroll = () => {
        if (!document.scrollingElement) {
          return;
        }
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
      <div className="d-flex justify-content-center flex-column flex-md-row gap-3 p-3 p-md-4 p-lg-5">
        <SpellFilters spells={spells} setFilteredSpells={setFilteredSpells} isLoader={isLoader} />
        {currentUser?.role === "Admin" && (
          <IconButton
            icon={<Plus size={24} />}
            onClick={() => handleShowForm()}
            className="btn-warning align-self-center"
            disabled={isLoader}
          >
            Добавить заклинание
          </IconButton>
        )}
      </div>
      <MasonryContainer>
        {filteredSpells.slice(0, spellsLength).map((spell) => (
          <SpellCard
            key={spell._id}
            spell={spell}
            button={
              currentUser?.role === "Admin" && (
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
      {currentUser?.role === "Admin" && (
        <SpellModalForm
          formState={formState}
          handelHideForm={handelHideForm}
          setSpells={setSpells}
        />
      )}
    </main>
  );
}
