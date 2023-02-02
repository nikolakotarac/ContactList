import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useCustomLocalStorage("contacts", []);
  const [allContacts, setAllContacts] = useState(contacts);
  const [searchValue, setSearchValue] = useState("");
  const [showAddOrEditContact, setShowAddOrEditContact] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  const [mode, setMode] = useState("");

  function useCustomLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    }, [key, storedValue]);
    return [storedValue, setStoredValue];
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

  const handleDelete = (param) => {
    const delelteContact = contacts.filter(
      (contact) => contact.id !== param.id
    );
    setContacts([...delelteContact]);
    const dltAllContacts = allContacts.filter(
      (contact) => contact.id !== param.id
    );

    setAllContacts([...dltAllContacts]);
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

  const filterFavourite = () => {
    setContacts(contacts.filter((i) => i.favourite === true));
  };

  const allItemsHandle = () => {
    setContacts(allContacts);
  };

  const filterBySearch = () => {
    if (searchValue === "") {
      setContacts(allContacts);
      return;
    }
    const filteredItems = contacts.filter((contact) => {
      return Object.values(contact).some((value) => {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    });
    setContacts(filteredItems);
  };

  useEffect(() => {
    filterBySearch();
  }, [searchValue]);

  return (
    <AppContext.Provider
      value={{
        contacts,
        setContacts,
        handleDelete,
        addToFavourite,
        searchValue,
        setSearchValue,
        filterFavourite,
        allItemsHandle,
        allContacts,
        setAllContacts,
        filterBySearch,
        handleEdit,
        handleAdd,
        showAddOrEditContact,
        setShowAddOrEditContact,
        mode,
        editContactId,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
