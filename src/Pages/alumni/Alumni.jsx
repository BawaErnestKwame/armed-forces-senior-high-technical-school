import React from "react";
import {
  Shield,
  Wrench,
  Briefcase,
  Landmark,
  GraduationCap,
  Sprout,
  Users,
  Handshake,
  Mic2,
  HeartHandshake,
  Mail,
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
import heroImage from "../../assets/gallery/gallery9.jpeg";
import banner from "../../assets/banner.jpg";
import gallery1 from "../../assets/gallery/gallery1.jpg";

// Sectors alumni go on to serve in — descriptive, no invented figures.
const SECTORS = [
  {
    icon: Shield,
    title: "Armed Forces & Security",
    text: "Many alumni carry the discipline learned here into the Ghana Armed Forces and other uniformed services.",
  },
  {
    icon: Wrench,
    title: "Engineering & Technical Trades",
    text: "Graduates of the technical programme go on to engineering degrees, polytechnic courses and skilled trades.",
  },
  {
    icon: Briefcase,
    title: "Business & Enterprise",
    text: "From accounting to entrepreneurship, alumni are building and running businesses across the country.",
  },
  {
    icon: Landmark,
    title: "Public Service",
    text: "Alumni serve in government, health, law and other public institutions.",
  },
  {
    icon: GraduationCap,
    title: "Education & Research",
    text: "Many return to the classroom as teachers, lecturers and researchers.",
  },
  {
    icon: Sprout,
    title: "Agriculture & Home Sciences",
    text: "Agricultural science and home economics graduates lead in farming, food and hospitality.",
  },
];

const WAYS_TO_GIVE = [
  {
    icon: Users,
    title: "Mentor a Student",
    text: "Share your career journey and guide current students as they choose their path after SHS.",
  },
  {
    icon: Mic2,
    title: "Give a Career Talk",
    text: "Visit during career days or speak at assemblies about life and work beyond school.",
  },
  {
    icon: Handshake,
    title: "Offer Internships",
    text: "Open doors at your workplace for attachments and work-experience placements.",
  },
  {
    icon: HeartHandshake,
    title: "Support School Projects",
    text: "Contribute to facilities, scholarships and programmes that help the next generation.",
  },
];

const Alumni = () => (
  <div>
    <AcademicHero
      image={heroImage}
      title="Our Alumni"
      subtitle="Once an AMESCO student, always part of the family. Meet the community that carries Mmarima Mma — Excellence — into the world."
    />

    {/* Intro */}
    <Section>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#E63946]">
            The AMESCO Family
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 text-[#261481]">
            A Network That Lasts a Lifetime
          </h2>
          <div className="w-14 h-0.5 rounded-full bg-[#E63946] mt-4 mb-5" />
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base mb-4">
            Armed Forces Senior High Technical School, Kumasi has been shaping
            disciplined, skilled and confident young people for years. Our
            graduates lead in uniform, in business, in technical trades and in
            public service — and many come back to mentor the students who
            follow them.
          </p>
          <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
            Staying connected to the school means staying connected to a
            community that celebrates your progress and is ready to support
            your next step.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-4">
          <img
            src={banner}
            alt="AMESCO campus"
            className="w-full h-56 sm:h-72 object-cover rounded-2xl"
          />
          <img
            src={gallery1}
            alt="AMESCO students"
            className="w-full h-56 sm:h-72 object-cover rounded-2xl mt-8"
          />
        </Reveal>
      </div>
    </Section>

    {/* Sectors */}
    <Section tint>
      <SectionHeading
        eyebrow="Where They Serve"
        title="Alumni Across Every Sector"
        text="Our graduates make their mark well beyond the school gate."
        center
      />
      <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTORS.map(({ icon, title, text }) => (
          <Card key={title} className="p-6">
            <IconBadge icon={icon} />
            <h3 className="font-heading text-lg font-bold text-[#261481] mt-4 mb-2">
              {title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
          </Card>
        ))}
      </RevealGrid>
    </Section>

    {/* Give back */}
    <Section>
      <SectionHeading
        eyebrow="Give Back"
        title="Ways to Support Your School"
        text="However much time you have, there's a way to help current students."
        center
      />
      <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {WAYS_TO_GIVE.map(({ icon, title, text }) => (
          <Card key={title} className="p-6 flex gap-4">
            <IconBadge icon={icon} tone="red" />
            <div>
              <h3 className="font-heading text-lg font-bold text-[#261481] mb-1.5">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
            </div>
          </Card>
        ))}
      </RevealGrid>

      <Reveal className="mt-10 rounded-2xl bg-[#261481]/5 border border-[#261481]/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <IconBadge icon={Mail} />
        <p className="text-sm text-gray-600 leading-relaxed">
          To join the alumni network, update your details or offer support,
          email{" "}
          <a
            href="mailto:armedforcesshts@yahoo.com"
            className="font-semibold text-[#E63946] hover:underline"
          >
            armedforcesshts@yahoo.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+233248732262"
            className="font-semibold text-[#E63946] hover:underline"
          >
            +233 24 873 2262
          </a>
          .
        </p>
      </Reveal>
    </Section>

    <CtaBanner
      title="Stay Connected"
      text="Tell us where life has taken you, or help a student take their first step."
      to="/contact"
      label="Get in Touch"
    />
  </div>
);

export default Alumni;
