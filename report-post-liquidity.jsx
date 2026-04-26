/* Post-Liquidity Entrepreneur — dense dashboard layout */

function ReportPostLiquidity() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  // Heavy quarterly-tax pattern + concentrated wire from sale escrow release in Q2
  const monthly = [
    { m: "JAN", in: 0.85e6, out: 0.92e6, net: -0.07e6 },
    { m: "FEB", in: 0.78e6, out: 0.81e6, net: -0.03e6 },
    { m: "MAR", in: 1.20e6, out: 4.20e6, net: -3.00e6 },
    { m: "APR", in: 0.92e6, out: 8.40e6, net: -7.48e6 },  // Apr 15 + sale tax true-up
    { m: "MAY", in: 1.10e6, out: 1.05e6, net: 0.05e6 },
    { m: "JUN", in: 12.40e6, out: 4.60e6, net: 7.80e6 },  // Escrow release + Q2 est tax
    { m: "JUL", in: 1.15e6, out: 0.95e6, net: 0.20e6 },
    { m: "AUG", in: 0.98e6, out: 0.88e6, net: 0.10e6 },
    { m: "SEP", in: 1.40e6, out: 4.10e6, net: -2.70e6 },
    { m: "OCT", in: 1.25e6, out: 1.15e6, net: 0.10e6 },
    { m: "NOV", in: 1.18e6, out: 1.08e6, net: 0.10e6 },
    { m: "DEC", in: 2.40e6, out: 6.50e6, net: -4.10e6 },  // PE call wave + DAF
  ];

  const totalIn = monthly.reduce((s, m) => s + m.in, 0);
  const totalOut = monthly.reduce((s, m) => s + m.out, 0);
  const totalNet = totalIn - totalOut;

  const inflowSources = [
    { name: "Investment Income (Treasuries, MMF)", color: "#0e1620", values: [0.45,0.42,0.48,0.46,0.51,0.49,0.55,0.52,0.58,0.61,0.59,0.64].map(v=>v*1e6) },
    { name: "Dividends",                            color: "#4a5468", values: [0.18,0.16,0.42,0.18,0.20,0.45,0.21,0.18,0.48,0.20,0.21,0.52].map(v=>v*1e6) },
    { name: "PE / VC Distributions",                color: "#8a6a2e", values: [0.05,0.05,0.18,0.10,0.22,0.36,0.18,0.10,0.16,0.28,0.20,0.84].map(v=>v*1e6) },
    { name: "Sale Escrow Releases (one-time)",      color: "#b89657", values: [0,0,0,0,0,11.0,0,0,0,0,0,0].map(v=>v*1e6) },
    { name: "Other (royalty, advisory)",            color: "#d8c393", values: [0.17,0.15,0.12,0.18,0.17,0.10,0.21,0.18,0.18,0.16,0.18,0.40].map(v=>v*1e6) },
  ];

  const spending = [
    { name: "Federal & State Taxes",     color: "#0e1620", value: 18.40e6, children: [
      { name: "Q1 Estimated (Apr 15)", value: 4.20e6, tag: "Federal + CA" },
      { name: "Sale True-up Payment (Apr 15)", value: 4.20e6, tag: "Long-term cap gains" },
      { name: "Q2 Estimated (Jun 16)", value: 3.85e6 },
      { name: "Q3 Estimated (Sep 15)", value: 3.65e6 },
      { name: "Q4 Estimated (Jan 15, 2026)", value: 1.95e6 },
      { name: "Property & Local", value: 0.55e6 },
    ]},
    { name: "Capital Deployment",         color: "#1f4a4f", value: 11.20e6, children: [
      { name: "Private Equity Calls (8 funds)", value: 5.60e6 },
      { name: "Venture Capital Calls (12 funds)", value: 2.80e6 },
      { name: "Direct Investments (3)", value: 1.50e6, tag: "Series A/B" },
      { name: "Real Estate JV — Equity Funded", value: 1.30e6 },
    ]},
    { name: "Lifestyle & Household",      color: "#4a5468", value: 3.20e6, children: [
      { name: "Primary Residence (Atherton) — operations", value: 0.62e6 },
      { name: "NYC Pied-à-terre — operations", value: 0.38e6 },
      { name: "Travel — Private Aviation (NetJets card)", value: 0.95e6 },
      { name: "Personal & Discretionary", value: 1.25e6 },
    ]},
    { name: "Philanthropy",               color: "#8a6a2e", value: 4.20e6, children: [
      { name: "DAF — Founders' Pledge funded with appreciated stock", value: 3.50e6, tag: "In-kind" },
      { name: "Stanford GSB — Endowed Scholarship", value: 0.40e6 },
      { name: "Climate-focused recurring grants", value: 0.30e6 },
    ]},
    { name: "Debt Service",               color: "#6b7587", value: 1.35e6, children: [
      { name: "Securities-Backed Line — Interest", value: 0.62e6, tag: "$18M drawn / $50M facility" },
      { name: "Atherton Mortgage", value: 0.48e6, tag: "4.85% fixed" },
      { name: "NYC Pied-à-terre Mortgage", value: 0.25e6 },
    ]},
    { name: "Professional & Other",       color: "#d8c393", value: 1.49e6, children: [
      { name: "Tax & accounting (sale-year complexity)", value: 0.55e6 },
      { name: "Legal & estate planning", value: 0.42e6 },
      { name: "Insurance — life, umbrella, art", value: 0.32e6 },
      { name: "Family office services", value: 0.20e6 },
    ]},
  ];

  // Inflow drilldown — by source with line-item breakdown
  const inflowDrilldown = [
    { name: "Investment Income (Treasuries, MMF)", color: "#0e1620", value: inflowSources[0].values.reduce((a,b)=>a+b,0), children: [
      { name: "T-Bill Roll Yield (3·6 mo ladder)", value: 3.10e6, tag: "Brokered" },
      { name: "Government MMF — SWVXX", value: 1.85e6, tag: "Daily liquidity" },
      { name: "Short-Duration Treasury ETF (SGOV)", value: 1.35e6 },
      { name: "Municipal Bond Interest", value: 0.30e6, tag: "Tax-exempt" },
    ]},
    { name: "Dividends", color: "#4a5468", value: inflowSources[1].values.reduce((a,b)=>a+b,0), children: [
      { name: "Public Equity — Index ETFs", value: 1.85e6, tag: "Qualified" },
      { name: "Concentrated Stock — Q1/Q3 dividends", value: 1.04e6, tag: "Pre-diversification" },
      { name: "International Equity Sleeve", value: 0.50e6 },
    ]},
    { name: "PE / VC Distributions", color: "#8a6a2e", value: inflowSources[2].values.reduce((a,b)=>a+b,0), children: [
      { name: "PE Fund Distributions (8 funds)", value: 1.85e6, tag: "Mostly recallable" },
      { name: "VC Fund Distributions (12 funds)", value: 0.62e6, tag: "Cash + stock" },
      { name: "Direct Investment Exits", value: 0.45e6 },
    ]},
    { name: "Sale Escrow Releases (one-time)", color: "#b89657", value: 11.00e6, children: [
      { name: "TechCo Acquisition — Tranche 2 (12 mo)", value: 8.50e6, tag: "Released Jun 2025" },
      { name: "Working Capital True-up (final)", value: 1.50e6, tag: "Net of indemnity" },
      { name: "Earnout Hit — Performance Threshold", value: 1.00e6 },
    ]},
    { name: "Other (royalty, advisory)", color: "#d8c393", value: inflowSources[4].values.reduce((a,b)=>a+b,0), children: [
      { name: "Board Compensation (3 boards)", value: 0.95e6 },
      { name: "Advisory Retainers", value: 0.62e6 },
      { name: "Royalties & Speaking", value: 0.63e6 },
    ]},
  ];

  // Outflow stacked monthly (mirrors inflow stack)
  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.18,0.16,3.65,8.20,0.20,3.85,0.18,0.16,3.65,0.20,0.18,1.95].map(v=>v*1e6) },
    { name: "Capital Deployment",         color: "#1f4a4f", values: [0.40,0.35,0.65,0.85,0.95,1.20,0.80,0.55,0.70,0.65,0.80,2.30].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.22,0.20,0.30,0.25,0.28,0.30,0.28,0.32,0.30,0.30,0.30,0.15].map(v=>v*1e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0,0,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,3.80].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.1125e6) },
    { name: "Professional & Other",       color: "#d8c393", values: [0.04,0.05,0.13,0.07,0.07,0.08,0.10,0.13,0.18,0.13,0.13,0.39].map(v=>v*1e6) },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",  custodian: "First Republic / JPM",  balance: 2.20e6,   yield: 0.10, tenor: "On demand", note: "Trust + 4 LLC ops accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings", custodian: "Meridian Pvt. Bank",    balance: 8.50e6,   yield: 4.25, tenor: "On demand", note: "Pledged to SBL · sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Gov't", custodian: "Schwab · SNVXX",         balance: 62.40e6,  yield: 4.85, tenor: "T+1 liquidity", note: "Primary liquidity sleeve", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",  custodian: "Brokered, multi-bank",   balance: 18.80e6,  yield: 5.05, tenor: "3·6·9·12 mo rungs", note: "Funds 2026 PE call schedule", color: "#a3823f" },
  ];

  const calls = [
    { m: "JAN", calls: 0.40e6, dist: 0.05e6 },
    { m: "FEB", calls: 0.35e6, dist: 0.05e6 },
    { m: "MAR", calls: 0.65e6, dist: 0.18e6 },
    { m: "APR", calls: 0.85e6, dist: 0.10e6 },
    { m: "MAY", calls: 0.95e6, dist: 0.22e6 },
    { m: "JUN", calls: 1.20e6, dist: 0.36e6 },
    { m: "JUL", calls: 0.80e6, dist: 0.18e6 },
    { m: "AUG", calls: 0.55e6, dist: 0.10e6 },
    { m: "SEP", calls: 0.70e6, dist: 0.16e6 },
    { m: "OCT", calls: 0.65e6, dist: 0.28e6 },
    { m: "NOV", calls: 0.80e6, dist: 0.20e6 },
    { m: "DEC", calls: 2.10e6, dist: 0.84e6 },
  ];

  return (
    <div className="report compact">
      <div className="runner left">MERIDIAN · ANNUAL CASH FLOW STATEMENT</div>
      <div className="runner right">FY 2025 / FY 2026 OUTLOOK</div>

      <Mast archetype="Reyes Trust · Post-Liquidity Entrepreneur" period="Calendar Year 2025 / 2026 Outlook" />

      <div className="headline">
        <div>
          <h1>Deploying <em>$190M</em> of liquidity, with tax-aware cadence.</h1>
          <p className="lede">
            Year one post-exit. The cash flow profile is dominated by deferred-gain tax obligations (Q2 sale true-up of $4.2M) and a
            disciplined capital-deployment ramp into private markets. Operating cash burn excluding deployment was modest at $9.2M;
            the bulk of "outflow" is investment funded — capital being put to work, not consumed.
          </p>
        </div>
        <div className="client-card">
          <div className="kv"><span className="k">Reporting Entity</span><span className="v">Reyes Revocable Trust + 4 LLCs</span></div>
          <div className="kv"><span className="k">Net Worth (Est.)</span><span className="v">$340M</span></div>
          <div className="kv"><span className="k">Liquidity Posture</span><span className="v">Deploying · 38% liquid</span></div>
          <div className="kv"><span className="k">Lead Advisor</span><span className="v">A. Bhatia, CFP®</span></div>
        </div>
      </div>

      <div className="kpi-strip">
        <div className="kpi"><span className="label">Total Inflows</span><span className="num">{fmt.m(totalIn)}</span><span className="delta muted">incl. $11.0M escrow release</span></div>
        <div className="kpi"><span className="label">Operating Outflows</span><span className="num">{fmt.m(24.44e6)}</span><span className="delta muted">excl. capital deployment</span></div>
        <div className="kpi"><span className="label">Capital Deployed</span><span className="num gold">{fmt.m(11.20e6)}</span><span className="delta">22% of $50M committed pace</span></div>
        <div className="kpi"><span className="label">Net Cash Movement</span><span className="num">{fmt.m(totalNet)}</span><span className="delta neg">{fmt.pct((totalNet/totalIn)*100)} of inflows</span></div>
      </div>

      {/* Cash Position Summary */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">CASH BALANCE WATERFALL</span><h2>Opening → Inflows → Outflows → Closing</h2></div>
          <div className="right">Calendar 2025 · YTD 2026</div>
        </div>
        <div className="frame">
          <CashBalanceWaterfall periods={[
            { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 168.00e6, inflows: totalIn, outflows: totalOut, closing: 158.00e6 },
            { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 158.00e6, inflows: 4.20e6, outflows: 9.80e6, closing: 152.40e6 },
          ]} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Monthly Inflows, Outflows & Net Position</h2></div>
          <div className="right">FY 2025 actual</div>
        </div>
        <div className="frame">
          <div className="legend" style={{ marginBottom: 8 }}>
            <span className="item"><span className="sw" style={{ background: "#2f6b3a" }}></span>Inflows (above zero)</span>
            <span className="item"><span className="sw" style={{ background: "#8a3a2b" }}></span>Outflows (below zero)</span>
            <span className="item"><span className="sw" style={{ background: "#0e1620", borderRadius: "50%" }}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChartSigned data={monthly} />
        </div>
      </div>

      <div className="section col-7-5">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 02</span><h2>Sources of Inflows · Stacked</h2></div>
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
            <div><span className="eyebrow">EXHIBIT 03</span><h2>Capital Calls vs. Distributions</h2></div>
            <div className="right">Private investments · 2025</div>
          </div>
          <div className="frame">
            <CallsDistributionsChart data={calls} />
            <div className="legend" style={{ marginTop: 6 }}>
              <span className="item"><span className="sw" style={{ background: "#2f6b3a" }}></span>Distributions received</span>
              <span className="item"><span className="sw" style={{ background: "#8a3a2b" }}></span>Capital calls funded</span>
            </div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 11.5, color: "var(--ink-700)" }}>
              <div><span className="muted" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Calls funded</span><div style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-900)" }}>$10.00M</div></div>
              <div><span className="muted" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Distributions received</span><div style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-900)" }}>$2.72M</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Inflow drilldown */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Inflows — Drilldown by Source</h2></div>
          <div className="right">Click row to expand · USD</div>
        </div>
        <div className="frame">
          <DrilldownList items={inflowDrilldown} total={totalIn} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 8px 4px", borderTop: "1px solid var(--ink-700)", marginTop: 4 }}>
            <span style={{ fontWeight: 600 }}>Total Inflows</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmt.full(totalIn)}</span>
          </div>
        </div>
      </div>

      {/* Outflows mirrored — stacked monthly + composition donut */}
      <div className="section col-7-5">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 05</span><h2>Outflows by Category — Monthly</h2></div>
            <div className="right">Plotted negative</div>
          </div>
          <div className="frame">
            <StackedMonthlySignedChart months={months} sources={outflowSources} sign={-1} />
            <div className="legend" style={{ marginTop: 10 }}>
              {outflowSources.map((s) => (
                <span className="item" key={s.name}><span className="sw" style={{ background: s.color }}></span>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 06</span><h2>Composition of Outflows</h2></div>
            <div className="right">FY 2025</div>
          </div>
          <div className="frame" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Donut
              data={outflowSources.map((s) => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))}
              size={210}
            />
            <div className="stack-legend" style={{ width: "100%" }}>
              {outflowSources.map((s) => {
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
          <div><span className="eyebrow">EXHIBIT 07</span><h2>Outflows — Drilldown by Line Item</h2></div>
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

      {/* Cash Instruments */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 08</span><h2>Cash & Liquidity Instruments</h2></div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <div className="frame">
          <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />
          <p className="advisor-note" style={{ marginTop: 14 }}>
            "92% of cash sits in government MMF and brokered CDs — yield-bearing but liquid. The CD ladder is sized to fund the
            2026 capital-call schedule without dipping into the SBL. We will not extend duration past 12 months given deployment cadence."
            <span className="who">— Treasury & deployment plan</span>
          </p>
        </div>
      </div>

      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 09</span><h2>Tax Cash Flow Detail</h2></div>
            <div className="right">Sale year — elevated</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead><tr><th>Period</th><th>Due</th><th className="num">Federal</th><th className="num">State (CA)</th><th className="num">Total</th></tr></thead>
              <tbody>
                <tr><td>Q1 Estimated</td><td>Apr 15, 2025</td><td className="num">$2.85M</td><td className="num">$1.35M</td><td className="num">$4.20M</td></tr>
                <tr><td>Sale True-up</td><td>Apr 15, 2025</td><td className="num">$2.95M</td><td className="num">$1.25M</td><td className="num">$4.20M</td></tr>
                <tr><td>Q2 Estimated</td><td>Jun 16, 2025</td><td className="num">$2.65M</td><td className="num">$1.20M</td><td className="num">$3.85M</td></tr>
                <tr><td>Q3 Estimated</td><td>Sep 15, 2025</td><td className="num">$2.50M</td><td className="num">$1.15M</td><td className="num">$3.65M</td></tr>
                <tr><td>Q4 Estimated</td><td>Jan 15, 2026</td><td className="num">$1.35M</td><td className="num">$0.60M</td><td className="num">$1.95M</td></tr>
                <tr className="subtle"><td>Local & Other</td><td>—</td><td className="num">—</td><td className="num">$0.55M</td><td className="num">$0.55M</td></tr>
                <tr className="total"><td>Total</td><td></td><td className="num">$12.30M</td><td className="num">$6.10M</td><td className="num">$18.40M</td></tr>
              </tbody>
            </table>
            <p className="advisor-note" style={{ marginTop: 14 }}>
              "Federal AMT and CA 13.3% combined drove a 38.6% effective rate on the deferred gain. The Apr 15 true-up is the largest
              single outflow of the year; we held it in T-bills for 11 months prior."
              <span className="who">— Tax planning note</span>
            </p>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 10</span><h2>Debt Service & Credit Lines</h2></div>
            <div className="right">As of 12.31.2025</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead><tr><th>Facility</th><th>Drawn / Limit</th><th>Rate</th><th>Annual</th></tr></thead>
              <tbody>
                <tr><td><div style={{ fontWeight: 500 }}>Securities-Backed Line</div><div className="muted" style={{ fontSize: 10 }}>Meridian Pvt. Bank · pledged Treasuries</div></td><td>$18M / $50M</td><td>SOFR + 0.65</td><td className="num">$0.62M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>Atherton Residence</div><div className="muted" style={{ fontSize: 10 }}>10-yr fixed</div></td><td>$8.4M</td><td>4.85%</td><td className="num">$0.48M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>NYC Pied-à-terre</div><div className="muted" style={{ fontSize: 10 }}>7/1 ARM</div></td><td>$3.6M</td><td>5.20%</td><td className="num">$0.25M</td></tr>
                <tr><td><div style={{ fontWeight: 500 }}>Art-Secured Facility</div><div className="muted" style={{ fontSize: 10 }}>Undrawn</div></td><td>$0 / $20M</td><td>SOFR + 1.10</td><td className="num">—</td></tr>
                <tr className="total"><td>Aggregate</td><td>$30.0M / $123.6M</td><td>—</td><td className="num">$1.35M</td></tr>
              </tbody>
            </table>
            <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--paper-2)", border: "1px solid var(--rule)" }}>
              <div className="muted" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>Liquidity Coverage</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>9.4×</div>
              <div className="muted" style={{ fontSize: 11 }}>Liquid assets ÷ aggregate drawn debt</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 11</span><h2>Philanthropic Giving</h2></div>
            <div className="right">Founders' Pledge — Year 1</div>
          </div>
          <div className="frame">
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 12 }}>
              <div>
                <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Total Charitable Outflow</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1, marginTop: 4 }}>$4.20M</div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>21% of gross cash inflows · 10-year pledge: $42M</div>
              </div>
              <Sparkline values={[0.2, 0.4, 0.5, 1.2, 2.1, 3.0, 4.2]} width={140} height={40} stroke="#8a6a2e" />
            </div>
            <table className="table">
              <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
              <tbody>
                <tr><td>Reyes Family Foundation (501c3)</td><td className="num">$2.20M</td><td className="num">In-kind equity</td></tr>
                <tr><td>Donor-Advised Fund — Schwab</td><td className="num">$1.30M</td><td className="num">In-kind equity</td></tr>
                <tr><td>Stanford GSB · Endowed Scholarship</td><td className="num">$0.40M</td><td className="num">Cash</td></tr>
                <tr><td>Climate-focused grants (8 grantees)</td><td className="num">$0.30M</td><td className="num">Cash</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div><span className="eyebrow">EXHIBIT 12</span><h2>Net Cash & Forward Forecast</h2></div>
            <div className="right">Liquid balance · 2024 → 2026</div>
          </div>
          <div className="frame">
            <NetCashLine
              points={[
                { x: "2024 Q1", y: 142e6 }, { x: "Q2", y: 138e6 }, { x: "Q3", y: 135e6 }, { x: "Q4", y: 168e6 },
                { x: "2025 Q1", y: 161e6 }, { x: "Q2", y: 168e6 }, { x: "Q3", y: 162e6 }, { x: "Q4", y: 158e6 },
                { x: "2026 Q1", y: 152e6 }, { x: "Q2", y: 145e6 }, { x: "Q3", y: 138e6 }, { x: "Q4", y: 132e6 },
              ]}
              forecastFromIndex={8}
            />
            <div className="legend" style={{ marginTop: 8 }}>
              <span className="item"><span className="sw" style={{ background: "#0e1620" }}></span>Liquid balance</span>
              <span className="item"><span className="sw" style={{ background: "#a3823f" }}></span>Projection (deployment-led decline)</span>
              <span className="item"><span className="sw" style={{ background: "#f0e6cf" }}></span>Forecast period</span>
            </div>
            <p className="advisor-note" style={{ marginTop: 12 }}>
              "By design — liquid balance declines as commitments are funded. Forecast assumes $36M of additional calls and $8M of
              distributions in 2026, holding the deployment glide path on schedule."
              <span className="who">— Deployment plan</span>
            </p>
          </div>
        </div>
      </div>

      {/* Forward Forecast — quarterly schedule */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 13</span><h2>Forward Forecast — 2026 Quarterly Schedule</h2></div>
          <div className="right">Base case · USD millions</div>
        </div>
        <div className="frame">
          <ForecastQuarterly
            quarters={[
              { label: "Q1 2026", opening: 158.00e6, closing: 152.40e6 },
              { label: "Q2 2026", opening: 152.40e6, closing: 154.20e6 },
              { label: "Q3 2026", opening: 154.20e6, closing: 156.80e6 },
              { label: "Q4 2026", opening: 156.80e6, closing: 161.50e6 },
            ]}
            inflowRows={[
              { name: "Investment Income (Treasuries, MMF)", color: "#0e1620", values: [1.85e6, 1.95e6, 2.05e6, 2.15e6] },
              { name: "Dividends",                            color: "#4a5468", values: [0.95e6, 1.10e6, 1.05e6, 1.20e6] },
              { name: "PE / VC Distributions",                color: "#8a6a2e", values: [0.85e6, 1.45e6, 1.20e6, 2.10e6] },
              { name: "Sale Escrow — Final Tranche",          color: "#b89657", values: [0, 0, 0, 4.00e6] },
              { name: "Other (royalty, advisory)",            color: "#d8c393", values: [0.55e6, 0.55e6, 0.55e6, 0.65e6] },
            ]}
            outflowRows={[
              { name: "Federal & State Taxes",   color: "#0e1620", values: [4.50e6, 1.20e6, 1.10e6, 0.85e6] },
              { name: "Capital Deployment",      color: "#1f4a4f", values: [2.40e6, 2.80e6, 2.60e6, 3.40e6] },
              { name: "Lifestyle & Household",   color: "#4a5468", values: [0.85e6, 0.85e6, 0.90e6, 0.90e6] },
              { name: "Philanthropy",            color: "#8a6a2e", values: [0.10e6, 0.20e6, 0.20e6, 3.50e6] },
              { name: "Debt Service",            color: "#6b7587", values: [0.34e6, 0.34e6, 0.34e6, 0.34e6] },
              { name: "Insurance & Other",       color: "#d8c393", values: [0.18e6, 0.18e6, 0.18e6, 0.20e6] },
            ]}
          />
          <p className="advisor-note" style={{ marginTop: 14 }}>
            "2026 normalizes to a stable run-rate after the sale year. Q4 escrow release retires the final earn-out; we recommend deploying it
            into the Q1 2027 PE call queue rather than holding cash through year-end."
            <span className="who">— Lead Advisor commentary</span>
          </p>
        </div>
      </div>

      {/* Tabular Monthly Cash Flow */}
      <div className="section">
        <div className="section-head">
          <div><span className="eyebrow">EXHIBIT 14</span><h2>Monthly Cash Flow Statement — Direct Method</h2></div>
          <div className="right">FY 2025 actual · USD per cell</div>
        </div>
        <div className="frame" style={{ overflowX: "auto" }}>
          <TabularCashFlow
            months={months}
            openingCash={168.00e6}
            closingCash={158.00e6}
            inflowRows={inflowSources}
            outflowRows={outflowSources}
          />
        </div>
      </div>

      <Footer pageNo="01 / 01" archetype="Reyes Trust · Post-Liquidity Entrepreneur" />
    </div>
  );
}

window.ReportPostLiquidity = ReportPostLiquidity;
