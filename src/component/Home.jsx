// src/component/Home.jsx
import React from "react";

// ── Sections (add each import as you build them) ──────────────────────────────
import Hero from "./Hero";
// import SchoolTypes from "./SchoolTypes";
import About from "./About";
import Departments from "./Departments";
import SchoolLifebanner from "./SchoolLifebanner";
import SchoolLife from "./SchoolLife"; // ← Fixed: changed 'SchooLife' to 'SchoolLife'
import Teachers from "./Teachers";
import Programs from "./Programs";
// import Testimonials from './Testimonials'
// import Blog        from './Blog'
// import Admissions  from './Admissions'
import States from './States';

const Home = () => {
  return (
    <main>
      <Hero />
      {/* <SchoolTypes /> */}
      <States/>
      <About />
      <Departments />
      <SchoolLifebanner />
      <SchoolLife />
      <Teachers />
      <Programs />
      {/* <Testimonials /> */}
      {/* <Blog />         */}
      {/* <Admissions />   */}
    </main>
  );
};

export default Home;
