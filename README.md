# ResQConnect Ops

Design and build a clean, high-utility landing page for "ResQConnect" — a real-time emergency disaster response & volunteer dispatch platform.

Avoid generic AI aesthetics: DO NOT use purple/pink gradients, floating 3D glass blobs, or cheesy marketing copy. Make it look like a mission-critical, human-engineered command operations tool (inspired by Linear, Vercel, and Palantir dashboards).

Page Structure & Components:

1. Top Navigation Bar:

   - Left: Minimalist logo with an alert radar icon + "ResQConnect" with a live status badge: "● LIVE DISPATCH SYSTEM ACTIVE" (green pulsing dot).

   - Center: Quick links: "Live SOS Map", "Volunteer Hub", "Inventory Tracker", "Protocol Docs".

   - Right: "Report Emergency (SOS)" high-contrast red button + "Volunteer Portal" secondary button.

2. Live Crisis Ticker / Status Bar:

   - A slim, dark ticker strip right under the navbar displaying real-time situational stats:

     • "Active Flood Alert: Sector 4 & 9"

     • "Open Demands: 24"

     • "Active Responders: 87"

     • "Avg Response Latency: 12.4 mins"

3. Hero Section (Operational Command Center style):

   - Tagline: A small mono badge: [ CRISIS LOGISTICS & RELIEF DISPATCH ]

   - Main Heading: "Zero-latency coordination for boots on the ground."

   - Subheading: "A synchronized dispatch platform connecting disaster response coordinators, field volunteers, and emergency supply hubs during acute crisis events."

   - Primary CTAs:

     • Large Red Button: "Request Emergency Supplies (SOS)" (links to /sos)

     - Ghost Bordered Button: "Open Live Operations Map" (links to /map)

   - Interactive Hero Preview: An embedded mockup of the Live Dispatch Board showing realistic incoming SOS cards with tags like [CRITICAL: Clean Water | Sector 4], urgency badges, distance markers (e.g., "1.2 km away"), and real-time "Claim Task" buttons.

4. 4-Column Live Metric Grid:

   - Metric 1: "1,420+" Meals & Rations Dispatched

   - Metric 2: "98.4%" Collision-Free Task Claims

   - Metric 3: "< 15s" PWA Offline Sync Time

   - Metric 4: "100%" Open-Source & Community Driven

5. Core Capabilities (3-Card Bento Grid):

   - Card 1: "Dynamic Urgency Engine" — Visual priority scoring based on criticality (Medical > Water > Food) and volunteer GPS proximity.

   - Card 2: "Zero-Collision Task Locking" — Atomic WebSocket locks preventing duplicate volunteer runs to the same relief drop.

   - Card 3: "Offline-First Field Resilience" — Service workers and IndexedDB caching ensure field workers never lose map routes in network dead zones.

6. Modern Footer:

   - Built for Omnikon National Hackathon 2026. Clean mono links to GitHub repository, disaster hotlines, and system uptime status.

Use Tailwind CSS, Lucide React icons, and dark-mode zinc color tones (#09090b base, #18181b cards, #27272a borders).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/79bf9468-f1a5-42a9-b0ee-793d28f78cd2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
