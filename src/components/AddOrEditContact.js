import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "@headlessui/react";

const AddOrEditContact = ({ mode, initialValues = {}, contactId }) => {
  const {
    setContacts,
    contacts,
    allContacts,
    setAllContacts,
    showAddOrEditContact,
    setShowAddOrEditContact,
  } = useGlobalContext();

  const contact = contacts.find((c) => c.id === contactId);

  let completeButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues: mode === "add" ? initialValues : contact });

  const [image, setImage] = useState(
    mode === "add" ? initialValues.image : contact.image
  );

  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
    }
  }, [initialValues, setValue]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    if (mode === "add") {
      const newContact = {
        id: uuidv4(),
        image: image,
        favourite: false,
        ...data,
      };
      setContacts([...contacts, newContact]);
      setAllContacts([...allContacts, newContact]);
    }

    if (mode === "edit") {
      const updatedContact = {
        ...data,
        id: contact.id,
        favourite: contact.favourite,
        image,
      };
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c.id === contact.id ? updatedContact : c))
      );
      setAllContacts((prevAllContacts) =>
        prevAllContacts.map((c) => (c.id === contact.id ? updatedContact : c))
      );
    }
    setShowAddOrEditContact(false);
    reset();
  };

  const closeAddAndReset = () => {
    setShowAddOrEditContact(false);
    reset();
  };
  return (
    <Dialog
      initialFocus={completeButtonRef}
      ref={completeButtonRef}
      open={showAddOrEditContact}
      onClose={() => setShowAddOrEditContact(false)}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <Dialog.Panel className="bg-white p-6 rounded">
          <div className="flex gap-20">
            <button onClick={closeAddAndReset}>
              <AiOutlineClose />
            </button>

            <Dialog.Title as="h3" className="uppercase text-2xl text-center">
              {mode === "edit" ? "Edit Contact" : "Add Contact"}
            </Dialog.Title>
          </div>
          <form
            tabIndex={-1}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3">
            <div className="flex flex-col items-align gap-1 text-align">
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-900">First name is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-900">Last name is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-900">Email is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Phone: </label>
              <input
                tabIndex={-1}
                type="text"
                name="phone"
                {...register("phone", { required: true })}
                placeholder="Phone"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
              {errors.lastName && (
                <p className="text-red-900">Phone number is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Image:</label>
              <input type="file" name="image" onChange={handleFileChange} />
              <img
                src={
                  image !== undefined
                    ? image
                    : ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                }
                className=" w-20"
              />
            </div>
            <div className="flex gap-7 pt-3">
              <button
                className="px-10 py-2 text-md text-white bg-gray-700 rounded"
                type="submit"
                ref={completeButtonRef}>
                {mode === "edit" ? "Save" : "Submit"}
              </button>
              <button
                className="px-10 py-2 text-md text-white bg-red-700 rounded"
                onClick={closeAddAndReset}>
                Close
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Dialog>
  );
};

export default AddOrEditContact;
