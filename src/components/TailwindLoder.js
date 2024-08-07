import React from "react";
import Loader from "./Loader";

const TailwindLoader = ({ isOpen }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative m-4  rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindLoader;
