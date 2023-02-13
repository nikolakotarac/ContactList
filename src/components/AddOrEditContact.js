import React, { useState, useRef, useMemo } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const AddOrEditContact = ({ initialValues }) => {

  const {
    addContact,
    editContact,
    showAddOrEditContact,
    setShowAddOrEditContact,
  } = useGlobalContext();

  const navigate = useNavigate();

  let completeButtonRef = useRef(null);

  const mode = useMemo(() => initialValues ? 'edit': 'add', [initialValues] );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const [errorImageMessage, setErrorImageMessage] = useState(null);

  const [image, setImage] = useState(initialValues?.image);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.size > 1000000) {
      setErrorImageMessage(
        "File size is too large. Please choose a smaller file."
      );
      return;
    }
    setErrorImageMessage(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    if (mode === "add") {
      addContact(data, image);

    }

    if (mode === "edit") {
      editContact(data, image);
    }

    closeAddAndReset();
  };

  const closeAddAndReset = () => {
    setShowAddOrEditContact(false);
    reset();
    navigate("/");
  };
  return (
    <Dialog
      initialFocus={completeButtonRef}
      ref={completeButtonRef}
      open={showAddOrEditContact}
      onClose={() => {
        setShowAddOrEditContact(false);
        navigate("/");
      }}>
      <div className="fixed inset-0 z-50 h-screen  font-space outline-none focus:outline-none">
        <div className="h-80 w-96 mx-auto bg-white rounded shadow">
          <Dialog.Panel className="bg-white p-6 rounded mt-5">
            <div className="flex gap-20 items-start ">
              <button onClick={closeAddAndReset}>
                <AiOutlineClose />
              </button>
              <Dialog.Title as="h3" className="uppercase text-2xl text-center">
                {mode === "edit" ? "Edit Contact" : "Add Contact"}
              </Dialog.Title>
            </div>
            <form
              tabIndex={-1}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 mt-4 ">
              <div className="flex flex-col items-align gap-1 text-align">
                {/* <label className="block text-grey-darker text-sm font-bold mb-2">
                  First Name:
                </label> */}
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                />
                {errors.firstName && (
                  <p className="text-red-900">First name is required.</p>
                )}
              </div>
              <div className="flex flex-col items-align gap-1 text-align">
                <input
                  type="text"
                  name="lastName"
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-900">Last name is required.</p>
                )}
              </div>
              <div className="flex flex-col items-align gap-1 text-align">
                <input
                  type="text"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                />
                {errors.email && (
                  <p className="text-red-900">Email is required.</p>
                )}
              </div>
              <div className="flex flex-col items-align gap-1 text-align">
                <input
                  tabIndex={-1}
                  type="text"
                  name="phone"
                  {...register("phone", { required: true })}
                  placeholder="Phone"
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                />
                {errors.phone && (
                  <p className="text-red-900">Phone number is required.</p>
                )}
              </div>
              <div className="flex flex-col items-align gap-1 text-align">
                <img
                  src={
                    image !== undefined
                      ? image
                      : ` https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                  }
                  className=" w-20"
                  alt="img"
                />
                <div className="flex gap-3 items-baseline text-center mt-2">
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <p className="text-red-900">{errorImageMessage}</p>
              </div>
              <div className="flex gap-7 pt-3">
                <button
                  className="px-10 py-2 text-md text-white  bg-indigo-800 hover:bg-indigo-700 rounded"
                  type="submit"
                  ref={completeButtonRef}>
                  {mode === "edit" ? "Save" : "Submit"}
                </button>
                <button
                  className="px-10 py-2 text-md text-white bg-red-600 hover:bg-red-800 rounded"
                  onClick={closeAddAndReset}>
                  Close
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Dialog>
  );
};

export default AddOrEditContact;
