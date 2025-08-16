import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../context/FavoritesContext";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import FavoriteProducts from "../../pages/FavoriteProducts"; // Asegúrate que esté correcto
import MenuBurguer from "./MenuBurguer";

export default function Navbar() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false);

  const handleOpenFavorites = () => {
    if (!favorites || favorites.length === 0) {
      toast.warning("No tienes favoritos seleccionados");
      return;
    }
    setOpenFavoritesModal(true);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-black border-b z-50 shadow-xl">
        <div className="mx-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-6">
              <img
                src="/LogosMA/LogoMA2.2.png"
                alt="Logo MA"
                className="h-16"
              />
              <h1 className="text-4xl font-serif text-white">
                Modestia Aparte
              </h1>
            </Link>

            <div className="flex items-center space-x-4">
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                >
                  Log In
                </button>
              ) : (
                <span className="text-white px-4 py-2">
                  Hola,{" "}
                  {user.displayName ||
                    `${user.name || ""} ${user.lastName || ""}`}
                </span>
              )}

              <button
                onClick={handleOpenFavorites}
                className="hover:bg-pink-600 p-2 rounded transition-colors"
              >
                <Heart className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={() => navigate("/carrito")}
                className="hover:bg-pink-600 p-2 rounded transition-colors"
              >
                <ShoppingCart className="h-6 w-6 text-white" />
              </button>

              <MenuBurguer />
            </div>
          </div>
        </div>
      </nav>

      {openFavoritesModal && (
        <FavoriteProducts onClose={() => setOpenFavoritesModal(false)} />
      )}
    </>
  );
}
