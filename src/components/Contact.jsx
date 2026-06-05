import { useState, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { personalInfo, services } from "../data/portfolioData";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

/* ── Service Card ────────────────────────────────────────────── */
function ServiceCard({ svc, i, inView }) {
  return (
    <div
      style={{
        padding: "18px",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${svc.color}18`,
        borderRadius: "12px",
        display: "flex",
        gap: "12px",
        opacity: 0,
        animation: inView ? `fadeUp 0.6s ${i * 70}ms ease forwards` : "none",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${svc.color}40`;
        e.currentTarget.style.background = `${svc.color}05`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 0 20px ${svc.color}30, 0 0 40px ${svc.color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${svc.color}18`;
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          background: `${svc.color}12`,
          border: `1px solid ${svc.color}25`,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "17px",
          flexShrink: 0,
        }}
      >
        {svc.icon}
      </div>
      <div>
        <h4
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#e8e8ef",
            marginBottom: "3px",
          }}
        >
          {svc.title}
        </h4>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "12px",
            color: "#56566a",
            lineHeight: 1.6,
          }}
        >
          {svc.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Contact Info Row ─────────────────────────────────────────── */
function ContactRow({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${value}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(0,217,240,0.1)",
        borderRadius: "10px",
        textDecoration: "none",
        transition:
          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        color: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,217,240,0.3)";
        e.currentTarget.style.background = "rgba(0,217,240,0.04)";
        e.currentTarget.style.transform =
          "translateX(6px) translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,217,240,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,217,240,0.1)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.transform =
          "translateX(0) translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          background: "rgba(0,217,240,0.08)",
          border: "1px solid rgba(0,217,240,0.2)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={15} color="#00d9f0" />
      </div>
      <div>
        <div
          style={{
            fontFamily: "Fira Code, monospace",
            fontSize: "10px",
            color: "#56566a",
            marginBottom: "2px",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "13.5px",
            color: "#e8e8ef",
            fontWeight: 500,
          }}
        >
          {value}
        </div>
      </div>
    </a>
  );
}

/* ── Contact Section ─────────────────────────────────────────── */
export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.08 });
  const { ref: svcRef, isInView: svcInView } = useInView({ threshold: 0.1 });
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Enter a valid email";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    // ── Detect if EmailJS is still using placeholder credentials ──
    const SERVICE_ID =
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const TEMPLATE_ID =
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject || "Portfolio Contact",
          message: formData.message,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EMAILJS ERROR:", error);
      console.log(error?.text);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "13px 16px",
    background: errors[field]
      ? "rgba(239,68,68,0.04)"
      : "rgba(255,255,255,0.025)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.4)" : "rgba(0,217,240,0.1)"}`,
    borderRadius: "10px",
    color: "#e8e8ef",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  });

  return (
    <section
      id="contact"
      className="section"
      style={{
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
      ref={ref}
    >
      {/* Animated SVG grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,217,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,240,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient blobs */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,217,240,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label">05 / Contact</p>
          <h2 className="section-title">Let's Build Together</h2>
          <div className="section-line" style={{ margin: "16px auto 0" }} />
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
              color: "#56566a",
              marginTop: "16px",
            }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
          }}
        >
          {/* Left: Info + Services */}
          <div
            style={{
              opacity: 0,
              animation: isInView ? "fadeLeft 0.7s 0.1s ease forwards" : "none",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "100px",
                marginBottom: "24px",
              }}
            >
              <div className="glow-dot" />
              <span
                style={{
                  fontFamily: "Fira Code, monospace",
                  fontSize: "12px",
                  color: "#10b981",
                }}
              >
                Available for hire
              </span>
            </div>

            <h3
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#e8e8ef",
                marginBottom: "8px",
              }}
            >
              Open to Work
            </h3>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                color: "#56566a",
                lineHeight: 1.8,
                marginBottom: "28px",
              }}
            >
              Looking for full-time roles, freelance projects, or collaboration
              on exciting products. Response time: within 24 hours.
            </p>

            {/* Contact rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "28px",
              }}
            >
              <ContactRow
                icon={FiMail}
                label="EMAIL"
                value={personalInfo.email}
                href={`mailto:${personalInfo.email}`}
              />
              <ContactRow
                icon={FiPhone}
                label="PHONE"
                value={personalInfo.phone}
                href={`https://wa.me/${personalInfo.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                  "Message Me If You Have Any Query",
                )}`}
              />

              <ContactRow
                icon={FiMapPin}
                label="LOCATION"
                value={personalInfo.location}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  "D-1/309 Pratap Vihar Part-3, Kirari Suleman Nagar, North West Delhi - 110086",
                )}`}
              />
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
              {[
                { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                {
                  icon: FiLinkedin,
                  href: personalInfo.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: FiTwitter,
                  href: personalInfo.twitter,
                  label: "Twitter",
                },
                {
                  icon: FiMail,
                  href: `mailto:${personalInfo.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Services */}
            <h4
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e8e8ef",
                marginBottom: "14px",
              }}
            >
              What I can help with
            </h4>
            <div
              ref={svcRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {services.map((svc, i) => (
                <ServiceCard
                  key={svc.title}
                  svc={svc}
                  i={i}
                  inView={svcInView}
                />
              ))}
            </div>
          </div>

          {/* Right: Form */}
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
                borderRadius: "20px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(0,217,240,0.15), 0 0 50px rgba(139,92,246,0.08)";
                e.currentTarget.style.borderColor = "rgba(0,217,240,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(0,217,240,0.1)";
              }}
            >
              {/* Corner decorations */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  opacity: 0.12,
                }}
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M100 0 L100 100 L0 100"
                  stroke="#00d9f0"
                  strokeWidth="1"
                />
                <circle cx="100" cy="0" r="3" fill="#00d9f0" />
              </svg>

              <h3
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#e8e8ef",
                  marginBottom: "6px",
                }}
              >
                Send a Message
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                  color: "#56566a",
                  marginBottom: "24px",
                }}
              >
                All fields marked <span style={{ color: "#ef4444" }}>*</span>{" "}
                are required.
              </p>
              {/* Success state */}
              {status === "success" && (
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    animation: "fadeUp 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "rgba(16,185,129,0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiCheck size={14} color="#10b981" />
                  </div>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13px",
                      color: "#10b981",
                    }}
                  >
                    Message sent! I'll get back to you within 24 hours.
                  </span>
                </div>
              )}

              {/* Error state */}
              {status === "error" && (
                <div
                  style={{
                    padding: "16px",
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FiAlertCircle size={16} color="#ef4444" />
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "13px",
                      color: "#ef4444",
                    }}
                  >
                    Failed to send. Please email me directly.
                  </span>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontFamily: "Fira Code, monospace",
                        fontSize: "10px",
                        color: "#56566a",
                        letterSpacing: "0.1em",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      NAME <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      style={inputStyle("name")}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      onFocus={(e) => {
                        e.target.style.borderColor = "#00d9f0";
                        e.target.style.boxShadow =
                          "0 0 15px rgba(0,217,240,0.25), 0 0 30px rgba(139,92,246,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.name
                          ? "rgba(239,68,68,0.4)"
                          : "rgba(0,217,240,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    {errors.name && (
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "11px",
                          color: "#ef4444",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "Fira Code, monospace",
                        fontSize: "10px",
                        color: "#56566a",
                        letterSpacing: "0.1em",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      EMAIL <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      style={inputStyle("email")}
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      onFocus={(e) => {
                        e.target.style.borderColor = "#00d9f0";
                        e.target.style.boxShadow =
                          "0 0 15px rgba(0,217,240,0.25), 0 0 30px rgba(139,92,246,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.name
                          ? "rgba(239,68,68,0.4)"
                          : "rgba(0,217,240,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    {errors.email && (
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "11px",
                          color: "#ef4444",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "10px",
                      color: "#56566a",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    SUBJECT
                  </label>
                  <input
                    style={inputStyle("subject")}
                    placeholder="Project discussion, Job offer, Freelance..."
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, subject: e.target.value }))
                    }
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00d9f0";
                      e.target.style.boxShadow =
                        "0 0 15px rgba(0,217,240,0.25), 0 0 30px rgba(139,92,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "rgba(239,68,68,0.4)"
                        : "rgba(0,217,240,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "10px",
                      color: "#56566a",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    MESSAGE <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    rows={5}
                    style={{
                      ...inputStyle("message"),
                      resize: "vertical",
                      minHeight: "130px",
                    }}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00d9f0";
                      e.target.style.boxShadow =
                        "0 0 15px rgba(0,217,240,0.25), 0 0 30px rgba(139,92,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name
                        ? "rgba(239,68,68,0.4)"
                        : "rgba(0,217,240,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.message && (
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "11px",
                        color: "#ef4444",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px",
                    opacity: status === "sending" ? 0.75 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    fontSize: "14px",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(0,0,0,0.3)",
                          borderTopColor: "#030305",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={15} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
