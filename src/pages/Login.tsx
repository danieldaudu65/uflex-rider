import React, { useState } from "react";
import { logo, success } from "../assets";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../components/modalParent";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  vehicle: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  vehicle?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin] = useState(true);
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    vehicle: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.vehicle.trim()) newErrors.vehicle = "Vehicle info is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validateForm()) return; // ❌ Stop if validation fails
    setModal(true);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="space-y-4 px-6 mt-24">
      {/* Logo & Title */}
      <div className="m-auto flex flex-col justify-center items-center mb-12">
        <img src={logo} className="w-1/2 m-auto" alt="Rider Logo" />
        <h1 className="text-3xl font-extrabold">Rider Login</h1>
      </div>

      {/* Form Fields */}
      <div className={`flex flex-col ${isLogin ? "gap-6" : "gap-3"}`}>
        {/* First Name */}
        <div className="flex flex-col text-sm">
          <label className="font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col text-sm">
          <label className="font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col text-sm">
          <label className="font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        {/* Vehicle Info */}
        <div className="flex flex-col text-sm">
          <label className="font-medium mb-1">Vehicle Info (Car Model)</label>
          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            placeholder="Enter car model"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
          />
          {errors.vehicle && <p className="text-red-500 text-xs">{errors.vehicle}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col text-sm relative">
          <label className="font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md pr-12"
          />
          {/* Toggle Show/Hide */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-green-main font-bold text-xs cursor-pointer select-none"
          >
            {showPassword ? "HIDE" : "SHOW"}
          </span>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-[#FE752B] text-black font-bold py-2 rounded-md hover:opacity-90 transition"
        >
          {isLogin ? "Log in" : "Create Account"}
        </button>

        <p className="text-sm justify-center items-center flex">
          Don’t have an account? Create one{" "}
          <a href="/signup" className="text-green-main">
            here
          </a>
        </p>
      </div>

      {/* Modal */}
      {modal && (
        <ModalWrapper isOpen onClose={() => setModal(false)}>
          <div className="bg-white flex flex-col p-6 rounded-lg shadow-md w-[90%] max-w-md m-auto text-center">
            <img
              src={success}
              alt="Success"
              className="w-20 h-20 flex justify-center items-center m-auto mb-8"
            />
            <h2 className="text-lg font-extrabold mb-2">Login Successful</h2>
            <p className="text-md text-gray-600 mb-6 px-16">
              Welcome back! Redirecting to your dashboard...
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModal(false)}
                className="flex-1 border border-gray-300 rounded-lg py-2 text-sm"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-[#65CE00] text-black font-bold rounded-lg py-2 text-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Login;
