import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Spinner from "../../components/loading/Spinner";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedImages, setLikedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const galleryImages = [
    "/elegant-fashion-model.png",
    "/elegant-night-dress.png",
    "/casual-modern-outfit.png",
  ];

  const collections = [
    {
      title: "Casual Moderna",
      description: "Mantente abrigada sin sacrificar el estilo",
      photo: <img src="https://i.imgur.com/sKlgQGx.png" alt="Nocturna" />,
    },
    {
      title: "Moda Nocturna",
      description: "Elegancia y sofisticación para tus noches especiales",
      photo: <img src="https://i.imgur.com/946vgMi.png" alt="Nocturna" />,
    },
    {
      title: "Elegante Fashion",
      description: "Frescura y comodidad para los días soleados",
      photo: <img src="https://i.imgur.com/HToknUI.png" alt="Nocturna" />,
    },
  ];

  const toggleLike = (index) => {
    setLikedImages((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // ahora maneja 'left' y 'right' y usa la actualización funcional
  const scrollThumbnails = useCallback(
    (direction) => {
      setCurrentImageIndex((prev) => {
        if (direction === "left" && prev > 0) return prev - 1;
        if (direction === "right" && prev < galleryImages.length - 1)
          return prev + 1;
        return prev;
      });
    },
    [galleryImages.length]
  );

  // navegación por teclado (flechas)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") scrollThumbnails("left");
      if (e.key === "ArrowRight") scrollThumbnails("right");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollThumbnails]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-20 min-h-screen bg-gray-300">
        {/* HERO */}
        <section className="relative h-[700px] shadow-lg">
          <div className="absolute inset-0">
            <img
              src="/FondoHero.png"
              alt="Fondo"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full shadow-lg">
            <img
              src="/LogosMA/LogoMA7.png"
              alt="LogoMA"
              className="w-[40%] h-auto"
            />
          </div>
        </section>

        {/* CARRUSEL */}
        <section className="max-w-[80%] bg-gray-200 rounded-2xl shadow-xl mx-auto px-6 py-12 my-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            {/* IMAGEN MODELO */}
            <div className="lg:col-span-3 flex items-center justify-center bg-gray-300 rounded-xl p-6">
              <img
                src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt="Imagen de moda destacada"
                className="object-contain max-h-[500px] w-auto rounded-lg"
              />
            </div>

            {/* DESCRIPCION */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                {collections[currentImageIndex]?.title}
              </h2>
              <p className="text-lg text-gray-700">
                {collections[currentImageIndex]?.description}
              </p>
            </div>
          </div>

          {/* FOTOS CARRUSEL (miniaturas) */}
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => scrollThumbnails("left")}
              disabled={currentImageIndex === 0}
              aria-label="Anterior"
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 mr-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-10">
              {galleryImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className={`relative w-40 h-40 rounded cursor-pointer border-2 ${
                      index === currentImageIndex
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Miniatura ${index + 1}`}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <button
                    onClick={() => toggleLike(index)}
                    className="p-1"
                    aria-label={`Me gusta ${index + 1}`}
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        likedImages.includes(index)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollThumbnails("right")}
              disabled={currentImageIndex === galleryImages.length - 1}
              aria-label="Siguiente"
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 ml-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </section>

        {/* BOTON GALERIA */}
        <div className="flex items-center justify-center mt-6 mb-6 hover:scale-105 transform transition duration-300">
          <Link to="/galeria" className="p-1 border-2 border-black rounded-2xl">
            <button className="cursor-pointer text-white text-xl font-semibold bg-black py-2 px-3 rounded-xl border shadow-lg">
              Galeria de Fotos
            </button>
          </Link>
        </div>

        {/* COLECCIONES */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col text-center">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
                Colecciones Destacadas
              </h2>
              <p className="text-xl font-semibold mb-12">
                Explora nuestras selecciones cuidadosamente curadas para cada
                ocasión y estilo de vida.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <div
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-100 rounded-lg p-6 text-center shadow-xl"
                >
                  <div className="text-4xl mb-4">{collection.photo}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {collection.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
