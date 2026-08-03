import { useState, useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { skillCategories, techIcons } from "../data/portfolioData";

/* ── SVG Circuit Board Decoration ───────────────────────────── */
function CircuitSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", right: 0, top: 0, width: "280px", opacity: 0.08, pointerEvents: "none" }}
    >
      <path d="M200 20 L200 100 L300 100 L300 200 L380 200" stroke="#00d9f0" strokeWidth="1.5" strokeDasharray="6 3"/>
      <path d="M20 150 L120 150 L120 250 L220 250" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 3"/>
      <path d="M100 20 L100 80 L180 80" stroke="#00d9f0" strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="200" cy="20"  r="4" fill="#00d9f0"/>
      <circle cx="300" cy="100" r="4" fill="#00d9f0"/>
      <circle cx="120" cy="150" r="4" fill="#8b5cf6"/>
      <circle cx="220" cy="250" r="4" fill="#8b5cf6"/>
      <rect x="188" y="88"  width="24" height="24" rx="4" stroke="#00d9f0" strokeWidth="1"/>
      <rect x="108" y="138" width="24" height="24" rx="4" stroke="#8b5cf6" strokeWidth="1"/>
      <rect x="288" y="88"  width="24" height="24" rx="4" stroke="#f97316" strokeWidth="1"/>
    </svg>
  );
}

/* ── Animated Skill Bar ──────────────────────────────────────── */
function SkillBar({ name, level, icon, color, inView, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), 200 + delay);
      return () => clearTimeout(t);
    }
  }, [inView, level, delay]);

  return (
    <div
      style={{
        opacity: 0,
        animation: inView ? `fadeUp 0.6s ${delay}ms ease forwards` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>{icon}</span>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#e8e8ef", fontWeight: 500 }}>
            {name}
          </span>
        </div>
        <span style={{ fontFamily: "Fira Code, monospace", fontSize: "12px", color: color, fontWeight: 600 }}>
          {level}%
        </span>
      </div>
      {/* Track */}
      <div style={{ height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: "100px",
            transition: "width 1.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: `0 0 10px ${color}60`,
            position: "relative",
          }}
        >
          {/* Shimmer on bar */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "barShimmer 2s linear infinite",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ── Circular Progress Ring ──────────────────────────────────── */
function RingProgress({ level, color, size = 80, inView }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const [dash, setDash] = useState(circ);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDash(circ * (1 - level / 100)), 300);
      return () => clearTimeout(t);
    }
  }, [inView, level, circ]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)", filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

/* ── Tech Icon Cloud ─────────────────────────────────────────── */
function TechCloud({ inView }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "10px",
      justifyContent: "center", padding: "8px",
    }}>
      {techIcons.map((t, i) => (
        <div
          key={t.name}
          style={{
            padding: "8px 16px",
            border: `1px solid ${t.color}25`,
            borderRadius: "100px",
            background: `${t.color}08`,
            fontFamily: "Fira Code, monospace",
            fontSize: "12px",
            color: t.color,
            cursor: "default",
            transition: "all 0.25s ease",
            opacity: 0,
            animation: inView ? `fadeUp 0.5s ${i * 40}ms ease forwards` : "none",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${t.color}18`;
            e.currentTarget.style.border = `1px solid ${t.color}60`;
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = `0 6px 20px ${t.color}20`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${t.color}08`;
            e.currentTarget.style.border = `1px solid ${t.color}25`;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {t.name}
        </div>
      ))}
    </div>
  );
}

/* ── Skills Section ──────────────────────────────────────────── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { ref: cloudRef, isInView: cloudInView } = useInView({ threshold: 0.2 });
  const activeCategory = skillCategories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-2)", position: "relative", overflow: "hidden" }} ref={ref}>
      {/* Animated gradient blobs */}
      <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,217,240,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <CircuitSVG />

      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label">02 / Skills</p>
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="section-line" style={{ margin: "16px auto 0" }} />
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "#56566a", marginTop: "16px" }}>
            Technologies I work with daily to build production-grade applications
          </p>
        </div>

        {/* Tab navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "44px" }}>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`tab-btn ${activeTab === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill bars grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", marginBottom: "70px" }}>
          {activeCategory?.skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} inView={isInView} delay={i * 80} />
          ))}
        </div>

        {/* Progress rings for featured skills */}
        <div style={{ marginBottom: "70px" }}>
          <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "16px", fontWeight: 600, color: "#e8e8ef",
            textAlign: "center", marginBottom: "36px" }}>
            Core Proficiency
          </h3>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "32px" }}>
            {[
              { label: "React.js",  level: 98, color: "#61dafb" },
              { label: "Node.js",   level: 85, color: "#68a063" },
              { label: "MongoDB",   level: 90, color: "#47a248" },
              { label: "AI APIs",   level: 85, color: "#8b5cf6" },
              { label: "REST APIs", level: 90, color: "#f97316" },
            ].map((item, i) => (
              <div key={item.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                opacity: 0,
                animation: isInView ? `fadeUp 0.6s ${i * 100}ms ease forwards` : "none",
              }}>
                <div style={{ position: "relative" }}>
                  <RingProgress level={item.level} color={item.color} size={80} inView={isInView} />
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Orbitron, sans-serif", fontSize: "13px", fontWeight: 700, color: item.color,
                  }}>
                    {item.level}
                  </div>
                </div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#9898b0" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech cloud */}
        <div ref={cloudRef}>
          <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "16px", fontWeight: 600, color: "#e8e8ef",
            textAlign: "center", marginBottom: "24px" }}>
            All Technologies
          </h3>
          <TechCloud inView={cloudInView} />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barShimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}
