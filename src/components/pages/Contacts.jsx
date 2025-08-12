import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function Contacts() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh] mt-28 px-8">
        <h1 className="text-black font-serif text-4xl mb-6">Contáctanos</h1>
      </div>
      <Footer />
    </div>
  );
}
