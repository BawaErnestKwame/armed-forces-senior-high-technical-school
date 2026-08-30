// src/App.jsx
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './component/common/Navbar'
import Footer from './component/common/Footer'
import { ScrollToTop } from './component/common/Footer'
import Home from "./component/Home"
import Contact from "./Pages/Contact/component/Contact"
import AboutUs from './Pages/About/AboutUs';
import Leaders from './Pages/About/Leaders';
import HowToApply from "./Pages/Admissions/howToapply/HowToApply";
import ApplyNow from "./Pages/admissions/applyNow/ApplyNow";
import SignIn from './auth/SignIn';



const App = () => {
   const location = useLocation()


   const hide = [
    "/auth/signIn"

   ].includes(location.pathname);

   return (
     <div>
       {!hide && <Navbar />}
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/contact" element={<Contact />} />
         {/* Match Navbar paths exactly */}
         <Route path="/about" element={<AboutUs />} />
         <Route path="/about/leaders" element={<Leaders />} />
         <Route
           path="/admissions/howToapply/howToApply"
           element={<HowToApply />}
         />
         <Route path="/admissions/applyNow/applyNow" element={<ApplyNow />} />

         <Route path="/auth/signIn" element={<SignIn />} />
       </Routes>
       {!hide && <Footer />}
       <ScrollToTop />
     </div>
   );
}

export default App