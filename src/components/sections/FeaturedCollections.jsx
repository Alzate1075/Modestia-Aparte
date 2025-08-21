import React from "react";

export default function FeaturedCollections() {
  const collections = [
    {
      title: "Casual Moderna",
      description: "Mantente abrigada sin sacrificar el estilo",
      photo: <img src="https://i.imgur.com/sKlgQGx.png" alt="Casual Moderna" />,
    },
    {
      title: "Moda Nocturna",
      description: "Elegancia y sofisticación para tus noches especiales",
      photo: <img src="https://i.imgur.com/946vgMi.png" alt="Moda Nocturna" />,
    },
    {
      title: "Elegante Fashion",
      description: "Frescura y comodidad para los días soleados",
      photo: (
        <img src="https://i.imgur.com/HToknUI.png" alt="Elegante Fashion" />
      ),
    },
  ];

  return (
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
              <p className="text-gray-600 text-sm">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
