/* Print-formatted Operating Business Owner — 8.5 x 11, 4 pages */

function PrintBusinessOwner() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const monthly = [
    { m: "JAN", in: 1.85e6, out: 1.42e6, net: 0.43e6 },
    { m: "FEB", in: 1.62e6, out: 1.31e6, net: 0.31e6 },
    { m: "MAR", in: 4.80e6, out: 3.92e6, net: 0.88e6 },
    { m: "APR", in: 2.10e6, out: 5.40e6, net: -3.30e6 },
    { m: "MAY", in: 1.74e6, out: 1.55e6, net: 0.19e6 },
    { m: "JUN", in: 5.40e6, out: 4.10e6, net: 1.30e6 },
    { m: "JUL", in: 1.92e6, out: 1.48e6, net: 0.44e6 },
    { m: "AUG", in: 1.78e6, out: 1.66e6, net: 0.12e6 },
    { m: "SEP", in: 5.20e6, out: 4.05e6, net: 1.15e6 },
    { m: "OCT", in: 1.96e6, out: 1.71e6, net: 0.25e6 },
    { m: "NOV", in: 1.84e6, out: 1.59e6, net: 0.25e6 },
    { m: "DEC", in: 9.20e6, out: 3.40e6, net: 5.80e6 },
  ];
  const totalIn = monthly.reduce((s, m) => s + m.in, 0);
  const totalOut = monthly.reduce((s, m) => s + m.out, 0);
  const totalNet = totalIn - totalOut;

  const inflowSources = [
    { name: "S-Corp Distributions",     color: "#0e1620", values: [0.15,0.12,3.20,0.18,0.14,3.80,0.20,0.16,3.60,0.22,0.18,7.40].map(v=>v*1e6) },
    { name: "W-2 Salary",                color: "#4a5468", values: Array(12).fill(125000) },
    { name: "Investment Income",         color: "#8a6a2e", values: [0.42,0.38,0.45,0.62,0.48,0.51,0.56,0.49,0.52,0.58,0.51,0.68].map(v=>v*1e6) },
    { name: "K-1 Pass-throughs",         color: "#b89657", values: [0.16,0.14,0.21,0.43,0.19,0.18,0.22,0.21,0.21,0.20,0.21,0.24].map(v=>v*1e6) },
    { name: "Real Estate / Other",       color: "#d8c393", values: [0.16,0.16,0.31,0.16,0.20,0.18,0.22,0.20,0.22,0.20,0.22,0.21].map(v=>v*1e6) },
  ];

  const spending = [
    { name: "Federal & State Taxes",    color: "#0e1620", value: 14.20e6 },
    { name: "Capital Deployment",       color: "#a3823f", value: 6.15e6 },
    { name: "Lifestyle & Household",    color: "#4a5468", value: 4.85e6 },
    { name: "Debt Service",             color: "#6b7587", value: 2.40e6 },
    { name: "Philanthropy",             color: "#8a6a2e", value: 1.85e6 },
    { name: "Insurance & Other",        color: "#d8c393", value: 1.14e6 },
  ];

  const archetype = "Asher Family · Operating Business Owner";
  const period = "Calendar Year 2025 / 2026 Outlook";

  return (
    <>
      {/* PAGE 1 — Cover / Summary */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 01 / 04" />
        <PrintMast archetype={archetype} period={period} />
        <div className="p-headline" style={{marginTop:8}}>
          <h1>A year of <em>concentrated income</em>, with discipline applied to deployment.</h1>
          <p className="lede" style={{maxWidth:'62ch'}}>
            Net after-tax cash flow of <strong>$15.18M</strong> reflects three S-Corp distributions and a year-end special.
            Tax obligations remain the dominant outflow at 46% of total spending. Capital deployment was front-loaded into
            Q1–Q3 to align with private investment commitments. Reserve cushion held above the 12-month operating
            threshold throughout the year.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16, borderTop:'1px solid var(--rule-strong)', paddingTop:12}}>
          <div>
            <div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entity</div>
            <div style={{fontSize:'10pt', fontWeight:500, marginTop:2}}>Asher Family · 7 entities consolidated</div>
          </div>
          <div>
            <div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div>
            <div style={{fontSize:'10pt', fontWeight:500, marginTop:2}}>$285M</div>
          </div>
          <div>
            <div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Liquidity Posture</div>
            <div style={{fontSize:'10pt', fontWeight:500, marginTop:2}}>Conservative · 14 mo runway</div>
          </div>
          <div>
            <div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div>
            <div style={{fontSize:'10pt', fontWeight:500, marginTop:2}}>P. Marchetti, CFA</div>
          </div>
        </div>

        <div className="p-kpi-strip" style={{marginTop:14}}>
          <div className="p-kpi"><span className="label">Total Inflows</span><span className="num">{fmt.m(totalIn)}</span><span className="delta pos">▲ +11.4% vs. 2024</span></div>
          <div className="p-kpi"><span className="label">Total Outflows</span><span className="num">{fmt.m(totalOut)}</span><span className="delta neg">▲ +8.2% vs. 2024</span></div>
          <div className="p-kpi"><span className="label">Net After-Tax</span><span className="num" style={{color:'var(--gold-700)'}}>{fmt.m(totalNet)}</span><span className="delta pos">▲ +22.7% vs. 2024</span></div>
          <div className="p-kpi"><span className="label">Effective Tax Rate</span><span className="num">37.6%</span><span className="delta">vs. 38.1% prior</span></div>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Monthly Inflows, Outflows & Net</h2></div>
          <div className="right">FY 2025 · USD M</div>
        </div>
        <div className="p-frame">
          <div className="p-legend" style={{marginBottom:6}}>
            <span className="item"><span className="sw" style={{background:'#2f6b3a'}}></span>Inflows</span>
            <span className="item"><span className="sw" style={{background:'#8a3a2b'}}></span>Outflows</span>
            <span className="item"><span className="sw" style={{background:'#0e1620', borderRadius:'50%'}}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChart data={monthly} height={220} />
        </div>

        <p className="p-advisor-note" style={{marginTop:8}}>
          "April's negative net position is structural — the Q1 estimated payment lands without a matching distribution.
          We over-reserved by $2.1M to absorb it without drawing on the SBL."
          <span className="who">— Lead Advisor commentary</span>
        </p>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="01 / 04" />
      </div>

      {/* PAGE 2 — Sources of inflows */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 02 / 04 · SOURCES OF INFLOWS" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Sources of Inflows — Monthly</h2></div>
          <div className="right">By source</div>
        </div>
        <div className="p-frame">
          <StackedMonthlyChart months={months} sources={inflowSources} height={220} />
          <div className="p-legend" style={{marginTop:8}}>
            {inflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
          </div>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 03</span><h2>Composition of Income</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:20, alignItems:'center'}}>
          <Donut size={180} data={inflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))} />
          <div className="stack-legend" style={{display:'grid', gridTemplateColumns:'1fr', gap:6}}>
            {inflowSources.map(s => {
              const v = s.values.reduce((a,b)=>a+b,0);
              return (
                <div key={s.name} style={{display:'grid', gridTemplateColumns:'12px 1fr auto', gap:8, alignItems:'center', fontSize:'8.5pt', borderBottom:'1px solid var(--rule)', padding:'4px 0'}}>
                  <span style={{width:10, height:10, background:s.color}}></span>
                  <span>{s.name}</span>
                  <span style={{fontVariantNumeric:'tabular-nums', fontWeight:500}}>{fmt.m(v)} · {((v/totalIn)*100).toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Outflows by Category</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <PrintDrilldown items={spending} total={totalOut} />
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="02 / 04" />
      </div>

      {/* PAGE 3 — Tax + Debt */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 03 / 04 · TAX & DEBT DETAIL" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Tax Cash Flow Detail</h2></div>
          <div className="right">Federal + State (NY/FL)</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Period</th><th>Due Date</th><th className="num">Federal</th><th className="num">State</th><th className="num">Total</th></tr></thead>
            <tbody>
              <tr><td>Q1 2025</td><td>Apr 15, 2025</td><td className="num">$3.05M</td><td className="num">$0.80M</td><td className="num">$3.85M</td></tr>
              <tr><td>Q2 2025</td><td>Jun 16, 2025</td><td className="num">$2.85M</td><td className="num">$0.75M</td><td className="num">$3.60M</td></tr>
              <tr><td>Q3 2025</td><td>Sep 15, 2025</td><td className="num">$2.80M</td><td className="num">$0.75M</td><td className="num">$3.55M</td></tr>
              <tr><td>Q4 2025</td><td>Jan 15, 2026</td><td className="num">$1.65M</td><td className="num">$0.45M</td><td className="num">$2.10M</td></tr>
              <tr className="subtle"><td>Withholding (W-2)</td><td>—</td><td className="num">$0.45M</td><td className="num">$0.17M</td><td className="num">$0.62M</td></tr>
              <tr className="subtle"><td>Property Tax</td><td>—</td><td className="num">—</td><td className="num">$0.48M</td><td className="num">$0.48M</td></tr>
              <tr className="total"><td>Total</td><td></td><td className="num">$10.80M</td><td className="num">$3.40M</td><td className="num">$14.20M</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 06</span><h2>Debt Service & Credit Lines</h2></div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Facility</th><th>Lender</th><th>Balance</th><th>Rate</th><th>Service</th></tr></thead>
            <tbody>
              <tr><td>Primary Residence Mortgage (NY)</td><td>Trust Co. Bank</td><td>$11.4M</td><td>5.40%</td><td>$73K/mo</td></tr>
              <tr><td>Vacation Home Mortgage (CO)</td><td>Trust Co. Bank</td><td>$4.8M</td><td>6.10%</td><td>$35K/mo</td></tr>
              <tr><td>Securities-Backed Line</td><td>Meridian Pvt. Bank</td><td>$24.5M</td><td>SOFR + 0.85</td><td>Interest only</td></tr>
              <tr><td>Art-Secured Credit Facility</td><td>Meridian Pvt. Bank</td><td>$0 / $15M</td><td>SOFR + 1.10</td><td>—</td></tr>
              <tr className="total"><td>Aggregate</td><td></td><td className="num">$40.7M</td><td>—</td><td className="num">$2.40M / yr</td></tr>
            </tbody>
          </table>
        </div>

        <p className="p-advisor-note" style={{marginTop:10}}>
          "We recommend extending the SBL maturity by 24 months ahead of the planned Q3 2026 PE call wave; current
          collateral coverage at 4.6× supports a $40M facility ceiling with no rate change."
          <span className="who">— Banking note</span>
        </p>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="03 / 04" />
      </div>

      {/* PAGE 4 — Philanthropy + Forecast */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CASH FLOW EXHIBIT" right="PAGE 04 / 04 · GIVING & FORECAST" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 07</span><h2>Philanthropic Giving</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:8, alignItems:'end'}}>
            <div>
              <div style={{fontSize:'7pt', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
              <div style={{fontFamily:'var(--serif)', fontSize:'22pt', lineHeight:1, marginTop:2}}>$1.85M</div>
              <div style={{fontSize:'8pt', color:'var(--ink-500)', marginTop:2}}>3.7% of gross income · vs. 5% target</div>
            </div>
            <Sparkline values={[0.95, 1.10, 1.32, 1.41, 1.55, 1.70, 1.85]} width={120} height={36} stroke="#8a6a2e" />
          </div>
          <table className="p-table">
            <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
            <tbody>
              <tr><td>Asher Family DAF (Schwab)</td><td className="num">$1.25M</td><td className="num">In-kind equity</td></tr>
              <tr><td>Yale University · Endowed Chair Pledge (yr 2 of 5)</td><td className="num">$0.30M</td><td className="num">Cash</td></tr>
              <tr><td>NewYork-Presbyterian · Cardiology</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
              <tr><td>Recurring foundations (12 grantees)</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 08</span><h2>Net Cash Position & Forward Forecast</h2></div>
          <div className="right">2024 actual → 2026 projected</div>
        </div>
        <div className="p-frame">
          <NetCashLine
            height={200}
            points={[
              { x: "2024 Q1", y: 8.2e6 }, { x: "Q2", y: 7.6e6 }, { x: "Q3", y: 9.1e6 }, { x: "Q4", y: 11.4e6 },
              { x: "2025 Q1", y: 12.0e6 }, { x: "Q2", y: 13.0e6 }, { x: "Q3", y: 14.4e6 }, { x: "Q4", y: 18.6e6 },
              { x: "2026 Q1", y: 17.9e6 }, { x: "Q2", y: 19.4e6 }, { x: "Q3", y: 21.0e6 }, { x: "Q4", y: 24.5e6 },
            ]}
            forecastFromIndex={8}
          />
          <div className="p-legend" style={{marginTop:6}}>
            <span className="item"><span className="sw" style={{background:'#0e1620'}}></span>Actual cash on hand</span>
            <span className="item"><span className="sw" style={{background:'#a3823f'}}></span>Base-case projection</span>
            <span className="item"><span className="sw" style={{background:'#f0e6cf'}}></span>Forecast period</span>
          </div>
        </div>

        <p className="p-advisor-note" style={{marginTop:10}}>
          "Base-case 2026 reflects continued S-Corp distribution growth (+8%) and a $7.5M PE call schedule.
          Year-end liquid position projected at $24.5M, a 32% increase, supporting 2027 commitments without new debt."
          <span className="who">— Forecast assumptions</span>
        </p>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="04 / 04" />
      </div>
    </>
  );
}

window.PrintBusinessOwner = PrintBusinessOwner;
