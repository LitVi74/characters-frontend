import "./Spells.scss";
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { Plus } from "react-bootstrap-icons";

import ResourcesService from "../../shared/service/ResoursesService/ResourcesService";
import MasonryContainer from "../../shared/components/MasonryContainer/MasonryContainer";
import SpellModalForm from "./components/SpellModalForm/SpellModalForm";

import user from "../../shared/contexts/userContext";
import trottle from "../../shared/utils/Decorations";

import Spinner from "../../shared/components/Spinner/Spinner";
import SpellCard from "./components/SpellsCard/SpellsCard";
import IconButton from "../../shared/components/IconButton/IconButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";
import CardMenu from "../../shared/components/CardMenu/CardMenu";

import { ISpell, FormState } from "../../shared/constants/IConstants";

 const Spells = observer(() => {
  const [spells, setSpells] = useState<ISpell[]>([]);
  const [spellsLength, setSpellsLength] = useState<number>(30);
  const [filteredSpells, setFilteredSpells] = useState<ISpell[]>([]);

  const [formState, setFormState] = useState<FormState<ISpell>>({
    show: false,
    chosenRes: {},
  });

  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handleShowForm = useCallback((spell = {}) => {
    setFormState({
      show: true,
      chosenRes: spell,
    });
  }, []);

  const handelHideForm = useCallback(() => {
    setFormState({
      show: false,
      chosenRes: {},
    });
  }, []);

  const getAllSpells = useCallback(async () => {
    const allSpells = sessionStorage.getItem("spellsData");

    if (allSpells) {
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
    const screen = document.scrollingElement;

    if (screen && spells.length > spellsLength) {
      const exeEventScroll = () => {
        if (3 * screen.clientHeight + screen.scrollTop >= screen.scrollHeight) {
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
    <main className="spells-page">
      <div className="d-flex justify-content-center flex-column flex-md-row gap-3 p-3 p-md-4 pt-lg-5 pb-lg-4 px-lg-2">
        {user.data?.role === "Admin" && (
          <IconButton
            icon={<Plus size={24} />}
            onClick={() => handleShowForm()}
            className="d-flex btn-warning align-self-center"
            disabled={isLoader}
          >
            Добавить заклинание
          </IconButton>
        )}
        <SpellFilters
          spells={spells}
          setFilteredSpells={setFilteredSpells}
          isLoader={isLoader}
        />
      </div>
      <MasonryContainer>
        {filteredSpells.slice(0, spellsLength).map((spell) => (
          <SpellCard
            key={spell._id}
            spell={spell}
            button={
              user.data?.role === "Admin" && (
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
      {user.data?.role === "Admin" && (
        <SpellModalForm
          formState={formState}
          handelHideForm={handelHideForm}
          setSpells={setSpells}
        />
      )}
    </main>
  );
});

export default Spells;
