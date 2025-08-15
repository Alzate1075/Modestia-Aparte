import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../type/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import ResetPassword from "./ResetPassword";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate("/");
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
      const gUser = result.user;
      const userRef = doc(db, "users", gUser.uid);
      const userSnap = await getDoc(userRef);

      let userData;
      if (!userSnap.exists()) {
        userData = {
          id: gUser.uid,
          email: gUser.email || "",
          name: gUser.displayName || "",
          lastName: "",
          role: "user",
        };
        await setDoc(userRef, userData);
      } else {
        userData = { id: gUser.uid, ...userSnap.data() };
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Sesión con Google iniciada correctamente");
    } catch (error) {
      toast.error("Error con Google: " + error.message);
    }
  };

  // ---- Clave: captura Enter en inputs y dispara el submit ----
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // dispara el submit del form de forma fiable
      e.currentTarget.form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
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
          onKeyDown={handleKeyDown}
          autoComplete="email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
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
        {/* Botón submit fantasma por compatibilidad (no visible) */}
        <button type="submit" className="hidden" aria-hidden="true" />
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
        type="button" // ← importante, evita interferir con Enter
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
        type="button" // ← importante
        onClick={() => navigate("/registro")}
        className="w-full mt-4 text-md text-blue-600 hover:underline"
      >
        ¿No tienes cuenta? Registrarse
      </button>

      <button
        type="button" // ← importante
        onClick={() => (onClose ? onClose() : navigate("/"))}
        className="w-full mt-6 text-md text-gray-400 hover:text-gray-600 text-center"
      >
        Cancelar
      </button>

      {showResetModal && (
        <ResetPassword onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
};

export default LoginForm;
