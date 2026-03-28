import { useState, useEffect, useRef } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { PRESET_ATTACKS, INITIAL_INCIDENTS, INITIAL_SHIFTS, INITIAL_LOCKDOWNS } from "./constants";

export default function App() {
  const [account, setAccount]         = useState(null);
  const [incidents, setIncidents]     = useState(INITIAL_INCIDENTS);
  const [shifts, setShifts]           = useState(INITIAL_SHIFTS);
  const [lockdowns, setLockdowns]     = useState(INITIAL_LOCKDOWNS);
  const [pendingAttack, setPendingAttack] = useState(null); // current cinematic overlay
  const timersRef = useRef([]);

  // Schedule preset attacks after login
  useEffect(() => {
    if (!account) return;
    // Clear old timers
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];

    PRESET_ATTACKS.forEach(attack => {
      const t = setTimeout(() => {
        // Add to incidents
        const newInc = {
          id: `INC-${String(Math.floor(Math.random()*9000)+1000)}`,
          attackType: attack.type,
          location: attack.location,
          type: attack.title,
          severity: attack.severity,
          status: "Active",
          reportedBy: attack.detectedBy,
          reportedAt: new Date().toISOString(),
          chain: attack.type === "physical" ? "Security → Chief → Director" : "Junior → Chief → Director",
          response: null,
          responseSteps: attack.responseSteps,
          outcome: attack.outcome,
          description: attack.description,
          aiSummary: null,
          presetId: attack.id,
        };
        setIncidents(prev => [newInc, ...prev]);
        setPendingAttack({ ...attack, incidentId: newInc.id });
      }, attack.scheduledAt);
      timersRef.current.push(t);
    });

    return () => timersRef.current.forEach(t => clearTimeout(t));
  }, [account]);

  const handleLogout = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    setAccount(null);
    setIncidents(INITIAL_INCIDENTS);
    setLockdowns(INITIAL_LOCKDOWNS);
    setPendingAttack(null);
  };

  if (!account) return <Login onLogin={setAccount} />;

  return (
    <Dashboard
      account={account}
      incidents={incidents}
      setIncidents={setIncidents}
      shifts={shifts}
      setShifts={setShifts}
      lockdowns={lockdowns}
      setLockdowns={setLockdowns}
      pendingAttack={pendingAttack}
      setPendingAttack={setPendingAttack}
      onLogout={handleLogout}
    />
  );
}
