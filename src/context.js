import React, { useState, useContext, useMemo } from "react";
import { useLocalStorage } from "react-use";

const AppContext = React.createContext();

function heavyComputation(contacts, searchValue, toFavourite) {
  let filtered = contacts;
  
  if (toFavourite) {
    filtered = contacts.filter(({favourite}) => favourite);
  }

  if (searchValue === "") {
    return filtered;
  }

  filtered = filtered.filter((contact) => {
    return Object.values(contact).some((value) => {
      if (
        typeof value === "string" &&
        !value.startsWith("data:image/jpeg;base64")
      ) {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else {
        return false;
      }
    });
  });

  return filtered;
}

const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [searchValue, setSearchValue] = useState("");
  const [showAddOrEditContact, setShowAddOrEditContact] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [mode, setMode] = useState("");
  const [toFavourite, setToFavourite] = useState(false);

  const filteredContacts = useMemo(
    () => heavyComputation(contacts, searchValue, toFavourite),
    [contacts, searchValue, toFavourite]
  );

  const handleAdd = () => {
    setShowAddOrEditContact(true);
    setMode("add");
  };

  const handleEdit = (id) => {
    setShowAddOrEditContact(true);
    setEditContactId(id);
    setMode("edit");
  };

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

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue,
        handleEdit,
        handleAdd,
        showAddOrEditContact,
        setShowAddOrEditContact,
        mode,
        editContactId,
        handleDelete,
        toFavourite,
        setToFavourite,
        filteredContacts,
        addToFavourite,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
