# Aesthete — Ethereal Curator Portfolio & Journal

A high-aesthetic, minimalist personal literature gallery and blog system designed for the modern curator. Built with structural HTML, raw CSS, and Tailwind CSS configuration tokens to create a premium visual experience.

---

## 🎨 Visual Identity
- **Primary Color:** `#181c19` (Charcoal Obsidian)
- **Background Color:** `#fbf9f4` (Warm Natural Alabaster)
- **Accent Sage:** `#536257` (Curator Green)
- **Typography:** Serif `Libre Caslon Text` (display headings) & Sans-Serif `Inter` (body copy & metadata labels).

---

## 📂 Project Architecture
This repository contains the completely integrated, zero-backend flat static portfolio. All links are relative and ready for direct server-less serving:

- `index.html` — Curated Homepage and main entry hub.
- `essays.html` — Creative index of journals & essays.
- `essay-detail.html` — Immersive digital reading layout.
- `gallery.html` — Visual curation grid.
- `about.html` — Curator profile timeline & interactive Guestbook.
- `explore.html` — Chronological timeline with instant live filtering.
- `admin.html` — SPA-style administrator console (Dashboard + Essays table + Identity profile configuration).
- `editor.html` — Dual-workspace studio (Markdown text writer + Drag & Drop artwork uploader).

---

## 🚀 Cloudflare Pages Free Deployment
Since this site is purely static, it is natively compatible with **Cloudflare Pages**:
1. Connect this repository to your Cloudflare Dashboard.
2. In Build configuration, select framework preset **`None`**.
3. Leave both **Build Command** and **Output Directory** empty (uses repository root `.`).
4. Click **Deploy** to go live!
