import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import logo from '../../assets/logo.png';   // ← Using your imported logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 z-50 transition-all duration-300 z-0 relative">
         {/* Logo - Using your imported logo */}
            <div className="flex items-center absolute left-10 -top-1 z-10">
              <img 
                src={logo} 
                alt="School of Univet Logo" 
                className="h-44 w-auto object-contain"
              />
            </div>
      {/* Top Bar - Maroon */}
      <div className="bg-[var(--royal-blue-dark)] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-6 pl-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎓</span>
            <span>Welcome To Univet School</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white/80 transition">School Life</a>
            <a href="#" className="hover:text-white/80 transition">Academic Enrichment</a>
            <a href="#" className="hover:text-white/80 transition">All Lessons</a>
            <a href="#" className="hover:text-white/80 transition">Alumni</a>
            <a href="#" className="hover:text-white/80 transition">Administration</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`bg-white border-b shadow-sm transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
      
            {/* Desktop Menu */}
            <div className="hidden pl-18 lg:flex items-center gap-8 text-[var(--royal-blue-dark)] font-medium">
              <a href="#" className="hover:text-[#0e07dd] transition-colors">Home</a>
              <a href="#" className="hover:text-[#0e07dd] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#0e07dd] transition-colors">Pages</a>
              <a href="#" className="hover:text-[#0e07dd] transition-colors">Academics</a>
              <a href="#" className="hover:text-[#0e07dd] transition-colors">Blog</a>
              <a href="#" className="hover:text-[#0e07dd] transition-colors">Contact</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Search size={20} className="text-[#343a40]" />
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Apply Now Button */}
              <button className="bg-[#E63946] hover:bg-[#c1121f] text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition shadow-md">
                Apply Now
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t py-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 text-[#343a40] font-medium">
              <a href="#" className="py-2 hover:text-[#0e07dd]">Home</a>
              <a href="#" className="py-2 hover:text-[#0e07dd]">About Us</a>
              <a href="#" className="py-2 hover:text-[#0e07dd]">Pages</a>
              <a href="#" className="py-2 hover:text-[#0e07dd]">Academics</a>
              <a href="#" className="py-2 hover:text-[#0e07dd]">Blog</a>
              <a href="#" className="py-2 hover:text-[#0e07dd]">Contact</a>
              
              <div className="pt-4 border-t text-sm">
                <a href="#" className="block py-2">School Life</a>
                <a href="#" className="block py-2">Academic Enrichment</a>
                <a href="#" className="block py-2">All Lessons</a>
                <a href="#" className="block py-2">Alumni</a>
                <a href="#" className="block py-2">Administration</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;