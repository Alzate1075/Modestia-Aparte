import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { db } from "../type/firebase/firebaseConfig";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "user",
  });

  // Spinner interno para AdminUsers
  const SpinnerAdmin = () => (
    <div className="flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-t-black border-gray-300 rounded-full animate-spin"></div>
    </div>
  );

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersList = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      // aseguramos un tiempo mínimo de 1 segundo para mostrar el spinner
      setTimeout(() => {
        setUsers(usersList);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error al cargar usuarios");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "users", id));
          setUsers(users.filter((u) => u.id !== id));
          Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          toast.error("Error al eliminar usuario: " + error.message);
          console.error("Error al eliminar usuario:", error);
        }
      }
    });
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "user",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUserId) return;
    try {
      await updateDoc(doc(db, "users", editingUserId), formData);
      setEditingUserId(null);
      fetchUsers();
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al guardar cambios");
    }
  };

  return (
    <div className="mt-20 bg-gray-300 min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-black font-serif text-5xl mb-8 text-center">
          Administrar Usuarios
        </h1>

        {loading ? (
          <SpinnerAdmin />
        ) : (
          <div
            className="overflow-x-auto overflow-y-auto max-h-[90vh] shadow-xl
                        w-full sm:w-[90%] md:w-[75%] lg:w-[80%] xl:w-[70%] rounded-lg bg-white"
          >
            <table className="w-full border border-collapse border-gray-200">
              <thead className="sticky top-0 z-10">
                <tr className="bg-black text-white text-lg font-serif">
                  <th className="p-3 text-center sticky top-0 bg-black">
                    Nombre
                  </th>
                  <th className="p-3 text-center sticky top-0 bg-black">
                    Apellido
                  </th>
                  <th className="p-3 text-center sticky top-0 bg-black">
                    Email
                  </th>
                  <th className="p-3 text-center sticky top-0 bg-black">Rol</th>
                  <th className="p-3 text-center sticky top-0 bg-black">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-600">
                      No hay usuarios.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u.id}
                      className="bg-gray-100 border-b border-gray-200"
                    >
                      {editingUserId === u.id ? (
                        <>
                          <td className="p-2 align-middle">
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="border p-1 border-gray-300 w-full rounded"
                            />
                          </td>
                          <td className="p-2 align-middle">
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                              className="border p-1 border-gray-300 w-full rounded"
                            />
                          </td>
                          <td className="p-2 align-middle">
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="border p-1 border-gray-300 w-full rounded"
                            />
                          </td>
                          <td className="p-2 align-middle">
                            <select
                              value={formData.role}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  role: e.target.value,
                                })
                              }
                              className="border p-1 border-gray-300 w-full rounded"
                            >
                              <option value="user">usuario</option>
                              <option value="admin">admin</option>
                            </select>
                          </td>
                          <td className="p-2 text-center align-middle">
                            <button
                              onClick={handleSaveEdit}
                              className="cursor-pointer bg-green-500 text-white font-semibold text-sm px-3 py-1 rounded mr-2"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingUserId(null)}
                              className="cursor-pointer bg-gray-500 text-white font-semibold text-sm px-3 py-1 rounded"
                            >
                              Cancelar
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 text-left align-middle">
                            {u.name}
                          </td>
                          <td className="p-3 text-left align-middle">
                            {u.lastName}
                          </td>
                          <td className="p-3 text-left align-middle">
                            {u.email}
                          </td>
                          <td className="p-3 text-left align-middle">
                            {u.role}
                          </td>
                          <td className="p-3 text-center align-middle">
                            <button
                              onClick={() => handleEditClick(u)}
                              className="cursor-pointer bg-black text-white font-semibold text-sm px-3 py-1 rounded mr-2"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="cursor-pointer bg-red-600 text-white font-semibold text-sm px-3 py-1 rounded"
                            >
                              Eliminar
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
