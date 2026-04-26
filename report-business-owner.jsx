/* Three cash flow reports for the design canvas. */

const Mast = ({ archetype, period }) => (
  <div className="mast">
    <div className="brand">
      <div className="brand-mark">M</div>
      <div>
        <div className="brand-name">Meridian Family Office</div>
        <div className="brand-sub">Private Wealth · Annual Cash Flow Statement &amp; Forecast</div>
      </div>
    </div>
    <div className="meta">
      <div>Confidential · Prepared 04.25.2026</div>
      <div><strong>{archetype}</strong> &nbsp;·&nbsp; {period}</div>
    </div>
  </div>
);

const Footer = ({ pageNo, archetype }) => (
  <div className="footnote">
    <div>
      Prepared by Meridian Family Office for the use of the named client only. Figures are unaudited and consolidated across personal,
      trust, and investment-entity accounts. Projected 2026 values reflect base-case advisor assumptions; refer to commentary for sensitivity.
    </div>
    <div style={{ textAlign: "right", fontFamily: "var(--mono)", letterSpacing: "0.18em" }}>
      {archetype.toUpperCase()} · {pageNo}
    </div>
  </div>
);

/* ===========================================================
   REPORT 1 — OPERATING BUSINESS OWNER
   Layout: Editorial / executive feel. Single-page report.
   =========================================================== */
function ReportBusinessOwner() {
  // 12 months 2025 actual + 12 months 2026 projection (showing 2025 fully, with 2026 forecast strip below)
  const months2025 = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const monthly = [
    { m: "JAN", in: 1.85e6, out: 1.42e6, net: 0.43e6 },
    { m: "FEB", in: 1.62e6, out: 1.31e6, net: 0.31e6 },
    { m: "MAR", in: 4.80e6, out: 3.92e6, net: 0.88e6 },   // Q1 distribution + Q1 estimated tax
    { m: "APR", in: 2.10e6, out: 5.40e6, net: -3.30e6 },  // April 15 tax pmt
    { m: "MAY", in: 1.74e6, out: 1.55e6, net: 0.19e6 },
    { m: "JUN", in: 5.40e6, out: 4.10e6, net: 1.30e6 },   // Q2 dist + Q2 tax
    { m: "JUL", in: 1.92e6, out: 1.48e6, net: 0.44e6 },
    { m: "AUG", in: 1.78e6, out: 1.66e6, net: 0.12e6 },
    { m: "SEP", in: 5.20e6, out: 4.05e6, net: 1.15e6 },   // Q3 dist + Q3 tax
    { m: "OCT", in: 1.96e6, out: 1.71e6, net: 0.25e6 },
    { m: "NOV", in: 1.84e6, out: 1.59e6, net: 0.25e6 },
    { m: "DEC", in: 9.20e6, out: 3.40e6, net: 5.80e6 },   // Year-end special distribution
  ];

  const totalIn = monthly.reduce((s, m) => s + m.in, 0);
  const totalOut = monthly.reduce((s, m) => s + m.out, 0);
  const totalNet = totalIn - totalOut;

  const inflowSources = [
    { name: "S-Corp Distributions",     color: "#0e1620", values: [0.15,0.12,3.20,0.18,0.14,3.80,0.20,0.16,3.60,0.22,0.18,7.40].map(v=>v*1e6) },
    { name: "W-2 Salary",                color: "#4a5468", values: Array(12).fill(0.9e6/1).map(()=>125000) },
    { name: "Investment Income",         color: "#8a6a2e", values: [0.42,0.38,0.45,0.62,0.48,0.51,0.56,0.49,0.52,0.58,0.51,0.68].map(v=>v*1e6) },
    { name: "K-1 Pass-throughs",         color: "#b89657", values: [0.16,0.14,0.21,0.43,0.19,0.18,0.22,0.21,0.21,0.20,0.21,0.24].map(v=>v*1e6) },
    { name: "Real Estate / Other",       color: "#d8c393", values: [0.16,0.16,0.31,0.16,0.20,0.18,0.22,0.20,0.22,0.20,0.22,0.21].map(v=>v*1e6) },
  ];

  const spending = [
    { name: "Federal & State Taxes",    color: "#0e1620", value: 14.20e6, children: [
      { name: "Q1 Estimated Payment (Apr 15)", value: 3.85e6, tag: "Federal + State"},
      { name: "Q2 Estimated Payment (Jun 16)", value: 3.60e6, tag: "Federal + State" },
      { name: "Q3 Estimated Payment (Sep 15)", value: 3.55e6, tag: "Federal + State" },
      { name: "Q4 Estimated Payment (Jan 15, 2026)", value: 2.10e6, tag: "Federal + State" },
      { name: "Withholding (Salary)", value: 0.62e6, tag: "W-2" },
      { name: "Property Tax (NY, FL, CO)", value: 0.48e6, tag: "Local" },
    ]},
    { name: "Lifestyle & Household",    color: "#4a5468", value: 4.85e6, children: [
      { name: "Household Staff & Operations (3 residences)", value: 1.62e6 },
      { name: "Travel — Private Aviation Charter", value: 1.15e6 },
      { name: "Travel — Other & Hospitality", value: 0.42e6 },
      { name: "Personal Services & Memberships", value: 0.51e6 },
      { name: "Discretionary Lifestyle Spend", value: 1.15e6 },
    ]},
    { name: "Debt Service",             color: "#6b7587", value: 2.40e6, children: [
      { name: "Primary Residence Mortgage (NY)", value: 0.88e6, tag: "5.4% fixed" },
      { name: "Vacation Home Mortgage (CO)", value: 0.42e6, tag: "6.1% fixed" },
      { name: "Securities-Backed Line — Interest", value: 0.74e6, tag: "SOFR + 0.85" },
      { name: "Operating Co. Owner Loan Service", value: 0.36e6 },
    ]},
    { name: "Philanthropy",             color: "#8a6a2e", value: 1.85e6, children: [
      { name: "DAF Contribution — Year-end (appreciated equity)", value: 1.25e6, tag: "In-kind" },
      { name: "Direct Gifts — University & Hospital", value: 0.45e6 },
      { name: "Recurring Foundations", value: 0.15e6 },
    ]},
    { name: "Capital Deployment",       color: "#a3823f", value: 6.15e6, children: [
      { name: "Private Equity — Capital Calls", value: 3.40e6, tag: "5 funds" },
      { name: "Private Credit — Calls", value: 1.10e6 },
      { name: "Direct Investment — Operating Co. Equity", value: 1.00e6 },
      { name: "Real Estate Co-investment", value: 0.65e6 },
    ]},
    { name: "Insurance & Other",        color: "#d8c393", value: 1.14e6, children: [
      { name: "Umbrella & Property Insurance", value: 0.42e6 },
      { name: "Life Insurance Premiums (ILIT)", value: 0.55e6 },
      { name: "Professional Fees (legal, accounting, advisory)", value: 0.17e6 },
    ]},
  ];

  // Outflow stacked monthly (mirrors inflow stack — same months, by category, plotted negative)
  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.62,0.59,2.10,3.85,0.62,2.45,0.62,0.59,2.30,0.62,0.59,0.25].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.36,0.34,0.42,0.39,0.42,0.45,0.42,0.45,0.40,0.44,0.40,0.36].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.20e6) },
    { name: "Capital Deployment",         color: "#a3823f", values: [0.10,0.20,1.20,0.85,0.40,1.00,0.15,0.50,1.10,0.50,0.45,2.00].map(v=>v*1e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0,0,0,0,0,0,0,0,0,0.05,0.55,1.25].map(v=>v*1e6) },
    { name: "Insurance & Other",          color: "#d8c393", values: [0.14,0.18,0.20,0.11,0.11,0.00,0.09,0.12,0.05,0.10,0.00,0.04].map(v=>v*1e6) },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",  custodian: "Trust Co. Bank",      balance: 1.45e6,  yield: 0.05, tenor: "On demand", note: "Daily ops · 3 accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings", custodian: "Meridian Pvt. Bank",  balance: 4.20e6,  yield: 4.10, tenor: "On demand", note: "Sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Gov't", custodian: "Schwab · SWVXX",       balance: 7.85e6,  yield: 4.85, tenor: "T+1 liquidity", note: "Tax-aware reserve", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",  custodian: "Multi-bank, brokered", balance: 3.10e6,  yield: 5.10, tenor: "3·6·9·12 mo rungs", note: "Q1–Q4 2026 maturities", color: "#a3823f" },
  ];

  const debtItems = [
    { name: "Primary Residence Mortgage", balance: "$11.4M", rate: "5.40%", payment: "$73K / mo", lender: "Trust Co. Bank" },
    { name: "Vacation Home Mortgage",     balance: "$4.8M",  rate: "6.10%", payment: "$35K / mo", lender: "Trust Co. Bank" },
    { name: "Securities-Backed Line",     balance: "$24.5M", rate: "SOFR + 0.85", payment: "Interest only", lender: "Meridian Pvt. Bank" },
    { name: "Art-Secured Credit Facility", balance: "$0 / $15M avail.", rate: "SOFR + 1.10", payment: "—", lender: "Meridian Pvt. Bank" },
  ];

  // Inflow drilldown — by source, with line-item breakdown
  const inflows = inflowSources.map((s) => ({
    name: s.name,
    color: s.color,
    value: s.values.reduce((a, b) => a + b, 0),
  }));
  const inflowDrilldown = [
    { name: "S-Corp Distributions", color: "#0e1620", value: inflows[0].value, children: [
      { name: "Q1 Distribution (Mar 14)", value: 3.20e6, tag: "Apex Industries" },
      { name: "Q2 Distribution (Jun 13)", value: 3.80e6, tag: "Apex Industries" },
      { name: "Q3 Distribution (Sep 12)", value: 3.60e6, tag: "Apex Industries" },
      { name: "Year-End Special (Dec 18)", value: 7.40e6, tag: "Apex Industries" },
      { name: "Other Pro-Rata Distributions", value: 0.99e6 },
    ]},
    { name: "W-2 Salary", color: "#4a5468", value: inflows[1].value, children: [
      { name: "Base Salary — CEO (Apex Industries)", value: 1.20e6, tag: "Monthly · Net of withholding shown elsewhere" },
      { name: "Performance Bonus — Q4 2025", value: 0.30e6, tag: "Paid Dec" },
    ]},
    { name: "Investment Income", color: "#8a6a2e", value: inflows[2].value, children: [
      { name: "Dividends — Public Equity", value: 2.85e6, tag: "Qualified" },
      { name: "Interest — Fixed Income & MMF", value: 1.95e6, tag: "Taxable" },
      { name: "Municipal Bond Interest", value: 0.85e6, tag: "Tax-exempt" },
      { name: "Realized Gains — Tax Loss Harvested", value: 0.55e6 },
    ]},
    { name: "K-1 Pass-throughs", color: "#b89657", value: inflows[3].value, children: [
      { name: "PE Fund Distributions (5 funds)", value: 1.85e6 },
      { name: "Private Credit Distributions", value: 0.42e6 },
      { name: "Real Estate Partnership K-1s", value: 0.33e6 },
    ]},
    { name: "Real Estate / Other", color: "#d8c393", value: inflows[4].value, children: [
      { name: "Net Rental Income — Manhattan Properties", value: 1.45e6, tag: "3 units" },
      { name: "Net Rental Income — Aspen", value: 0.42e6, tag: "Seasonal" },
      { name: "Royalties & Misc.", value: 0.55e6 },
    ]},
  ];

  return (
    <div className="report" style={{ fontFamily: "var(--sans)" }}>
      <div className="runner left">MERIDIAN · ANNUAL CASH FLOW STATEMENT</div>
      <div className="runner right">FY 2025 ACTUAL · FY 2026 PROJECTED</div>

      <Mast archetype="The Asher Family · Operating Business Owner" period="Calendar Year 2025 / 2026 Outlook" />

      <div className="headline">
        <div>
          <h1>A year of <em>concentrated income</em>, with discipline applied to deployment.</h1>
          <p className="lede">
            Net after-tax cash flow of <strong>$15.18M</strong> reflects three S-Corp distributions and a year-end special.
            Tax obligations remain the dominant outflow at 46% of total spending. Capital deployment was front-loaded into Q1–Q3 to align
            with private investment commitments. Reserve cushion held above the 12-month operating threshold throughout the year.
          </p>
        </div>
        <div className="client-card">
          <div className="kv"><span className="k">Reporting Entity</span><span className="v">Asher Family · 7 entities consolidated</span></div>
          <div className="kv"><span className="k">Net Worth (Est.)</span><span className="v">$285M</span></div>
          <div className="kv"><span className="k">Liquidity Posture</span><span className="v">Conservative · 14 mo runway</span></div>
          <div className="kv"><span className="k">Lead Advisor</span><span className="v">P. Marchetti, CFA</span></div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="kpi-strip">
        <div className="kpi">
          <span className="label">Total Inflows · 2025</span>
          <span className="num">{fmt.m(totalIn)}</span>
          <span className="delta pos">▲ {fmt.pct(11.4)} vs. 2024</span>
        </div>
        <div className="kpi">
          <span className="label">Total Outflows · 2025</span>
          <span className="num">{fmt.m(totalOut)}</span>
          <span className="delta neg">▲ {fmt.pct(8.2)} vs. 2024</span>
        </div>
        <div className="kpi">
          <span className="label">Net After-Tax Cash Flow</span>
          <span className="num gold">{fmt.m(totalNet)}</span>
          <span className="delta pos">▲ {fmt.pct(22.7)} vs. 2024</span>
        </div>
        <div className="kpi">
          <span className="label">Effective Tax Cash Rate</span>
          <span className="num">37.6%</span>
          <span className="delta">vs. 38.1% prior year</span>
        </div>
      </div>

      {/* Cash Balance Waterfall — opening → +inflows → −outflows → closing */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">CASH BALANCE WATERFALL</span>
            <h2>Opening → Inflows → Outflows → Closing</h2>
          </div>
          <div className="right">Calendar 2025 · YTD 2026</div>
        </div>
        <div className="frame">
          <CashBalanceWaterfall periods={[
            { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 11.40e6, inflows: totalIn, outflows: totalOut, closing: 18.60e6 },
            { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 18.60e6, inflows: 9.85e6, outflows: 11.55e6, closing: 16.90e6 },
          ]} />
        </div>
      </div>

      {/* Inflows vs outflows — signed (outflows below zero) */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 01</span>
            <h2>Monthly Inflows, Outflows & Net Position</h2>
          </div>
          <div className="right">FY 2025 actual · USD millions</div>
        </div>
        <div className="frame">
          <div className="legend" style={{ marginBottom: 8 }}>
            <span className="item"><span className="sw" style={{ background: "#2f6b3a" }}></span>Inflows (above zero)</span>
            <span className="item"><span className="sw" style={{ background: "#8a3a2b" }}></span>Outflows (below zero)</span>
            <span className="item"><span className="sw" style={{ background: "#0e1620", borderRadius: "50%" }}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChartSigned data={monthly} />
        </div>
        <p className="advisor-note" style={{ marginTop: 16 }}>
          “April’s negative net position is structural — the Q1 estimated payment lands without a matching distribution. We over-reserved by
          $2.1M to absorb it without drawing on the SBL. December’s special distribution funded the year-end DAF and PE call schedule.”
          <span className="who">— Lead Advisor commentary</span>
        </p>
      </div>

      <div className="section col-7-5">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 02</span>
              <h2>Sources of Inflows</h2>
            </div>
            <div className="right">By source · monthly</div>
          </div>
          <div className="frame">
            <StackedMonthlyChart months={months2025} sources={inflowSources} />
            <div className="legend" style={{ marginTop: 10 }}>
              {inflowSources.map((s) => (
                <span className="item" key={s.name}><span className="sw" style={{ background: s.color }}></span>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 03</span>
              <h2>Composition of Income</h2>
            </div>
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

      {/* Inflow drilldown by source */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 04</span>
            <h2>Inflows — Drilldown by Source</h2>
          </div>
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

      {/* Outflows — stacked monthly + composition donut (mirrors inflows view) */}
      <div className="section col-7-5">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 05</span>
              <h2>Outflows by Category — Monthly</h2>
            </div>
            <div className="right">By category · plotted negative</div>
          </div>
          <div className="frame">
            <StackedMonthlySignedChart months={months2025} sources={outflowSources} sign={-1} />
            <div className="legend" style={{ marginTop: 10 }}>
              {outflowSources.map((s) => (
                <span className="item" key={s.name}><span className="sw" style={{ background: s.color }}></span>{s.name}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 06</span>
              <h2>Composition of Outflows</h2>
            </div>
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

      {/* Spending drilldown */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 07</span>
            <h2>Outflows — Drilldown by Line Item</h2>
          </div>
          <div className="right">Click row to expand · USD</div>
        </div>
        <div className="frame">
          <DrilldownList items={spending} total={totalOut} />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 8px 4px", borderTop: "1px solid var(--ink-700)", marginTop: 4 }}>
            <span style={{ fontWeight: 600 }}>Total Outflows</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmt.full(totalOut)}</span>
          </div>
        </div>
      </div>

      {/* Cash Instruments */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 08</span>
            <h2>Cash & Liquidity Instruments</h2>
          </div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <div className="frame">
          <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />
          <p className="advisor-note" style={{ marginTop: 14 }}>
            "Reserve mix is conservative and laddered. Government MMF carries the operating buffer; brokered CDs lock yield through
            mid-2026 ahead of expected rate cuts. We can extend the ladder by 6–12 months if the FOMC pivots earlier than dot-plot."
            <span className="who">— Treasury management</span>
          </p>
        </div>
      </div>

      {/* Tax detail + Debt service */}
      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 09</span>
              <h2>Tax Cash Flow Detail</h2>
            </div>
            <div className="right">Estimated · Federal + State</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Due Date</th>
                  <th className="num">Federal</th>
                  <th className="num">State (NY/FL)</th>
                  <th className="num">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Q1 2025</td><td>Apr 15, 2025</td><td className="num">$3.05M</td><td className="num">$0.80M</td><td className="num">$3.85M</td></tr>
                <tr><td>Q2 2025</td><td>Jun 16, 2025</td><td className="num">$2.85M</td><td className="num">$0.75M</td><td className="num">$3.60M</td></tr>
                <tr><td>Q3 2025</td><td>Sep 15, 2025</td><td className="num">$2.80M</td><td className="num">$0.75M</td><td className="num">$3.55M</td></tr>
                <tr><td>Q4 2025</td><td>Jan 15, 2026</td><td className="num">$1.65M</td><td className="num">$0.45M</td><td className="num">$2.10M</td></tr>
                <tr className="subtle"><td>Withholding</td><td>—</td><td className="num">$0.45M</td><td className="num">$0.17M</td><td className="num">$0.62M</td></tr>
                <tr className="subtle"><td>Property Tax</td><td>—</td><td className="num">—</td><td className="num">$0.48M</td><td className="num">$0.48M</td></tr>
                <tr className="total"><td>Total Tax Outflow</td><td></td><td className="num">$10.80M</td><td className="num">$3.40M</td><td className="num">$14.20M</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 10</span>
              <h2>Debt Service & Credit Lines</h2>
            </div>
            <div className="right">As of 12.31.2025</div>
          </div>
          <div className="frame">
            <table className="table">
              <thead>
                <tr>
                  <th>Facility</th>
                  <th>Balance</th>
                  <th>Rate</th>
                  <th>Service</th>
                </tr>
              </thead>
              <tbody>
                {debtItems.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{d.name}</div>
                      <div className="muted" style={{ fontSize: 10, letterSpacing: "0.06em" }}>{d.lender}</div>
                    </td>
                    <td>{d.balance}</td>
                    <td>{d.rate}</td>
                    <td>{d.payment}</td>
                  </tr>
                ))}
                <tr className="total"><td>Aggregate Debt Service</td><td className="num">$40.7M</td><td>—</td><td className="num">$2.40M / yr</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Philanthropy + Net cash position */}
      <div className="section cols-2">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 11</span>
              <h2>Philanthropic Giving</h2>
            </div>
            <div className="right">FY 2025</div>
          </div>
          <div className="frame">
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 12 }}>
              <div>
                <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Total Charitable Outflow</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1, marginTop: 4 }}>$1.85M</div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>3.7% of gross income · vs. 5% target</div>
              </div>
              <Sparkline values={[0.95, 1.10, 1.32, 1.41, 1.55, 1.70, 1.85]} width={140} height={40} stroke="#8a6a2e" />
            </div>
            <table className="table">
              <thead>
                <tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr>
              </thead>
              <tbody>
                <tr><td>Asher Family DAF (Schwab)</td><td className="num">$1.25M</td><td className="num">In-kind equity</td></tr>
                <tr><td>Yale University · Endowed Chair Pledge (yr 2 of 5)</td><td className="num">$0.30M</td><td className="num">Cash</td></tr>
                <tr><td>NewYork-Presbyterian · Cardiology</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
                <tr><td>Recurring foundations (12 grantees)</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow">EXHIBIT 12</span>
              <h2>Net Cash Position & Forward Forecast</h2>
            </div>
            <div className="right">2024 actual → 2026 projected</div>
          </div>
          <div className="frame">
            <NetCashLine
              points={[
                { x: "2024 Q1", y: 8.2e6 },
                { x: "Q2",      y: 7.6e6 },
                { x: "Q3",      y: 9.1e6 },
                { x: "Q4",      y: 11.4e6 },
                { x: "2025 Q1", y: 12.0e6 },
                { x: "Q2",      y: 13.0e6 },
                { x: "Q3",      y: 14.4e6 },
                { x: "Q4",      y: 18.6e6 },
                { x: "2026 Q1", y: 17.9e6 },
                { x: "Q2",      y: 19.4e6 },
                { x: "Q3",      y: 21.0e6 },
                { x: "Q4",      y: 24.5e6 },
              ]}
              forecastFromIndex={8}
            />
            <div className="legend" style={{ marginTop: 8 }}>
              <span className="item"><span className="sw" style={{ background: "#0e1620" }}></span>Actual cash on hand</span>
              <span className="item"><span className="sw" style={{ background: "#a3823f" }}></span>Base-case projection</span>
              <span className="item"><span className="sw" style={{ background: "#f0e6cf" }}></span>Forecast period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forward Forecast — quarterly schedule by source/category */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 13</span>
            <h2>Forward Forecast — 2026 Quarterly Schedule</h2>
          </div>
          <div className="right">Base case · USD millions</div>
        </div>
        <div className="frame">
          <ForecastQuarterly
            quarters={[
              { label: "Q1 2026", opening: 18.60e6, closing: 17.90e6 },
              { label: "Q2 2026", opening: 17.90e6, closing: 19.40e6 },
              { label: "Q3 2026", opening: 19.40e6, closing: 21.00e6 },
              { label: "Q4 2026", opening: 21.00e6, closing: 24.50e6 },
            ]}
            inflowRows={[
              { name: "S-Corp Distributions", color: "#0e1620", values: [3.40e6, 4.00e6, 3.80e6, 7.80e6] },
              { name: "W-2 Salary",            color: "#4a5468", values: [0.42e6, 0.42e6, 0.42e6, 0.42e6] },
              { name: "Investment Income",     color: "#8a6a2e", values: [1.45e6, 1.65e6, 1.55e6, 1.80e6] },
              { name: "K-1 Pass-throughs",     color: "#b89657", values: [0.62e6, 0.85e6, 0.70e6, 0.75e6] },
              { name: "Real Estate / Other",   color: "#d8c393", values: [0.65e6, 0.62e6, 0.66e6, 0.65e6] },
            ]}
            outflowRows={[
              { name: "Federal & State Taxes",  color: "#0e1620", values: [4.20e6, 3.95e6, 3.80e6, 2.40e6] },
              { name: "Lifestyle & Household",  color: "#4a5468", values: [1.20e6, 1.30e6, 1.25e6, 1.30e6] },
              { name: "Debt Service",           color: "#6b7587", values: [0.62e6, 0.62e6, 0.62e6, 0.62e6] },
              { name: "Capital Deployment",     color: "#a3823f", values: [0.85e6, 0.95e6, 0.90e6, 1.10e6] },
              { name: "Philanthropy",           color: "#8a6a2e", values: [0.05e6, 0.05e6, 0.10e6, 1.50e6] },
              { name: "Insurance & Other",      color: "#d8c393", values: [0.30e6, 0.27e6, 0.25e6, 0.30e6] },
            ]}
          />
          <p className="advisor-note" style={{ marginTop: 14 }}>
            "Forecast holds the same distribution cadence and tax structure as 2025; capital deployment normalizes as 2024-vintage PE funds
            move into harvest. Year-end DAF gift is preserved at the 2025 level pending portfolio review."
            <span className="who">— Lead Advisor commentary</span>
          </p>
        </div>
      </div>

      {/* Tabular Monthly Cash Flow — direct method */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">EXHIBIT 14</span>
            <h2>Monthly Cash Flow Statement — Direct Method</h2>
          </div>
          <div className="right">FY 2025 actual · USD thousands per cell</div>
        </div>
        <div className="frame" style={{ overflowX: "auto" }}>
          <TabularCashFlow
            months={months2025}
            openingCash={11.40e6}
            closingCash={18.60e6}
            inflowRows={inflowSources}
            outflowRows={outflowSources}
          />
        </div>
      </div>

      <Footer pageNo="01 / 01" archetype="Asher Family · Operating Business Owner" />
    </div>
  );
}

window.ReportBusinessOwner = ReportBusinessOwner;
