import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import RegisterForm from "../Auth/RegisterForm";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20 min-h-[80vh] flex items-center justify-center bg-gray-300 bg-opacity-50 z-0">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
