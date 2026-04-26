/* Shared print components — used by all 3 print reports */

const PrintMast = ({ archetype, period }) => (
  <div className="p-mast">
    <div className="brand" style={{display:'flex', alignItems:'center', gap:10}}>
      <div className="brand-mark">M</div>
      <div>
        <div className="brand-name">Meridian Family Office</div>
        <div className="brand-sub">Private Wealth · Cash Flow Exhibit</div>
      </div>
    </div>
    <div className="meta">
      <div>Confidential · Prepared 04.25.2026</div>
      <div><strong>{archetype}</strong> · {period}</div>
    </div>
  </div>
);

const PrintFooter = ({ archetype, page }) => (
  <div className="p-footer">
    <div>
      Prepared by Meridian Family Office for the use of the named client only. Figures are unaudited and consolidated across personal,
      trust, and investment-entity accounts. Projected 2026 values reflect base-case advisor assumptions.
    </div>
    <div style={{textAlign:'right', fontFamily:'var(--mono)', letterSpacing:'0.16em'}}>
      {archetype.toUpperCase()} · {page}
    </div>
  </div>
);

const PrintRunners = ({ left, right }) => (
  <>
    <div className="page-runner top-left">{left}</div>
    <div className="page-runner top-right">{right}</div>
  </>
);

/* Print-tuned drilldown — non-interactive, all collapsed */
function PrintDrilldown({ items, total }) {
  return (
    <div>
      {items.map((it, i) => {
        const pct = (it.value / total) * 100;
        return (
          <div className="drill-row" key={i}>
            <span className="name">
              <span style={{ width: 9, height: 9, background: it.color, display: 'inline-block' }}></span>
              {it.name}
            </span>
            <span className="bar-wrap"><span className="bar" style={{ width: pct + '%', background: it.color }}></span></span>
            <span className="pct">{pct.toFixed(1)}%</span>
            <span className="amt">{fmt.full(it.value)}</span>
          </div>
        );
      })}
      <div style={{display:'flex', justifyContent:'space-between', padding:'8px 4px 0', borderTop:'1px solid var(--ink-700)', marginTop:2, fontWeight:600, fontSize:'9pt'}}>
        <span>Total Outflows</span>
        <span style={{fontVariantNumeric:'tabular-nums'}}>{fmt.full(total)}</span>
      </div>
    </div>
  );
}

window.PrintMast = PrintMast;
window.PrintFooter = PrintFooter;
window.PrintRunners = PrintRunners;
window.PrintDrilldown = PrintDrilldown;
