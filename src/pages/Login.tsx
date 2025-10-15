import React, { useState } from "react";
import { logo, success } from "../assets";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../components/modalParent";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";
import LogoLoader from "../components/LogoLoader";

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
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    vehicle: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const MIN_LOADER_TIME = 3000;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.vehicle.trim()) newErrors.vehicle = "Vehicle info is required";
    }

    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const startTime = Date.now();

    try {
      const endpoint = isLogin ? "/rider_auth/login" : "/rider_auth/signup";
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await apiRequest(endpoint, "POST", body);

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADER_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADER_TIME - elapsed));
      }

      if (isLogin) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("rider", JSON.stringify(response.rider));

        toast.success(response.message || "Login successful!");
        setModal(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.success(response.message || "Signup successful! Please login.");
        setModal(true);
        setTimeout(() => {
          setModal(false);
          setIsLogin(true);
        }, 2000);
      }
    } catch (err: any) {
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADER_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADER_TIME - elapsed));
      }

      console.error("Auth Error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center md:items-stretch bg-gray-50">
      <LogoLoader isLoading={loading} />

      {/* Left Section (branding) */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#FE752B] w-1/2 text-white p-10 rounded-r-3xl">
        <img src={logo} alt="Logo" className="w-1/2 mb-6" />
        <h2 className="text-3xl font-extrabold mb-4 text-center">
          Welcome to Rider
        </h2>
        <p className="text-sm max-w-md text-center opacity-90">
          {isLogin
            ? "Log in to manage your rides and earnings."
            : "Create your Rider account and start earning today."}
        </p>
      </div>

      {/* Right Section (form) */}
      <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center bg-white shadow-md md:rounded-l-3xl">
        {/* Logo for mobile only */}
        <div className="md:hidden flex flex-col justify-center items-center mb-12">
          <img src={logo} className="w-1/2" alt="Rider Logo" />
          <h1 className="text-2xl font-extrabold">
            Rider {isLogin ? "Login" : "Signup"}
          </h1>
        </div>

        {/* Form Fields */}
        <div className={`flex flex-col ${isLogin ? "gap-6" : "gap-3"}`}>
          {!isLogin && (
            <>
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
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

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
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>

              <div className="flex flex-col text-sm">
                <label className="font-medium mb-1">Vehicle Type</label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="border placeholder:text-xs outline-green-main hover:border-green-main border-gray-200 p-2 rounded-md"
                >
                  <option value="">Select your vehicle</option>
                  {[
                    { car: "Range Rover" },
                    { car: "Pathfinder" },
                    { car: "Toyota Camry" },
                    { car: "Range Rover (Luxury)" },
                  ].map((item, i) => (
                    <option key={i} value={item.car}>
                      {item.car}
                    </option>
                  ))}
                </select>
                {errors.vehicle && (
                  <p className="text-red-500 text-xs">{errors.vehicle}</p>
                )}
              </div>
            </>
          )}

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
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

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
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-green-main font-bold text-xs cursor-pointer select-none"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-8">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-[#FE752B] text-black font-bold py-3 rounded-md hover:opacity-90 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Log in" : "Create Account"}
          </button>

          <p className="text-sm justify-center items-center flex mt-4">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-main cursor-pointer ml-1"
            >
              {isLogin ? "Create one" : "Login"}
            </span>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {modal && (
        <ModalWrapper isOpen onClose={() => setModal(false)}>
          <div className="bg-white flex flex-col p-6 rounded-lg shadow-md w-[90%] max-w-md m-auto text-center">
            <img
              src={success}
              alt="Success"
              className="w-20 h-20 flex justify-center items-center m-auto mb-8"
            />
            <h2 className="text-lg font-extrabold mb-2">
              {isLogin ? "Login" : "Signup"} Successful
            </h2>
            <p className="text-md text-gray-600 mb-6 px-6">
              Welcome {isLogin ? "back" : "aboard"}! Redirecting to your dashboard...
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
