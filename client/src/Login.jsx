import { useState } from "react";
import { COLORS, ROLE_LABELS, ROLE_ICONS, DEMO_ACCOUNTS } from "./constants";

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showCreds, setShowCreds] = useState(false);

  const handleLogin = () => {
    setError("");
    const account = DEMO_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password.trim()
    );
    if (!account) {
      setError("Invalid email or password. Check the demo credentials below.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(account); }, 900);
  };

  return (
    <div style={S.page}>
      <div style={S.grid} />

      <div style={S.wrap}>
        {/* Logo */}
        <div style={S.logoRow}>
          <span style={{ fontSize:44 }}>⚡</span>
          <div>
            <div style={S.brand}>GRIDSHIELD</div>
            <div style={S.brandSub}>Victoria Critical Infrastructure Operations</div>
          </div>
        </div>

        {/* Zero Trust banner */}
        <div style={S.ztBanner}>
          <span style={S.pulse} />
          ZERO TRUST — TRUST NO ONE · VERIFY EVERYTHING · ALL ACCESS LOGGED
        </div>

        {/* Form */}
        <div style={S.form}>
          <label style={S.lbl}>EMAIL ADDRESS</label>
          <input
            style={S.input}
            type="email"
            placeholder="name@gridshield.vic.gov.au"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            autoComplete="off"
          />

          <label style={{ ...S.lbl, marginTop:16 }}>ACCESS CODE</label>
          <input
            style={S.input}
            type="password"
            placeholder="GS_XX_XXXXX#2026"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />

          {error && <div style={S.error}>⚠ {error}</div>}

          <button onClick={handleLogin} disabled={loading} style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
            {loading ? "AUTHENTICATING…" : "AUTHENTICATE →"}
          </button>
        </div>

        {/* Demo credentials toggle */}
        <button onClick={() => setShowCreds(v => !v)} style={S.credToggle}>
          {showCreds ? "▲ HIDE DEMO CREDENTIALS" : "▼ SHOW DEMO CREDENTIALS"}
        </button>

        {showCreds && (
          <div style={S.credTable}>
            <div style={S.credHeader}>
              <span style={{ flex:1 }}>ROLE</span>
              <span style={{ flex:2 }}>EMAIL</span>
              <span style={{ flex:2 }}>PASSWORD</span>
            </div>
            {DEMO_ACCOUNTS.map(a => (
              <div key={a.id} style={S.credRow} onClick={() => { setEmail(a.email); setPassword(a.password); }}>
                <span style={{ flex:1, color: COLORS.accent }}>{ROLE_ICONS[a.role]} {ROLE_LABELS[a.role]}</span>
                <span style={{ flex:2, color: COLORS.text, fontSize:11 }}>{a.email}</span>
                <span style={{ flex:2, color: COLORS.medium, fontSize:11 }}>{a.password}</span>
              </div>
            ))}
            <div style={{ color: COLORS.muted, fontSize:10, marginTop:8, textAlign:"center" }}>
              Click any row to auto-fill
            </div>
          </div>
        )}

        <div style={S.footer}>
          🔒 Unauthorised access is a criminal offence under the Victorian Critical Infrastructure Act 2021
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
      `}</style>
    </div>
  );
}

const S = {
  page: { minHeight:"100vh", backgroundColor:COLORS.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Courier New',monospace", position:"relative", overflow:"hidden" },
  grid: { position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)`, backgroundSize:"44px 44px", pointerEvents:"none" },
  wrap: { width:"100%", maxWidth:500, padding:"36px 32px", backgroundColor:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:4, boxShadow:`0 0 80px rgba(0,229,255,0.06)`, position:"relative", zIndex:1, animation:"fadeIn 0.4s ease" },
  logoRow: { display:"flex", alignItems:"center", gap:14, marginBottom:24 },
  brand: { color:COLORS.accent, fontSize:26, fontWeight:"bold", letterSpacing:6, lineHeight:1 },
  brandSub: { color:COLORS.subtext, fontSize:11, letterSpacing:1, marginTop:3 },
  ztBanner: { display:"flex", alignItems:"center", gap:8, backgroundColor:"rgba(0,229,255,0.05)", border:`1px solid rgba(0,229,255,0.18)`, borderRadius:2, padding:"7px 12px", fontSize:9, color:COLORS.accent, letterSpacing:2, marginBottom:24 },
  pulse: { width:6, height:6, borderRadius:"50%", backgroundColor:COLORS.accent, boxShadow:`0 0 8px ${COLORS.accent}`, flexShrink:0, animation:"pulse 2s infinite" },
  form: { display:"flex", flexDirection:"column" },
  lbl: { color:COLORS.subtext, fontSize:10, letterSpacing:2, marginBottom:7, display:"block" },
  input: { backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:2, color:COLORS.text, padding:"11px 13px", fontSize:13, fontFamily:"'Courier New',monospace", outline:"none", width:"100%", boxSizing:"border-box", letterSpacing:1 },
  error: { color:COLORS.critical, fontSize:11, marginTop:10, padding:"8px 10px", backgroundColor:"rgba(255,45,85,0.08)", border:`1px solid rgba(255,45,85,0.2)`, borderRadius:2 },
  btn: { marginTop:18, backgroundColor:COLORS.accent, border:"none", borderRadius:2, color:"#000", padding:13, fontSize:11, fontWeight:"bold", fontFamily:"'Courier New',monospace", letterSpacing:3, cursor:"pointer", transition:"opacity 0.15s" },
  credToggle: { marginTop:18, backgroundColor:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:2, color:COLORS.subtext, padding:"7px 12px", fontSize:10, cursor:"pointer", letterSpacing:2, width:"100%" },
  credTable: { marginTop:10, backgroundColor:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:2, padding:14 },
  credHeader: { display:"flex", color:COLORS.muted, fontSize:9, letterSpacing:2, marginBottom:10, paddingBottom:8, borderBottom:`1px solid ${COLORS.border}` },
  credRow: { display:"flex", alignItems:"center", padding:"7px 0", borderBottom:`1px solid ${COLORS.border}`, cursor:"pointer", transition:"background 0.1s" },
  footer: { textAlign:"center", color:COLORS.muted, fontSize:10, marginTop:20, letterSpacing:0.5 },
};
