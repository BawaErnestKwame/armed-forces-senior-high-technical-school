import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AcademicHero from "./AcademicHero";
import ContactCard from "./ContactCard";

const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
  maroon: "#7A0C2E",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── Reusable "reveal on scroll" wrapper ─────────────────────────────────────
const Reveal = ({ children, className = "", variants = fadeUp, ...rest }) => (
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

const SectionHeading = ({ eyebrow, title }) => (
  <Reveal className="mb-10">
    <span
      className="text-[12px] font-bold tracking-[2px] uppercase"
      style={{ color: C.accentRed }}
    >
      {eyebrow}
    </span>
    <h2
      className="font-['Playfair_Display'] text-3xl sm:text-4xl font-black mt-2"
      style={{ color: C.royalBlueDark }}
    >
      {title}
    </h2>
  </Reveal>
);

const SubjectList = ({ heading, subjects }) => (
  <Reveal className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
    <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-5">
      {heading}
    </h3>
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col gap-3"
    >
      {subjects.map((s) => (
        <motion.li
          key={s}
          variants={fadeUp}
          className="flex items-center gap-3 text-sm text-gray-600"
        >
          <CheckCircle2
            size={18}
            className="shrink-0"
            style={{ color: C.accentRed }}
          />
          {s}
        </motion.li>
      ))}
    </motion.ul>
  </Reveal>
);

const ProfessorCard = ({ name, role, photo }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="bg-white rounded-xl shadow-sm p-6 text-center"
  >
    <img
      src={photo}
      alt={name}
      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
    />
    <h4 className="font-['Playfair_Display'] text-lg font-bold text-gray-900">
      {name}
    </h4>
    <p className="text-sm font-semibold mt-1" style={{ color: C.accentRed }}>
      {role}
    </p>
  </motion.div>
);

const FacilityCard = ({ title, desc, img }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
  >
    <img src={img} alt={title} className="w-full h-40 object-cover" />
    <div className="p-6 text-center">
      <h4 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// ── Sticky segmented tab bar — Overview / Curriculum / Program Professors ──
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "professors", label: "Program Professors" },
];

const TabBar = ({ active, onChange }) => (
  <div className="sticky top-[84px] z-30 mb-10">
    <div className="flex rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex-1 py-4 md:py-5 text-[13px] md:text-[15px] font-bold text-center border-r border-gray-200 last:border-r-0 cursor-pointer"
          >
            {isActive && (
              <motion.div
                layoutId="dept-tab-highlight"
                className="absolute inset-0"
                style={{ background: C.maroon }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-200 ${
                isActive ? "text-white" : "text-gray-900"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/**
 * Shared department page — hero + tabbed Overview/Curriculum/Program
 * Professors + facilities + entry requirements + apply CTA. Each academics
 * page passes its own copy.
 */
const DepartmentPage = ({
  heroImage,
  title,
  heroSubtitle,
  overview,
  coreSubjects,
  electiveSubjects,
  professors,
  facilities,
  requirements,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <AcademicHero image={heroImage} title={title} subtitle={heroSubtitle} />

      <section className="mx-auto px-6 lg:px-24 max-w-[1220px] py-16">
        <TabBar active={activeTab} onChange={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading eyebrow="Overview" title={`About ${title}`} />
              <p className="text-gray-500 leading-relaxed text-sm sm:text-base max-w-3xl">
                {overview}
              </p>
            </motion.div>
          )}

          {activeTab === "curriculum" && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading eyebrow="Curriculum" title="Subjects Offered" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SubjectList heading="Core Subjects" subjects={coreSubjects} />
                <SubjectList
                  heading="Elective Subjects"
                  subjects={electiveSubjects}
                />
              </div>
            </motion.div>
          )}

          {activeTab === "professors" && (
            <motion.div
              key="professors"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <SectionHeading eyebrow="Our Faculty" title="Program Professors" />
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {professors.map((p) => (
                  <ProfessorCard key={p.name} {...p} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Facilities ── */}
      <section className="py-16" style={{ background: "#f8f9fa" }}>
        <div className="mx-auto px-6 lg:px-24 max-w-[1220px]">
          <SectionHeading eyebrow="Learning Environment" title="Facilities & Practical Work" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {facilities.map((f) => (
              <FacilityCard key={f.title} {...f} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Entry requirements ── */}
      <section className="mx-auto px-6 lg:px-24 py-16 max-w-[1220px]">
        <SectionHeading eyebrow="Admissions" title="Entry Requirements" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <Reveal className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-3"
            >
              {requirements.map((r) => (
                <motion.li
                  key={r}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0"
                    style={{ color: C.accentRed }}
                  />
                  {r}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <ContactCard />
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <Reveal>
        <section
          className="mx-6 lg:mx-24 mb-16 rounded-2xl px-8 py-14 text-center"
          style={{
            background: `linear-gradient(135deg, ${C.royalBlueDark}, ${C.royalBlue})`,
          }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-black text-white mb-3">
            Ready to Join {title}?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Start your application today and take the first step toward your
            future at AMESCO.
          </p>
          <Link
            to="/admissions/applyNow/applyNow"
            className="inline-flex items-center gap-2.5 bg-[#E63946] text-white
              font-bold text-[15px] px-6 py-3.5 rounded-full no-underline
              transition-all duration-300 hover:bg-[#c1121f] hover:-translate-y-1
              shadow-[0_6px_24px_rgba(230,57,70,.45)]"
          >
            Apply Now <ArrowRight size={18} />
          </Link>
        </section>
      </Reveal>
    </div>
  );
};

export default DepartmentPage;
