import React, { useState } from "react";
import EditContact from "../EditContact";
import { useGlobalContext } from "../context";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import {
  MdOutlinePersonAdd,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

const ContactList = () => {
  const {
    contacts,
    openAdd,
    isOpenAdd,
    handleDelete,
    addToFavourite,
    filterFavourite,
    allItemsHandle,
  } = useGlobalContext();

  const [showEditContact, setShowEditContact] = useState(false);
  const [contactId, setContactId] = useState("");

  const handleEdit = (id) => {
    setShowEditContact(true);
    setContactId(id);
  };

  const [showInfo, setShowInfo] = useState({});

  return (
    <div className="flex flex-col justify-between max-w-[500px]  align-center h-auto mx-10  px-14 justify-between bg-gray-300">
      <div className="flex gap-2 pt-3">
        <button
          onClick={allItemsHandle}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
          All Contacts
        </button>

        <button
          onClick={filterFavourite}
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
          Favourites
        </button>
      </div>
      {contacts && contacts.length > 0 ? (
        contacts.map((res, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="mt-6 items-center align-center flex gap-2">
                <div>
                  <button
                    className="cursor-pointer text-xl  px-2  rounded"
                    onClick={() => addToFavourite(res)}>
                    {res.favourite === true ? (
                      <AiFillStar className="text-yellow-500 " />
                    ) : (
                      <AiOutlineStar />
                    )}
                  </button>
                </div>
                <div className="flex space-x-4 text-center items-center">
                  <img
                    src={
                      res.image === null
                        ? ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                        : res.image
                    }
                    alt={res.firstName}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <p className="text-sm cursor-pointer ">
                    {res.firstName} {res.lastName}
                  </p>
                  <button
                    className="text-sm"
                    onClick={() =>
                      setShowInfo({ ...showInfo, [index]: !showInfo[index] })
                    }>
                    {showInfo[index] ? (
                      <div className="flex items-center">
                        <span className="text-sm">Show Less</span>
                        <MdKeyboardArrowRight />
                      </div>
                    ) : (
                      <div className="flex  items-center">
                        <span className="text-sm">More Info</span>
                        <MdKeyboardArrowDown />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(res)}
                    className=" bg-transparent border-transparent cursor-pointer text-red-500 text-l  text-white rounded ">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className={`pl-11 ${showInfo[index] ? "" : "hidden"}`}>
                <img
                  src={
                    res.image === null
                      ? ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                      : res.image
                  }
                  alt={res.firstName}
                  className="w-20 h-20 object-cover mt-3"
                />
                <h1>First Name: {res.firstName}</h1>
                <h1>Last Name: {res.lastName}</h1>
                <h1>Email: {res.email}</h1>
                <h1>Phone: {res.phone}</h1>
                <button
                  onClick={() => handleEdit(res.id)}
                  className="px-10 py-2 text-md text-white bg-gray-700 my-2 rounded">
                  Edit
                </button>

                {showEditContact && (
                  <EditContact
                    id={contactId}
                    setShowEditContact={setShowEditContact}
                  />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="bg-white justify-between max-w-[500px] align-center h-auto flex items-center px-14 my-7 justify-between bg-gray-300">
          <h2 className="text-l bg-gray-300 ">
            This section is curently empty
          </h2>
        </div>
      )}
      <div>
        <button
          className="px-5 py-3 text-l font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
          onClick={() => isOpenAdd(!openAdd)}>
          Add Contact
          <MdOutlinePersonAdd className="text-l " />
        </button>
      </div>
    </div>
  );
};

export default ContactList;
