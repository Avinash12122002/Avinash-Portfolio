# 🚀 Avinash Kumar — Developer Portfolio (2026)

A premium, futuristic developer portfolio with Groq AI chat, particle animations, scroll reveals, and more.

---

## 📁 Project Structure

```
avinash-portfolio/
├── public/
│   ├── favicon.svg            # SVG logo favicon
│   └── avinash-resume.pdf     # ← ADD YOUR RESUME PDF HERE
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx   # Animated loading screen
│   │   ├── Navbar.jsx          # Sticky navbar with scroll-aware glass effect
│   │   ├── Hero.jsx            # Canvas particles, typing animation, CTA buttons
│   │   ├── About.jsx           # Bio, animated stat counters, education timeline
│   │   ├── Skills.jsx          # Tab-based skill bars, ring charts, tech cloud
│   │   ├── Projects.jsx        # Filterable project cards with GitHub/Demo links
│   │   ├── Experience.jsx      # Vertical timeline, internship cards
│   │   ├── Contact.jsx         # EmailJS form, contact info, services grid
│   │   ├── Footer.jsx          # Full footer with links, socials, back-to-top
│   │   └── AIChat.jsx          # Groq AI floating chat widget
│   ├── data/
│   │   └── portfolioData.js    # All portfolio content (skills, projects, etc.)
│   ├── hooks/
│   │   └── useInView.js        # IntersectionObserver, typing, counter hooks
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles, animations, utilities
│   └── main.jsx                # React entry point
├── .env.example                # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ⚡ Quick Start (Local Dev)

### 1. Install Node.js (v18+)
Download from: https://nodejs.org

### 2. Install dependencies
```bash
cd avinash-portfolio
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Then edit `.env` and add your Groq API key:
```
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
```
Get a **free** Groq key at → https://console.groq.com

### 4. Set up EmailJS (Contact Form)
1. Go to https://www.emailjs.com → Create a free account
2. Create a **Service** (Gmail / Outlook) → copy the **Service ID**
3. Create an **Email Template** with variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Copy your **Template ID** and **Public Key**
5. In `src/components/Contact.jsx` replace:
   - `YOUR_SERVICE_ID` → your Service ID
   - `YOUR_TEMPLATE_ID` → your Template ID
   - `YOUR_PUBLIC_KEY` → your Public Key

### 5. Add your resume
Place your resume PDF at:
```
public/avinash-resume.pdf
```

### 6. Start dev server
```bash
npm run dev
```
Open → http://localhost:5173

---

## 🔧 Customization

### Update your info
Edit **`src/data/portfolioData.js`**:
- `personalInfo` — name, email, phone, social links
- `projects` — replace `github` and `demo` with real URLs
- `skills`, `experience`, `education` — all your data

### Add project images
In `Projects.jsx`, the `ProjectHeaderArt` component shows a gradient + icon.
To use a real image, replace it with:
```jsx
<img src="/projects/my-project.jpg" alt="..." style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel login
vercel
```
After deploy, go to Vercel dashboard → Project Settings → Environment Variables
Add `VITE_GROQ_API_KEY` = your Groq key

### Option 2: Netlify (Free)
```bash
npm run build
# Upload the /dist folder to netlify.com/drop
# OR use Netlify CLI:
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```
Add environment variable in Netlify dashboard → Site Settings → Environment Variables

### Option 3: GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json`:
```json
"homepage": "https://Avinash12122002.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
In `vite.config.js` add `base: '/portfolio/'`
```bash
npm run deploy
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Loading Screen with progress bar | ✅ |
| Sticky glassmorphism Navbar | ✅ |
| Canvas particle network (Hero) | ✅ |
| Cycling typing animation | ✅ |
| Floating tech badges | ✅ |
| Scroll progress bar | ✅ |
| Scroll-reveal animations | ✅ |
| Animated stat counters | ✅ |
| Tab-based skill bars + rings | ✅ |
| SVG circuit board decoration | ✅ |
| Filterable project grid | ✅ |
| Vertical experience timeline | ✅ |
| EmailJS contact form | ✅ |
| Groq AI floating chat | ✅ |
| Mobile responsive | ✅ |
| Dark futuristic theme | ✅ |
| Noise texture overlay | ✅ |
| Custom scrollbar | ✅ |
| Back-to-top button | ✅ |

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **react-icons**
- **@emailjs/browser**
- **Groq AI API** (llama-3.1-8b-instant)
- **Canvas API** (particles)
- **CSS Keyframe Animations**
- **IntersectionObserver API**

---

Built with 💙 by Avinash Kumar
