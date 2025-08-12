import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function AdminProducts() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh] mt-25 flex justify-center">
        <h1 className="text-black font-serif text-5xl">
          Administrar Productos
        </h1>
      </div>
      <Footer />
    </div>
  );
}
