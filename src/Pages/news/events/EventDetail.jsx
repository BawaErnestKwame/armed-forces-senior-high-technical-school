import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { getEventById, events } from "./eventsData";

const C = {
  accentRed: "#E63946",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Reveal = ({ children, className = "", ...rest }) => (
  <motion.div
    className={className}
    variants={fadeUp}
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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const EventDetail = () => {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) return <Navigate to="/news/events" replace />;

  const related = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);

  return (
    <div>
      <div
        className="relative w-full flex items-end overflow-hidden"
        style={{ minHeight: 380 }}
      >
        <motion.img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,8,80,.4), rgba(10,8,80,.85))" }}
        />
        <motion.div
          className="relative z-10 px-6 lg:px-24 pb-12 w-full max-w-[1220px] mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <span
            className="inline-block text-[11px] font-bold uppercase tracking-wide text-white px-3 py-1 rounded-full mb-4"
            style={{ background: C.accentRed }}
          >
            {event.category}
          </span>
          <h1 className="font-heading font-bold text-white text-3xl sm:text-5xl leading-tight max-w-3xl">
            {event.title}
          </h1>
        </motion.div>
      </div>

      <section className="mx-auto px-6 lg:px-24 max-w-[1220px] py-16">
        <Link
          to="/news/events"
          className="inline-flex items-center gap-2 text-sm font-bold no-underline mb-10"
          style={{ color: C.accentRed }}
        >
          <ArrowLeft size={16} /> Back to All Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <Reveal>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {event.description}
            </p>
          </Reveal>

          <Reveal className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h3 className="font-heading text-lg font-bold text-gray-900 mb-5">
              Event Details
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Calendar size={18} className="shrink-0" style={{ color: C.accentRed }} />
                {formatDate(event.date)}
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="shrink-0" style={{ color: C.accentRed }} />
                {event.time}
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0" style={{ color: C.accentRed }} />
                {event.location}
              </li>
            </ul>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2
              className="font-heading text-2xl sm:text-3xl font-bold mb-8"
              style={{ color: C.royalBlueDark }}
            >
              Related Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Reveal key={r.id}>
                  <Link
                    to={`/news/events/${r.id}`}
                    className="block bg-white rounded-xl shadow-sm overflow-hidden no-underline h-full"
                  >
                    <img src={r.image} alt={r.title} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <h4 className="font-heading font-bold text-sm text-gray-900 leading-snug">
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDetail;
