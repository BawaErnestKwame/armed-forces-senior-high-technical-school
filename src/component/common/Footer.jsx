// component/Footer.jsx
import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "./../../assets/logo.png"

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  royalBlue:      '#0e07dd',
  royalBlueDark:  '#261481',
  royalBlueLight: '#5a7ae8',
  white:          '#FFFFFF',
  navy:           '#261481',
}

// ─── Footer data ──────────────────────────────────────────────────────────────
const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&q=70',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=200&q=70',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&q=70',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&q=70',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&q=70',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&q=70',
]

const CAMPUS_LINKS = [
  { label: 'About AMESCO',   to: '/about' },
  { label: 'Alumni Network', to: '/alumni' },
  { label: 'School Library', to: '/school-life/library' },
  { label: 'Campus Life',    to: '/school-life/campus' },
  { label: 'Gallery',        to: '/school-life/gallery' },
  { label: 'School History', to: '/about/history' },
]

const USEFUL_LINKS = [
  { label: 'School Divisions',  to: '/about/administration' },
  { label: 'All Programmes',    to: '/academics' },
  { label: 'Campus Events',     to: '/news/events' },
  { label: 'How to Apply',      to: '/admissions/how-to-apply' },
  { label: 'Tuition & Fees',    to: '/admissions/fees' },
  { label: 'Financial Aid',     to: '/admissions/fees' },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  '#',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoPhone = () => (
  <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const IcoMail = () => (
  <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IcoPin = () => (
  <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IcoArrowUp = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)

// ─── FooterLink ───────────────────────────────────────────────────────────────
const FooterLink = ({ to, label }) => (
  <NavLink
    to={to}
    className="flex items-center gap-2 text-[13.5px] font-medium no-underline
      transition-all duration-200 group"
    style={{ color: 'rgba(255,255,255,.5)' }}
    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '4px' }}
    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.paddingLeft = '0' }}
  >
    <span
      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
      style={{ background: C.royalBlueLight }}
    />
    {label}
  </NavLink>
)

// ─── Newsletter form ──────────────────────────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div
        className="flex rounded-xl overflow-hidden border"
        style={{ borderColor: 'rgba(255,255,255,.12)' }}
      >
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 bg-transparent border-none outline-none px-4 py-3
            text-[13px] placeholder:text-white/30"
          style={{ color: '#fff', fontFamily: 'inherit' }}
        />
        <button
          type="submit"
          className="px-5 py-3 font-bold text-white text-[13px] border-none
            cursor-pointer transition-colors duration-200 flex-shrink-0"
          style={{ background: C.accentRed, fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.background = C.accentRedDark}
          onMouseLeave={e => e.currentTarget.style.background = C.accentRed}
        >
          {sent ? '✓' : '→'}
        </button>
      </div>
      {sent && (
        <p className="text-[12px]" style={{ color: C.accentRed }}>
          Thank you for subscribing!
        </p>
      )}
    </form>
  )
}

// ─── ScrollToTop button ───────────────────────────────────────────────────────
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full
        flex items-center justify-center text-white border-none cursor-pointer
        transition-all duration-300"
      style={{
        background:  C.accentRed,
        boxShadow:   `0 6px 20px rgba(230,57,70,.45)`,
        opacity:     visible ? 1 : 0,
        transform:   visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.85)',
        pointerEvents: visible ? 'all' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = C.accentRedDark
        e.currentTarget.style.transform   = 'translateY(-3px) scale(1.1)'
        e.currentTarget.style.boxShadow   = `0 10px 28px rgba(230,57,70,.55)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = C.accentRed
        e.currentTarget.style.transform   = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow   = `0 6px 20px rgba(230,57,70,.45)`
      }}
    >
      <IcoArrowUp/>
    </button>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: '#080619' }}>

    {/* ── Main footer grid ── */}
    <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

        {/* ── Col 1 — Brand + gallery + contact ── */}
        <div className="lg:col-span-1">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-5 no-underline">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: C.royalBlueDark }}
            >
              {logo
                ? <img src={logo} alt="AMESCO" className="w-8 h-8 object-contain"/>
                : <span className="text-white font-black text-[15px]">A</span>
              }
            </div>
            <div>
              <p className="font-['Playfair_Display'] text-[17px] font-black text-white leading-none">
                <span style={{ color: C.accentRed }}>Armed Forces</span> SHS
              </p>
              <p className="text-[10px] font-semibold mt-1 tracking-[.8px] uppercase"
                style={{ color: 'rgba(255,255,255,.4)' }}>
                AMESCO · Kumasi
              </p>
            </div>
          </Link>

          <p className="text-[13.5px] leading-[1.8] mb-5"
            style={{ color: 'rgba(255,255,255,.45)' }}>
            Armed Forces Senior High Technical School, Kumasi — established 1991.
            Building disciplined, brilliant, and globally competitive students.
          </p>

          {/* Gallery grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-5">
            {GALLERY_IMGS.map((src, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={src} alt=""
                  className="w-full h-full object-cover transition-all duration-400
                    group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          {/* Contact mini */}
          <div className="flex flex-col gap-2.5">
            {[
              { icon: <IcoPhone/>, text: '+233 24 873 2262',          href: 'tel:+233248732262' },
              { icon: <IcoMail/>,  text: 'armedforcesshts@yahoo.com', href: 'mailto:armedforcesshts@yahoo.com' },
              { icon: <IcoPin/>,   text: 'Old Uaddara Barracks, Bantama, Kumasi', href: null },
            ].map(({ icon, text, href }) => {
              const inner = (
                <div className="flex items-start gap-2.5"
                  style={{ color: 'rgba(255,255,255,.5)' }}>
                  <span style={{ color: C.accentRed, marginTop: 2 }}>{icon}</span>
                  <span className="text-[13px]">{text}</span>
                </div>
              )
              return href
                ? <a key={text} href={href} className="no-underline hover:opacity-80 transition-opacity">{inner}</a>
                : <div key={text}>{inner}</div>
            })}
          </div>
        </div>

        {/* ── Col 2 — Our Campus ── */}
        <div>
          <h4 className="font-['Playfair_Display'] text-[17px] font-black text-white mb-1 pb-3 relative">
            Our Campus
            <span
              className="absolute bottom-0 left-0 h-0.5 w-9"
              style={{ background: C.accentRed }}
            />
          </h4>
          <div className="flex flex-col gap-2.5 mt-4">
            {CAMPUS_LINKS.map(l => (
              <FooterLink key={l.to} to={l.to} label={l.label}/>
            ))}
          </div>
        </div>

        {/* ── Col 3 — Useful Links ── */}
        <div>
          <h4 className="font-['Playfair_Display'] text-[17px] font-black text-white mb-1 pb-3 relative">
            Useful Links
            <span
              className="absolute bottom-0 left-0 h-0.5 w-9"
              style={{ background: C.accentRed }}
            />
          </h4>
          <div className="flex flex-col gap-2.5 mt-4">
            {USEFUL_LINKS.map(l => (
              <FooterLink key={l.to} to={l.to} label={l.label}/>
            ))}
          </div>
        </div>

        {/* ── Col 4 — Newsletter + Socials ── */}
        <div>
          <h4 className="font-['Playfair_Display'] text-[17px] font-black text-white mb-1 pb-3 relative">
            Newsletter
            <span
              className="absolute bottom-0 left-0 h-0.5 w-9"
              style={{ background: C.accentRed }}
            />
          </h4>

          <p className="text-[13px] leading-[1.75] mb-4 mt-4"
            style={{ color: 'rgba(255,255,255,.45)' }}>
            Subscribe to get the latest news, events and notices from AMESCO straight to your inbox.
          </p>

          <Newsletter/>

          {/* Socials */}
          <div className="flex gap-2.5 mt-5 flex-wrap">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,.07)',
                  border:     '1px solid rgba(255,255,255,.1)',
                  color:      'rgba(255,255,255,.55)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.royalBlueDark
                  e.currentTarget.style.color      = '#fff'
                  e.currentTarget.style.borderColor= C.royalBlueDark
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'rgba(255,255,255,.07)'
                  e.currentTarget.style.color       = 'rgba(255,255,255,.55)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* School motto */}
          <div
            className="mt-6 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}
          >
            <p className="text-[10px] font-semibold tracking-[1.5px] uppercase mb-1"
              style={{ color: 'rgba(255,255,255,.3)' }}>
              School Motto
            </p>
            <p className="font-['Playfair_Display'] text-[14px] font-bold text-white">
              "Mmarima Mma" —{' '}
              <span style={{ color: C.accentRed }}>Excellence</span>
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div
      className="border-t"
      style={{ borderColor: 'rgba(255,255,255,.07)' }}
    >
      <div
        className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-5
          flex flex-wrap items-center justify-between gap-4"
      >
        <p className="text-[13px]" style={{ color: 'rgba(255,255,255,.35)' }}>
          © {new Date().getFullYear()} Armed Forces Senior High Technical School, Kumasi.
          All rights reserved.
        </p>

        <div className="flex gap-5 flex-wrap">
          {[
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Use',   to: '/terms' },
            { label: 'Sitemap',        to: '/sitemap' },
          ].map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-[13px] no-underline transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,.35)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.35)'}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>

  </footer>
)

export default Footer