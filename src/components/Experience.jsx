import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { experience, education } from "../data/portfolioData";
import { FiExternalLink, FiCalendar, FiMapPin, FiCheck } from "react-icons/fi";

/* ── Animated SVG Timeline Connector ─────────────────────────── */
function TimelineLine({ color }) {
  return (
    <svg width="2" height="60" style={{ margin: "4px 0" }}>
      <line x1="1" y1="0" x2="1" y2="60"
        stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4"
        style={{ animation: "dashFlow 2s linear infinite" }}
      />
    </svg>
  );
}

/* ── Experience Card ─────────────────────────────────────────── */
function ExperienceCard({ exp, index, inView }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      display: "flex", gap: "0", alignItems: "flex-start",
      opacity: 0,
      animation: inView ? `fadeLeft 0.7s ${index * 150}ms ease forwards` : "none",
    }}>
      
      {/* Timeline column */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0, marginRight: "20px" }}>
        {/* Outer ring */}
        <div style={{
          width: "40px", height: "40px",
          borderRadius: "50%",
          border: `2px solid ${exp.color}`,
          background: `${exp.color}10`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 0 20px ${exp.color}30`,
          animation: "ringGlow 2.5s ease-in-out infinite",
        }}>
          <div style={{
            width: "10px", height: "10px",
            borderRadius: "50%",
            background: exp.color,
            boxShadow: `0 0 8px ${exp.color}`,
          }} />
        </div>
        {/* Line down */}
        {index < experience.length - 1 && (
          <div style={{
            width: "2px", flex: 1, minHeight: "40px", marginTop: "8px",
            background: `linear-gradient(to bottom, ${exp.color}50, transparent)`,
            borderRadius: "1px",
          }} />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          marginBottom: index < experience.length - 1 ? "40px" : "0",
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${exp.color}20`,
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${exp.color}40`;
          e.currentTarget.style.boxShadow =
            `0 0 20px ${exp.color}30, 0 0 40px ${exp.color}15`;
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${exp.color}20`;
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Card Header */}
        <div style={{
          padding: "20px 22px",
          background: `linear-gradient(135deg, ${exp.color}08, transparent)`,
          borderBottom: `1px solid ${exp.color}15`,
          cursor: "pointer",
        }}
          onClick={() => setExpanded(v => !v)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <h3 style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(14px, 1.8vw, 17px)", fontWeight: 700,
                color: "#e8e8ef", marginBottom: "4px",
              }}>
                {exp.role}
              </h3>
              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "DM Sans, sans-serif", fontSize: "14px",
                  color: exp.color, fontWeight: 600, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                {exp.company}
                <FiExternalLink size={11} />
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px",
                fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>
                <FiCalendar size={11} color={exp.color} />
                {exp.period}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px",
                fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>
                <FiMapPin size={11} color={exp.color} />
                {exp.type}
              </div>
              <span style={{
                padding: "2px 10px",
                background: `${exp.color}12`,
                border: `1px solid ${exp.color}30`,
                borderRadius: "100px",
                fontFamily: "Fira Code, monospace", fontSize: "10px",
                color: exp.color,
              }}>
                {exp.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable body */}
        <div style={{
          maxHeight: expanded ? "800px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ padding: "20px 22px" }}>
            {/* Bullet points */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {exp.points.map((pt, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "18px", height: "18px",
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}30`,
                    borderRadius: "4px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>
                    <FiCheck size={10} color={exp.color} />
                  </div>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13.5px", color: "#9898b0", lineHeight: 1.7 }}>
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tech used */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {exp.tech.map(t => (
                <span key={t} style={{
                  padding: "3px 10px",
                  background: `${exp.color}08`,
                  border: `1px solid ${exp.color}25`,
                  borderRadius: "100px",
                  fontFamily: "Fira Code, monospace", fontSize: "10px",
                  color: exp.color,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Education Card ──────────────────────────────────────────── */
function EduCard({ edu, i, inView }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${edu.color}20`,
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        opacity: 0,
        animation: inView ? `fadeUp 0.6s ${i * 100}ms ease forwards` : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${edu.color}40`;
        e.currentTarget.style.boxShadow =
          `0 0 20px ${edu.color}30, 0 0 40px ${edu.color}15`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${edu.color}20`;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{
        width: "44px", height: "44px",
        background: `${edu.color}12`,
        border: `1px solid ${edu.color}30`,
        borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "20px", flexShrink: 0,
        boxShadow: `0 0 14px ${edu.color}15`,
      }}>{edu.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px" }}>
          <div>
            <h4 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "13.5px", fontWeight: 600, color: "#e8e8ef", marginBottom: "3px" }}>
              {edu.degree}
            </h4>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#9898b0" }}>
              {edu.institution}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            {edu.current && (
              <span style={{
                padding: "2px 9px",
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "100px",
                fontFamily: "Fira Code, monospace", fontSize: "9px", color: "#10b981",
              }}>CURRENT</span>
            )}
            <span style={{ fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>{edu.period}</span>
            <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: "12px", color: edu.color, fontWeight: 600 }}>{edu.grade}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Experience Section ──────────────────────────────────────── */
export default function Experience() {
  const { ref: expRef, isInView: expInView }   = useInView({ threshold: 0.05 });
  const { ref: eduRef, isInView: eduInView }   = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="section" style={{ background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
      {/* Blob decorations */}
      <div style={{ position: "absolute", top: "-60px", right: "-80px", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,217,240,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label">04 / Experience</p>
          <h2 className="section-title">Career Journey</h2>
          <div className="section-line" style={{ margin: "16px auto 0" }} />
        </div>

        {/* Timeline grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "0" }}>
          <div ref={expRef}>
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} inView={expInView} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginTop: "70px" }} ref={eduRef}>
          <h3 style={{
            fontFamily: "Orbitron, sans-serif", fontSize: "18px", fontWeight: 600,
            color: "#e8e8ef", marginBottom: "28px",
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span>🎓</span> Education
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {education.map((edu, i) => (
              <EduCard key={edu.degree} edu={edu} i={i} inView={eduInView} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,217,240,0.3); }
          50%       { box-shadow: 0 0 32px rgba(0,217,240,0.5); }
        }
        @keyframes dashFlow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -16; }
        }
      `}</style>
    </section>
  );
}
