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

export default function App() {
  const [loading, setLoading] = useState(true);
  const progress = useScrollProgress();

  useEffect(() => {
    // Simulate resource loading
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="noise-overlay">
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Groq AI Floating Chat */}
      <AIChat />
    </div>
  );
}
