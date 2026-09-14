import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import AcademicHero from "../../../component/common/AcademicHero";
import heroImage from "../../../assets/gallery/gallery9.jpeg";
import { events, CATEGORIES, isUpcoming } from "./eventsData";

const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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

const EventCard = ({ event }) => (
  <motion.div variants={fadeUp} whileHover={{ y: -6 }}>
    <Link
      to={`/news/events/${event.id}`}
      className="block bg-white rounded-xl shadow-sm overflow-hidden no-underline h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span
          className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide text-white px-3 py-1 rounded-full"
          style={{ background: C.accentRed }}
        >
          {event.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold mb-3" style={{ color: C.accentRed }}>
          <Calendar size={14} />
          {formatDate(event.date)}
        </div>
        <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-2 leading-snug">
          {event.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {event.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <MapPin size={14} />
          {event.location}
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-sm font-bold"
          style={{ color: C.accentRed }}
        >
          Read More <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  </motion.div>
);

const Events = () => {
  const [tab, setTab] = useState("upcoming");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return events
      .filter((e) => (tab === "upcoming" ? isUpcoming(e) : !isUpcoming(e)))
      .filter((e) => category === "All" || e.category === category)
      .sort((a, b) =>
        tab === "upcoming"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      );
  }, [tab, category]);

  return (
    <div>
      <AcademicHero
        image={heroImage}
        title="School Events"
        subtitle="Stay up to date with academic, sporting, and cultural events happening across our school community."
      />

      <section className="mx-auto px-6 lg:px-24 max-w-[1220px] py-16">
        {/* Upcoming / Past toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            {["upcoming", "past"].map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative px-8 py-3.5 text-[14px] font-bold text-center cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="events-tab-highlight"
                      className="absolute inset-0"
                      style={{ background: C.accentRed }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 capitalize transition-colors duration-200 ${
                      isActive ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t} Events
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category filter */}
        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((c) => {
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

        {/* Events grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${category}`}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length ? (
              filtered.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full text-center text-gray-400 py-16">
                No {tab} events found in this category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Events;
