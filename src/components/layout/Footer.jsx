import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">Modestia Aparte</h3>
              <p className="text-gray-400 text-md">
                Moda con estilo y elegancia
              </p>
            </div>
            <div className="flex space-x-6 text-lg">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Contacto
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Nosotros
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Servicios
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Términos
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-md">
            <p>&copy; 2025 Modestia Aparte. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
