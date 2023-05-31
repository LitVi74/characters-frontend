import { useState, useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

import { Plus } from "react-bootstrap-icons";
import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from "../../components/SpellModalForm/SpellModalForm";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import SpellFilters from "../../components/SpellFilters/SpellFilters";
import SpellCard from "../../components/SpellsCard/SpellsCard";
import IconButton from "../../components/IconButton/IconButton";

export default function Spells() {
  const { currentUser } = useContext(CurrentUserContext);
  const { charID = "" } = useParams();

  const [char, setChar] = useState({
    id: charID,
    name: "",
    spells: [],
    owner: "",
  });
  const [spells, setSpells] = useState(char.spells);

  const [isCreator, setIsCreator] = useState(false);
  const [isForm, setIsForm] = useState({
    isShow: false,
    data: {},
    update: false,
  });
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист
  const [filterActionList, setFilterActionList] = useState([]);

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

      return spells;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getCharSpells = useCallback(async () => {
    const { hasError, data } = await ResourcesService.getCharacter(charID);

    if (!hasError) {
      setChar({ id: charID, name: data.name, spells: data.spells, owner: data.owner });
    }
  }, [charID]);

  const renderAllSpells = useCallback(() => {
    getAllSpells()
      .then((res) => {
        res = res.map((spell) => {
          spell.inList = char.spells.some((s) => s._id === spell._id);
          return spell;
        });
        setSpells(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderCharSpells = () => {
    const spells = char.spells.map((spell) => {
      spell.inList = true;
      return spell;
    });
    setSpells(spells);
  };

  const handleCloseButton = () => {
    renderCharSpells();
    setIsAddLiseElements(false);
  };

  const handlePlusButton = () => {
    renderAllSpells();
    setIsAddLiseElements(true);
  };

  const cbClose = async (spell) => {
    const { _id: spellID } = spell;
    const spellsData = char.spells.filter((s) => s._id !== spellID);

    const { hasError, data } = await ResourcesService.updateCharacter(charID, {
      spells: spellsData,
    });

    if (!hasError) {
      setChar({ id: charID, name: data.name, spells: data.spells, owner: data.owner });
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

    if (!hasError) {
      setChar({ id: charID, name: data.name, spells: data.spells, owner: data.owner });
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
    setIsCreator(char.owner === currentUser.id);
  }, [char.owner, currentUser.id]);

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

  useEffect(() => {
    if (!charID) {
      getAllSpells()
        .then((res) => setSpells(res))
        .catch((err) => console.log(err));
    } else {
      checkCreatorRights();
      getCharSpells();

      if (!char.spells?.length) {
        setIsAddLiseElements(true);
        renderAllSpells();
      } else {
        renderCharSpells();
      }
    }
  }, [charID, getCharSpells, renderAllSpells, checkCreatorRights]);

  return (
    <main>
      <SpellFilters
        filterActionList={filterActionList}
        setFilterActionList={setFilterActionList}
      />
      {!!charID ? (
        isAddLiseElements ? (
          <CloseButton onClick={handleCloseButton} />
        ) : (
          <IconButton icon={<Plus size={24} />} onClick={handlePlusButton} />
        )
      ) : (
        currentUser.role === "Admin" && (
          <IconButton icon={<Plus size={24} />} onClick={handleAddInAllSpells} />
        )
      )}
      <MasonryContainer>
        {filterSpells(spells).map((spell) => (
          <SpellCard
            key={spell._id}
            cbForm={setIsForm}
            spell={spell}
            charList={!!charID}
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
        isSpellForm
      />
    </main>
  );
}
