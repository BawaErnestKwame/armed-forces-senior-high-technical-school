// LegalPage.jsx — shared layout for Terms & Privacy
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import AcademicHero from "../../component/common/AcademicHero";
import { Reveal } from "../../component/common/PageKit";
import heroImage from "../../assets/slider1.jpeg";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const LegalPage = ({ title, subtitle, updated, intro, sections }) => (
  <div>
    <AcademicHero image={heroImage} title={title} subtitle={subtitle} />

    <section className="bg-[#f3f4f8]">
      <div className="mx-auto max-w-[1220px] px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
        {/* Table of contents */}
        <aside className="bg-white rounded-2xl border border-[#e5e7ef] p-6 lg:sticky lg:top-24 self-start shadow-[0_4px_24px_rgba(10,8,80,.07)]">
          <h2 className="font-heading text-lg font-bold text-[#261481] mb-1">
            On this page
          </h2>
          <div className="w-10 h-0.5 rounded-full bg-[#E63946] mb-4" />
          <nav className="flex flex-col gap-1">
            {sections.map((s, i) => (
              <a
                key={s.title}
                href={`#${slug(s.title)}`}
                className="text-sm text-gray-600 hover:text-[#E63946] hover:bg-[#f3f4f8] rounded-lg px-3 py-2 transition-colors"
              >
                <span className="text-[#E63946] font-bold mr-2">{i + 1}.</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Body */}
        <article className="bg-white rounded-2xl border border-[#e5e7ef] p-6 sm:p-10 shadow-[0_4px_24px_rgba(10,8,80,.07)] min-w-0">
          <p className="text-xs font-bold tracking-[2px] uppercase text-[#E63946] mb-3">
            Last updated: {updated}
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-8">
            {intro}
          </p>

          <div className="space-y-9">
            {sections.map((s, i) => (
              <Reveal key={s.title}>
                <section id={slug(s.title)} className="scroll-mt-28">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#261481] mb-3">
                    <span className="text-[#E63946]">{i + 1}.</span> {s.title}
                  </h2>
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-gray-600 leading-relaxed text-sm sm:text-[15px] mb-3"
                    >
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm sm:text-[15px] leading-relaxed marker:text-[#E63946]">
                      {s.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-2xl bg-[#261481]/5 border border-[#261481]/10 p-6">
            <h3 className="font-heading text-lg font-bold text-[#261481] mb-3">
              Questions?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
              <a
                href="mailto:armedforcesshts@yahoo.com"
                className="inline-flex items-center gap-2 font-semibold text-[#261481] hover:text-[#E63946] transition-colors"
              >
                <Mail size={16} /> armedforcesshts@yahoo.com
              </a>
              <a
                href="tel:+233248732262"
                className="inline-flex items-center gap-2 font-semibold text-[#261481] hover:text-[#E63946] transition-colors"
              >
                <Phone size={16} /> +233 24 873 2262
              </a>
              <Link
                to="/contact"
                className="font-semibold text-[#E63946] hover:underline"
              >
                Contact page
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
);

export default LegalPage;
