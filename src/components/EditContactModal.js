import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";

const EditContactModal = ({ id }) => {
  const { item, openContactId, edit, setEdit, handleChange, saveEditContact } =
    useGlobalContext();

  if (id !== openContactId) {
    return null;
  }

  const selectedContact = item.find((contact) => contact.id === id);
  return (
    <div
      className={`flex items-center  align-center  mx-10 mt-10  ${
        edit ? "" : "invisible"
      }`}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white p-6 rounded">
          <div className="flex gap-10">
            <button onClick={() => setEdit(false)}>
              <AiOutlineClose />
            </button>
            <h3 className=" text-xl text-center">
              {selectedContact.firstName} {selectedContact.lastName}
            </h3>
          </div>
          <div className="flex flex flex-col gap-2 py-4">
            <img
              src={selectedContact.image}
              alt={selectedContact.firstName}
              className="w-32 h-32 object-cover px-3"
            />
            <input
              name="image"
              type="file"
              onChange={(e) => handleChange(e, "image")}
              placeholder="image"
            />
          </div>
          <div>
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <h1>First Name: </h1>
                <input
                  className="bg-grey-50 border border-gray-700 rounded-md p-1 w-1/3"
                  type="text"
                  placeholder="First name"
                  defaultValue={selectedContact.firstName}
                  onChange={(e) => handleChange(e, "firstName", id)}
                />
              </div>
              <div className="flex gap-3 items-center">
                <h2>Last Name: </h2>
                <input
                  className="bg-grey-50 border border-gray-700 rounded-md p-1 w-1/3"
                  type="text"
                  placeholder="Last name"
                  defaultValue={selectedContact.lastName}
                  onChange={(e) => handleChange(e, "lastName", id)}
                />
              </div>
              <div className="flex gap-3 items-center">
                <h3>Email: </h3>

                <input
                  className="bg-grey-50 border border-gray-700 rounded-md p-1 w-1/3"
                  type="email"
                  placeholder="Email"
                  defaultValue={selectedContact.email}
                  onChange={(e) => handleChange(e, "email", id)}
                />
              </div>
              <div className="flex gap-3 items-center">
                <h1>Phone: </h1>
                <input
                  className="bg-grey-50 border border-gray-700 rounded-md p-1 w-1/3"
                  type="tel"
                  placeholder="Phone"
                  defaultValue={selectedContact.phone}
                  onChange={(e) => handleChange(e, "phone", id)}
                />
              </div>
              <div className="flex gap-5 mt-3">
                <button
                  onClick={() => {
                    saveEditContact(id);
                  }}
                  className="px-10 py-2 text-md text-white bg-gray-700 rounded">
                  Save
                </button>
                <button
                  className="px-10 py-2 text-md text-white bg-red-700 rounded"
                  onClick={() => setEdit(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default EditContactModal;
