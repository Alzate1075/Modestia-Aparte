import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import MenuBurguer from "./MenuBurguer";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProtectedRoute = (ruta) => {
    if (user) {
      navigate(ruta);
    } else {
      toast.warning("Debes iniciar sesión para acceder a esta función.");
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b z-50 shadow-xl">
      <div className="mx-8">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 gap-6">
            <img src="/LogosMA/LogoMA2.2.png" alt="Logo MA" className="h-16" />
            <h1 className="text-4xl font-serif text-white">Modestia Aparte</h1>
          </Link>

          {/* ICONOS */}
          <div className="relative flex items-center space-x-4">
            {/* BOTÓN LOGIN / NOMBRE */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer text-white px-4 py-2 text-lg rounded hover:bg-pink-600 transition-colors duration-200"
              >
                Log In
              </button>
            ) : (
              <span className="text-white px-4 py-2 text-lg">
                Hola,{" "}
                {user.displayName ||
                  (user.name && user.lastName
                    ? `${user.name} ${user.lastName}`
                    : user.email)}
              </span>
            )}

            {/* BOTÓN LIKE */}
            <button
              onClick={() => handleProtectedRoute("/favoritos")}
              className="cursor-pointer hover:bg-pink-600 p-2 rounded transition-colors duration-200"
            >
              <Heart className="h-6 w-6 text-white" />
            </button>

            {/* CARRITO */}
            <button
              onClick={() => handleProtectedRoute("/carrito")}
              className="cursor-pointer hover:bg-pink-600 p-2 rounded transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
            </button>

            {/* MENÚ HAMBURGUESA */}
            <MenuBurguer />
          </div>
        </div>
      </div>
    </nav>
  );
}
