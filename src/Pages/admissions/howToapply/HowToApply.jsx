import React, { useState } from "react";
import bgImage from "/src/assets/slider1.jpeg";
import { Link } from "react-router-dom";
import gallery1 from "../../../assets/gallery/gallery1.jpg";
 import Person2Icon from "@mui/icons-material/Person2";
 import logo from "../../../assets/white_logo.png"
import image from "../../../assets/howtoapplyimg.png"


// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed: "#E63946",
  accentRedDark: "#c1121f",
  royalBlue: "#0e07dd",
  royalBlueDark: "#261481",
  royalBlueLight: "#5a7ae8",
  white: "#FFFFFF",
  lightGray: "#f8f9fa",
  mediumGray: "#e9ecef",
  darkGray: "#343a40",
  navy: "#261481",
  bodyText: "#4b5563",
};

const HowToApply = () => {
  // ─── State for accordion/expandable steps ──────────────────────────────
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  // ─── Application steps data ──────────────────────────────────────────────
  const applicationSteps = [
    {
      number: "01",
      title: "Obtain Application Form",
      description:
        "Download the application form from our website or collect a physical copy from the school administration office.",
      details: [
        "Forms are available from January to March each year",
        "A non-refundable application fee of GHS 50 applies",
        "Ensure you have a valid email address for correspondence",
      ],
    },
    {
      number: "02",
      title: "Complete the Form",
      description:
        "Fill in all required details accurately. Incomplete forms will not be processed.",
      details: [
        "Provide valid contact information",
        "Include previous school details and academic records",
        "Attach passport-sized photographs",
        "Indicate your preferred programmes",
      ],
    },
    {
      number: "03",
      title: "Submit Required Documents",
      description:
        "Submit the completed form along with all necessary supporting documents.",
      details: [
        "Birth certificate or proof of age",
        "Last two academic reports",
        "Testimonial from previous school",
        "Medical report",
        "Two reference letters",
      ],
    },
    {
      number: "04",
      title: "Entrance Examination",
      description:
        "All applicants are required to take the AMESCO entrance examination.",
      details: [
        "Exams are held in March/April annually",
        "Subjects: English, Mathematics, and General Science",
        "Past questions available for purchase at the school",
        "Examination fee: GHS 100",
      ],
    },
    {
      number: "05",
      title: "Interview & Selection",
      description:
        "Shortlisted candidates will be invited for an interview with the admissions committee.",
      details: [
        "Interviews are conducted in May",
        "Parents/Guardians are required to attend",
        "Selection is based on exam performance and interview",
        "Successful candidates will receive admission letters",
      ],
    },
    {
      number: "06",
      title: "Acceptance & Registration",
      description:
        "Accept your offer and complete the registration process to secure your place.",
      details: [
        "Acceptance deadline: 2 weeks from receipt of offer",
        "Pay the required acceptance and tuition fees",
        "Complete medical and boarding forms",
        "Attend orientation program in August",
      ],
    },
  ];

  return (
    <div>
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
            How to Apply
          </h1>
          <div className="flex flex-col justify-center mb-5">
            <div
              className="w-[70%] h-px mx-auto hidden lg:flex"
              style={{ background: "rgba(255,255,255,.3)" }}
            />
            <div className="w-16 h-0.5 mx-auto rounded-2xl bg-white" />
          </div>
          <p className="text-white text-[15px] mb-6 max-w-[600px] mx-auto">
            Join the prestigious Armed Forces Senior High School. Follow our
            simple application process to secure your place at AMESCO.
          </p>
        </div>
      </div>

      {/* ══ GET YOUR ADMISSION PROCESS ────────────────────────────────────── */}
      <section className="py-16" style={{ background: C.white }}>
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[12px] font-bold uppercase tracking-[2px]"
                  style={{ color: C.accentRed }}
                >
                  Get Your Admission Process
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: C.accentRed }}
                />
              </div>

              <h2
                className="font-['Playfair_Display'] text-[34px] sm:text-[40px] font-black leading-tight mb-4"
                style={{ color: C.navy }}
              >
                Your Journey to <br />
                <span style={{ color: C.accentRed }}>AMESCO</span> Begins Here
              </h2>

              <p
                className="text-[15px] leading-relaxed mb-6"
                style={{ color: C.bodyText }}
              >
                The Get Your Admission Process begins with preparing all
                necessary application documents, including academic transcripts,
                identification, and any required test scores. Once your
                materials are ready, complete the university's online
                application form with accurate personal and academic details.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/admissions/applyNow/applyNow"
                  className="inline-flex items-center gap-2.5 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{
                    background: C.accentRed,
                    boxShadow: `0 8px 25px rgba(230,57,70,0.4)`,
                  }}
                >
                  Apply Process
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
                </Link>
                <a
                  href="#steps"
                  className="inline-flex items-center gap-2.5 font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 border-2"
                  style={{
                    color: C.navy,
                    borderColor: C.navy,
                  }}
                >
                  View Steps ↓
                </a>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={gallery1}
                  alt="AMESCO Campus"
                  className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Decorative badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(230,57,70,0.1)" }}
                  >
                    <span className="text-xl" style={{ color: C.accentRed }}>
                   
                    <Person2Icon/>
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[1px]"
                      style={{ color: C.bodyText }}
                    >
                      Join Us
                    </p>
                    <p
                      className="font-bold text-[14px]"
                      style={{ color: C.navy }}
                    >
                      Apply Today!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ APPLICATION STEPS ────────────────────────────────────────────── */}
      <section id="steps" className="py-20" style={{ background: C.lightGray }}>
        <div className="max-w-[1220px] flex gap-4 flex-col md:flex mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <img src={image} alt="" className="rounded-2xl" />
           
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                  borderTop: `4px solid ${C.accentRed}`,
                }}
                onClick={() => toggleStep(index)}
              >
                {/* Step number */}
                <div
                  className="text-[40px] font-black leading-none mb-3"
                  style={{ color: C.accentRed }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3
                  className="font-['Playfair_Display'] text-[18px] font-bold mb-2"
                  style={{ color: C.navy }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[13.5px] leading-relaxed mb-3"
                  style={{ color: C.bodyText }}
                >
                  {step.description}
                </p>

                {/* Expandable details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openStep === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="space-y-2 pt-3 border-t border-gray-100">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-[13px] flex items-start gap-2"
                        style={{ color: C.bodyText }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: C.accentRed }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Toggle indicator */}
                <div
                  className="mt-3 text-[12px] font-semibold uppercase tracking-[1px]"
                  style={{ color: C.accentRed }}
                >
                  {openStep === index ? "▼ Read less" : "▶ Click for details"}
                </div>
              </div>
            ))}
          </div>

          {/* ══ CTA Section ────────────────────────────────────────────────── */}
          <div
            className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #0a0a5c 0%, #1a1a7a 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#E63946]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#0e07dd]/10 blur-3xl" />

            <div className="relative z-10">
              <h3 className="font-['Playfair_Display'] text-[28px] sm:text-[34px] font-bold text-white mb-3">
                Ready to Apply?
              </h3>
              <p className="text-gray-300 text-[15px] max-w-[550px] mx-auto mb-6">
                Take the first step towards a bright future at AMESCO. Download
                the application form or contact our admissions office for
                assistance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/admissions/applyNow/applyNow"
                  className="inline-flex items-center gap-2.5 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                  style={{
                    background: C.accentRed,
                    boxShadow: `0 8px 25px rgba(230,57,70,0.4)`,
                  }}
                >
                  Apply Now
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
                </Link>
                <a
                  href="mailto:armedforcesshts@yahoo.com"
                  className="inline-flex items-center gap-2.5 text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 border-2 border-white/30 hover:border-white/60"
                >
                  Contact Admissions
                </a>
              </div>
            </div>
          </div>

          {/* ══ Important Dates ───────────────────────────────────────────── */}
          <div
            className="mt-12 bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
          >
            <h3
              className="font-['Playfair_Display'] text-[22px] font-bold mb-6 text-center"
              style={{ color: C.navy }}
            >
              📅 Key Dates for 2026 Admission
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { date: "January 15", event: "Application Forms Available" },
                { date: "March 31", event: "Application Deadline" },
                { date: "April 15", event: "Entrance Examination" },
                { date: "May 20", event: "Interviews Begin" },
                { date: "June 10", event: "Admission Offers Sent" },
                { date: "June 30", event: "Acceptance Deadline" },
                { date: "August 15", event: "Orientation Day" },
                { date: "September 1", event: "Academic Year Begins" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-gray-50">
                  <p
                    className="font-bold text-[16px]"
                    style={{ color: C.accentRed }}
                  >
                    {item.date}
                  </p>
                  <p className="text-[13px]" style={{ color: C.bodyText }}>
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToApply;
