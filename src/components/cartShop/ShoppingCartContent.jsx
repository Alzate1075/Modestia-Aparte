import React, { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ShoppingCartContent() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);

  // Simulamos carga de 1 segundo
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.Precio * item.quantity, 0);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // Skeleton para fila de producto
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap flex items-between gap-4">
        <div className="h-16 w-16 bg-gray-300 rounded" />
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-gray-200 rounded shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-gray-200">
              {/* Mostrar 3 filas skeleton */}
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-300 p-6 bg-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto bg-gray-200 rounded shadow-xl p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-gray-500">
            Agrega algunos productos para comenzar
          </p>
          <div className="mt-6 flex items-center justify-center hover:scale-105 transform transition duration-300">
            <Link to="/galeria" className="p-1 rounded-2xl">
              <button className="cursor-pointer text-white text-xl font-semibold bg-black py-2 px-4 rounded-xl border shadow-lg">
                Seguir comprando
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b p-6 bg-black font-semibold text-white text-lg">
        <ShoppingBag className="h-5 w-5" />
        Carrito de Compras ({getTotalItems()}{" "}
        {getTotalItems() === 1 ? "artículo" : "artículos"})
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
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
                Total
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartItems.map((item) => (
              <tr key={item.id}>
                {/* Producto */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                  <img
                    src={item.ImgUrl || "/placeholder.svg"}
                    alt={item.Nombre}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <span className="text-gray-900 font-medium">
                    {item.Nombre}
                  </span>
                </td>
                {/* Precio */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-semibold">
                  ${item.Precio.toFixed(2)}
                </td>
                {/* Cantidad */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="inline-flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                {/* Total */}
                <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
                  ${(item.Precio * item.quantity).toFixed(2)}
                </td>
                {/* Botón eliminar */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="text-gray-700 font-semibold text-lg">
          Total: ${getTotalPrice().toFixed(2)}
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            className="cursor-pointer flex-1 sm:flex-auto bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded font-semibold"
            onClick={() => window.history.back()}
          >
            Continuar Comprando
          </button>
          <button
            className="cursor-pointer flex-1 sm:flex-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
            onClick={() => alert("Procediendo al pago...")}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}
