// ─── Personal Information ─────────────────────────────────────
export const personalInfo = {
  name: "Avinash Kumar",
  shortName: "AK",
  title: "Full Stack Developer",
  bio: "Full Stack Developer Completed My MCA in Software Engineering at GGSIPU. Passionate about building beautiful, scalable, and AI-powered web applications that solve real-world problems.",
  bio2: "I specialize in the MERN stack and love integrating cutting-edge AI APIs to create intelligent, data-driven experiences that feel like the future.",
  email: "akak2805034@gmail.com",
  phone: "+91 93544 97615",
  location: "Delhi, India",
  github: "https://github.com/Avinash12122002",
  linkedin: "https://www.linkedin.com/in/avinash-kumar-60b9a827b/",
  twitter: "https://x.com/Avinash71715776",
  instagram: "https://www.instagram.com/_____avinash.__/?hl=en",
  resumeUrl: "/avinash-resume.pdf",
  dsaProfile: "https://www.geeksforgeeks.org/profile/akak2805034?tab=activity",
  available: true,
};

export const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Engineer",
  "React Developer",
  "AI Application Builder",
  "Creative Coder",
  "UI/UX Enthusiast",
];

export const stats = [
  { value: 6,  suffix: "+", label: "month Experience" },
  { value: 10, suffix: "+", label: "Projects Built"   },
  { value: 15, suffix: "+", label: "Technologies"     },
  { value: 2,  suffix: "",  label: "Internships"      },
];

export const skillCategories = [
  {
    id: "frontend", label: "Frontend",
    skills: [
      { name: "React.js",           level: 98, icon: "⚛️",  color: "#61dafb" },
      { name: "JavaScript (ES6+)",  level: 98, icon: "🟨",  color: "#f7df1e" },
      { name: "HTML5 & CSS3",       level: 99, icon: "🌐",  color: "#e34c26" },
      { name: "Tailwind CSS",       level: 97, icon: "💨",  color: "#38bdf8" },
      { name: "TypeScript",         level: 68, icon: "🔷",  color: "#3178c6" },
      { name: "Next.js",            level: 65, icon: "▲",   color: "#e8e8ef" },
    ],
  },
  {
    id: "backend", label: "Backend",
    skills: [
      { name: "Node.js",     level: 85, icon: "🟢", color: "#68a063" },
      { name: "Express.js",  level: 85, icon: "🚂", color: "#9898b0" },
      { name: "MongoDB",     level: 90, icon: "🍃", color: "#47a248" },
      { name: "MySQL / SQL", level: 88, icon: "🗄️", color: "#00758f" },
      { name: "Flask",       level: 74, icon: "🐍", color: "#3776ab" },
      { name: "REST APIs",   level: 90, icon: "🔗", color: "#f97316" },
    ],
  },
  {
    id: "ai", label: "AI & ML",
    skills: [
      { name: "Gemini AI API",      level: 82, icon: "✨", color: "#8b5cf6" },
      { name: "Groq AI",            level: 88, icon: "⚡", color: "#00d9f0" },
      { name: "OpenAI API",         level: 72, icon: "🤖", color: "#10b981" },
      { name: "Prompt Engineering", level: 65, icon: "💬", color: "#f59e0b" },
      { name: "Python",             level: 75, icon: "🐍", color: "#3776ab" },
    ],
  },
  {
    id: "tools", label: "Tools",
    skills: [
      { name: "Git & GitHub",    level: 90, icon: "🐙", color: "#e8e8ef" },
      { name: "JWT / Auth",      level: 85, icon: "🔐", color: "#f59e0b" },
      { name: "Postman",         level: 85, icon: "📮", color: "#ef5533" },
      { name: "Agile / SDLC",    level: 80, icon: "🔄", color: "#00d9f0" },
      { name: "VS Code",         level: 88, icon: "🛠️", color: "#007acc" },
      { name: "Vercel",          level: 82, icon: "🚀", color: "#8b5cf6" },
    ],
  },
];

export const techIcons = [
  { name: "React",       color: "#61DAFB" }, // Sky Blue
  { name: "Node.js",     color: "#68A063" }, // Green
  { name: "MongoDB",     color: "#47A248" }, // Dark Green
  { name: "Express",     color: "#8B5CF6" }, // Purple
  { name: "Python",      color: "#3776AB" }, // Python Blue
  { name: "Flask",       color: "#FF6B6B" }, // Coral Red
  { name: "JavaScript",  color: "#F7DF1E" }, // Yellow
  { name: "TypeScript",  color: "#3178C6" }, // TS Blue
  { name: "Tailwind",    color: "#38BDF8" }, // Cyan
  { name: "Next.js",     color: "#E8E8EF" }, // Light Gray
  { name: "MySQL",       color: "#00758F" }, // Teal Blue
  { name: "Git/Github",  color: "#F05032" }, // Orange Red
  { name: "HTM/CSS",     color: "#F24E1E" }, // Orange
  { name: "Gemini AI",   color: "#A855F7" }, // Violet
  { name: "Groq AI",     color: "#06B6D4" }, // Turquoise
  { name: "OpenAI",      color: "#10B981" }, // Emerald
  { name: "DSA",         color: "#EF4444" }, // Red
  { name: "OOPS",        color: "#F59E0B" }, // Amber
  { name: "C/C++",       color: "#2563EB" }, // Royal Blue
  { name: "C#",          color: "#9333EA" }, // Deep Purple
];

export const projects = [
  {
    id: 1,
    title: "AI Online Assessment Platform",
    subtitle: "AI-Powered Proctored Testing",
    category: ["All", "AI", "Full Stack","MERN"],
    description: "AI-powered assessment platform with role-based auth for HR and candidates. Integrated Gemini AI to generate 100+ quiz questions dynamically. Real-time proctoring: webcam monitoring, tab-switch detection, eye tracking.",
    tech: ["React", "Node.js", "Flask", "MongoDB", "Gemini AI", "Tailwind CSS"],
    github: "https://github.com/Avinash12122002/AI-Assessment-Test",
    demo: "#",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(0,217,240,0.2), rgba(139,92,246,0.2))",
    accent: "#00d9f0",
    icon: "🤖",
    stats: { stars: 24, forks: 8 },
  },
  {
    id: 2,
    title: "Airbnb Clone",
    subtitle: "Full-Stack Property Booking",
    category: ["All", "Full Stack", "MERN"],
    description: "Scalable property booking platform with complete CRUD, authentication, booking workflows, and responsive UI for hosts and guests. RESTful APIs with JWT auth.",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Tailwind CSS", "JWT"],
    github: "https://github.com/Avinash12122002/airbnb-clone",
    demo: "#",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(236,72,153,0.2))",
    accent: "#f97316",
    icon: "🏡",
    stats: { stars: 18, forks: 5 },
  },
  {
    id: 3,
    title: "Solar System Simulation",
    subtitle: "Interactive 3D Visualization",
    category: ["All", "Frontend", "JavaScript"],
    description: "Interactive 3D visualization of planetary motion using JavaScript Canvas API and Three.js. Real-time animations, orbit controls, and accurate orbital mechanics.",
    tech: ["JavaScript", "Three.js", "Canvas API", "HTML5", "CSS3"],
    github: "https://github.com/Avinash12122002/solar-system-3d",
    demo: "https://solar-system-3d-sandy.vercel.app/",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))",
    accent: "#3b82f6",
    icon: "🪐",
    stats: { stars: 12, forks: 3 },
  },
 {
  id: 4,
  title: "DocQA AI Platform",
  subtitle: "AI-Powered Document & Multimedia Q&A",
  category: ["All", "AI", "Full Stack"],
  description:
    "Advanced AI platform that allows users to upload PDFs, audio, and video files and chat with them using GPT-4, FAISS semantic search, Whisper transcription, JWT authentication, Redis caching, and real-time streaming responses.",
  tech: [
    "React",
    "FastAPI",
    "Python",
    "MongoDB",
    "Redis",
    "OpenAI",
    "FAISS",
    "Docker"
  ],
  github: "https://github.com/Avinash12122002/docqa",
  demo: "#",
  featured: true,
  gradient:
    "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
  accent: "#3b82f6",
  icon: "🤖",
  stats: { stars: 42, forks: 14 },
},
{
  id: 5,
  title: "Content Broadcasting System",
  subtitle: "Educational Content Management Platform",
  category: ["All", "Full Stack","MERN"],
  description:
    "Role-based educational platform where teachers upload content, principals approve or reject submissions, and students access live public broadcasts. Features authentication, content scheduling, file uploads, approval workflows, dashboards, and real-time broadcasting.",
  tech: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TanStack Query",
    "Axios",
    "JWT",
    "React Hook Form",
    "Zod"
  ],
  github: "https://github.com/Avinash12122002/content-broadcast-system",
  demo: "#",
  featured: true,
  gradient:
    "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))",
  accent: "#10b981",
  icon: "📡",
  stats: { stars: 38, forks: 11 },
},
  {
    id: 6,
    title: "Developer Portfolio v2",
    subtitle: "This Portfolio – Built with React",
    category: ["All", "Frontend","AI"],
    description: "This portfolio! Built with React, Vite, Tailwind. Canvas particle network, typing effects, scroll-reveal animations, Groq AI chat, full contact form via EmailJS.",
    tech: ["React", "Vite", "Tailwind CSS", "EmailJS", "Groq AI"],
    github: "#",
    demo: "#",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
    accent: "#8b5cf6",
    icon: "💼",
    stats: { stars: 20, forks: 7 },
  },
];

export const projectFilters = ["All", "AI", "Full Stack", "MERN", "Frontend"];

export const experience = [
  {
    id: 1,
    role: "Frontend Development Intern",
    company: "IBM",
    companyUrl: "https://www.ibm.com",
    period: "Jul 2025 – Aug 2025",
    duration: "1 months",
    type: "Remote Internship",
    color: "#00d9f0",
    points: [
      "Collaborated within a 5-member Agile team to develop responsive, reusable frontend components using React.js, JavaScript, HTML5, and CSS3.",
      "Translated complex user requirements and wireframes into accessible, modular UI components aligned with design systems.",
      "Performed debugging, testing, and cross-browser optimization to improve performance and reliability.",
      "Actively participated in sprint discussions, code reviews, and feature implementation ceremonies.",
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Agile"],
  },
  {
    id: 2,
    role: "Full Stack Intern",
    company: "UpToSkills",
    companyUrl: "https://uptoskills.com/",
    period: "Mar 2025 – Jun 2025",
    duration: "3 months",
    type: "Remote Internship",
    color: "#8b5cf6",
    points: [
      "Led an 8-member core development team building an AI-powered online assessment platform using React.js, Node.js, Flask, and MongoDB.",
      "Developed secure authentication systems, role-based dashboards, quiz modules, analytics, and AI-integrated workflows.",
      "Integrated Gemini AI APIs to automate quiz question generation, reducing manual setup time by 80%.",
      "Coordinated sprint planning, task delegation, debugging, and deployment in a fast-paced Agile environment.",
    ],
    tech: ["React.js", "Node.js", "Flask", "MongoDB", "Gemini AI", "JWT"],
  },
];

export const education = [
  {
    degree: "M.C.A. (Software Engineering)",
    institution: "USICT, GGSIPU",
    period: "2024 – 2026",
    grade: "CGPA: 8.8",
    current: true,
    color: "#00d9f0",
    icon: "🎓",
  },
  {
    degree: "B.Sc. (Physical Science with CS)",
    institution: "Rajdhani College, DU",
    period: "2020 – 2023",
    grade: "CGPA: 8.5",
    current: false,
    color: "#8b5cf6",
    icon: "🏫",
  },
  {
    degree: "Senior Secondary (12th)",
    institution: "CBSE Board",
    period: "2018 – 2020",
    grade: "85%",
    current: false,
    color: "#f97316",
    icon: "📚",
  },
];

export const services = [
  { icon: "🌐", title: "Web Development",    desc: "Full-stack web apps with React, Node.js, and MongoDB.", color: "#00d9f0" },
  { icon: "⚛️", title: "Frontend Dev",       desc: "Pixel-perfect, responsive UIs with React & Tailwind.", color: "#8b5cf6" },
  { icon: "🤖", title: "AI Integration",     desc: "Embed Gemini, Groq, or OpenAI into your product.", color: "#10b981" },
  { icon: "🔗", title: "REST API Design",    desc: "Secure, scalable APIs with JWT auth and Express.", color: "#f97316" },
  { icon: "🎨", title: "UI/UX Design",       desc: "Modern, animated interfaces with Figma-to-code.", color: "#ec4899" },
  { icon: "🚀", title: "Deployment & DevOps",desc: "Deploy on Vercel, Netlify, or Render with CI/CD.", color: "#f59e0b" },
];

export const techBadges = [
  { name: "React",      top: "8%",  left: "45%" },
  { name: "JavaScript", top: "15%", left: "72%" },
  { name: "Tailwind",   top: "35%", left: "88%" },
  { name: "Express",    top: "60%", left: "85%" },
  { name: "MongoDB",    top: "82%", left: "70%" },
  { name: "MySQL",      top: "90%", left: "45%" },
  { name: "OOPS",       top: "82%", left: "20%" },
  { name: "C/C++",      top: "60%", left: "5%" },
  { name: "DSA",        top: "35%", left: "2%" },
  { name: "HTML/CSS",   top: "15%", left: "18%" },
  { name: "Python",     top: "25%", left: "35%" },
  { name: "Flask",      top: "25%", left: "60%" },
  { name: "Node.js",    top: "55%", left: "30%" },
];
