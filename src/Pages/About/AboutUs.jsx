import React, { useState } from "react";
import bgImage from "/src/assets/slider1.jpeg";
import { ArrowRight } from "lucide-react";
import banner from "../../assets/banner.jpg";
import gallery1 from "../../assets/gallery/gallery1.jpg";
import gallery2 from "../../assets/gallery/gallery2.jpg";
import gallery3 from "../../assets/gallery/gallery3.jpg";
import gallery4 from "../../assets/gallery/gallery4.jpg";
import gallery6 from "../../assets/gallery/gallery6.jpg";
import gallery8 from "../../assets/gallery/gallery8.jpg";
import gallery9 from "../../assets/gallery/gallery9.jpeg";
import gallery11 from "../../assets/gallery/gallery11.jpg";
import science from "../../assets/science.jpg";
import agric from "../../assets/agric.jpg";
import homeEconomics from "../../assets/home_economics.jpg";
import visual from "../../assets/visual.jpg";
import technical from "../../assets/technical.jpg";

const NAV_ITEMS = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "alumni", label: "Our Alumni" },
  { id: "administration", label: "Administration" },
  { id: "tour-campus", label: "Tour Our Campus" },
];

// Spots shown in the "Tour Our Campus" photo grid — swap images for real
// campus photos as they become available.
const CAMPUS_TOUR = [
  { name: "School Field", img: gallery2 },
  { name: "Music Room", img: gallery6 },
  { name: "Library", img: gallery8 },
  { name: "Dining Hall", img: gallery4 },
  { name: "Headmaster's Office", img: banner },
  { name: "ICT Laboratory", img: gallery3 },
  { name: "Technical Workshop", img: gallery11 },
  { name: "Assembly Hall", img: gallery1 },
  { name: "Main Gate", img: gallery9 },
  { name: "Science Laboratory", img: science },
  { name: "Agriculture Farm", img: agric },
  { name: "Home Economics Kitchen", img: homeEconomics },
  { name: "Visual Arts Studio", img: visual },
  { name: "Design & Technology Studio", img: technical },
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
  alumni: {
    heading: "Our Alumni Network",
    intro:
      "AMESCO alumni go on to lead in every sector — the Ghana Armed Forces, business, academia, technical trades, and public service. Our graduates carry the discipline, technical skill, and character built here into their careers, and many return to mentor current students, offer internships, and support school projects.",
    quote:
      "AMESCO gave me the foundation I needed to succeed. The community, the facilities, and the mentorship were unmatched.",
    quoteAuthor: "Kwame Boateng, Alumnus",
    closing:
      "Whether serving in uniform, running their own businesses, or advancing in technical and vocational fields, our alumni remain part of the AMESCO family — connected through reunions, mentorship programmes, and an active alumni association.",
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
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("who-we-are");
  const content = TAB_CONTENT[activeTab];

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
            className="font-heading font-bold text-white mb-4"
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
      <section className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-32 bg-gray-100 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-10 items-start">
        {/* ── Sidebar nav (sticky on scroll) ── */}
        <aside className="bg-white rounded-xl shadow-sm p-6 h-fit lg:sticky lg:top-6 self-start">
          <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
            AMESCO Inside
          </h2>
          <div className="w-10 h-0.5 bg-gray-900 mb-5" />

          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3">
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
            className="hidden lg:block w-full h-40 object-cover rounded-md mt-5"
          />
        </aside>

        {/* ── Main content ── */}
        <div>
          {activeTab === "tour-campus" ? (
            <>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Tour Our Campus
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm mb-10">
                Take a walk through AMESCO's facilities — from the classrooms
                and labs to the spaces where students learn, play, and grow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CAMPUS_TOUR.map((spot) => (
                  <div
                    key={spot.name}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <img
                      src={spot.img}
                      alt={spot.name}
                      className="w-full h-48 object-cover"
                    />
                    <p className="text-center font-semibold text-gray-900 py-3 text-sm">
                      {spot.name}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {content.heading}
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm mb-8">
                {content.intro}
              </p>

              {/* Quote card */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <span className="font-heading text-5xl text-gray-900 leading-none block mb-2">
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
