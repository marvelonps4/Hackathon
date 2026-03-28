export const COLORS = {
  bg: "#060d1a", surface: "#0a1428", card: "#0e1c38", border: "#1a2d50",
  accent: "#00e5ff", accentGlow: "rgba(0,229,255,0.12)",
  critical: "#ff2d55", high: "#ff6b00", medium: "#ffcc00", low: "#00e676",
  muted: "#3a5070", text: "#ddeeff", subtext: "#5a7a9a",
};

// ── DEMO ACCOUNTS (email + password for each role) ────────────────────────────
export const DEMO_ACCOUNTS = [
  { id:"SEC-001", name:"Jordan Lee",                        role:"security",  email:"jordan.lee@gridshield.vic.gov.au",          password:"GS_JL_SEC-001#2026", location:"Fitzroy Substation", zone:"Zone 1", shift:"06:00–14:00" },
  { id:"ADM-001", name:"Sandra Okafor",                     role:"admin",     email:"sandra.okafor@gridshield.vic.gov.au",        password:"GS_SO_ADM-001#2026", zone:"All Zones" },
  { id:"JNR-001", name:"Alex Kim",                          role:"junior",    email:"alex.kim@gridshield.vic.gov.au",             password:"GS_AK_JNR-001#2026", zone:"Zone 1" },
  { id:"SNR-001", name:"Dr. Claire Whitfield",              role:"senior",    email:"c.whitfield@gridshield.vic.gov.au",          password:"GS_CW_SNR-001#2026", zone:"Zone 1" },
  { id:"CHF-001", name:"Chief Eng. Victor Osei",            role:"chief",     email:"v.osei@gridshield.vic.gov.au",               password:"GS_VO_CHF-001#2026", zones:"Zones 1–2" },
  { id:"DIR-001", name:"Exec. Dir. Margaret Hollingsworth", role:"director",  email:"m.hollingsworth@gridshield.vic.gov.au",      password:"GS_MH_DIR-001#2026", zones:"Zones 1–10" },
];

export const ROLE_LABELS = {
  security:"Security Officer", admin:"Administrator", junior:"Junior Engineer",
  senior:"Senior Engineer", chief:"Chief Engineer", director:"Executive Director",
};
export const ROLE_ICONS = {
  security:"🛡️", admin:"🗂️", junior:"👷", senior:"👨‍💼", chief:"👨‍🔧", director:"👔",
};

// Strictly separated tabs per role — NO overlap
export const ROLE_TABS = {
  security: [
    { id:"my_shifts",       label:"My Shifts",          icon:"🕐" },
    { id:"report_physical", label:"Report Physical",    icon:"🚨" },
    { id:"status_board",    label:"Status Board",       icon:"📋" },
  ],
  admin: [
    { id:"staff_overview",  label:"Staff Overview",     icon:"👥" },
    { id:"assign_shifts",   label:"Assign Shifts",      icon:"📅" },
    { id:"grid_summary",    label:"Grid Summary",       icon:"⚡" },
  ],
  junior: [
    { id:"vic_grid",        label:"VIC Grid Data",      icon:"⚡" },
    { id:"report_digital",  label:"Report Digital",     icon:"💻" },
    { id:"incident_log",    label:"Incident Log",       icon:"📋" },
    { id:"threat_reports",  label:"Threat Reports",     icon:"🔍" },
  ],
  senior: [
    { id:"full_grid",       label:"Full Grid Data",     icon:"⚡" },
    { id:"graphs",          label:"Live Graphs",        icon:"📊" },
    { id:"ai_analysis",     label:"AI Analysis",        icon:"🤖" },
    { id:"vuln_report",     label:"Vulnerability",      icon:"🔐" },
    { id:"incident_log",    label:"Incident Log",       icon:"📋" },
  ],
  chief: [
    { id:"attack_alerts",   label:"Attack Alerts",      icon:"🚨" },
    { id:"all_data",        label:"All Data",           icon:"⚡" },
    { id:"lockdown",        label:"Initiate Lockdown",  icon:"🔐" },
    { id:"incident_reports",label:"Incident Reports",   icon:"📄" },
    { id:"incident_log",    label:"All Incidents",      icon:"📋" },
  ],
  director: [
    { id:"exec_overview",      label:"Executive Overview", icon:"📊" },
    { id:"lockdown_approvals", label:"Lockdown Approvals", icon:"🔐" },
    { id:"cost_budget",        label:"Cost & Budget",      icon:"💰" },
    { id:"incident_reports",   label:"Incident Reports",   icon:"📄" },
    { id:"incident_log",       label:"All Incidents",      icon:"📋" },
  ],
};

export const LOCATIONS = [
  "Fitzroy Substation","Carlton Grid Node","Brunswick Power Relay","Northcote Distribution Hub","Coburg Transmission Line",
  "Docklands Control Node","Southbank Grid Relay","CBD Distribution Hub","Port Melbourne Switch Yard","St Kilda Energy Centre",
  "Richmond Transmission Line","Hawthorn Substation","Camberwell Power Node","Box Hill Grid Relay","Ringwood Distribution Hub",
  "Footscray Control Node","Sunshine Energy Centre","Werribee Substation","Hoppers Crossing Relay","Laverton Switch Yard",
  "Dandenong Substation","Springvale Grid Node","Noble Park Power Relay","Keysborough Distribution Hub","Cheltenham Transmission Line",
  "Frankston Energy Centre","Mornington Substation","Seaford Grid Relay","Carrum Downs Power Node","Cranbourne Distribution Hub",
  "Epping Control Node","Thomastown Substation","Reservoir Grid Relay","Preston Power Node","Bundoora Energy Centre",
  "Broadmeadows Substation","Craigieburn Grid Node","Roxburgh Park Relay","Mickleham Distribution Hub","Beveridge Switch Yard",
  "Werribee South Substation","Point Cook Grid Node","Altona Power Relay","Williamstown Energy Centre","Newport Substation",
  "Heidelberg Control Node","Ivanhoe Substation","Eltham Grid Relay","Diamond Creek Power Node","Greensborough Distribution Hub",
  "Moorabbin Substation","Bentleigh Grid Node","Oakleigh Power Relay","Clayton Distribution Hub","Monash Energy Centre",
  "Glen Waverley Substation","Vermont Grid Relay","Wantirna Power Node","Bayswater Distribution Hub","Croydon Energy Centre",
  "Melton Substation","Bacchus Marsh Grid Node","Ballan Power Relay","Ballarat Road Distribution Hub","Rockbank Energy Centre",
  "Pakenham Substation","Officer Grid Node","Berwick Power Relay","Narre Warren Distribution Hub","Hallam Energy Centre",
  "Lilydale Substation","Mooroolbark Grid Relay","Chirnside Park Power Node","Yarra Glen Distribution Hub","Healesville Energy Centre",
  "Sunbury Substation","Diggers Rest Grid Node","Gisborne Power Relay","Romsey Distribution Hub","Woodend Energy Centre",
  "Geelong North Substation","Geelong CBD Grid Node","Corio Power Relay","Norlane Distribution Hub","Lara Energy Centre",
  "Ballarat East Substation","Ballarat Central Grid Node","Wendouree Power Relay","Sebastopol Distribution Hub","Delacombe Energy Centre",
  "Bendigo North Substation","Bendigo Central Grid Node","Kangaroo Flat Power Relay","Long Gully Distribution Hub","Eaglehawk Energy Centre",
  "Traralgon Substation","Morwell Grid Node","Moe Power Relay","Sale Distribution Hub","Bairnsdale Energy Centre",
];

export const PHYSICAL_ATTACK_TYPES = [
  "Armed Perimeter Breach","Suspicious Vehicle — Restricted Zone","Insider Threat — Badge Misuse",
  "Physical Sabotage Attempt","Drone Activity — No-Fly Zone","Theft of Equipment",
  "Forced Entry Attempt","Vandalism of Control Equipment","Unauthorised Personnel","Arson Attempt",
];
export const DIGITAL_ATTACK_TYPES = [
  "SCADA Intrusion Attempt","Ransomware Deployment","False Data Injection","Credential Theft — OT Network",
  "DDoS on Control Systems","Firmware Tampering","Man-in-the-Middle — ICS Protocol",
  "Zero-Day Exploit Attempt","Malware Propagation","SQL Injection on HMI Portal",
  "Supply Chain Compromise","C2 Beacon Detected",
];

// Pre-determined attack scenarios — fires at set times after login (ms)
// Attack 1: 2 min, Attack 2: 4 min, Attack 3: 6 min, Attack 4: 8 min, Attack 5: 10 min
// Physical: Security reports → Chief + Director
// Digital:  Junior Eng reports → Chief + Director
export const PRESET_ATTACKS = [
  {
    id:"ATK-001", type:"physical", title:"Armed Perimeter Breach",
    location:"Fitzroy Substation", severity:"Critical",
    description:"Two unidentified individuals cut through perimeter fencing on the eastern boundary. CCTV confirms approach toward transformer bay 3. Security team deployed, area cordoned.",
    detectedBy:"Jordan Lee (SEC-001)", scheduledAt:12000,
    responseSteps:["Secured perimeter, called Victoria Police","CCTV footage preserved","Transformer bay locked down","Chief Engineer notified"],
    outcome:"Intruders fled before reaching critical equipment. Police report filed.",
    analysis:{
      whatHappened:"At 14:22, Security Officer Jordan Lee detected two individuals who had cut through the eastern perimeter fence at Fitzroy Substation and were advancing toward transformer bay 3. Victoria Police were immediately called and the area was cordoned off.",
      responseEvaluation:"The response was GOOD. Jordan Lee followed correct protocol — perimeter was secured within 4 minutes, CCTV evidence was preserved, and the chain of command was notified promptly. The physical barrier held long enough for response.",
      wentWell:"Fast detection via CCTV monitoring. Correct immediate escalation to Chief Engineer. Police notified within 3 minutes. Critical equipment was never reached.",
      couldImprove:"Motion-triggered perimeter alerts should have flagged the breach before visual confirmation. Recommend installing sensor wire along eastern fence line. Response time from detection to full lockdown was 7 minutes — target should be under 4.",
      zeroTrustAssessment:"Escalation chain worked correctly: Security → Chief Engineer → Executive Director. All actions were logged. No trust was assumed at any stage.",
      rating:"8/10 — Well handled. Minor gap in automated perimeter detection.",
    },
  },
  {
    id:"ATK-002", type:"digital", title:"SCADA Intrusion Attempt",
    location:"CBD Distribution Hub", severity:"Critical",
    description:"Anomalous traffic on SCADA OT segment. Attacker performing lateral movement from IT network via unpatched HMI portal. Credential stuffing detected on 3 operator accounts.",
    detectedBy:"Alex Kim (JNR-001) — IDS Alert", scheduledAt:240000,
    responseSteps:["Isolated affected network segment","Blocked source IP range","Forced password reset on all OT accounts","Escalated to Chief Engineer"],
    outcome:"Attack contained. No operational disruption. Patch deployed to HMI portal.",
    analysis:{
      whatHappened:"IDS alerts at 15:08 flagged anomalous lateral movement from the corporate IT network into the OT/SCADA segment at CBD Distribution Hub. Attacker exploited an unpatched HMI portal vulnerability and attempted credential stuffing on 3 operator accounts.",
      responseEvaluation:"The response was ADEQUATE but had gaps. Junior Engineer Alex Kim correctly identified and escalated the threat. However, the unpatched HMI portal should not have been reachable from the IT network — network segmentation had failed silently.",
      wentWell:"IDS detection worked correctly. Immediate network segment isolation prevented full compromise. Password resets were enforced across all OT accounts within 12 minutes.",
      couldImprove:"IT/OT network segmentation must be verified monthly — this gap went undetected. The HMI portal was 47 days past its patch schedule. Credential stuffing should have triggered automatic account lockout after 3 failed attempts.",
      zeroTrustAssessment:"Chain worked: Junior Engineer → Chief Engineer → Executive Director. However, the system failed the Zero Trust principle of 'assume breach' — the IT/OT boundary was implicitly trusted rather than continuously verified.",
      rating:"6/10 — Contained successfully but the underlying segmentation failure is a serious structural gap.",
    },
  },
  {
    id:"ATK-003", type:"physical", title:"Suspicious Vehicle — Restricted Zone",
    location:"Docklands Control Node", severity:"High",
    description:"Unmarked van in restricted zone for 45 minutes. Occupant photographing control building exterior. Plates traced to shell company. Likely physical reconnaissance.",
    detectedBy:"Noah Patel (SEC-011)", scheduledAt:360000,
    responseSteps:["Vehicle plates logged and reported","Security presence increased at Docklands","ASIO notified","Chief Engineer briefed"],
    outcome:"Vehicle left area. Intelligence report filed. Zone security upgraded.",
    analysis:{
      whatHappened:"Security Officer Noah Patel observed an unmarked van parked in the restricted zone outside Docklands Control Node for 45 minutes. The occupant was photographing the building exterior. Plate check returned a shell company registration — consistent with pre-attack reconnaissance.",
      responseEvaluation:"The response was GOOD for an ambiguous situation. Patel exercised correct judgement in not confronting the individual directly and instead escalating. ASIO notification was appropriate given the shell company link.",
      wentWell:"Surveillance was maintained without alerting the subject. Plate details were captured accurately. ASIO was looped in at the correct threshold. Security presence at Docklands was visibly increased as a deterrent.",
      couldImprove:"45 minutes elapsed before the vehicle was flagged — restricted zone parking should trigger a check at 10 minutes maximum. No drone was deployed to track the vehicle after it left. Physical security cameras at Docklands had a blind spot on the northern approach.",
      zeroTrustAssessment:"Physical Zero Trust applied correctly — the individual was treated as a threat by default. Escalation to Chief Engineer and Executive Director followed the correct hierarchy. Intelligence shared with ASIO adds external verification layer.",
      rating:"7/10 — Correct handling. Response time and camera coverage need improvement.",
    },
  },
  {
    id:"ATK-004", type:"digital", title:"Ransomware on Historian Server",
    location:"Geelong North Substation", severity:"Critical",
    description:"Ransomware binary detected on historian server. File encryption of operational logs has begun. C2 beacon to IP 185.220.101.47 established. Immediate isolation required.",
    detectedBy:"Raj Sharma (JNR-003) — Endpoint Alert", scheduledAt:480000,
    responseSteps:["Server immediately isolated from network","Incident response team activated","Backups verified intact","Geelong zone switched to manual monitoring"],
    outcome:"Ransomware contained to historian server. No grid operations affected. Server reimaged.",
    analysis:{
      whatHappened:"Endpoint detection on the Geelong North historian server flagged ransomware activity at 16:14. File encryption of operational logs had already begun and a C2 beacon was established to an external IP. Junior Engineer Raj Sharma identified the alert and triggered immediate isolation.",
      responseEvaluation:"The response was EXCELLENT. Isolation happened within 2 minutes of detection — before encryption could spread beyond the historian server. Backup integrity was confirmed before any restoration decisions were made.",
      wentWell:"Speed of isolation was the critical success factor. Switching Geelong zone to manual monitoring showed good operational resilience planning. Backups were clean and intact. The C2 IP was immediately reported to ASD (Australian Signals Directorate).",
      couldImprove:"The initial infection vector was traced to a phishing email opened 6 days prior — this dwell time is unacceptable. Email filtering and user awareness training need urgent review. Historian server should not have had direct internet routing.",
      zeroTrustAssessment:"Zero Trust principles were followed post-detection but failed pre-detection. The historian server had broader network trust than it required. Principle of least privilege was not applied to its outbound routing.",
      rating:"9/10 — Exceptional response speed. Pre-existing network trust configuration is the only significant gap.",
    },
  },
  {
    id:"ATK-005", type:"digital", title:"False Data Injection — Voltage Sensors",
    location:"Southbank Grid Relay", severity:"Critical",
    description:"Voltage sensor readings showing values 40% outside normal baseline — suspected false data injection via compromised RTU firmware. Grid operators at risk of incorrect load decisions.",
    detectedBy:"Emma Sullivan (JNR-004) — Anomaly Detection", scheduledAt:600000,
    responseSteps:["Flagged sensors taken offline","Manual readings initiated","RTU firmware rolled back to verified version","Operators briefed on manual protocols"],
    outcome:"Normal sensor readings restored after firmware rollback. No grid destabilisation occurred.",
    analysis:{
      whatHappened:"Anomaly detection flagged impossible voltage readings on Southbank Grid Relay sensors — values 40% outside normal operational baseline at 17:03. Junior Engineer Emma Sullivan identified the pattern as consistent with false data injection via compromised RTU firmware.",
      responseEvaluation:"The response was GOOD but the detection relied too heavily on a single engineer's pattern recognition. The anomaly detection system flagged the data but did not automatically take sensors offline — that required a manual decision.",
      wentWell:"Emma Sullivan's recognition of the injection pattern was sharp and fast. Taking sensors offline before operators could act on bad data prevented potential grid destabilisation. Firmware rollback to a verified version was executed cleanly.",
      couldImprove:"Automatic sensor isolation should trigger when readings exceed 25% of baseline — this should not require human judgement. RTU firmware integrity checks should run daily. The compromise had been present for an estimated 11 hours before detection.",
      zeroTrustAssessment:"The RTU was implicitly trusted as a data source — a Zero Trust failure. All sensor data should be cross-validated against adjacent readings before being presented to operators. The escalation chain to Chief Engineer and Director worked correctly.",
      rating:"7/10 — Good human response. Automated safeguards were insufficient and the 11-hour dwell time is a major concern.",
    },
  },
];

export const STAFF = [
  { id:"SEC-001", name:"Jordan Lee",      role:"security", location:"Fitzroy Substation",         zone:"Zone 1", shift:"06:00–14:00" },
  { id:"SEC-002", name:"Priya Nair",      role:"security", location:"Fitzroy Substation",         zone:"Zone 1", shift:"14:00–22:00" },
  { id:"SEC-003", name:"Marcus Webb",     role:"security", location:"Carlton Grid Node",          zone:"Zone 1", shift:"22:00–06:00" },
  { id:"SEC-004", name:"Aisha Rahman",    role:"security", location:"Carlton Grid Node",          zone:"Zone 1", shift:"06:00–14:00" },
  { id:"SEC-005", name:"Tom Nguyen",      role:"security", location:"Brunswick Power Relay",      zone:"Zone 1", shift:"14:00–22:00" },
  { id:"SEC-006", name:"Chloe Park",      role:"security", location:"Brunswick Power Relay",      zone:"Zone 1", shift:"22:00–06:00" },
  { id:"SEC-007", name:"Devon Mills",     role:"security", location:"Northcote Distribution Hub", zone:"Zone 1", shift:"06:00–14:00" },
  { id:"SEC-008", name:"Farah Hussain",   role:"security", location:"Northcote Distribution Hub", zone:"Zone 1", shift:"14:00–22:00" },
  { id:"SEC-009", name:"Liam O'Brien",    role:"security", location:"Coburg Transmission Line",   zone:"Zone 1", shift:"22:00–06:00" },
  { id:"SEC-010", name:"Mei Chen",        role:"security", location:"Coburg Transmission Line",   zone:"Zone 1", shift:"06:00–14:00" },
  { id:"SEC-011", name:"Noah Patel",      role:"security", location:"Docklands Control Node",     zone:"Zone 2", shift:"06:00–14:00" },
  { id:"SEC-012", name:"Sara Kowalski",   role:"security", location:"Docklands Control Node",     zone:"Zone 2", shift:"14:00–22:00" },
  { id:"SEC-013", name:"Ethan Browne",    role:"security", location:"Southbank Grid Relay",       zone:"Zone 2", shift:"22:00–06:00" },
  { id:"SEC-014", name:"Yasmin Al-Rashid",role:"security", location:"Southbank Grid Relay",       zone:"Zone 2", shift:"06:00–14:00" },
  { id:"SEC-015", name:"Jack Tran",       role:"security", location:"CBD Distribution Hub",       zone:"Zone 2", shift:"14:00–22:00" },
  { id:"SEC-016", name:"Amara Osei",      role:"security", location:"CBD Distribution Hub",       zone:"Zone 2", shift:"22:00–06:00" },
  { id:"ADM-001", name:"Sandra Okafor",   role:"admin",    zone:"All Zones" },
  { id:"JNR-001", name:"Alex Kim",        role:"junior",   zone:"Zone 1" },
  { id:"JNR-002", name:"Mia Torres",      role:"junior",   zone:"Zone 1" },
  { id:"JNR-003", name:"Raj Sharma",      role:"junior",   zone:"Zone 2" },
  { id:"JNR-004", name:"Emma Sullivan",   role:"junior",   zone:"Zone 2" },
  { id:"SNR-001", name:"Dr. Claire Whitfield",     role:"senior", zone:"Zone 1" },
  { id:"SNR-002", name:"Dr. Samuel Adeyemi",       role:"senior", zone:"Zone 2" },
  { id:"CHF-001", name:"Chief Eng. Victor Osei",   role:"chief",  zones:"Zones 1–2" },
  { id:"CHF-002", name:"Chief Eng. Natasha Petrov",role:"chief",  zones:"Zones 3–4" },
  { id:"DIR-001", name:"Exec. Dir. Margaret Hollingsworth", role:"director", zones:"Zones 1–10" },
  { id:"DIR-002", name:"Exec. Dir. Kweku Mensah",  role:"director", zones:"Zones 11–20" },
];

export const INITIAL_INCIDENTS = [
  { id:"INC-001", attackType:"digital",  location:"Fitzroy Substation",     type:"SCADA Intrusion Attempt", severity:"Critical", status:"Resolved", reportedBy:"Alex Kim",    reportedAt:"2026-03-28T07:14:00", chain:"Junior → Chief → Director", response:"Isolated segment, rotated credentials.", aiSummary:null },
  { id:"INC-002", attackType:"physical", location:"Docklands Control Node", type:"Suspicious Vehicle",      severity:"High",     status:"Resolved", reportedBy:"Noah Patel",  reportedAt:"2026-03-28T08:45:00", chain:"Security → Chief → Director", response:"Vehicle flagged, ASIO notified.", aiSummary:null },
  { id:"INC-003", attackType:"digital",  location:"Southbank Grid Relay",   type:"Communication Loss",      severity:"Medium",   status:"Resolved", reportedBy:"Emma Sullivan",reportedAt:"2026-03-28T09:30:00", chain:"Junior → Chief → Director", response:"Patched relay firmware.", aiSummary:null },
];

export const INITIAL_LOCKDOWNS = [
  { id:"LKD-001", initiatedBy:"Chief Eng. Victor Osei", zone:"CBD Distribution Hub",
    reason:"Active SCADA intrusion. Recommend full isolation.", status:"Pending", requestedAt:"2026-03-28T11:20:00" },
];

export const INITIAL_SHIFTS = [
  { id:"SHF-001", staffId:"SEC-001", staffName:"Jordan Lee",  zone:"Fitzroy",   date:"2026-03-28", time:"06:00–14:00", assigned:true  },
  { id:"SHF-002", staffId:"SEC-002", staffName:"Priya Nair",  zone:"Docklands", date:"2026-03-28", time:"14:00–22:00", assigned:true  },
  { id:"SHF-003", staffId:"SEC-003", staffName:"Marcus Webb", zone:"CBD",       date:"2026-03-29", time:"22:00–06:00", assigned:false },
  { id:"SHF-004", staffId:"SEC-011", staffName:"Noah Patel",  zone:"Docklands", date:"2026-03-28", time:"06:00–14:00", assigned:true  },
];

export const MOCK_COST_DATA = [
  { zone:"Fitzroy Substation",     monthlyBudget:"$42,000", spent:"$38,200", variance:"+$3,800", status:"On Track" },
  { zone:"CBD Distribution Hub",   monthlyBudget:"$68,000", spent:"$71,400", variance:"-$3,400", status:"Over Budget" },
  { zone:"Docklands Control Node", monthlyBudget:"$35,000", spent:"$29,800", variance:"+$5,200", status:"Under Budget" },
  { zone:"Richmond Transmission",  monthlyBudget:"$51,000", spent:"$50,100", variance:"+$900",   status:"On Track" },
  { zone:"Southbank Grid Relay",   monthlyBudget:"$29,000", spent:"$28,600", variance:"+$400",   status:"On Track" },
];

export const getSeverityColor = (s) => {
  if (s === "Critical") return COLORS.critical;
  if (s === "High")     return COLORS.high;
  if (s === "Medium")   return COLORS.medium;
  return COLORS.low;
};

export const formatTime = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-AU", { dateStyle:"short", timeStyle:"short" });
};

// No API keys needed — all reports are pre-determined
