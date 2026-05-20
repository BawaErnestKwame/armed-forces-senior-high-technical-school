// component/cards/senior/Senior.jsx
import React from 'react'
import SchoolCard from '../SchoolCard'

const SeniorIcon = () => (
  <svg viewBox="0 0 80 70" fill="none" className="w-full h-full">
    <polygon points="40,6 76,24 40,38 4,24" fill="#1a1a2e"/>
    <path d="M20,30 Q20,46 40,46 Q60,46 60,30" fill="#1a1a2e" opacity=".75"/>
    <rect x="14" y="50" width="52" height="14" rx="4" fill="#1a1a2e" opacity=".8"/>
    <ellipse cx="14" cy="57" rx="5" ry="7" fill="#1a1a2e"/>
    <ellipse cx="66" cy="57" rx="5" ry="7" fill="#1a1a2e"/>
    <circle cx="40" cy="57" r="4"   fill="white"   opacity=".9"/>
    <circle cx="40" cy="57" r="1.8" fill="#1a1a2e" opacity=".5"/>
  </svg>
)

const LINKS = [
  { label: 'General Science', to: '/academics/general-science' },
  { label: 'Technical',       to: '/academics/technical' },
  { label: 'Business',        to: '/academics/business' },
]

const Senior = ({ open, onToggle, hasBorder }) => (
  <SchoolCard
    icon={<SeniorIcon/>}
    title="Senior School"
    desc="Advanced technical and academic programmes shaping tomorrow's innovators, professionals, and national leaders."
    links={LINKS}
    hasBorder={hasBorder}
    open={open}
    onToggle={onToggle}
  />
)

export default Senior