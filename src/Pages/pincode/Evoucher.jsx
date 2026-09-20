// Evoucher.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Ticket,
  Search,
  Wallet,
  Smartphone,
  CreditCard,
  Check,
  LifeBuoy,
} from "lucide-react";
import bgImage from "/src/assets/slider1.jpeg";
import EvoucherModal from "../../modal/EvoucherModal";
import TransactionStatus from "./TransactionStatus";

// Brand palette shared with the rest of the site:
//   navy → structure & headings, red → actions & highlights.
const PAYMENT_METHODS = [
  {
    icon: Smartphone,
    title: "Mobile Money",
    text: "MTN, Vodafone, AirtelTigo",
  },
  {
    icon: CreditCard,
    title: "Credit/Debit Cards",
    text: "Visa, Mastercard, American Express",
  },
];

const PERKS = [
  "Instant delivery to your email and phone",
  "Secure payment with multiple options",
  "24/7 customer support available",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

const Evoucher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f8]">
      {/* ═══ Hero Section ═══ */}
      <div className="relative w-full overflow-hidden">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,8,80,.78)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
          {/* ─── Header ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-center md:text-left"
          >
            <h1 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Application Portal
            </h1>
            <div className="w-16 h-0.5 rounded-full bg-[#E63946] mt-4 mb-4 mx-auto md:mx-0" />
            <p className="text-sm md:text-base text-white/85 max-w-2xl mx-auto md:mx-0">
              Apply for admission to Armed Forces Senior High Technical School,
              Kumasi. Purchase your eVoucher to get started.
            </p>
          </motion.div>

          {/* ─── Action Buttons ────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 justify-center md:justify-start"
          >
            <Link
              to="/auth/signIn"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#E63946] hover:bg-[#c1121f] text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 8px 25px rgba(230,57,70,.4)" }}
            >
              Log In
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#261481] font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Ticket size={16} />
              Purchase eVoucher
            </button>

            <button
              type="button"
              onClick={() => setIsStatusModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white font-bold text-sm border-2 border-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white"
            >
              <Search size={16} />
              Check Transaction Status
            </button>
          </motion.div>
        </div>
      </div>

      {/* ═══ Payment Methods Section ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[#261481] mb-3">
            Purchase Your Application eVoucher
          </h2>
          <div className="w-16 h-0.5 rounded-full bg-[#E63946] mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your preferred payment method to get your{" "}
            <span className="text-[#E63946] font-semibold">
              Armed Forces Senior High Technical School, Kumasi
            </span>{" "}
            application eVoucher
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* ─── Online Payment Card ────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white rounded-2xl p-6 border border-[#e5e7ef] flex flex-col"
            style={{ boxShadow: "0 4px 24px rgba(10,8,80,.07)" }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 flex items-center justify-center shrink-0">
                <Wallet size={24} className="text-[#E63946]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#261481]">
                  Online Payment
                </h3>
                <p className="text-xs text-gray-500">
                  Pay securely online with instant payment methods
                </p>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {PAYMENT_METHODS.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#f3f4f8] border border-transparent hover:border-[#261481]/15 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#261481]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#261481]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#261481] text-sm">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-[#E63946] hover:bg-[#c1121f] text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{ boxShadow: "0 8px 25px rgba(230,57,70,.35)" }}
            >
              <Ticket size={16} />
              Purchase eVoucher
            </button>
          </motion.div>

          {/* ─── Info / Support Card ────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl p-6 text-white flex flex-col"
            style={{
              background: "linear-gradient(160deg, #261481 0%, #0a0850 100%)",
              boxShadow: "0 4px 24px rgba(10,8,80,.15)",
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <LifeBuoy size={24} />
            </div>
            <h3 className="text-lg font-bold mb-1">Need Help?</h3>
            <div className="w-10 h-0.5 rounded-full bg-[#E63946] mb-4" />

            <ul className="space-y-3 text-sm text-white/85 flex-1">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#E63946] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#f28482] transition-colors"
              >
                Contact Support
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ Modals ═══ */}
      <EvoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <TransactionStatus
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
    </div>
  );
};

export default Evoucher;
