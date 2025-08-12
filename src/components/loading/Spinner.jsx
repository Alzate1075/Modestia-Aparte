import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-20 aspect-square border-4 border-t-pink-500 border-gray-300 rounded-full animate-spin mb-4"></div>
      <p className="text-3xl font-semibold text-gray-700">Modestia Aparte</p>
    </div>
  );
};

export default Spinner;
