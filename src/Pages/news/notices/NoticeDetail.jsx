import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Pin, ArrowLeft, Megaphone, FileDown } from "lucide-react";
import { getNoticeById } from "./noticesData";

const C = {
  accentRed: "#E63946",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const NoticeDetail = () => {
  const { id } = useParams();
  const notice = getNoticeById(id);

  if (!notice) return <Navigate to="/news/notices" replace />;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f8f9fa" }}
    >
      <div
        className="w-full py-16 px-6"
        style={{
          background: `linear-gradient(135deg, ${C.royalBlueDark}, ${C.royalBlue})`,
        }}
      >
        <motion.div
          className="max-w-[820px] mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {notice.pinned && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white px-2.5 py-1 rounded-full"
                style={{ background: C.accentRed }}
              >
                <Pin size={11} /> Pinned
              </span>
            )}
            <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-white/15 text-white">
              {notice.category}
            </span>
          </div>
          <h1 className="font-heading font-bold text-white text-2xl sm:text-4xl leading-tight mb-4">
            {notice.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <Calendar size={15} />
              {formatDate(notice.date)}
            </span>
            {notice.refCode && (
              <span className="font-mono text-white/60">Ref: {notice.refCode}</span>
            )}
          </div>
        </motion.div>
      </div>

      <section className="max-w-[820px] mx-auto px-6 py-14">
        <Link
          to="/news/notices"
          className="inline-flex items-center gap-2 text-sm font-bold no-underline mb-8"
          style={{ color: C.accentRed }}
        >
          <ArrowLeft size={16} /> Back to Notice Board
        </Link>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm p-8 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
              style={{ background: "rgba(38,20,129,.08)" }}
            >
              <Megaphone size={18} style={{ color: C.royalBlueDark }} />
            </div>
            <span className="text-sm font-semibold text-gray-500">
              School Management
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
            {notice.body}
          </p>

          {notice.attachment?.url && (
            <a
              href={notice.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-8 text-white font-bold text-sm px-5 py-3 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: C.royalBlueDark }}
            >
              <FileDown size={17} />
              {notice.attachment.label}
            </a>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default NoticeDetail;
