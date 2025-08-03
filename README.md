# 📄 Resume Match

**Resume Match** is a modern web application that analyzes a candidate’s resume against a job description and provides a match percentage along with detailed suggestions for improvement. It helps job seekers tailor their resumes effectively and increases the chances of getting shortlisted.

## ✨ Features

- 🔐 User authentication (Login/Signup)
- 📤 Upload resume (PDF) and job description (text)
- 🤖 AI-powered match analysis
- 📊 Displays match percentage and matched/unmatched keywords
- 🧠 Smart suggestions to improve your resume
- 💅 Modern and responsive UI (Tailwind + ShadCN)
- 📨 Gmail OAuth integration for parsing job descriptions directly from emails (Coming soon)
- 🔄 Real-time feedback on uploads and results

---

## 🚀 Live Demo

🌐 **Hosted Link:** [https://resume-match.vercel.app](https://resume-match-five.vercel.app/)

---

## 🖼️ Landing Page Preview

![Landing Page Screenshot](https://i.ibb.co/dsVWYNXm/Screenshot-2025-07-07-132539.png)

---

## 🛠️ Tech Stack

| Frontend | Backend | AI & Parsing | Database |
|----------|---------|--------------|----------|
| React + TypeScript | Next.js (App Router) | Google Generative AI (Gemini) | PostgreSQL |
| Tailwind CSS + ShadCN | API Routes | `pdf2json` for PDF parsing | Prisma ORM |

---

## 📁 Folder Structure (Important)

```bash
.
├── app/
│   ├── analyze/             # Analyze page (upload UI)
│   ├── analysis/            # Result page (match output)
│   └── api/                 # API routes
│       └── analyze/route.ts # Resume + JD analysis logic
├── components/              # Reusable UI components
├── lib/                     # Utilities (e.g., PDF parsing, Gmail integration)
├── prisma/                  # DB schema and seed files
├── public/                  # Static assets
├── styles/                  # Global styles
└── README.md
