// component/cards/boarding/Boarding.jsx
import React from 'react'
import SchoolCard from '../SchoolCard'

const BoardingIcon = () => (
  <svg viewBox="0 0 80 70" fill="none" className="w-full h-full">
    <polygon points="40,8 72,24 40,36 8,24" fill="#1a1a2e"/>
    <path d="M20,30 Q20,46 40,46 Q60,46 60,30" fill="#1a1a2e" opacity=".75"/>
    <line x1="72" y1="24" x2="72" y2="42" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="72" cy="45" r="3.5" fill="#1a1a2e"/>
    <rect x="12" y="48" width="56" height="10" rx="3" fill="#1a1a2e" opacity=".7"/>
    <rect x="15" y="60" width="50" height="7"  rx="3" fill="#1a1a2e" opacity=".45"/>
  </svg>
)

const LINKS = [
  { label: 'Boarding Life',      to: '/school-life/boarding' },
  { label: 'Sports & Athletics', to: '/school-life/sports' },
  { label: 'Alumni Network',     to: '/alumni' },
]

const Boarding = ({ open, onToggle, hasBorder }) => (
  <SchoolCard
    icon={<BoardingIcon/>}
    title="Boarding School"
    desc="A nurturing residential environment built to develop resilience, discipline, and holistic growth in every student."
    links={LINKS}
    hasBorder={hasBorder}
    open={open}
    onToggle={onToggle}
  />
)

export default Boarding