# ⚡ GridShield - Zero Trust Critical Infrastructure Operations Platform

> **"Trust No One. Verify Everything."**
> Built at a 24-hour hackathon. Theme: Securing Critical Infrastructure.

---

## 🎥 Project Resources

| Resource | Link |
|---|---|
| 📊 Presentation (PPT) | _https://docs.google.com/presentation/d/1mExU0XVjUSvXtONfdI9J3Mea4zBpPkOn/edit?usp=sharing&ouid=106407146728459704804&rtpof=true&sd=true_ |
| 🎬 Live Demo Video | _https://drive.google.com/file/d/1H6PNtZYm48bOmmXZMJ6zPtZDMCnW1T7H/view?usp=sharing_ |
| 🌐 GitHub Repository | _https://github.com/marvelonps4/Hackathon/_ |

---

## 📋 Project Summary

GridShield is a role-based Zero Trust security operations platform built for Victoria's power grid. It simulates real-world critical infrastructure protection across 100 grid locations, 20 zones, and 272 staff - modelled on how actual grid operators, security teams, and engineers coordinate during cyberattacks and physical security incidents.

The platform enforces strict role separation across six access levels: Security Officer, Administrator, Junior Engineer, Senior Engineer, Chief Engineer, and Executive Director. Every action is logged. No role can override another. No single person holds all authority.

Two types of attacks are simulated - physical incidents (reported by Security Officers) and digital/cyber incidents (reported by Junior Engineers) - each triggering a pre-defined escalation chain through the hierarchy to the Chief Engineer and Executive Director. Pre-determined attack scenarios fire at timed intervals, complete with cinematic overlays, threat assessments, response steps, and full post-incident analysis reports.

The project integrates live Victorian grid data via the AEMO API, a Node.js/Express REST backend with a full audit log, and a React/Vite frontend with strictly separated dashboards per role. Built with the MERN-adjacent stack (React, Node, Express, RESTful API) in under 24 hours by a team of four.

**Team:** Pranav · Raj · Sai · Vedant | **Event:** Hackathon 2026 | **Sector:** Power Grid Security

---

## 👥 Team

| Name | Role in Project | Role in Demo Video|
|---|---|---|
| **Pranav** | Frontend, Integration | Junior Engineer |
| **Raj** | Backend, API | The Hacker |
| **Ajithesh Sai** | Planning, Presentation | Narrator |
| **Vedant** | Architecture, Logic | Chief Engineer |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| API Style | RESTful API |
| External Data | AEMO API (live Victorian grid data) |
| AI Integration | OpenRouter API (LLM-powered threat assessment) |
| Styling | Inline CSS with design system (no external UI library) |
| Auth | Role-based credential system (Zero Trust model) |

---

## 📁 Folder Structure

```
GridShield/
│
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx             # Root component - handles login state and attack scheduler
│   │   ├── Login.jsx           # Email + password login screen with demo credentials
│   │   ├── Dashboard.jsx       # All 6 role dashboards, tab routing, attack overlay
│   │   └── constants.js        # All data: staff, locations, attack scenarios, analysis reports, theme
│   ├── public/
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   └── server.js               # REST API: incidents, lockdowns, shifts, audit log
│
└── README.md
```

### What each file does

**`client/src/App.jsx`**
The root component. Manages global state (incidents, shifts, lockdowns), handles login/logout, and runs the attack scheduler that fires pre-determined attacks at timed intervals after login.

**`client/src/Login.jsx`**
The login screen. Accepts email + password, validates against the demo accounts, and passes the authenticated account object to the app. Includes a collapsible demo credentials panel for easy testing.

**`client/src/Dashboard.jsx`**
The entire frontend application lives here. Contains the sidebar, top bar, all 6 role-specific dashboards, the cinematic attack overlay, and every tab component. Tab routing is strictly role-gated - no role can access another role's tabs.

**`client/src/constants.js`**
The single source of truth for all data: 100 grid locations, 272 staff members, 6 demo accounts with credentials, 5 pre-determined attack scenarios (with full analysis reports), colour theme, role definitions, and tab configurations.

**`server/server.js`**
Express REST API server. Manages incidents, lockdowns, and shifts in memory. Every request is logged to a Zero Trust audit trail accessible at `/api/audit`. Endpoints: `GET/POST/PATCH /api/incidents`, `GET/POST/PATCH /api/lockdowns`, `GET/POST /api/shifts`.

---

## 🔐 Demo Credentials

Click **"Show Demo Credentials"** on the login screen, or use these directly:

| Role | Email | Password |
|---|---|---|
| 🛡️ Security Officer | `jordan.lee@gridshield.vic.gov.au` | `GS_JL_SEC-001#2026` |
| 🗂️ Administrator | `sandra.okafor@gridshield.vic.gov.au` | `GS_SO_ADM-001#2026` |
| 👷 Junior Engineer | `alex.kim@gridshield.vic.gov.au` | `GS_AK_JNR-001#2026` |
| 👨‍💼 Senior Engineer | `c.whitfield@gridshield.vic.gov.au` | `GS_CW_SNR-001#2026` |
| 👨‍🔧 Chief Engineer | `v.osei@gridshield.vic.gov.au` | `GS_VO_CHF-001#2026` |
| 👔 Executive Director | `m.hollingsworth@gridshield.vic.gov.au` | `GS_MH_DIR-001#2026` |

---

## 🚀 How to Run

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

Check your versions:
```bash
node -v
npm -v
```

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/marvelonps4/Hackathon/
cd gridshield
```

---

### Step 2 — Start the backend server

Open a terminal and run:

```bash
cd server
npm init -y
npm install express cors
node server.js
```

You should see:
```
✅ GridShield server running on http://localhost:5000
```

Leave this terminal running.

---

### Step 3 — Start the frontend

Open a **second terminal** (don't close the first) and run:

```bash
cd client
npm install
npm run dev
```

You should see:
```
VITE ready
➜  Local:   http://localhost:5173/
```

---

### Step 4 — Open in browser

Go to:
```
http://localhost:5173
```

Log in using any of the demo credentials above.

---

### Step 5 — (Optional) API Key Setup

GridShield includes an AI-powered threat assessment feature. To enable it, open `client/src/constants.js` and replace the placeholder with a real API key:

```js
export const OPENROUTER_API_KEY = "your-key-here";
```

Get a free key at [openrouter.ai](https://openrouter.ai) — no credit card required.

If no key is provided, the app runs fully with only threat assessments and incident reports. Nothing breaks.

---

## ⚡ Features

### 🔐 Zero Trust Architecture
- Every user is verified on login with email + password
- Role-based access control — 6 strictly separated dashboards
- No role can access another role's data or actions
- All API requests are logged to an immutable audit trail (`/api/audit`)
- Sensitive actions (lockdowns) require multi-level approval

### 🚨 Attack Simulation
- 5 pre-determined attack scenarios fire at timed intervals (every 2 minutes)
- Two attack types: **Physical** (perimeter breach, suspicious vehicle, badge misuse) and **Digital** (SCADA intrusion, ransomware, false data injection)
- Cinematic overlay: screen flickers → red alert → full threat detail panel
- Each attack shows response steps, escalation chain, and threat assessment

### 📊 Role-Based Dashboards

| Role | Key Capabilities |
|---|---|
| Security Officer | Report physical incidents, view own shifts, status board |
| Administrator | Manage staff, assign shifts, view grid summary |
| Junior Engineer | Report digital incidents, view threat reports, VIC grid data |
| Senior Engineer | Full grid data + graphs, vulnerability assessment, AI analysis |
| Chief Engineer | Attack alerts, acknowledge incidents, initiate lockdown, incident reports |
| Executive Director | Executive overview, approve/reject lockdowns, cost & budget, incident reports |

### 📄 Incident Reports
- Every pre-determined attack has a full post-incident analysis
- Reports cover: what happened, response evaluation, what went well, what could improve, Zero Trust chain assessment, and a rating out of 10
- Accessible to Chief Engineer and Executive Director

### ⚡ Live Grid Data
- Real-time Victorian grid stats pulled from the AEMO API
- VIC total demand (MW), spot price ($/MWh), net interchange
- Auto-fallback to mock values if AEMO is unreachable

### 🗓️ Shift Management
- Admins can assign security staff to grid zone patrols
- Security Officers see their confirmed shifts
- Shift data persisted in the backend

---

## 🌐 API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/incidents` | Get all incidents |
| POST | `/api/incidents` | Create new incident |
| PATCH | `/api/incidents/:id` | Update incident status |
| GET | `/api/lockdowns` | Get all lockdown requests |
| POST | `/api/lockdowns` | Submit lockdown request |
| PATCH | `/api/lockdowns/:id` | Approve / reject lockdown |
| GET | `/api/shifts` | Get all shifts |
| POST | `/api/shifts` | Create new shift assignment |
| GET | `/api/audit` | View Zero Trust audit log (last 100 entries) |

---

## 🗺️ Grid Coverage

- **100 locations** across Victoria - from Fitzroy to Bairnsdale
- **20 zones** - each zone covers 5 locations
- **272 staff** - 10 security officers per zone, 2 junior engineers, 1 senior engineer, 1 chief per 2 zones, 2 executive directors total
- Real Melbourne suburb names used for authenticity

---

## 🔒 Zero Trust Escalation Chains

```
Physical Attack:
Security Officer (detects) → Chief Engineer (notified) → Executive Director (on standby)

Digital Attack:
Junior Engineer (detects) → Chief Engineer (notified) → Executive Director (on standby)

Lockdown Request:
Chief Engineer (initiates) → Executive Director (approves or rejects)
```

---

## 📌 Known Limitations

- Data is stored in-memory on the backend - restarting the server resets all incidents and shifts (by design for a hackathon demo)
- Attack timers reset on logout - re-login to replay the attack sequence
- The AI threat assessment feature requires an OpenRouter API key; without it, pre-written assessments are shown instead

---

## 📜 Licence

Built for educational and hackathon demonstration purposes.
MIT Licence - free to use, modify, and build upon.

---

*GridShield - Hackathon 2026 · Team: Pranav, Raj, Sai Ajithest, Vedant*
