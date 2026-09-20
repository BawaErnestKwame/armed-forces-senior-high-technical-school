import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FlaskConical,
  Wrench,
  Briefcase,
  BookOpenText,
  Palette,
  ChefHat,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import {
  Section,
  SectionHeading,
  RevealGrid,
  Card,
  Reveal,
  CtaBanner,
  fadeUp,
} from "../../component/common/PageKit";
import heroImage from "../../assets/gallery/gallery9.jpeg";
import scienceImg from "../../assets/science.jpg";
import technicalImg from "../../assets/technical.jpg";
import businessImg from "../../assets/business.jpg";
import artsImg from "../../assets/gallery/gallery1.jpg";
import visualImg from "../../assets/visual.jpg";
import homeEcoImg from "../../assets/home_economics.jpg";
import agricImg from "../../assets/agric.jpg";

// Kept in the same order as the navbar's Academics menu.
const PROGRAMMES = [
  {
    icon: FlaskConical,
    title: "General Science",
    img: scienceImg,
    to: "/academics/general-science",
    text: "Physics, chemistry, biology and mathematics in modern labs — the route to medicine, engineering and research.",
  },
  {
    icon: Wrench,
    title: "Technical",
    img: technicalImg,
    to: "/academics/technical/technical",
    text: "Woodwork, metalwork, electronics and building construction for skilled trades and engineering pathways.",
  },
  {
    icon: Briefcase,
    title: "Business",
    img: businessImg,
    to: "/academics/business/business",
    text: "Accounting, management and economics grounded in real-world practice.",
  },
  {
    icon: BookOpenText,
    title: "General Arts",
    img: artsImg,
    to: "/academics/generalarts/generalArts",
    text: "Literature, government, history and languages that sharpen critical thinking and communication.",
  },
  {
    icon: Palette,
    title: "Visual Arts",
    img: visualImg,
    to: "/academics/visualArts/visualArt",
    text: "Painting, sculpture, graphic design and picture-making for careers in design and the fine arts.",
  },
  {
    icon: ChefHat,
    title: "Home Economics",
    img: homeEcoImg,
    to: "/academics/home-economics/homeEconomics",
    text: "Food and nutrition, clothing and textiles — practical training for hospitality and fashion.",
  },
  {
    icon: Sprout,
    title: "Agricultural Science",
    img: agricImg,
    to: "/academics/agric/agriculture",
    text: "Crop and animal husbandry, soil science and farm management for agribusiness careers.",
  },
];

const CORE_SUBJECTS = [
  "English Language",
  "Core Mathematics",
  "Integrated Science",
  "Social Studies",
];

const Academics = () => (
  <div>
    <AcademicHero
      image={heroImage}
      title="Academics"
      subtitle="Seven programmes, one standard of excellence. Choose the pathway that fits your strengths and your future."
    />

    <Section>
      <SectionHeading
        eyebrow="Our Programmes"
        title="Find Your Pathway"
        text="Every programme combines rigorous classroom teaching with hands-on practical work. Select one to see its subjects, facilities and entry requirements."
        center
      />

      <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMMES.map(({ icon: Icon, title, img, to, text }) => (
          <Card key={title} className="overflow-hidden flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(10,8,80,.75) 100%)",
                }}
              />
              <span className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center text-white">
                <Icon size={18} />
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-heading text-xl font-bold text-[#261481] mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {text}
              </p>
              <Link
                to={to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#E63946] hover:text-[#c1121f] transition-colors"
              >
                Explore programme <ArrowRight size={16} />
              </Link>
            </div>
          </Card>
        ))}
      </RevealGrid>
    </Section>

    {/* Core subjects */}
    <Section tint>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#E63946]">
            Shared Foundation
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 text-[#261481]">
            Core Subjects for Every Student
          </h2>
          <div className="w-14 h-0.5 rounded-full bg-[#E63946] mt-4 mb-5" />
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            Whatever programme you choose, you'll study the same four core
            subjects, giving every AMESCO graduate a strong base in language,
            numeracy, science and civic understanding — alongside the elective
            subjects of your chosen programme.
          </p>
        </Reveal>

        <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CORE_SUBJECTS.map((s) => (
            <motion.div
              key={s}
              variants={fadeUp}
              className="flex items-center gap-3 bg-white rounded-xl border border-[#e5e7ef] px-5 py-4"
            >
              <CheckCircle2 size={20} className="text-[#E63946] shrink-0" />
              <span className="font-semibold text-[#261481] text-sm">{s}</span>
            </motion.div>
          ))}
        </RevealGrid>
      </div>
    </Section>

    <CtaBanner
      title="Ready to Begin Your Journey?"
      text="Read how admission works, then start your application."
      to="/admissions/applyNow/applyNow"
      label="Apply Now"
      secondary={{ to: "/admissions/howToapply/howToApply", label: "How to Apply" }}
    />
  </div>
);

export default Academics;
