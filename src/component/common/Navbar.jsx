import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Leaders", to: "/about/leaders" },
    ],
  },
  {
    label: "Academics",
    to: "/academics",
    children: [
      { label: "General Science", to: "/academics/general-science" },
      { label: "Technical", to: "/academics/technical" },
      { label: "Business", to: "/academics/business" },
      { label: "General Arts", to: "/academics/general-arts" },
      { label: "Visual Arts", to: "/academics/visual-arts" },
      { label: "Home Economics", to: "/academics/home-economics" },
      { label: "Agricultural Science", to: "/academics/agricultural-science" },
    ],
  },

  {
    label: "Admissions",
    to: "/admissions",
    children: [
      { label: "How to Apply", to: "/admissions/howtoApply/howToApply" },
      { label: "Apply Now", to: "/admissions/applyNow/applyNow" },
    ],
  },
  {
    label: "News & Events",
    to: "/news",
    children: [
      { label: "Latest News", to: "/news" },
      { label: "All Events", to: "/news/events" },
      { label: "Notice Board", to: "/news/notices" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const QUICK_LINKS = [
  { label: "School Life", to: "/school-life" },
  { label: "Academics", to: "/academics" },
  { label: "Notice Board", to: "/news/notices" },
  { label: "Alumni", to: "/alumni" },
  { label: "Administration", to: "/about/administration" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
  "https://images.unsplash.com/photo-1523054050858-8df90110c9f1?w=400&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
];

const SOCIALS = [
  { label: "Facebook", href: "#", letter: "F" },
  { label: "Twitter/X", href: "#", letter: "𝕏" },
  { label: "Instagram", href: "#", letter: "Ig" },
  { label: "YouTube", href: "#", letter: "Yt" },
];

const KF = `
  @keyframes ring {
    0%,100% { box-shadow: 0 4px 16px rgba(230,57,70,.4); }
    50%      { box-shadow: 0 8px 28px rgba(230,57,70,.65); }
  }
  @keyframes lb-in {
    from { opacity: 0; transform: scale(.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  .apply-ring       { animation: ring 2.6s ease infinite; }
  .apply-ring:hover { animation: none; }
  .lb-enter         { animation: lb-in .25s ease both; }
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IcoSearch = () => (
  <svg
    className="w-[16px] h-[16px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IcoMenu = () => (
  <svg
    className="w-[16px] h-[16px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IcoChevron = ({ open }) => (
  <svg
    className={`w-[10px] h-[10px] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IcoArrow = ({ cls = "" }) => (
  <svg
    className={`w-[12px] h-[12px] ${cls}`}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" y1="8" x2="14" y2="8" />
    <polyline points="9,3 14,8 9,13" />
  </svg>
);
const IcoChevLeft = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IcoChevRight = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IcoGradCap = () => (
  <svg
    className="w-[16px] h-[16px]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,.8)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const IcoPhone = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,.85)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IcoMail = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,.85)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IcoPin = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,.85)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IcoHamburger = ({ open }) => (
  <div className="w-[20px] h-[16px] flex flex-col justify-between">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="block h-0.5 bg-[#343a40] rounded-sm transition-all duration-300"
        style={{
          width: !open && i === 1 ? "70%" : "100%",
          opacity: open && i === 1 ? 0 : 1,
          transformOrigin:
            i === 0 ? "top left" : i === 2 ? "bottom left" : "center",
          transform: open
            ? i === 0
              ? "rotate(45deg) translate(1px,-1px)"
              : i === 2
                ? "rotate(-45deg) translate(1px,1px)"
                : "none"
            : "none",
        }}
      />
    ))}
  </div>
);
const ShieldMark = () => (
  <svg width="44" height="44" viewBox="0 0 52 56" fill="none">
    <path
      d="M26 2L4 11v20c0 14 11 23 22 25 11-2 22-11 22-25V11L26 2z"
      fill="rgba(255,255,255,.18)"
      stroke="rgba(255,255,255,.5)"
      strokeWidth="1.5"
    />
    <path
      d="M26 8L8 16v15c0 10 8 17 18 19 10-2 18-9 18-19V16L26 8z"
      fill="rgba(255,255,255,.1)"
      stroke="rgba(255,255,255,.3)"
      strokeWidth="1"
    />
    <path d="M17 25l9-4 9 4-9 4-9-4z" fill="#fff" opacity=".9" />
    <path
      d="M20 27.5v5c2 2 6 2 8 0v-5"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
      opacity=".9"
    />
    <line
      x1="35"
      y1="25"
      x2="35"
      y2="32"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity=".65"
    />
  </svg>
);

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, index, onClose, onNav }) => {
  const [fading, setFading] = useState(false);
  const [cur, setCur] = useState(index);

  useEffect(() => {
    setCur(index);
  }, [index]);

  const go = (dir) => {
    setFading(true);
    setTimeout(() => {
      const n = (cur + dir + images.length) % images.length;
      setCur(n);
      onNav(n);
      setFading(false);
    }, 180);
  };
  const goTo = (i) => {
    if (i === cur) return;
    setFading(true);
    setTimeout(() => {
      setCur(i);
      onNav(i);
      setFading(false);
    }, 180);
  };

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [cur]);

  if (index === null) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center p-6 lb-enter"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="fixed top-4 right-5 w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-white text-lg flex items-center justify-center z-[2001] transition-all duration-200 hover:bg-[#c1121f] hover:border-[#c1121f]"
        onClick={onClose}
      >
        ✕
      </button>
      <button
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center z-[2001] transition-all duration-200 hover:bg-[#c1121f] hover:border-[#c1121f] hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        <IcoChevLeft />
      </button>
      <div
        className="relative rounded-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,.65)] max-w-[88vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[cur]}
          alt={`Campus photo ${cur + 1}`}
          className={`max-h-[80vh] max-w-[88vw] object-contain block transition-opacity duration-[180ms] ${fading ? "opacity-0" : "opacity-100"}`}
          draggable="false"
        />
      </div>
      <button
        className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center z-[2001] transition-all duration-200 hover:bg-[#c1121f] hover:border-[#c1121f] hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        <IcoChevRight />
      </button>
      <div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-[2001]"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200
              ${i === cur ? "border-[#c1121f] scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100 hover:border-white/50"}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div
        className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white/15 border border-white/20 text-white/85 text-xs font-semibold px-4 py-1 rounded-full z-[2001] tracking-wide"
        onClick={(e) => e.stopPropagation()}
      >
        {cur + 1} / {images.length}
      </div>
    </div>
  );
};

// ─── Desktop dropdown ─────────────────────────────────────────────────────────
const Dropdown = ({ items, visible, onMouseEnter, onMouseLeave }) => (
  <div
    className={`absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 bg-white border border-[#e9ecef] rounded-xl shadow-[0_16px_48px_rgba(14,7,221,.14)] min-w-[190px] p-1.5 z-[20] transition-all duration-[200ms]
      ${visible ? "opacity-100 visible translate-y-0 pointer-events-auto" : "opacity-0 invisible translate-y-2.5 pointer-events-none"}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="absolute -top-[10px] left-0 right-0 h-[10px]" />
    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-l border-t border-[#e9ecef]" />
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === "/"}
        className={
          ({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-150 group no-underline
           ${isActive ? "text-[#0e07dd] bg-[#0e07dd]/[0.06] pl-4" : "text-[#343a40] hover:text-[#0e07dd] hover:bg-[#0e07dd]/[0.06] hover:pl-4"}` // Reduced font from text-sm to text-xs
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`w-[4px] h-[4px] rounded-full flex-shrink-0 transition-colors duration-150
              ${isActive ? "bg-[#E63946]" : "bg-[#dee2e6] group-hover:bg-[#E63946]"}`}
            />
            {item.label}
          </>
        )}
      </NavLink>
    ))}
  </div>
);

// ─── Desktop nav item ─────────────────────────────────────────────────────────
const DesktopNavItem = ({ link }) => {
  const hasKids = Boolean(link.children?.length);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const handleEnter = () => {
    clearClose();
    setOpen(true);
  };
  const handleLeave = () => scheduleClose();

  useEffect(() => () => clearClose(), []);

  if (!hasKids) {
    return (
      <NavLink
        to={link.to}
        end={link.to === "/"}
        className={
          ({ isActive }) =>
            `inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg no-underline transition-all duration-200 whitespace-nowrap
           ${isActive ? "text-[#E63946] font-bold" : "text-[#343a40] hover:text-[#0e07dd] hover:bg-[#0e07dd]/[0.06]"}` // Reduced from text-sm to text-xs, padding reduced
        }
      >
        {link.label}
      </NavLink>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <NavLink
        to={link.to}
        className={
          ({ isActive }) =>
            `inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg no-underline transition-all duration-200 whitespace-nowrap
           ${open ? "text-[#0e07dd] bg-[#0e07dd]/[0.06]" : ""}
           ${isActive ? "text-[#E63946]" : "text-[#343a40] hover:text-[#0e07dd] hover:bg-[#0e07dd]/[0.06]"}` // Reduced from text-sm to text-xs, padding reduced
        }
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {link.label}
        <IcoChevron open={open} />
      </NavLink>
      <Dropdown
        items={link.children}
        visible={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      />
    </div>
  );
};

// ─── Mobile nav item 
const MobileNavItem = ({ link, onClose }) => {
  const hasKids = Boolean(link.children?.length);
  const [open, setOpen] = useState(false);

  if (!hasKids)
    return (
      <div className="border-b border-white/[0.08]">
        <NavLink
          to={link.to}
          end={link.to === "/"}
          onClick={onClose}
          className={
            ({ isActive }) =>
              `block w-full px-6 py-3 text-sm font-semibold no-underline transition-colors duration-200
           ${isActive ? "text-[#E63946]" : "text-white/85 hover:text-white"}` // Reduced from py-[15px] to py-3
          }
        >
          {link.label}
        </NavLink>
      </div>
    );

  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-6 py-3 bg-transparent border-none cursor-pointer" // Reduced from py-[15px] to py-3
      >
        <span className="text-sm font-semibold text-white/85">
          {link.label}
        </span>
        <span className="text-white/40">
          <IcoChevron open={open} />
        </span>
      </button>
      {open && (
        <div className="bg-black/20 pb-2">
          {link.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={onClose}
              className={
                ({ isActive }) =>
                  `flex items-center gap-2.5 px-8 py-2 text-xs font-medium no-underline transition-all duration-200
                 ${isActive ? "text-white pl-10" : "text-white/60 hover:text-white hover:pl-10"}` // Reduced from text-[13px] to text-xs
              }
            >
              {({ isActive }) => (
                <>
                  <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#E63946]" />
                  {child.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Info Panel 
const InfoPanel = ({ open, onClose, onImgClick }) => (
  <div
    id="amesco-info-panel"
    className={`fixed top-0 right-0 bottom-0 w-[380px] max-w-[92vw] bg-[#c1121f] z-[1000]
      overflow-y-auto flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0,0,1)]
      ${open ? "translate-x-0" : "translate-x-full"}`}
    aria-hidden={!open}
    role="dialog"
    aria-label="School information"
  >
    <button
      onClick={onClose}
      aria-label="Close panel"
      className="absolute top-0 -left-[50px] w-[50px] h-[50px] bg-white border-none flex items-center justify-center text-lg font-bold text-[#343a40] cursor-pointer z-10 shadow-[-4px_0_12px_rgba(0,0,0,.15)] transition-all duration-200 hover:bg-[#c1121f] hover:text-white"
    >
      ✕
    </button>

    <div className="flex flex-col gap-5 p-6">
      {" "}
      {/* Reduced gap from gap-7 to gap-5, padding from p-8 to p-6 */}
      {/* Logo row */}
      <div className="flex items-center gap-3">
        {" "}
        {/* Reduced gap from gap-4 to gap-3 */}
        <div className="flex-shrink-0 w-12 h-12">
          {" "}
          {/* Reduced from w-14 h-14 */}
          {logo ? (
            <img
              src={logo}
              alt="AMESCO"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          ) : (
            <ShieldMark />
          )}
        </div>
        <div>
          <p className="text-[9px] font-bold text-white/60 tracking-[2px] uppercase mb-0.5">
            {" "}
            {/* Reduced from text-[10px] */}
            SCHOOL OF
          </p>
          <p className="font-['Playfair_Display'] text-xl font-black text-white tracking-wide uppercase leading-none">
            {" "}
            {/* Reduced from text-[26px] to text-xl */}
            AMESCO
          </p>
        </div>
      </div>
      <p className="text-sm text-white/85 leading-[1.7] border-t border-white/15 pt-4 m-0">
        {" "}
        {/* Reduced from text-[15px] to text-sm, pt from pt-6 to pt-4 */}
        Armed Forces Senior High Technical School, Kumasi (AMESCO) was
        established on 28th January 1991 and has grown into one of the finest
        co-educational institutions in the Ashanti Region — committed to
        academic excellence, discipline, and producing well-rounded, confident
        youth.
      </p>
      {/* Gallery */}
      <div className="grid grid-cols-3 gap-2">
        {" "}
        {/* Reduced from gap-2.5 to gap-2 */}
        {GALLERY.map((src, i) => (
          <div
            key={i}
            onClick={() => onImgClick(i)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-zoom-in group"
            role="button"
            tabIndex={0}
            aria-label={`View campus photo ${i + 1}`}
            onKeyDown={(e) => e.key === "Enter" && onImgClick(i)}
          >
            <img
              src={src}
              alt={`Campus ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#c1121f]/0 group-hover:bg-[#c1121f]/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" // Reduced from w-7 h-7
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Contact */}
      <div>
        <h4 className="font-['Playfair_Display'] text-base font-extrabold text-white mb-3">
          {" "}
          {/* Reduced from text-lg to text-base, mb-4 to mb-3 */}
          Quick Contact:
        </h4>
        <div className="flex flex-col gap-0.5">
          {" "}
          {/* Reduced from gap-1 to gap-0.5 */}
          {[
            {
              href: "tel:+233248732262",
              icon: <IcoPhone />,
              text: "+233 24 873 2262",
            },
            {
              href: "tel:+233322032999",
              icon: <IcoPhone />,
              text: "+233 32 2032999",
            },
            {
              href: "mailto:armedforcesshts@yahoo.com",
              icon: <IcoMail />,
              text: "armedforcesshts@yahoo.com",
            },
            {
              href: null,
              icon: <IcoPin />,
              text: "Old Uaddara Barracks, Bantama, Kumasi",
            },
          ].map(({ href, icon, text }) => {
            const inner = (
              <>
                <span className="w-8 h-8 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center transition-colors duration-200 group-hover:bg-white/25">
                  {" "}
                  {/* Reduced from w-9 h-9 */}
                  {icon}
                </span>
                <span className="text-xs font-medium text-white/85 group-hover:text-white transition-colors duration-200">
                  {" "}
                  {/* Reduced from text-sm to text-xs */}
                  {text}
                </span>
              </>
            );
            return href ? (
              <a
                key={text}
                href={href}
                className="flex items-center gap-3 py-1 no-underline group" // Reduced from gap-3.5, py-1.5
              >
                {inner}
              </a>
            ) : (
              <div key={text} className="flex items-start gap-3 py-1 group">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
      {/* Follow Us */}
      <div className="border-t border-white/15 pt-4">
        {" "}
        {/* Reduced from pt-6 to pt-4 */}
        <h4 className="font-['Playfair_Display'] text-base font-extrabold text-white mb-3">
          {" "}
          {/* Reduced from text-lg to text-base, mb-4 to mb-3 */}
          Follow Us:
        </h4>
        <div className="flex gap-2 flex-wrap">
          {" "}
          {/* Reduced from gap-2.5 to gap-2 */}
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white text-xs font-bold no-underline transition-all duration-200 hover:bg-white hover:text-[#c1121f] hover:border-white" // Reduced from w-9 h-9, text-[13px] to text-xs
            >
              {s.letter}
            </a>
          ))}
        </div>
      </div>
      {/* Apply CTA */}
      <Link
        to="/admissions/apply"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full bg-white text-[#c1121f] py-3.5 rounded-full text-sm font-extrabold no-underline shadow-[0_6px_24px_rgba(0,0,0,.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,0,0,.25)] mt-1" // Reduced from py-4, text-[15px] to text-sm
      >
        Apply Now <IcoArrow cls="stroke-[#c1121f]" />
      </Link>
    </div>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobNavOpen, setMobNavOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      infoOpen || mobNavOpen || lbIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [infoOpen, mobNavOpen, lbIndex]);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 1024) setMobNavOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [searchOpen]);

  const closeAll = () => {
    setInfoOpen(false);
    setMobNavOpen(false);
  };

  return (
    <>
      <style>{KF}</style>

      <div className="sticky top-0 z-[997] overflow-visible">
        <div className="relative">
          {/* ════ LOGO ════ */}
          <Link
            to="/"
            className="absolute left-3 md:left-5 lg:left-24 top-0 z-[15] flex items-center no-underline" // Reduced from left-4/6/8
            style={{
              height: "calc(40px + 44px)", // Reduced from 44px + 50px
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt="AMESCO"
                className="w-auto object-contain drop-shadow-lg
                    h-[50px] sm:h-[60px] lg:h-[68px]" // Reduced from 60/72/82
              />
            ) : (
              <ShieldMark />
            )}
          </Link>

          {/* ════ TOP BAR ════ */}
          <div
            className="bg-[#261481] flex items-center justify-between flex-wrap gap-y-0.5
              min-h-[40px] // Reduced from min-h-[44px]
              pl-[100px] sm:pl-[160px] lg:pl-[190px] // Reduced to match smaller logo
              pr-3 md:pr-4 py-0.5 md:py-0.5 lg:pr-24" // Reduced padding
          >
            {/* Welcome text — md+ only */}
            <div className="hidden md:flex items-center gap-2">
              {" "}
              {/* Reduced from gap-2.5 to gap-2 */}
              <IcoGradCap />
              <span className="text-[11px] font-semibold text-white/85 whitespace-nowrap">
                {" "}
                {/* Reduced from text-[13px] to text-[11px] */}
                Welcome to Armed Forces Senior High Technical School, Kumasi
              </span>
            </div>

            {/* Quick links — always visible */}
            <div className="flex items-center flex-wrap justify-center md:justify-end w-full md:w-auto">
              {QUICK_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-[11px] font-medium px-2 md:px-2.5 py-0.5 border-r border-white/[0.18] last:border-r-0 no-underline whitespace-nowrap transition-colors duration-200 // Reduced from text-[12.5px] to text-[11px], px-3 to px-2
                     ${isActive ? "text-white font-semibold" : "text-white/70 hover:text-white"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ════ MAIN NAV — reduced height ════ */}
          <div
            className={`bg-white
              h-[44px] // Reduced from h-[50px]
              pl-[100px] sm:pl-[160px] lg:pl-[190px] // Reduced to match smaller logo
              pr-3 md:pr-4 lg:pr-24
              flex items-center justify-between
              relative z-[9] transition-shadow duration-300
              ${scrolled ? "shadow-[0_4px_28px_rgba(14,7,221,.12)]" : "shadow-[0_2px_10px_rgba(14,7,221,.06)]"}`}
          >
            {/* Desktop nav links */}
            <nav
              className="hidden lg:flex items-center gap-0" // Reduced gap from gap-0.5 to gap-0
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <DesktopNavItem key={link.to} link={link} />
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
              {" "}
              {/* Reduced from gap-2 to gap-1.5 */}
              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-8 h-8 rounded-lg bg-transparent border border-[#dee2e6] // Reduced from w-9 h-9
                  flex items-center justify-center cursor-pointer transition-all duration-200
                  hover:bg-[#0e07dd]/[0.06] hover:border-[#0e07dd]"
                onClick={() => setMobNavOpen((v) => !v)}
                aria-label="Open navigation"
              >
                <IcoHamburger open={mobNavOpen} />
              </button>
              {/* Search — visible from small screens up */}
              <div ref={searchRef} className="relative hidden sm:block">
                <button
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-label="Search"
                  aria-expanded={searchOpen}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 // Reduced from w-9 h-9
                    ${
                      searchOpen
                        ? "bg-[#0e07dd] border-[#0e07dd] text-white"
                        : "bg-transparent border-[#dee2e6] text-[#343a40] hover:bg-[#0e07dd]/[0.06] hover:border-[#0e07dd] hover:text-[#0e07dd]"
                    }`}
                >
                  <IcoSearch />
                </button>

                {/* Search dropdown */}
                <div
                  className={`absolute top-[calc(100%+8px)] right-0 w-72 max-w-[90vw] bg-white border border-[#e9ecef] rounded-xl shadow-[0_12px_40px_rgba(14,7,221,.13)] p-2.5 z-50 transition-all duration-[220ms] // Reduced width, padding, top
                  ${searchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none invisible"}`}
                >
                  <div className="absolute -top-[6px] right-4 w-3 h-3 rotate-45 bg-white border-l border-t border-[#e9ecef]" />
                  <div className="flex items-center gap-2 bg-[#f8f9fa] rounded-lg px-3 py-2 border border-[#e9ecef] focus-within:border-[#0e07dd] focus-within:bg-white transition-all duration-200">
                    {" "}
                    {/* Reduced padding */}
                    <IcoSearch />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQ}
                      onChange={(e) => setSearchQ(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Escape" && setSearchOpen(false)
                      }
                      placeholder="Search programmes, news…"
                      className="flex-1 bg-transparent text-xs text-[#343a40] outline-none placeholder:text-[#9ca3af]" // Reduced from text-sm to text-xs
                      aria-label="Search"
                    />
                    {searchQ && (
                      <button
                        onClick={() => setSearchQ("")}
                        className="text-[#9ca3af] hover:text-[#343a40] text-xs leading-none transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <button className="mt-2 w-full bg-[#0e07dd] text-white text-xs font-bold py-2 rounded-lg transition-colors duration-200 hover:bg-[#261481]">
                    {" "}
                    {/* Reduced from text-sm, py-2.5, rounded-xl */}
                    Search
                  </button>
                </div>
              </div>
              {/* Info panel toggle — visible from small screens up */}
              <button
                onClick={() => setInfoOpen((v) => !v)}
                aria-label="Open info panel"
                aria-expanded={infoOpen}
                className={`hidden sm:flex w-8 h-8 rounded-lg border items-center justify-center cursor-pointer transition-all duration-200 // Reduced from w-9 h-9
                  ${
                    infoOpen
                      ? "bg-[#0e07dd] border-[#0e07dd] text-white"
                      : "bg-transparent border-[#dee2e6] text-[#343a40] hover:bg-[#0e07dd]/[0.06] hover:border-[#0e07dd] hover:text-[#0e07dd]"
                  }`}
              >
                <IcoMenu />
              </button>
              {/* Apply Now — lg+ only */}
              <Link
                to="/admissions/apply"
                className="hidden lg:inline-flex apply-ring items-center gap-1.5 bg-[#E63946] text-white // Reduced from gap-2
                  px-4 py-1.5 rounded-full text-xs font-bold no-underline // Reduced from px-5 py-2, text-sm to text-xs
                  transition-all duration-200 hover:bg-[#c1121f] hover:-translate-y-0.5
                  hover:shadow-none flex-shrink-0"
              >
                Apply Now <IcoArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(10,8,80,.45)] z-[999] transition-opacity duration-300
          ${infoOpen || mobNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Info panel */}
      <InfoPanel
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        onImgClick={(i) => setLbIndex(i)}
      />

      {/* Mobile nav drawer */}
      <nav
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[min(280px,88vw)]
          bg-gradient-to-br from-[#0a0850] to-[#261481] z-[1001]
          overflow-y-auto flex flex-col
          transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0,0,1)]
          ${mobNavOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobNavOpen}
      >
        <button
          onClick={() => setMobNavOpen(false)}
          aria-label="Close navigation"
          className="absolute top-0 -left-[50px] w-[50px] h-[50px] bg-[#261481] border-none
            flex items-center justify-center text-white text-lg font-bold cursor-pointer z-10
            shadow-[-4px_0_14px_rgba(0,0,0,.25)] transition-all duration-200 hover:bg-[#E63946]"
        >
          ✕
        </button>

        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          {" "}
          {/* Reduced padding */}
          <Link
            to="/"
            onClick={() => setMobNavOpen(false)}
            className="flex items-center gap-2 no-underline" // Reduced gap
          >
            <div className="w-8 h-8 bg-white/10 rounded-[9px] flex items-center justify-center overflow-hidden flex-shrink-0">
              {" "}
              {/* Reduced from w-9 h-9 */}
              {logo ? (
                <img
                  src={logo}
                  alt="AMESCO"
                  className="w-5 h-5 object-contain drop-shadow-sm" // Reduced from w-6 h-6
                />
              ) : (
                <svg
                  className="w-[16px] h-[16px]" // Reduced
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              )}
            </div>
            <p className="font-['Playfair_Display'] text-xs font-black text-white">
              {" "}
              {/* Reduced from text-[14px] to text-xs */}
              <span className="text-[#E63946]">Armed Forces</span> SHS
            </p>
          </Link>
          <button
            onClick={() => setMobNavOpen(false)}
            aria-label="Close"
            className="w-7 h-7 bg-white/10 rounded-lg border-none text-white text-sm // Reduced from w-8 h-8
              cursor-pointer flex items-center justify-center flex-shrink-0
              transition-colors duration-200 hover:bg-[#E63946]"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pt-3 pb-2 flex-shrink-0 sm:hidden">
          {" "}
          {/* Reduced padding */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/15">
            {" "}
            {/* Reduced padding */}
            <IcoSearch />
            <input
              type="text"
              placeholder="Search programmes, news…"
              className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/50" // Reduced from text-sm
              aria-label="Search"
            />
          </div>
          <button
            onClick={() => {
              setMobNavOpen(false);
              setInfoOpen(true);
            }}
            className="flex items-center justify-center gap-2 w-full mt-2 bg-white/10 border border-white/15 text-white/85 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 hover:bg-white/15" // Reduced padding and text
          >
            <IcoMenu /> School Info
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-1.5">
          {" "}
          {/* Reduced from py-2 */}
          {NAV_LINKS.map((link) => (
            <MobileNavItem
              key={link.to}
              link={link}
              onClose={() => setMobNavOpen(false)}
            />
          ))}
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0 space-y-2.5">
          {" "}
          {/* Reduced padding */}
          <div className="bg-[#E63946]/15 border border-[#E63946]/30 rounded-lg p-2.5 text-center">
            {" "}
            {/* Reduced padding */}
            <p className="text-[9px] text-white/40 tracking-[1.2px] uppercase">
              {" "}
              {/* Reduced from text-[10px] */}
              School Motto
            </p>
            <p className="font-['Playfair_Display'] text-xs font-bold text-white mt-0.5">
              {" "}
              {/* Reduced from text-sm */}
              "Mmarima Mma" — <span className="text-[#E63946]">Excellence</span>
            </p>
          </div>
          <Link
            to="/admissions/apply"
            onClick={() => setMobNavOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#E63946] text-white
              py-3 rounded-full text-xs font-bold no-underline // Reduced from py-3.5, text-sm to text-xs
              transition-colors duration-200 hover:bg-[#c1121f]"
          >
            Apply Now <IcoArrow />
          </Link>
        </div>
      </nav>

      {/* Lightbox */}
      {lbIndex !== null && (
        <Lightbox
          images={GALLERY}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNav={(i) => setLbIndex(i)}
        />
      )}
    </>
  );
};

export default Navbar;
