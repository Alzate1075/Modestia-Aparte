import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-20 min-h-[80vh] flex items-center justify-center bg-gray-300 bg-opacity-50 z-0">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
