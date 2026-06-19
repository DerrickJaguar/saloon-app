import { useState, useEffect } from 'react'
import './App.css'

type Page = 'splash' | 'landing' | 'login' | 'register' | 'home'
type DashTab = 'overview' | 'explore' | 'appointments' | 'messages' | 'profile'

// ─── ICONS ────────────────────────────────────────────────────────────────────

const Ico = {
  scissors: ({ s = 24, c = '#6B7558' }: { s?: number; c?: string }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  search: ({ c = '#6B7558' }: { c?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  bell: ({ c = '#2A1F14' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  pin: ({ c = '#6B7558', s = 14 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  star: ({ s = 14 }: { s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="#C4963A" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  arrowR: ({ c = '#fff', s = 16 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  back: ({ c = '#2A1F14' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  calendar: ({ c = '#6B7558', s = 18 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  heart: ({ c = '#7B3C2A', s = 18 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  menu: ({ c = '#2A1F14' }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  x: ({ c = '#2A1F14' }: { c?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  home: ({ c = '#9B8C7A' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  map: ({ c = '#9B8C7A' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  appt: ({ c = '#9B8C7A' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  msg: ({ c = '#9B8C7A' }: { c?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  user: ({ c = '#9B8C7A', s = 20 }: { c?: string; s?: number }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  logout: ({ c = '#9B8C7A' }: { c?: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  email: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.29 6.29l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  eye: ({ off = false }: { off?: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8C7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {off ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
    </svg>
  ),
  google: () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  apple: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#2A1F14"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>),
  fb: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>),
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SALONS = [
  { name: 'Kamukuzi Beauty Lounge', addr: 'Kamukuzi Hill Rd, Mbarara City', dist: '1.2 km', rating: '5.0', reviews: 1191, color: '#8B9678' },
  { name: 'Ruti Hair Studio', addr: 'Ruti Road, Kakoba Division, Mbarara', dist: '2.8 km', rating: '5.0', reviews: 843, color: '#7A8B68' },
  { name: 'Nyamitanga Style House', addr: 'Nyamitanga Road, Mbarara City', dist: '3.5 km', rating: '4.8', reviews: 624, color: '#9A8068' },
  { name: 'Biharwe Glow Salon', addr: 'Biharwe Trading Centre, Mbarara', dist: '5.2 km', rating: '5.0', reviews: 2047, color: '#6B7A5C' },
]
const SERVICES = [
  { emoji: '✂️', label: 'Haircut' }, { emoji: '💄', label: 'Make Up' },
  { emoji: '💅', label: 'Manicure' }, { emoji: '🧖', label: 'Massage' },
  { emoji: '🎨', label: 'Coloring' }, { emoji: '🧴', label: 'Skin Care' },
]
const SPECS = [
  { name: 'Nalwoga', role: 'Stylist', salon: 'Kamukuzi Beauty', color: '#8B9678' },
  { name: 'Kemirembe', role: 'Colorist', salon: 'Kamukuzi Beauty', color: '#7A6858' },
  { name: 'Tumusiime', role: 'Makeup', salon: 'Ruti Studio', color: '#6B7A5C' },
  { name: 'Patrick', role: 'Barber', salon: 'Nyamitanga Style', color: '#9A8068' },
]
const REVIEWS = [
  { name: 'Grace T.', text: 'Absolutely amazing experience! Nalwoga did an incredible job with my highlights. Booking was seamless — will definitely be back.', rating: 5, date: 'Oct 14, 2026', initials: 'GT', color: '#8B9678' },
  { name: 'David K.', text: 'Found the perfect barber in Mbarara through Hair Salon. Clean shop, great atmosphere and the haircut was exactly what I wanted.', rating: 5, date: 'Oct 9, 2026', initials: 'DK', color: '#7A6858' },
  { name: 'Faith N.', text: 'The booking system is so intuitive. I got a same-day appointment at Biharwe Glow Salon and the results were outstanding.', rating: 5, date: 'Sep 30, 2026', initials: 'FN', color: '#6B7A5C' },
]

// ─── SPLASH ───────────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="splash">
      <div className="splash-ring r1" /><div className="splash-ring r2" />
      <div className="splash-inner">
        <div className="splash-mark"><Ico.scissors s={40} c="#fff" /></div>
        <p className="splash-brand">Hair Salon</p>
        <p className="splash-sub">Your Perfect Style Awaits</p>
        <div className="splash-dots"><span /><span /><span /></div>
      </div>
    </div>
  )
}

// ─── SITE NAV ─────────────────────────────────────────────────────────────────

function SiteNav({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#"><div className="nav-logo-ico"><Ico.scissors s={18} c="#fff" /></div>Hair Salon</a>
        <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#how" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#salons" onClick={() => setOpen(false)}>Salons</a>
          <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
        </div>
        <div className="nav-actions">
          <button className="nav-signin" onClick={onLogin}>Sign In</button>
          <button className="nav-cta" onClick={onRegister}>Get Started</button>
          <button className="nav-menu-btn" onClick={() => setOpen(o => !o)}>{open ? <Ico.x /> : <Ico.menu />}</button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile-menu">
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#how" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#salons" onClick={() => setOpen(false)}>Salons</a>
          <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
          <div className="nav-mobile-btns">
            <button className="nav-signin" onClick={onLogin}>Sign In</button>
            <button className="nav-cta" onClick={onRegister}>Get Started</button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────

function LandingPage({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="site">
      <SiteNav onLogin={onLogin} onRegister={onRegister} />

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-deco" />
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-badge">✓ Trusted by clients across Uganda</div>
            <h1 className="hero-h1">Find Your Perfect<br /><em>Salon Experience</em></h1>
            <p className="hero-desc">Discover and book top-rated salons and stylists near you — instantly and effortlessly. Your next great look is just one click away.</p>
            <div className="hero-stats">
              {[['50K+','Happy Clients'],['1.2K+','Partner Salons'],['4.9★','App Rating']].map(([v,l]) => (
                <div key={l} className="hero-stat"><span className="hero-stat-v">{v}</span><span className="hero-stat-l">{l}</span></div>
              ))}
            </div>
            <div className="hero-actions">
              <button className="btn-brown" onClick={onRegister}>Book an Appointment</button>
              <button className="btn-outline-green" onClick={onLogin}>Sign In →</button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-visual">
              <div className="hv-deco-ring" />
              <div className="hv-appt-card">
                <div className="hv-ac-top">
                  <div className="hv-ac-ico"><Ico.calendar c="#6B7558" s={16} /></div>
                  <span>Today's Appointment</span>
                  <span className="hv-badge-confirmed">Confirmed ✓</span>
                </div>
                <p className="hv-ac-time">10:00 AM</p>
                <p className="hv-ac-salon">At Kamukuzi Beauty Lounge</p>
                <div className="hv-ac-foot">
                  <div className="hv-ac-avatars">
                    {['#8B9678','#7A6858','#6B7A5C'].map(c => <div key={c} className="hv-tiny-av" style={{ background: c }} />)}
                  </div>
                  <button className="hv-ac-btn">View Details <Ico.arrowR s={13} c="#6B7558" /></button>
                </div>
              </div>
              <div className="hv-salon-card">
                <div className="hv-sc-img" style={{ background: 'linear-gradient(135deg,#8B9678,#6B7A5C)' }}><span>✂</span></div>
                <div className="hv-sc-info">
                  <p className="hv-sc-name">Kamukuzi Beauty Lounge</p>
                  <p className="hv-sc-addr"><Ico.pin s={11} c="#9B8C7A" /> Mbarara City, Uganda</p>
                  <div className="hv-sc-rating"><Ico.star s={12} /> <strong>5.0</strong> <span>(1,191)</span></div>
                </div>
                <button className="hv-sc-book">Book</button>
              </div>
              <div className="hv-stat-pill"><Ico.star s={14} /> <strong>4.9</strong> Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-light" id="services">
        <div className="container">
          <div className="section-head">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-h2">Services for Every Style</h2>
            <p className="section-sub">From classic cuts to full beauty treatments — find exactly what you're looking for.</p>
          </div>
          <div className="services-grid">
            {[
              { emoji:'✂️', title:'Haircut & Style', desc:'Precision cuts from master stylists' },
              { emoji:'💄', title:'Make Up', desc:'Bridal, event and everyday glam' },
              { emoji:'💅', title:'Nail Care', desc:'Manicure, pedicure and nail art' },
              { emoji:'🧖', title:'Massage & Spa', desc:'Relaxation and wellness treatments' },
              { emoji:'🎨', title:'Hair Coloring', desc:'Balayage, highlights and vivid color' },
              { emoji:'🧴', title:'Skin Care', desc:'Facials, peels and skin treatments' },
            ].map(s => (
              <div key={s.title} className="svc-card">
                <div className="svc-card-ico">{s.emoji}</div>
                <h3 className="svc-card-title">{s.title}</h3>
                <p className="svc-card-desc">{s.desc}</p>
                <span className="svc-card-link">Explore →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-cream" id="how">
        <div className="container">
          <div className="section-head">
            <p className="section-eyebrow">Simple Process</p>
            <h2 className="section-h2">Book in 3 Easy Steps</h2>
          </div>
          <div className="steps-grid">
            {[
              { n:'01', title:'Find a Salon', desc:'Search by location, service, or specialty. Filter by rating, distance and availability.' },
              { n:'02', title:'Choose & Book', desc:'Pick your stylist, select a time slot, and confirm your booking instantly online.' },
              { n:'03', title:'Arrive & Enjoy', desc:'Show up for your appointment. Pay easily online or in-salon. Leave looking amazing.' },
            ].map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SALONS ── */}
      <section className="section-light" id="salons">
        <div className="container">
          <div className="section-head">
            <p className="section-eyebrow">Top Picks</p>
            <h2 className="section-h2">Featured Salons Near You</h2>
            <p className="section-sub">Handpicked salons with the highest ratings and reviews from real clients.</p>
          </div>
          <div className="salons-grid">
            {SALONS.map((s) => (
              <div key={s.name} className="salon-feature-card">
                <div className="sfc-img" style={{ background: `linear-gradient(145deg, ${s.color}, ${s.color}99)` }}>
                  <span className="sfc-ico">✂</span>
                  <button className="sfc-fav"><Ico.heart s={16} c="rgba(255,255,255,0.9)" /></button>
                  <div className="sfc-badge">Open Now</div>
                </div>
                <div className="sfc-body">
                  <div className="sfc-top-row">
                    <h3 className="sfc-name">{s.name}</h3>
                    <span className="sfc-dist">{s.dist}</span>
                  </div>
                  <p className="sfc-addr"><Ico.pin s={12} c="#9B8C7A" /> {s.addr}</p>
                  <div className="sfc-foot">
                    <div className="sfc-rating"><Ico.star s={14} /> <strong>{s.rating}</strong> <span>({s.reviews.toLocaleString()} reviews)</span></div>
                    <button className="sfc-book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section-cream" id="reviews">
        <div className="container">
          <div className="section-head">
            <p className="section-eyebrow">Client Love</p>
            <h2 className="section-h2">What Our Clients Say</h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map(r => (
              <div key={r.name} className="review-card">
                <div className="rc-stars">{Array.from({length:r.rating}).map((_,i)=><Ico.star key={i} s={15}/>)}</div>
                <p className="rc-text">"{r.text}"</p>
                <div className="rc-author">
                  <div className="rc-av" style={{ background: r.color }}>{r.initials}</div>
                  <div><p className="rc-name">{r.name}</p><p className="rc-date">{r.date}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2 className="cta-h2">Ready for Your Next Great Look?</h2>
            <p className="cta-sub">Join thousands of clients across Mbarara who book smarter with Hair Salon.</p>
          </div>
          <div className="cta-actions">
            <button className="cta-btn-white" onClick={onRegister}>Get Started — Free</button>
            <button className="cta-btn-ghost" onClick={onLogin}>Sign In →</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><div className="nav-logo-ico"><Ico.scissors s={16} c="#fff" /></div>Hair Salon</div>
            <p className="footer-tagline">Your perfect salon experience, just a click away.</p>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <a href="#">About Us</a><a href="#">Careers</a><a href="#">Press</a><a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Services</p>
            <a href="#">Haircut</a><a href="#">Make Up</a><a href="#">Manicure</a><a href="#">Massage</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Support</p>
            <a href="#">Help Center</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">© 2026 Hair Salon. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin, onRegister, onBack }: { onLogin: () => void; onRegister: () => void; onBack: () => void }) {
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [show, setShow] = useState(false)
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <button className="auth-back" onClick={onBack}><Ico.back /><span>Back to home</span></button>
        <div className="auth-logo"><div className="nav-logo-ico"><Ico.scissors s={20} c="#fff" /></div><span>Hair Salon</span></div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to manage your appointments</p>
        <div className="auth-form">
          <div className="field">
            <label>Email Address</label>
            <div className="field-box"><Ico.email /><input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="field-box"><Ico.lock /><input type={show?'text':'password'} placeholder="Enter your password" value={pw} onChange={e=>setPw(e.target.value)} /><button className="eye-tog" type="button" onClick={()=>setShow(s=>!s)}><Ico.eye off={show}/></button></div>
          </div>
          <div className="field-row-end"><button className="txt-link">Forgot password?</button></div>
          <button className="btn-brown full" onClick={onLogin}>Sign In</button>
          <div className="auth-divider"><span /><span>or continue with</span><span /></div>
          <div className="social-btns">
            <button className="social-btn"><Ico.google /><span>Google</span></button>
            <button className="social-btn"><Ico.apple /><span>Apple</span></button>
            <button className="social-btn"><Ico.fb /><span>Facebook</span></button>
          </div>
          <p className="auth-switch">Don't have an account? <button className="txt-link-green" onClick={onRegister}>Create Account</button></p>
        </div>
      </div>
    </div>
  )
}

function RegisterPage({ onRegister, onLogin, onBack }: { onRegister: () => void; onLogin: () => void; onBack: () => void }) {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState('')
  const [pw,setPw]=useState(''); const [cpw,setCpw]=useState(''); const [showPw,setShowPw]=useState(false)
  const [showCpw,setShowCpw]=useState(false); const [terms,setTerms]=useState(false)
  return (
    <div className="auth-bg">
      <div className="auth-card auth-card-lg">
        <button className="auth-back" onClick={onBack}><Ico.back /><span>Back to home</span></button>
        <div className="auth-logo"><div className="nav-logo-ico"><Ico.scissors s={20} c="#fff" /></div><span>Hair Salon</span></div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join thousands of happy salon clients</p>
        <div className="auth-form">
          <div className="field-2col">
            <div className="field"><label>Full Name</label><div className="field-box"><Ico.user c="#9B8C7A" s={18}/><input type="text" placeholder="Grace Tumusiime" value={name} onChange={e=>setName(e.target.value)}/></div></div>
            <div className="field"><label>Phone Number</label><div className="field-box"><Ico.phone /><input type="tel" placeholder="+256 700 000 000" value={phone} onChange={e=>setPhone(e.target.value)}/></div></div>
          </div>
          <div className="field"><label>Email Address</label><div className="field-box"><Ico.email /><input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div></div>
          <div className="field-2col">
            <div className="field"><label>Password</label><div className="field-box"><Ico.lock /><input type={showPw?'text':'password'} placeholder="Create password" value={pw} onChange={e=>setPw(e.target.value)}/><button className="eye-tog" type="button" onClick={()=>setShowPw(s=>!s)}><Ico.eye off={showPw}/></button></div></div>
            <div className="field"><label>Confirm Password</label><div className="field-box"><Ico.lock /><input type={showCpw?'text':'password'} placeholder="Re-enter password" value={cpw} onChange={e=>setCpw(e.target.value)}/><button className="eye-tog" type="button" onClick={()=>setShowCpw(s=>!s)}><Ico.eye off={showCpw}/></button></div></div>
          </div>
          <label className="terms-row"><input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="terms-cb"/><span>I agree to the <span className="txt-link-green">Terms of Service</span> and <span className="txt-link-green">Privacy Policy</span></span></label>
          <button className="btn-brown full" onClick={onRegister}>Create Account</button>
          <div className="auth-divider"><span /><span>or sign up with</span><span /></div>
          <div className="social-btns">
            <button className="social-btn"><Ico.google /><span>Google</span></button>
            <button className="social-btn"><Ico.apple /><span>Apple</span></button>
            <button className="social-btn"><Ico.fb /><span>Facebook</span></button>
          </div>
          <p className="auth-switch">Already have an account? <button className="txt-link-green" onClick={onLogin}>Sign In</button></p>
        </div>
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

const SIDEBAR_TABS = [
  { id:'overview' as const, label:'Overview', Icon: Ico.home },
  { id:'explore' as const, label:'Explore Salons', Icon: Ico.map },
  { id:'appointments' as const, label:'Appointments', Icon: Ico.appt },
  { id:'messages' as const, label:'Messages', Icon: Ico.msg },
  { id:'profile' as const, label:'My Profile', Icon: Ico.user },
]

function HomePage({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<DashTab>('overview')
  const [sideOpen, setSideOpen] = useState(false)
  const [activeSvc, setActiveSvc] = useState('Haircut')

  return (
    <div className="dashboard">
      {/* Sidebar overlay for mobile */}
      {sideOpen && <div className="sidebar-overlay" onClick={() => setSideOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside className={`dash-sidebar ${sideOpen ? 'sidebar-open' : ''}`}>
        <div className="ds-logo"><div className="nav-logo-ico"><Ico.scissors s={16} c="#fff" /></div>Hair Salon</div>
        <nav className="ds-nav">
          {SIDEBAR_TABS.map(t => (
            <button
              key={t.id}
              className={`ds-tab ${tab === t.id ? 'ds-tab-on' : ''}`}
              onClick={() => { setTab(t.id); setSideOpen(false) }}
            >
              <t.Icon c={tab === t.id ? '#6B7558' : '#9B8C7A'} />
              <span>{t.label}</span>
              {t.id === 'messages' && <span className="ds-badge">3</span>}
            </button>
          ))}
        </nav>
        <div className="ds-user" onClick={onLogout} title="Sign out">
          <div className="ds-av">GT</div>
          <div className="ds-user-info"><p className="ds-uname">Grace Tumusiime</p><p className="ds-uemail">grace@email.com</p></div>
          <Ico.logout c="#9B8C7A" />
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="dash-topbar">
          <button className="sidebar-toggle" onClick={() => setSideOpen(o => !o)}><Ico.menu c="#2A1F14" /></button>
          <div className="dt-search">
            <Ico.search c="#9B8C7A" />
            <input type="text" placeholder="Search salons, services, specialists..." />
          </div>
          <div className="dt-actions">
            <button className="dt-btn">
              <Ico.bell c="#2A1F14" />
              <span className="dt-notif" />
            </button>
            <div className="dt-avatar">GT</div>
          </div>
        </header>

        {/* Content */}
        <main className="dash-content">
          {/* Greeting */}
          <div className="dash-greeting">
            <div>
              <h2 className="dg-name">Good morning, Grace 👋</h2>
              <p className="dg-sub"><Ico.pin s={13} c="#9B8C7A" /> Mbaguta Street, Mbarara City, Uganda</p>
            </div>
            <button className="btn-brown" onClick={() => setTab('appointments')}>Book Appointment</button>
          </div>

          {/* Quick stats */}
          <div className="dash-stats">
            {[
              { label:'Upcoming', val:'3', sub:'appointments', color:'#6B7558' },
              { label:'Completed', val:'24', sub:'total bookings', color:'#7B3C2A' },
              { label:'Favourite', val:'5', sub:'salons saved', color:'#C4963A' },
              { label:'Rewards', val:'180', sub:'points earned', color:'#4E5C40' },
            ].map(s => (
              <div key={s.label} className="dash-stat-card">
                <div className="dsc-val" style={{ color: s.color }}>{s.val}</div>
                <div className="dsc-label">{s.label}</div>
                <div className="dsc-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Two-column content */}
          <div className="dash-cols">
            {/* Left col */}
            <div className="dash-col-main">
              {/* Appointment card */}
              <div className="dash-card-head">
                <h3>Upcoming Appointment</h3>
                <button className="view-all-link" onClick={() => setTab('appointments')}>View All</button>
              </div>
              <div className="appt-card-web">
                <div className="acw-left">
                  <div className="acw-label"><Ico.calendar c="rgba(255,255,255,0.75)" s={15}/> Today · Morning</div>
                  <div className="acw-time">10:00 AM</div>
                  <div className="acw-salon">At The Lotus Hair Salon</div>
                  <div className="acw-tags">
                    <span>✂ Haircut</span><span>💇 Classic Shave</span>
                  </div>
                </div>
                <div className="acw-right">
                  <div className="acw-status">Confirmed</div>
                  <button className="acw-btn">View Details</button>
                  <button className="acw-cancel-btn">Cancel</button>
                </div>
              </div>

              {/* Services filter */}
              <div className="dash-card-head" style={{ marginTop: 28 }}>
                <h3>Services</h3>
              </div>
              <div className="svc-chips">
                {SERVICES.map(s => (
                  <button key={s.label} className={`svc-chip ${activeSvc===s.label?'svc-chip-on':''}`} onClick={()=>setActiveSvc(s.label)}>
                    <span>{s.emoji}</span>{s.label}
                  </button>
                ))}
              </div>

              {/* Nearest salons */}
              <div className="dash-card-head" style={{ marginTop: 28 }}>
                <h3>Nearest Salons</h3>
                <button className="view-all-link">View All</button>
              </div>
              <div className="salon-web-list">
                {SALONS.map((s) => (
                  <div key={s.name} className="salon-web-row">
                    <div className="swr-img" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}>✂</div>
                    <div className="swr-info">
                      <p className="swr-name">{s.name}</p>
                      <p className="swr-addr"><Ico.pin s={11} c="#9B8C7A" /> {s.addr}</p>
                      <div className="swr-meta"><Ico.star s={12}/> {s.rating} · {s.dist}</div>
                    </div>
                    <button className="swr-book">Book Now</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col */}
            <div className="dash-col-side">
              {/* Specialists */}
              <div className="dash-card-head">
                <h3>Salon Specialists</h3>
                <button className="view-all-link">View All</button>
              </div>
              <div className="specs-web-list">
                {SPECS.map(sp => (
                  <div key={sp.name} className="spec-web-row">
                    <div className="spw-av" style={{ background: sp.color }}>{sp.name[0]}</div>
                    <div className="spw-info">
                      <p className="spw-name">{sp.name}</p>
                      <p className="spw-role">{sp.role} · {sp.salon}</p>
                      <div className="spw-stars"><Ico.star s={11}/><Ico.star s={11}/><Ico.star s={11}/><Ico.star s={11}/><Ico.star s={11}/></div>
                    </div>
                    <button className="spw-book">Book</button>
                  </div>
                ))}
              </div>

              {/* Promo card */}
              <div className="promo-card">
                <div className="promo-card-deco" />
                <p className="promo-tag">Limited Offer</p>
                <h3 className="promo-h3">20% OFF<br/>First Booking</h3>
                <p className="promo-sub">Use code <strong>FIRST20</strong> at checkout</p>
                <button className="promo-btn">Claim Offer →</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        {SIDEBAR_TABS.map(t => (
          <button key={t.id} className={`mbn-tab ${tab===t.id?'mbn-on':''}`} onClick={()=>setTab(t.id)}>
            <t.Icon c={tab===t.id?'#6B7558':'#9B8C7A'} />
            <span>{t.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('splash')
  return (
    <>
      {page==='splash'   && <SplashScreen onDone={()=>setPage('landing')}/>}
      {page==='landing'  && <LandingPage  onLogin={()=>setPage('login')} onRegister={()=>setPage('register')}/>}
      {page==='login'    && <LoginPage    onLogin={()=>setPage('home')} onRegister={()=>setPage('register')} onBack={()=>setPage('landing')}/>}
      {page==='register' && <RegisterPage onRegister={()=>setPage('home')} onLogin={()=>setPage('login')} onBack={()=>setPage('landing')}/>}
      {page==='home'     && <HomePage     onLogout={()=>setPage('landing')}/>}
    </>
  )
}
