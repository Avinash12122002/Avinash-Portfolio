import { useState, useEffect } from "react";
import {
  FiSearch,
  FiX,
  FiTerminal,
  FiCode,
  FiUser,
  FiLayers,
  FiBriefcase,
  FiMail,
  FiExternalLink,
  FiDownload,
  FiVolume2,
  FiVolumeX
} from "react-icons/fi";
import { projects, personalInfo } from "../data/portfolioData";
import { sound } from "../utils/sound";

export default function CommandPalette({ isOpen, onClose, soundEnabled, onToggleSound }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { id: "hero", title: "Go to Home / Hero", category: "Navigation", icon: FiTerminal, action: () => scrollTo("hero") },
    { id: "about", title: "Go to About Me", category: "Navigation", icon: FiUser, action: () => scrollTo("about") },
    { id: "skills", title: "Go to Technical Skills", category: "Navigation", icon: FiCode, action: () => scrollTo("skills") },
    { id: "projects", title: "Go to Featured Projects", category: "Navigation", icon: FiLayers, action: () => scrollTo("projects") },
    { id: "experience", title: "Go to Work Experience", category: "Navigation", icon: FiBriefcase, action: () => scrollTo("experience") },
    { id: "contact", title: "Go to Contact Section", category: "Navigation", icon: FiMail, action: () => scrollTo("contact") },
    {
      id: "toggle-sound",
      title: soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects",
      category: "Settings",
      icon: soundEnabled ? FiVolumeX : FiVolume2,
      action: () => {
        onToggleSound();
      }
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      category: "Actions",
      icon: FiDownload,
      action: () => {
        window.open(personalInfo.resumeUrl, "_blank");
      }
    },
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `View Project: ${p.title}`,
      subtitle: p.subtitle,
      category: "Projects",
      icon: FiExternalLink,
      action: () => {
        if (p.demo && p.demo !== "#") {
          window.open(p.demo, "_blank");
        } else if (p.github && p.github !== "#") {
          window.open(p.github, "_blank");
        } else {
          scrollTo("projects");
        }
      }
    }))
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.click();
        if (isOpen) onClose();
        else onClose(true);
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.hover();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.hover();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        sound.click();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3,3,5,0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 3000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        animation: "fadeIn 0.2s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(640px, calc(100vw - 32px))",
          background: "#080812",
          border: "1px solid rgba(0,217,240,0.3)",
          borderRadius: "16px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,217,240,0.15)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "75vh",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <FiSearch size={18} color="#00d9f0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search project, or section..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e8e8ef",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
            }}
          />
          <span
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: "10px",
              padding: "3px 8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "#9898b0",
            }}
          >
            ESC to exit
          </span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#9898b0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Action List */}
        <div style={{ overflowY: "auto", padding: "12px 8px", flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#56566a", fontFamily: "DM Sans, sans-serif" }}>
              No commands matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.click();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: isSelected ? "rgba(0,217,240,0.1)" : "transparent",
                    border: `1px solid ${isSelected ? "rgba(0,217,240,0.3)" : "transparent"}`,
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: isSelected ? "rgba(0,217,240,0.2)" : "rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isSelected ? "#00d9f0" : "#9898b0",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 600, color: "#e8e8ef" }}>
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div style={{ fontFamily: "Fira Code, monospace", fontSize: "11px", color: "#9898b0" }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "10px",
                      padding: "2px 8px",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "4px",
                      color: isSelected ? "#00d9f0" : "#56566a",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: "10px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            fontFamily: "Fira Code, monospace",
            fontSize: "11px",
            color: "#56566a",
          }}
        >
          <span>↑↓ to navigate</span>
          <span>↵ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
