import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import SkeletonCard from "../loading/SkeletonCard";

const PexelsCards = ({ query }) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPexelsPhotos = async (searchQuery, currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=12&page=${currentPage}`,
        {
          headers: {
            Authorization:
              "vzj6d3FI1Ejej4H6mbUXuHUlXM6qOVS1rhbaSLrgvNd6JAP0kSXi0PQO",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las fotos de Pexels");
      }

      const data = await response.json();
      setPhotos((prevPhotos) =>
        currentPage === 1 ? data.photos : [...prevPhotos, ...data.photos]
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPexelsPhotos(query, page);
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center">
      <CardContainer>
        {loading && photos.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[450px] w-full max-w-[330px] relative transform hover:scale-105 transition duration-300"
              >
                <div className="w-full h-[70%] flex items-center justify-center bg-white">
                  <img
                    src={photo.src.medium}
                    alt={photo.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="h-[30%] w-full flex items-center justify-center text-center px-2">
                  <p className="text-xs text-black">{photo.alt}</p>
                </div>
              </div>
            ))}
      </CardContainer>

      {photos.length > 0 && (
        <div className="flex justify-center mt-6 w-full">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-white text-black font-bold py-2 px-6 rounded-2xl shadow-xl border border-gray-200 hover:scale-105 transform transition duration-300 cursor-pointer hover:bg-white disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Cargar Más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PexelsCards;
