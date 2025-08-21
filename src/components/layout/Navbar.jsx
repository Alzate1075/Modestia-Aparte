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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contenedor adaptable: en móvil, 2 filas; en desktop, 1 fila */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between py-3">
            {/* FILA 1 (siempre visible): Logo + Nombre */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/LogosMA/LogoMA2.2.png"
                alt="Logo MA"
                className="h-12 md:h-14"
              />
              <h1 className="text-2xl md:text-4xl font-serif text-white whitespace-nowrap">
                Modestia Aparte
              </h1>
            </Link>

            {/* FILA 2 en móvil: izquierda Login/Usuario, derecha íconos */}
            <div className="flex items-center justify-around md:justify-end">
              {/* Izquierda: Login o saludo */}
              <div className="mr-2">
                {!user ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                  >
                    Log In
                  </button>
                ) : (
                  <span className="text-white px-2 py-2">
                    Hola,{" "}
                    {user.displayName ||
                      `${user.name || ""} ${user.lastName || ""}`}
                  </span>
                )}
              </div>

              {/* Derecha: Favoritos, Carrito y Menú */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenFavorites}
                  className="hover:bg-pink-600 p-2 rounded transition-colors"
                  aria-label="Favoritos"
                >
                  <Heart className="h-6 w-6 text-white" />
                </button>

                <button
                  onClick={() => navigate("/carrito")}
                  className="hover:bg-pink-600 p-2 rounded transition-colors"
                  aria-label="Carrito"
                >
                  <ShoppingCart className="h-6 w-6 text-white" />
                </button>

                <MenuBurguer />
              </div>
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
