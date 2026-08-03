import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('counting'); // 'counting' | 'done' | 'exiting'

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.floor(Math.random() * 6) + 2;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setCount(100);
        setPhase('done');
        setTimeout(() => setPhase('exiting'), 300);
      } else {
        setCount(val);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#030305',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: phase === 'exiting' ? 0 : 1,
        transform: phase === 'exiting' ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: phase === 'exiting' ? 'none' : 'auto',
      }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,217,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,240,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', right: '20%',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,240,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '15%',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      {/* Logo */}
      <div style={{ position: 'relative', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px',
          background: 'linear-gradient(135deg, rgba(0,217,240,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(0,217,240,0.3)',
          borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 0 40px rgba(0,217,240,0.15)',
        }}>
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00d9f0, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AK</span>
        </div>

        {/* Name */}
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(18px, 3vw, 26px)',
          fontWeight: '700',
          color: '#e8e8ef',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          Avinash Kumar
        </div>
        <div style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '11px',
          color: '#00d9f0',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '6px',
        }}>
          Full Stack Developer
        </div>
      </div>

      {/* Progress */}
      <div style={{ width: 'min(340px, 80vw)' }}>
        {/* Bar */}
        <div style={{
          height: '3px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '100px',
          overflow: 'hidden',
          marginBottom: '14px',
        }}>
          <div style={{
            height: '100%',
            width: `${count}%`,
            borderRadius: '100px',
            background: 'linear-gradient(90deg, #00d9f0, #8b5cf6)',
            transition: 'width 0.08s ease',
            boxShadow: '0 0 12px rgba(0,217,240,0.5)',
          }} />
        </div>

        {/* Count row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '11px',
            color: '#56566a',
            letterSpacing: '0.1em',
          }}>
            {count < 100 ? 'Initializing...' : 'Ready'}
          </span>
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '16px',
            fontWeight: '600',
            color: '#00d9f0',
          }}>
            {count}%
          </span>
        </div>
      </div>

      {/* Bottom tag */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontFamily: 'Fira Code, monospace',
        fontSize: '10px',
        color: '#56566a',
        letterSpacing: '0.15em',
      }}>
        &lt;portfolio version=&quot;2026&quot; /&gt;
      </div>
    </div>
  );
}
