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
import { Plus } from "react-bootstrap-icons";

let charSpells = [];

export default function Spells({ charList, chars }) {
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
  const [filterActionList, setFilterActionList] = useState([]);
  console.log(spells)

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
      charSpells = (await ResourcesService.getCharacter(charID)).spells;
    } catch (err) {
      console.log(err);
    }
  }, [charID]);

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
      const spellsData = charSpells.filter((s) => s._id !== spellID);
      charSpells = (await ResourcesService.updateCharacter(charID, {
        spells: spellsData,
      })).spells;

      if (!isAddLiseElements) {
        setSpells(charSpells);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cbPlus = async (data) => {
    try {
      const spellsData = [ ...charSpells, data ];
      charSpells = (await ResourcesService.updateCharacter(charID, {
        spells: spellsData,
      })).spells;
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

  const checkCreatorRights = useCallback(() => {
    if (chars.length) {
      const rights = chars.some((c) => c._id === charID);
      setIsCreator(rights);
    }
  }, [chars, charID]);

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
    if(charList && charSpells.length) {
      return true;
    }
    return charSpells.some((s) => s._id === spell._id);
  };

  useEffect(() => {
    if (!charList) {
      getAllSpells();
    } else {
      checkCreatorRights();
      getCharSpells();

      if (!charSpells.length) {
        setIsAddLiseElements(true);
        getAllSpells();
      } else {
        setSpells(charSpells);
      }
    }
  }, [charList, getCharSpells, checkCreatorRights]);

  return (
    <main>
      <SpellFilters
        filterActionList={filterActionList}
        setFilterActionList={setFilterActionList}
      />
      {charList ? (
        isAddLiseElements ? (
          <CloseButton 
            onClick={handleCloseButton} 
            className="my-2 mx-5"
          />
        ) : (
          <IconButton 
            icon={<Plus size={24} />} 
            onClick={handlePlusButton} 
            className="my-2 mx-5"
          />
        )
      ) : (
        currentUser.role === "Admin" && (
          <IconButton
            icon={<Plus size={24} />}
            onClick={handleAddInAllSpells}
          />
        )
      )}
      <MasonryContainer>
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
      <SpellModalForm
        isForm={isForm}
        cbForm={setIsForm}
        cbSubmit={cbSubmit}
        isSpellForm={true}
      />
    </main>
  );
}
