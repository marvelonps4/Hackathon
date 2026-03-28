import { useEffect, useState } from "react";
import {
  COLORS, ROLE_LABELS, ROLE_ICONS, ROLE_TABS,
  STAFF, LOCATIONS, PHYSICAL_ATTACK_TYPES, DIGITAL_ATTACK_TYPES,
  MOCK_COST_DATA, getSeverityColor, formatTime, PRESET_ATTACKS,
} from "./constants";

// ─── ATTACK OVERLAY ───────────────────────────────────────────────────────────
function AttackOverlay({ attack, onDismiss }) {
  const [phase, setPhase] = useState("flicker");
  const isPhysical = attack.type === "physical";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("alert"), 1400);
    const t2 = setTimeout(() => setPhase("detail"), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const chain = isPhysical
    ? ["Security Officer detected", "Chief Engineer notified", "Executive Director on standby"]
    : ["Junior Engineer detected", "Chief Engineer notified", "Executive Director on standby"];

  const typeColor = isPhysical ? COLORS.high : COLORS.accent;

  // Pre-written threat assessment per attack
  const threatAssessment = attack.analysis
    ? attack.analysis.whatHappened
    : `${attack.type === "physical" ? "Physical security breach" : "Cyber intrusion"} detected at ${attack.location}. Immediate containment required. Notify chain of command and follow emergency response protocol.`;

  if (phase === "flicker") return (
    <div style={{ ...OL.base, backgroundColor:"#000", justifyContent:"center", alignItems:"center" }}>
      <div style={OL.scanline} />
      <div style={{ color:"#ff0033", fontSize:32, fontWeight:"bold", letterSpacing:8, textShadow:"0 0 40px #ff0033", animation:"blinkFast 0.25s infinite" }}>
        ⚠ THREAT DETECTED ⚠
      </div>
      <div style={{ color:"#ff4400", fontSize:12, letterSpacing:4, marginTop:12, animation:"blinkFast 0.4s infinite" }}>
        ACTIVATING SECURITY PROTOCOL · GRIDSHIELD
      </div>
      <style>{`@keyframes blinkFast{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );

  if (phase === "alert") return (
    <div style={{ ...OL.base, backgroundColor:"rgba(0,0,0,0.97)", border:"3px solid #ff0033", boxShadow:"inset 0 0 100px rgba(255,0,51,0.15)", justifyContent:"center", alignItems:"center" }}>
      <div style={OL.scanline} />
      <div style={{ fontSize:64, marginBottom:16 }}>{isPhysical ? "🚨" : "💻"}</div>
      <div style={{ color:"#ff0033", fontSize:26, fontWeight:"bold", letterSpacing:6, textAlign:"center" }}>
        {isPhysical ? "PHYSICAL ATTACK" : "CYBER ATTACK"} IN PROGRESS
      </div>
      <div style={{ color: typeColor, fontSize:20, marginTop:12, letterSpacing:2 }}>{attack.location}</div>
      <div style={{ color:"#ffcc00", fontSize:14, marginTop:8, letterSpacing:1 }}>{attack.title}</div>
    </div>
  );

  return (
    <div style={{ ...OL.base, backgroundColor:"rgba(6,13,26,0.98)", borderLeft:`4px solid #ff0033`, padding:40, overflowY:"auto" }}>
      <div style={OL.scanline} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22, paddingBottom:18, borderBottom:`1px solid ${COLORS.border}` }}>
        <div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
            <span style={{ backgroundColor: isPhysical ? "rgba(255,107,0,0.15)" : "rgba(0,229,255,0.1)", color: typeColor, border:`1px solid ${typeColor}44`, padding:"2px 10px", fontSize:10, letterSpacing:2, borderRadius:2, fontWeight:"bold" }}>
              {isPhysical ? "● PHYSICAL" : "● DIGITAL"}
            </span>
            <span style={{ color:"#ff0033", fontSize:10, letterSpacing:2 }}>LIVE · {new Date().toLocaleTimeString()}</span>
          </div>
          <div style={{ color:"#fff", fontSize:22, fontWeight:"bold" }}>{attack.title}</div>
          <div style={{ color:COLORS.high, fontSize:13, marginTop:4 }}>📍 {attack.location}</div>
          <div style={{ color:COLORS.subtext, fontSize:11, marginTop:4 }}>Detected by: {attack.detectedBy}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ backgroundColor:"#ff0033", color:"#fff", padding:"4px 14px", fontSize:12, fontWeight:"bold", borderRadius:2, marginBottom:6 }}>
            {attack.severity.toUpperCase()}
          </div>
          <div style={{ color:COLORS.muted, fontSize:10 }}>{attack.id}</div>
        </div>
      </div>

      {/* Description */}
      <div style={{ color:COLORS.subtext, fontSize:13, lineHeight:1.7, marginBottom:20, padding:"12px 14px", backgroundColor:"rgba(255,255,255,0.02)", border:`1px solid ${COLORS.border}`, borderRadius:3 }}>
        {attack.description}
      </div>

      {/* Threat Assessment */}
      <div style={{ backgroundColor:"rgba(0,229,255,0.04)", border:`1px solid rgba(0,229,255,0.2)`, borderRadius:3, padding:16, marginBottom:20 }}>
        <div style={{ color:COLORS.accent, fontSize:10, letterSpacing:2, marginBottom:10 }}>◈ GRIDSHIELD — THREAT ASSESSMENT</div>
        <div style={{ color:COLORS.text, fontSize:13, lineHeight:1.7 }}>{threatAssessment}</div>
      </div>

      {/* Response Steps */}
      <div style={{ marginBottom:20 }}>
        <div style={{ color:COLORS.subtext, fontSize:10, letterSpacing:2, marginBottom:10 }}>RESPONSE STEPS INITIATED</div>
        {attack.responseSteps?.map((step, i) => (
          <div key={i} style={{ display:"flex", gap:10, marginBottom:7, alignItems:"flex-start" }}>
            <span style={{ color:COLORS.low, fontSize:12, marginTop:1, flexShrink:0 }}>✓</span>
            <span style={{ color:COLORS.text, fontSize:12 }}>{step}</span>
          </div>
        ))}
      </div>

      {/* Escalation Chain */}
      <div style={{ backgroundColor:"rgba(255,0,51,0.04)", border:`1px solid rgba(255,0,51,0.15)`, borderRadius:3, padding:14, marginBottom:22 }}>
        <div style={{ color:COLORS.muted, fontSize:10, letterSpacing:2, marginBottom:10 }}>ZERO TRUST ESCALATION CHAIN</div>
        {chain.map((step, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <div style={{ width:9, height:9, borderRadius:"50%", backgroundColor: i <= 1 ? COLORS.low : COLORS.muted, boxShadow: i <= 1 ? `0 0 8px ${COLORS.low}` : "none", flexShrink:0 }} />
            <span style={{ color: i <= 1 ? COLORS.low : COLORS.subtext, fontSize:12, fontWeight: i === 0 ? "bold" : "normal" }}>{step}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onDismiss} style={{ flex:1, backgroundColor:"transparent", border:`1px solid ${COLORS.low}`, color:COLORS.low, padding:12, fontSize:11, fontWeight:"bold", fontFamily:"'Courier New',monospace", letterSpacing:2, cursor:"pointer", borderRadius:2 }}>
          ✓ ACKNOWLEDGE
        </button>
        <button onClick={onDismiss} style={{ flex:1, backgroundColor:"#ff0033", border:"none", color:"#fff", padding:12, fontSize:11, fontWeight:"bold", fontFamily:"'Courier New',monospace", letterSpacing:2, cursor:"pointer", borderRadius:2 }}>
          🔐 INITIATE LOCKDOWN
        </button>
      </div>
      <style>{`@keyframes blinkFast{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

const OL = {
  base: { position:"fixed", inset:0, zIndex:9999, display:"flex", flexDirection:"column", fontFamily:"'Courier New',monospace" },
  scanline: { position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,0,51,0.012) 2px,rgba(255,0,51,0.012) 4px)", pointerEvents:"none" },
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function Dashboard({ account, incidents, setIncidents, shifts, setShifts, lockdowns, setLockdowns, pendingAttack, setPendingAttack, onLogout }) {
  const tabs = ROLE_TABS[account.role];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [gridStats, setGridStats] = useState(null);

  useEffect(() => {
    fetch("https://visualisations.aemo.com.au/aemo/apps/api/report/ELEC_NEM_SUMMARY")
      .then(r => r.json())
      .then(data => {
        const vic = Array.isArray(data) ? data.find(x => x.REGIONID === "VIC1") : null;
        setGridStats(vic
          ? { demand: vic.TOTALDEMAND?.toFixed(0), price: vic.RRP?.toFixed(2) }
          : { demand:"4,821", price:"87.50" });
      })
      .catch(() => setGridStats({ demand:"4,821", price:"87.50" }));
  }, []);

  const activeCount = incidents.filter(i => i.status === "Active").length;

  return (
    <div style={S.shell}>
      {pendingAttack && <AttackOverlay attack={pendingAttack} onDismiss={() => setPendingAttack(null)} />}

      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.sidebarTop}>
          <div style={S.logo}>
            <span style={{ fontSize:22 }}>⚡</span>
            <div>
              <div style={{ color:COLORS.accent, fontSize:13, fontWeight:"bold", letterSpacing:4 }}>GRIDSHIELD</div>
              <div style={{ color:COLORS.muted, fontSize:9, letterSpacing:1 }}>Melbourne VIC</div>
            </div>
          </div>

          <div style={S.userBadge}>
            <div style={{ fontSize:22 }}>{ROLE_ICONS[account.role]}</div>
            <div>
              <div style={{ color:COLORS.accent, fontSize:11, fontWeight:"bold", letterSpacing:1 }}>{account.name}</div>
              <div style={{ color:COLORS.subtext, fontSize:9, letterSpacing:1 }}>{ROLE_LABELS[account.role].toUpperCase()}</div>
              <div style={{ color:COLORS.muted, fontSize:9 }}>{account.id}</div>
            </div>
          </div>

          <nav style={{ padding:"8px 0" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ ...S.navBtn, ...(activeTab === tab.id ? S.navBtnActive : {}) }}>
                <span style={{ marginRight:8 }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={S.sidebarBot}>
          <div style={{ color:COLORS.muted, fontSize:9, letterSpacing:1, marginBottom:3 }}>🔒 ZERO TRUST ACTIVE</div>
          <div style={{ color:COLORS.muted, fontSize:9, letterSpacing:1, marginBottom:12 }}>All actions logged</div>
          <button onClick={onLogout} style={S.logoutBtn}>SIGN OUT</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        {/* Top bar */}
        <div style={S.topBar}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <h2 style={{ color:COLORS.text, fontSize:17, margin:0, fontWeight:"bold" }}>
              {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <Pill label="VIC DEMAND"   value={gridStats ? `${gridStats.demand} MW` : "…"} />
            <Pill label="SPOT PRICE"   value={gridStats ? `$${gridStats.price}/MWh` : "…"} />
            <Pill label="ACTIVE INC."  value={activeCount} alert={activeCount > 0} />
          </div>
        </div>

        {/* Content — strictly by role and tab */}
        <div style={S.content}>
          <TabRouter
            role={account.role} tab={activeTab} account={account}
            incidents={incidents} setIncidents={setIncidents}
            shifts={shifts} setShifts={setShifts}
            lockdowns={lockdowns} setLockdowns={setLockdowns}
          />
        </div>
      </main>
    </div>
  );
}

// ─── TAB ROUTER — strictly role-gated ────────────────────────────────────────
function TabRouter({ role, tab, account, incidents, setIncidents, shifts, setShifts, lockdowns, setLockdowns }) {
  // SECURITY only
  if (role === "security") {
    if (tab === "my_shifts")       return <MyShifts account={account} shifts={shifts} />;
    if (tab === "report_physical") return <ReportPhysical account={account} setIncidents={setIncidents} />;
    if (tab === "status_board")    return <StatusBoard incidents={incidents.filter(i => i.attackType === "physical")} title="Physical Incidents" />;
  }
  // ADMIN only
  if (role === "admin") {
    if (tab === "staff_overview")  return <StaffOverview />;
    if (tab === "assign_shifts")   return <AssignShifts shifts={shifts} setShifts={setShifts} />;
    if (tab === "grid_summary")    return <GridSummary incidents={incidents} showGraph={false} />;
  }
  // JUNIOR only
  if (role === "junior") {
    if (tab === "vic_grid")        return <GridSummary incidents={incidents} showGraph={false} />;
    if (tab === "report_digital")  return <ReportDigital account={account} setIncidents={setIncidents} />;
    if (tab === "incident_log")    return <StatusBoard incidents={incidents.filter(i => i.attackType === "digital")} title="Digital Incidents" />;
    if (tab === "threat_reports")  return <ThreatReports simplified incidents={incidents} />;
  }
  // SENIOR only
  if (role === "senior") {
    if (tab === "full_grid")       return <GridSummary incidents={incidents} showGraph={true} />;
    if (tab === "graphs")          return <GenerationGraph />;
    if (tab === "ai_analysis")     return <ThreatReports incidents={incidents} />;
    if (tab === "vuln_report")     return <VulnerabilityReport />;
    if (tab === "incident_log")    return <StatusBoard incidents={incidents} title="All Incidents" />;
  }
  // CHIEF only
  if (role === "chief") {
    if (tab === "attack_alerts")    return <AttackAlerts incidents={incidents} setIncidents={setIncidents} />;
    if (tab === "all_data")         return <GridSummary incidents={incidents} showGraph={true} />;
    if (tab === "lockdown")         return <InitiateLockdown lockdowns={lockdowns} setLockdowns={setLockdowns} />;
    if (tab === "incident_reports") return <IncidentReports incidents={incidents} />;
    if (tab === "incident_log")     return <StatusBoard incidents={incidents} title="All Incidents" />;
  }
  // DIRECTOR only
  if (role === "director") {
    if (tab === "exec_overview")      return <ExecutiveOverview incidents={incidents} />;
    if (tab === "lockdown_approvals") return <LockdownApprovals lockdowns={lockdowns} setLockdowns={setLockdowns} />;
    if (tab === "cost_budget")        return <CostBudget />;
    if (tab === "incident_reports")   return <IncidentReports incidents={incidents} />;
    if (tab === "incident_log")       return <StatusBoard incidents={incidents} title="All Incidents" />;
  }
  return <div style={{ color:COLORS.subtext }}>Access denied.</div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// SECURITY TABS
// ══════════════════════════════════════════════════════════════════════════════
function MyShifts({ account, shifts }) {
  const myShifts = shifts.filter(s => s.staffId === account.id);
  return (
    <div>
      <SecHeader title="My Assigned Shifts" sub={`${account.name} · ${account.location || account.zone}`} />
      <InfoBox color={COLORS.accent} icon="ℹ">Your assigned patrol zones. Report any physical incidents immediately via 'Report Physical'.</InfoBox>
      {myShifts.length === 0 && <div style={{ color:COLORS.subtext, fontSize:13 }}>No shifts currently assigned.</div>}
      {myShifts.map(s => (
        <div key={s.id} style={S.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ color:COLORS.text, fontWeight:"bold", fontSize:14 }}>{s.zone}</div>
              <div style={{ color:COLORS.subtext, fontSize:12, marginTop:4 }}>📅 {s.date} · 🕐 {s.time}</div>
            </div>
            <Badge text={s.assigned ? "Confirmed" : "Pending"} color={s.assigned ? COLORS.low : COLORS.medium} />
          </div>
        </div>
      ))}
      <div style={{ ...S.card, marginTop:16 }}>
        <div style={{ color:COLORS.accent, fontSize:10, letterSpacing:2, marginBottom:10 }}>SHIFT INFO — ALL ZONES</div>
        <SimpleTable
          headers={["Staff ID","Name","Location","Shift","Zone"]}
          rows={STAFF.filter(s=>s.role==="security").slice(0,10).map(s=>[s.id,s.name,s.location||"—",s.shift||"—",s.zone])}
        />
      </div>
    </div>
  );
}

function ReportPhysical({ account, setIncidents }) {
  const [form, setForm] = useState({ location: account.location || "", type:"", description:"", severity:"High" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const submit = () => {
    if (!form.location || !form.type || !form.description) return;
    setLoading(true);
    const inc = {
      id:`INC-${String(Math.floor(Math.random()*9000)+1000)}`,
      attackType:"physical", location:form.location, type:form.type,
      severity:form.severity, status:"Active",
      reportedBy:`${account.name} (${account.id})`,
      reportedAt:new Date().toISOString(),
      chain:"Security → Chief → Director",
      description:form.description, response:null, aiSummary:null,
    };
    fetch("http://localhost:5000/api/incidents", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(inc) })
      .then(() => {}).catch(() => {});
    setIncidents(prev => [inc, ...prev]);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 600);
  };

  if (submitted) return <InfoBox color={COLORS.low} icon="✅">Physical incident reported. Escalated to Chief Engineer and Executive Director. Incident ID assigned.</InfoBox>;

  return (
    <div>
      <SecHeader title="Report Physical Security Incident" sub="Escalates directly: Security Officer → Chief Engineer → Executive Director" />
      <InfoBox color={COLORS.high} icon="🚨">Physical incidents include: perimeter breaches, suspicious persons/vehicles, theft, sabotage, forced entry.</InfoBox>
      <div style={S.formCard}>
        <FGrid>
          <Field label="LOCATION">
            <select style={S.input} value={form.location} onChange={e => setForm({...form,location:e.target.value})}>
              <option value="">Select...</option>
              {LOCATIONS.map(l=><option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="INCIDENT TYPE">
            <select style={S.input} value={form.type} onChange={e => setForm({...form,type:e.target.value})}>
              <option value="">Select...</option>
              {PHYSICAL_ATTACK_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="SEVERITY">
            <select style={S.input} value={form.severity} onChange={e => setForm({...form,severity:e.target.value})}>
              <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </Field>
        </FGrid>
        <Field label="INCIDENT DESCRIPTION">
          <textarea style={{...S.input,height:90,resize:"vertical"}} placeholder="Describe exactly what you observed, time, persons involved..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </Field>
        <button onClick={submit} disabled={loading} style={{...S.btn,opacity:loading?0.7:1}}>
          {loading?"SUBMITTING…":"🚨 SUBMIT PHYSICAL INCIDENT REPORT"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN TABS
// ══════════════════════════════════════════════════════════════════════════════
function StaffOverview() {
  const [filter, setFilter] = useState("security");
  const filtered = STAFF.filter(s=>s.role===filter);
  return (
    <div>
      <SecHeader title="Staff Overview" sub={`${filtered.length} ${filter} personnel`} />
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {["security","admin","junior","senior","chief","director"].map(r=>(
          <button key={r} onClick={()=>setFilter(r)} style={{...S.filterBtn,...(filter===r?S.filterBtnOn:{})}}>
            {ROLE_ICONS[r]} {r.toUpperCase()}
          </button>
        ))}
      </div>
      <SimpleTable
        headers={["ID","Name","Role","Location / Zone","Shift"]}
        rows={filtered.slice(0,25).map(s=>[s.id,s.name,ROLE_LABELS[s.role],s.location||s.zone||s.zones||"—",s.shift||"—"])}
      />
      {filtered.length>25&&<div style={{color:COLORS.subtext,fontSize:11,marginTop:8}}>...and {filtered.length-25} more</div>}
    </div>
  );
}

function AssignShifts({ shifts, setShifts }) {
  const [form, setForm] = useState({ staffId:"SEC-001", zone:LOCATIONS[0], date:"", time:"06:00–14:00" });
  const secStaff = STAFF.filter(s=>s.role==="security");
  const assign = () => {
    if (!form.date) return;
    const staffMember = secStaff.find(s=>s.id===form.staffId);
    setShifts(prev=>[...prev,{ id:`SHF-${String(prev.length+1).padStart(3,"0")}`, ...form, staffName:staffMember?.name||"", assigned:true }]);
    setForm({...form,date:""});
  };
  return (
    <div>
      <SecHeader title="Assign Shifts" sub="Assign security staff to grid zone patrols" />
      <div style={S.formCard}>
        <FGrid>
          <Field label="STAFF MEMBER">
            <select style={S.input} value={form.staffId} onChange={e=>setForm({...form,staffId:e.target.value})}>
              {secStaff.map(s=><option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
            </select>
          </Field>
          <Field label="ZONE">
            <select style={S.input} value={form.zone} onChange={e=>setForm({...form,zone:e.target.value})}>
              {LOCATIONS.slice(0,20).map(l=><option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="DATE"><input type="date" style={S.input} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></Field>
          <Field label="SHIFT">
            <select style={S.input} value={form.time} onChange={e=>setForm({...form,time:e.target.value})}>
              <option>06:00–14:00</option><option>14:00–22:00</option><option>22:00–06:00</option>
            </select>
          </Field>
        </FGrid>
        <button onClick={assign} style={S.btn}>+ ASSIGN SHIFT</button>
      </div>
      <SecHeader title="All Assigned Shifts" />
      <SimpleTable
        headers={["ID","Staff","Zone","Date","Time","Status"]}
        rows={shifts.map(s=>[s.id,s.staffName||s.staffId,s.zone,s.date,s.time,<Badge key={s.id} text={s.assigned?"Confirmed":"Pending"} color={s.assigned?COLORS.low:COLORS.medium}/>])}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// JUNIOR TABS
// ══════════════════════════════════════════════════════════════════════════════
function ReportDigital({ account, setIncidents }) {
  const [form, setForm] = useState({ location:"", type:"", description:"", severity:"High" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const submit = () => {
    if (!form.location || !form.type || !form.description) return;
    setLoading(true);
    const inc = {
      id:`INC-${String(Math.floor(Math.random()*9000)+1000)}`,
      attackType:"digital", location:form.location, type:form.type,
      severity:form.severity, status:"Active",
      reportedBy:`${account.name} (${account.id})`,
      reportedAt:new Date().toISOString(),
      chain:"Junior Engineer → Chief Engineer → Executive Director",
      description:form.description, response:null, aiSummary:null,
    };
    fetch("http://localhost:5000/api/incidents", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(inc) })
      .then(()=>{}).catch(()=>{});
    setIncidents(prev=>[inc,...prev]);
    setTimeout(()=>{ setLoading(false); setSubmitted(true); }, 600);
  };

  if (submitted) return <InfoBox color={COLORS.low} icon="✅">Digital incident reported. Escalated: Junior Engineer → Chief Engineer → Executive Director.</InfoBox>;

  return (
    <div>
      <SecHeader title="Report Digital / Cyber Incident" sub="Escalates: Junior Engineer → Chief Engineer → Executive Director" />
      <InfoBox color={COLORS.accent} icon="💻">Digital incidents include: SCADA anomalies, network intrusions, malware, false data, unauthorised system access.</InfoBox>
      <div style={S.formCard}>
        <FGrid>
          <Field label="SYSTEM / LOCATION">
            <select style={S.input} value={form.location} onChange={e=>setForm({...form,location:e.target.value})}>
              <option value="">Select...</option>
              {LOCATIONS.map(l=><option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="ATTACK / ANOMALY TYPE">
            <select style={S.input} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              <option value="">Select...</option>
              {DIGITAL_ATTACK_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="SEVERITY">
            <select style={S.input} value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})}>
              <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </Field>
        </FGrid>
        <Field label="TECHNICAL DESCRIPTION">
          <textarea style={{...S.input,height:90,resize:"vertical"}} placeholder="Describe anomaly, affected systems, indicators of compromise, timestamps..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </Field>
        <button onClick={submit} disabled={loading} style={{...S.btn,opacity:loading?0.7:1}}>
          {loading?"SUBMITTING…":"💻 SUBMIT DIGITAL INCIDENT REPORT"}
        </button>
      </div>
    </div>
  );
}

function ThreatReports({ simplified, incidents }) {
  const resolved = incidents.filter(i => i.status === "Resolved" || i.aiSummary);
  return (
    <div>
      <SecHeader
        title={simplified ? "Post-Incident Threat Reports" : "AI Threat Analysis Reports"}
        sub={simplified ? "Study & training reference — resolved incidents only" : "Full analysis for senior review"} />
      {resolved.length === 0 && <div style={{color:COLORS.subtext,fontSize:13}}>No resolved incidents to review yet.</div>}
      {resolved.map(inc=>(
        <div key={inc.id} style={{...S.card,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{display:"flex",gap:8,marginBottom:4,alignItems:"center"}}>
                <span style={{backgroundColor:inc.attackType==="digital"?"rgba(0,229,255,0.1)":"rgba(255,107,0,0.1)",color:inc.attackType==="digital"?COLORS.accent:COLORS.high,border:`1px solid ${inc.attackType==="digital"?COLORS.accent:COLORS.high}44`,padding:"2px 8px",fontSize:9,letterSpacing:1,borderRadius:2}}>
                  {inc.attackType?.toUpperCase()}
                </span>
                <span style={{color:COLORS.muted,fontSize:11}}>{inc.id}</span>
              </div>
              <div style={{color:COLORS.text,fontWeight:"bold",fontSize:14}}>{inc.type}</div>
              <div style={{color:COLORS.subtext,fontSize:12,marginTop:2}}>📍 {inc.location} · {formatTime(inc.reportedAt)}</div>
            </div>
            <Badge text={inc.severity} color={getSeverityColor(inc.severity)} />
          </div>
          {inc.description && <p style={{color:COLORS.subtext,fontSize:13,lineHeight:1.6,marginBottom:10}}>{inc.description}</p>}
          {inc.aiSummary && (
            <div style={{backgroundColor:"rgba(0,229,255,0.04)",border:"1px solid rgba(0,229,255,0.15)",borderRadius:3,padding:12}}>
              <div style={{color:COLORS.accent,fontSize:10,letterSpacing:2,marginBottom:6}}>◈ AI INCIDENT SUMMARY</div>
              <div style={{color:COLORS.text,fontSize:12,lineHeight:1.7}}>{inc.aiSummary}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED: GRID SUMMARY
// ══════════════════════════════════════════════════════════════════════════════
function GridSummary({ incidents, showGraph }) {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetch("https://visualisations.aemo.com.au/aemo/apps/api/report/ELEC_NEM_SUMMARY")
      .then(r=>r.json())
      .then(data=>{
        const vic=Array.isArray(data)?data.find(x=>x.REGIONID==="VIC1"):null;
        setStats(vic?{demand:vic.TOTALDEMAND?.toFixed(0),price:vic.RRP?.toFixed(2),interchange:vic.NETINTERCHANGE?.toFixed(0)}:{demand:"4,821",price:"87.50",interchange:"-342"});
      }).catch(()=>setStats({demand:"4,821",price:"87.50",interchange:"-342"}));
  },[]);
  return (
    <div>
      <SecHeader title="VIC Live Grid Data" sub="Source: AEMO · Australian Energy Market Operator" />
      <div style={S.statGrid}>
        <StatCard label="Total Demand" value={stats?`${stats.demand} MW`:"…"} icon="⚡" />
        <StatCard label="Spot Price"   value={stats?`$${stats.price}/MWh`:"…"} icon="💰" />
        <StatCard label="Net Interchange" value={stats?`${stats.interchange} MW`:"…"} icon="🔄" />
        <StatCard label="Active Incidents" value={incidents.filter(i=>i.status==="Active").length} icon="🚨" />
      </div>
      {showGraph && (
        <div style={{marginTop:24}}>
          <SecHeader title="Generation Mix" />
          <GenerationBars />
        </div>
      )}
      <div style={{marginTop:24}}>
        <SecHeader title="Incident Log" />
        <IncidentTable incidents={incidents} />
      </div>
    </div>
  );
}

function GenerationGraph() {
  const demandHours=[42,38,35,34,38,45,58,70,78,75,72,68,65,62,65,70,78,82,80,74,66,58,50,44];
  const maxD=Math.max(...demandHours);
  return (
    <div>
      <SecHeader title="Live Graphs — Victoria Grid" />
      <GenerationBars />
      <div style={{marginTop:24}}>
        <SecHeader title="24-Hour Demand Curve" />
        <div style={S.card}>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,height:120}}>
            {demandHours.map((d,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%"}}>
                <div style={{width:"100%",backgroundColor:i===new Date().getHours()?COLORS.accent:COLORS.border,height:`${(d/maxD)*100}%`,borderRadius:"2px 2px 0 0",opacity:i===new Date().getHours()?1:0.6}} />
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6,color:COLORS.muted,fontSize:10}}>
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerationBars() {
  const src=[{l:"Wind",v:35,c:COLORS.low},{l:"Solar",v:28,c:COLORS.medium},{l:"Gas",v:20,c:COLORS.high},{l:"Coal",v:10,c:COLORS.muted},{l:"Hydro",v:7,c:COLORS.accent}];
  return (
    <div style={S.card}>
      {src.map(s=>(
        <div key={s.l} style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{color:COLORS.text,fontSize:13}}>{s.l}</span>
            <span style={{color:s.c,fontSize:13,fontWeight:"bold"}}>{s.v}%</span>
          </div>
          <div style={{backgroundColor:COLORS.border,borderRadius:2,height:7}}>
            <div style={{width:`${s.v}%`,backgroundColor:s.c,height:"100%",borderRadius:2,transition:"width 0.5s"}} />
          </div>
        </div>
      ))}
    </div>
  );
}

function VulnerabilityReport() {
  const [shown, setShown] = useState(false);
  const vulns = [
    {system:"SCADA Node — CBD Distribution Hub",      risk:"Critical", finding:"Default credentials unchanged on 3 OT controllers. Remote access exposed via Shodan-visible Modbus port 502.", fix:"Rotate all OT credentials immediately. Close Modbus port from external access. Add to monthly credential audit."},
    {system:"VPN Gateway — Fitzroy Substation",       risk:"High",     finding:"MFA not enforced on 4 privileged OT accounts. Two accounts show no login activity for 90+ days — likely stale.", fix:"Enable MFA on all privileged accounts. Disable or remove stale accounts within 24 hours."},
    {system:"Historian Server — Southbank Relay",     risk:"Medium",   finding:"Unpatched Windows Server 2019 with 3 critical CVEs outstanding. SMB exposed on internal OT segment.", fix:"Apply KB5034441 and related patches. Restrict SMB to authorised hosts only via firewall rule."},
    {system:"HMI Portal — Docklands Control Node",   risk:"High",     finding:"SQL injection vulnerability on login form. No WAF deployed. Attack vector is unauthenticated and remotely exploitable.", fix:"Parameterise all SQL queries. Deploy WAF with OWASP Core Rule Set. Conduct code review of all HMI portal inputs."},
    {system:"RTU Firmware — Geelong North",           risk:"Critical", finding:"Historian server compromise (ATK-004) revealed RTU firmware had not been integrity-checked in 47 days. Firmware version predates critical security patch.", fix:"Implement daily automated firmware integrity checks. Establish patch SLA of 14 days for OT firmware updates."},
    {system:"IT/OT Network Boundary — CBD Hub",      risk:"Critical", finding:"Following ATK-002, investigation found IT and OT network segmentation had silently degraded. Corporate LAN had unrestricted access to SCADA segment.", fix:"Conduct quarterly network segmentation audit. Implement automated boundary testing. Enforce deny-by-default firewall rules at IT/OT boundary."},
  ];
  return (
    <div>
      <SecHeader title="Vulnerability Assessment" sub="GridShield infrastructure security findings — updated post-incident" />
      {!shown ? (
        <div style={S.formCard}>
          <p style={{color:COLORS.subtext,fontSize:13,marginBottom:8,lineHeight:1.6}}>This report contains 6 findings identified through post-incident analysis of recent GridShield attacks. Findings are rated by exploitability and impact.</p>
          <p style={{color:COLORS.muted,fontSize:12,marginBottom:16}}>Last updated: following ATK-001 through ATK-004 incident reviews.</p>
          <button onClick={() => setShown(true)} style={S.btn}>🔍 VIEW VULNERABILITY REPORT</button>
        </div>
      ) : vulns.map((v,i)=>(
        <div key={i} style={{...S.card,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{color:COLORS.text,fontWeight:"bold",fontSize:14}}>{v.system}</span>
            <Badge text={v.risk} color={getSeverityColor(v.risk)} />
          </div>
          <div style={{marginBottom:8}}><span style={{color:COLORS.high,fontSize:10,letterSpacing:1}}>FINDING: </span><span style={{color:COLORS.subtext,fontSize:13}}>{v.finding}</span></div>
          <div><span style={{color:COLORS.low,fontSize:10,letterSpacing:1}}>REMEDIATION: </span><span style={{color:COLORS.text,fontSize:13}}>{v.fix}</span></div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CHIEF TABS
// ══════════════════════════════════════════════════════════════════════════════
function AttackAlerts({ incidents, setIncidents }) {
  const active = incidents.filter(i => i.status === "Active");
  const acknowledge = (id) => setIncidents(prev => prev.map(i => i.id===id ? {...i,status:"Investigating"} : i));
  const resolve    = (id) => setIncidents(prev => prev.map(i => i.id===id ? {...i,status:"Resolved",response:"Acknowledged and resolved by Chief Engineer."} : i));
  return (
    <div>
      <SecHeader title="Active Attack Alerts" sub="All unacknowledged incidents — physical and digital" />
      {active.length === 0 && <InfoBox color={COLORS.low} icon="✅">No active incidents. All clear.</InfoBox>}
      {active.map(inc=>(
        <div key={inc.id} style={{...S.card,marginBottom:14,borderLeft:`3px solid ${getSeverityColor(inc.severity)}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{backgroundColor:inc.attackType==="digital"?"rgba(0,229,255,0.1)":"rgba(255,107,0,0.1)",color:inc.attackType==="digital"?COLORS.accent:COLORS.high,border:`1px solid ${inc.attackType==="digital"?COLORS.accent:COLORS.high}44`,padding:"2px 8px",fontSize:9,letterSpacing:1,borderRadius:2,fontWeight:"bold"}}>
                  {inc.attackType==="digital"?"💻 DIGITAL":"🚨 PHYSICAL"}
                </span>
                <span style={{color:COLORS.critical,fontSize:10}}>● ACTIVE</span>
              </div>
              <div style={{color:COLORS.text,fontWeight:"bold",fontSize:14}}>{inc.type}</div>
              <div style={{color:COLORS.subtext,fontSize:12,marginTop:2}}>📍 {inc.location} · Reported by {inc.reportedBy}</div>
              <div style={{color:COLORS.muted,fontSize:11,marginTop:2}}>Chain: {inc.chain} · {formatTime(inc.reportedAt)}</div>
            </div>
            <Badge text={inc.severity} color={getSeverityColor(inc.severity)} />
          </div>
          {inc.description && <p style={{color:COLORS.subtext,fontSize:13,lineHeight:1.6,marginBottom:12}}>{inc.description}</p>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>acknowledge(inc.id)} style={{...S.btn,fontSize:10,flex:1,backgroundColor:"transparent",border:`1px solid ${COLORS.medium}`,color:COLORS.medium}}>✓ ACKNOWLEDGE</button>
            <button onClick={()=>resolve(inc.id)} style={{...S.btn,fontSize:10,flex:1}}>✅ MARK RESOLVED</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function InitiateLockdown({ lockdowns, setLockdowns }) {
  const [form, setForm] = useState({ zone:LOCATIONS[7], reason:"" });
  const [submitted, setSubmitted] = useState(false);
  const submit = () => {
    if (!form.reason) return;
    const req = { id:`LKD-${String(lockdowns.length+1).padStart(3,"0")}`, initiatedBy:"Chief Eng. Victor Osei", ...form, status:"Pending", requestedAt:new Date().toISOString() };
    setLockdowns(prev=>[req,...prev]);
    setSubmitted(true);
  };
  if (submitted) return <InfoBox color={COLORS.medium} icon="🔐">Lockdown request submitted. Awaiting Executive Director approval.</InfoBox>;
  return (
    <div>
      <SecHeader title="Initiate Emergency Lockdown" sub="Requires Executive Director approval — Zero Trust protocol" />
      <InfoBox color={COLORS.critical} icon="⚠️">This is a serious action. Lockdown isolates the zone from the grid network. Ensure you have confirmed the threat before proceeding.</InfoBox>
      <div style={S.formCard}>
        <Field label="ZONE TO LOCKDOWN">
          <select style={S.input} value={form.zone} onChange={e=>setForm({...form,zone:e.target.value})}>
            {LOCATIONS.map(l=><option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="JUSTIFICATION / THREAT SUMMARY">
          <textarea style={{...S.input,height:100,resize:"vertical"}} placeholder="Describe the confirmed threat and why lockdown is the correct response..." value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
        </Field>
        <button onClick={submit} style={{...S.btn,backgroundColor:COLORS.critical}}>🔐 REQUEST LOCKDOWN → EXECUTIVE DIRECTOR</button>
      </div>
      {lockdowns.length > 0 && (
        <>
          <SecHeader title="Previous Lockdown Requests" />
          {lockdowns.map(r=>(
            <div key={r.id} style={{...S.card,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{color:COLORS.text,fontWeight:"bold"}}>{r.zone}</span>
                <Badge text={r.status} color={r.status==="Pending"?COLORS.medium:r.status==="Approved"?COLORS.low:COLORS.critical} />
              </div>
              <div style={{color:COLORS.subtext,fontSize:12}}>{r.reason}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function IncidentReports({ incidents }) {
  const [selected, setSelected] = useState(null);

  // Match incidents to their PRESET_ATTACKS analysis by presetId
  const incWithReports = incidents.filter(i => i.presetId || i.analysis);
  const allInc = incidents.filter(i => i.type);

  const getAnalysis = (inc) => {
    // Check if incident has analysis attached directly
    if (inc.analysis) return inc.analysis;
    // Check PRESET_ATTACKS for matching presetId
    const preset = PRESET_ATTACKS.find(a => a.id === inc.presetId);
    return preset?.analysis || null;
  };

  if (selected) {
    const analysis = getAnalysis(selected);
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ ...S.btn, backgroundColor:"transparent", border:`1px solid ${COLORS.border}`, color:COLORS.subtext, marginBottom:20, fontSize:10 }}>
          ← BACK TO ALL REPORTS
        </button>
        <SecHeader title={`Incident Report — ${selected.id}`} sub={`${selected.type} · ${selected.location}`} />

        {/* Incident summary bar */}
        <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
          <Badge text={selected.severity} color={getSeverityColor(selected.severity)} />
          <Badge text={selected.attackType === "digital" ? "💻 Digital" : "🚨 Physical"} color={selected.attackType === "digital" ? COLORS.accent : COLORS.high} />
          <Badge text={selected.status} color={selected.status === "Resolved" ? COLORS.low : COLORS.critical} />
          <span style={{ color:COLORS.subtext, fontSize:11, alignSelf:"center" }}>{formatTime(selected.reportedAt)} · Reported by {selected.reportedBy}</span>
        </div>

        {!analysis ? (
          <InfoBox color={COLORS.medium} icon="📄">Full incident report not yet available. Report is generated once the incident is resolved and reviewed by the Chief Engineer.</InfoBox>
        ) : (
          <div>
            {/* What Happened */}
            <ReportSection title="WHAT HAPPENED" color={COLORS.accent}>
              {analysis.whatHappened}
            </ReportSection>

            {/* Response Evaluation */}
            <ReportSection title="RESPONSE EVALUATION" color={COLORS.medium}>
              {analysis.responseEvaluation}
            </ReportSection>

            {/* What Went Well */}
            <ReportSection title="WHAT WENT WELL" color={COLORS.low}>
              {analysis.wentWell}
            </ReportSection>

            {/* What Could Improve */}
            <ReportSection title="WHAT COULD IMPROVE" color={COLORS.high}>
              {analysis.couldImprove}
            </ReportSection>

            {/* Zero Trust Assessment */}
            <ReportSection title="ZERO TRUST ASSESSMENT" color={COLORS.accent}>
              {analysis.zeroTrustAssessment}
            </ReportSection>

            {/* Rating */}
            <div style={{ ...S.card, border:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", gap:20 }}>
              <div style={{ fontSize:40, fontWeight:"bold", color: analysis.rating.startsWith("9") || analysis.rating.startsWith("10") ? COLORS.low : analysis.rating.startsWith("8") || analysis.rating.startsWith("7") ? COLORS.medium : COLORS.critical }}>
                {analysis.rating.split(" ")[0]}
              </div>
              <div>
                <div style={{ color:COLORS.muted, fontSize:10, letterSpacing:2, marginBottom:4 }}>OVERALL INCIDENT MANAGEMENT RATING</div>
                <div style={{ color:COLORS.subtext, fontSize:12 }}>{analysis.rating.split("—")[1]?.trim()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <SecHeader title="Incident Reports" sub="Full post-incident analysis — response evaluation and improvement recommendations" />
      <InfoBox color={COLORS.accent} icon="📄">Reports are attached to each pre-determined attack scenario. Click any incident to view the full analysis.</InfoBox>

      {allInc.length === 0 && <div style={{ color:COLORS.subtext, fontSize:13 }}>No incidents recorded yet.</div>}

      {allInc.map(inc => {
        const analysis = getAnalysis(inc);
        return (
          <div key={inc.id} style={{ ...S.card, marginBottom:12, cursor:"pointer", borderLeft:`3px solid ${getSeverityColor(inc.severity)}` }}
            onClick={() => setSelected(inc)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                  <span style={{ color:COLORS.muted, fontSize:11 }}>{inc.id}</span>
                  <span style={{ color: inc.attackType === "digital" ? COLORS.accent : COLORS.high, fontSize:10 }}>
                    {inc.attackType === "digital" ? "💻 DIGITAL" : "🚨 PHYSICAL"}
                  </span>
                  {analysis && <span style={{ color:COLORS.low, fontSize:10, letterSpacing:1 }}>● REPORT AVAILABLE</span>}
                </div>
                <div style={{ color:COLORS.text, fontWeight:"bold", fontSize:14 }}>{inc.type}</div>
                <div style={{ color:COLORS.subtext, fontSize:12, marginTop:2 }}>📍 {inc.location} · {formatTime(inc.reportedAt)}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                <Badge text={inc.severity} color={getSeverityColor(inc.severity)} />
                <Badge text={inc.status} color={inc.status === "Resolved" ? COLORS.low : COLORS.critical} />
              </div>
            </div>
            {analysis && (
              <div style={{ color:COLORS.subtext, fontSize:12, borderTop:`1px solid ${COLORS.border}`, paddingTop:8, marginTop:4 }}>
                Rating: <span style={{ color:COLORS.accent, fontWeight:"bold" }}>{analysis.rating.split(" ")[0]}</span>
                <span style={{ marginLeft:12, color:COLORS.muted }}>→ Click to view full report</span>
              </div>
            )}
            {!analysis && (
              <div style={{ color:COLORS.muted, fontSize:11, borderTop:`1px solid ${COLORS.border}`, paddingTop:8, marginTop:4 }}>
                Report pending — incident under review
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ReportSection({ title, color, children }) {
  return (
    <div style={{ backgroundColor:`${color}08`, border:`1px solid ${color}25`, borderLeft:`3px solid ${color}`, borderRadius:3, padding:16, marginBottom:14 }}>
      <div style={{ color, fontSize:10, letterSpacing:2, marginBottom:8, fontWeight:"bold" }}>{title}</div>
      <div style={{ color:COLORS.text, fontSize:13, lineHeight:1.7 }}>{children}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DIRECTOR TABS
// ══════════════════════════════════════════════════════════════════════════════
function ExecutiveOverview({ incidents }) {
  const byType = { physical: incidents.filter(i=>i.attackType==="physical").length, digital: incidents.filter(i=>i.attackType==="digital").length };
  return (
    <div>
      <SecHeader title="Executive Overview" sub="GridShield Victoria — Network Status" />
      <div style={S.statGrid}>
        <StatCard label="Total Zones"     value="20"                                                 icon="🗺️" />
        <StatCard label="Total Locations" value="100"                                                icon="📍" />
        <StatCard label="Active Incidents" value={incidents.filter(i=>i.status==="Active").length}   icon="🚨" />
        <StatCard label="Physical Attacks" value={byType.physical}                                   icon="🚨" />
        <StatCard label="Digital Attacks"  value={byType.digital}                                    icon="💻" />
        <StatCard label="Resolved"         value={incidents.filter(i=>i.status==="Resolved").length} icon="✅" />
      </div>
      <div style={{marginTop:24}}>
        <SecHeader title="All Incidents — Overview" />
        <IncidentTable incidents={incidents} />
      </div>
    </div>
  );
}

function LockdownApprovals({ lockdowns, setLockdowns }) {
  const action = (id, status) => setLockdowns(prev=>prev.map(r=>r.id===id?{...r,status}:r));
  return (
    <div>
      <SecHeader title="Lockdown Approval Requests" sub="Submitted by Chief Engineers — requires your approval" />
      {lockdowns.length === 0 && <div style={{color:COLORS.subtext,fontSize:13}}>No pending requests.</div>}
      {lockdowns.map(r=>(
        <div key={r.id} style={{...S.card,marginBottom:14,borderLeft:`3px solid ${r.status==="Pending"?COLORS.medium:COLORS.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <div>
              <div style={{color:COLORS.text,fontWeight:"bold",fontSize:14}}>{r.zone}</div>
              <div style={{color:COLORS.subtext,fontSize:12,marginTop:2}}>{r.initiatedBy} · {formatTime(r.requestedAt)}</div>
            </div>
            <Badge text={r.status} color={r.status==="Pending"?COLORS.medium:r.status==="Approved"?COLORS.low:COLORS.critical} />
          </div>
          <p style={{color:COLORS.subtext,fontSize:13,marginBottom:12}}>{r.reason}</p>
          {r.status==="Pending" && (
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>action(r.id,"Approved")} style={{...S.btn,backgroundColor:COLORS.low,flex:1,color:"#000"}}>✅ APPROVE LOCKDOWN</button>
              <button onClick={()=>action(r.id,"Rejected")} style={{...S.btn,backgroundColor:COLORS.critical,flex:1}}>❌ REJECT</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CostBudget() {
  return (
    <div>
      <SecHeader title="Cost & Budget Overview" sub="GridShield Victoria — FY2026 Q1" />
      <SimpleTable
        headers={["Zone","Budget","Spent","Variance","Status"]}
        rows={MOCK_COST_DATA.map(c=>[
          c.zone,c.monthlyBudget,c.spent,
          <span key={c.zone} style={{color:c.variance.startsWith("+")?COLORS.low:COLORS.critical,fontWeight:"bold"}}>{c.variance}</span>,
          <Badge key={c.zone+"s"} text={c.status} color={c.status==="On Track"?COLORS.low:c.status==="Over Budget"?COLORS.critical:COLORS.medium} />,
        ])}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED
// ══════════════════════════════════════════════════════════════════════════════
function StatusBoard({ incidents, title }) {
  return (
    <div>
      <SecHeader title={title} sub={`${incidents.length} incidents`} />
      <IncidentTable incidents={incidents} />
    </div>
  );
}

function IncidentTable({ incidents }) {
  if (!incidents?.length) return <div style={{color:COLORS.subtext,fontSize:13}}>No incidents to display.</div>;
  return (
    <SimpleTable
      headers={["ID","Type","Location","Severity","Status","Reported By","Chain"]}
      rows={incidents.map(i=>[
        <span key={i.id} style={{color:COLORS.muted,fontSize:11}}>{i.id}</span>,
        <span key={i.id+"t"} style={{color:i.attackType==="digital"?COLORS.accent:COLORS.high,fontSize:12}}>{i.attackType==="digital"?"💻":"🚨"} {i.type}</span>,
        i.location,
        <Badge key={i.id+"s"} text={i.severity} color={getSeverityColor(i.severity)} />,
        <Badge key={i.id+"st"} text={i.status} color={i.status==="Active"?COLORS.critical:i.status==="Investigating"?COLORS.high:COLORS.low} />,
        <span key={i.id+"r"} style={{color:COLORS.subtext,fontSize:11}}>{i.reportedBy}</span>,
        <span key={i.id+"c"} style={{color:COLORS.muted,fontSize:10}}>{i.chain}</span>,
      ])}
    />
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead>
          <tr>{headers.map(h=><th key={h} style={{padding:"7px 12px",textAlign:"left",color:COLORS.muted,fontSize:10,letterSpacing:1,borderBottom:`1px solid ${COLORS.border}`}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(
            <tr key={i} style={{borderBottom:`1px solid ${COLORS.border}`}}>
              {row.map((cell,j)=><td key={j} style={{padding:"10px 12px",color:COLORS.text,verticalAlign:"middle"}}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SecHeader({ title, sub }) {
  return (
    <div style={{marginBottom:16}}>
      <h3 style={{color:COLORS.text,margin:0,fontSize:16,fontWeight:"bold"}}>{title}</h3>
      {sub&&<p style={{color:COLORS.subtext,margin:"4px 0 0",fontSize:12}}>{sub}</p>}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={S.statCard}>
      <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
      <div style={{color:COLORS.subtext,fontSize:10,letterSpacing:1,marginBottom:4}}>{label.toUpperCase()}</div>
      <div style={{color:COLORS.text,fontSize:24,fontWeight:"bold"}}>{value}</div>
    </div>
  );
}

function Pill({ label, value, alert }) {
  return (
    <div style={{backgroundColor:alert?"rgba(255,45,85,0.1)":COLORS.card,border:`1px solid ${alert?COLORS.critical:COLORS.border}`,borderRadius:3,padding:"5px 12px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{color:COLORS.muted,fontSize:9,letterSpacing:1}}>{label}</div>
      <div style={{color:alert?COLORS.critical:COLORS.accent,fontSize:13,fontWeight:"bold"}}>{value}</div>
    </div>
  );
}

function Badge({ text, color }) {
  return (
    <span style={{backgroundColor:`${color}22`,color,border:`1px solid ${color}44`,padding:"3px 9px",borderRadius:2,fontSize:11,fontWeight:"bold",whiteSpace:"nowrap"}}>{text}</span>
  );
}

function InfoBox({ color, icon, children }) {
  return (
    <div style={{backgroundColor:`${color}11`,border:`1px solid ${color}33`,borderLeft:`3px solid ${color}`,borderRadius:3,padding:"12px 14px",marginBottom:14}}>
      <div style={{color,fontSize:13}}>{icon} {children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{marginBottom:14}}>
      <label style={{color:COLORS.subtext,fontSize:10,letterSpacing:2,display:"block",marginBottom:7}}>{label}</label>
      {children}
    </div>
  );
}

function FGrid({ children }) {
  return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"0 16px"}}>{children}</div>;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  shell: { display:"flex", minHeight:"100vh", backgroundColor:COLORS.bg, fontFamily:"'Courier New',monospace", color:COLORS.text },
  sidebar: { width:220, flexShrink:0, backgroundColor:COLORS.surface, borderRight:`1px solid ${COLORS.border}`, display:"flex", flexDirection:"column", justifyContent:"space-between" },
  sidebarTop: { padding:"20px 0 0" },
  logo: { display:"flex", alignItems:"center", gap:10, padding:"0 18px 18px", borderBottom:`1px solid ${COLORS.border}` },
  userBadge: { display:"flex", alignItems:"center", gap:10, padding:"14px 18px", borderBottom:`1px solid ${COLORS.border}` },
  navBtn: { background:"none", border:"none", color:COLORS.subtext, textAlign:"left", padding:"10px 18px", cursor:"pointer", fontSize:12, transition:"all 0.1s", borderLeft:"3px solid transparent", width:"100%", letterSpacing:0.5 },
  navBtnActive: { color:COLORS.accent, backgroundColor:COLORS.accentGlow, borderLeft:`3px solid ${COLORS.accent}` },
  sidebarBot: { padding:"16px 18px", borderTop:`1px solid ${COLORS.border}` },
  logoutBtn: { backgroundColor:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:2, color:COLORS.subtext, padding:"7px 12px", fontSize:10, cursor:"pointer", letterSpacing:1, width:"100%" },
  main: { flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  topBar: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 26px", borderBottom:`1px solid ${COLORS.border}`, backgroundColor:COLORS.surface, flexShrink:0 },
  content: { flex:1, overflowY:"auto", padding:26 },
  card: { backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:4, padding:18, marginBottom:0 },
  formCard: { backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:4, padding:22, marginBottom:20 },
  statGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12 },
  statCard: { backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:4, padding:18, textAlign:"center" },
  input: { backgroundColor:COLORS.bg, border:`1px solid ${COLORS.border}`, borderRadius:2, color:COLORS.text, padding:"9px 11px", fontSize:13, fontFamily:"'Courier New',monospace", outline:"none", width:"100%", boxSizing:"border-box" },
  btn: { backgroundColor:COLORS.accent, border:"none", borderRadius:2, color:"#000", padding:"10px 16px", fontSize:11, fontWeight:"bold", fontFamily:"'Courier New',monospace", letterSpacing:1, cursor:"pointer" },
  filterBtn: { backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:2, color:COLORS.subtext, padding:"6px 11px", fontSize:10, cursor:"pointer", letterSpacing:1 },
  filterBtnOn: { backgroundColor:COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, color:COLORS.accent },
};
