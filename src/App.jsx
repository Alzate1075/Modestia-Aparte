import React from "react";
import Home from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import Gallery from "./components/pages/Gallery";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Favorites from "./components/pages/FavoriteProducts";
import MyToastContainer from "./components/common/MyToastContainer";
import "react-toastify/dist/ReactToastify.css";
import ShoppingCart from "./components/pages/ShoppingCart";
import AdminUsers from "./components/pages/AdminUsers";
import AdminProducts from "./components/pages/AdminProducts";
import Contacts from "./components/pages/Contacts";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="/contactanos" element={<Contacts />} />
        <Route path="/admin/usuarios" element={<AdminUsers />} />
        <Route path="/admin/productos" element={<AdminProducts />} />
      </Routes>
      <MyToastContainer />
    </div>
  );
}

export default App;
