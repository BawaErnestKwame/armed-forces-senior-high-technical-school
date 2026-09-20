// ModalShell.jsx — shared backdrop + panel for the eVoucher popups
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ModalShell = ({ isOpen, onClose, children }) => {
  // Close on Escape and lock page scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: "rgba(10,8,80,.65)" }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="sticky top-0 z-10 h-1.5 bg-[#E63946]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full text-[#261481] hover:bg-[#261481]/10 transition-colors"
            >
              <X size={20} />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalShell;
