import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let item = localStorage.getItem("item");
  if (item) {
    return (item = JSON.parse(localStorage.getItem("item")));
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [formErrors, setFormErrors] = useState({});
  const [item, setItem] = useState(getLocalStorage());
  const [originalItem, setOriginalItem] = useState(item);
  const [openAdd, isOpenAdd] = useState(false);
  const [openContactId, setOpenContactId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [editingContact, setEditingContact] = useState({});
  const [product, setProduct] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
    favourite: false,
  });

  const handleChange = (e, field, id) => {
    if (e.target.value === "") {
      return;
    }
    if (field === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProduct = {
          ...product,
          [field]: reader.result,
        };
        setProduct(updatedProduct);
        const editedProduct = {
          ...edit,
          [field]: reader.result,
        };
        setEdit(editedProduct);
      };
      reader.readAsDataURL(file);
    } else {
      const updatedProduct = { ...product, [field]: e.target.value };
      setProduct(updatedProduct);
      const editedProduct = { ...edit, [field]: e.target.value };
      setEdit(editedProduct);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      product.firstName === "" ||
      product.firstName.length > 20 ||
      product.lastName === "" ||
      product.lastName.length > 20 ||
      product.email === "" ||
      product.email.length > 20 ||
      product.phone === "" ||
      product.phone.length > 20 ||
      product.image === ""
    ) {
      setFormErrors(validate(product));
    } else {
      [...e.target].forEach((element) => {
        if (element.name === "image") {
          element.value = "";
        }
      });
      product.id = uuidv4();
      item.push(product);
      setItem([...item]);
      setOriginalItem([...item]);
      isOpenAdd(false);
      setProduct({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        image: "",
      });
      setFormErrors({});
    }
  };
  const saveEditContact = (id) => {
    const editedContact = item.find((contact) => contact.id === id);

    if (
      !editedContact.firstName === "" ||
      !editedContact.lastName === "" ||
      !editedContact.email === "" ||
      !editedContact.phone === "" ||
      !editedContact.image === ""
    ) {
      return;
    }

    const updatedItem = item.map((contact) => {
      if (contact.id === id) {
        return { ...editedContact, ...edit };
      }
      return contact;
    });
    setOriginalItem([...updatedItem]);
    setItem([...updatedItem]);
    setEdit(false);
    setOpenContactId(null);
  };

  const addToFavourite = (res) => {
    let updatedItem = item.map((i) => {
      if (i.id === res.id) {
        i.favourite = !i.favourite;
      }
      return i;
    });
    setItem([...updatedItem]);
    setOriginalItem([...updatedItem]);
    localStorage.setItem("item", JSON.stringify(updatedItem));
  };

  const handleDelete = (param) => {
    const deleteItem = item.filter((item, index) => item.id !== param.id);
    setItem([...deleteItem]);
    setOriginalItem([...deleteItem]);
    localStorage.setItem("item", JSON.stringify(deleteItem));
  };

  // filter favourite btn
  const filterFavourite = () => {
    setItem(item.filter((i) => i.favourite === true));
  };

  const allItemsHandle = () => {
    setItem(originalItem);
  };

  const closeAdd = () => {
    isOpenAdd(false);
    setProduct({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      image: "",
    });
    setFormErrors({});
  };

  // filterSearch
  const filterBySearch = () => {
    const filteredItems = originalItem.filter((item) => {
      return Object.values(item).some((value) => {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    });
    setItem(filteredItems);
  };

  // error msg
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Please enter a valid value!";
    }
    if (!values.lastName) {
      errors.lastName = "Please enter a valid value!";
    }
    if (!values.email) {
      errors.email = "Please enter a valid value!";
    }
    if (!values.phone) {
      errors.phone = "Please enter a valid value!";
    }
    if (!values.image) {
      errors.image = "Please enter a valid image format";
    }
    return errors;
  };
  useEffect(() => {
    filterBySearch();
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
  }, [item]);
  //
  return (
    <AppContext.Provider
      value={{
        formErrors,
        setFormErrors,
        item,
        setItem,
        product,
        setProduct,
        handleChange,
        handleDelete,
        handleSubmit,
        openAdd,
        isOpenAdd,
        openContactId,
        setOpenContactId,
        filterFavourite,
        allItemsHandle,
        addToFavourite,
        searchValue,
        setSearchValue,
        closeAdd,
        edit,
        setEdit,
        editingContact,
        setEditingContact,
        saveEditContact,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
