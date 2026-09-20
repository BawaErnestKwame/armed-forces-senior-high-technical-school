// TransactionStatus.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ReceiptText,
} from "lucide-react";
import ModalShell from "../../modal/ModalShell";

// Success is the only green; failure uses the brand red, pending the brand navy.
const STATUS = {
  success: {
    icon: CheckCircle2,
    title: "Payment Successful",
    text: "Your payment has been confirmed and your eVoucher has been generated.",
    box: "bg-[#2ecc71]/10 border-[#2ecc71]/40",
    iconColor: "#1fa85a",
  },
  failed: {
    icon: XCircle,
    title: "Payment Failed",
    text: "Your payment could not be processed. Please try again or contact support.",
    box: "bg-[#E63946]/5 border-[#E63946]/30",
    iconColor: "#E63946",
  },
  pending: {
    icon: Clock,
    title: "Payment Pending",
    text: "Your payment is being processed. We will notify you once it is confirmed.",
    box: "bg-[#261481]/5 border-[#261481]/20",
    iconColor: "#261481",
  },
};

const inputCls =
  "w-full px-4 py-3 rounded-xl text-[14px] text-gray-800 bg-white border-2 border-[#e5e7ef] hover:border-[#261481]/30 focus:border-[#261481] focus:ring-4 focus:ring-[#261481]/10 transition-all outline-none placeholder:text-gray-400";

const labelCls =
  "block text-[11px] font-bold uppercase tracking-[1px] mb-2 text-[#261481]";

const TransactionStatus = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'failed' | 'pending'
  const [transactionData, setTransactionData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setIsSubmitted(true);

    // Simulate API call
    timers.current.push(
      setTimeout(() => {
        // Mock response — in the real app this comes from the API
        const statuses = ["success", "success", "success", "pending", "failed"];
        const randomStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        setTransactionData({
          orderId: orderId || "EV-2024-7890",
          amount: "GHC 180.00",
          paymentMethod: "Mobile Money",
          date: "2024-12-15 14:30:00",
          eVoucherCode: "VCH-2024-XYZ789",
        });
        setStatus(randomStatus);
      }, 2000),
    );
  };

  const resetForm = () => {
    clearTimers();
    setOrderId("");
    setEmail("");
    setStatus(null);
    setTransactionData(null);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    onClose();
    timers.current.push(setTimeout(resetForm, 300));
  };

  const current = STATUS[status];
  const StatusIcon = current?.icon;

  const details = transactionData && [
    ["Order ID", transactionData.orderId],
    ["Amount", transactionData.amount],
    ["Payment Method", transactionData.paymentMethod],
    ["Date", transactionData.date],
  ];

  return (
    <ModalShell isOpen={isOpen} onClose={closeModal}>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#261481]/10 flex items-center justify-center mb-4">
            <ReceiptText size={28} className="text-[#261481]" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#261481]">
            Check Transaction Status
          </h2>
          <div className="w-12 h-0.5 rounded-full bg-[#E63946] mx-auto mt-3 mb-3" />
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Enter your order ID and email address to check the status of your
            eVoucher purchase.
          </p>
        </div>

        {/* ═══ Status Display ═══ */}
        {isSubmitted && status !== "loading" && current && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <div className={`rounded-2xl border-2 p-5 sm:p-6 ${current.box}`}>
              <div className="flex flex-col items-center text-center">
                <StatusIcon size={52} style={{ color: current.iconColor }} />
                <h3 className="text-xl font-bold mt-3 text-[#261481]">
                  {current.title}
                </h3>
                <p className="text-sm mt-1 text-gray-600">{current.text}</p>
              </div>

              {details && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {details.map(([k, v]) => (
                    <div key={k} className="bg-white rounded-lg p-3">
                      <p className="text-gray-500 text-xs">{k}</p>
                      <p className="font-semibold text-[#261481]">{v}</p>
                    </div>
                  ))}
                  {transactionData.eVoucherCode && (
                    <div className="sm:col-span-2 bg-white rounded-lg p-3">
                      <p className="text-gray-500 text-xs">eVoucher Code</p>
                      <p className="font-semibold text-[#261481] font-mono">
                        {transactionData.eVoucherCode}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {status === "success" && (
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-3 rounded-full bg-[#261481] text-white font-bold text-sm hover:bg-[#0a0850] transition-colors"
                  >
                    Download eVoucher
                  </button>
                  <Link
                    to="/admissions/applyNow/applyNow"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 rounded-full bg-[#E63946] text-white font-bold text-sm text-center hover:bg-[#c1121f] transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              )}

              {status === "failed" && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-5 w-full px-4 py-3 rounded-full bg-[#E63946] text-white font-bold text-sm hover:bg-[#c1121f] transition-colors"
                >
                  Retry Payment
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="mt-4 w-full px-4 py-3 rounded-full border-2 border-[#261481]/20 text-[#261481] font-bold text-sm hover:border-[#E63946] hover:text-[#E63946] transition-colors"
            >
              Check Another Transaction
            </button>
          </motion.div>
        )}

        {/* ═══ Loading State ═══ */}
        {status === "loading" && (
          <div className="py-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-[#e5e7ef] border-t-[#E63946] rounded-full animate-spin" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#261481] mb-2">
              Checking Status...
            </h3>
            <p className="text-gray-500">
              Please wait while we verify your transaction
            </p>
          </div>
        )}

        {/* ═══ Search Form ═══ */}
        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="orderId" className={labelCls}>
                Order ID <span className="text-[#E63946]">*</span>
              </label>
              <input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. EV-2024-7890"
                required
                className={inputCls}
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Enter the order ID you received via email or SMS
              </p>
            </div>

            <div>
              <label htmlFor="statusEmail" className={labelCls}>
                Email Address <span className="text-[#E63946]">*</span>
              </label>
              <input
                id="statusEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={inputCls}
              />
              <p className="text-xs text-gray-400 mt-1.5">
                The email address used for the purchase
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#E63946] hover:bg-[#c1121f] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ boxShadow: "0 8px 25px rgba(230,57,70,.35)" }}
            >
              <Search size={16} />
              Check Status
            </button>
          </form>
        )}

        {/* Help Section */}
        <div className="mt-6 pt-5 border-t border-[#e5e7ef] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm">
          <p className="text-gray-500">
            Need help?{" "}
            <Link
              to="/admissions/howToapply/howToApply"
              onClick={closeModal}
              className="text-[#E63946] hover:underline font-semibold"
            >
              How To Apply
            </Link>
          </p>
          <p className="text-gray-400">Didn't receive your order ID?</p>
        </div>
      </div>
    </ModalShell>
  );
};

export default TransactionStatus;
