import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(3,3,5,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0,217,240,0.08)'
            : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px',
              background: 'linear-gradient(135deg, rgba(0,217,240,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(0,217,240,0.3)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '14px', fontWeight: '700',
                background: 'linear-gradient(135deg, #00d9f0, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>AK</span>
            </div>
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '14px', fontWeight: '600',
              color: '#e8e8ef',
              letterSpacing: '0.05em',
              display: window.innerWidth < 480 ? 'none' : 'block',
            }}>Avinash</span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '4px' }} className="hidden-mobile">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${active === href.slice(1) ? 'active' : ''}`}
                style={{ padding: '6px 14px', borderRadius: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              style={{ width: '36px', height: '36px' }}
              title="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Resume
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="show-mobile"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,217,240,0.2)',
                borderRadius: '8px',
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: '#e8e8ef',
              }}
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: '64px', left: 0, right: 0,
          background: 'rgba(3,3,5,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,217,240,0.1)',
          zIndex: 999,
          padding: mobileOpen ? '20px 24px 28px' : '0 24px',
          maxHeight: mobileOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                color: active === href.slice(1) ? '#00d9f0' : '#9898b0',
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '10px',
                background: active === href.slice(1) ? 'rgba(0,217,240,0.06)' : 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
              <span style={{ fontSize: '18px', color: 'rgba(0,217,240,0.4)' }}>→</span>
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
