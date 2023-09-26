import { useParams } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { Plus, X } from "react-bootstrap-icons";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import ResourcesService from "../../service/ResoursesService/ResourcesService";
import trottle from "../../utils/Decorations";

import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import Spinner from "../../components/Spinner/Spinner";
import SpellCard from "./components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";
import OpenButton from "../../components/OpenButton/OpenButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";

function CharacterSpells() {
  const { currentUser } = useContext(CurrentUserContext);
  const { charID = "" } = useParams();

  const [charSpells, setCharSpells] = useState([]);
  const [spells, setSpells] = useState([]);
  const [spellsLength, setSpellsLength] = useState(30);
  const [filteredSpells, setFilteredSpells] = useState([]);

  const [isCreator, setIsCreator] = useState(false);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист
  const [isLoader, setIsLoader] = useState(true);
  const [isDontActiveLike, setIsDontActiveLike] = useState(false);

  const getAllSpells = useCallback(async () => {
    const allSpells = JSON.parse(sessionStorage.getItem("spellsData"));

    if(allSpells) {
      setSpells(allSpells);
      return;
    }

    setIsLoader(true);
    const { hasError, data } = await ResourcesService.getSpells();

    if (!hasError) {
      setSpells(data.spells);
    }
    setIsLoader(false);
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

  const handleShowCharSpells = useCallback(() => {
    setSpells(charSpells);
    setIsAddLiseElements(false);
  }, [charSpells]);

  const handleShowAllSpells = useCallback(() => {
    getAllSpells().then(() => {
      setIsAddLiseElements(true);
    });
  }, [getAllSpells]);

  const handleUnlikedSpell = useCallback(
    async (spell) => {
      setIsDontActiveLike(true);
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
      setIsDontActiveLike(false);
    },
    [charID, charSpells, isAddLiseElements]
  );

  const handleLikedSpell = useCallback(
    async (spell) => {
      setIsDontActiveLike(true);
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
      setIsDontActiveLike(false);
    },
    [charSpells, charID, isAddLiseElements]
  );

  const hasSpellLiked = useCallback(
    (spell) => {
      if (!isAddLiseElements) {
        return true;
      }
      return charSpells.some((s) => s._id === spell._id);
    },
    [charSpells, isAddLiseElements]
  );

  const renderPage = useCallback(async () => {
    if (!charID) {
      await getAllSpells();
    } else {
      await getCharSpells();
    }
    setIsLoader(false);
  }, [charID, getCharSpells, getAllSpells]);

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

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return (
    <main>
      <div className="d-flex justify-content-center gap-3 p-3 p-md-4 p-lg-5">
        <SpellFilters spells={spells} setFilteredSpells={setFilteredSpells} isLoader={isLoader} />
        {charID &&
          isCreator &&
            <IconButton
              icon={isAddLiseElements ? <X size={24} /> : <Plus size={24} />}
              onClick={isAddLiseElements ? handleShowCharSpells : handleShowAllSpells}
              className="btn-warning"
              disabled={isLoader}
            />
        }
      </div>
      {isLoader ? (
        <Spinner />
      ) : (
        <MasonryContainer>
          {filteredSpells.slice(0, spellsLength).map((spell) => (
            <SpellCard
              key={spell._id}
              spell={spell}
              button={
                isCreator &&
                (hasSpellLiked(spell) ? (
                  <CloseButton
                    onClick={() => handleUnlikedSpell(spell)}
                    disabled={isDontActiveLike}
                  />
                ) : (
                  <OpenButton
                    onClick={() => handleLikedSpell(spell)}
                    disabled={isDontActiveLike}
                  />
                ))
              }
            />
          ))}
        </MasonryContainer>
      )}
    </main>
  );
}

export default CharacterSpells;
