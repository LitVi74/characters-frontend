import "./Spells.scss";
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { Plus, X } from "react-bootstrap-icons";

import { CurrentUserContext } from "../../shared/contexts/currentUserContext";
import ResourcesService from "../../shared/service/ResoursesService/ResourcesService";
import trottle from "../../shared/utils/Decorations";

import MasonryContainer from "../../shared/components/MasonryContainer/MasonryContainer";
import Spinner from "../../shared/components/Spinner/Spinner";
import SpellCard from "./components/SpellsCard/SpellsCard";
import IconButton from "../../shared/components/IconButton/IconButton";
import OpenButton from "../../shared/components/OpenButton/OpenButton";
import SpellFilters from "./components/SpellFilters/SpellFilters";
import { ISpell } from "../../shared/constants/IConstants";

export default function CharacterSpells() {
  const { currentUser } = useContext(CurrentUserContext);
  const { charID = "" } = useParams();

  const [charSpells, setCharSpells] = useState<ISpell[]>([]);
  const [spells, setSpells] = useState<ISpell[]>([]);
  const [spellsLength, setSpellsLength] = useState<number>(30);
  const [filteredSpells, setFilteredSpells] = useState<ISpell[]>([]);

  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isAddLiseElements, setIsAddLiseElements] = useState<boolean>(false); // переключатель добавления карточек в чарлист
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isDontActiveLike, setIsDontActiveLike] = useState<boolean>(false);

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

  const getCharSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getCharacter(charID);

    if (!hasError && data?.spells) {
      const { spells: newCharSpells, owner } = data;

      setCharSpells(newCharSpells);
      setSpells(newCharSpells);
      setIsCreator(owner === currentUser?._id);
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
    async (spell: ISpell) => {
      setIsDontActiveLike(true);
      const { _id: spellID } = spell;
      const spellsData = charSpells.filter((s) => s._id !== spellID);

      const { hasError, data } = await ResourcesService.updateCharacter(charID, {
        spells: spellsData,
      });

      if (!hasError && data?.spells) {
        setCharSpells(data.spells);
      }

      if (!isAddLiseElements && !hasError && data?.spells) {
        setSpells(data.spells);
      }
      setIsDontActiveLike(false);
    },
    [charID, charSpells, isAddLiseElements]
  );

  const handleLikedSpell = useCallback(
    async (spell: ISpell) => {
      setIsDontActiveLike(true);
      const spellsData = [...charSpells, spell];
      const { hasError, data } = await ResourcesService.updateCharacter(charID, {
        spells: spellsData,
      });

      if (!hasError && data?.spells) {
        setCharSpells(data.spells);
      }

      if (!isAddLiseElements && !hasError && data?.spells) {
        setSpells(data.spells);
      }
      setIsDontActiveLike(false);
    },
    [charSpells, charID, isAddLiseElements]
  );

  const hasSpellLiked = useCallback(
    (spell: ISpell) => {
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

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  return (
    <main className="spells-page">
      <div className="d-flex justify-content-center gap-3 p-3 p-md-4 pt-lg-5 pb-lg-4 px-lg-2">
        {charID && isCreator && (
          <IconButton
            icon={isAddLiseElements ? <X size={24} /> : <Plus size={24} />}
            onClick={isAddLiseElements ? handleShowCharSpells : handleShowAllSpells}
            className="btn-warning"
            disabled={isLoader}
          />
        )}
        <SpellFilters
          spells={spells}
          setFilteredSpells={setFilteredSpells}
          isLoader={isLoader}
        />
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
