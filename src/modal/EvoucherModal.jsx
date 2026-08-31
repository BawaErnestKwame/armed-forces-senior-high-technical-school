// EvoucherModal.jsx
import React, { useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EvoucherModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "mobile-money",
  });
  const [step, setStep] = useState(1); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    // Simulate payment processing
    setTimeout(() => {
      setStep(3);
    }, 3000);
  };

  const closeModal = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        paymentMethod: "mobile-money",
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <CloseIcon sx={{ fontSize: "24px", color: "#6b7280" }} />
        </button>

        {/* ═══ Step 1: Purchase Form ═══ */}
        {step === 1 && (
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="inline-block  p-3 rounded-2xl mb-4">
                <InventoryIcon sx={{ fontSize: "32px", color: "#0e07dd" }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Purchase Application eVoucher
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Enter your eVoucher details to proceed with the application
                purchase.
              </p>
              <div className="mt-4 inline-block bg-amber-50 px-6 py-2 rounded-full border-2 border-amber-200">
                <span className="text-2xl font-bold text-amber-700">
                  GHC 180
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                  Personal Information
                </h3>

                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method <span className="text-red-500">*</span>
                </label>

                <div className="space-y-3">
                  {/* Mobile Money */}
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "mobile-money"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodChange("mobile-money")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <PhoneIphoneIcon
                            sx={{ fontSize: "20px", color: "#16a34a" }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Mobile Money
                          </p>
                          <p className="text-xs text-gray-500">
                            Pay with MTN, Vodafone, or Airtel Money
                          </p>
                        </div>
                      </div>
                      {formData.paymentMethod === "mobile-money" && (
                        <CheckCircleIcon sx={{ color: "#b45309" }} />
                      )}
                    </div>
                  </div>

                  {/* Credit/Debit Card */}
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePaymentMethodChange("card")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CreditCardIcon
                            sx={{ fontSize: "20px", color: "#2563eb" }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Credit/Debit Card
                          </p>
                          <p className="text-xs text-gray-500">
                            Pay with Visa, Mastercard, or local cards
                          </p>
                        </div>
                      </div>
                      {formData.paymentMethod === "card" && (
                        <CheckCircleIcon sx={{ color: "#b45309" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-300 
                  hover:-translate-y-0.5 hover:shadow-2xl bg-[#E63946]"
              >
                Pay Now - GHC 180.00
              </button>
            </form>
          </div>
        )}

        {/* ═══ Step 2: Processing ═══ */}
        {step === 2 && (
          <div className="p-6 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Processing Payment...
            </h3>
            <p className="text-gray-500">
              Please wait while we process your payment
            </p>
          </div>
        )}

        {/* ═══ Step 3: Success ═══ */}
        {step === 3 && (
          <div className="p-6 md:p-12 text-center">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-6">
              <CheckCircleIcon sx={{ fontSize: "48px", color: "#16a34a" }} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-500 mb-2">
              Your eVoucher has been sent to your email and phone.
            </p>
            <p className="text-sm text-gray-400">
              Order ID:{" "}
              <span className="font-mono font-semibold">#EV-2024-7890</span>
            </p>
            <button
              onClick={closeModal}
              className="mt-6 px-8 py-3 rounded-xl text-white font-bold text-sm transition-all duration-300 
                hover:-translate-y-0.5 hover:shadow-2xl bg-gradient-to-r from-green-600 to-green-700"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EvoucherModal;
