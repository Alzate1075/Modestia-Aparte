import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function ShoppingCart() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-300 mt-20">
        <h1 className="flex text-center font-serif justify-center text-black text-4xl mt-6 p-4">
          CARRITO DE COMPRAS
        </h1>
      </div>
      <Footer />
    </div>
  );
}
