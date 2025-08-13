import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../type/firebase/firebaseConfig";
import { toast } from "react-toastify";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const docRef = doc(db, "favorites", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().items || []);
        } else {
          await setDoc(docRef, { items: [] });
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (item) => {
    if (!user)
      return toast.error("Debes iniciar sesión para agregar favoritos");

    const docRef = doc(db, "favorites", user.uid);
    let updatedFavorites;

    if (favorites.some((fav) => fav.id === item.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
      try {
        await updateDoc(docRef, { items: arrayRemove(item) });
      } catch (error) {
        console.error("Error quitando favorito:", error);
      }
    } else {
      updatedFavorites = [...favorites, item];
      try {
        await updateDoc(docRef, { items: arrayUnion(item) });
      } catch (error) {
        console.error("Error agregando favorito:", error);
      }
    }

    setFavorites(updatedFavorites);
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
