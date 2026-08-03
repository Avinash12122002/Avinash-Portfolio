import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { projects, projectFilters } from "../data/portfolioData";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";

/* ── SVG Project Blob Art ─────────────────────────────────────── */
function ProjectHeaderArt({ gradient, icon, accent }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* animated rings */}
      <div
        style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: `1px solid ${accent}20`,
          animation: "ringPulse 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          border: `1px solid ${accent}30`,
          animation: "ringPulse 3s 0.5s ease-in-out infinite",
        }}
      />
      {/* Corner SVG decoration */}
      <svg
        style={{ position: "absolute", top: 0, right: 0, opacity: 0.15 }}
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M80 0 L80 80 L0 80" stroke={accent} strokeWidth="1" />
        <path
          d="M80 20 L80 80 L20 80"
          stroke={accent}
          strokeWidth="0.5"
          strokeDasharray="4 3"
        />
        <circle cx="80" cy="0" r="4" fill={accent} />
        <circle cx="0" cy="80" r="4" fill={accent} />
      </svg>
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, opacity: 0.15 }}
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M0 80 L0 0 L80 0" stroke={accent} strokeWidth="1" />
        <circle cx="0" cy="80" r="4" fill={accent} />
      </svg>
      {/* Main icon */}
      <span style={{ fontSize: "52px", position: "relative", zIndex: 1 }}>
        {icon}
      </span>
    </div>
  );
}

/* ── Single Project Card ─────────────────────────────────────── */
function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 0 20px rgba(0,217,240,0.25), 0 0 40px rgba(139,92,246,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? project.accent + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}20`
          : "none",
        opacity: 0,
        animation: inView
          ? `fadeUp 0.6s ${index * 80}ms ease forwards`
          : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Art */}
      <div
        style={{
          height: "175px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <ProjectHeaderArt
          gradient={project.gradient}
          icon={project.icon}
          accent={project.accent}
        />
        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "3px 10px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(0,217,240,0.4)",
              borderRadius: "100px",
              fontFamily: "Fira Code, monospace",
              fontSize: "9px",
              color: "#00d9f0",
              backdropFilter: "blur(8px)",
              zIndex: 10,
            }}
          >
            ✦ FEATURED
          </div>
        )}
        {/* GitHub + Demo quick buttons */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "6px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-6px)",
            transition: "all 0.25s ease",
            zIndex: 10,
          }}
        >
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e8e8ef",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00d9f0";
                e.currentTarget.style.color = "#00d9f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#e8e8ef";
              }}
            >
              <FiGithub size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "20px 22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Title row */}
        <div>
          <h3
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#e8e8ef",
              marginBottom: "4px",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: "11px",
              color: project.accent,
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "13px",
            color: "#56566a",
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className="tech-chip"
              style={{ fontSize: "10px", padding: "3px 10px" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer: stats + links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Stats */}
          <div style={{ display: "flex", gap: "14px" }}>
            <span
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: "11px",
                color: "#56566a",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <FiStar size={11} /> {project.stats.stars}
            </span>
            <span
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: "11px",
                color: "#56566a",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <FiGitBranch size={11} /> {project.stats.forks}
            </span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "8px" }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 12px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#9898b0",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,240,0.3)";
                e.currentTarget.style.color = "#00d9f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#9898b0";
              }}
            >
              <FiGithub size={11} /> Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 12px",
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}35`,
                borderRadius: "6px",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: project.accent,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${project.accent}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${project.accent}15`;
              }}
            >
              <FiExternalLink size={11} /> Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Projects Section ─────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, isInView } = useInView({ threshold: 0.05 });

  const filtered = projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section
      id="projects"
      className="section"
      style={{
        background: "var(--bg)",
        overflow: "hidden",
        position: "relative",
      }}
      ref={ref}
    >
      {/* Decorative SVG top border */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          opacity: 0.06,
        }}
        viewBox="0 0 1200 60"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 Q200 0 400 30 Q600 60 800 30 Q1000 0 1200 30"
          stroke="#00d9f0"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p className="section-label">03 / Projects</p>
          <h2 className="section-title">Built in Production</h2>
          <div className="section-line" style={{ margin: "16px auto 0" }} />
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
              color: "#56566a",
              marginTop: "16px",
            }}
          >
            Real-world projects with live demos and source code
          </p>
        </div>

        {/* Filter chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "44px",
          }}
        >
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
            >
              {f}
              {f === "All" && (
                <span style={{ marginLeft: "5px", opacity: 0.5 }}>
                  ({projects.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              color: "#56566a",
              marginBottom: "16px",
            }}
          >
            More projects on my GitHub →
          </p>
          <a
            href="https://github.com/Avinash12122002"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <FiGithub size={16} />
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
