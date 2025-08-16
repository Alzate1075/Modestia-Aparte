import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { toast } from "react-toastify";
import { db } from "../type/firebase/firebaseConfig";
import Swal from "sweetalert2";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    Nombre: "",
    Descripcion: "",
    Precio: "",
    ImgUrl: "",
    Categoria: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Spinner interno
  const SpinnerAdmin = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-16 h-16 border-4 border-t-black border-gray-300 rounded-full animate-spin"></div>
    </div>
  );

  // Traer productos desde Firestore al cargar el componente
  const fetchProducts = async () => {
    try {
      const productsCol = collection(db, "Productos");
      const productsSnapshot = await getDocs(productsCol);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // asegurar que el spinner dure al menos 1 segundo
      setTimeout(() => {
        setProducts(productsList);
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Error al cargar productos: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (
      !form.Nombre ||
      !form.Descripcion ||
      !form.Precio ||
      !form.ImgUrl ||
      !form.Categoria
    ) {
      return toast.error("Completa todos los campos");
    }

    try {
      const productsCol = collection(db, "Productos");
      const newProduct = {
        Nombre: form.Nombre,
        Descripcion: form.Descripcion,
        Precio: Number(form.Precio),
        ImgUrl: form.ImgUrl,
        Categoria: form.Categoria,
      };
      const docRef = await addDoc(productsCol, newProduct);

      setProducts([...products, { id: docRef.id, ...newProduct }]);
      setForm({
        id: null,
        Nombre: "",
        Descripcion: "",
        Precio: "",
        ImgUrl: "",
        Categoria: "",
      });
    } catch (error) {
      toast.error("Error al crear producto: " + error.message);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !form.Nombre ||
      !form.Descripcion ||
      !form.Precio ||
      !form.ImgUrl ||
      !form.Categoria
    ) {
      return toast.error("Completa todos los campos");
    }

    try {
      const docRef = doc(db, "Productos", form.id);
      await updateDoc(docRef, {
        Nombre: form.Nombre,
        Descripcion: form.Descripcion,
        Precio: Number(form.Precio),
        ImgUrl: form.ImgUrl,
        Categoria: form.Categoria,
      });

      setProducts(
        products.map((p) =>
          p.id === form.id ? { ...form, Precio: Number(form.Precio) } : p
        )
      );
      setForm({
        id: null,
        Nombre: "",
        Descripcion: "",
        Precio: "",
        ImgUrl: "",
        Categoria: "",
      });
      setIsEditing(false);
      toast.success("Producto actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar producto: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "Productos", id));
          setProducts(products.filter((p) => p.id !== id));
          Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        } catch (error) {
          toast.error("Error al eliminar producto: " + error.message);
        }
      }
    });
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-[70vh] mt-30 px-6 mx-auto mb-10">
        <h1 className="text-black font-serif text-5xl mb-6 text-center">
          Administrar Productos
        </h1>

        {loading ? (
          <SpinnerAdmin />
        ) : (
          <div className="flex flex-1 px-6 mt-6 gap-6">
            {/* Formulario fijo */}
            <form
              onSubmit={isEditing ? handleUpdate : handleCreate}
              className="bg-gray-200 p-6 rounded shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 w-[400px] h-fit sticky top-20 self-start"
            >
              <input
                type="text"
                name="Nombre"
                placeholder="Nombre del producto"
                value={form.Nombre}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded shadow-inner/30"
              />
              <input
                type="text"
                name="Categoria"
                placeholder="Categoría"
                value={form.Categoria}
                onChange={handleChange}
                className="border border-gray-300 shadow-inner/30 p-2 rounded"
              />
              <input
                type="number"
                name="Precio"
                placeholder="Precio"
                value={form.Precio}
                onChange={handleChange}
                className="border border-gray-300 shadow-inner/30 p-2 rounded"
              />
              <input
                type="text"
                name="ImgUrl"
                placeholder="URL de la imagen"
                value={form.ImgUrl}
                onChange={handleChange}
                className="border border-gray-300 shadow-inner/30 p-2 rounded"
              />
              <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={form.Descripcion}
                onChange={handleChange}
                className="border p-2 border-gray-300 shadow-inner/30 rounded col-span-1 md:col-span-2"
                rows={3}
              />
              <div className="flex space-x-4 col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className={`px-6 py-2 rounded text-white font-semibold shadow-md cursor-pointer ${
                    isEditing ? "bg-yellow-500" : "bg-green-600"
                  }`}
                >
                  {isEditing ? "Actualizar" : "Crear"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setForm({
                        id: null,
                        Nombre: "",
                        Descripcion: "",
                        Precio: "",
                        ImgUrl: "",
                        Categoria: "",
                      });
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 rounded bg-gray-500 text-white"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            {/* Tabla con scroll */}
            <div className="overflow-x-auto overflow-y-auto max-h-[70vh] flex-1 shadow-lg">
              <table className="w-full border border-gray-300">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-black text-white">
                    <th className="border border-gray-200 p-2">Nombre</th>
                    <th className="border border-gray-200 p-2">Categoría</th>
                    <th className="border border-gray-200 p-2">Precio</th>
                    <th className="border border-gray-200 p-2">Imagen</th>
                    <th className="border border-gray-200 p-2">Descripción</th>
                    <th className="border border-gray-200 p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="bg-gray-200 hover:bg-gray-100 shadow-lg"
                    >
                      <td className="border border-gray-300 p-2">{p.Nombre}</td>
                      <td className="border border-gray-300 p-2">
                        {p.Categoria}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${p.Precio}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {p.ImgUrl && (
                          <img
                            src={p.ImgUrl}
                            alt={p.Nombre}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {p.Descripcion}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="cursor-pointer bg-black text-white px-3 py-1 mr-2 rounded my-2 text-md font-semibold shadow-md"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="cursor-pointer bg-red-600 text-white px-3 py-1 rounded my-2 text-md font-semibold shadow-md"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
