import React from "react";
import { useGlobalContext } from "../context";

export const Navbar = () => {
  const { searchValue, setSearchValue } = useGlobalContext();

  return (
    <div className="relative">
      <div className="flex ">
        <input
          className="bg-white shadow-lg rounded-lg text-left pl-16 p-5 outline-none text-gray-700 font-nomral text-base sm:text-xl w-full"
          type="text"
          name="name"
          id="name"
          placeholder="Search Your Contact..."
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 absolute bottom-30 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
