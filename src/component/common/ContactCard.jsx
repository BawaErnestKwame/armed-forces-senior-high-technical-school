import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bgImg from "../../assets/aboutimage.jpeg";
import logo from "../../assets/white_logo.png";

const ContactCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-[300px] lg:ml-auto sticky self-start"
    style={{ top: 84 }}
  >
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,.25)] aspect-[3/4]"
    >
      <motion.img
        src={bgImg}
        alt=""
        aria-hidden="true"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        variants={{
          rest: { backgroundColor: "rgba(10,8,80,.74)" },
          hover: { backgroundColor: "rgba(10,8,80,.88)" },
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      />

      <div className="relative z-10 h-full px-6 pt-14 pb-9 flex flex-col items-center text-center justify-between">
        {/* Badge */}
        <motion.div
          variants={{
            rest: { scale: 1, boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
            hover: {
              scale: 1.15,
              boxShadow: "0 0 0 8px rgba(255,255,255,.12)",
            },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#261481]/80 border-4 border-white/15 flex items-center justify-center"
        >
          <motion.img
            src={logo}
            alt="AMESCO"
            variants={{ rest: { opacity: 0.9 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="w-11 h-11 object-contain"
          />
        </motion.div>

        <h3 className="font-['Playfair_Display'] text-xl font-black text-white mt-6">
          Need Help?
        </h3>

        <div className="flex flex-col items-center gap-2">
          <a
            href="tel:+233248732262"
            className="text-white text-xl font-black no-underline"
          >
            +233 24 873 2262
          </a>
          <a
            href="mailto:armedforcesshts@yahoo.com"
            className="text-white/75 text-sm no-underline"
          >
            armedforcesshts@yahoo.com
          </a>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-[#261481] font-bold text-sm px-6 py-3 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Contact Now <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

export default ContactCard;
