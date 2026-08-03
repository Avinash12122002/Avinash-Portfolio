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
  { value: 12, suffix: "+", label: "Projects Built"   },
  { value: 3,  suffix: "",  label: "Production Platforms" },
  { value: 15, suffix: "+", label: "Technologies"     },
  { value: 3,  suffix: "",  label: "Roles & Internships" },
];

export const skillCategories = [
  {
    id: "frontend", label: "Frontend",
    skills: [
      { name: "React.js",           level: 98, icon: "⚛️",  color: "#61dafb" },
      { name: "Next.js",            level: 92, icon: "▲",   color: "#e8e8ef" },
      { name: "TypeScript",         level: 90, icon: "🔷",  color: "#3178c6" },
      { name: "JavaScript (ES6+)",  level: 98, icon: "🟨",  color: "#f7df1e" },
      { name: "HTML5 & CSS3",       level: 99, icon: "🌐",  color: "#e34c26" },
      { name: "Tailwind CSS",       level: 97, icon: "💨",  color: "#38bdf8" },
      { name: "WordPress",          level: 85, icon: "📝",  color: "#21759b" },
    ],
  },
  {
    id: "backend", label: "Backend",
    skills: [
      { name: "Node.js",     level: 92, icon: "🟢", color: "#68a063" },
      { name: "Express.js",  level: 92, icon: "🚂", color: "#9898b0" },
      { name: "MongoDB",     level: 95, icon: "🍃", color: "#47a248" },
      { name: "REST APIs",   level: 95, icon: "🔗", color: "#f97316" },
      { name: "MySQL / SQL", level: 88, icon: "🗄️", color: "#00758f" },
      { name: "Flask",       level: 74, icon: "🐍", color: "#3776ab" },
    ],
  },
  {
    id: "ai", label: "AI & ML",
    skills: [
      { name: "Gemini AI API",      level: 90, icon: "✨", color: "#8b5cf6" },
      { name: "Groq AI",            level: 88, icon: "⚡", color: "#00d9f0" },
      { name: "OpenAI API",         level: 85, icon: "🤖", color: "#10b981" },
      { name: "Prompt Engineering", level: 85, icon: "💬", color: "#f59e0b" },
      { name: "Python",             level: 78, icon: "🐍", color: "#3776ab" },
    ],
  },
  {
    id: "tools", label: "Tools",
    skills: [
      { name: "Git & GitHub",    level: 95, icon: "🐙", color: "#e8e8ef" },
      { name: "Postman",         level: 90, icon: "📮", color: "#ef5533" },
      { name: "VS Code",         level: 95, icon: "🛠️", color: "#007acc" },
      { name: "Agile / SDLC",    level: 90, icon: "🔄", color: "#00d9f0" },
      { name: "JWT / Auth",      level: 90, icon: "🔐", color: "#f59e0b" },
      { name: "Vercel",          level: 90, icon: "🚀", color: "#8b5cf6" },
    ],
  },
];

export const techIcons = [
  { name: "React",       color: "#61DAFB" }, // Sky Blue
  { name: "Next.js",     color: "#E8E8EF" }, // Light Gray
  { name: "TypeScript",  color: "#3178C6" }, // TS Blue
  { name: "Node.js",     color: "#68A063" }, // Green
  { name: "MongoDB",     color: "#47A248" }, // Dark Green
  { name: "Express",     color: "#8B5CF6" }, // Purple
  { name: "WordPress",   color: "#21759B" }, // WordPress Blue
  { name: "Tailwind",    color: "#38BDF8" }, // Cyan
  { name: "JavaScript",  color: "#F7DF1E" }, // Yellow
  { name: "Python",      color: "#3776AB" }, // Python Blue
  { name: "Flask",       color: "#FF6B6B" }, // Coral Red
  { name: "MySQL",       color: "#00758F" }, // Teal Blue
  { name: "Git/Github",  color: "#F05032" }, // Orange Red
  { name: "HTML/CSS",    color: "#F24E1E" }, // Orange
  { name: "Gemini AI",   color: "#A855F7" }, // Violet
  { name: "Groq AI",     color: "#06B6D4" }, // Turquoise
  { name: "OpenAI",      color: "#10B981" }, // Emerald
  { name: "DSA",         color: "#EF4444" }, // Red
  { name: "OOPS",        color: "#F59E0B" }, // Amber
  { name: "C/C++",       color: "#2563EB" }, // Royal Blue
];

export const projects = [
  {
    id: 1,
    title: "TMS Visa CRM",
    subtitle: "Next.js, TypeScript & MongoDB CRM Platform",
    category: ["All", "Full Stack", "Next.js"],
    description: "Internal CRM with 20+ features spanning lead pipeline management, client record-keeping, case status tracking, and role-based dashboards. Built with Next.js and TypeScript, managing data for 100+ active clients daily.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Node.js", "Tailwind CSS", "REST API"],
    github: "https://github.com/Avinash12122002/CRM",
    demo: "https://crm.tmsvisa.com",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(0,217,240,0.25), rgba(59,130,246,0.25))",
    accent: "#00d9f0",
    icon: "💼",
    stats: { stars: 32, forks: 10 },
  },
  {
    id: 2,
    title: "tmsvisa.com",
    subtitle: "Primary Visa Services Platform",
    category: ["All", "Full Stack", "MERN"],
    description: "Company's primary visa services website combining a React/Node.js frontend with a WordPress-managed content layer so non-technical staff can update service pages independently. Optimized for mobile responsiveness and fast page loads, generating 50+ monthly inquiry leads.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "WordPress", "Tailwind CSS"],
    github: "https://github.com/Avinash12122002/tmsvisa",
    demo: "https://tmsvisa.com",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(0,217,240,0.25))",
    accent: "#10b981",
    icon: "✈️",
    stats: { stars: 28, forks: 9 },
  },
  {
    id: 3,
    title: "triloknathimmigration.in",
    subtitle: "Immigration Consultancy Website",
    category: ["All", "Full Stack", "MERN"],
    description: "Immigration consultancy site covering 10+ service categories, built on the MERN stack with WordPress content management for easy updates. Structured with SEO-friendly pages and clear calls-to-action, supporting 30+ monthly client inquiries.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "WordPress", "SEO"],
    github: "https://github.com/Avinash12122002/Triloknath-Immigration",
    demo: "https://triloknathimmigration.in",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(245,158,11,0.25))",
    accent: "#f97316",
    icon: "🌍",
    stats: { stars: 25, forks: 7 },
  },
  {
    id: 4,
    title: "Developer Portfolio",
    subtitle: "Interactive Developer Portfolio",
    category: ["All", "Frontend", "AI"],
    description: "Personal developer portfolio built with React, Vite, and Tailwind CSS. Features interactive particle network, project showcases with filters, experience timeline, skills matrix, contact form, and AI assistant.",
    tech: ["React", "Vite", "Tailwind CSS", "JavaScript", "EmailJS", "Groq AI"],
    github: "https://github.com/Avinash12122002/Avinash-Portfolio",
    demo: "#",
    featured: true,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.25))",
    accent: "#8b5cf6",
    icon: "🎨",
    stats: { stars: 30, forks: 8 },
  },
  {
    id: 5,
    title: "AI Online Assessment Platform",
    subtitle: "AI-Powered Proctored Testing",
    category: ["All", "AI", "Full Stack", "MERN"],
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
    id: 6,
    title: "Airbnb Clone",
    subtitle: "Full-Stack Property Booking",
    category: ["All", "Full Stack", "MERN"],
    description: "Scalable property booking platform with complete CRUD, authentication, booking workflows, and responsive UI for hosts and guests. RESTful APIs with JWT auth.",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Tailwind CSS", "JWT"],
    github: "https://github.com/Avinash12122002/airbnb-clone",
    demo: "#",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(236,72,153,0.2))",
    accent: "#f97316",
    icon: "🏡",
    stats: { stars: 18, forks: 5 },
  },
  {
    id: 7,
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
    id: 8,
    title: "DocQA AI Platform",
    subtitle: "AI-Powered Document & Multimedia Q&A",
    category: ["All", "AI", "Full Stack"],
    description: "Advanced AI platform that allows users to upload PDFs, audio, and video files and chat with them using GPT-4, FAISS semantic search, Whisper transcription, JWT authentication, Redis caching, and real-time streaming responses.",
    tech: ["React", "FastAPI", "Python", "MongoDB", "Redis", "OpenAI", "FAISS", "Docker"],
    github: "https://github.com/Avinash12122002/docqa",
    demo: "#",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
    accent: "#3b82f6",
    icon: "🤖",
    stats: { stars: 42, forks: 14 },
  },
  {
    id: 9,
    title: "Content Broadcasting System",
    subtitle: "Educational Content Management Platform",
    category: ["All", "Full Stack", "Next.js"],
    description: "Role-based educational platform where teachers upload content, principals approve or reject submissions, and students access live public broadcasts. Features authentication, content scheduling, file uploads, approval workflows, dashboards, and real-time broadcasting.",
    tech: ["Next.js", "React", "Tailwind CSS", "TanStack Query", "Axios", "JWT", "React Hook Form", "Zod"],
    github: "https://github.com/Avinash12122002/content-broadcast-system",
    demo: "#",
    featured: false,
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.2))",
    accent: "#10b981",
    icon: "📡",
    stats: { stars: 38, forks: 11 },
  },
];

export const projectFilters = ["All", "Full Stack", "MERN", "Next.js", "AI", "Frontend"];

export const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Groworld Vijatour Pvt. Ltd.",
    companyUrl: "https://tmsvisa.com",
    period: "May 2026 – Present",
    duration: "Present",
    type: "Delhi, India",
    color: "#00d9f0",
    points: [
      "Serve as sole developer for company digital platforms, personally handling requirement gathering, UI/UX design, coding, QA testing, deployment, and maintenance across 3 production systems.",
      "Build and maintain tmsvisa.com, company primary visa services website on MERN stack integrated with WordPress, generating 50+ monthly inquiry leads.",
      "Run triloknathimmigration.in, an immigration consultancy website built on MERN stack with WordPress content layer, supporting 30+ monthly client inquiries.",
      "Architect and maintain crm.tmsvisa.com, a full stack CRM built with Next.js and TypeScript with 20+ features, managing data for 100+ active clients.",
      "Engineer REST APIs and MongoDB schemas powering real-time data sync across all 3 platforms without a dedicated backend team.",
    ],
    tech: ["Next.js", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "WordPress", "REST API"],
  },
  {
    id: 2,
    role: "Frontend Development Intern",
    company: "IBM",
    companyUrl: "https://www.ibm.com",
    period: "Jul 2025 – Aug 2025",
    duration: "1 months",
    type: "Remote Internship",
    color: "#8b5cf6",
    points: [
      "Collaborated within a 5-member Agile team to develop responsive, reusable frontend components using React.js, JavaScript, HTML5, and CSS3.",
      "Translated complex user requirements and wireframes into accessible, modular UI components aligned with design systems.",
      "Performed debugging, testing, and cross-browser optimization to improve performance and reliability.",
      "Actively participated in sprint discussions, code reviews, and feature implementation ceremonies.",
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Agile"],
  },
  {
    id: 3,
    role: "Full Stack Intern",
    company: "UpToSkills",
    companyUrl: "https://uptoskills.com/",
    period: "Mar 2025 – Jun 2025",
    duration: "3 months",
    type: "Remote Internship",
    color: "#f97316",
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
