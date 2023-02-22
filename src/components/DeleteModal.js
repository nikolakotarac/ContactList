import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from "react-icons/ai";

const DeleteModal = ({ isOpenDelete, deletedContact, closeDelete }) => {
  const { handleDelete } = useGlobalContext();

  return (
    <Transition appear show={isOpenDelete} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDelete}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-space">
          <div className="flex mt-36 items-center md:justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md flex flex-col gap-4 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex gap-8 items-start">
                  <button onClick={closeDelete} className="hover:text-gray-700">
                    <AiOutlineClose />
                  </button>
                  <h3 className="mb-3 text-base sm:text-xl font-semibold text-center mb-3">
                    Are you sure you want to delete this contact?
                  </h3>
                </div>

                <div className="flex ">
                  <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800  focus:outline-none  font-semibold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick={() => {
                      handleDelete(deletedContact);
                      closeDelete();
                    }}>
                    Got it, thanks!
                  </button>
                  <button
                    onClick={closeDelete}
                    className="text-gray-700 bg-white hover:bg-gray-100 focus:outline-none  rounded-lg border border-gray-700 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:z-10">
                    No, cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
