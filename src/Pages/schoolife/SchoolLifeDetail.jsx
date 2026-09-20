import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import {
  Section,
  SectionHeading,
  RevealGrid,
  Card,
  IconBadge,
  Reveal,
  CtaBanner,
  fadeUp,
} from "../../component/common/PageKit";
import { SCHOOL_LIFE_PAGES, SCHOOL_LIFE_ORDER } from "./schoolLifeData";
import NotFound from "../NotFound";

const SchoolLifeDetail = () => {
  const { slug } = useParams();
  const page = SCHOOL_LIFE_PAGES[slug];

  if (!page) return <NotFound />;

  const others = SCHOOL_LIFE_ORDER.filter((s) => s !== slug);

  return (
    <div>
      <AcademicHero image={page.hero} title={page.title} subtitle={page.subtitle} />

      {/* Intro + at a glance */}
      <Section>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <Reveal>
            <span className="text-[12px] font-bold tracking-[2px] uppercase text-[#E63946]">
              {page.eyebrow}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 text-[#261481]">
              {page.heading}
            </h2>
            <div className="w-14 h-0.5 rounded-full bg-[#E63946] mt-4 mb-5" />
            {page.intro.map((p) => (
              <p
                key={p}
                className="text-gray-500 leading-relaxed text-sm sm:text-base mb-4"
              >
                {p}
              </p>
            ))}
            {page.tourLink && (
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#E63946] hover:text-[#c1121f] transition-colors mt-2"
              >
                Take the campus tour <ArrowRight size={16} />
              </Link>
            )}
          </Reveal>

          <Reveal className="bg-[#261481]/5 border border-[#261481]/10 rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold text-[#261481] mb-4">
              {page.listTitle}
            </h3>
            <ul className="space-y-3">
              {page.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2
                    size={18}
                    className="text-[#E63946] shrink-0 mt-0.5"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Highlights */}
      <Section tint>
        <SectionHeading eyebrow="Highlights" title={`What to Expect`} center />
        <RevealGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page.highlights.map(({ icon, title, text }) => (
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

      {/* Gallery */}
      <Section>
        <SectionHeading eyebrow="In Pictures" title={`${page.title} Gallery`} center />
        <RevealGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {page.gallery.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={img}
                alt={`${page.title} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </RevealGrid>
        <Reveal className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#261481] hover:text-[#E63946] transition-colors"
          >
            View the full gallery <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Section>

      {/* More school life */}
      <Section tint>
        <SectionHeading eyebrow="Keep Exploring" title="More of School Life" center />
        <RevealGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((s) => (
            <motion.div key={s} variants={fadeUp}>
              <Link
                to={`/school-life/${s}`}
                className="block bg-white rounded-2xl border border-[#e5e7ef] p-5 text-center font-heading font-bold text-[#261481] hover:text-[#E63946] hover:border-[#E63946]/40 transition-colors shadow-[0_4px_24px_rgba(10,8,80,.07)]"
              >
                {SCHOOL_LIFE_PAGES[s].navLabel}
              </Link>
            </motion.div>
          ))}
        </RevealGrid>
      </Section>

      <CtaBanner
        title="Ready to Become Part of Our Community?"
        text="Start your application today and experience life at AMESCO."
        to="/admissions/applyNow/applyNow"
        label="Apply Now"
        secondary={{ to: "/school-life", label: "Back to School Life" }}
      />
    </div>
  );
};

export default SchoolLifeDetail;
