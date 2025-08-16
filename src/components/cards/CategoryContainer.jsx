import React, { useState } from "react";
import CategoryCards from "./CategoryCards";
import FirebaseCards from "./FirebaseCards";

const categories = ["Vestidos", "Trajes", "Blusas", "Pantalones"];

const CategoryContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vestidos");

  return (
    <div className="p-4">
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`py-2 px-4 rounded-lg shadow-md ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            } hover:bg-purple-100 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Fotos de Pexels</h2>
      <CategoryCards category={selectedCategory} />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
        Productos de Firebase
      </h2>
      <FirebaseCards category={selectedCategory} />
    </div>
  );
};

export default CategoryContainer;
