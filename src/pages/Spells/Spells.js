import { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "../../components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import SpellFilters from "../../components/SpellFilters/SpellFilters";
import SpellCard from "../../components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";
import Spinner from "../../components/Spinner/Spinner";
import { Plus } from "react-bootstrap-icons";

export default function Spells({ charList }) {
  const { currentUser } = useContext(CurrentUserContext);

  const { charID } = useParams();

  const [isCreator, setIsCreator] = useState(false);
  const [isForm, setIsForm] = useState({
    isShow: false,
    data: {},
    update: false,
  });
  const [spells, setSpells] = useState([]);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист
  const [filterActionList, setFilterActionList] = useState(new Map());
  const [charSpells, setCharSpells] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  const handleAddInAllSpells = () => {
    setIsForm({
      isShow: true,
      data: {},
      update: false,
    });
  };

  const cbSubmit = async (data, spellID, update) => {
    try {
      const spell = update
        ? await ResourcesService.updateSpell(spellID, data)
        : await ResourcesService.createSpell(data);

      let spellsData = JSON.parse(sessionStorage.getItem("spellsData"));
      spellsData = update
        ? spellsData.map((s) => {
            if (spell._id === s._id) {
              return spell;
            }
            return s;
          })
        : [...spells, spell];
      sessionStorage.setItem("spellsData", JSON.stringify(spellsData));

      setSpells(spellsData);
      setIsForm({
        ...isForm,
        isShow: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSpells = async () => {
    try {
      let spells = JSON.parse(sessionStorage.getItem("spellsData"));

      if (!spells) {
        spells = await ResourcesService.getSpells();
        sessionStorage.setItem("spellsData", JSON.stringify(spells));
      }

      setSpells(spells);
    } catch (err) {
      console.log(err);
    }
  };

  const getCharSpells = useCallback(async () => {
    try {
      const { spells, owner } = await ResourcesService.getCharacter(charID);
      setCharSpells(spells);
      setSpells(spells);
      setIsCreator(owner === currentUser._id);
    } catch (err) {
      console.log(err);
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

  const cbClose = async (data) => {
    try {
      const { _id: spellID } = data;
      let spellsData = charSpells.filter((s) => s._id !== spellID);

      spellsData = (
        await ResourcesService.updateCharacter(charID, {
          spells: spellsData,
        })
      ).spells;
      setCharSpells(spellsData);

      if (!isAddLiseElements) {
        setSpells(spellsData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cbPlus = async (data) => {
    try {
      let spellsData = [...charSpells, data];

      spellsData = (
        await ResourcesService.updateCharacter(charID, {
          spells: spellsData,
        })
      ).spells;
      setCharSpells(spellsData);
    } catch (err) {
      console.log(err);
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

  const filterSpells = useCallback(
    (spells) => {
      let filteredSpells = [...spells];

      filterActionList.forEach((filterAction) => {
        filteredSpells = filterAction(filteredSpells);
      });

      return filteredSpells;
    },
    [filterActionList]
  );

  const setLikeSpellCard = (spell) => {
    if (!isAddLiseElements) {
      return true;
    }
    return charSpells.some((s) => s._id === spell._id);
  };

  const renderPage = async () => {
    if (!charList) {
      await getAllSpells();
    } else {
      await getCharSpells();
    }
    setIsLoader(false);
  }

  useEffect(() => {
    renderPage();
  }, [charList, getCharSpells]);

  return (
    <main>
      <SpellFilters
        filterActionList={filterActionList}
        setFilterActionList={setFilterActionList}
      />
      {charList ? (
        isCreator ? (
          isAddLiseElements ? (
            <CloseButton 
              onClick={handleCloseButton} 
              className="my-2 mx-5" 
              disabled={isLoader ? 'disabled' : ''}
            />
          ) : (
            <IconButton
              icon={<Plus size={24} />}
              onClick={handlePlusButton}
              className="my-2 mx-5"
              isLoader={isLoader}
            />
          )
        ) : null
      ) : (
        currentUser.role === "Admin" && (
          <IconButton
            icon={<Plus size={24} />}
            onClick={handleAddInAllSpells}
            isLoader={isLoader}
          />
        )
      )}
      {isLoader
        ? <Spinner />
        : <MasonryContainer>
          {filterSpells(spells).map((spell) => (
            <SpellCard
              key={spell._id}
              cbForm={setIsForm}
              spell={spell}
              inList={() => setLikeSpellCard(spell)}
              charList={charList}
              cbClose={cbClose}
              cbPlus={cbPlus}
              cbDell={cbDell}
              isCreator={isCreator}
            />
          ))}
        </MasonryContainer>
      }
      <SpellModalForm
        isForm={isForm}
        cbForm={setIsForm}
        cbSubmit={cbSubmit}
        isSpellForm={true}
      />
    </main>
  );
}
