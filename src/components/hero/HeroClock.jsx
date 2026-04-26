import { useEffect, useState } from "react";

// Buenos Aires (UTC-3, no DST) — render a stable timestamp without
// relying on the visitor's local timezone. Editorial detail.
function bsAsTime() {
  const now = new Date();
  const buenosAires = new Date(
    now.getTime() + (now.getTimezoneOffset() - 180) * 60000,
  );
  const hh = String(buenosAires.getHours()).padStart(2, "0");
  const mm = String(buenosAires.getMinutes()).padStart(2, "0");
  const ss = String(buenosAires.getSeconds()).padStart(2, "0");
  return { hh, mm, ss };
}

export default function HeroClock() {
  const [t, setT] = useState(bsAsTime());

  useEffect(() => {
    const id = setInterval(() => setT(bsAsTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-charcoal/70">
      <span>Buenos Aires</span>
      <span className="text-charcoal/30">/</span>
      <span>34°36′S 58°22′O</span>
      <span className="text-charcoal/30">/</span>
      <span className="tabular-nums text-charcoal">
        {t.hh}:{t.mm}
        <span className="text-charcoal/40">:{t.ss}</span> ART
      </span>
    </div>
  );
}
