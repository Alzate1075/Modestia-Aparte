import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// Si tus imágenes están en /public, normalmente se usan así: "/casual-modern-outfit.png"
const slides = [
  {
    src: "/public/casual-modern-outfit.png",
    title: "Casual Moderna",
    description: "Mantente abrigada sin sacrificar el estilo.",
  },
  {
    src: "/public/elegant-fashion-model.png",
    title: "Elegante Fashion",
    description: "Frescura y comodidad para los días soleados.",
  },
  {
    src: "/public/elegant-night-dress.png",
    title: "Moda Nocturna",
    description: "Elegancia y sofisticación para tus noches especiales.",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const { src, title, description } = slides[currentIndex];

  return (
    <section className="mt-15 md:mt-25 w-[90%] max-w-3xl mx-auto px-4 h-[480px] md:h-[550px] bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Imagen grande a la izquierda (solo desktop) */}
        <div className="mt-6 hidden md:block md:w-1/2">
          <img
            src={src}
            alt={title}
            className="w-auto h-[100px] md:h-[400px] object-contain"
          />
        </div>

        {/* Carrusel */}
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Móvil: carrusel horizontal, 1 imagen visible, con flechas L/R */}
          <div className="mt-6 relative shadow-lg md:hidden">
            <img
              src={src}
              alt={title}
              className="w-full h-full rounded-2xl object-contain transition-transform duration-500"
            />

            <button
              onClick={prevSlide}
              aria-label="Anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop: carrusel vertical a la derecha, sin scroll, 1 imagen visible, flechas Up/Down */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <button
              onClick={prevSlide}
              aria-label="Anterior"
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            <div className="overflow-hidden flex items-center justify-center">
              <img
                src={src}
                alt={title}
                className="w-auto h-30 object-contain"
              />
            </div>

            <button
              onClick={nextSlide}
              aria-label="Siguiente"
              className="p-2 border rounded-lg hover:bg-gray-100"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Descripción debajo, siempre */}
      <div className="mt-6 text-center px-4">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-gray-700 text-sm md:text-base">{description}</p>
      </div>
    </section>
  );
}
