import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ Importa tu AuthContext

export default function Contacts() {
  const { user } = useAuth(); // ✅ Obtener usuario actual
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    file: null,
  });

  useEffect(() => {
    if (user?.name && user?.lastName) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.name} ${user.lastName}`, // ✅ Nombre completo
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(e.target);
    if (formData.file) formDataToSend.append("file", formData.file);

    emailjs
      .sendForm(
        "service_i4crhv8",
        "template_azw7xay",
        e.target,
        "PfX-axZtp3KkE-Zmt"
      )
      .then(
        () => {
          toast.success("✅ Mensaje enviado con éxito");
          setFormData((prev) => ({
            ...prev,
            email: "",
            title: "",
            message: "",
            file: null,
          }));
        },
        (error) => {
          toast.error("❌ Error al enviar: " + error.text);
        }
      );
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-28 px-8 flex flex-col items-center">
        <h1 className="text-black font-serif text-5xl mb-6">Contáctanos</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-xl rounded-lg p-6 w-full max-w-lg mb-10"
          encType="multipart/form-data"
        >
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-inner/20"
              required
            />
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-inner/20"
              required
            />
          </div>

          {/* Asunto */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Asunto
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-inner/20"
              required
            />
          </div>

          {/* Mensaje */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Mensaje
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 shadow-inner/20"
              required
            ></textarea>
          </div>

          {/* Archivo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Archivo adjunto
            </label>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 50000) {
                  alert("⚠ El archivo es muy grande (máx. 50KB).");
                  e.target.value = "";
                  return;
                }
                setFormData((prev) => ({ ...prev, file }));
              }}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              📎 Seleccionar archivo
            </label>
            <span className="ml-2 text-gray-600 italic">
              {formData.file ? `(${formData.file.name})` : "(Sin archivo)"}
            </span>
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
