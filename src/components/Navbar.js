import React, { useRef } from "react";
import { useGlobalContext } from "../context";

export const Navbar = () => {
  const { setSearchValue, filterBySearch } = useGlobalContext();

  const searchRef = useRef(null);
  return (
    <div className="flex justify-between max-w-[500px]  align-center h-auto mx-10  text-align px-10 py-5 bg-teal-600">
      <div>
        <a href="/" className="text-2xl text-teal-200 ">
          Contact List
        </a>
      </div>
      <section>
        <form>
          <div className="flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
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
            <input
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              type="text"
              name="name"
              id="name"
              placeholder="Search"
              ref={searchRef}
              onChange={(e) => {
                setSearchValue(searchRef.current.value);
                filterBySearch();
              }}
            />
          </div>
        </form>
      </section>
    </div>
  );
};
