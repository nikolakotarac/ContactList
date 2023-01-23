import React from "react";
import SingleContact from "./SingleContact";
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
    item,
    handleDelete,
    openAdd,
    isOpenAdd,
    openContactId,
    setOpenContactId,
    filterFavourite,
    allItemsHandle,
    addToFavourite,
  } = useGlobalContext();

  return (
    <div className="flex flex-col justify-between max-w-[500px]  align-center h-auto mx-10  px-14 justify-between bg-gray-300">
      <div className="flex gap-2 pt-3">
        <button
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={allItemsHandle}>
          All Contacts
        </button>
        <button
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
          onClick={filterFavourite}>
          Favourites
        </button>
      </div>
      {item && item.length > 0 ? (
        item.map((res, index) => {
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
                <div
                  className="flex space-x-4 text-center items-center"
                  onClick={() => {
                    if (openContactId === res.id) {
                      setOpenContactId(null);
                    } else {
                      setOpenContactId(res.id);
                    }
                  }}>
                  <img
                    src={res.image}
                    alt={res.firstName}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <p className="text-sm cursor-pointer ">
                    {res.firstName} {res.lastName}
                  </p>
                  <button className="text-sm">
                    {openContactId === res.id ? (
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
              {openContactId === res.id && <SingleContact id={res.id} />}
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
