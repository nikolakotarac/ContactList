import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import AddOrEditContact from "./AddOrEditContact";
import { MdOutlinePersonAdd } from "react-icons/md";

const ContactList = () => {
  const {
    contacts,
    handleDelete,
    addToFavourite,
    filterFavourite,
    allItemsHandle,
    handleEdit,
    handleAdd,
    showAddOrEditContact,
    mode,
    editContactId,
  } = useGlobalContext();

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg  mt-4">
      <header className="px-10 py-4 border-b border-gray-300  flex text-align items-center justify-between	">
        <h2 className="font-semibold text-xl text-gray-800">Contacts</h2>
        <div className="flex gap-4 ">
          <button
            onClick={allItemsHandle}
            className="text-xs bg-gray-900 font-semibold rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            All Contacts
          </button>
          <button
            onClick={filterFavourite}
            className="text-xs border text-gray-800  font-semibold hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Favourites
          </button>
        </div>
        <button
          className="text-xs bg-blue-700 rounded-lg hover:bg-blue-800 font-semibold  rounded-lg hover:bg-blue-800 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
          onClick={handleAdd}>
          Add Contact
          <MdOutlinePersonAdd className="text-l " />
        </button>
      </header>
      <table className="w-full border-collapse text-left  text-gray-500">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-4  text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-l  text-gray-900">
              Favourite
            </th>
            <th scope="col" className="px-6 py-4  text-gray-900">
              Phone Number
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        {contacts && contacts.length > 0 ? (
          contacts.map((res) => {
            return (
              <tbody
                className=" divide-y divide-gray-100 border-b border-gray-300 "
                key={res.id}>
                <tr className="border-b border-gray-300 ">
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        src={
                          res.image === undefined
                            ? ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                            : res.image
                        }
                        alt={res.firstName}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 ">
                        {res.firstName} {res.lastName}
                      </div>
                      <div className="text-gray-500">{res.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <button
                        className="cursor-pointer text-xl  text-gray-800 px-2 rounded"
                        onClick={() => addToFavourite(res)}>
                        {res.favourite === true ? (
                          <AiFillStar className="text-yellow-500 " />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-800">{res.phone}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button onClick={() => handleDelete(res)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-800"
                          x-tooltip="tooltip">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(res.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-800"
                          x-tooltip="tooltip">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <div className=" justify-between  align-center h-auto flex items-center px-14 my-7 justify-between ">
            <h2 className="text-3xl font-semibold text-gray-800">
              This section is curently empty
            </h2>
          </div>
        )}
        <div className="m-5">
          {showAddOrEditContact &&
            editContactId !== null &&
            mode === "edit" && (
              <AddOrEditContact mode={mode} contactId={editContactId} />
            )}
          {showAddOrEditContact && mode === "add" && (
            <AddOrEditContact mode={mode} />
          )}
        </div>
      </table>
    </div>
  );
};

export default ContactList;
