import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ action }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    class: "",
    role: ""
  });

  const handleSubmit = () => {
    if (action === "Login") {
      alert(`Logging in as a ${formData.role} with email: ${formData.email}`);
    } else {
      alert(`Signing up user: ${formData.name} in class: ${formData.class}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-white-100 px-4">
      {action === "Login" ? (
        <LoginForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      ) : (
        <SignupForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      )}

      <div className="text-center text-sm text-black-100 mt-4">
        {action === "Login" ? (
          <p>
            Don't have an account?
            <span
              className="text-black font-semibold cursor-pointer underline ml-1"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              className="text-black font-semibold cursor-pointer underline ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
