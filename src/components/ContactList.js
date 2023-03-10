import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import AddOrEditContact from "./AddOrEditContact";
import { MdOutlinePersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const {
    addToFavourite,
    handleEdit,
    handleAdd,
    showAddOrEditContact,
    mode,
    editingContact,
    toFavourite,
    setToFavourite,
    filteredContacts,
    addContact,
    editContact,
  } = useGlobalContext();

  const navigate = useNavigate();

  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [deletedContact, setDeletedContact] = useState(null);
  function closeDelete() {
    setIsOpenDelete(false);
  }

  function openDelete(contact) {
    setIsOpenDelete(true);
    setDeletedContact(contact);
  }

  return (
    <section className="flex flex-col bg-white shadow-lg rounded-lg mt-4 ">
      <header className="flex flex-col sm:flex-row px-4 py-2 gap-3 text-center items-center justify-around ">
        <h2 className="hidden font-semibold text-xl md:block text-gray-800">
          Contacts
        </h2>
        <div className="flex flex-col sm:flex-row  gap-2 sm:gap-4 ">
          <button
            onClick={() => setToFavourite(false)}
            className={`text-xs ${
              toFavourite === false
                ? "bg-gray-900 hover:bg-gray-700 text-white"
                : "border border-gray-700 hover:bg-gray-100 text-gray-800"
            }  font-semibold rounded-lg   px-4 py-2.5 `}>
            All Contacts
          </button>
          <button
            onClick={() => setToFavourite(true)}
            className={`text-xs ${
              toFavourite === true
                ? "bg-gray-900 hover:bg-gray-700 text-white"
                : "border border-gray-700 hover:bg-gray-100 text-gray-800"
            }  font-semibold rounded-lg  text-white px-4 py-2.5 `}>
            Favourites
          </button>
        </div>
        <button
          className="flex gap-2 text-xs bg-blue-700 rounded-lg hover:bg-blue-800 font-semibold  rounded-lg hover:bg-blue-800 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
          onClick={() => {
            navigate("/addContact");
            handleAdd();
          }}>
          <MdOutlinePersonAdd className="text-lg items-center " />
          Add Contact
        </button>
      </header>
      <table className=" text-left  text-gray-500">
        <thead>
          <tr className="hidden  text-sm md:text-base md:flex px-6 py-4 ">
            <th scope="col" className="md:basis-5/12  text-gray-900">
              Name
            </th>
            <th scope="col" className=" md:basis-3/12  text-gray-900">
              Favourite
            </th>
            <th scope="col" className="  md:basis-3/12 pl-5 text-gray-900">
              Phone Number
            </th>
            <th scope="col" className="  md:basis-1/12  text-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts.map((res) => {
              return (
                <tr
                  className="px-2 sm:px-4 py-4 border-t items-center border-gray-300 items-center grid grid-cols-3 gap-1 sm:gap-2 text-center  md:flex"
                  key={res.id}>
                  <td className="flex gap-3 col-span-2 w-10 h-10 sm:w-16 sm:h-16  font-normal items-center text-gray-900 md:basis-5/12">
                    <img
                      src={
                        res.image === undefined
                          ? ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                          : res.image
                      }
                      alt={res.firstName}
                      className="w-10 h-10 sm:w-16 sm:h-16  object-cover rounded-full max-w-none"
                    />

                    <div>
                      <div className="font-semibold text-sm sm:text-base text-gray-800 text-left">
                        {res.firstName} {res.lastName}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-base ">
                        {res.email}
                      </div>
                    </div>
                  </td>
                  <td className=" md:basis-1/12 pl-5 pb-4 md:pl-0 md:pb-6 lg:0 ">
                    <div>
                      <button
                        className="cursor-pointer  text-xl  text-gray-800 px-2 rounded"
                        onClick={() => addToFavourite(res)}>
                        {res.favourite === true ? (
                          <AiFillStar className="text-yellow-500 " />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="flex  justify-center md:justify-end pl-16 md:pl-0 gap-2 sm:pl-0  col-span-2 sm:py-2 md:px-0 md:py-0 md:pl-0 text-base text-gray-800 md:basis-4/12 ">
                    <p className="text-base md:hidden">Number: </p>
                    <h4 className="text-base lg:pr-10">{res.phone}</h4>
                  </td>
                  <td className="col-span-2 md-basis-2/12  ">
                    <div className="flex gap-8 justify-center md:gap-3 lg:pl-10 md:pl-0">
                      <button onClick={() => openDelete(res)}>
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
                      <button
                        onClick={() => {
                          handleEdit(res.id);
                          navigate(`contact/${res.id}`);
                        }}>
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
              );
            })
          ) : (
            <tr>
              <th className="flex  items-center text-center m-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  This List is Curently Empty
                </h2>
              </th>
            </tr>
          )}
        </tbody>
      </table>
      {isOpenDelete && (
        <DeleteModal
          isOpenDelete={isOpenDelete}
          closeDelete={closeDelete}
          openDelete={openDelete}
          deletedContact={deletedContact}
        />
      )}

      {showAddOrEditContact && mode === "edit" && (
        <AddOrEditContact
          initialValues={editingContact}
          onSubmit={editContact}
        />
      )}
      {showAddOrEditContact && mode === "add" && (
        <AddOrEditContact onSubmit={addContact} />
      )}
    </section>
  );
};

export default ContactList;
