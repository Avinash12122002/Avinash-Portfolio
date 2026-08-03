import { useInView, useCounter } from "../hooks/useInView";
import { personalInfo, stats, education } from "../data/portfolioData";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

// ─── Stat Counter Card ────────────────────────────────────────
function StatCard({ value, suffix, label, delay, start }) {
  const count = useCounter(value, start, 1800);

  return (
    <div
      className="glass-card"
      style={{
        padding: "28px 20px",
        textAlign: "center",
        opacity: 0,
        animation: start ? `fadeUp 0.7s ${delay} ease forwards` : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 20px rgba(0,217,240,0.25), 0 0 40px rgba(139,92,246,0.15)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #00d9f0, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "13px",
          color: "#56566a",
          letterSpacing: "0.05em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Education Card ───────────────────────────────────────────
function EduCard({
  degree,
  institution,
  period,
  grade,
  current,
  color,
  icon,
  delay,
  inView,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        opacity: 0,
        animation: inView ? `fadeLeft 0.7s ${delay} ease forwards` : "none",
      }}
    >
      {/* Timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            background: `${color}15`,
            border: `1px solid ${color}40`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
            boxShadow: `0 0 16px ${color}20`,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            width: "1px",
            flex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,217,240,0.3), transparent)",
            marginTop: "8px",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ paddingBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "6px",
          }}
        >
          <h3
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(13px, 1.5vw, 15px)",
              fontWeight: 600,
              color: "#e8e8ef",
            }}
          >
            {degree}
          </h3>
          {current && (
            <span
              style={{
                padding: "2px 10px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "100px",
                fontFamily: "Fira Code, monospace",
                fontSize: "10px",
                color: "#10b981",
              }}
            >
              CURRENT
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "13px",
            color: "#9898b0",
            marginBottom: "4px",
          }}
        >
          {institution}
        </p>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: "11px",
              color: "#56566a",
            }}
          >
            {period}
          </span>
          <span
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: "11px",
              color: color,
              fontWeight: 600,
            }}
          >
            {grade}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────
export default function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, isInView: statsInView } = useInView({
    threshold: 0.3,
  });
  const { ref: eduRef, isInView: eduInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="about"
      className="section"
      style={{ background: "var(--bg)" }}
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <p className="section-label">01 / About</p>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-line" style={{ margin: "16px auto 0" }} />
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
            marginBottom: "80px",
          }}
        >
          {/* Left: Bio */}
          <div
            style={{
              opacity: 0,
              animation: isInView ? "fadeLeft 0.7s 0.1s ease forwards" : "none",
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: "80px",
                height: "80px",
                background:
                  "linear-gradient(135deg, rgba(0,217,240,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(0,217,240,0.25)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 0 40px rgba(0,217,240,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #00d9f0, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AK
              </span>
            </div>

            <h3
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 700,
                color: "#e8e8ef",
                marginBottom: "16px",
              }}
            >
              Avinash Kumar
            </h3>

            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                color: "#9898b0",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              {personalInfo.bio}
            </p>

            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                color: "#56566a",
                lineHeight: 1.8,
                marginBottom: "28px",
              }}
            >
              {personalInfo.bio2}
            </p>

            {/* Contact Info */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                { icon: FiMail, val: personalInfo.email },
                { icon: FiPhone, val: personalInfo.phone },
                { icon: FiMapPin, val: personalInfo.location },
              ].map(({ icon: Icon, val }) => (
                <div
                  key={val}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Icon size={14} color="#00d9f0" />
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13px",
                      color: "#9898b0",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code snippet aesthetic */}
          <div
            style={{
              opacity: 0,
              animation: isInView
                ? "fadeRight 0.7s 0.2s ease forwards"
                : "none",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,217,240,0.1)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {["#ff6b6b", "#ffd93d", "#6bcb77"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: "11px",
                    color: "#56566a",
                    marginLeft: "8px",
                  }}
                >
                  avinash.json
                </span>
              </div>
              {/* Code content */}
              <div
                style={{
                  padding: "24px",
                  fontFamily: "Fira Code, monospace",
                  fontSize: "13px",
                  lineHeight: 2,
                }}
              >
                <span style={{ color: "#8b5cf6" }}>{`{`}</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"name"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#10b981" }}>"Avinash Kumar"</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"role"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#10b981" }}>"Full Stack Developer"</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"location"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#10b981" }}>"Delhi, India"</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"cgpa"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#f97316" }}>8.8</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"focus"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#10b981" }}>"MERN + AI"</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"status"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#10b981" }}>"open_to_work"</span>
                <span style={{ color: "#56566a" }}>,</span>
                <br />
                &nbsp;&nbsp;<span style={{ color: "#00d9f0" }}>"skills"</span>
                <span style={{ color: "#56566a" }}>:</span>&nbsp;
                <span style={{ color: "#8b5cf6" }}>[</span>
                <span style={{ color: "#10b981" }}>"React"</span>
                <span style={{ color: "#56566a" }}>, </span>
                <span style={{ color: "#10b981" }}>"Node"</span>
                <span style={{ color: "#56566a" }}>, </span>
                <span style={{ color: "#10b981" }}>"AI"</span>
                <span style={{ color: "#8b5cf6" }}>]</span>
                <br />
                <span style={{ color: "#8b5cf6" }}>{`}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: "80px",
            filter: "drop-shadow(0 0 20px rgba(0,217,240,0.12))",
          }}
        >
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              {...s}
              start={statsInView}
              delay={`${i * 80}ms`}
            />
          ))}
        </div>

        {/* Education Timeline */}
        <div>
          <h3
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "#e8e8ef",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ color: "#00d9f0" }}>🎓</span> Education
          </h3>
          <div ref={eduRef}>
            {education.map((edu, i) => (
              <EduCard
                key={edu.degree}
                {...edu}
                inView={eduInView}
                delay={`${i * 120}ms`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
