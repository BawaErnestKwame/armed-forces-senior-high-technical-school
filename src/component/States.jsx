import React, { useEffect, useRef, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";// Changed from LibraryBooksIcon
import HouseIcon from "@mui/icons-material/House";

const States = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const targets = [2000, 20, 15, 200];
  const labels = ["Students", "Staff", "Courses", "Class Rooms"];
  const icons = [
    <PersonAddAltIcon sx={{ fontSize: 40, color: "#E63946" }} />,
    <GroupAddIcon sx={{ fontSize: 40, color: "#E63946" }} />,
    <LibraryBooksIcon sx={{ fontSize: 40, color: '#E63946' }} />,// Changed here too
    <HouseIcon sx={{ fontSize: 40, color: "#E63946" }} />,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const increments = targets.map((t) => t / steps);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCounts(targets);
        clearInterval(timer);
        return;
      }
      setCounts(counts.map((_, i) => Math.floor(increments[i] * step)));
    }, interval);
  };

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-6 md:py-4 bg-gray-200"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {counts.map((count, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1"
          >
            {/* Vertical divider — hidden on last item and on mobile right column */}
            {index < counts.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300" />
            )}

            <div className="text-2xl sm:text-3xl mb-2">{icons[index]}</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-[#E63946]">
              {count.toLocaleString()}+
            </h3>
            <p className="text-sm sm:text-base font-semibold text-gray-700 mt-1">
              {labels[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default States;