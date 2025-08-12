import { useState, useEffect } from "react";

export const useApiPexels = (query, page) => {
  const [photos, setPhotos] = useState([]);
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

  return { photos, loading };
};
