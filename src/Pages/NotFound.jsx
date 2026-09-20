import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, GraduationCap, Mail } from "lucide-react";
import bgImage from "/src/assets/slider1.jpeg";

const LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/academics", label: "Academics", icon: GraduationCap },
  { to: "/contact", label: "Contact Us", icon: Mail },
];

const NotFound = () => (
  <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
    <img
      src={bgImage}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: "rgba(10,8,80,.82)" }} />

    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 text-center px-6 py-20 max-w-xl"
    >
      <p
        className="font-heading font-black text-white leading-none"
        style={{ fontSize: "clamp(96px, 22vw, 180px)" }}
      >
        4<span className="text-[#E63946]">0</span>4
      </p>
      <div className="w-16 h-0.5 rounded-full bg-[#E63946] mx-auto my-5" />
      <h1 className="font-heading text-white text-2xl sm:text-3xl font-bold mb-3">
        Page not found
      </h1>
      <p className="text-white/80 text-sm sm:text-base mb-8">
        The page you're looking for doesn't exist or may have moved. Let's get
        you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c1121f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_25px_rgba(230,57,70,.4)]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
        {LINKS.slice(1).map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
          >
            <Icon size={15} /> {label}
          </Link>
        ))}
      </div>
    </motion.div>
  </div>
);

export default NotFound;
