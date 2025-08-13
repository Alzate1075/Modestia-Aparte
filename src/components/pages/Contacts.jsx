import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    file: null, // 🔹 Nuevo para archivo
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.name) {
      setFormData((prev) => ({ ...prev, name: savedUser.name }));
    }
  }, []);

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
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

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
          setFormData({
            name: formData.name,
            email: "",
            title: "",
            message: "",
            file: null,
          });
        },
        (error) => {
          alert("❌ Error al enviar: " + error.text);
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
          encType="multipart/form-data" // 🔹 Necesario para archivo
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
          {/* Archivo adjunto */}
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
                  // 50 KB máximo
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

          {/* Botón enviar */}
          <button
            type="submit"
            className="cursor-pointer bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
          >
            Enviar mensaje
          </button>
        </form>
        {/* Redes sociales */}
        <div className="w-full max-w-lg bg-gray-100 shadow-xl rounded-lg p-4 flex justify-around items-center mt-[-20px] mb-10">
          {[
            { src: "/Contacto/Facebook.png", alt: "Facebook", link: "#" },
            { src: "/Contacto/instagram.png", alt: "Instagram", link: "#" },
            { src: "/Contacto/Tiktok.png", alt: "TikTok", link: "#" },
            { src: "/Contacto/Whats-up.png", alt: "WhatsApp", link: "#" },
            { src: "/Contacto/Youtube.png", alt: "YouTube", link: "#" },
            { src: "/Contacto/Email.png", alt: "Email", link: "#" },
          ].map((icon, index) => (
            <a
              key={index}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-10 h-10 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
