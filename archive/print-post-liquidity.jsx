/* Print-formatted Post-Liquidity Entrepreneur — 8.5 x 11, 5 pages */

function PrintPostLiquidity() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const monthly = [
    { m: "JAN", in: 0.85e6, out: 0.92e6, net: -0.07e6 },
    { m: "FEB", in: 0.78e6, out: 0.81e6, net: -0.03e6 },
    { m: "MAR", in: 1.20e6, out: 4.20e6, net: -3.00e6 },
    { m: "APR", in: 0.92e6, out: 8.40e6, net: -7.48e6 },
    { m: "MAY", in: 1.10e6, out: 1.05e6, net: 0.05e6 },
    { m: "JUN", in: 12.40e6, out: 4.60e6, net: 7.80e6 },
    { m: "JUL", in: 1.15e6, out: 0.95e6, net: 0.20e6 },
    { m: "AUG", in: 0.98e6, out: 0.88e6, net: 0.10e6 },
    { m: "SEP", in: 1.40e6, out: 4.10e6, net: -2.70e6 },
    { m: "OCT", in: 1.25e6, out: 1.15e6, net: 0.10e6 },
    { m: "NOV", in: 1.18e6, out: 1.08e6, net: 0.10e6 },
    { m: "DEC", in: 2.40e6, out: 6.50e6, net: -4.10e6 },
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

  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.18,0.16,3.65,8.20,0.20,3.85,0.18,0.16,3.65,0.20,0.18,1.95].map(v=>v*1e6) },
    { name: "Capital Deployment",         color: "#1f4a4f", values: [0.40,0.35,0.65,0.85,0.95,1.20,0.80,0.55,0.70,0.65,0.80,2.30].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.22,0.20,0.30,0.25,0.28,0.30,0.28,0.32,0.30,0.30,0.30,0.15].map(v=>v*1e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0,0,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,3.80].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.1125e6) },
    { name: "Professional & Other",       color: "#d8c393", values: [0.04,0.05,0.13,0.07,0.07,0.08,0.10,0.13,0.18,0.13,0.13,0.39].map(v=>v*1e6) },
  ];

  const calls = [
    { m: "JAN", calls: 0.40e6, dist: 0.05e6 }, { m: "FEB", calls: 0.35e6, dist: 0.05e6 },
    { m: "MAR", calls: 0.65e6, dist: 0.18e6 }, { m: "APR", calls: 0.85e6, dist: 0.10e6 },
    { m: "MAY", calls: 0.95e6, dist: 0.22e6 }, { m: "JUN", calls: 1.20e6, dist: 0.36e6 },
    { m: "JUL", calls: 0.80e6, dist: 0.18e6 }, { m: "AUG", calls: 0.55e6, dist: 0.10e6 },
    { m: "SEP", calls: 0.70e6, dist: 0.16e6 }, { m: "OCT", calls: 0.65e6, dist: 0.28e6 },
    { m: "NOV", calls: 0.80e6, dist: 0.20e6 }, { m: "DEC", calls: 2.10e6, dist: 0.84e6 },
  ];

  const spending = [
    { name: "Federal & State Taxes",     color: "#0e1620", value: 18.40e6 },
    { name: "Capital Deployment",         color: "#1f4a4f", value: 11.20e6 },
    { name: "Philanthropy",               color: "#8a6a2e", value: 4.20e6 },
    { name: "Lifestyle & Household",      color: "#4a5468", value: 3.20e6 },
    { name: "Professional & Other",       color: "#d8c393", value: 1.49e6 },
    { name: "Debt Service",               color: "#6b7587", value: 1.35e6 },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",  custodian: "First Republic / JPM",  balance: 2.20e6,   yield: 0.10, tenor: "On demand", note: "Trust + 4 LLC ops accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings", custodian: "Meridian Pvt. Bank",    balance: 8.50e6,   yield: 4.25, tenor: "On demand", note: "Pledged to SBL · sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Gov't", custodian: "Schwab · SNVXX",         balance: 62.40e6,  yield: 4.85, tenor: "T+1 liquidity", note: "Primary liquidity sleeve", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",  custodian: "Brokered, multi-bank",   balance: 18.80e6,  yield: 5.05, tenor: "3·6·9·12 mo rungs", note: "Funds 2026 PE call schedule", color: "#a3823f" },
  ];

  const archetype = "Reyes Trust · Post-Liquidity Entrepreneur";
  const period = "Calendar Year 2025 / 2026 Outlook";

  return (
    <>
      {/* PAGE 1 — Cover + Cash position summary + Signed monthly */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 01 / 05" />
        <PrintMast archetype={archetype} period={period} />
        <div className="p-headline" style={{marginTop:8}}>
          <h1>Deploying <em>$190M</em> of liquidity, with tax-aware cadence.</h1>
          <p className="lede" style={{maxWidth:'62ch'}}>
            Year one post-exit. The cash flow profile is dominated by deferred-gain tax obligations (Q2 sale true-up of $4.2M)
            and a disciplined capital-deployment ramp into private markets. Operating cash burn excluding deployment was modest
            at $9.2M; the bulk of "outflow" is investment funded — capital being put to work, not consumed.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14, marginTop:14, borderTop:'1px solid var(--rule-strong)', paddingTop:10}}>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entity</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>Reyes Trust + 4 LLCs</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>$340M</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Liquidity Posture</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>Deploying · 38% liquid</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>A. Bhatia, CFP®</div></div>
        </div>

        <div className="p-section-head" style={{marginTop:14}}>
          <div><span className="eyebrow">CASH POSITION SUMMARY</span><h2>Opening → Activity → Closing</h2></div>
          <div className="right">Calendar 2025 · YTD 2026</div>
        </div>
        <CashPositionSummary periods={[
          { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 168.00e6, inflows: totalIn, outflows: totalOut, closing: 158.00e6 },
          { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 158.00e6, inflows: 4.20e6, outflows: 9.80e6, closing: 152.40e6 },
        ]} />

        <div className="p-section-head" style={{marginTop:10}}>
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Monthly Inflows, Outflows & Net Position</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <div className="p-legend" style={{marginBottom:6}}>
            <span className="item"><span className="sw" style={{background:'#2f6b3a'}}></span>Inflows (above)</span>
            <span className="item"><span className="sw" style={{background:'#8a3a2b'}}></span>Outflows (below)</span>
            <span className="item"><span className="sw" style={{background:'#0e1620', borderRadius:'50%'}}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChartSigned data={monthly} height={170} />
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="01 / 05" />
      </div>

      {/* PAGE 2 — Inflows + Calls/Distributions */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 02 / 05 · INFLOWS & DEPLOYMENT" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Sources of Inflows — Monthly</h2></div>
          <div className="right">By source</div>
        </div>
        <div className="p-frame">
          <StackedMonthlyChart months={months} sources={inflowSources} height={210} />
          <div className="p-legend" style={{marginTop:8}}>
            {inflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
          </div>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 03</span><h2>Capital Calls vs. Distributions</h2></div>
          <div className="right">Private investments · 2025</div>
        </div>
        <div className="p-frame">
          <CallsDistributionsChart data={calls} height={170} />
          <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, fontSize:'9pt', borderTop:'1px solid var(--rule)', paddingTop:8}}>
            <div><div style={{fontSize:'7pt', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-500)'}}>Calls funded</div><div style={{fontFamily:'var(--serif)', fontSize:'14pt'}}>$10.00M</div></div>
            <div><div style={{fontSize:'7pt', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-500)'}}>Distributions received</div><div style={{fontFamily:'var(--serif)', fontSize:'14pt'}}>$2.72M</div></div>
            <div><div style={{fontSize:'7pt', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-500)'}}>Unfunded commitments</div><div style={{fontFamily:'var(--serif)', fontSize:'14pt'}}>$78.5M</div></div>
          </div>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="02 / 05" />
      </div>

      {/* PAGE 3 — Outflows mirrored */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 03 / 05 · OUTFLOWS" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Outflows by Category — Monthly</h2></div>
          <div className="right">Plotted negative</div>
        </div>
        <div className="p-frame">
          <StackedMonthlySignedChart months={months} sources={outflowSources} height={210} sign={-1} />
          <div className="p-legend" style={{marginTop:8}}>
            {outflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
          </div>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Composition of Outflows</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:20, alignItems:'center'}}>
          <Donut size={170} data={outflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))} />
          <div className="stack-legend" style={{display:'grid', gridTemplateColumns:'1fr', gap:6}}>
            {outflowSources.map(s => {
              const v = s.values.reduce((a,b)=>a+b,0);
              return (
                <div key={s.name} style={{display:'grid', gridTemplateColumns:'12px 1fr auto', gap:8, alignItems:'center', fontSize:'8.5pt', borderBottom:'1px solid var(--rule)', padding:'4px 0'}}>
                  <span style={{width:10, height:10, background:s.color}}></span>
                  <span>{s.name}</span>
                  <span style={{fontVariantNumeric:'tabular-nums', fontWeight:500}}>{fmt.m(v)} · {((v/totalOut)*100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="03 / 05" />
      </div>

      {/* PAGE 4 — Cash instruments + Tax + Debt */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 04 / 05 · LIQUIDITY, TAX & DEBT" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 06</span><h2>Cash & Liquidity Instruments</h2></div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />

        <div className="p-section-head" style={{marginTop:14}}>
          <div><span className="eyebrow">EXHIBIT 07</span><h2>Tax Cash Flow Detail · Sale Year</h2></div>
          <div className="right">Federal + State (CA)</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Period</th><th>Due</th><th className="num">Federal</th><th className="num">State (CA)</th><th className="num">Total</th></tr></thead>
            <tbody>
              <tr><td>Q1 Estimated</td><td>Apr 15, 2025</td><td className="num">$2.85M</td><td className="num">$1.35M</td><td className="num">$4.20M</td></tr>
              <tr><td>Sale True-up Payment</td><td>Apr 15, 2025</td><td className="num">$2.95M</td><td className="num">$1.25M</td><td className="num">$4.20M</td></tr>
              <tr><td>Q2 Estimated</td><td>Jun 16, 2025</td><td className="num">$2.65M</td><td className="num">$1.20M</td><td className="num">$3.85M</td></tr>
              <tr><td>Q3 Estimated</td><td>Sep 15, 2025</td><td className="num">$2.50M</td><td className="num">$1.15M</td><td className="num">$3.65M</td></tr>
              <tr><td>Q4 Estimated</td><td>Jan 15, 2026</td><td className="num">$1.35M</td><td className="num">$0.60M</td><td className="num">$1.95M</td></tr>
              <tr className="subtle"><td>Local & Other</td><td>—</td><td className="num">—</td><td className="num">$0.55M</td><td className="num">$0.55M</td></tr>
              <tr className="total"><td>Total</td><td></td><td className="num">$12.30M</td><td className="num">$6.10M</td><td className="num">$18.40M</td></tr>
            </tbody>
          </table>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="04 / 05" />
      </div>

      {/* PAGE 5 — Debt + Philanthropy + Forecast */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 05 / 05 · DEBT, GIVING & FORECAST" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 08</span><h2>Debt Service & Credit Lines</h2></div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Facility</th><th>Drawn / Limit</th><th>Rate</th><th>Annual</th></tr></thead>
            <tbody>
              <tr><td>Securities-Backed Line · Meridian Pvt. Bank</td><td>$18M / $50M</td><td>SOFR + 0.65</td><td className="num">$0.62M</td></tr>
              <tr><td>Atherton Residence · 10-yr fixed</td><td>$8.4M</td><td>4.85%</td><td className="num">$0.48M</td></tr>
              <tr><td>NYC Pied-à-terre · 7/1 ARM</td><td>$3.6M</td><td>5.20%</td><td className="num">$0.25M</td></tr>
              <tr><td>Art-Secured Facility · undrawn</td><td>$0 / $20M</td><td>SOFR + 1.10</td><td className="num">—</td></tr>
              <tr className="total"><td>Aggregate</td><td>$30.0M / $123.6M</td><td>—</td><td className="num">$1.35M</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 09</span><h2>Philanthropic Giving — Founders' Pledge Year 1</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:8, alignItems:'end'}}>
            <div>
              <div style={{fontSize:'7pt', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
              <div style={{fontFamily:'var(--serif)', fontSize:'22pt', lineHeight:1, marginTop:2}}>$4.20M</div>
              <div style={{fontSize:'8pt', color:'var(--ink-500)', marginTop:2}}>21% of cash inflows · 10-year pledge: $42M</div>
            </div>
            <Sparkline values={[0.2, 0.4, 0.5, 1.2, 2.1, 3.0, 4.2]} width={120} height={36} stroke="#8a6a2e" />
          </div>
          <table className="p-table">
            <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
            <tbody>
              <tr><td>Reyes Family Foundation (501c3)</td><td className="num">$2.20M</td><td className="num">In-kind equity</td></tr>
              <tr><td>Donor-Advised Fund — Schwab</td><td className="num">$1.30M</td><td className="num">In-kind equity</td></tr>
              <tr><td>Stanford GSB · Endowed Scholarship</td><td className="num">$0.40M</td><td className="num">Cash</td></tr>
              <tr><td>Climate-focused grants (8 grantees)</td><td className="num">$0.30M</td><td className="num">Cash</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 10</span><h2>Net Cash Position & Forward Forecast</h2></div>
          <div className="right">2024 → 2026 · liquid balance</div>
        </div>
        <div className="p-frame">
          <NetCashLine
            height={150}
            points={[
              { x: "2024 Q1", y: 142e6 }, { x: "Q2", y: 138e6 }, { x: "Q3", y: 135e6 }, { x: "Q4", y: 168e6 },
              { x: "2025 Q1", y: 161e6 }, { x: "Q2", y: 168e6 }, { x: "Q3", y: 162e6 }, { x: "Q4", y: 158e6 },
              { x: "2026 Q1", y: 152e6 }, { x: "Q2", y: 145e6 }, { x: "Q3", y: 138e6 }, { x: "Q4", y: 132e6 },
            ]}
            forecastFromIndex={8}
          />
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="05 / 05" />
      </div>
    </>
  );
}

window.PrintPostLiquidity = PrintPostLiquidity;
