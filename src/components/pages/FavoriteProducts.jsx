import React, { useEffect, useRef, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, X, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

export default function FavoriteProducts({ onClose }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ===== Helpers para tolerar distintos esquemas =====
  const getTitle = (p) => p?.title || p?.Nombre || p?.name || "Producto";
  const getPrice = (p) =>
    typeof p?.price === "number"
      ? p.price
      : typeof p?.Precio === "number"
      ? p.Precio
      : 0;
  const getImage = (p) => p?.image || p?.ImgUrl || p?.img || "/placeholder.svg";

  // Si tu Cart espera { id, Nombre, Precio, ImgUrl } lo normalizamos aquí
  const toCartItem = (p) => ({
    id: p?.id,
    Nombre: p?.Nombre || p?.title || p?.name || "Producto",
    Precio:
      typeof p?.Precio === "number"
        ? p.Precio
        : typeof p?.price === "number"
        ? p.price
        : 0,
    ImgUrl: p?.ImgUrl || p?.image || p?.img || "/placeholder.svg",
  });

  // ===== Cantidades por producto =====
  const [quantities, setQuantities] = useState({});
  const getQuantity = (id) => quantities[id] || 1;
  const updateQuantity = (id, q) => {
    if (q >= 1) setQuantities((prev) => ({ ...prev, [id]: q }));
  };

  // ===== Cerrar con click fuera y con ESC, y bloquear scroll fondo =====
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  // ===== Acciones =====
  const handleAddToCart = (product) => {
    const quantity = getQuantity(product.id);
    const cartItem = toCartItem(product);
    addToCart(cartItem, quantity);
    toast.success(`${getTitle(product)} (${quantity}) agregado al carrito`);
  };

  const handleRemoveFavorite = (product) => {
    toggleFavorite(product);
    toast.info(`${getTitle(product)} eliminado de favoritos`);
  };

  const handleImageClick = (product) => {
    // Cierra el modal y navega a la galería (ajusta si tienes /galeria/:id)
    onClose?.();
    navigate("/galeria");
  };

  const goToCart = () => {
    onClose?.();
    navigate("/carrito");
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={contentRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center p-6 border-b bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current" />
            <h2 className="text-2xl font-bold">Mis Favoritos</h2>
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
              {favorites?.length || 0}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-white hover:bg-white/20 rounded p-1"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-auto">
          {!favorites || favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-600 font-medium mb-2">
                No tienes productos favoritos aún
              </p>
              <p className="text-gray-400">
                Agrega productos a favoritos para verlos aquí
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {favorites.map((product) => (
                    <tr key={product.id}>
                      {/* Producto */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <img
                            src={getImage(product)}
                            alt={getTitle(product)}
                            className="h-16 w-16 rounded object-cover border cursor-pointer"
                            onClick={() => handleImageClick(product)}
                            title="Ver en galería"
                          />
                          <div className="min-w-0">
                            <div className="text-gray-900 font-medium truncate">
                              {getTitle(product)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Precio */}
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-semibold">
                        ${getPrice(product).toFixed(2)}
                      </td>

                      {/* Cantidad */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center border rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                getQuantity(product.id) - 1
                              )
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-medium">
                            {getQuantity(product.id)}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                getQuantity(product.id) + 1
                              )
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded inline-flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Añadir
                          </button>

                          <button
                            onClick={() => handleRemoveFavorite(product)}
                            className="text-red-600 border border-red-200 hover:bg-red-50 rounded px-3 py-1 inline-flex items-center gap-2"
                            title="Quitar de favoritos"
                          >
                            <Heart className="cursor- pointer w-4 h-4 fill-current" />
                            Quitar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer con conteo + botones */}
              <div className="border-t p-6 bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {favorites.length} producto
                  {favorites.length !== 1 ? "s" : ""} en favoritos
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="cursor-pointer px-6 py-2 border border-gray-300 rounded hover:bg-gray-200 shadow-lg"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={goToCart}
                    className="cursor-pointer px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded shadow-lg"
                    title="Ir al Carrito"
                  >
                    Ir al Carrito
                  </button>
                </div>
              </div>
              {/* /Footer */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
