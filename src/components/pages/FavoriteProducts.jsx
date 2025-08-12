import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Heart } from "lucide-react";

const FavoriteProducts = ({ onClose }) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-300 flex justify-center items-center mt-20">
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
            Mis Favoritos
          </h2>

          {favorites.length === 0 ? (
            <p className="text-center text-md text-gray-500 font-semibold">
              No tienes productos favoritos aún.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{product.title}</h4>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                  <button onClick={() => toggleFavorite(product)}>
                    <Heart fill="red" className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteProducts;
