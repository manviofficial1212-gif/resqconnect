# 🚨 ResQConnect Ops — Zero-Latency Disaster Relief & Dispatch Grid

> **Synchronized disaster response platform connecting relief coordinators, field rescue squads, and emergency supply hubs during acute crisis events.**

---

## 📌 Overview

During natural disasters (such as floods, cyclones, and urban crises), relief efforts suffer from severe communication bottlenecks: duplicate deliveries, untracked distress calls, and lack of real-time visibility on ground resources.

**ResQConnect** solves this with an interactive, low-latency command grid:
- **Civilian SOS Intake:** Instant mobile emergency request system with auto-calibrated GPS capture.
- **Interactive Operations Map:** Real-time geospatial tracking of priority crisis zones with color-coded severity markers.
- **Volunteer Kanban Hub:** A 4-stage allocation board ensuring single-claim dispatch locking to eliminate duplicate runs.

---

## ⚡ Key Features

* **🛰️ Live Incident Mapping:** Fullscreen interactive GIS map with clustering, urgency filtering (Critical / High / Moderate), and instant sector status.
* **📍 Fast SOS Broadcast:** Lightweight intake console capturing required aid categories (Medical, Rations, Rescue, Water) and headcount.
* **🔒 Zero-Collision Dispatch:** Real-time task-locking workflow transitioning tasks from `Open Demands` $\rightarrow$ `Claimed & En Route` $\rightarrow$ `Delivered` $\rightarrow$ `Resolved`.
* **📱 Ultra-Responsive Tactical Dark UI:** Designed using Tailwind CSS and Zinc dark tokens for high-contrast visibility in low-light emergency environments.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 / TypeScript / Vite |
| **Styling & Icons** | Tailwind CSS / Lucide React / Shadcn UI |
| **Mapping & GIS** | Leaflet / React-Leaflet |
| **State & Routing** | React Router DOM / Client-side State Stores |
| **Package Manager** | Bun / npm |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+) or Bun installed
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/manviofficial1212-gif/resqconnect.git](https://github.com/manviofficial1212-gif/resqconnect.git)
   cd resqconnect

Install dependencies:

Bash
npm install
# or
bun install
Start the local development server:

Bash
npm run dev
# or
bun dev
Open in browser:
Navigate to http://localhost:5173 to explore the live console.

## 🗺️ Application Routes
/ — Command Landing: Live system metrics, node statistics, and primary emergency dispatch triggers.

/map — Tactical GIS Map: Fullscreen Leaflet map displaying active incident clusters and claim drawers.

/sos — Emergency Intake: Mobile-optimized civilian SOS form with instant GPS locking.

/dispatch — Volunteer Hub: 4-column operations Kanban board for resource allocation.

## 📄 License
Distributed under the MIT License. See LICENSE for more information.