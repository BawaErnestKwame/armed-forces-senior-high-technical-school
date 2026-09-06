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
import Evoucher from './Pages/pincode/Evoucher';
import Agriculture from './Pages/academics/agric/Agriculture';
import Business from './Pages/academics/business/Business';
import GeneralArts from './Pages/academics/generalarts/GeneralArts';
import Science from './Pages/academics/science/Science';
import Technical from './Pages/academics/technical/Technical';
import HomeEconomics from './Pages/academics/home-economics/HomeEconomics';
import VisualArt from './Pages/academics/visualArt/VisualArt';



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
         <Route path="/pincode/evoucher" element={<Evoucher/> }/>
         {/* Academics — match Navbar paths exactly */}
         <Route path="/academics/agric/agriculture" element={<Agriculture/> }/>
         <Route path="/academics/business/business" element={<Business/> }/>
         <Route path="/academics/visualArts/visualArt" element={<VisualArt/> }/>
         <Route path="/academics/generalarts/generalArts" element={<GeneralArts/> }/>
         <Route path="/academics/general-science" element={<Science/> }/>
         <Route path="/academics/technical/technical" element={<Technical/> }/>
         <Route path="/academics/home-economics/homeEconomics" element={<HomeEconomics/> }/>

       </Routes>
       {!hide && <Footer />}
       <ScrollToTop />
     </div>
   );
}

export default App