// EvoucherModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Ticket, Smartphone, CreditCard, CheckCircle2 } from "lucide-react";
import ModalShell from "./ModalShell";

const PRICE = "GHC 180";

const METHODS = [
  {
    id: "mobile-money",
    icon: Smartphone,
    title: "Mobile Money",
    text: "Pay with MTN, Vodafone, or Airtel Money",
  },
  {
    id: "card",
    icon: CreditCard,
    title: "Credit/Debit Card",
    text: "Pay with Visa, Mastercard, or local cards",
  },
];

const INITIAL = { fullName: "", email: "", phone: "", paymentMethod: "mobile-money" };

const inputCls =
  "w-full px-4 py-3 rounded-xl text-[14px] text-gray-800 bg-white border-2 border-[#e5e7ef] hover:border-[#261481]/30 focus:border-[#261481] focus:ring-4 focus:ring-[#261481]/10 transition-all outline-none placeholder:text-gray-400";

const labelCls =
  "block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-[#261481]";

const EvoucherModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL);
  const [step, setStep] = useState(1);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    // Simulate payment processing
    timers.current.push(setTimeout(() => setStep(3), 3000));
  };

  const closeModal = () => {
    clearTimers();
    onClose();
    // Reset after the exit animation
    timers.current.push(
      setTimeout(() => {
        setStep(1);
        setFormData(INITIAL);
      }, 300),
    );
  };

  return (
    <ModalShell isOpen={isOpen} onClose={closeModal}>
      {/* ═══ Step 1: Purchase Form ═══ */}
      {step === 1 && (
        <div className="p-6 md:p-8">
          <div className="text-center mb-7">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#261481]/10 flex items-center justify-center mb-4">
              <Ticket size={28} className="text-[#261481]" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#261481]">
              Purchase Application eVoucher
            </h2>
            <div className="w-12 h-0.5 rounded-full bg-[#E63946] mx-auto mt-3 mb-3" />
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Enter your eVoucher details to proceed with the application
              purchase.
            </p>
            <div className="mt-4 inline-block bg-[#E63946]/10 px-6 py-2 rounded-full border-2 border-[#E63946]/25">
              <span className="text-2xl font-bold text-[#E63946]">{PRICE}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-t border-[#e5e7ef] pt-6 space-y-4">
              <h3 className="text-[13px] font-bold text-[#261481] uppercase tracking-[1.5px]">
                Personal Information
              </h3>

              <div>
                <label htmlFor="fullName" className={labelCls}>
                  Full Name <span className="text-[#E63946]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelCls}>
                  Email Address <span className="text-[#E63946]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelCls}>
                  Phone Number <span className="text-[#E63946]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t border-[#e5e7ef] pt-6">
              <p className={`${labelCls} mb-3`}>
                Payment Method <span className="text-[#E63946]">*</span>
              </p>

              <div role="radiogroup" className="space-y-3">
                {METHODS.map(({ id, icon: Icon, title, text }) => {
                  const selected = formData.paymentMethod === id;
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      whileHover={{ x: 3 }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, paymentMethod: id }))
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                        selected
                          ? "border-[#E63946] bg-[#E63946]/5"
                          : "border-[#e5e7ef] hover:border-[#261481]/30"
                      }`}
                    >
                      <span className="w-10 h-10 rounded-lg bg-[#261481]/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-[#261481]" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-[#261481]">
                          {title}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {text}
                        </span>
                      </span>
                      {selected && (
                        <CheckCircle2
                          size={22}
                          className="text-[#E63946] shrink-0"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#E63946] hover:bg-[#c1121f] transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 8px 25px rgba(230,57,70,.35)" }}
            >
              Pay Now - {PRICE}.00
            </button>
          </form>
        </div>
      )}

      {/* ═══ Step 2: Processing ═══ */}
      {step === 2 && (
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 border-4 border-[#e5e7ef] border-t-[#E63946] rounded-full animate-spin" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#261481] mb-2">
            Processing Payment...
          </h3>
          <p className="text-gray-500">
            Please wait while we process your payment
          </p>
        </div>
      )}

      {/* ═══ Step 3: Success ═══ */}
      {step === 3 && (
        <div className="p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="inline-flex p-4 rounded-full mb-6"
            style={{ background: "rgba(46,204,113,.12)" }}
          >
            <CheckCircle2 size={48} style={{ color: "#2ecc71" }} />
          </motion.div>
          <h3 className="font-heading text-2xl font-bold text-[#261481] mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-500 mb-2">
            Your eVoucher has been sent to your email and phone.
          </p>
          <p className="text-sm text-gray-400">
            Order ID:{" "}
            <span className="font-mono font-semibold text-[#261481]">
              #EV-2024-7890
            </span>
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="mt-6 px-10 py-3 rounded-full text-white font-bold text-sm bg-[#261481] hover:bg-[#0a0850] transition-all duration-300 hover:-translate-y-0.5"
            style={{ boxShadow: "0 8px 25px rgba(38,20,129,.35)" }}
          >
            Done
          </button>
        </div>
      )}
    </ModalShell>
  );
};

export default EvoucherModal;
