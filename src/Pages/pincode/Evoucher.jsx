// Evoucher.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EvoucherModal from "../../modal/EvoucherModal";

const Evoucher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ Hero Section ═══ */}
      <div className="relative z-10 w-full bg-gradient-to-r from-[#03037f] to-[#1a1a8f] px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="py-10 md:py-16">
          {/* ─── Header ──────────────────────────────────────────────── */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-['Playfair_Display'] text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Application Portal
            </h1>
            <p className="mt-3 text-sm md:text-base text-blue-100 max-w-2xl mx-auto md:mx-0">
              Apply for admission to Ghana's premier mining and technology
              university. Purchase your eVoucher to get started.
            </p>
          </div>

          {/* ─── Action Buttons ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6 justify-center md:justify-start">
            {/* Log In Button */}
            <Link
              to="/signin"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                text-white font-bold text-sm transition-all duration-300 
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/30"
              style={{ background: "#E63946" }}
            >
              Log In
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="2" y1="8" x2="14" y2="8" />
                <polyline points="9,3 14,8 9,13" />
              </svg>
            </Link>

            {/* Purchase eVoucher Button - Opens Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                text-white font-bold text-sm transition-all duration-300 
                hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "#261481",
                boxShadow: "0 8px 25px rgba(38,20,129,0.4)",
              }}
            >
              <InventoryIcon sx={{ fontSize: "18px" }} />
              Purchase eVoucher
            </button>

            {/* Check Transaction Status Button */}
            <Link
              to="/transaction-status"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                text-white font-bold text-sm transition-all duration-300 
                hover:-translate-y-1 hover:shadow-2xl border-2 border-white/30
                hover:bg-white/10"
            >
              <InventoryIcon sx={{ fontSize: "18px" }} />
              Check Transaction Status
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ Payment Methods Section ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Purchase Your Application eVoucher
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your preferred payment method to get your{" "}
            <span className="text-amber-700 font-semibold">
              Armed Forces Senior High Technical School, Kumasi
            </span>{" "}
            application eVoucher
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* ─── Online Payment Card ────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <PaymentsIcon sx={{ fontSize: "28px", color: "#b45309" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Online Payment
                </h2>
                <p className="text-xs text-gray-500">
                  Pay securely online with instant payment methods
                </p>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {/* Mobile Money */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-green-100 p-2 rounded-lg">
                  <PhoneIphoneIcon
                    sx={{ fontSize: "18px", color: "#16a34a" }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    Mobile Money
                  </p>
                  <p className="text-xs text-gray-400">
                    MTN, Vodafone, AirtelTigo
                  </p>
                </div>
              </div>

              {/* Credit/Debit Cards */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CreditCardIcon sx={{ fontSize: "18px", color: "#2563eb" }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    Credit/Debit Cards
                  </p>
                  <p className="text-xs text-gray-400">
                    Visa, Mastercard, American Express
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                text-white font-bold text-sm transition-all duration-300 
                hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-r from-amber-600 to-amber-700"
            >
              <InventoryIcon sx={{ fontSize: "18px" }} />
              Purchase eVoucher
            </button>
          </div>

          {/* ─── Info / Support Card ────────────────────────────────── */}
          <div className="bg-gradient-to-br from-[#03037f] to-[#1a1a8f] rounded-2xl shadow-lg p-6 text-white flex flex-col">
            <div className="bg-white/10 p-3 rounded-xl inline-block w-fit mb-4">
              <InventoryIcon sx={{ fontSize: "28px" }} />
            </div>
            <h2 className="text-lg font-bold mb-2">Need Help?</h2>
            <ul className="space-y-3 text-sm text-blue-100 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>Instant delivery to your email and phone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>Secure payment with multiple options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 text-lg">✓</span>
                <span>24/7 customer support available</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-blue-200">
                <a
                  href="#"
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Contact Support →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Modal Component ═══ */}
      <EvoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Evoucher;
