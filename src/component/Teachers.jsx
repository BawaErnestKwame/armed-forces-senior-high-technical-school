// component/Teachers.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import teacher from "../assets/teachers/teacher1.jpeg";

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
    img: teacher,
  },
  {
    id: 2,
    name: "Mrs. Abena Mensah",
    role: "Senior Teacher",
    img: teacher,
  },
  {
    id: 3,
    name: "Mr. Kofi Boateng",
    role: "Technical Instructor",
    img: teacher,
  },
  {
    id: 4,
    name: "Ms. Ama Owusu",
    role: "Arts Coordinator",
    img: teacher,
  },
  {
    id: 5,
    name: "Mr. Yaw Darko",
    role: "Senior Lecturer",
    img: teacher,
  },
  {
    id: 6,
    name: "Mrs. Efua Amponsah",
    role: "Home Economics Lead",
    img: teacher,
  },
];

const DURATION = 4000;
const SLIDE_MS = 600;
const GAP = 16;

// ── Responsive visible count
const getVisible = () => {
  if (typeof window === "undefined") return 5;
  if (window.innerWidth < 640) return 1; // mobile → 1 card
  if (window.innerWidth < 1024) return 2; // tablet → 2 cards
  return 5; // desktop → 5 cards (showing 5 since cards are square now)
};

// ─── Icons
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

// ─── Teacher Card ─────────────────────────────────────────────────────────────
const TeacherCard = ({ teacher, width }) => {
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        width,
        boxShadow: "0 2px 16px rgba(0,0,0,.07)",
      }}
    >
      {/* Image - square (4/4) */}
      <div
        className="w-full overflow-hidden bg-[#f0f0f0]"
        style={{
          aspectRatio: "4/4", // Square (width:height = 4:4)
        }}
      >
        <img
          src={teacher.img}
          alt={teacher.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
          draggable="false"
        />
      </div>

      {/* Content below image */}
      <div className="flex flex-col items-center px-4 py-4 relative z-10">
        <h4
          className="font-['Playfair_Display'] text-[16px] font-black mb-0.5 text-center"
          style={{ color: C.navy }}
        >
          {teacher.name}
        </h4>
        <p className="text-[12px] text-center" style={{ color: "#6b7280" }}>
          {teacher.role}
        </p>

        {/* Decorative line */}
        <div
          className="w-10 h-0.5 mt-2 rounded-full"
          style={{ background: C.accentRed }}
        />
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
          Leadership
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
