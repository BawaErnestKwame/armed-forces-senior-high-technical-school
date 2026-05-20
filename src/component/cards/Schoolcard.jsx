// component/cards/SchoolCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const IcoChevDown = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)
const IcoChevUp = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)
const IcoArrow = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="8" x2="14" y2="8"/>
    <polyline points="9,3 14,8 9,13"/>
  </svg>
)

// Watermark
const WatermarkLines = () => (
  <svg
    className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none select-none"
    style={{ opacity: 0.05 }}
    viewBox="0 0 160 160" fill="none"
  >
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <line key={i}
        x1={i*20-40} y1="160" x2={i*20+120} y2="-40"
        stroke="#1a1a2e" strokeWidth="18"
      />
    ))}
  </svg>
)

// ── SchoolCard ─────────────────────────────────────────────────────────────────
// NOTE: open + onToggle are fully controlled from the parent (SchoolTypes)
// NO overflow-hidden on the outer wrapper — button uses negative margin instead

const SchoolCard = ({ icon, title, desc, links, hasBorder, open, onToggle }) => (
  <div
    className="relative flex flex-col bg-white"
    style={{ borderRight: hasBorder ? '1px solid #e9ecef' : 'none' }}
  >
    {/* Watermark lives here so it doesn't interfere with overflow */}
    <div className="relative flex-1 overflow-hidden">
      <WatermarkLines/>
    </div>

    {/* ── Card body ── */}
    <div className="absolute inset-0 flex flex-col px-8 pt-8">

      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-14 flex-shrink-0">{icon}</div>
        <h3 className="font-['Playfair_Display'] text-[22px] font-black text-[#0a0850] leading-tight mt-1">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[#6b7280] text-[14px] leading-relaxed">{desc}</p>

      {/* Expandable links */}
      <div
        style={{
          overflow:   'hidden',
          maxHeight:  open ? '400px' : '0px',
          opacity:    open ? 1 : 0,
          marginTop:  open ? '24px' : '0px',
          transition: 'max-height 0.45s ease, opacity 0.3s ease, margin-top 0.3s ease',
        }}
      >
        <div className="flex flex-col divide-y divide-[#f3f4f6]">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center justify-between py-3.5 px-1
                text-[14px] font-semibold text-[#343a40] no-underline
                transition-colors duration-200 hover:text-[#E63946]"
            >
              <span>{link.label}</span>
              <span className="w-7 h-7 rounded-full border border-[#e9ecef]
                flex items-center justify-center text-[#9ca3af]
                transition-all duration-200
                group-hover:border-[#E63946] group-hover:text-[#E63946] group-hover:bg-[#E63946]/[0.06]">
                <IcoArrow/>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>

    {/* ── Toggle button ── */}
    {/* Sits OUTSIDE the card body, uses -mb-5 to overlap below the card edge */}
    <div className="flex justify-center relative z-20 -mb-5 mt-auto pt-4 pb-0">
      <button
        onClick={onToggle}
        aria-label={open ? 'Collapse' : 'Expand'}
        style={{ background: '#8b1a2f', boxShadow: '0 4px 16px rgba(139,26,47,.35)' }}
        className="w-11 h-11 rounded-full text-white flex items-center justify-center
          border-[3px] border-white transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        {open ? <IcoChevUp/> : <IcoChevDown/>}
      </button>
    </div>
  </div>
)

export default SchoolCard
export { IcoChevDown, IcoChevUp, IcoArrow, WatermarkLines }