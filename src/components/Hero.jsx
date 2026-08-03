import { useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi';
import { useTyping } from '../hooks/useInView';
import { personalInfo, roles, techBadges } from '../data/portfolioData';

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

    const PARTICLE_COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  Math.random() * 1.8 + 0.4,
      op: Math.random() * 0.45 + 0.1,
    }));

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Gentle attraction towards mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          p.vx += (dx / dist) * 0.008;
          p.vy += (dy / dist) * 0.008;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.8) { p.vx = (p.vx / spd) * 1.8; p.vy = (p.vy / spd) * 1.8; }

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,217,240,${p.op})`;
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
            ctx.strokeStyle = `rgba(0,217,240,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
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

// ─── Floating Tech Badge ──────────────────────────────────────
function FloatingBadge({ name, color, bg, top, left, right, dur, delay }) {
  return (
    <div
      className="float-badge hero-badge"
      style={{
        position: 'absolute',
        top, left, right,
        '--dur': dur,
        '--delay': delay,
        background: bg,
        border: `1px solid ${color}30`,
        borderRadius: '10px',
        padding: '8px 14px',
        fontFamily: 'Fira Code, monospace',
        fontSize: '12px',
        color: color,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 4px 20px ${color}15`,
        zIndex: 1,
      }}
    >
      {name}
    </div>
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
export default function Hero() {
  const typedText = useTyping(roles, { typeSpeed: 85, deleteSpeed: 45, pauseMs: 2000 });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Particle network */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,217,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,240,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,217,240,0.07) 0%, transparent 65%)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)',
        zIndex: 0,
      }} />

      {/* Floating tech badges (desktop only) */}
      {techBadges.map(b => <FloatingBadge key={b.name} {...b} />)}

      {/* Hero content */}
      <div
        className="container"
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          paddingTop: '80px',
        }}
      >
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '8px 20px',
          border: '1px solid rgba(0,217,240,0.2)',
          borderRadius: '100px',
          background: 'rgba(0,217,240,0.05)',
          marginBottom: '32px',
          animation: 'fadeUp 0.8s ease forwards',
        }}>
          <div className="glow-dot" />
          <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#00d9f0', letterSpacing: '0.1em' }}>
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          animation: 'fadeUp 0.8s 0.1s ease both',
        }}>
          <span style={{
            display: 'block',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            color: 'rgba(232,232,239,0.92)',
          }}>AVINASH</span>
          <span style={{
            display: 'block',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            background: 'linear-gradient(135deg, #00d9f0, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>KUMAR</span>
        </h1>

        {/* Typing animation */}
        <div style={{
          height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontWeight: 400,
            color: '#9898b0',
          }}>
            I&apos;m a&nbsp;
          </span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontWeight: 600,
            color: '#e8e8ef',
          }}>
            {typedText}
          </span>
          <span className="cursor-blink" />
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: '#56566a',
          maxWidth: '560px',
          margin: '0 auto 40px',
          lineHeight: 1.8,
          animation: 'fadeUp 0.8s 0.3s ease both',
        }}>
          Building beautiful, scalable AI-powered web applications. MERN Stack specialist based in Delhi, India.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: '14px',
          marginBottom: '48px',
          animation: 'fadeUp 0.8s 0.4s ease both',
        }}>
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Hire Me
          </a>
          <a href={personalInfo.resumeUrl} download className="btn-ghost">
            <FiDownload size={15} />
            Resume
          </a>
        </div>

        {/* Social icons */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px',
          marginTop: '80px', // Add this
          animation: 'fadeUp 0.8s 0.5s ease both',
          filter: 'drop-shadow(0 0 12px rgba(0,217,240,0.15))',
        }}>
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="social-icon"
              title={label}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute', bottom: '50px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'fadeUp 1s 0.8s ease both',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '8px',
          color: '#56566a',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>scroll</span>
        <div style={{
          width: '24px', height: '40px',
          border: '1.5px solid rgba(0,217,240,0.25)',
          boxShadow: '0 0 20px rgba(0,217,240,0.2)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '5px',
        }}>
          <div style={{
            width: '3px', height: '8px',
            borderRadius: '2px',
            background: '#00d9f0',
            boxShadow:'0 0 10px rgba(0,217,240,0.4), 0 0 25px rgba(0,217,240,0.25), 0 0 40px rgba(0,217,240,0.15)',
            animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);   opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-badge {
          display: flex !important;
        }
        @media (max-width: 1024px) {
          .hero-badge { display: none !important; }
        }
      `}</style>
    </section>
  );
}
