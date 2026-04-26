/* Multi-Generational Family — print-style report with entity consolidation */

function ReportMultiGen() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const monthly = [
    { m: "JAN", in: 2.85e6, out: 2.42e6, net: 0.43e6 },
    { m: "FEB", in: 2.71e6, out: 2.31e6, net: 0.40e6 },
    { m: "MAR", in: 4.20e6, out: 5.92e6, net: -1.72e6 },
    { m: "APR", in: 3.10e6, out: 8.40e6, net: -5.30e6 },
    { m: "MAY", in: 2.94e6, out: 2.65e6, net: 0.29e6 },
    { m: "JUN", in: 4.40e6, out: 5.10e6, net: -0.70e6 },
    { m: "JUL", in: 2.92e6, out: 2.68e6, net: 0.24e6 },
    { m: "AUG", in: 2.78e6, out: 2.66e6, net: 0.12e6 },
    { m: "SEP", in: 4.20e6, out: 5.05e6, net: -0.85e6 },
    { m: "OCT", in: 2.96e6, out: 2.71e6, net: 0.25e6 },
    { m: "NOV", in: 2.84e6, out: 2.59e6, net: 0.25e6 },
    { m: "DEC", in: 6.20e6, out: 7.40e6, net: -1.20e6 },
  ];

  const totalIn = monthly.reduce((s, m) => s + m.in, 0);
  const totalOut = monthly.reduce((s, m) => s + m.out, 0);
  const totalNet = totalIn - totalOut;

  const inflowSources = [
    { name: "Trust Distributions (G1 → G2/G3)", color: "#0e1620", values: [0.85,0.82,0.92,0.88,0.85,0.92,0.88,0.85,0.92,0.88,0.85,1.40].map(v=>v*1e6) },
    { name: "Investment Income (Munis, Divs)",  color: "#4a5468", values: [1.10,1.05,1.45,1.18,1.12,1.45,1.18,1.10,1.42,1.20,1.14,1.65].map(v=>v*1e6) },
    { name: "PE / Hedge Fund Distributions",     color: "#1f4a4f", values: [0.32,0.28,0.85,0.42,0.38,1.05,0.40,0.36,0.92,0.42,0.38,1.85].map(v=>v*1e6) },
    { name: "Operating Co. Dividends (G1 stake)",color: "#8a6a2e", values: [0.42,0.42,0.78,0.42,0.42,0.78,0.42,0.42,0.78,0.42,0.42,1.10].map(v=>v*1e6) },
    { name: "Royalty & Other",                    color: "#d8c393", values: [0.16,0.14,0.20,0.20,0.17,0.20,0.04,0.05,0.16,0.04,0.05,0.20].map(v=>v*1e6) },
  ];

  const spending = [
    { name: "Federal & State Taxes",     color: "#0e1620", value: 16.80e6, children: [
      { name: "G1 Personal — Q1–Q4 Estimated", value: 6.20e6 },
      { name: "Family Trust (Generation-Skipping) — fiduciary tax", value: 4.40e6 },
      { name: "G2 Children's Trusts (3) — fiduciary tax", value: 3.10e6 },
      { name: "Property Tax — 4 residences", value: 1.85e6 },
      { name: "Foundation Excise Tax", value: 0.45e6 },
      { name: "GST/Gift Tax — annual planning", value: 0.80e6 },
    ]},
    { name: "Lifestyle & Household — by Residence", color: "#4a5468", value: 8.95e6, children: [
      { name: "New York (primary) — household & operations", value: 2.40e6, tag: "G1" },
      { name: "Palm Beach — household & operations", value: 1.85e6, tag: "G1" },
      { name: "Aspen — household & operations", value: 1.20e6, tag: "Family" },
      { name: "London — household & operations", value: 1.10e6, tag: "G2" },
      { name: "Travel — Aviation (fractional + charter)", value: 1.40e6 },
      { name: "Yacht — operations, crew, dockage", value: 0.65e6 },
      { name: "Discretionary household spend (consolidated)", value: 0.35e6 },
    ]},
    { name: "Distributions to G2 / G3 (Beneficiaries)", color: "#1f4a4f", value: 6.40e6, children: [
      { name: "Asher Jr. (G2) — annual income distribution", value: 1.85e6 },
      { name: "Laine (G2) — annual income distribution", value: 1.85e6 },
      { name: "Theo (G2) — annual income distribution", value: 1.50e6 },
      { name: "Grandchildren (4 G3) — UTMA + 529 funding", value: 0.92e6 },
      { name: "Annual Exclusion Gifts (12 family members)", value: 0.28e6, tag: "$23K x 12" },
    ]},
    { name: "Philanthropy",              color: "#8a6a2e", value: 5.80e6, children: [
      { name: "Asher Family Foundation — 5% MRD payout", value: 4.50e6, tag: "Required" },
      { name: "DAF — direct family giving", value: 0.85e6 },
      { name: "Direct gifts (museum, university, hospital)", value: 0.45e6 },
    ]},
    { name: "Debt Service",              color: "#6b7587", value: 2.85e6, children: [
      { name: "NY Residence — Mortgage", value: 0.92e6 },
      { name: "Palm Beach — Mortgage", value: 0.55e6 },
      { name: "London — Mortgage", value: 0.48e6 },
      { name: "Securities-Backed Line — Interest", value: 0.65e6 },
      { name: "Yacht financing", value: 0.25e6 },
    ]},
    { name: "Capital Calls (Private)",   color: "#a3823f", value: 4.20e6, children: [
      { name: "PE funds (consolidated across entities)", value: 2.85e6 },
      { name: "Real Estate co-investments", value: 0.95e6 },
      { name: "Direct family investments", value: 0.40e6 },
    ]},
    { name: "Family Office & Professional", color: "#d8c393", value: 1.90e6, children: [
      { name: "Family office staff & overhead", value: 0.95e6 },
      { name: "Tax & accounting (multi-entity)", value: 0.45e6 },
      { name: "Legal, trustee fees, custodian", value: 0.50e6 },
    ]},
  ];

  // Entity consolidation matrix
  const entities = [
    { name: "G1 Personal (J. & E. Asher)",       inflows: 9.20e6,  outflows: 12.80e6, net: -3.60e6 },
    { name: "Asher Family Trust (GST-exempt)",   inflows: 14.50e6, outflows: 11.20e6, net: 3.30e6 },
    { name: "G2 Children's Trusts (×3)",         inflows: 6.80e6,  outflows: 6.10e6,  net: 0.70e6 },
    { name: "Asher Family Foundation (501c3)",   inflows: 5.20e6,  outflows: 4.95e6,  net: 0.25e6 },
    { name: "Investment LLCs (×4)",              inflows: 5.20e6,  outflows: 6.40e6,  net: -1.20e6 },
    { name: "Family Office LLC",                 inflows: 1.20e6,  outflows: 1.45e6,  net: -0.25e6 },
  ];

  return (
    <div className="report compact">
      <div className="runner left">MERIDIAN · CONSOLIDATED CASH FLOW</div>
      <div className="runner right">FY 2025 · 6-ENTITY CONSOLIDATION</div>

      <Mast archetype="Asher Family · Multi-Generational" period="Calendar Year 2025 / 2026 Outlook" />

      <div className="headline">
        <div>
          <h1>Stewarding <em>$420M</em> across three generations and six entities.</h1>
          <p className="lede">
            Consolidated view across G1 personal, the GST-exempt family trust, three G2 children's trusts, the family foundation,
            and four investment LLCs. Cash flow is structurally negative on a personal-name basis (−$3.6M) but offset by trust-level
            accumulation. Foundation MRD satisfied; G2/G3 distributions met estate-planning targets.
          </p>
        </div>
        <div className="client-card">
          <div className="kv"><span className="k">Reporting Entities</span><span className="v">6 entities · 14 accounts</span></div>
          <div className="kv"><span className="k">Net Worth (Est.)</span><span className="v">$420M consolidated</span></div>
          <div className="kv"><span className="k">Generations Active</span><span className="v">G1 (2) · G2 (3) · G3 (4)</span></div>
          <div className="kv"><span className="k">Lead Advisor</span><span className="v">D. Yates · K. Park, Trust Counsel</span></div>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><span className="label">Consolidated Inflows</span><span className="num">{fmt.m(totalIn)}</span><span className="delta pos">▲ {fmt.pct(4.8)} vs. 2024</span></div>
        <div className="kpi"><span className="label">Consolidated Outflows</span><span className="num">{fmt.m(totalOut)}</span><span className="delta neg">▲ {fmt.pct(6.1)} vs. 2024</span></div>
        <div className="kpi"><span className="label">Net Movement</span><span className="num neg num-neg">{fmt.m(Math.abs(totalNet))}</span><span className="delta muted">funded by liquid reserves</span></div>
        <div className="kpi"><span className="label">Family Distributions</span><span className="num gold">{fmt.m(6.40e6)}</span><span className="delta">G2 (×3), G3 (×4)</span></div>
      </div>

      {/* Entity consolidation table */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Entity-Level Consolidation</h2></div>
          <div className="right">FY 2025 · USD millions</div>
        </div>
        <div className="frame">
          <table className="table">
            <thead><tr><th>Entity</th><th className="num">Inflows</th><th className="num">Outflows</th><th className="num">Net</th><th>Composition</th></tr></thead>
            <tbody>
              {entities.map((e, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{e.name}</td>
                  <td className="num">{fmt.m(e.inflows)}</td>
                  <td className="num">{fmt.m(e.outflows)}</td>
                  <td className="num" style={{ color: e.net < 0 ? "var(--neg)" : "var(--pos)" }}>{e.net < 0 ? "(" : ""}{fmt.m(Math.abs(e.net))}{e.net < 0 ? ")" : ""}</td>
                  <td style={{ width: 220 }}>
                    <HStackBar items={[
                      { name: "Inflows", value: e.inflows, color: "#2f6b3a" },
                      { name: "Outflows", value: e.outflows, color: "#8a3a2b" },
                    ]} height={8} />
                  </td>
                </tr>
              ))}
              <tr className="total">
                <td>Consolidated</td>
                <td className="num">{fmt.m(totalIn)}</td>
                <td className="num">{fmt.m(totalOut)}</td>
                <td className="num neg">({fmt.m(Math.abs(totalNet))})</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Monthly Inflows, Outflows & Net</h2></div>
          <div className="right">Consolidated · 2025</div>
        </div>
        <div className="frame">
          <div className="legend" style={{ marginBottom: 8 }}>
            <span className="item"><span className="sw" style={{ background: "#2f6b3a" }}></span>Inflows</span>
            <span className="item"><span className="sw" style={{ background: "#8a3a2b" }}></span>Outflows</span>
            <span className="item"><span className="sw" style={{ background: "#0e1620", borderRadius: "50%" }}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChart data={monthly} />
        </div>
      </div>

      <div className="section col-7-5">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 03</span><h2>Sources of Inflows</h2></div>
            <div className="right">By source · monthly</div>
          </div>
          <div className="frame">
            <StackedMonthlyChart months={months} sources={inflowSources} />
            <div className="legend" style={{ marginTop: 10 }}>
              {inflowSources.map((s) => (
                <span className="item" key={s.name}><span className="sw" style={{ background: s.color }}></span>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 04</span><h2>Composition</h2></div>
            <div className="right">FY 2025</div>
          </div>
          <div className="frame" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Donut
              data={inflowSources.map((s) => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))}
              size={210}
            />
            <div className="stack-legend" style={{ width: "100%" }}>
              {inflowSources.map((s) => {
                const v = s.values.reduce((a,b)=>a+b,0);
                return (
                  <span className="item" key={s.name}>
                    <span className="sw" style={{ background: s.color }}></span>
                    <span style={{ color: "var(--ink-700)" }}>{s.name}</span>
                    <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums", color: "var(--ink-900)", fontWeight: 500 }}>{fmt.m(v)}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Outflows by Category — Drilldown</h2></div>
          <div className="right">Click row to expand</div>
        </div>
        <div className="frame">
          <DrilldownList items={spending} total={totalOut} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 8px 4px", borderTop: "1px solid var(--ink-700)", marginTop: 4 }}>
            <span style={{ fontWeight: 600 }}>Total Outflows</span>
            <span style={{ fontWeight: 600 }}>{fmt.full(totalOut)}</span>
          </div>
        </div>
      </div>

      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 06</span><h2>Tax Cash Flow — Multi-Entity</h2></div>
            <div className="right">Federal + State + Local</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead><tr><th>Source</th><th className="num">Federal</th><th className="num">State / Local</th><th className="num">Total</th></tr></thead>
              <tbody>
                <tr><td>G1 Personal estimated payments (4Q)</td><td className="num">$4.85M</td><td className="num">$1.35M</td><td className="num">$6.20M</td></tr>
                <tr><td>Family Trust — fiduciary tax</td><td className="num">$3.40M</td><td className="num">$1.00M</td><td className="num">$4.40M</td></tr>
                <tr><td>G2 Trusts (3) — fiduciary tax</td><td className="num">$2.45M</td><td className="num">$0.65M</td><td className="num">$3.10M</td></tr>
                <tr><td>Foundation excise tax (1.39%)</td><td className="num">$0.45M</td><td className="num">—</td><td className="num">$0.45M</td></tr>
                <tr><td>Property tax (4 residences)</td><td className="num">—</td><td className="num">$1.85M</td><td className="num">$1.85M</td></tr>
                <tr><td>Gift / GST tax</td><td className="num">$0.80M</td><td className="num">—</td><td className="num">$0.80M</td></tr>
                <tr className="total"><td>Total</td><td className="num">$11.95M</td><td className="num">$4.85M</td><td className="num">$16.80M</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 07</span><h2>Debt Service & Credit Lines</h2></div>
            <div className="right">Across residences & entities</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead><tr><th>Facility</th><th>Balance</th><th>Rate</th><th>Annual</th></tr></thead>
              <tbody>
                <tr><td><div style={{ fontWeight: 500 }}>NY Residence Mortgage</div><div className="muted" style={{ fontSize: 10 }}>Trust-held</div></td><td>$13.8M</td><td>5.20% fixed</td><td className="num">$0.92M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>Palm Beach Mortgage</div></td><td>$8.4M</td><td>4.95% fixed</td><td className="num">$0.55M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>London Residence</div><div className="muted" style={{ fontSize: 10 }}>GBP-denominated</div></td><td>£5.8M</td><td>SONIA + 1.05</td><td className="num">$0.48M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>Securities-Backed Line</div><div className="muted" style={{ fontSize: 10 }}>LLC-pledged</div></td><td>$22M / $75M</td><td>SOFR + 0.75</td><td className="num">$0.65M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>Yacht Financing</div></td><td>$5.2M</td><td>5.85% fixed</td><td className="num">$0.25M</td></tr>
                <tr className="total"><td>Aggregate</td><td>$57.0M+</td><td>—</td><td className="num">$2.85M</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 08</span><h2>Philanthropic Giving</h2></div>
            <div className="right">Foundation + Direct</div>
          </div>
          <div className="frame">
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 12 }}>
              <div>
                <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Total Charitable Outflow</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1, marginTop: 4 }}>$5.80M</div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Foundation MRD: $4.50M (5.00%) · satisfied</div>
              </div>
              <Sparkline values={[3.8, 4.2, 4.6, 4.9, 5.2, 5.5, 5.8]} width={140} height={40} stroke="#8a6a2e" />
            </div>
            <table className="table">
              <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
              <tbody>
                <tr><td>Asher Family Foundation — operating grants</td><td className="num">$3.40M</td><td className="num">Cash</td></tr>
                <tr><td>Asher Family Foundation — multi-year pledges (yr 3 of 5)</td><td className="num">$1.10M</td><td className="num">Cash</td></tr>
                <tr><td>Family DAF — direct giving</td><td className="num">$0.85M</td><td className="num">In-kind</td></tr>
                <tr><td>Met Museum · Trustee Annual</td><td className="num">$0.20M</td><td className="num">Cash</td></tr>
                <tr><td>Sloan Kettering · Memorial gift</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
                <tr><td>Recurring giving (16 grantees)</td><td className="num">$0.10M</td><td className="num">Cash</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 09</span><h2>Net Cash & Forward Forecast</h2></div>
            <div className="right">Consolidated reserves · 2024 → 2026</div>
          </div>
          <div className="frame">
            <NetCashLine
              points={[
                { x: "2024 Q1", y: 28e6 }, { x: "Q2", y: 26e6 }, { x: "Q3", y: 27e6 }, { x: "Q4", y: 31e6 },
                { x: "2025 Q1", y: 29e6 }, { x: "Q2", y: 27e6 }, { x: "Q3", y: 26e6 }, { x: "Q4", y: 24e6 },
                { x: "2026 Q1", y: 23e6 }, { x: "Q2", y: 22e6 }, { x: "Q3", y: 23e6 }, { x: "Q4", y: 26e6 },
              ]}
              forecastFromIndex={8}
            />
            <div className="legend" style={{ marginTop: 8 }}>
              <span className="item"><span className="sw" style={{ background: "#0e1620" }}></span>Liquid reserves</span>
              <span className="item"><span className="sw" style={{ background: "#a3823f" }}></span>Projected</span>
              <span className="item"><span className="sw" style={{ background: "#f0e6cf" }}></span>Forecast period</span>
            </div>
            <p className="advisor-note" style={{ marginTop: 12 }}>
              "G1 personal-level shortfall of $3.6M was funded from trust distributions; we recommend evaluating a $4–6M annual
              distribution increase from the Family Trust to normalize the structural gap rather than drawing reserves."
              <span className="who">— Trust counsel recommendation</span>
            </p>
          </div>
        </div>
      </div>

      <Footer pageNo="01 / 01" archetype="Asher Family · Multi-Generational" />
    </div>
  );
}

window.ReportMultiGen = ReportMultiGen;
