const express = require("express");
const cors    = require("cors");
const app     = express();

app.use(cors());
app.use(express.json());

// Zero Trust — log every request
const auditLog = [];
app.use((req, res, next) => {
  auditLog.push({ ts: new Date().toISOString(), method: req.method, path: req.path, ip: req.ip });
  console.log(`[AUDIT] ${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

let incidents = [
  { id:"INC-001", attackType:"digital",  location:"Fitzroy Substation",     type:"SCADA Intrusion Attempt", severity:"Critical", status:"Resolved", reportedBy:"Alex Kim",    reportedAt:"2026-03-28T07:14:00", chain:"Junior → Chief → Director", response:"Isolated segment, rotated credentials.", aiSummary:null },
  { id:"INC-002", attackType:"physical", location:"Docklands Control Node", type:"Suspicious Vehicle",      severity:"High",     status:"Resolved", reportedBy:"Noah Patel",  reportedAt:"2026-03-28T08:45:00", chain:"Security → Chief → Director", response:"Vehicle flagged, ASIO notified.", aiSummary:null },
  { id:"INC-003", attackType:"digital",  location:"Southbank Grid Relay",   type:"Communication Loss",      severity:"Medium",   status:"Resolved", reportedBy:"Emma Sullivan",reportedAt:"2026-03-28T09:30:00", chain:"Junior → Chief → Director", response:"Patched relay firmware.", aiSummary:null },
];

let lockdowns = [
  { id:"LKD-001", initiatedBy:"Chief Eng. Victor Osei", zone:"CBD Distribution Hub", reason:"Active SCADA intrusion. Recommend isolation.", status:"Pending", requestedAt:"2026-03-28T11:20:00" },
];

let shifts = [
  { id:"SHF-001", staffId:"SEC-001", staffName:"Jordan Lee",  zone:"Fitzroy",   date:"2026-03-28", time:"06:00–14:00", assigned:true },
  { id:"SHF-002", staffId:"SEC-002", staffName:"Priya Nair",  zone:"Docklands", date:"2026-03-28", time:"14:00–22:00", assigned:true },
  { id:"SHF-003", staffId:"SEC-003", staffName:"Marcus Webb", zone:"CBD",       date:"2026-03-29", time:"22:00–06:00", assigned:false },
];

// Incidents
app.get("/api/incidents",      (req, res) => res.json(incidents));
app.post("/api/incidents",     (req, res) => { const n={id:`INC-${String(incidents.length+1).padStart(3,"0")}`,...req.body,reportedAt:new Date().toISOString()}; incidents.unshift(n); res.json({success:true,incident:n}); });
app.patch("/api/incidents/:id",(req, res) => { const i=incidents.find(x=>x.id===req.params.id); if(!i)return res.status(404).json({error:"Not found"}); Object.assign(i,req.body); res.json({success:true,incident:i}); });

// Lockdowns
app.get("/api/lockdowns",       (req, res) => res.json(lockdowns));
app.post("/api/lockdowns",      (req, res) => { const n={id:`LKD-${String(lockdowns.length+1).padStart(3,"0")}`,...req.body,status:"Pending",requestedAt:new Date().toISOString()}; lockdowns.unshift(n); res.json({success:true,request:n}); });
app.patch("/api/lockdowns/:id", (req, res) => { const r=lockdowns.find(x=>x.id===req.params.id); if(!r)return res.status(404).json({error:"Not found"}); Object.assign(r,req.body); res.json({success:true,request:r}); });

// Shifts
app.get("/api/shifts",          (req, res) => res.json(shifts));
app.post("/api/shifts",         (req, res) => { const n={id:`SHF-${String(shifts.length+1).padStart(3,"0")}`,...req.body,assigned:true}; shifts.push(n); res.json({success:true,shift:n}); });

// Audit log
app.get("/api/audit", (req, res) => res.json(auditLog.slice(-100)));

app.get("/", (req, res) => res.json({ status:"GridShield API running", time:new Date().toISOString() }));
app.listen(5000, () => console.log("✅ GridShield server running on http://localhost:5000"));
