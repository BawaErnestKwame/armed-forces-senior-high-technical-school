import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Crown,
  BookOpen,
  ClipboardList,
  Home,
  Layers,
  HeartHandshake,
  Users,
  ArrowRight,
} from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import {
  Section,
  SectionHeading,
  RevealGrid,
  Card,
  IconBadge,
  Reveal,
  CtaBanner,
} from "../../component/common/PageKit";
import heroImage from "../../assets/slider1.jpeg";

// Governance chain, top → bottom. Role descriptions only — named staff
// live on the Leadership page.
const CHAIN = [
  {
    icon: ShieldCheck,
    title: "Board of Governors",
    text: "Sets the school's policy direction and oversees its overall performance and resources.",
  },
  {
    icon: Crown,
    title: "Headmaster",
    text: "Leads the school day to day and is accountable for academic standards, discipline and welfare.",
  },
  {
    icon: Layers,
    title: "Assistant Headmasters",
    text: "Oversee academics, administration and domestic (boarding) matters on the Headmaster's behalf.",
  },
  {
    icon: BookOpen,
    title: "Heads of Department",
    text: "Lead each programme — Science, Technical, Business, Arts, Visual Arts, Home Economics and Agriculture.",
  },
];

const OFFICES = [
  {
    icon: BookOpen,
    title: "Academic Office",
    text: "Timetabling, examinations, continuous assessment and academic records.",
  },
  {
    icon: ClipboardList,
    title: "Registry & Admissions",
    text: "Student placement, enrolment records and admission enquiries.",
  },
  {
    icon: Home,
    title: "Boarding & Domestic",
    text: "Housemasters and housemistresses, dining, and daily residential life.",
  },
  {
    icon: HeartHandshake,
    title: "Guidance & Counselling",
    text: "Personal, academic and career guidance for every student.",
  },
  {
    icon: Users,
    title: "Student Leadership",
    text: "The prefectorial board that links students, staff and management.",
  },
  {
    icon: ShieldCheck,
    title: "PTA",
    text: "Parents and teachers working together for the good of the school.",
  },
];

const Administration = () => (
  <div>
    <AcademicHero
      image={heroImage}
      title="Administration"
      subtitle="How AMESCO is led and organised — from the Board of Governors to the offices that keep every school day running."
    />

    {/* Structure */}
    <Section>
      <SectionHeading
        eyebrow="Governance"
        title="Our Leadership Structure"
        text="Clear lines of responsibility keep the school disciplined, accountable and focused on students."
        center
      />

      <RevealGrid className="max-w-3xl mx-auto relative">
        {/* connecting line */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-[#261481]/15 hidden sm:block" />
        <div className="space-y-5">
          {CHAIN.map(({ icon, title, text }, i) => (
            <Card key={title} className="p-5 sm:ml-0 flex gap-4 items-start relative">
              <span className="relative">
                <IconBadge icon={icon} />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#E63946] text-white text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#261481] mb-1">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            </Card>
          ))}
        </div>
      </RevealGrid>

      <Reveal className="text-center mt-10">
        <Link
          to="/about/leaders"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#261481] hover:text-[#E63946] transition-colors"
        >
          Meet our leaders and staff <ArrowRight size={16} />
        </Link>
      </Reveal>
    </Section>

    {/* Offices */}
    <Section tint>
      <SectionHeading
        eyebrow="Offices & Units"
        title="Who Does What"
        text="Where to go for what — each unit serves students and parents directly."
        center
      />
      <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFICES.map(({ icon, title, text }) => (
          <Card key={title} className="p-6">
            <IconBadge icon={icon} tone="red" />
            <h3 className="font-heading text-lg font-bold text-[#261481] mt-4 mb-2">
              {title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
          </Card>
        ))}
      </RevealGrid>
    </Section>

    <CtaBanner
      title="Have a Question for the School?"
      text="Our administration team is happy to help with admissions, boarding and general enquiries."
      to="/contact"
      label="Contact Us"
      secondary={{ to: "/about/leaders", label: "Our Leaders" }}
    />
  </div>
);

export default Administration;
