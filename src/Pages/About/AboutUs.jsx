import React, { useState, useEffect, useRef } from "react";
import bgImage from "/src/assets/slider1.jpeg";
import {
  ArrowRight,
  CreditCard,
  GraduationCap,
  Sparkles,
  Users,
  Globe,
  Star,
  Quote,
} from "lucide-react";
import banner from "../../assets/banner.jpg";

const NAV_ITEMS = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "history", label: "History" },
  { id: "administration", label: "Administration" },
  { id: "campus-map", label: "Campus Map" },
];

// Placeholder content per tab — replace copy/images as they're ready
const TAB_CONTENT = {
  "who-we-are": {
    heading: "About AMESCO School",
    intro:
      "At AMESCO, education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions, challenge conventions, and discover their potential through meaningful experiences. Our distinguished faculty members are leaders in their respective fields, dedicated to delivering world-class education that integrates theory with practical application. With cutting-edge facilities, modern laboratories, and a vibrant learning environment, we ensure that every student has the tools and support to excel academically and personally.",
    quote:
      "Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding. Through international collaborations, research initiatives, and innovation hubs, we provide opportunities for students to engage with global challenges and contribute to sustainable solutions.",
    quoteAuthor: "Kathryn Murphy",
    closing:
      "Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding. Through international collaborations, research initiatives, and innovation hubs, we provide opportunities for students to engage with global challenges and contribute to sustainable solutions. At the heart of AMESCO lies a commitment to excellence and inclusivity — gaining the skills, confidence, and perspective to lead in an ever-changing world.",
    images: [banner, banner], // TODO: swap second slot for a distinct image later
  },
  history: {
    heading: "Our History",
    intro:
      "Placeholder history content — add AMESCO founding story and milestones here.",
    quote:
      "Placeholder quote about the school's legacy and growth over the years.",
    quoteAuthor: "Kathryn Murphy",
    closing: "Placeholder closing paragraph for the history section.",
    images: [banner, banner],
  },
  administration: {
    heading: "Administration",
    intro:
      "Placeholder content introducing the leadership team and governance structure.",
    quote: "Placeholder quote from a member of the administration.",
    quoteAuthor: "Kathryn Murphy",
    closing: "Placeholder closing paragraph for the administration section.",
    images: [banner, banner],
  },
  "campus-map": {
    heading: "Campus Map",
    intro:
      "Placeholder content describing the campus layout and key buildings.",
    quote: "Placeholder quote about navigating or exploring the campus.",
    quoteAuthor: "Kathryn Murphy",
    closing: "Placeholder closing paragraph for the campus map section.",
    images: [banner, banner],
  },
};

// Stats shown in the dark banner.
// `target` is the raw number to count up to; `decimals` controls rounding (10.5K needs 1);
// `suffix` is appended after the number is formatted (e.g. "K", "+").
const STATS = [
  {
    icon: Users,
    target: 10.5,
    decimals: 1,
    suffix: "K",
    label: "Students Enrolled",
  },
  {
    icon: GraduationCap,
    target: 150,
    decimals: 0,
    suffix: "+",
    label: "Academic Staff",
  },
  {
    icon: Globe,
    target: 120,
    decimals: 0,
    suffix: "+",
    label: "Global Partners",
  },
];

// Vision cards
const VISION_CARDS = [
  {
    icon: CreditCard,
    title: "Affordability",
    desc: "AMESCO provides transparent, competitive tuition fees and flexible payment.",
  },
  {
    icon: GraduationCap,
    title: "Academics",
    desc: "At AMESCO, we offer world-class academic programs, expert faculty guidance.",
  },
  {
    icon: Sparkles,
    title: "Student Life",
    desc: "AMESCO students go beyond academics, offering vibrant activities and cultural events.",
  },
];

// Testimonials — shown two at a time in the "Student Feedback" carousel.
// `rating` drives the star display (supports halves, e.g. 4.5).
const TESTIMONIALS = [
  {
    name: "Alen Walker",
    role: "Manager",
    rating: 4.5,
    quote:
      "The Computer Science program at AMESCO is great. We work on real projects not just theory. The labs, mentors, and research opportunities gave me the edge.",
  },
  {
    name: "Abdur Rashid",
    role: "Founder & CEO",
    rating: 5.0,
    quote:
      "At AMESCO, our students are at the heart of everything we do. Their stories reflect our mission — empower, inspire, and prepare.",
  },
  {
    name: "Sarah Mensah",
    role: "Parent",
    rating: 4.5,
    quote:
      "Seeing my daughter grow in confidence at AMESCO has been wonderful. The faculty genuinely care about each student's progress.",
  },
  {
    name: "Kwame Boateng",
    role: "Alumnus",
    rating: 5.0,
    quote:
      "AMESCO gave me the foundation I needed to succeed. The community, the facilities, and the mentorship were unmatched.",
  },
  {
    name: "Linda Owusu",
    role: "Current Student",
    rating: 4.0,
    quote:
      "The campus life is vibrant and there's always something happening. I've made lifelong friends and learned so much here.",
  },
  {
    name: "Michael Asante",
    role: "Academic Staff",
    rating: 4.5,
    quote:
      "Teaching at AMESCO is rewarding — the resources and support for both staff and students make a real difference.",
  },
];

const TESTIMONIALS_PER_PAGE = 2;
const AUTO_ROTATE_MS = 4000;

/**
 * Counts a single number up from 0 to `target` once `active` becomes true.
 * Uses requestAnimationFrame so it stays smooth without stacking intervals,
 * and only ever runs once (guarded by hasRun) even if `active` flips again.
 */
const useCountUp = (target, active, decimals = 0, duration = 1500) => {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    let start = null;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad — starts fast, settles gently into the final number
      const eased = 1 - (1 - progress) * (1 - progress);

      setValue(target * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setValue(target); // snap to exact target, avoid float drift
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target, duration]);

  return value.toFixed(decimals);
};

/**
 * Single stat block — wraps useCountUp so each stat animates independently.
 */
const StatItem = ({ icon: Icon, target, decimals, suffix, label, active }) => {
  const displayValue = useCountUp(target, active, decimals);

  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="text-[#E63946]" size={26} />
      </div>
      <div>
        <p className="text-white text-3xl font-black leading-none">
          {displayValue}
          {suffix}
        </p>
        <p className="text-white/80 text-sm mt-1">{label}</p>
      </div>
    </div>
  );
};

/**
 * Renders 5 stars for a given rating (supports halves, e.g. 4.5).
 * Full stars: floor(rating). Half star: shown when the remainder >= 0.5,
 * built by clipping a filled star to 50% width over an empty one.
 */
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={16}
          className="fill-orange-400 text-orange-400"
        />
      ))}
      {hasHalf && (
        <span
          className="relative inline-block"
          style={{ width: 16, height: 16 }}
        >
          <Star
            size={16}
            className="absolute inset-0 text-gray-300 fill-gray-300"
          />
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star size={16} className="fill-orange-400 text-orange-400" />
          </span>
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={16}
          className="text-gray-300 fill-gray-300"
        />
      ))}
    </div>
  );
};

/**
 * One testimonial card — extracted so the sliding track below can render
 * every testimonial once (not just the "current" ones) and let CSS
 * transforms handle the motion.
 */
const TestimonialCard = ({ t }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 h-full">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900">
          {t.name}
        </h3>
        <p className="text-gray-500 text-sm">{t.role}</p>
      </div>
      <Quote className="text-gray-300" size={32} strokeWidth={1.5} />
    </div>

    <div className="flex items-center gap-3 mb-4">
      <span className="text-4xl font-black text-gray-900">
        {t.rating.toFixed(1)}
      </span>
      <StarRating rating={t.rating} />
    </div>

    <p className="italic text-gray-500 text-sm leading-relaxed">"{t.quote}"</p>
  </div>
);

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("who-we-are");
  const content = TAB_CONTENT[activeTab];

  // Tracks whether the stats banner has scrolled into view
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.3 }, // fires once 30% of the banner is visible
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // ── Testimonial carousel ────────────────────────────────────────────
  // Group testimonials into pages of TESTIMONIALS_PER_PAGE up front, so
  // each "page" is a fixed slide the track can transform between.
  const testimonialPages = [];
  for (let i = 0; i < TESTIMONIALS.length; i += TESTIMONIALS_PER_PAGE) {
    testimonialPages.push(TESTIMONIALS.slice(i, i + TESTIMONIALS_PER_PAGE));
  }
  const totalPages = testimonialPages.length;

  const [testimonialPage, setTestimonialPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const id = setInterval(() => {
      setTestimonialPage((prev) => (prev + 1) % totalPages);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(id);
  }, [isPaused, totalPages]);

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
            About Us
          </h1>
          <div className="flex flex-col justify-center mb-5">
            <div
              className="w-[70%] h-px mx-auto hidden lg:flex"
              style={{ background: "rgba(255,255,255,.3)" }}
            />
            <div className="w-16 h-0.5 mx-auto rounded-2xl bg-white" />
          </div>
          <p className="text-white text-[15px] mb-6 max-w-[600px] mx-auto">
            Education goes beyond textbooks and classrooms. We believe in
            empowering students to explore their passions challenge conventions
            at AMESCO.
          </p>
        </div>
      </div>

      {/* ══ ABOUT SECTION (sidebar + content) ───────────────────────────── */}
      <section className="mx-auto px-6 bg-gray-100 lg:px-32 py-16 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">
        {/* ── Sidebar nav (sticky on scroll) ── */}
        <aside className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6 self-start">
          <h2 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-2">
            AMESCO Inside
          </h2>
          <div className="w-10 h-0.5 bg-gray-900 mb-5" />

          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#E63946] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
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

        {/* ── Main content ── */}
        <div>
          <h2 className="font-['Playfair_Display'] text-4xl font-black text-gray-900 mb-4">
            {content.heading}
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm mb-8">
            {content.intro}
          </p>

          {/* Quote card */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <span className="font-['Playfair_Display'] text-5xl text-gray-900 leading-none block mb-2">
              ''
            </span>
            <p className="italic text-gray-800 text-sm leading-relaxed mb-4">
              "{content.quote}"
            </p>
            <p className="font-semibold text-gray-900">
              - {content.quoteAuthor}
            </p>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            {content.closing}
          </p>

          {/* Image grid with overlapping seal */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${content.heading} ${i}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* ══ STATS BANNER ─────────────────────────────────────────────── */}
          <div
            ref={statsRef}
            className="relative w-full rounded-2xl overflow-hidden mt-16"
          >
            <img
              src={banner}
              alt="AMESCO Campus"
              className="absolute inset-0 w-full h-full object-cover grayscale"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,.55)" }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around gap-8 px-8 py-10">
              {STATS.map((stat) => (
                <StatItem key={stat.label} {...stat} active={statsVisible} />
              ))}
            </div>
          </div>

          {/* ══ OUR VISION ───────────────────────────────────────────────── */}
          <div className="mt-16">
            <h2 className="font-['Playfair_Display'] text-4xl font-black text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm mb-10">
              Our vision is to create a world where education empowers every
              individual to achieve their fullest potential. We strive to be a
              leading global institution recognized for academic excellence,
              innovation, and social responsibility. Our goal is to nurture
              creative thinkers, ethical leaders, and lifelong learners who
              contribute positively to society. Through cutting-edge research,
              inclusive learning environments, and global partnerships, we
              inspire change and foster sustainable development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VISION_CARDS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                    <Icon className="text-gray-900" size={28} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ══ STUDENT FEEDBACK (auto-rotating carousel) ───────────────── */}
          <div
            className="mt-16"
            // Pause auto-rotation while the user's mouse is over the carousel
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <h2 className="font-['Playfair_Display'] text-4xl font-black text-gray-900 mb-4">
              Student Feedback
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm mb-10 max-w-2xl">
              Our vision is to create a world where education empowers every
              individual to achieve their fullest potential. We strive to be a
              leading global institution recognized for academic excellence,
              innovation, and social responsibility. Our goal.
            </p>

            {/* Sliding track: width = totalPages * 100%, each slide = 100%/totalPages.
                Shifting by testimonialPage * (100 / totalPages)% brings the next
                page into view with a CSS transition instead of a hard swap. */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  width: `${totalPages * 100}%`,
                  transform: `translateX(-${(100 / totalPages) * testimonialPage}%)`,
                }}
              >
                {testimonialPages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 pr-0"
                    style={{ width: `${100 / totalPages}%`, flexShrink: 0 }}
                  >
                    {page.map((t) => (
                      <TestimonialCard key={t.name} t={t} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination dots — clicking jumps directly and resets the auto-rotate timer via state change */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonialPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialPage(i)}
                  aria-label={`Go to testimonial page ${i + 1}`}
                  className={`rounded-full transition-all ${
                    testimonialPage === i
                      ? "w-3 h-3 bg-[#7A0C2E]"
                      : "w-2.5 h-2.5 bg-gray-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
