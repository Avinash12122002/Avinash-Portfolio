import { personalInfo } from "../data/portfolioData";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FiTwitter, href: personalInfo.twitter, label: "Twitter" },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SVG Wave top border */}
      <svg
        style={{ display: "block", width: "100%", marginBottom: "-2px" }}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 40 Q150 10 300 40 Q450 70 600 40 Q750 10 900 40 Q1050 70 1200 40 L1200 60 L0 60 Z"
          fill="var(--bg)"
        />
      </svg>

      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "200px",
          background:
            "radial-gradient(ellipse, rgba(0,217,240,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "32px" }}
      >
        {/* Main row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            marginBottom: "40px",
            paddingBottom: "40px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Brand column */}
          <div style={{ maxWidth: "280px" }}>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg, rgba(0,217,240,0.15), rgba(139,92,246,0.15))",
                  border: "1px solid rgba(0,217,240,0.25)",
                  borderRadius: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,217,240,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #00d9f0, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AK
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#e8e8ef",
                  }}
                >
                  Avinash Kumar
                </div>
                <div
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: "10px",
                    color: "#00d9f0",
                    letterSpacing: "0.1em",
                  }}
                >
                  Full Stack Developer
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                color: "#56566a",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Building beautiful, scalable, AI-powered web applications from
              Delhi, India. Open to opportunities worldwide.
            </p>
            {/* Social row */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={label}
                  style={{ width: "36px", height: "36px", fontSize: "15px" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h5
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#e8e8ef",
                marginBottom: "16px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Navigation
            </h5>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13.5px",
                      color: "#56566a",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00d9f0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#56566a";
                    }}
                  >
                    <span
                      style={{ color: "rgba(0,217,240,0.4)", fontSize: "10px" }}
                    >
                      →
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h5
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#e8e8ef",
                marginBottom: "16px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h5>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                {
                  label: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                  
                },
                {
                  label: personalInfo.phone,
                  href: `https://wa.me/${personalInfo.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    "Message Us If You Have Any Query",
                  )}`,
                },
                {
                  label: personalInfo.location,
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    "D-1/309 Pratap Vihar Part-3, Kirari Suleman Nagar, North West Delhi - 110086",
                  )}`,
                },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    color: "#56566a",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9898b0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#56566a")
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Status / CTA */}
          <div>
            <h5
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#e8e8ef",
                marginBottom: "16px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Status
            </h5>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "8px",
                marginBottom: "14px",
              }}
            >
              <div className="glow-dot" />
              <span
                style={{
                  fontFamily: "Fira Code, monospace",
                  fontSize: "11px",
                  color: "#10b981",
                }}
              >
                Available to hire
              </span>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  fontFamily: "Fira Code, monospace",
                  fontSize: "10px",
                  color: "#56566a",
                  marginBottom: "4px",
                }}
              >
                CURRENTLY STUDYING
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "12px",
                  color: "#9898b0",
                }}
              >
                MCA @ GGSIPU (2024–2026)
              </div>
            </div>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: "9px 18px", fontSize: "12px" }}
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12.5px",
              color: "#56566a",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            © {year} Avinash Kumar. Built with
            <FiHeart
              size={11}
              color="#ef4444"
              style={{ animation: "heartBeat 1.5s ease-in-out infinite" }}
            />
            in React + Tailwind.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: "11px",
                color: "#56566a",
              }}
            >
              v2.0 · {year}
            </span>
            <button
              onClick={scrollToTop}
              style={{
                width: "36px",
                height: "36px",
                background: "rgba(0,217,240,0.08)",
                border: "1px solid rgba(0,217,240,0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#00d9f0",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,217,240,0.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,217,240,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              title="Back to top"
            >
              <FiArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.2); }
        }
      `}</style>
    </footer>
  );
}
