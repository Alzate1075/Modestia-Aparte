import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../type/firebase/firebaseConfig";

export default function MenuBurguer() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.info("Sesión cerrada");
    navigate("/");
  };

  const toggleMenu = () => setOpen(!open);

  // DETECTAR CLICK AFUERA
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-white p-2 rounded hover:bg-pink-600 cursor-pointer"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 text-white rounded shadow-2xl z-50">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-pink-600"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/galeria"
            className="block px-4 py-2 hover:bg-pink-600"
            onClick={() => setOpen(false)}
          >
            Galería
          </Link>
          <Link
            to="/contactanos"
            className="block px-4 py-2 hover:bg-pink-600"
            onClick={() => setOpen(false)}
          >
            Contáctanos
          </Link>

          {/* SOLO ADMIN */}
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/usuarios"
                className="block px-4 py-2 hover:bg-pink-600"
                onClick={() => setOpen(false)}
              >
                Usuarios
              </Link>
              <Link
                to="/admin/productos"
                className="block px-4 py-2 hover:bg-pink-600"
                onClick={() => setOpen(false)}
              >
                Productos
              </Link>
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-pink-600"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
