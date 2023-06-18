import { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

import { Plus } from "react-bootstrap-icons";
import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "./components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import SpellFilters from "../../components/SpellFilters/SpellFilters";
import SpellCard from "../../components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";

export default function Spells() {
  const { currentUser } = useContext(CurrentUserContext);
  const { charID = "" } = useParams();

  const [charSpells, setCharSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const [formState, setFormState] = useState({
    show: false,
    chosenSpell: {},
  });

  const [isCreator, setIsCreator] = useState(false);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист

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
    const { hasError, data } = await ResourcesService.getSpells();
    const { spells: allSpells } = data;

    if (!hasError) {
      setSpells(allSpells);
    }
  }, []);

  const getCharSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getCharacter(charID);
    const { spells: newCharSpells, owner } = data;

    if (!hasError) {
      setCharSpells(newCharSpells);
      setSpells(newCharSpells);
      setIsCreator(owner === currentUser._id);
    }
  }, [charID, currentUser]);

  const handleCloseButton = () => {
    setSpells(charSpells);
    setIsAddLiseElements(false);
  };

  const handlePlusButton = () => {
    getAllSpells();
    setIsAddLiseElements(true);
  };

  const cbClose = async (spell) => {
    const { _id: spellID } = spell;
    const spellsData = charSpells.filter((s) => s._id !== spellID);

    const { hasError, data } = await ResourcesService.updateCharacter(charID, {
      spells: spellsData,
    });

    if (!hasError) {
      setCharSpells(data.spells);
    }

    if (!isAddLiseElements && !hasError) {
      setSpells(data.spells);
    }
  };

  const cbPlus = async (spell) => {
    const spellsData = [...charSpells, spell];
    const { hasError, data } = await ResourcesService.updateCharacter(charID, {
      spells: spellsData,
    });

    if (!hasError) {
      setCharSpells(data.spells);
    }

    if (!isAddLiseElements && !hasError) {
      setSpells(data.spells);
    }
  };

  const cbDell = async (data) => {
    try {
      const { _id: spellID } = data;
      await ResourcesService.deleteSpell(spellID);

      let spellsData = JSON.parse(sessionStorage.getItem("spellsData"));
      spellsData = spellsData.filter((s) => s._id !== spellID);
      sessionStorage.setItem("spellsData", JSON.stringify(spellsData));

      setSpells(spellsData);
    } catch (err) {
      console.log(err);
    }
  };

  const setLikeSpellCard = (spell) => {
    if (!isAddLiseElements) {
      return true;
    }
    return charSpells.some((s) => s._id === spell._id);
  };

  useEffect(() => {
    if (!charID) {
      getAllSpells();
    } else {
      getCharSpells();
    }
  }, [charID, getCharSpells, getAllSpells]);

  return (
    <main>
      <SpellFilters
        spells={spells}
        setFilteredSpells={setFilteredSpells}
        isCreator={isCreator}
      />
      {charID ? (
        isCreator ? (
          isAddLiseElements ? (
            <CloseButton onClick={handleCloseButton} className="my-2 mx-5" />
          ) : (
            <IconButton
              icon={<Plus size={24} />}
              onClick={handlePlusButton}
              className="my-2 mx-5"
            />
          )
        ) : null
      ) : (
        currentUser.role === "Admin" && (
          <IconButton icon={<Plus size={24} />} onClick={() => handleShowForm()} />
        )
      )}
      <MasonryContainer>
        {filteredSpells.map((spell) => (
          <SpellCard
            key={spell._id}
            handleShowForm={handleShowForm}
            spell={spell}
            inList={() => setLikeSpellCard(spell)}
            charList={!!charID}
            cbClose={cbClose}
            cbPlus={cbPlus}
            cbDell={cbDell}
            isCreator={isCreator}
          />
        ))}
      </MasonryContainer>
      {!charID && currentUser.role === "Admin" && (
        <SpellModalForm
          formState={formState}
          handelHideForm={handelHideForm}
          setSpells={setSpells}
        />
      )}
    </main>
  );
}
