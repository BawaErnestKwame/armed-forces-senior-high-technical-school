// src/component/Home.jsx
import React from 'react'

// ── Sections (add each import as you build them) ──────────────────────────────
import Hero        from './Hero'
import SchoolTypes from './Schooltypes'
// import About       from './About'
// import Departments from './Departments'
// import SchoolLife  from './SchoolLife'
// import Teachers    from './Teachers'
// import Programs    from './Programs'
// import Testimonials from './Testimonials'
// import Blog        from './Blog'
// import Admissions  from './Admissions'

const Home = () => {
  return (
    <main>
      <Hero />
      <SchoolTypes />
      {/* <About />        */}
      {/* <Departments />  */}
      {/* <SchoolLife />   */}
      {/* <Teachers />     */}
      {/* <Programs />     */}
      {/* <Testimonials /> */}
      {/* <Blog />         */}
      {/* <Admissions />   */}
    </main>
  )
}

export default Home