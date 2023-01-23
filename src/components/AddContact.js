import React from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";

const AddContact = () => {
  const { formErrors, product, handleChange, handleSubmit, openAdd, closeAdd } =
    useGlobalContext();

  return (
    <div
      className={`flex items-center  align-center  mx-10  ${
        openAdd ? "" : "invisible"
      }`}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white p-6 rounded">
          <div className="flex gap-20">
            <button onClick={closeAdd}>
              <AiOutlineClose />
            </button>
            <h1 className="uppercase text-2xl text-center">add contact</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <br />
            <label className="block">First Name</label>
            <input
              name="firstName"
              value={product.firstName}
              onChange={(e) => handleChange(e, "firstName")}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="First Name"
            />
            <p className="text-red-900">{formErrors.firstName}</p>
            <br />
            <label className="block">Last Name</label>
            <input
              name="lastName"
              value={product.lastName}
              onChange={(e) => handleChange(e, "lastName")}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Last Name"
            />
            <p className="text-red-900">{formErrors.lastName}</p>
            <br />
            <label className="block">Email</label>
            <input
              name="email"
              value={product.email}
              onChange={(e) => handleChange(e, "email")}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email"
            />
            <p className="text-red-900">{formErrors.email}</p>
            <br />
            <label className="block">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={product.phone}
              onChange={(e) => handleChange(e, "phone")}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Contact Number"
            />
            <p className="text-red-900">{formErrors.phone}</p>
            <br />
            <input
              name="image"
              type="file"
              onChange={(e) => handleChange(e, "image")}
              placeholder="image"
            />
            <p className="text-red-900">{formErrors.image}</p>
            <div className="flex gap-7 pt-3">
              <button
                className="px-10 py-2 text-md text-white bg-gray-700 rounded"
                type="submit">
                Submit
              </button>
              <button
                className="px-10 py-2 text-md text-white bg-red-700 rounded"
                onClick={closeAdd}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddContact;
