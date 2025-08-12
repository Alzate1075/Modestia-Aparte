import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { db } from "../../type/firebase/firebaseConfig";
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
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    role: "user",
  });

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  // Iniciar edición
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "user",
    });
  };

  // Guardar edición
  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "users", editingUserId), formData);
    setEditingUserId(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh] mt-28 px-8">
        <h1 className="text-black font-serif text-4xl mb-6">
          Administrar Usuarios
        </h1>
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-center align-middle">Nombre</th>
              <th className="p-2 text-center align-middle">Apellido</th>
              <th className="p-2 text-center align-middle">Email</th>
              <th className="p-2 text-center align-middle">Rol</th>
              <th className="p-2 text-center align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-300">
                {editingUserId === u.id ? (
                  <>
                    <td className="p-2 text-center align-middle">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="border p-1 border-gray-300 w-full"
                      />
                    </td>
                    <td className="p-2 text-center align-middle">
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="border p-1 border-gray-300 w-full"
                      />
                    </td>
                    <td className="p-2 text-center align-middle">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="border p-1 border-gray-300 w-full"
                      />
                    </td>
                    <td className="p-2 text-center align-middle">
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="border p-1 border-gray-300 w-full"
                      >
                        <option value="user">usuario</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-2 text-center align-middle">
                      <button
                        onClick={handleSaveEdit}
                        className="cursor-pointer bg-green-500 text-white font-semibold text-lg px-2 py-1 rounded mr-2"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="cursor-pointer bg-gray-500 text-white font-semibold text-lg px-2 py-1 rounded"
                      >
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 text-center align-middle">{u.name}</td>
                    <td className="p-2 text-center align-middle">
                      {u.lastName}
                    </td>
                    <td className="p-2 text-center align-middle">{u.email}</td>
                    <td className="p-2 text-center align-middle">{u.role}</td>
                    <td className="p-2 text-center align-middle">
                      <button
                        onClick={() => handleEditClick(u)}
                        className="cursor-pointer bg-black text-white font-semibold text-lg px-2 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="cursor-pointer bg-red-600 text-white font-semibold text-lg px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
