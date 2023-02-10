import React, { useState, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "react-use";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [searchValue, setSearchValue] = useState("");
  const [showAddOrEditContact, setShowAddOrEditContact] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [activeButton, setActiveButton] = useState(1);
  const [mode, setMode] = useState("");
  const [toFavourite, setToFavourite] = useState(false);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    setOriginalContacts(contacts);
    setFilteredContacts(contacts);
  }, [contacts]);

  const memoizedValue = useMemo(
    () => heavyComputation(contacts, searchValue, toFavourite),
    [contacts, searchValue, toFavourite]
  );

  function heavyComputation(contacts, searchValue, toFavourite) {
    const handleDelete = (param) => {
      const delelteContact = contacts.filter(
        (contact) => contact.id !== param.id
      );
      setContacts([...delelteContact]);
    };

    const addToFavourite = (res) => {
      let updatedContact = contacts.map((i) => {
        if (i.id === res.id) {
          i.favourite = !i.favourite;
        }
        return i;
      });
      setContacts([...updatedContact]);
    };

    const filterContacts = () => {
      if (toFavourite === false) {
        setToFavourite(true);
        setActiveButton(2);
        const originalContacts = contacts;
        setContacts(contacts.filter((i) => i.favourite === true));
        setOriginalContacts(originalContacts);
      } else {
        setToFavourite(false);
        setActiveButton(1);
        setContacts([...originalContacts]);
      }
    };

    const filterBySearch = () => {
      if (searchValue === "") {
        setFilteredContacts(contacts);
        return;
      }
      const filteredItems = contacts.filter((contact) => {
        return Object.values(contact).some((value) => {
          if (
            typeof value === "string" &&
            !value.startsWith("data:image/jpeg;base64")
          ) {
            return (
              typeof value === "string" &&
              value.toLowerCase().includes(searchValue.toLowerCase())
            );
          }
        });
      });
      setFilteredContacts(filteredItems);
    };

    return {
      handleDelete,
      addToFavourite,
      filterContacts,
      filterBySearch,
    };
  }

  const handleAdd = () => {
    setShowAddOrEditContact(true);
    setMode("add");
  };

  const handleEdit = (id) => {
    setShowAddOrEditContact(true);
    setEditContactId(id);
    setMode("edit");
  };

  useEffect(() => {
    memoizedValue.filterBySearch();
  }, [searchValue]);

  return (
    <AppContext.Provider
      value={{
        contacts,
        setContacts,
        searchValue,
        setSearchValue,
        handleEdit,
        handleAdd,
        showAddOrEditContact,
        setShowAddOrEditContact,
        mode,
        editContactId,
        activeButton,
        ...memoizedValue,
        setToFavourite,
        filteredContacts,
        setFilteredContacts,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
