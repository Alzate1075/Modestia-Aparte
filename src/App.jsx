import React, { useState } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FavoriteProducts from "./pages/FavoriteProducts";
import MyToastContainer from "./components/common/MyToastContainer";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCart from "./pages/ShoppingCart";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import Contacts from "./pages/Contacts";
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
