import React from "react";
import { useApiFirebase } from "../../hooks/useApiFirebase";
import { useFavorites } from "../../components/context/FavoritesContext";
import CardContainer from "../common/CardContainer";
import SkeletonCard from "../loading/SkeletonCard";

const FirebaseCards = ({ category }) => {
  const { productos, loading, error } = useApiFirebase(category);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  const handleAddToCart = (producto) => {
    console.log("Agregado al carrito:", producto);
  };

  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (productos.length === 0 && !loading)
    return <p className="text-center mt-6">No hay productos disponibles.</p>;

  return (
    <CardContainer>
      {loading && <SkeletonCard count={4} />}

      {!loading &&
        productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[450px] w-full max-w-[250px] mx-auto relative"
          >
            {/* FAVORITOS Y CARRITO */}
            <div className="absolute top-2 right-2 flex space-x-2 z-10">
              <button
                onClick={() => toggleFavorite(producto)}
                className="text-lg bg-green-300 rounded-full p-1 shadow-md hover:scale-110 transition"
                title="Me gusta"
              >
                {isFavorite(producto.id) ? "❤️" : "🤍"}
              </button>
              <button
                onClick={() => handleAddToCart(producto)}
                className="text-lg bg-orange-300 rounded-full p-1 shadow-md hover:scale-110 transition"
                title="Agregar al carrito"
              >
                🛒
              </button>
            </div>

            {/* IMAGENES CARDS */}
            <div className="w-full h-[70%] flex items-center justify-center pt-4 bg-white">
              <img
                src={producto.ImgUrl}
                alt={producto.Nombre}
                className="max-h-full max-w-full object-cover"
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="p-3 flex-1 flex flex-col text-center md:text-start justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-800 mb-1 break-words">
                  {producto.Nombre}
                </h2>
                <p className="text-xs text-gray-600 leading-tight">
                  {producto.Descripcion}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-green-600">
                  ${producto.Precio ? producto.Precio : "Consultar"}
                </span>
                <button className="bg-pink-500 text-white px-2 py-1 rounded-md text-xs hover:bg-pink-600">
                  Ver Más
                </button>
              </div>
            </div>
          </div>
        ))}
    </CardContainer>
  );
};

export default FirebaseCards;
