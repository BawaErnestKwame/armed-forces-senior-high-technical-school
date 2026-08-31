// TransactionStatus.jsx
import React, { useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const TransactionStatus = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'failed', 'pending'
  const [transactionData, setTransactionData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setIsSubmitted(true);

    // Simulate API call
    setTimeout(() => {
      // Mock response - in real app, this would come from your API
      const mockResponse = {
        status: "success", // or 'failed', 'pending'
        orderId: orderId || "EV-2024-7890",
        amount: "GHT 180.00",
        paymentMethod: "Mobile Money",
        date: "2024-12-15 14:30:00",
        eVoucherCode: "VCH-2024-XYZ789",
        email: email || "john@example.com",
        phone: "+233 24 123 4567",
      };

      // Randomly assign status for demo
      const statuses = ["success", "success", "success", "pending", "failed"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      mockResponse.status = randomStatus;

      setTransactionData(mockResponse);
      setStatus(randomStatus);
    }, 2000);
  };

  const resetForm = () => {
    setOrderId("");
    setEmail("");
    setStatus(null);
    setTransactionData(null);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  if (!isOpen) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircleIcon sx={{ fontSize: "56px", color: "#16a34a" }} />;
      case "failed":
        return <CancelIcon sx={{ fontSize: "56px", color: "#dc2626" }} />;
      case "pending":
        return <PendingIcon sx={{ fontSize: "56px", color: "#f59e0b" }} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Payment Successful";
      case "failed":
        return "Payment Failed";
      case "pending":
        return "Payment Pending";
      default:
        return "";
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case "success":
        return "Your payment has been confirmed and your eVoucher has been generated.";
      case "failed":
        return "Your payment could not be processed. Please try again or contact support.";
      case "pending":
        return "Your payment is being processed. We will notify you once it is confirmed.";
      default:
        return "";
    }
  };

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

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 p-3 rounded-2xl mb-4">
              <InventoryIcon sx={{ fontSize: "32px", color: "#2563eb" }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Check Transaction Status
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Enter your order ID and email address to check the status of your
              eVoucher purchase.
            </p>
          </div>

          {/* ═══ Status Display ═══ */}
          {isSubmitted && status !== "loading" && (
            <div className="mb-8">
              <div className={`rounded-2xl border-2 p-6 ${getStatusColor()}`}>
                <div className="flex flex-col items-center text-center">
                  {getStatusIcon()}
                  <h3 className="text-xl font-bold mt-3">{getStatusText()}</h3>
                  <p className="text-sm mt-1">{getStatusDescription()}</p>
                </div>

                {/* Transaction Details */}
                {transactionData && (
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Order ID</p>
                      <p className="font-semibold text-gray-800">
                        {transactionData.orderId}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Amount</p>
                      <p className="font-semibold text-gray-800">
                        {transactionData.amount}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Payment Method</p>
                      <p className="font-semibold text-gray-800">
                        {transactionData.paymentMethod}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500 text-xs">Date</p>
                      <p className="font-semibold text-gray-800">
                        {transactionData.date}
                      </p>
                    </div>
                    {transactionData.eVoucherCode && (
                      <div className="col-span-2 bg-white/50 rounded-lg p-3">
                        <p className="text-gray-500 text-xs">eVoucher Code</p>
                        <p className="font-semibold text-gray-800 font-mono">
                          {transactionData.eVoucherCode}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {status === "success" && (
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                      Download eVoucher
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#E63946] text-white rounded-xl font-bold text-sm hover:bg-[#c1121f] transition-colors">
                      Apply Now
                    </button>
                  </div>
                )}

                {status === "failed" && (
                  <button className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                    Retry Payment
                  </button>
                )}
              </div>

              <button
                onClick={resetForm}
                className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
              >
                Check Another Transaction
              </button>
            </div>
          )}

          {/* ═══ Loading State ═══ */}
          {status === "loading" && (
            <div className="py-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
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
              {/* Order ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. EV-2024-7890"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter the order ID you received via email or SMS
                </p>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  The email address used for the purchase
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-300 
                  hover:-translate-y-0.5 hover:shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700
                  flex items-center justify-center gap-2"
              >
                <SearchIcon sx={{ fontSize: "20px" }} />
                Check Status
              </button>
            </form>
          )}

          {/* Help Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-500">
                Need help?{" "}
                <a
                  href="/admission/howToApply/howToApply"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  How To Apply
                </a>
              </p>
              <p className="text-gray-400">Didn't receive your order ID?</p>
            </div>
          </div>
        </div>
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

export default TransactionStatus;
