// component/Teachers.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";

const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlue: "#0e07dd",
  royalBlueDark: "#261481",
  white: "#FFFFFF",
  lightGray: "#f8f9fa",
  mediumGray: "#e9ecef",
  darkGray: "#343a40",
  navy: "#261481",
};

const TEACHERS = [
  {
    id: 1,
    name: "Mr. Kwame Asante",
    role: "Head of Science",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85",
  },
  {
    id: 2,
    name: "Mrs. Abena Mensah",
    role: "Senior Teacher",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    id: 3,
    name: "Mr. Kofi Boateng",
    role: "Technical Instructor",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
  },
  {
    id: 4,
    name: "Ms. Ama Owusu",
    role: "Arts Coordinator",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=85",
  },
  {
    id: 5,
    name: "Mr. Yaw Darko",
    role: "Senior Lecturer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    id: 6,
    name: "Mrs. Efua Amponsah",
    role: "Home Economics Lead",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85",
  },
];

const DURATION = 4000;
const SLIDE_MS = 600;
const GAP = 16;

// ── Responsive visible count ──────────────────────────────────────────────────
const getVisible = () => {
  if (typeof window === "undefined") return 5;
  if (window.innerWidth < 640) return 1; // mobile  → 1 card
  if (window.innerWidth < 1024) return 2; // tablet  → 2 cards
  return 4; // desktop → 4 cards
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoUsers = () => (
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

// ─── Watermark — top-left ─────────────────────────────────────────────────────
const Watermark = () => (
  <svg
    className="absolute top-0 left-0 w-28 h-28 pointer-events-none select-none"
    style={{ opacity: 0.07 }}
    viewBox="0 0 112 112"
    fill="none"
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <line
        key={i}
        x1={-20 + i * 24}
        y1="0"
        x2={-20 + i * 24 + 112}
        y2="112"
        stroke="#1a1a2e"
        strokeWidth="18"
      />
    ))}
  </svg>
);

// ─── Teacher Card ─────────────────────────────────────────────────────────────
const TeacherCard = ({ teacher, width }) => {
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden flex-shrink-0"
      style={{ width, boxShadow: "0 2px 16px rgba(0,0,0,.07)" }}
    >
      <Watermark />
      <div className="flex flex-col items-center px-4 pt-5 pb-4 relative z-10">
        {/* Circle */}
        <div className="relative mb-3" style={{ width: 130, height: 130 }}>
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              border: `3px solid ${C.white}`,
              boxShadow: "0 8px 30px rgba(0,0,0,.15)",
            }}
          >
            <img
              src={teacher.img}
              alt={teacher.name}
              className="w-full h-full object-cover object-top"
              draggable="false"
            />
          </div>
        </div>

        {/* Name + role */}
        <div className="text-center mt-3">
          <h4
            className="font-['Playfair_Display'] text-[16px] font-black mb-0.5"
            style={{ color: C.navy }}
          >
            {teacher.name}
          </h4>
          <p className="text-[12px]" style={{ color: "#6b7280" }}>
            {teacher.role}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Teachers Section ─────────────────────────────────────────────────────────
const Teachers = () => {
  const [visible, setVisible] = useState(getVisible);
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(340);
  const trackRef = useRef(null);

  // Responsive: update visible count + reset index on resize
  useEffect(() => {
    const onResize = () => {
      const v = getVisible();
      setVisible(v);
      setIdx(0); // reset to first slide when breakpoint changes
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Total slide positions recalculated from visible
  const totalSlides = Math.max(1, TEACHERS.length - visible + 1);

  // Measure card width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const total = trackRef.current.offsetWidth;
      setCardW((total - GAP * (visible - 1)) / visible);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  const goTo = useCallback(
    (next) => {
      if (sliding) return;
      setSliding(true);
      setIdx(next);
      setTimeout(() => setSliding(false), SLIDE_MS);
    },
    [sliding],
  );

  const goNext = useCallback(() => {
    goTo((idx + 1) % totalSlides);
  }, [idx, totalSlides, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, DURATION);
    return () => clearInterval(t);
  }, [goNext, paused]);

  const translateX = idx * (cardW + GAP);

  return (
    <section
      className="relative py-10 overflow-hidden"
      style={{ background: C.lightGray }}
    >
      <div
        className="max-w-[1220px] mx-auto px-4 md:px-16 lg:px-24 relative"
        style={{ zIndex: 2 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <IcoUsers />
          <span
            className="text-[12px] font-extrabold tracking-[2px] uppercase"
            style={{ color: C.accentRed }}
          >
            Our Teachers
          </span>
        </div>

        <h2
          className="font-['Playfair_Display'] font-black leading-[1.05] mb-6"
          style={{ fontSize: "clamp(28px,3.4vw,38px)", color: C.navy }}
        >
          Honorable Teacher
        </h2>

        {/* Slider viewport */}
        <div
          ref={trackRef}
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex"
            style={{
              gap: GAP,
              transform: `translateX(-${translateX}px)`,
              transition: sliding
                ? `transform ${SLIDE_MS}ms cubic-bezier(0.4,0,0.2,1)`
                : "none",
            }}
          >
            {TEACHERS.map((t) => (
              <TeacherCard key={t.id} teacher={t} width={cardW} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-6">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
              style={{
                width: i === idx ? 26 : 10,
                height: 10,
                background: i === idx ? C.accentRed : "#c8bfb5",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
