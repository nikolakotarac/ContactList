import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useCustomLocalStorage("contacts", []);
  const [allContacts, setAllContacts] = useState(contacts);
  const [openAdd, isOpenAdd] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
  const handleSubmit = () => {};

  const closeAdd = () => {
    isOpenAdd(false);
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
        handleSubmit,
        openAdd,
        isOpenAdd,
        closeAdd,
        handleDelete,
        addToFavourite,
        searchValue,
        setSearchValue,
        filterFavourite,
        allItemsHandle,
        allContacts,
        setAllContacts,
        filterBySearch,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
