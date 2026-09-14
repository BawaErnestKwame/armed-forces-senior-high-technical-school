import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Trophy, Home as HomeIcon, HeartHandshake, ArrowRight } from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import heroImage from "../../assets/gallery/gallery9.jpeg";
import boardingImg from "../../assets/gallery/gallery1.jpg";
import clubsImg from "../../assets/gallery/gallery3.jpg";
import sportsImg from "../../assets/gallery/gallery2.jpg";
import worshipImg from "../../assets/gallery/gallery7.jpg";
import gallery4 from "../../assets/gallery/gallery4.jpg";
import gallery5 from "../../assets/gallery/gallery5.webp";
import gallery6 from "../../assets/gallery/gallery6.jpg";
import gallery8 from "../../assets/gallery/gallery8.jpg";
import gallery10 from "../../assets/gallery/gallery10.jpg";
import gallery11 from "../../assets/gallery/gallery11.jpg";

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
  show: { transition: { staggerChildren: 0.1 } },
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

const SectionHeading = ({ eyebrow, title, center }) => (
  <Reveal className={`mb-10 ${center ? "text-center" : ""}`}>
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

// ── Animated stat counters ─────────────────────────────────────────────────
const STATS = [
  { icon: HomeIcon, target: 4, suffix: "", label: "Boarding Houses" },
  { icon: Users, target: 15, suffix: "+", label: "Clubs & Societies" },
  { icon: Trophy, target: 10, suffix: "+", label: "Sports Teams" },
  { icon: HeartHandshake, target: 50, suffix: "+", label: "Annual Activities" },
];

const StatCounters = () => {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const steps = 50;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            if (step >= steps) {
              setCounts(STATS.map((s) => s.target));
              clearInterval(timer);
              return;
            }
            setCounts(STATS.map((s) => Math.floor((s.target / steps) * step)));
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
      {STATS.map(({ icon: Icon, suffix, label }, i) => (
        <motion.div
          key={label}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          <div
            className="flex items-center justify-center w-14 h-14 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,.15)" }}
          >
            <Icon size={24} color="#fff" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-white">
            {counts[i]}
            {suffix}
          </h3>
          <p className="text-white/75 text-sm font-semibold mt-1">{label}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ── Feature cards ────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: "Boarding & House Life",
    img: boardingImg,
    desc: "Four residential houses build discipline, independence, and lifelong friendships under the care of dedicated housemasters and housemistresses.",
  },
  {
    title: "Clubs & Societies",
    img: clubsImg,
    desc: "From Debate and JETS to Vision Club and the Interact Club, students explore their passions and build leadership skills outside the classroom.",
  },
  {
    title: "Sports & Athletics",
    img: sportsImg,
    desc: "Football, athletics, table tennis, and volleyball keep the school active, competitive, and ready for inter-school and zonal competitions.",
  },
  {
    title: "Worship & Community",
    img: worshipImg,
    desc: "Weekly worship services, entertainment nights, and community service projects nurture the moral and social growth of every student.",
  },
];

const FeatureCard = ({ title, img, desc }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
  >
    <img src={img} alt={title} className="w-full h-44 object-cover" />
    <div className="p-6">
      <h4 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

// ── Gallery ──────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [gallery4, gallery5, gallery6, gallery8, gallery10, gallery11];

const SchooLife = () => {
  return (
    <div>
      <AcademicHero
        image={heroImage}
        title="School Life"
        subtitle="Education goes beyond the classroom. Discover the boarding life, clubs, sports, and community that shape every AMESCO student."
      />

      {/* Intro */}
      <section className="mx-auto px-6 lg:px-24 max-w-[900px] py-16 text-center">
        <Reveal>
          <span
            className="text-[12px] font-bold tracking-[2px] uppercase"
            style={{ color: C.accentRed }}
          >
            Life at AMESCO
          </span>
          <h2
            className="font-['Playfair_Display'] text-3xl sm:text-4xl font-black mt-2 mb-5"
            style={{ color: C.royalBlueDark }}
          >
            More Than Academics
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            At Armed Forces Senior High Technical School, learning doesn't stop when the
            bell rings. Our boarding houses, clubs, sports teams, and worship services
            give every student the chance to build character, discipline, and lasting
            friendships alongside their academic journey.
          </p>
        </Reveal>
      </section>

      {/* Stat counters */}
      <section
        className="py-14"
        style={{ background: `linear-gradient(135deg, ${C.royalBlueDark}, ${C.royalBlue})` }}
      >
        <div className="mx-auto px-6 lg:px-24 max-w-[1220px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <StatCounters />
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto px-6 lg:px-24 max-w-[1220px] py-16">
        <SectionHeading eyebrow="Beyond The Classroom" title="Explore School Life" center />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-16" style={{ background: "#f8f9fa" }}>
        <div className="mx-auto px-6 lg:px-24 max-w-[1220px]">
          <SectionHeading eyebrow="Campus Moments" title="Photo Gallery" center />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={img}
                  alt={`Campus life ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <Reveal>
        <section
          className="mx-6 lg:mx-24 mb-16 rounded-2xl px-8 py-14 text-center"
          style={{ background: `linear-gradient(135deg, ${C.royalBlueDark}, ${C.royalBlue})` }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-black text-white mb-3">
            Ready to Become Part of Our Community?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Start your application today and experience boarding life, sports, and school
            spirit at AMESCO.
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

export default SchooLife;
