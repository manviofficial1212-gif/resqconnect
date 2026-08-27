# 🚨 ResQConnect

> **Real-Time Disaster Dispatch & AI-Assisted Ground Coordination Engine**

[![Production Status](https://img.shields.io/badge/Deployment-Live%20on%20Vercel-success?style=flat&logo=vercel)](https://resqconnect-delta.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20|%20TypeScript%20|%20Tailwind-blue)](https://react.dev/)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini%202.5%20Flash-orange?logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

An intelligent emergency management platform engineered to convert messy, unstructured civilian panic communications into prioritized, conflict-free field rescue missions in real time.

---

## 🌐 Live Deployments & Links

* **Live Web App:** [https://resqconnect-delta.vercel.app](https://resqconnect-delta.vercel.app)
* **Distress Intake Console:** [https://resqconnect-delta.vercel.app/sos](https://resqconnect-delta.vercel.app/sos)
* **Volunteer Dispatch Hub:** [https://resqconnect-delta.vercel.app/dispatch](https://resqconnect-delta.vercel.app/dispatch)
* **Live Operations Map:** [https://resqconnect-delta.vercel.app/map](https://resqconnect-delta.vercel.app/map)
* **GitHub Repository:** [https://github.com/manviofficial1212-gif/resqconnect](https://github.com/manviofficial1212-gif/resqconnect)

---

## ⚡ Key Features

* 📍 **Mobile GPS Distress Intake (`/sos`)**: One-tap browser coordinate locking, affected headcount counter, and structured relief category tagging (Medical, Water, Food Rations, Boat Evac, Power).
* 🧠 **Gemini AI Auto-Triage**: Integrates Google's `gemini-2.5-flash` model to analyze chaotic natural-language descriptions into numeric priority scores (1–100), needed supply checklists, and concise operator briefs.
* 📋 **4-Stage Volunteer Kanban (`/dispatch`)**: Strict stage-based task advancement to eliminate squad collision:
  1. **Open Demands** (Unassigned live SOS incoming calls)
  2. **Claimed & En Route** (Assigned & locked to volunteer units)
  3. **Delivered / Pending Proof** (Awaiting drop verification)
  4. **Verified & Resolved** (Completed missions)
* 🗺️ **Live Geospatial Sector Map (`/map`)**: Real-time visual overview of danger zones and supply hubs.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, TanStack Router |
| **Styling & Icons** | Tailwind CSS, Lucide React Icons |
| **AI Intelligence** | Google Gemini 2.5 Flash API (Structured JSON Schema generation) |
| **Geospatial & Hardware** | HTML5 Geolocation API |
| **Hosting & Edge Delivery** | Vercel Global Edge Network |

---

## 🚀 Local Development Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **bun**

### 1. Clone the Repository
```bash
git clone [https://github.com/manviofficial1212-gif/resqconnect.git](https://github.com/manviofficial1212-gif/resqconnect.git)
cd resqconnect/resqconnect-ops

### 2. Install Dependencies
''' Bash
npm install

### Set Up Environment Variables
Create a .env file in the project root:

Code snippet
VITE_GEMINI_API_KEY=AIzaSy...AQ.Ab8RN6I9M3-ksCc-KJ8MKb2RKsWM-0HtvOoFrrtmbg4-s9Yl-A
### 4. Start the Dev Server
Bash
npm run dev
Open http://localhost:8080 in your browser.

## 🗺️ Strategic Roadmap
[x] Phase 1: Core responsive client, Gemini AI SOS Triage, 4-Stage Kanban board, and Vercel edge deployment.

[ ] Phase 2: Supabase / PostgreSQL real-time database sync across multi-client volunteer devices.

[ ] Phase 3: Multilingual Voice-to-SOS agent for vernacular regional dialects.

[ ] Phase 4: Mesh-network and SMS gateway fallback protocols for cellular blackout zones.

## 📄 License
This project is open-source under the MIT License.