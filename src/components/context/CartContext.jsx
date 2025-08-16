// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../type/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Crear contexto
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde Firestore al cambiar de usuario
  useEffect(() => {
    let isMounted = true;

    if (!user) {
      setCartItems([]);
      return;
    }

    const loadCart = async () => {
      try {
        const docRef = doc(db, "carts", user.uid);
        const docSnap = await getDoc(docRef);

        if (isMounted) {
          if (docSnap.exists()) {
            const items = docSnap.data().items || [];
            const normalizedItems = items.map((item) => ({
              ...item,
              quantity: item.quantity || 1,
            }));
            setCartItems(normalizedItems);
          } else {
            await setDoc(docRef, { items: [] });
            setCartItems([]);
          }
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
      }
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Guardar carrito en Firestore
  const saveCartToFirebase = async (items) => {
    if (!user) return;
    try {
      const docRef = doc(db, "carts", user.uid);
      await setDoc(docRef, { items });
    } catch (error) {
      console.error("Error guardando carrito:", error);
    }
  };

  // Añadir producto
  const addToCart = (product) => {
    if (!user) return alert("Debes iniciar sesión para agregar al carrito");

    const quantityToAdd = product.cantidad || 1; // 👈 usar cantidad del producto

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd } // 👈 sumamos la cantidad real
            : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: quantityToAdd }]; // 👈 agregamos con cantidad correcta
      }

      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  // Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(Number(newQuantity), 1) }
          : item
      );
      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      saveCartToFirebase(updatedCart);
      return updatedCart;
    });
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    saveCartToFirebase([]);
  };

  // Total items y total precio
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + Number(item.quantity), 0);

  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + Number(item.Precio) * Number(item.quantity),
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
