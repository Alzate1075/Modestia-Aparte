import React from "react";

const Spinner = ({
  size = "w-20", // Tamaño del círculo
  height = "h-screen", // Altura del contenedor
  bg = "bg-white", // Fondo del contenedor
  text = "Cargando...", // Texto debajo del spinner
  textSize = "text-3xl", // Tamaño del texto
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${height} ${bg}`}
    >
      <div
        className={`${size} aspect-square border-4 border-t-pink-500 border-gray-300 rounded-full animate-spin mb-4`}
      ></div>
      <p className={`${textSize} font-semibold text-gray-700`}>{text}</p>
    </div>
  );
};

export default Spinner;
