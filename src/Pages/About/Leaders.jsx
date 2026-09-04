import React, { useState } from "react";
import bgImage from "/src/assets/slider1.jpeg";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/teachers/teacher1.jpeg";
import banner from "../../assets/banner.jpg";

const CATEGORIES = [
  { id: "administration", label: "Administration" },
  { id: "teaching-staff", label: "Teaching Staff" },
  { id: "non-teaching-staff", label: "Non-Teaching Staff" },
];

// Placeholder staff data per category — swap names/titles/photos when ready.
const STAFF_DATA = {
  administration: [
    { name: "Dr. Kwame Asante", title: "Principal", photo: image },
    {
      name: "Mrs. Abena Owusu",
      title: "Vice Principal, Academics",
      photo: image,
    },
    {
      name: "Mr. Yaw Boateng",
      title: "Vice Principal, Administration",
      photo: image,
    },
    { name: "Mrs. Efua Mensah", title: "Registrar", photo: image },
  ],
  "teaching-staff": [
    { name: "Mr. Kofi Adjei", title: "Head, Mathematics Dept.", photo: image },
    { name: "Mrs. Ama Serwaa", title: "Head, Science Dept.", photo: image },
    { name: "Mr. Kwabena Osei", title: "Head, Languages Dept.", photo: image },
    { name: "Ms. Adjoa Frimpong", title: "Head, ICT Dept.", photo: image },
    { name: "Mr. Prince Darko", title: "Mathematics Teacher", photo: image },
    { name: "Mrs. Grace Appiah", title: "English Teacher", photo: image },
  ],
  "non-teaching-staff": [
    { name: "Mr. Samuel Amoah", title: "Finance Officer", photo: image },
    { name: "Mrs. Comfort Asare", title: "Librarian", photo: image },
    { name: "Mr. Emmanuel Tetteh", title: "IT Support Officer", photo: image },
    { name: "Mrs. Rita Nkrumah", title: "Front Desk Officer", photo: image },
  ],
};

// Stagger container for the grid — children animate in one after another
const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

// Each card fades up into place
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Leaders = () => {
  const [activeCategory, setActiveCategory] = useState("administration");
  const staff = STAFF_DATA[activeCategory];

  return (
    <>
      {/* ══ HERO BANNER ──────────────────────────────────────────────────── */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: 340 }}
      >
        <img
          src={bgImage}
          alt="AMESCO Campus"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,8,80,.68)" }}
        />
        <div className="relative z-10 text-center px-6 py-16">
          <h1
            className="font-['Playfair_Display'] font-black text-white mb-4"
            style={{ fontSize: "clamp(38px, 6vw, 64px)" }}
          >
            Our Leaders
          </h1>
          <div className="flex flex-col justify-center mb-5">
            <div
              className="w-[70%] h-px mx-auto hidden lg:flex"
              style={{ background: "rgba(255,255,255,.3)" }}
            />
            <div className="w-16 h-0.5 mx-auto rounded-2xl bg-white" />
          </div>
          <p className="text-white text-[15px] mb-6 max-w-[600px] mx-auto">
            Meet the people guiding AMESCO — from school leadership to the
            teachers and staff who make it all happen every day.
          </p>
        </div>
      </div>

      {/* ══ LEADERS SECTION (sidebar + content) ─────────────────────────── */}
      <section className="mx-auto px-8 bg-gray-100 lg:px-44 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
        {/* ── Sidebar nav (sticky on scroll) ── */}
        <aside className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6 self-start">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-2">
            AMESCO Inside
          </h2>
          <div className="w-10 h-0.5 bg-gray-900 mb-5" />

          <nav className="flex flex-col gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between px-2 py-3 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#E63946] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                  <ArrowRight size={16} />
                </button>
              );
            })}
          </nav>

          <img
            src={banner}
            alt="AMESCO Campus Building"
            className="w-full h-40 object-cover rounded-md mt-5"
          />
        </aside>

        {/* ── Staff grid ── */}
        <div>
          <h2 className="font-['Playfair_Display'] text-4xl font-black text-gray-900 mb-8">
            {CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </h2>

          {/* AnimatePresence lets the outgoing grid fade out before the new
              one (keyed by activeCategory) fades/staggers in */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {staff.map((person) => (
                <motion.div
                  key={person.name}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-sm overflow-hidden text-center"
                >
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-1">
                      {person.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{person.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Leaders;
