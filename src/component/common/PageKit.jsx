// PageKit.jsx — small building blocks shared by the inner pages
// (alumni, administration, academics, school-life sub-pages, legal, 404).
// Palette: navy = structure/headings, red = actions & highlights.
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const CARD_SHADOW = "0 4px 24px rgba(10,8,80,.07)";

export const Reveal = ({ children, className = "", variants = fadeUp, ...rest }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    {...rest}
  >
    {children}
  </motion.div>
);

/** A grid whose children (use `motion.div variants={fadeUp}`) stagger in. */
export const RevealGrid = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

/** Standard page section: consistent gutters, optional tinted background. */
export const Section = ({ children, tint = false, className = "" }) => (
  <section className={tint ? "bg-[#f3f4f8]" : "bg-white"}>
    <div
      className={`mx-auto max-w-[1220px] px-6 sm:px-8 lg:px-12 xl:px-16 py-14 lg:py-20 ${className}`}
    >
      {children}
    </div>
  </section>
);

export const SectionHeading = ({ eyebrow, title, text, center = false }) => (
  <Reveal className={`mb-10 ${center ? "text-center" : ""}`}>
    {eyebrow && (
      <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#E63946]">
        {eyebrow}
      </span>
    )}
    <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 text-[#261481]">
      {title}
    </h2>
    <div
      className={`w-14 h-0.5 rounded-full bg-[#E63946] mt-4 ${center ? "mx-auto" : ""}`}
    />
    {text && (
      <p
        className={`text-gray-500 leading-relaxed text-sm sm:text-base mt-4 max-w-2xl ${center ? "mx-auto" : ""}`}
      >
        {text}
      </p>
    )}
  </Reveal>
);

/** White card with the shared border + shadow. */
export const Card = ({ children, className = "" }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className={`bg-white rounded-2xl border border-[#e5e7ef] ${className}`}
    style={{ boxShadow: CARD_SHADOW }}
  >
    {children}
  </motion.div>
);

export const IconBadge = ({ icon: Icon, tone = "navy", size = 22 }) => (
  <span
    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
      tone === "red" ? "bg-[#E63946]/10" : "bg-[#261481]/10"
    }`}
  >
    <Icon size={size} className={tone === "red" ? "text-[#E63946]" : "text-[#261481]"} />
  </span>
);

/** Full-width navy call-to-action banner (matches the Apply Now sidebar). */
export const CtaBanner = ({ title, text, to, label, secondary }) => (
  <Reveal>
    <section
      className="mx-6 sm:mx-8 lg:mx-12 xl:mx-16 mb-16 rounded-3xl px-6 sm:px-8 py-12 sm:py-14 text-center"
      style={{ background: "linear-gradient(160deg, #261481 0%, #0a0850 100%)" }}
    >
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
        {title}
      </h2>
      <div className="w-14 h-0.5 rounded-full bg-[#E63946] mx-auto mb-4" />
      <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
        {text}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to={to}
          className="inline-flex items-center justify-center gap-2.5 bg-[#E63946] text-white font-bold text-[15px] px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-[#c1121f] hover:-translate-y-1 shadow-[0_6px_24px_rgba(230,57,70,.45)]"
        >
          {label} <ArrowRight size={18} />
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="inline-flex items-center justify-center gap-2.5 text-white font-bold text-[15px] px-7 py-3.5 rounded-full border-2 border-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white hover:-translate-y-1"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  </Reveal>
);
