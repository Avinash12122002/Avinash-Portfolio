import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiZap, FiUser } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

/* ── System prompt for Groq about Avinash ─────────────────────── */
const SYSTEM_PROMPT = `You are an AI assistant on Avinash Kumar's developer portfolio. Your role is to help visitors learn about Avinash.

About Avinash:
- Full Stack Developer pursuing MCA in Software Engineering at GGSIPU (CGPA: 8.6)
- B.Sc (Physical Science with CS) from Rajdhani College, DU (CGPA: 8.47)
- Specializes in MERN Stack (MongoDB, Express.js, React.js, Node.js)
- AI experience: Gemini AI, Groq AI, OpenAI API, Prompt Engineering
- Languages: JavaScript (ES6+), Python, PHP, C++, SQL
- Tools: Git, GitHub, Postman, VS Code, Figma, JWT, Agile/SDLC

Experience:
1. IBM — Frontend Development Intern (Jul–Aug 2025, Remote): Developed React components in a 5-member Agile team.
2. UpToSkills — Full Stack Intern (Mar–Jun 2025, Remote): Led 8-member team, built AI-powered assessment platform with Gemini AI.

Key Projects:
- AI Online Assessment Platform (React, Node.js, Flask, MongoDB, Gemini AI) — real-time proctoring, tab-switch detection
- Airbnb Clone (Node.js, Express, MongoDB, EJS, Tailwind) — full CRUD + booking system
- Solar System 3D Simulation (Three.js, Canvas API)
- Grocery Shop (React, Context API)

Contact: ${personalInfo.email} | ${personalInfo.phone} | Delhi, India
GitHub: https://github.com/Avinash12122002
LinkedIn: https://linkedin.com/in/avinash-kumar-60b9a827b

Answer questions about his skills, projects, experience, and how to contact him. Be concise (2-4 sentences). Be friendly and enthusiastic. If asked unrelated questions, redirect to portfolio topics.`;

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
