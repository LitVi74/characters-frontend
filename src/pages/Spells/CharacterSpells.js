import { useParams } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import SpellFilters from "../../components/SpellFilters/SpellFilters";
import ResourcesService from "../../service/ResoursesService/ResourcesService";
import { trottle } from "../../utils/Decorations";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellCard from "../../components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";

function CharacterSpells() {
  const { currentUser } = useContext(CurrentUserContext);
  const { charID = "" } = useParams();

  const [charSpells, setCharSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [currentSpells, setCurrentSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const [isCreator, setIsCreator] = useState(false);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист
  const [isLoader, setIsLoader] = useState(true);

  const getAllSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getSpells();
    const { spells: allSpells } = data;

    if (!hasError) {
      setCurrentSpells([]);
      setSpells(allSpells);
    }
  }, []);

  const handleCloseButton = useCallback(() => {
    setSpells(charSpells);
    setIsAddLiseElements(false);
  }, [charSpells]);

  const handlePlusButton = useCallback(() => {
    getAllSpells();
    setIsAddLiseElements(true);
  }, [getAllSpells]);

  const cbClose = useCallback(
    async (spell) => {
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
    },
    [charID, charSpells, isAddLiseElements]
  );

  const cbPlus = useCallback(
    async (spell) => {
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
    },
    [charSpells, charID]
  );

  const setLikeSpellCard = useCallback(
    (spell) => {
      if (!isAddLiseElements) {
        return true;
      }
      return charSpells.some((s) => s._id === spell._id);
    },
    [charSpells, isAddLiseElements]
  );

  const getCharSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getCharacter(charID);
    const { spells: newCharSpells, owner } = data;

    if (!hasError) {
      setCharSpells(newCharSpells);
      setCurrentSpells([]);
      setSpells(newCharSpells);
      setIsCreator(owner === currentUser._id);
    }
  }, [charID, currentUser]);

  const renderPage = useCallback(async () => {
    if (!charID) {
      await getAllSpells();
    } else {
      await getCharSpells();
    }
    setIsLoader(false);
  }, [charID, getCharSpells, getAllSpells]);

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

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return (
    <main>
      <SpellFilters spells={currentSpells} setFilteredSpells={setFilteredSpells} />
      {charID && isCreator && isAddLiseElements ? (
        <CloseButton
          onClick={handleCloseButton}
          className="my-2 mx-5"
          disabled={isLoader ? "disabled" : ""}
        />
      ) : (
        <IconButton
          icon={<Plus size={24} />}
          onClick={handlePlusButton}
          className="my-2 mx-5"
          disabled={isLoader}
        />
      )}
      <MasonryContainer>
        {filteredSpells.map((spell) => (
          <SpellCard
            key={spell._id}
            handleShowForm={() => {}}
            spell={spell}
            inList={() => setLikeSpellCard(spell)}
            charList={!!charID}
            cbClose={cbClose}
            cbPlus={cbPlus}
            cbDell={() => {}}
            isCreator={false}
          />
        ))}
      </MasonryContainer>
      {isLoader && <Spinner />}
    </main>
  );
}

export default CharacterSpells;
