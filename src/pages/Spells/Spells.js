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

  const [char, setChar] = useState({
    _id: charID,
    name: "",
    spells: [],
    owner: "",
  });
  const [spells, setSpells] = useState(char.spells);

  const [formState, setFormState] = useState({
    show: false,
    chosenSpell: {},
  });

  const [isCreator, setIsCreator] = useState(false);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист
  const [filterActionList, setFilterActionList] = useState([]);

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

  const getAllSpells = async () => {
    const { hasError, data } = await ResourcesService.getSpells();
    const { spells: allSpells } = data;

    if (!hasError) {
      setSpells(allSpells);
    }
  };

  const getCharSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getCharacter(charID);
    const { _id, name, spells, owner } = data;

    if (!hasError) {
      setChar({ _id, name, spells, owner });
    }
  }, [charID]);

  const handleCloseButton = () => {
    setSpells(char.spells);
    setIsAddLiseElements(false);
  };

  const handlePlusButton = () => {
    getAllSpells();
    setIsAddLiseElements(true);
  };

  const cbClose = async (spell) => {
    const { _id: spellID } = spell;
    const spellsData = char.spells.filter((s) => s._id !== spellID);

    const { hasError, data } = await ResourcesService.updateCharacter(charID, {
      spells: spellsData,
    });
    const { _id, name, spells, owner } = data;

    if (!hasError) {
      setChar({ _id, name, spells, owner });
    }

    if (!isAddLiseElements && !hasError) {
      setSpells(data.spells);
    }
  };

  const cbPlus = async (spell) => {
    const spellsData = [...char.spells, spell];
    const { hasError, data } = await ResourcesService.updateCharacter(charID, {
      spells: spellsData,
    });
    const { _id, name, spells, owner } = data;

    if (!hasError) {
      setChar({ _id, name, spells, owner });
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

  const checkCreatorRights = useCallback(() => {
    setIsCreator(char.owner === currentUser._id);
  }, [char.owner, currentUser._id]);

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
    if (charID && char.spells.length) {
      return true;
    }
    return char.spells.some((s) => s._id === spell._id);
  };

  useEffect(() => {
    if (!charID) {
      getAllSpells();
    } else {
      checkCreatorRights();
      getCharSpells();

      if (!char.spells?.length) {
        setIsAddLiseElements(true);
        getAllSpells();
      } else {
        setSpells(char.spells);
      }
    }
  }, [charID, getCharSpells, checkCreatorRights]);

  return (
    <main>
      <SpellFilters
        filterActionList={filterActionList}
        setFilterActionList={setFilterActionList}
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
        {filterSpells(spells).map((spell) => (
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
