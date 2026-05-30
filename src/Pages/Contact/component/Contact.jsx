// pages/Contact.jsx
import React, { useState } from 'react'

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  accentRed:      '#E63946',
  accentRedDark:  '#c1121f',
  royalBlue:      '#0e07dd',
  royalBlueDark:  '#261481',
  royalBlueLight: '#5a7ae8',
  white:          '#FFFFFF',
  lightGray:      '#f8f9fa',
  mediumGray:     '#e9ecef',
  darkGray:       '#343a40',
  navy:           '#261481',
  bodyText:       '#4b5563',
}

// ─── Contact info cards ───────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Phone',
    lines: ['+233 24 873 2262', '+233 32 2032999'],
    href:  'tel:+233248732262',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Email',
    lines: ['armedforcesshts@yahoo.com'],
    href:  'mailto:armedforcesshts@yahoo.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Location',
    lines: ['Old Uaddara Barracks,', 'Bantama, Kumasi, Ghana'],
    href:  'https://maps.google.com/?q=Armed+Forces+Senior+High+School+Kumasi',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Office Hours',
    lines: ['Mon – Fri: 7:00am – 4:00pm', 'Sat: 8:00am – 12:00pm'],
    href:  null,
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const IcoArrow = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="8" x2="14" y2="8"/>
    <polyline points="9,3 14,8 9,13"/>
  </svg>
)

// ─── Reusable input/textarea styles ──────────────────────────────────────────
const inputCls = `
  w-full px-4 py-3.5 rounded-xl text-[14px] outline-none
  border transition-all duration-200
  placeholder:text-[#9ca3af]
`

// ─── Contact Page ─────────────────────────────────────────────────────────────
const Contact = () => {
  const [form,    setForm]    = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
    setTimeout(() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }) }, 5000)
  }

  const fieldStyle = (name) => ({
    borderColor: focused === name ? C.royalBlue : C.mediumGray,
    boxShadow:   focused === name ? `0 0 0 3px rgba(14,7,221,.08)` : 'none',
    background:  C.white,
    color:       C.darkGray,
    fontFamily:  'inherit',
  })

  return (
    <div>

      {/* ══ HERO BANNER ═════════════════════════════════════════════════════ */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: 340 }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,8,80,.68)' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-16">
          <h1
            className="font-['Playfair_Display'] font-black text-white mb-4"
            style={{ fontSize: 'clamp(38px, 6vw, 64px)' }}
          >
            Contact
          </h1>

          {/* Divider line — exactly like reference */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-px" style={{ background: 'rgba(255,255,255,.5)' }}/>
          </div>

          <p
            className="text-white/70 text-[15px] leading-relaxed max-w-[500px] mx-auto"
          >
            Education goes beyond textbooks and classrooms. We believe in empowering
            students to explore their passions and challenge conventions.
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mt-5 text-[13px]">
            <span className="text-white/50">Home</span>
            <span className="text-white/30">›</span>
            <span style={{ color: C.accentRed }} className="font-semibold">Contact</span>
          </div>
        </div>
      </div>

      {/* ══ INFO CARDS ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-14"
        >
          {INFO_CARDS.map((card, i) => {
            const inner = (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3
                  transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,.1)' }}
              >
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                    transition-all duration-300"
                  style={{ background: `rgba(14,7,221,.08)`, color: C.royalBlueDark }}
                >
                  {card.icon}
                </div>

                <h4
                  className="font-['Playfair_Display'] text-[17px] font-black"
                  style={{ color: C.navy }}
                >
                  {card.title}
                </h4>

                {card.lines.map((line, j) => (
                  <p key={j} className="text-[13.5px]" style={{ color: C.bodyText }}>
                    {line}
                  </p>
                ))}
              </div>
            )

            return card.href ? (
              <a
                key={i}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="no-underline block"
              >
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            )
          })}
        </div>
      </div>

      {/* ══ FORM + MAP ══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: C.lightGray }}>
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* ── Contact Form ── */}
            <div
              className="bg-white rounded-2xl p-8 sm:p-10"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,.07)' }}
            >
              {/* Section tag */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[12px] font-bold tracking-[2px] uppercase"
                  style={{ color: C.accentRed }}
                >
                  Get In Touch
                </span>
              </div>

              <h2
                className="font-['Playfair_Display'] text-[32px] font-black mb-2"
                style={{ color: C.navy }}
              >
                Send Us a Message
              </h2>
              <p className="text-[14px] mb-8" style={{ color: C.bodyText }}>
                Have a question or want to know more about AMESCO? Fill in the form
                and our team will get back to you within 24 hours.
              </p>

              {/* Success banner */}
              {sent && (
                <div
                  className="rounded-xl px-5 py-4 mb-6 flex items-center gap-3"
                  style={{ background: 'rgba(14,7,221,.06)', border: `1px solid ${C.royalBlueLight}` }}
                >
                  <span style={{ color: C.royalBlue, fontSize: 18 }}>✓</span>
                  <p className="text-[14px] font-semibold" style={{ color: C.royalBlueDark }}>
                    Message sent! We'll be in touch soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[.5px] mb-2"
                      style={{ color: C.darkGray }}>
                      Full Name *
                    </label>
                    <input
                      name="name" type="text" required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="John Doe"
                      className={inputCls}
                      style={fieldStyle('name')}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[.5px] mb-2"
                      style={{ color: C.darkGray }}>
                      Email Address *
                    </label>
                    <input
                      name="email" type="email" required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      placeholder="john@example.com"
                      className={inputCls}
                      style={fieldStyle('email')}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[.5px] mb-2"
                      style={{ color: C.darkGray }}>
                      Phone Number
                    </label>
                    <input
                      name="phone" type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused('')}
                      placeholder="+233 00 000 0000"
                      className={inputCls}
                      style={fieldStyle('phone')}
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[.5px] mb-2"
                      style={{ color: C.darkGray }}>
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused('')}
                      className={inputCls}
                      style={{ ...fieldStyle('subject'), appearance: 'none' }}
                    >
                      <option value="">Select subject</option>
                      <option>Admissions Enquiry</option>
                      <option>Academic Programmes</option>
                      <option>Boarding Information</option>
                      <option>Fees & Finance</option>
                      <option>Alumni Affairs</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-[.5px] mb-2"
                    style={{ color: C.darkGray }}>
                    Message *
                  </label>
                  <textarea
                    name="message" required rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Type your message here…"
                    className={inputCls}
                    style={{ ...fieldStyle('message'), resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending || sent}
                  className="inline-flex items-center justify-center gap-2.5 text-white font-bold
                    text-[14px] px-8 py-4 rounded-full border-none cursor-pointer
                    transition-all duration-300 hover:-translate-y-0.5 self-start"
                  style={{
                    background:  sending ? C.royalBlueDark : C.accentRed,
                    boxShadow:   `0 6px 20px rgba(230,57,70,.35)`,
                    fontFamily:  'inherit',
                    opacity:     sent ? .7 : 1,
                  }}
                  onMouseEnter={e => { if (!sending && !sent) e.currentTarget.style.background = C.accentRedDark }}
                  onMouseLeave={e => { e.currentTarget.style.background = sending ? C.royalBlueDark : C.accentRed }}
                >
                  {sending ? 'Sending…' : sent ? 'Message Sent ✓' : (
                    <>Send Message <IcoArrow/></>
                  )}
                </button>
              </form>
            </div>

            {/* ── Right side — additional info + map ── */}
            <div className="flex flex-col gap-8">

              {/* Why contact us */}
              <div
                className="bg-white rounded-2xl p-8"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,.07)' }}
              >
                <h3
                  className="font-['Playfair_Display'] text-[24px] font-black mb-5"
                  style={{ color: C.navy }}
                >
                  Visit Our Campus
                </h3>

                <div className="flex flex-col gap-5">
                  {[
                    { num:'01', title:'Location',    body:'Old Uaddara Barracks, Bantama, Kumasi, Ashanti Region, Ghana.' },
                    { num:'02', title:'Directions',  body:'Located near the Kumasi Military Barracks. Take the Bantama road from Kejetia and look for the AMESCO signage.' },
                    { num:'03', title:'Parking',     body:'Free parking is available at the main school compound for visiting parents and guests.' },
                  ].map(item => (
                    <div key={item.num} className="flex gap-4 items-start">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center
                          text-white text-[12px] font-black flex-shrink-0"
                        style={{ background: C.accentRed }}
                      >
                        {item.num}
                      </div>
                      <div>
                        <p className="font-bold text-[14px] mb-1" style={{ color: C.navy }}>
                          {item.title}
                        </p>
                        <p className="text-[13.5px] leading-relaxed" style={{ color: C.bodyText }}>
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map embed */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,.1)', height: 300 }}
              >
                <iframe
                  title="AMESCO Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.580527038!2d-1.5726!3d6.6885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb966c9a9a3de3%3A0x4f7b6e3f8f8f8f8f!2sBantama%2C+Kumasi!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact