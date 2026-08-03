import { useState, useRef, useEffect } from "react";
import { FiTerminal, FiCode, FiCopy, FiCheck, FiPlay, FiCornerDownLeft } from "react-icons/fi";
import { personalInfo, stats, projects } from "../data/portfolioData";
import { sound } from "../utils/sound";

export default function VibeTerminal() {
  const [activeTab, setActiveTab] = useState("developer.ts");
  const [copied, setCopied] = useState(false);
  const [cliInput, setCliInput] = useState("");
  const [history, setHistory] = useState([
    { type: "sys", text: "⚡ Vibe OS v2.6.0 (x86_64-fullstack-dev)" },
    { type: "sys", text: "Type 'help' or click a command below to explore Avinash's system." },
  ]);

  const logsContainerRef = useRef(null);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCopyCode = () => {
    sound.click();
    const code = `const avinash = {
  name: "Avinash Kumar",
  role: "Full Stack Developer",
  education: "MCA (Software Engineering) - GGSIPU",
  location: "Delhi, India",
  stack: ["MERN", "Next.js", "TypeScript", "WordPress", "Gemini AI"],
  productionSystems: [
    "crm.tmsvisa.com",
    "tmsvisa.com",
    "triloknathimmigration.in"
  ],
  availableForHire: true
};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCommand = (cmdStr) => {
    const rawCmd = (cmdStr || cliInput).trim();
    if (!rawCmd) return;
    setCliInput("");
    sound.terminal();

    const cmd = rawCmd.toLowerCase();
    const newLogs = [{ type: "cmd", text: `$ ${rawCmd}` }];

    if (cmd === "help") {
      newLogs.push(
        { type: "output", text: "Available Vibe Commands:" },
        { type: "info", text: "  status   - View current availability & stats" },
        { type: "info", text: "  projects - List production platforms & repos" },
        { type: "info", text: "  skills   - Display tech stack ratings" },
        { type: "info", text: "  hire     - Get direct contact info for hiring" },
        { type: "info", text: "  resume   - Get resume download link" },
        { type: "info", text: "  clear    - Clear terminal screen" }
      );
    } else if (cmd === "status") {
      newLogs.push(
        { type: "success", text: "🟢 Status: Available for Full-Time & Freelance opportunities" },
        { type: "output", text: `Builds: ${stats[0].value}+ Projects | ${stats[1].value} Production Platforms` },
        { type: "output", text: `Location: ${personalInfo.location}` }
      );
    } else if (cmd === "projects") {
      newLogs.push({ type: "output", text: "🚀 Recent Production & Featured Projects:" });
      projects.slice(0, 4).forEach((p) => {
        newLogs.push({ type: "info", text: ` • ${p.title} (${p.subtitle}) -> ${p.github}` });
      });
    } else if (cmd === "skills") {
      newLogs.push(
        { type: "output", text: "⚡ Key Tech Stack:" },
        { type: "info", text: "  Frontend: React.js, Next.js, TypeScript, Tailwind CSS, WordPress" },
        { type: "info", text: "  Backend:  Node.js, Express.js, MongoDB, REST APIs, Flask" },
        { type: "info", text: "  AI & ML:   Gemini AI, Groq AI, OpenAI API, Prompt Engineering" }
      );
    } else if (cmd === "hire" || cmd === "contact") {
      newLogs.push(
        { type: "success", text: "📬 Contact Avinash Kumar:" },
        { type: "info", text: `  Email:    ${personalInfo.email}` },
        { type: "info", text: `  Phone:    ${personalInfo.phone}` },
        { type: "info", text: `  LinkedIn: ${personalInfo.linkedin}` },
        { type: "info", text: `  GitHub:   ${personalInfo.github}` }
      );
    } else if (cmd === "resume") {
      newLogs.push(
        { type: "success", text: "📄 Opening Resume PDF..." },
        { type: "info", text: `Link: ${personalInfo.resumeUrl}` }
      );
      window.open(personalInfo.resumeUrl, "_blank");
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else {
      newLogs.push({ type: "error", text: `command not found: ${rawCmd}. Type 'help' for available commands.` });
    }

    setHistory((prev) => [...prev, ...newLogs]);
  };

  return (
    <div
      style={{
        background: "rgba(8, 8, 18, 0.95)",
        border: "1px solid rgba(0, 217, 240, 0.25)",
        borderRadius: "18px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 217, 240, 0.1)",
        overflow: "hidden",
        fontFamily: "Fira Code, monospace",
      }}
    >
      {/* IDE Header Tabs */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          height: "44px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((bg) => (
            <div key={bg} style={{ width: "11px", height: "11px", borderRadius: "50%", background: bg }} />
          ))}
          <span style={{ fontSize: "11px", color: "#56566a", marginLeft: "8px" }}>vibe-ide // workspace</span>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { id: "developer.ts", label: "developer.ts", icon: FiCode },
            { id: "cli_terminal.sh", label: "terminal.sh", icon: FiTerminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.click();
                  setActiveTab(tab.id);
                }}
                style={{
                  padding: "6px 14px",
                  background: isActive ? "rgba(0, 217, 240, 0.12)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(0, 217, 240, 0.3)" : "transparent"}`,
                  borderRadius: "6px",
                  color: isActive ? "#00d9f0" : "#9898b0",
                  fontFamily: "Fira Code, monospace",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        {activeTab === "developer.ts" ? (
          <button
            onClick={handleCopyCode}
            style={{
              padding: "4px 10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: copied ? "#10b981" : "#9898b0",
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        ) : (
          <div style={{ width: "60px" }} />
        )}
      </div>

      {/* Code Editor View */}
      {activeTab === "developer.ts" && (
        <div style={{ padding: "20px 24px", fontSize: "13px", lineHeight: 1.8, color: "#e8e8ef", overflowX: "auto" }}>
          <div>
            <span style={{ color: "#8b5cf6" }}>export const </span>
            <span style={{ color: "#00d9f0" }}>developer</span> = &#123;
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>name: </span>
            <span style={{ color: "#10b981" }}>"Avinash Kumar"</span>,
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>role: </span>
            <span style={{ color: "#10b981" }}>"Full Stack Web Developer"</span>,
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>education: </span>
            <span style={{ color: "#10b981" }}>"MCA (Software Engineering) @ GGSIPU"</span>,
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>coreStack: </span>[
            <span style={{ color: "#f59e0b" }}>"MERN"</span>,{" "}
            <span style={{ color: "#f59e0b" }}>"Next.js"</span>,{" "}
            <span style={{ color: "#f59e0b" }}>"TypeScript"</span>,{" "}
            <span style={{ color: "#f59e0b" }}>"WordPress"</span>,{" "}
            <span style={{ color: "#f59e0b" }}>"Gemini AI"</span>],
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>livePlatforms: </span>[
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#00d9f0" }}>"https://crm.tmsvisa.com"</span>,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#00d9f0" }}>"https://tmsvisa.com"</span>,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#00d9f0" }}>"https://triloknathimmigration.in"</span>
            <br />
            &nbsp;&nbsp;],
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <span style={{ color: "#9898b0" }}>currentStatus: </span>
            <span style={{ color: "#10b981" }}>"Available for Opportunities 🚀"</span>
          </div>
          <div>&#125;;</div>
        </div>
      )}

      {/* Terminal View */}
      {activeTab === "cli_terminal.sh" && (
        <div style={{ padding: "16px", minHeight: "260px", display: "flex", flexDirection: "column" }}>
          {/* Preset Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {["help", "status", "projects", "skills", "hire", "resume", "clear"].map((c) => (
              <button
                key={c}
                onClick={() => runCommand(c)}
                style={{
                  padding: "3px 10px",
                  background: "rgba(0,217,240,0.08)",
                  border: "1px solid rgba(0,217,240,0.2)",
                  borderRadius: "4px",
                  color: "#00d9f0",
                  fontSize: "11px",
                  fontFamily: "Fira Code, monospace",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                &gt; {c}
              </button>
            ))}
          </div>

          {/* Log History */}
          <div ref={logsContainerRef} style={{ flex: 1, overflowY: "auto", fontSize: "12px", lineHeight: 1.7, marginBottom: "12px", maxHeight: "220px" }}>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  color:
                    h.type === "sys"
                      ? "#9898b0"
                      : h.type === "cmd"
                      ? "#00d9f0"
                      : h.type === "success"
                      ? "#10b981"
                      : h.type === "error"
                      ? "#ef4444"
                      : "#e8e8ef",
                  fontWeight: h.type === "cmd" ? 600 : 400,
                }}
              >
                {h.text}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand();
            }}
            style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px" }}
          >
            <span style={{ color: "#00d9f0", fontSize: "13px" }}>$</span>
            <input
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="type 'help' or command..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e8e8ef",
                fontFamily: "Fira Code, monospace",
                fontSize: "13px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "transparent",
                border: "none",
                color: "#00d9f0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiCornerDownLeft size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
