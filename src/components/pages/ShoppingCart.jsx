import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { CartProvider } from "../context/CartContext";
import ShoppingCartContent from "../common/ShoppingCartContent";

export default function ShoppingCart() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-300 mt-20 p-6">
        <h1 className="text-center font-serif text-black text-4xl mb-8">
          CARRITO DE COMPRAS
        </h1>
        <ShoppingCartContent />
      </main>
      <Footer />
    </CartProvider>
  );
}
