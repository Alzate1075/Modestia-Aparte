import React, { useState } from "react";
import FirebaseCards from "../cards/FirebaseCards";
import CategoryCards from "../categorias/CategoryCards";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import SkeletonCard from "../loading/SkeletonCard";

const Gallery = () => {
  const [categoryFirebase, setCategoryFirebase] = useState(null);
  const [categoryPexels, setCategoryPexels] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [loadingSkeletons, setLoadingSkeletons] = useState(false);

  const categories = [
    "Blusas",
    "Vestidos",
    "Matrimonio",
    "Disfraces",
    "Niños",
    "Blazer",
  ];

  const handleCategoryClick = (category) => {
    setCategoryFirebase(category);
    setCategoryPexels(category);
    if (!showGallery) {
      setLoadingSkeletons(true);
      setShowGallery(true);

      setTimeout(() => {
        setLoadingSkeletons(false); // termina el loading
        const gallerySection = document.getElementById("pexels-gallery");
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: "smooth" });
        }
      }, 3000);
    }
  };

  const handleVerTodas = () => {
    setCategoryFirebase(null);
    setShowGallery(false);
    setCategoryPexels(null);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 pb-10 bg-gray-300 min-h-screen">
        <div className="flex flex-col gap-4 justify-center max-w-6xl mx-auto px-4 py-6 hover:scale-105 transform transition duration-300">
          {/* BOTÓN VER TODAS */}
          {categoryFirebase && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleVerTodas}
                className="mt-6 cursor-pointer text-white bg-black font-semibold py-2 px-6 rounded shadow-lg hover:bg-pink-600 transition"
              >
                Ver Todas
              </button>
            </div>
          )}

          {/* CATEGORIAS */}
          <div className="flex flex-wrap justify-center gap-4 my-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`py-2 cursor-pointer px-4 rounded shadow-lg font-semibold ${
                  categoryFirebase === category
                    ? "bg-yellow-500 text-black"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FIREBASE CARDS */}
        <div className="flex justify-center mx-30">
          <FirebaseCards category={categoryFirebase} />
        </div>

        {/* MÁS DISEÑOS */}
        {!showGallery && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                setCategoryPexels("Vestidos");
                setShowGallery(true);
                setTimeout(() => {
                  const gallerySection =
                    document.getElementById("pexels-gallery");
                  if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className="cursor-pointer bg-white text-pink-600 font-bold py-2 px-6 rounded shadow-lg hover:bg-pink-100 transition"
            >
              Más Diseños
            </button>
          </div>
        )}

        {/* GALERIA PEXELS */}
        {showGallery && (
          <div id="pexels-gallery" className="my-10 mx-30">
            <h2 className="text-4xl font-bold text-center my-4 text-black">
              Galería de {categoryPexels}
            </h2>
            <div className="flex justify-center">
              {loadingSkeletons ? (
                <div className="flex flex-wrap justify-center gap-6">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
                <CategoryCards category={categoryPexels} />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
