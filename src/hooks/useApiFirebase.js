import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../type/firebase/firebaseConfig";
import { useState, useEffect } from "react";

export const useApiFirebase = (category) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      setLoading(true);
      setError(null);

      try {
        let q;
        if (category) {
          q = query(
            collection(db, "Productos"),
            where("Categoria", "==", category)
          );
        } else {
          q = query(collection(db, "Productos"));
        }

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError("No se encontraron productos.");
          setProductos([]);
        } else {
          const productosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProductos(productosData);
        }
      } catch (err) {
        console.error("Error al obtener productos de Firebase:", err);
        setError("Ocurrió un error al cargar los productos.");
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [category]);

  return { productos, loading, error };
};
