import React from "react";

export default function Hero() {
  return (
    <section className="mt-16 relative">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="/FondoHero.png"
          alt="Fondo"
          className="w-full h-[110%] object-cover object-bottom shadow-lg"
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex items-center justify-center md:h-[70%] px-4">
        <img
          src="/LogosMA/LogoMA7.png"
          alt="LogoMA"
          className="mt-20
            w-[35%]
            h-auto drop-shadow-lg mb-10"
        />
      </div>
    </section>
  );
}
