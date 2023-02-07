import React, { useRef } from "react";
import { useGlobalContext } from "../context";

export const Navbar = () => {
  const { setSearchValue, filterBySearch } = useGlobalContext();

  const searchRef = useRef(null);

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchValue(searchRef.current.value);
        filterBySearch();
      }}>
      <div className="flex ">
        <input
          className="bg-white shadow-lg rounded-lg text-left pl-10 p-5 outline-none text-gray-700 font-nomral text-xl w-full"
          type="text"
          name="name"
          id="name"
          placeholder="Search Your Contact..."
          ref={searchRef}
          onChange={(e) => {
            setSearchValue(searchRef.current.value);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 absolute bottom-30 left-1"
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
    </form>
  );
};
