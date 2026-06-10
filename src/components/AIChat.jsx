import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiZap, FiUser } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

/* ── System prompt for Groq about Avinash ─────────────────────── */
const SYSTEM_PROMPT = `
You are an AI assistant on Avinash Kumar's developer portfolio. Your role is to help visitors learn about Avinash, his skills, projects, education, experience, and career goals.

ABOUT AVINASH

Name: Avinash Kumar
Location: Delhi, India
Education:
- Master of Computer Applications (MCA) in Software Engineering from GGSIPU
- Current CGPA: 8.6
- Bachelor of Science (Physical Science with Computer Science) from Rajdhani College, University of Delhi
- Graduation CGPA: 8.47

PROFESSIONAL SUMMARY

Avinash Kumar is a Full Stack Developer specializing in MERN Stack development and AI-powered web applications. He enjoys building scalable products, modern user interfaces, assessment platforms, and real-world business applications. His focus areas include full-stack development, artificial intelligence integration, modern web technologies, and software engineering best practices.

PERSONAL DETAILS

- Based in Delhi, India
- age 23
- full address - D-1/309 pratap vihar part-3 kirari suleman nagar north west delhi -110086
- MCA student at GGSIPU
- Passionate about MERN Stack and AI
- Built multiple full-stack projects and platform clones
- Enjoys learning new technologies and solving real-world problems
- Interested in Software Engineering and Product Development
- Open to internships, freelance work, and full-time opportunities

PERSONAL DETAILS

- Name: Avinash Kumar
- Location: Delhi, India
- Nationality: Indian
- Education:
  • MCA (Software Engineering) - GGSIPU (2024-2026)
  • Current CGPA: 8.8
  • B.Sc Physical Science with Computer Science - University of Delhi
  • Graduation CGPA: 8.5

- Current Status:
  • Full Stack Developer
  • MCA Student
  • Open to Full-Time Opportunities
  • Open to Internships
  • Open to Freelance Projects
  • Open to Collaborations

- Specialization:
  • MERN Stack Development
  • AI-Powered Applications
  • Full Stack Web Development
  • REST API Development
  • Authentication & Security
  • Dashboard Development
  • SaaS Products

- Professional Interests:
  • Artificial Intelligence
  • Software Engineering
  • Product Development
  • Cloud Technologies
  • UI/UX Design
  • System Design

- Soft Skills:
  • Leadership
  • Team Management
  • Problem Solving
  • Communication
  • Agile Development
  • Project Planning

- Languages:
  • English
  • Hindi

- Preferred Work Environment:
  • Remote
  • Hybrid
  • On-Site

- Strengths:
  • Quick Learner
  • Strong Problem Solver
  • Self Motivated
  • Team Player
  • Adaptable to New Technologies

  CAREER HIGHLIGHTS

- Built 10+ Full Stack and AI projects.
- Completed internships at IBM and UpToSkills.
- Led an 8-member development team.
- Developed AI-powered assessment systems.
- Integrated Gemini AI, Groq AI, and OpenAI APIs into production projects.
- Built multiple platform clones including Airbnb, Netflix, and Spotify.
- Experienced in authentication systems, role-based access control, and dashboard development.
- Deployed applications using Vercel, Render, and MongoDB Atlas.

FUN FACTS

- Avinash enjoys building projects that solve real-world problems.
- He prefers learning by building practical applications.
- He enjoys combining AI with modern web technologies.
- He has experience working on educational technology platforms.
- He frequently experiments with new JavaScript frameworks and AI tools.
- He is passionate about creating responsive and visually appealing user interfaces.

TECHNICAL SKILLS

Frontend:
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS
- EJS
- Responsive Design
- Framer Motion

Backend:
- Node.js
- Express.js
- REST APIs
- JWT Authentication

Database:
- MongoDB
- SQL

Programming Languages:
- JavaScript
- Python
- PHP
- C++
- SQL

AI & Automation:
- Gemini AI
- OpenAI API
- Groq AI
- Prompt Engineering
- AI Quiz Generation
- AI Assessment Systems

Tools & Platforms:
- Git
- GitHub
- Postman
- VS Code
- Figma
- MongoDB Atlas
- Vercel
- Render

Software Engineering:
- Agile Methodology
- SDLC
- API Integration
- Authentication Systems
- Role-Based Access Control

WORK EXPERIENCE

IBM — Frontend Development Intern
Duration: Jul 2025 – Aug 2025
Mode: Remote
Responsibilities:
- Developed React-based UI components
- Worked in a 5-member Agile team
- Improved responsiveness and user experience
- Participated in code reviews and sprint activities

UpToSkills — Full Stack Development Intern
Duration: Mar 2025 – Jun 2025
Mode: Remote
Responsibilities:
- Led an 8-member development team
- Built AI-powered assessment platform
- Integrated Gemini AI
- Developed frontend and backend modules
- Designed dashboards and reporting systems

FEATURED PROJECTS

1. AI Online Assessment Platform
Tech Stack:
React.js, Node.js, Flask, MongoDB, Gemini AI

Features:
- AI-generated questions
- Real-time assessment
- Tab-switch detection
- Candidate management
- HR dashboard
- Automated evaluation

2. Airbnb Clone
Tech Stack:
Node.js, Express.js, MongoDB, EJS, Tailwind CSS

Features:
- Property listings
- Booking management
- Authentication
- CRUD operations
- Responsive design

3. Grocery Shop Application
Tech Stack:
React.js, Context API, JavaScript

Features:
- Product catalog
- Cart management
- Billing system
- Responsive UI

4. Solar System 3D Simulation
Tech Stack:
Three.js, Canvas API, JavaScript

Features:
- Interactive planets
- Realistic animations
- Educational visualization

ADDITIONAL PROJECTS

- Netflix Clone
- Spotify Clone
- HR Dashboard
- AI Quiz Generator
- Candidate Assessment System
- Job Portal Modules
- Authentication Systems

AREAS OF INTEREST

- Full Stack Development
- Artificial Intelligence
- Software Engineering
- UI/UX Design
- Cloud Deployment
- Problem Solving
- Web Performance Optimization

CAREER GOAL

Avinash aims to become a highly skilled Software Engineer specializing in Full Stack Development and AI-powered applications while building scalable products that solve real-world problems.

CONTACT

Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: Delhi, India

GitHub:
https://github.com/Avinash12122002

LinkedIn:
https://linkedin.com/in/avinash-kumar-60b9a827b

WHEN ANSWERING RECRUITERS

If a recruiter asks why they should hire Avinash:

Highlight:
- Strong MERN Stack skills
- Real-world internship experience
- Leadership experience
- AI integration expertise
- Full project lifecycle experience
- Modern frontend and backend development skills
- Fast learning ability
- Strong academic performance
- Hands-on experience building production-ready applications

Keep the answer professional and confident.

RESPONSE GUIDELINES

- Be friendly and professional.
- Keep answers between 2–5 sentences.
- Highlight relevant skills, projects, or experience when appropriate.
- Encourage recruiters and collaborators to connect.
- If asked unrelated questions, politely redirect the conversation back to Avinash, his portfolio, skills, projects, or experience.
`;

/* ── Message Bubble ──────────────────────────────────────────── */
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "14px",
      gap: "8px",
      alignItems: "flex-end",
    }}>
      {!isUser && (
        <div style={{
          width: "28px", height: "28px",
          background: "linear-gradient(135deg, rgba(0,217,240,0.2), rgba(139,92,246,0.2))",
          border: "1px solid rgba(0,217,240,0.3)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <FiZap size={12} color="#00d9f0" />
        </div>
      )}

      <div style={{
        maxWidth: "78%",
        padding: "10px 14px",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        background: isUser
          ? "linear-gradient(135deg, rgba(0,217,240,0.2), rgba(139,92,246,0.2))"
          : "rgba(255,255,255,0.04)",
        border: isUser
          ? "1px solid rgba(0,217,240,0.25)"
          : "1px solid rgba(255,255,255,0.06)",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "13px",
        color: "#e8e8ef",
        lineHeight: 1.65,
      }}>
        {msg.content}
        {msg.loading && (
          <span style={{ display: "inline-flex", gap: "3px", marginLeft: "4px" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#00d9f0",
                display: "inline-block",
                animation: `dotBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
              }} />
            ))}
          </span>
        )}
      </div>

      {isUser && (
        <div style={{
          width: "28px", height: "28px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <FiUser size={12} color="#9898b0" />
        </div>
      )}
    </div>
  );
}

/* ── Quick Suggestions ────────────────────────────────────────── */
const QUICK_QUESTIONS = [
  "What are Avinash's top skills?",
  "Tell me about his internships",
  "What projects has he built?",
  "How to contact him?",
];

/* ── AI Chat Widget ──────────────────────────────────────────── */
export default function AIChat() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Avinash's AI assistant. Ask me anything about his skills, projects, or how to get in touch!",
    },
  ]);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);
    setMessages(m => [...m, { role: "assistant", content: "", loading: true }]);

    try {
      const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
      if (!GROQ_API_KEY) {
        throw new Error("no_key");
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error("api_error");
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setMessages(m => [
        ...m.slice(0, -1),
        { role: "assistant", content: reply },
      ]);
    } catch (err) {
      const fallback = err.message === "no_key"
        ? "⚠️ Groq API key not set. Add VITE_GROQ_API_KEY to your .env file to enable AI chat!"
        : "⚠️ Something went wrong. You can reach Avinash directly at " + personalInfo.email;

      setMessages(m => [
        ...m.slice(0, -1),
        { role: "assistant", content: fallback },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          width: "min(380px, calc(100vw - 48px))",
          height: "500px",
          background: "rgba(8,8,16,0.97)",
          border: "1px solid rgba(0,217,240,0.2)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 2000,
          boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,217,240,0.05)",
          backdropFilter: "blur(20px)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "16px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "linear-gradient(135deg, rgba(0,217,240,0.06), rgba(139,92,246,0.06))",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: "linear-gradient(135deg, rgba(0,217,240,0.15), rgba(139,92,246,0.15))",
              border: "1px solid rgba(0,217,240,0.3)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FiZap size={14} color="#00d9f0" />
            </div>
            <div>
              <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "12px", fontWeight: 600, color: "#e8e8ef" }}>
                AI Assistant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div className="glow-dot" style={{ width: "5px", height: "5px" }} />
                <span style={{ fontFamily: "Fira Code, monospace", fontSize: "10px", color: "#10b981" }}>
                  Powered by Groq
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: "28px", height: "28px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "7px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#9898b0", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#e8e8ef"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#9898b0"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            <FiX size={14} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px" }}>
          {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
          <div ref={bottomRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 14px 8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  padding: "5px 10px",
                  background: "rgba(0,217,240,0.06)",
                  border: "1px solid rgba(0,217,240,0.15)",
                  borderRadius: "100px",
                  fontFamily: "DM Sans, sans-serif", fontSize: "11px",
                  color: "#9898b0", cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#00d9f0"; e.currentTarget.style.borderColor = "rgba(0,217,240,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#9898b0"; e.currentTarget.style.borderColor = "rgba(0,217,240,0.15)"; }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div style={{
          padding: "12px 14px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex", gap: "8px", alignItems: "center",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask about Avinash..."
            style={{
              flex: 1, padding: "10px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              color: "#e8e8ef",
              fontFamily: "DM Sans, sans-serif", fontSize: "13px",
              outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(0,217,240,0.3)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: "38px", height: "38px",
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #00d9f0, #8b5cf6)"
                : "rgba(255,255,255,0.04)",
              border: "none", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              color: input.trim() && !loading ? "#030305" : "#56566a",
              flexShrink: 0,
            }}
          >
            <FiSend size={14} />
          </button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: "fixed",
          bottom: "24px", right: "24px",
          width: "56px", height: "56px",
          background: open
            ? "rgba(239,68,68,0.15)"
            : "linear-gradient(135deg, #00d9f0, #8b5cf6)",
          border: open ? "1px solid rgba(239,68,68,0.3)" : "none",
          borderRadius: "16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          zIndex: 2001,
          boxShadow: open
            ? "0 8px 30px rgba(239,68,68,0.2)"
            : "0 8px 30px rgba(0,217,240,0.35), 0 0 0 8px rgba(0,217,240,0.08)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: open ? "scale(0.95)" : "scale(1)",
          color: open ? "#ef4444" : "#030305",
          animation: open ? "none" : "chatPulse 3s ease-in-out infinite",
        }}
      >
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
        {/* Notification dot when closed */}
        {!open && (
          <div style={{
            position: "absolute", top: "-3px", right: "-3px",
            width: "12px", height: "12px",
            background: "#10b981",
            border: "2px solid var(--bg)",
            borderRadius: "50%",
          }} />
        )}
      </button>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(0,217,240,0.35), 0 0 0 8px rgba(0,217,240,0.08); }
          50%       { box-shadow: 0 8px 40px rgba(0,217,240,0.5), 0 0 0 14px rgba(0,217,240,0.04); }
        }
      `}</style>
    </>
  );
}
