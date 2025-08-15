import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider, db } from "../../type/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Para controlar submit
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!email || !password) {
      toast.error("Por favor ingresa correo y contraseña");
      setIsSubmitting(false);
      return;
    }

    try {
      toast.info("Iniciando sesión...", { autoClose: 1000 });
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      let userData;
      if (!userSnap.exists()) {
        userData = {
          id: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || "",
          lastName: "",
          role: "user",
        };
        await setDoc(userRef, userData);
      } else {
        userData = { id: result.user.uid, ...userSnap.data() };
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Sesión iniciada correctamente");
    } catch (error) {
      let errorMsg = "Error desconocido";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "Correo inválido";
          break;
        case "auth/user-not-found":
          errorMsg = "Usuario no encontrado";
          break;
        case "auth/wrong-password":
          errorMsg = "Contraseña incorrecta";
          break;
        default:
          errorMsg = error.message;
      }
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      toast.info("Conectando con Google...", { autoClose: 1000 });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let userData;
      if (!userSnap.exists()) {
        userData = {
          id: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          lastName: "",
          role: "user",
        };
        await setDoc(userRef, userData);
      } else {
        userData = { id: user.uid, ...userSnap.data() };
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Sesión con Google iniciada correctamente");
    } catch (error) {
      toast.error("Error con Google: " + error.message);
    }
  };

  const handleSendResetEmail = async () => {
    if (!resetEmail) {
      toast.error("Por favor ingresa un correo válido");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Correo de recuperación enviado");
      setShowResetModal(false);
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
    <div>
      <Navbar />
      <div className="mt-20 min-h-[80vh] flex items-center justify-center bg-gray-300 bg-opacity-50 z-0">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-black text-white font-semibold py-2 rounded hover:bg-purple-800 transition"
              disabled={isSubmitting}
            >
              Iniciar sesión
            </button>
          </form>

          <p
            className="mt-3 text-sm text-blue-600 cursor-pointer hover:underline text-center"
            onClick={() => setShowResetModal(true)}
          >
            ¿Olvidaste tu contraseña?
          </p>

          <div className="my-4 flex items-center justify-between">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">o</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-200 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Iniciar sesión con Google
          </button>

          <button
            onClick={() => navigate("/registro")}
            className="w-full mt-4 text-md text-blue-600 hover:underline"
          >
            ¿No tienes cuenta? Registrarse
          </button>

          <button
            onClick={() => (onClose ? onClose() : navigate("/"))}
            className="w-full mt-6 text-md text-gray-400 hover:text-gray-600 text-center"
          >
            Cancelar
          </button>

          {showResetModal && (
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
                    onClick={() => setShowResetModal(false)}
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
