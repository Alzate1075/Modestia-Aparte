import React, { useState } from "react";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/pages/Gallery";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import FavoriteProducts from "./components/pages/FavoriteProducts";
import MyToastContainer from "./components/common/MyToastContainer";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCart from "./components/pages/ShoppingCart";
import AdminUsers from "./components/pages/AdminUsers";
import AdminProducts from "./components/pages/AdminProducts";
import Contacts from "./components/pages/Contacts";
import PrivateRoute from "./components/context/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import { FavoritesProvider } from "./components/context/FavoritesContext";

function App() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const closeFavorites = () => setIsFavoritesOpen(false);

  return (
    <FavoritesProvider>
      <Navbar openFavorites={() => setIsFavoritesOpen(true)} />

      {/* Modal de favoritos */}
      {isFavoritesOpen && <FavoriteProducts onClose={closeFavorites} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        {/* Puedes dejar la ruta /favoritos para compatibilidad, pero ahora el modal se abre desde Navbar */}
        <Route
          path="/favoritos"
          element={
            <PrivateRoute>
              <FavoriteProducts onClose={() => setIsFavoritesOpen(false)} />
            </PrivateRoute>
          }
        />
        <Route
          path="/carrito"
          element={
            <PrivateRoute>
              <ShoppingCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/contactanos"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminProducts />
            </PrivateRoute>
          }
        />
      </Routes>

      <MyToastContainer />
    </FavoritesProvider>
  );
}

export default App;
