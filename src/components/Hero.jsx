import { useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload, FiSearch } from 'react-icons/fi';
import { useTyping } from '../hooks/useInView';
import { personalInfo, roles } from '../data/portfolioData';
import VibeTerminal from './VibeTerminal';
import { sound } from '../utils/sound';

// ─── Particle Canvas ──────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const PARTICLE_COUNT = Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 14000));

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r:  Math.random() * 2.0 + 0.5,
      op: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.4 ? 'rgba(0,217,240,' : 'rgba(139,92,246,',
    }));

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          p.vx += (dx / dist) * 0.008;
          p.vy += (dy / dist) * 0.008;
        }

        p.x += p.vx;
        p.y += p.vy;

        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.8) { p.vx = (p.vx / spd) * 1.8; p.vy = (p.vy / spd) * 1.8; }

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.op})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,217,240,${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'block' }}
    />
  );
}

// ─── Social Button ────────────────────────────────────────────
const socials = [
  { icon: FiGithub,   href: personalInfo.github,    label: 'GitHub'   },
  { icon: FiLinkedin, href: personalInfo.linkedin,  label: 'LinkedIn' },
  { icon: FiTwitter,  href: personalInfo.twitter,   label: 'Twitter'  },
  { icon: FiMail,     href: `mailto:${personalInfo.email}`, label: 'Email' },
];

// ─── Hero Component ───────────────────────────────────────────
export default function Hero({ onOpenCommandPalette }) {
  const typedText = useTyping(roles, { typeSpeed: 85, deleteSpeed: 45, pauseMs: 2000 });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: '130px',
        paddingBottom: '80px',
      }}
    >
      {/* Particle network */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,217,240,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,240,0.035) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '650px', height: '650px',
        background: 'radial-gradient(circle, rgba(0,217,240,0.08) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Hero content grid */}
      <div
        className="container hero-grid-container"
        style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '36px',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {/* Left Column: Intro */}
        <div>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '8px 18px',
            border: '1px solid rgba(0,217,240,0.25)',
            borderRadius: '100px',
            background: 'rgba(0,217,240,0.06)',
            marginBottom: '24px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(0,217,240,0.15)',
          }}>
            <div className="glow-dot" />
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#00d9f0', letterSpacing: '0.05em' }}>
              Full Stack & AI Engineer
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              color: 'rgba(232,232,239,0.95)',
            }}>AVINASH</span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              background: 'linear-gradient(135deg, #00d9f0, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>KUMAR</span>
          </h1>

          {/* Typing animation */}
          <div style={{
            height: '48px',
            display: 'flex', alignItems: 'center',
            marginBottom: '16px',
          }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(15px, 2vw, 20px)', color: '#9898b0' }}>
              I build&nbsp;
            </span>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: 'clamp(15px, 2vw, 20px)', fontWeight: 600, color: '#00d9f0' }}>
              {typedText}
            </span>
            <span className="cursor-blink" />
          </div>

          {/* Bio paragraph */}
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(14px, 1.6vw, 16.5px)',
            color: '#9898b0',
            maxWidth: '520px',
            marginBottom: '32px',
            lineHeight: 1.8,
          }}>
            Architecting scalable production platforms (<span style={{ color: '#00d9f0' }}>crm.tmsvisa.com</span>, <span style={{ color: '#10b981' }}>tmsvisa.com</span>, <span style={{ color: '#f97316' }}>triloknathimmigration.in</span>) using Next.js, MERN stack, TypeScript, and AI integrations.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
            <a href="#projects" onClick={() => sound.click()} className="btn-primary">
              Explore Projects
            </a>
            <button
              onClick={() => {
                sound.click();
                if (onOpenCommandPalette) onOpenCommandPalette();
              }}
              className="btn-secondary"
            >
              <FiSearch size={15} /> ⌘K Menu
            </button>
            <a href={personalInfo.resumeUrl} download onClick={() => sound.click()} className="btn-ghost">
              <FiDownload size={15} /> Resume
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="social-icon"
                title={label}
                onClick={() => sound.hover()}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Vibe Terminal */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <VibeTerminal />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
