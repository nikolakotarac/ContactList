import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddContact = () => {
  const { closeAdd, setContacts, contacts, openAdd, setAllContacts } =
    useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [image, setImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const onSubmit = (data) => {
    const newContact = {
      id: uuidv4(),
      image: image,
      favourite: false,
      ...data,
    };
    setContacts([...contacts, newContact]);
    setAllContacts([...contacts, newContact]);
    closeAdd();
    reset();
    console.log(image);
    console.log(newContact);
  };
  const closeAddAndReset = () => {
    closeAdd();
    reset();
  };

  return (
    <div
      className={`flex items-center  align-center  mx-10  ${
        openAdd ? "" : "invisible"
      }`}>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white p-6 rounded">
          <div className="flex gap-20">
            <button onClick={closeAddAndReset}>
              <AiOutlineClose />
            </button>
            <h1 className="uppercase text-2xl text-center">add contact</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3">
            <div className="flex flex-col items-align gap-1 text-align">
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-900">First name is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-900">Last name is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-900">Email is required.</p>
              )}
            </div>
            <div className="flex flex-col items-align gap-1 text-align">
              <label>Phone: </label>
              <input
                type="text"
                name="phone"
                {...register("phone", { required: true })}
                placeholder="Phone"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              />
              {errors.lastName && (
                <p className="text-red-900">Phone number is required.</p>
              )}
            </div>
            <div className="flex flex-cil items-align gap-1 text-align">
              <label>Image:</label>
              <input type="file" name="image" onChange={handleFileChange} />
            </div>
            <div className="flex gap-7 pt-3">
              <button
                className="px-10 py-2 text-md text-white bg-gray-700 rounded"
                type="submit">
                Submit
              </button>
              <button
                className="px-10 py-2 text-md text-white bg-red-700 rounded"
                onClick={closeAddAndReset}>
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
