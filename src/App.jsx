import { useState, useEffect } from "react";
import { useScrollProgress } from "./hooks/useInView";
import LoadingScreen from "./components/LoadingScreen";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Skills       from "./components/Skills";
import Projects     from "./components/Projects";
import Experience   from "./components/Experience";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import AIChat       from "./components/AIChat";
import CommandPalette from "./components/CommandPalette";
import { sound } from "./utils/sound";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const progress = useScrollProgress();

  useEffect(() => {
    // Simulate resource loading
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  const toggleSound = () => {
    const isNowEnabled = sound.toggle();
    setSoundEnabled(isNowEnabled);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="noise-overlay">
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <Navbar
        onOpenCommandPalette={() => setCmdOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <main>
        <Hero onOpenCommandPalette={() => setCmdOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Command Palette Keyboard Shortcut Modal */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Groq AI Floating Chat */}
      <AIChat />
    </div>
  );
}

