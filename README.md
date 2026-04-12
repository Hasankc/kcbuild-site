# KC Build — Web Development Agency

> **نحوّل أفكارك إلى واقع رقمي · We turn your ideas into digital reality**

A bilingual (Arabic/English), fully responsive, modern landing page for a web development agency. Built with React 18, Vite, and Tailwind CSS. Features dark/light mode, RTL/LTR switching, glassmorphism cards, smooth animations, and a working contact form.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🌐 Bilingual | Arabic (RTL default) ↔ English (LTR) — one-click toggle |
| 🌙 Dark / Light Mode | Persisted in localStorage, smooth transition |
| 🎨 Color Palette | Off-white `#F5F2EB` + Turquoise `#2DD4BF` + Navy `#0A1628` |
| ✨ Animations | Framer Motion — stagger reveals, count-up stats, animated progress bars |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| 🔢 Count-up Stats | Numbers animate from 0 to target on scroll |
| 🏷️ Tech Marquee | Infinite scrolling tech strip in Hero |
| 🔍 Portfolio Filter | Filter projects by category (Web App, Full Stack, etc.) |
| 📊 Skills Section | Animated progress bars per technology |
| 📅 Booking | Calendly integration + validated contact form |
| 🖱️ Custom Cursor | Turquoise dot + ring cursor (desktop only) |
| 📈 Scroll Progress | Turquoise bar at the very top of the page |
| ⬆️ Back to Top | Appears after scrolling 600px |
| 🔄 Active Nav | Navbar link highlights based on visible section |

---

## 🗂️ Project Structure

```
kc-build/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav, mobile menu, active section tracking
│   │   ├── Hero.jsx            # Headline, stats, marquee, CTA buttons
│   │   ├── Services.jsx        # 6 service cards with glassmorphism + hover
│   │   ├── Portfolio.jsx       # GitHub projects with filter tabs
│   │   ├── Skills.jsx          # Animated skill progress bars
│   │   ├── Process.jsx         # 4-step timeline
│   │   ├── Testimonials.jsx    # Client reviews with star ratings
│   │   ├── Booking.jsx         # Calendly CTA + contact form with validation
│   │   └── Footer.jsx          # Dark footer, social links
│   ├── context/
│   │   ├── LanguageContext.jsx # AR/EN toggle, RTL/LTR, font switching
│   │   └── ThemeContext.jsx    # Dark/Light toggle, localStorage
│   ├── translations/
│   │   ├── ar.js               # All Arabic text
│   │   └── en.js               # All English text
│   ├── App.jsx                 # Root: providers, scroll-to-top, cursor, progress bar
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom utilities + animations
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to GitHub Pages on push to main
├── index.html                  # HTML shell + Google Fonts + meta tags
├── tailwind.config.js          # Custom colors, animations, keyframes
├── vite.config.js              # Vite config (set base for GitHub Pages)
├── postcss.config.js           # PostCSS + Autoprefixer
├── package.json                # Dependencies + scripts
└── .gitignore
```

---

## 🚀 Getting Started — Copy & Run Locally

### Step 1 — Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) version **18 or higher** (check: `node -v`)
- [Git](https://git-scm.com/) (check: `git -v`)
- VS Code — [download here](https://code.visualstudio.com/)

### Step 2 — Set Up the Project
Open VS Code, open the Terminal (`Ctrl + `` ` ``), and run:

```bash
# 1. Install all dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open your browser at: **http://localhost:5173**

---

## 🌐 Deployment — 3 Options

---

### ✅ Option A: Vercel (RECOMMENDED — Easiest, Free, Custom Domain)

**This is the best option. Takes 3 minutes.**

1. Push your project to GitHub (see below)
2. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
3. Click **"Add New Project"** → Import your `kc-build` repository
4. Leave all settings as default → Click **"Deploy"**
5. Your site is live at `https://your-project.vercel.app`

**To connect a custom domain** (like `kcbuild.com`):
- Go to your Vercel project → Settings → Domains → Add your domain
- Point your domain's DNS to Vercel (they show you exactly how)

> ✅ Vercel auto-deploys every time you push to `main` — zero extra steps.

---

### ✅ Option B: GitHub Pages (Free, No Custom Domain Without Paid Plan)

#### Step 1 — Push Code to GitHub

```bash
# Run these in your VS Code Terminal, inside the kc-build folder:
git init
git add .
git commit -m "Initial commit — KC Build website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kc-build.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

#### Step 2 — Update vite.config.js for GitHub Pages

Open `vite.config.js` and change the `base` to your repository name:

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/kc-build/',   // <-- Replace 'kc-build' with your actual repo name
})
```

Then commit and push this change:
```bash
git add vite.config.js
git commit -m "Set base path for GitHub Pages"
git push
```

#### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source** → select **"GitHub Actions"**
4. The `.github/workflows/deploy.yml` file handles the rest automatically

#### Step 4 — Wait ~2 minutes

GitHub will run the workflow. Your site will be live at:
`https://YOUR_USERNAME.github.io/kc-build/`

You can check the deployment status under the **Actions** tab in your repository.

---

### ✅ Option C: Netlify (Drag & Drop — No Terminal Needed)

1. Run `npm run build` in your VS Code Terminal
2. This creates a `dist/` folder
3. Go to **[netlify.com](https://netlify.com)** → Sign up free
4. Click **"Add new site"** → **"Deploy manually"**
5. Drag and drop the `dist/` folder onto the page
6. Your site is live instantly at a random Netlify URL
7. Go to **Site settings** → **Domain management** to set a custom name

---

## 🔧 Required Customizations After Deployment

### 1. Replace the Calendly Link
Open `src/components/Booking.jsx`, find this line:
```js
href="https://calendly.com/kcbuild"
```
Replace it with your real Calendly link.

**To create a free Calendly account:**
- Go to [calendly.com](https://calendly.com) → Sign up free
- Create a "30-minute meeting" event
- Copy your link and paste it into `Booking.jsx`

---

### 2. Connect the Contact Form (to receive real emails)

By default the form simulates a send. To receive real emails, use **Formspree** (free):

1. Go to [formspree.io](https://formspree.io) → Sign up
2. Create a new form → Get your Form ID (looks like `xnqkjrvo`)
3. In `src/components/Booking.jsx`, replace the simulated send:

```js
// Find this line in handleSubmit:
await new Promise(r => setTimeout(r, 1500))

// Replace with:
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (!res.ok) throw new Error('Failed')
```

---

### 3. Update Social Links
In `src/components/Footer.jsx`:
```js
href="https://instagram.com/kcbuild.iq"   // ← Your Instagram
href="https://github.com/Hasankc"          // ← Your GitHub
```

---

### 4. Update Meta Tags (SEO)
Open `index.html` and update:
```html
<meta name="description" content="Your custom description here" />
<meta property="og:title" content="KC Build — Your Tagline" />
```

---

### 5. Add Your Real Testimonials
Open `src/translations/ar.js` and `src/translations/en.js`.
Find the `testimonials.items` array and replace the placeholder reviews with real ones from your clients.

---

### 6. Add Live Demo Links to Portfolio
When your projects have live URLs, open `src/translations/ar.js` (and `en.js`) and set `live:` fields:
```js
{ title: 'Book Library App', live: 'https://your-live-url.com', ... }
```

---

## 🎨 Color Reference

| Name | Hex | Used For |
|---|---|---|
| Off-White | `#F5F2EB` | Page background (light mode) |
| Turquoise | `#2DD4BF` | Primary accent, CTAs, icons |
| Deep Teal | `#0F766E` | Hover states, gradient end |
| Turquoise Light | `#CCFBF1` | Badge backgrounds |
| Navy | `#0A1628` | Dark mode bg, Footer |
| Navy Card | `#0F1E2E` | Dark mode card surface |
| Navy Border | `#1E3045` | Dark mode borders |

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility styling |
| Framer Motion | 11.x | Animations & transitions |
| Lucide React | 0.400+ | Icons |

---

## 🛠️ Available Scripts

```bash
npm run dev       # Start local dev server (http://localhost:5173)
npm run build     # Build for production → creates /dist folder
npm run preview   # Preview the production build locally
```

---

## ✅ Go-Live Checklist

- [ ] `npm install` completed without errors
- [ ] `npm run dev` works, site visible at localhost:5173
- [ ] Calendly link replaced in `Booking.jsx`
- [ ] Contact form connected to Formspree
- [ ] Instagram & GitHub links updated in `Footer.jsx`
- [ ] Meta tags updated in `index.html`
- [ ] Pushed to GitHub repository
- [ ] Deployed via Vercel, GitHub Pages, or Netlify
- [ ] Tested on mobile (Chrome DevTools → toggle device toolbar)
- [ ] Tested in dark mode
- [ ] Tested in English mode
- [ ] Real testimonials added

---

## 📱 Social Links

- Instagram: [@kcbuild.iq](https://instagram.com/kcbuild.iq)
- GitHub: [@Hasankc](https://github.com/Hasankc)

---

*Built with ❤️ in Iraq — KC Build 2025*
