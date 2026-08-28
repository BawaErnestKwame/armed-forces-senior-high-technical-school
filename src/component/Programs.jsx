// component/Programs.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gallery1 from "../assets/gallery/gallery1.jpg";
import gallery2 from "../assets/gallery/gallery2.jpg";
import gallery3 from "../assets/gallery/gallery3.jpg";
import gallery4 from "../assets/gallery/gallery4.jpg";
import gallery5 from "../assets/gallery/gallery5.webp";
import gallery6 from "../assets/gallery/gallery6.jpg";
import gallery7 from "../assets/gallery/gallery7.jpg";
import gallery8 from "../assets/gallery/gallery8.jpg";
import gallery9 from "../assets/gallery/gallery9.jpeg";
import gallery10 from "../assets/gallery/gallery10.jpg";
import gallery11 from "../assets/gallery/gallery11.jpg";

const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlueDark: "#261481",
  white: "#FFFFFF",
  mediumGray: "#e9ecef",
  navy: "#261481",
};

const GALLERY_IMAGES = [
  { id: 1, src: gallery1, alt: "Gallery Image 1" },
  { id: 2, src: gallery2, alt: "Gallery Image 2" },
  { id: 3, src: gallery3, alt: "Gallery Image 3" },
  { id: 4, src: gallery4, alt: "Gallery Image 4" },
  { id: 5, src: gallery5, alt: "Gallery Image 5" },
  { id: 6, src: gallery6, alt: "Gallery Image 6" },
  { id: 7, src: gallery7, alt: "Gallery Image 7" },
  { id: 8, src: gallery8, alt: "Gallery Image 8" },
  { id: 9, src: gallery9, alt: "Gallery Image 9" },
  { id: 10, src: gallery10, alt: "Gallery Image 10" },
  { id: 11, src: gallery11, alt: "Gallery Image 11" },
];

const DURATION = 4500;
const SLIDE_MS = 600;
const GAP = 15;

// ── Responsive visible count ──────────────────────────────────────────────────
const getVisible = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

// ─── Shared icons ─────────────────────────────────────────────────────────────
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

const IcoDots3 = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

// ─── Gallery Card ─────────────────────────────────────────────────────────────
const GalleryCard = ({ image, width }) => (
  <div
    className="relative flex-shrink-0 rounded-2xl overflow-hidden"
    style={{
      width,
      height: 280,
      boxShadow: "0 2px 16px rgba(0,0,0,.1)",
    }}
  >
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      draggable="false"
    />
  </div>
);

// ─── Gallery Section ─────────────────────────────────────────────────────────
const Gallery = () => {
  const [visible, setVisible] = useState(getVisible);
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(280);
  const trackRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const v = getVisible();
      setVisible(v);
      setIdx(0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalSlides = Math.max(1, GALLERY_IMAGES.length - visible + 1);

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

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, DURATION);
    return () => clearInterval(t);
  }, [goNext, paused]);

  const translateX = idx * (cardW + GAP);

  return (
    <section className="py-10 overflow-hidden" style={{ background: C.white }}>
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-24">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-6">
          <div>
            <div className="flex items-center font-extrabold gap-2">
              <IcoUsers />
              <span
                className="text-[12px] font-extrabold uppercase"
                style={{ color: C.accentRed }}
              >
                Our Gallery
              </span>
            </div>
            <h2
              className="font-['Playfair_Display'] font-black leading-[1.05]"
              style={{ fontSize: "clamp(32px,4vw,48px)", color: C.navy }}
            >
              Campus Moments
            </h2>
          </div>

          <Link
            to="/gallery"
            className="self-start inline-flex items-center gap-2.5 text-white font-bold
              text-[14px] px-4 py-3 rounded-full no-underline
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
            View All Photos <IcoDots3 />
          </Link>
        </div>

        {/* Carousel viewport */}
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
            {GALLERY_IMAGES.map((image) => (
              <GalleryCard key={image.id} image={image} width={cardW} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
              style={{
                width: i === idx ? 26 : 10,
                height: 10,
                background: i === idx ? C.accentRed : C.mediumGray,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
