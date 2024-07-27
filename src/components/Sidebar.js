import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state?.data);
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50  bg-white">
          <div className="w-full p-4">
            <div className="flex flex-col">
              <div>
                <h1 className="text-3xl font-bold">Watchlists</h1>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-2 w-full p-2 rounded-md"
                  />
                </div>
                <div className="mt-4 rounded-md flex bg-red-500 w-full items-center pl-2 hover:cursor-pointer">
                  <IoHomeOutline size={20} color="white" />
                  <p className=" text-white p-2">Home</p>
                </div>

                <div className="mt-4">
                  <h1 className="w-full text-xl font-bold p-2">My Lists</h1>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center w-full rounded-full border-2 border-black items-center hover:cursor-pointer">
              <PiUserCircleThin size={40} />
              <div>
                <p >{!user ? "GUEST" : `${user?.name}`}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
