import React, { useEffect, useRef, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"; // Changed from LibraryBooksIcon
import HouseIcon from "@mui/icons-material/House";

const States = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const targets = [2000, 20, 15, 200];
  const labels = ["Students", "Staff", "Courses", "Class Rooms"];
  const icons = [
    <PersonAddAltIcon sx={{ fontSize: 26, color: "#E63946" }} />,
    <GroupAddIcon sx={{ fontSize: 26, color: "#E63946" }} />,
    <LibraryBooksIcon sx={{ fontSize: 26, color: "#E63946" }} />, // Changed here too
    <HouseIcon sx={{ fontSize: 26, color: "#E63946" }} />,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.3 },
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
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 h-[90px] sm:h-[130px] md:h-[110px] flex items-center bg-gray-200"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 md:gap-3 max-w-6xl mx-auto w-full">
        {counts.map((count, index) => (
          <div
            key={index}
            className="relative h-auto flex flex-col items-center justify-center h-[90px] sm:h-[110px] md:h-[100px] text-center transition-all duration-300 hover:-translate-y-1"
          >
            {/* Vertical divider — hidden on last item and on mobile right column */}
            {index < counts.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300" />
            )}

            <div className="text-lg sm:text-xl mb-1">{icons[index]}</div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold text-[#E63946]">
              {count.toLocaleString()}+
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">
              {labels[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default States;
