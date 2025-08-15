import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../type/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }
    if (!nombre.trim() || !apellido.trim()) {
      toast.warning("Por favor ingresa nombre y apellido");
      return;
    }

    try {
      toast.info("Creando cuenta...", { autoClose: 1000 });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: `${nombre} ${apellido}`,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: nombre,
        lastName: apellido,
        email,
        role: "user",
      });

      toast.success("Cuenta creada correctamente");

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Error al registrar: " + (err.message || err));
    }
  };

  return (
    <div className="mt-20 bg-gray-300 pt-30">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mb-30">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-purple-800 cursor-pointer"
          >
            Registrarse
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-md text-blue-600 hover:underline"
        >
          ¿Ya tienes cuenta? Iniciar sesión
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
