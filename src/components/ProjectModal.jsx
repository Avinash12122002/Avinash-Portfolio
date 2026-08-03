import { useState, useEffect } from "react";
import { FiX, FiGithub, FiExternalLink, FiStar, FiGitBranch, FiCheckCircle, FiLayers } from "react-icons/fi";
import { sound } from "../utils/sound";

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3,3,8,0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        zIndex: 3500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 100%)",
          background: "#080814",
          border: `1px solid ${project.accent || "#00d9f0"}40`,
          borderRadius: "20px",
          boxShadow: `0 30px 100px rgba(0,0,0,0.9), 0 0 40px ${project.accent || "#00d9f0"}20`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh",
        }}
      >
        {/* Banner Header */}
        <div
          style={{
            height: "140px",
            background: project.gradient || "linear-gradient(135deg, rgba(0,217,240,0.2), rgba(139,92,246,0.2))",
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "44px" }}>{project.icon}</span>
            <div>
              <h2 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "20px", fontWeight: 700, color: "#e8e8ef" }}>
                {project.title}
              </h2>
              <p style={{ fontFamily: "Fira Code, monospace", fontSize: "12px", color: project.accent || "#00d9f0" }}>
                {project.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#e8e8ef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            padding: "0 16px",
          }}
        >
          {[
            { id: "overview", label: "Overview" },
            { id: "tech", label: "Tech Stack & Architecture" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                sound.click();
                setActiveTab(t.id);
              }}
              style={{
                padding: "12px 20px",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === t.id ? project.accent || "#00d9f0" : "transparent"}`,
                color: activeTab === t.id ? "#e8e8ef" : "#9898b0",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          {activeTab === "overview" && (
            <>
              <div>
                <h4 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "14px", color: "#e8e8ef", marginBottom: "8px" }}>
                  Project Description
                </h4>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#9898b0", lineHeight: 1.8 }}>
                  {project.description}
                </p>
              </div>

              {/* Live metrics / highlights */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>Status</div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 600, color: "#10b981" }}>
                    Production Ready 🚀
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>Repository Stars</div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: "14px", fontWeight: 600, color: "#00d9f0" }}>
                    <FiStar size={12} style={{ display: "inline", marginRight: "4px" }} />
                    {project.stats?.stars || 20}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#56566a" }}>Forks</div>
                  <div style={{ fontFamily: "Fira Code, monospace", fontSize: "14px", fontWeight: 600, color: "#8b5cf6" }}>
                    <FiGitBranch size={12} style={{ display: "inline", marginRight: "4px" }} />
                    {project.stats?.forks || 8}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "tech" && (
            <div>
              <h4 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "14px", color: "#e8e8ef", marginBottom: "12px" }}>
                Technologies & Tools Employed
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "6px 14px",
                      background: `${project.accent || "#00d9f0"}12`,
                      border: `1px solid ${project.accent || "#00d9f0"}35`,
                      borderRadius: "8px",
                      fontFamily: "Fira Code, monospace",
                      fontSize: "12px",
                      color: project.accent || "#00d9f0",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: "8px 18px", fontSize: "13px" }}
            >
              <FiGithub size={14} /> Source Code
            </a>
          )}
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "13px" }}
            >
              <FiExternalLink size={14} /> Visit Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
