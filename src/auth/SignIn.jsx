import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/white_logo.png";
import authimg from "../assets/authimg.jpg";

const SignIn = () => {
  const [formData, setFormData] = useState({
    referenceNumber: "",
    pin: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referenceNumber) {
      newErrors.referenceNumber = "Form Reference Number is required";
    }
    if (!formData.pin) {
      newErrors.pin = "Form PIN is required";
    } else if (formData.pin.length < 10) {
      newErrors.pin = "PIN must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Sign in successful", formData);
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${authimg})` }}
    >
      <div className="max-w-md w-full space-y-2">
        {/* ─── Logo and Header ────────────────────────────────────── */}
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="AMESCO Logo"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h2 className="mt-4 text-2xl font-['Playfair_Display'] font-black text-[#261481]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-xs text-gray-600">
            Enter your credentials to access your application
          </p>
        </div>

        {/* ─── Form ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Reference Number */}
            <div>
              <label
                htmlFor="referenceNumber"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Form Reference Number
              </label>
              <div className="relative">
                <input
                  id="referenceNumber"
                  name="referenceNumber"
                  type="text"
                  value={formData.referenceNumber}
                  onChange={handleChange}
                  placeholder="e.g. 900000001"
                  className={`w-full px-4 py-2 rounded-xl border-2 outline-none transition-all duration-200 text-xs
                    ${
                      errors.referenceNumber
                        ? "border-[#E63946] focus:border-[#E63946]"
                        : "border-gray-300 focus:border-[#E63946]"
                    }`}
                />
                {errors.referenceNumber && (
                  <p className="text-[#E63946] text-xs mt-1">
                    {errors.referenceNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Form PIN */}
            <div>
              <label
                htmlFor="pin"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Form PIN
              </label>
              <div className="relative">
                <input
                  id="pin"
                  name="pin"
                  type="password"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit PIN"
                  maxLength={10}
                  className={`w-full px-4 py-2 rounded-xl border-2 outline-none transition-all duration-200 text-xs
                    ${
                      errors.pin
                        ? "border-[#E63946] focus:border-[#E63946]"
                        : "border-gray-300 focus:border-[#E63946]"
                    }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {formData.pin.length}/10
                </span>
                {errors.pin && (
                  <p className="text-[#E63946] text-xs mt-1">{errors.pin}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#E63946] rounded border-gray-300 focus:ring-[#E63946] cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-xs text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#E63946] hover:underline"
              >
                Forgot PIN?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl 
                text-white font-bold text-xs transition-all duration-300 
                hover:-translate-y-0.5 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: loading ? "#1a1a7a" : "#E63946",
                boxShadow: loading ? "none" : "0 8px 25px rgba(230,57,70,0.4)",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Apply Now Link */}
            <div className="text-center">
              <p className="text-xs text-gray-600">
                Don't have an application yet?{" "}
                <Link
                  to="/admissions/applyNow/applyNow"
                  className="font-semibold text-[#E63946] hover:underline text-xs"
                >
                  Apply Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
