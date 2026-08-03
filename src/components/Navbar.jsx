import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiSearch, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar({ onOpenCommandPalette, soundEnabled, onToggleSound }) {
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
          background: 'rgba(5, 5, 14, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 217, 240, 0.15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', padding: '0 24px' }}>
          {/* Logo */}
          <a
            href="#"
            onClick={() => sound.click()}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            <div style={{
              width: '38px', height: '38px',
              background: 'linear-gradient(135deg, rgba(0,217,240,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(0,217,240,0.4)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0,217,240,0.2)',
            }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '14px', fontWeight: '700',
                background: 'linear-gradient(135deg, #00d9f0, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>AK</span>
            </div>
            <span className="logo-text font-orbitron" style={{ fontWeight: 700, fontSize: '16px', color: '#e8e8ef', whiteSpace: 'nowrap' }}>
              Avinash<span style={{ color: '#00d9f0' }}>.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2px', alignItems: 'center' }} className="hidden-tablet">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => sound.hover()}
                className={`nav-link ${active === href.slice(1) ? 'active' : ''}`}
                style={{ padding: '6px 12px', borderRadius: '8px', transition: 'background 0.2s', whiteSpace: 'nowrap', fontSize: '13px' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.click();
                if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'rgba(0,217,240,0.06)',
                border: '1px solid rgba(0,217,240,0.2)',
                borderRadius: '8px',
                color: '#00d9f0',
                fontFamily: 'Fira Code, monospace',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              className="hidden-tablet"
              title="Command Palette (Ctrl + K)"
            >
              <FiSearch size={13} />
              <span>⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                if (onToggleSound) onToggleSound();
              }}
              style={{
                width: '36px', height: '36px',
                background: soundEnabled ? 'rgba(0,217,240,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${soundEnabled ? 'rgba(0,217,240,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: soundEnabled ? '#00d9f0' : '#9898b0',
                transition: 'all 0.2s ease',
              }}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Cyber Sound FX'}
            >
              {soundEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon hidden-tablet"
              style={{ width: '36px', height: '36px' }}
              title="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary resume-btn"
              style={{ padding: '8px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              Resume
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="show-tablet"
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
          background: 'rgba(5, 5, 14, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,217,240,0.15)',
          zIndex: 999,
          padding: mobileOpen ? '16px' : '0',
          maxHeight: mobileOpen ? '420px' : '0',
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
                fontSize: '15px',
                fontWeight: '500',
                color: active === href.slice(1) ? '#00d9f0' : '#9898b0',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                background: active === href.slice(1) ? 'rgba(0,217,240,0.06)' : 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
              <span style={{ fontSize: '16px', color: 'rgba(0,217,240,0.4)' }}>→</span>
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              color: '#00d9f0',
              padding: '10px 16px',
              background: 'rgba(0,217,240,0.06)',
              border: '1px solid rgba(0,217,240,0.2)',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <FiSearch size={14} /> Open Command Palette (⌘K)
          </button>
        </nav>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hidden-tablet { display: none !important; }
        }
        @media (min-width: 1025px) {
          .show-tablet { display: none !important; }
        }
      `}</style>
    </>
  );
}
