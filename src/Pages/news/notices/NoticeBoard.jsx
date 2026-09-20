import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Calendar, ArrowRight, Megaphone } from "lucide-react";
import AcademicHero from "../../../component/common/AcademicHero";
import heroImage from "../../../assets/gallery/gallery9.jpeg";
import { notices, NOTICE_CATEGORIES } from "./noticesData";

const C = {
  accentRed: "#E63946",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

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

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const NoticeRow = ({ notice }) => (
  <motion.div variants={fadeUp}>
    <Link
      to={`/news/notices/${notice.id}`}
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white rounded-xl shadow-sm p-6 no-underline transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={
        notice.pinned
          ? { borderLeft: `4px solid ${C.accentRed}` }
          : { borderLeft: "4px solid transparent" }
      }
    >
      <div
        className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
        style={{ background: "rgba(38,20,129,.08)" }}
      >
        <Megaphone size={20} style={{ color: C.royalBlueDark }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {notice.pinned && (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white px-2.5 py-1 rounded-full"
              style={{ background: C.accentRed }}
            >
              <Pin size={11} /> Pinned
            </span>
          )}
          <span
            className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
            style={{ background: "rgba(38,20,129,.08)", color: C.royalBlueDark }}
          >
            {notice.category}
          </span>
        </div>
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-1.5 leading-snug">
          {notice.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-1.5">
          {notice.excerpt}
        </p>
        {notice.refCode && (
          <p className="text-[11px] font-mono text-gray-400">Ref: {notice.refCode}</p>
        )}
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 sm:pl-4 sm:border-l sm:border-gray-100 sm:min-w-[140px]">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
          <Calendar size={13} />
          {formatDate(notice.date)}
        </span>
        <span
          className="inline-flex items-center gap-1 text-sm font-bold"
          style={{ color: C.accentRed }}
        >
          View <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  </motion.div>
);

const NoticeBoard = () => {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return notices
      .filter((n) => category === "All" || n.category === category)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.date) - new Date(a.date);
      });
  }, [category]);

  return (
    <div>
      <AcademicHero
        image={heroImage}
        title="Notice Board"
        subtitle="Official announcements, deadlines, and updates from school management."
      />

      <section className="mx-auto px-6 lg:px-24 max-w-[900px] py-16">
        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {NOTICE_CATEGORIES.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: C.accentRed, borderColor: C.accentRed, color: "#fff" }
                    : { background: "#fff", borderColor: "#e5e7eb", color: "#374151" }
                }
              >
                {c}
              </button>
            );
          })}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            {filtered.length ? (
              filtered.map((notice) => <NoticeRow key={notice.id} notice={notice} />)
            ) : (
              <p className="text-center text-gray-400 py-16">
                No notices found in this category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default NoticeBoard;
