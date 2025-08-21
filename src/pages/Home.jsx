import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Spinner from "../components/common/Spinner";
import Carousel from "../components/sections/Carousel";
import Hero from "../components/sections/Hero";
import FeaturedCollections from "../components/sections/FeaturedCollections";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Mostrar spinner 1 segundo al inicio
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner text="Modestia Aparte" size="w-20" height="h-screen" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="mt-15 min-h-screen bg-gray-300">
        {/* HERO */}
        <Hero />

        {/* CARRUSEL */}
        <Carousel />

        {/* BOTÓN GALERÍA */}
        <div className="flex items-center justify-center mt-6 mb-6 hover:scale-105 transform transition duration-300">
          <Link to="/galeria" className="p-1 border-2 border-black rounded-2xl">
            <button className="cursor-pointer text-white text-xl font-semibold bg-black py-2 px-3 rounded-xl border shadow-lg">
              Galeria de Fotos
            </button>
          </Link>
        </div>

        {/* COLECCIONES DESTACADAS */}
        <FeaturedCollections />
      </div>

      <Footer />
    </div>
  );
}
