import React, { useState } from "react";
import { useApiPexels } from "../../hooks/useApiPexels";

const CategoryCards = ({ category }) => {
  const [page, setPage] = useState(1);
  const { photos, loading } = useApiPexels(category, page);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap justify-center gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-[250px] w-[200px]"
          >
            <img
              src={photo.src.medium}
              alt={photo.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {photos.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-white text-purple-600 font-bold py-2 px-6 rounded shadow-lg hover:bg-purple-100 transition mb-6"
          >
            {loading ? "Cargando..." : "Cargar Más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCards;
