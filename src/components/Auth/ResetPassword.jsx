import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../type/firebase/firebaseConfig";
import { toast } from "react-toastify";

const ResetPassword = ({ onClose }) => {
  const [resetEmail, setResetEmail] = useState("");

  const handleSendResetEmail = async () => {
    if (!resetEmail) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Correo de recuperación enviado");
      onClose();
      setResetEmail("");
    } catch (error) {
      let errorMsg = "Error desconocido";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "Correo inválido";
          break;
        case "auth/user-not-found":
          errorMsg = "Usuario no encontrado";
          break;
        default:
          errorMsg = error.message;
      }
      toast.error(errorMsg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-sm shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Recuperar contraseña
        </h3>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSendResetEmail}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Enviar código
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
