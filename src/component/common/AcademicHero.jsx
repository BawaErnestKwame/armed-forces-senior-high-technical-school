import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AcademicHero = ({ image, title, subtitle }) => (
  <div
    className="relative w-full flex items-center justify-center overflow-hidden"
    style={{ minHeight: 340 }}
  >
    <motion.img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
      initial={{ scale: 1.12, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
    <div
      className="absolute inset-0"
      style={{ background: "rgba(10,8,80,.68)" }}
    />
    <motion.div
      className="relative z-10 text-center px-6 py-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={item}
        className="font-['Playfair_Display'] font-black text-white mb-4"
        style={{ fontSize: "clamp(38px, 6vw, 64px)" }}
      >
        {title}
      </motion.h1>
      <motion.div variants={item} className="flex flex-col justify-center mb-5">
        <div
          className="w-[70%] h-px mx-auto hidden lg:flex"
          style={{ background: "rgba(255,255,255,.3)" }}
        />
        <div className="w-16 h-0.5 mx-auto rounded-2xl bg-white" />
      </motion.div>
      <motion.p
        variants={item}
        className="text-white text-[15px] mb-6 max-w-[600px] mx-auto"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  </div>
);

export default AcademicHero;
