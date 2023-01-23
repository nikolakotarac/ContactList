import React from "react";
import { useGlobalContext } from "../context";
import EditContactModal from "./EditContactModal";
const SingleContact = ({ id }) => {
  const { item, openContactId, setEdit } = useGlobalContext();

  if (id !== openContactId) {
    return null;
  }

  const selectedContact = item.find((contact) => contact.id === id);

  return (
    <div>
      <div className="pl-11">
        <img
          src={selectedContact.image}
          alt={selectedContact.firstName}
          className="w-20 h-20 object-cover mt-3"
        />
        <h1>First Name: {selectedContact.firstName}</h1>
        <h1>Last Name: {selectedContact.lastName}</h1>
        <h1>Email: {selectedContact.email}</h1>
        <h1>Phone: {selectedContact.phone}</h1>

        <button
          onClick={() => setEdit(true)}
          className="px-10 py-2 text-md text-white bg-gray-700 my-2 rounded">
          Edit
        </button>
      </div>
      <EditContactModal id={id} />
    </div>
  );
};

export default SingleContact;
