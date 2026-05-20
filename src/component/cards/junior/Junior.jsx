// component/cards/junior/Junior.jsx
import React from 'react'
import SchoolCard from '../SchoolCard'

const JuniorIcon = () => (
  <svg viewBox="0 0 80 70" fill="none" className="w-full h-full">
    <rect x="8"  y="38" width="46" height="8"  rx="2" fill="#1a1a2e" opacity=".85"/>
    <rect x="10" y="28" width="42" height="12" rx="2" fill="#1a1a2e"/>
    <rect x="12" y="20" width="38" height="10" rx="2" fill="#1a1a2e" opacity=".7"/>
    <polygon points="56,6 70,18 56,22 42,18" fill="#1a1a2e"/>
    <ellipse cx="56" cy="18" rx="14" ry="5" fill="#1a1a2e" opacity=".6"/>
    <line x1="70" y1="18" x2="70" y2="30" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="70" cy="32" r="3" fill="#1a1a2e"/>
    <circle cx="22" cy="52" r="7" fill="#1a1a2e" opacity=".9"/>
    <circle cx="22" cy="52" r="4" fill="white" opacity=".9"/>
  </svg>
)

const LINKS = [
  { label: 'Basic Sciences',  to: '/academics/general-science' },
  { label: 'Visual Arts',     to: '/academics/visual-arts' },
  { label: 'Performing Arts', to: '/school-life/clubs' },
]

const Junior = ({ open, onToggle, hasBorder }) => (
  <SchoolCard
    icon={<JuniorIcon/>}
    title="Junior School"
    desc="Our programmes are designed to develop curious, confident learners with a strong academic foundation from the very start."
    links={LINKS}
    hasBorder={hasBorder}
    open={open}
    onToggle={onToggle}
  />
)

export default Junior