// component/Departments.jsx
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import businessimg from '../assets/business.jpg'
import agric from "../assets/agric.jpg"
import science from '../assets/science.jpg'
import technical from '../assets/technical.jpg'
import visual from '../assets/visual.jpg'
import business from "../assets/business.jpg"


// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlueDark: "#261481",
  royalBlue: "#0e07dd",
  bg: "#ffffff",
};

// ─── Departments — AMESCO ────────────────────────────────────────────────────
const DEPTS = [
  {
    id: "science",
    name: "General Science",
    img: science,
    to: "/academics/general-science",
  },
  {
    id: "technical",
    name: "Technical",
    img: technical,
    to: "/academics/technical",
  },
  {
    id: "arts",
    name: "Visual Arts",
    img: visual,
    to: "/academics/visual-arts",
  },
  {
    id: "business",
    name: "Business",
    img: business,
    to: "/academics/business",
  },
];

const CARD_H = 380; // visible card height (px)
const STICKY_TOP = 100; // how far from top the card sticks (px)

const SLOT_H = CARD_H + 40;

// ─── Icons ───────────────────────────────────────────────────────────────────
const IcoGroup = () => (
  <svg
    className="w-[15px] h-[15px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.accentRed}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IcoArrow = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" y1="8" x2="14" y2="8" />
    <polyline points="9,3 14,8 9,13" />
  </svg>
);
const IcoDots = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

// ─── Single card — with parallax image ───────────────────────────────────────
const DeptCard = ({ dept, zIndex }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  // Parallax: shift image Y as card travels through viewport
  useEffect(() => {
    const onScroll = () => {
      if (!cardRef.current || !imgRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const cardMid = rect.top + rect.height / 2;
      const offset = (mid - cardMid) * 0.14;
      imgRef.current.style.transform = `scale(1.2) translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      to={dept.to}
      ref={cardRef}
      className="group relative block overflow-hidden rounded-2xl no-underline
        shadow-[0_8px_32px_rgba(0,0,0,.18)]"
      style={{ height: CARD_H, zIndex }}
    >
      {/* Parallax image — oversized so it can shift without gaps */}
      <img
        ref={imgRef}
        src={dept.img}
        alt={dept.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: "scale(1.2) translateY(0px)",
          transition: "transform 0.08s linear",
          willChange: "transform",
        }}
        draggable="false"
      />

      {/* Permanent dark gradient — bottom third */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)",
        }}
      />

      {/* Crimson overlay — rises on hover */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-b-2xl transition-all duration-500 ease-out
          h-0 group-hover:h-[50%]"
        style={{ background: `${C.accentRed}D0` }}
      />

      {/* Bottom text + CTA */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col gap-3">
        {/* Department name */}
        <h3
          className="font-['Playfair_Display'] text-[26px] font-black text-white
            transition-all duration-300 group-hover:-translate-y-2"
        >
          {dept.name}
        </h3>

        {/* View Details — appears on hover */}
        <div
          className="flex items-center gap-2 opacity-0 translate-y-4
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-y-0"
        >
          <span
            className="inline-flex items-center gap-2 border border-white/60
              text-white text-[13px] font-bold px-4 py-2 rounded-full
              transition-all duration-200
              hover:bg-white hover:text-[#E63946]"
          >
            View Details <IcoArrow />
          </span>
        </div>
      </div>
    </Link>
  );
};

// ─── Departments section ─────────────────────────────────────────────────────
const Departments = () => (
  <section className="py-20" style={{ background: C.bg }}>
    <div className="max-w-[1220px] mx-auto px-4 md:px-8 lg:px-24">
      {/* ── 2-column layout ── */}
      <div className="flex gap-16 items-start">
        {/* LEFT — sticky panel */}
        <div
          className="flex-shrink-0 w-[400px] hidden lg:flex flex-col gap-6"
          style={{
            position: "sticky",
            top: STICKY_TOP,
            alignSelf: "flex-start",
          }}
        >
          {/* Tag */}
          <div className="flex items-center gap-2">
            <IcoGroup />
            <span
              className="text-[12px] font-bold tracking-[2px] uppercase"
              style={{ color: C.accentRed }}
            >
              Our Departments
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-['Playfair_Display'] text-[40px] font-black leading-[1.1]"
            style={{ color: C.royalBlueDark }}
          >
            Academic Department
          </h2>

          {/* Sub */}
          <p className="text-[#6b7280] text-[15px] leading-relaxed">
            Enroll now to begin your transformative academic journey with us.
          </p>

          {/* CTA */}
          <Link
            to="/academics"
            className="self-start inline-flex items-center gap-2.5 text-white font-bold
              text-[14px] px-7 py-4 rounded-full no-underline
              transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: C.accentRed,
              boxShadow: `0 6px 20px rgba(230,57,70,.35)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.accentRedDark;
              e.currentTarget.style.boxShadow = `0 10px 28px rgba(230,57,70,.45)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.accentRed;
              e.currentTarget.style.boxShadow = `0 6px 20px rgba(230,57,70,.35)`;
            }}
          >
            Explore All Section
            <IcoDots />
          </Link>
        </div>

        {/* RIGHT — sticky card stack */}
        <div className="flex-1 min-w-0">
          {/* Mobile tag (shown when left panel is hidden) */}
          <div className="flex flex-col gap-4 mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <IcoGroup />
              <span
                className="text-[12px] font-bold tracking-[2px] uppercase"
                style={{ color: C.accentRed }}
              >
                Our Departments
              </span>
            </div>
            <h2
              className="font-['Playfair_Display'] text-[32px] font-black leading-[1.1]"
              style={{ color: C.royalBlueDark }}
            >
              Academic Department
            </h2>
            <Link
              to="/academics"
              className="self-start inline-flex items-center gap-2 text-white font-bold
                text-[13px] px-5 py-3 rounded-full no-underline"
              style={{ background: C.accentRed }}
            >
              Explore All Section <IcoDots />
            </Link>
          </div>

          <div className="relative">
            {DEPTS.map((dept, i) => (
              <div
                key={dept.id}
                /* Last card doesn't need the slot height — it just sits in flow */
                style={{ height: i < DEPTS.length - 1 ? SLOT_H : CARD_H }}
              >
                <div
                  className="w-full"
                  style={{
                    position: "sticky",
                    top: STICKY_TOP,
                    zIndex: i + 1,
                  }}
                >
                  <DeptCard dept={dept} zIndex={i + 1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Departments;
