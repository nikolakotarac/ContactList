import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

const EditContact = ({ id, setShowEditContact }) => {
  const { contacts, setContacts, setAllContacts } = useGlobalContext();
  const contact = contacts.find((c) => c.id === id);
  const [image, setImage] = useState(contact.image);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: contact });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    const updatedContact = {
      ...data,
      id: contact.id,
      favourite: contact.favourite,
      image,
    };
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === contact.id ? updatedContact : c))
    );

    reset();
    setShowEditContact(false);
    console.log(updatedContact);
  };

  return (
    <div className="flex items-center  align-center  mx-10 mt-10">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white p-6 rounded">
          <div className="flex gap-10">
            <button
              onClick={() => {
                reset();
                setShowEditContact(false);
              }}>
              <AiOutlineClose />
            </button>
            <h3 className=" text-xl text-center"></h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-3">
            <div className="flex gap-3 items-center">
              {" "}
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 w-1/3"
              />
              {errors.firstName && (
                <p className="text-red-900">First name is required.</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              {" "}
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 w-1/3"
              />
              {errors.lastName && (
                <p className="text-red-900">Last Name is required.</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              {" "}
              <label>Email: </label>
              <input
                type="text"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 w-1/3"
              />
              {errors.email && (
                <p className="text-red-900">Email is required.</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              {" "}
              <label>Phone: </label>
              <input
                type="text"
                name="phone"
                {...register("phone", { required: true })}
                placeholder="First Name"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 w-1/3"
              />
              {errors.phone && (
                <p className="text-red-900">Phone is required.</p>
              )}
            </div>
            <div className="flex flex-cil items-align gap-1 text-align">
              <div className="flex flex-col gap-2 py-4">
                <img src={image} className="w-32 h-32 object-cover px-3" />
                <input type="file" name="image" onChange={handleFileChange} />
              </div>
            </div>
            <div className="flex gap-7 pt-3">
              <input
                type="submit"
                value="Save"
                className="px-10 py-2 text-md text-white bg-gray-700 rounded"
                alt="contact-img"
              />
              <button
                onClick={() => {
                  reset();
                  setShowEditContact(false);
                }}
                className="px-10 py-2 text-md text-white bg-red-700 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default EditContact;
