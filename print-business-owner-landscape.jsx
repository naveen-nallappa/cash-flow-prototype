/* Print-formatted Operating Business Owner — 1280×720 landscape deck */

function PrintBusinessOwnerLandscape() {
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

  const inflowSources = [
    { name: "S-Corp Distributions",     color: "#0e1620", values: [0.15,0.12,3.20,0.18,0.14,3.80,0.20,0.16,3.60,0.22,0.18,7.40].map(v=>v*1e6) },
    { name: "W-2 Salary",                color: "#4a5468", values: Array(12).fill(125000) },
    { name: "Investment Income",         color: "#8a6a2e", values: [0.42,0.38,0.45,0.62,0.48,0.51,0.56,0.49,0.52,0.58,0.51,0.68].map(v=>v*1e6) },
    { name: "K-1 Pass-throughs",         color: "#b89657", values: [0.16,0.14,0.21,0.43,0.19,0.18,0.22,0.21,0.21,0.20,0.21,0.24].map(v=>v*1e6) },
    { name: "Real Estate / Other",       color: "#d8c393", values: [0.16,0.16,0.31,0.16,0.20,0.18,0.22,0.20,0.22,0.20,0.22,0.21].map(v=>v*1e6) },
  ];

  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.18,0.16,3.65,4.20,0.20,3.85,0.18,0.16,3.65,0.20,0.18,1.59].map(v=>v*1e6) },
    { name: "Capital Deployment",         color: "#1f4a4f", values: [0.40,0.35,0.65,0.85,0.95,1.20,0.80,0.55,0.70,0.65,0.80,0.25].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.42,0.38,0.45,0.55,0.48,0.40,0.45,0.42,0.45,0.40,0.42,0.43].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.20e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0,0,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,1.40].map(v=>v*1e6) },
    { name: "Insurance & Other",          color: "#d8c393", values: [0.07,0.07,0.10,0.07,0.10,0.09,0.10,0.09,0.10,0.10,0.09,0.16].map(v=>v*1e6) },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",  custodian: "Trust Co. Bank",      balance: 1.45e6,  yield: 0.05, tenor: "On demand", note: "Daily ops · 3 accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings", custodian: "Meridian Pvt. Bank",  balance: 4.20e6,  yield: 4.10, tenor: "On demand", note: "Sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Gov't", custodian: "Schwab · SNVXX",      balance: 9.80e6,  yield: 4.85, tenor: "T+1 liquidity", note: "Primary liquidity sleeve", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",  custodian: "Brokered, multi-bank", balance: 3.15e6,  yield: 5.05, tenor: "3·6·9·12 mo rungs", note: "Funds Q1/Q2 tax payments", color: "#a3823f" },
  ];

  const archetype = "Asher Family · Operating Business Owner";
  const period = "Calendar Year 2025 / 2026 Outlook";

  const inflowDonut = inflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }));
  const outflowDonut = outflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }));

  return (
    <>
      {/* SLIDE 01 — COVER */}
      <section className="lp-slide" data-screen-label="01 Cover">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="01 / 11" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-headline" style={{marginTop:6}}>
          <h1>A year of <em>concentrated income,</em> with discipline applied to deployment.</h1>
          <div className="lede">
            Net after-tax cash flow of <strong>$15.18M</strong> reflects three S-Corp distributions and a year-end special.
            Tax obligations remain the dominant outflow at 46% of total spending. Capital deployment was front-loaded into
            Q1–Q3 to align with private investment commitments. Reserve cushion held above the 12-month operating threshold throughout the year.
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginTop:18, borderTop:'1px solid var(--rule-strong)', paddingTop:12}}>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entity</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>Asher Family · 7 entities</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>$285M</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Liquidity Posture</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>Conservative · 14 mo</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>P. Marchetti, CFA</div></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="lp-section-head">
            <div><span className="eyebrow">CASH POSITION SUMMARY</span><h2>Opening → Activity → Closing</h2></div>
            <div className="right">Calendar 2025 · YTD 2026</div>
          </div>
          <CashPositionSummary periods={[
            { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 11.40e6, inflows: totalIn, outflows: totalOut, closing: 18.60e6 },
            { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 18.60e6, inflows: 9.85e6, outflows: 11.42e6, closing: 17.03e6 },
          ]} />
        </div>

        <div className="lp-stretch"></div>
        <LPFooter archetype={archetype} page="01 / 11" />
      </section>

      {/* SLIDE 02 — DIVIDER: FLOWS */}
      <LPDivider archetype={archetype} page="02 / 11" sectionNum="Section I"
        title="The shape of" titleEm="cash."
        blurb="Twelve months of income and spending — when it lands, when it leaves, and what remains. Three exhibits chart the rhythm of distributions, tax payments, and operating spend."
        indexItems={["Monthly inflows, outflows & net position", "Sources of inflows — stacked & composition", "Outflows by category — stacked & composition"]}
      />

      {/* SLIDE 03 — Monthly signed flows (full bleed chart) */}
      <section className="lp-slide" data-screen-label="03 Monthly Flows">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="03 / 11 · MONTHLY" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Monthly Inflows, Outflows & Net Position</h2></div>
          <div className="right">FY 2025 · USD M</div>
        </div>
        <div className="lp-frame" style={{flex:1}}>
          <div className="lp-legend" style={{marginBottom:8}}>
            <span className="item"><span className="sw" style={{background:'#2f6b3a'}}></span>Inflows (above)</span>
            <span className="item"><span className="sw" style={{background:'#8a3a2b'}}></span>Outflows (below)</span>
            <span className="item"><span className="sw" style={{background:'#0e1620', borderRadius:'50%'}}></span>Net (dotted)</span>
          </div>
          <div className="lp-chart-fit" style={{maxHeight:380}}>
            <MonthlyFlowChartSigned data={monthly} height={340} />
          </div>
        </div>
        <LPFooter archetype={archetype} page="03 / 11" />
      </section>

      {/* SLIDE 04 — Inflow stack + donut (2-up) */}
      <section className="lp-slide" data-screen-label="04 Inflow Composition">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="04 / 11 · INFLOWS" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Sources of Inflows — Stacked & Composition</h2></div>
          <div className="right">FY 2025 · by source</div>
        </div>
        <div className="lp-col-7-5" style={{flex:1, minHeight:0}}>
          <div className="lp-frame">
            <div className="frame-head"><div className="t">Monthly stack</div><div className="s">USD M · 12 months</div></div>
            <div className="lp-chart-fit">
              <StackedMonthlyChart months={months} sources={inflowSources} height={300} />
            </div>
            <div className="lp-legend" style={{marginTop:6, fontSize:9.5}}>
              {inflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
            </div>
          </div>
          <div className="lp-frame tinted">
            <div className="frame-head"><div className="t">Composition</div><div className="s">FY 2025</div></div>
            <div style={{display:'flex', justifyContent:'center', padding:'8px 0'}}>
              <Donut size={180} data={inflowDonut} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:2}}>
              {inflowSources.map(s => {
                const v = s.values.reduce((a,b)=>a+b,0);
                return (
                  <div key={s.name} style={{display:'grid', gridTemplateColumns:'10px 1fr auto', gap:8, alignItems:'center', fontSize:10.5, borderBottom:'1px solid var(--rule)', padding:'4px 0'}}>
                    <span style={{width:9, height:9, background:s.color}}></span>
                    <span>{s.name}</span>
                    <span style={{fontVariantNumeric:'tabular-nums', fontWeight:500}}>{fmt.m(v)} · {((v/totalIn)*100).toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="04 / 11" />
      </section>

      {/* SLIDE 05 — Outflow stack + donut (2-up) */}
      <section className="lp-slide" data-screen-label="05 Outflow Composition">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="05 / 11 · OUTFLOWS" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 03</span><h2>Outflows by Category — Stacked & Composition</h2></div>
          <div className="right">FY 2025 · plotted negative</div>
        </div>
        <div className="lp-col-7-5" style={{flex:1, minHeight:0}}>
          <div className="lp-frame">
            <div className="frame-head"><div className="t">Monthly stack</div><div className="s">USD M · 12 months</div></div>
            <div className="lp-chart-fit">
              <StackedMonthlySignedChart months={months} sources={outflowSources} height={300} sign={-1} />
            </div>
            <div className="lp-legend" style={{marginTop:6, fontSize:9.5}}>
              {outflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
            </div>
          </div>
          <div className="lp-frame tinted">
            <div className="frame-head"><div className="t">Composition</div><div className="s">FY 2025</div></div>
            <div style={{display:'flex', justifyContent:'center', padding:'8px 0'}}>
              <Donut size={180} data={outflowDonut} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:2}}>
              {outflowSources.map(s => {
                const v = s.values.reduce((a,b)=>a+b,0);
                return (
                  <div key={s.name} style={{display:'grid', gridTemplateColumns:'10px 1fr auto', gap:8, alignItems:'center', fontSize:10.5, borderBottom:'1px solid var(--rule)', padding:'4px 0'}}>
                    <span style={{width:9, height:9, background:s.color}}></span>
                    <span>{s.name}</span>
                    <span style={{fontVariantNumeric:'tabular-nums', fontWeight:500}}>{fmt.m(v)} · {((v/totalOut)*100).toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="05 / 11" />
      </section>

      {/* SLIDE 06 — DIVIDER: LIQUIDITY & TAX */}
      <LPDivider archetype={archetype} page="06 / 11" sectionNum="Section II"
        title="Liquidity," titleEm="and the cost of compliance."
        blurb="Where the cash sits, how it earns, and the federal & state obligations it must satisfy. The CD ladder is sized to fund quarterly estimated payments without disturbing the MMF sleeve."
        indexItems={["Cash & liquidity instruments", "Tax cash flow detail · federal + state"]}
      />

      {/* SLIDE 07 — Cash instruments */}
      <section className="lp-slide" data-screen-label="07 Cash Instruments">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="07 / 11 · LIQUIDITY" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Cash & Liquidity Instruments</h2></div>
          <div className="right">As of 12.31.2025</div>
        </div>
        <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />
        <div className="lp-spacer"></div>
        <p className="lp-advisor-note">
          "92% of cash sits in yield-bearing instruments. The CD ladder is sized to fund Q1/Q2 estimated payments, freeing the MMF sleeve for opportunistic deployment."
          <span className="who">— Treasury management</span>
        </p>
        <div className="lp-stretch"></div>
        <LPFooter archetype={archetype} page="07 / 11" />
      </section>

      {/* SLIDE 08 — Tax detail */}
      <section className="lp-slide" data-screen-label="08 Tax Detail">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="08 / 11 · TAX" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Tax Cash Flow Detail</h2></div>
          <div className="right">Federal + State (NY/FL)</div>
        </div>
        <div className="lp-cols-2" style={{flex:1, minHeight:0}}>
          <div className="lp-frame">
            <div className="frame-head"><div className="t">Quarterly schedule</div><div className="s">FY 2025</div></div>
            <table className="lp-table">
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
          <div className="lp-frame tinted">
            <div className="frame-head"><div className="t">Effective rate analysis</div><div className="s">vs. gross income</div></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:8}}>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Gross Income</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$37.74M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Tax</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$14.20M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Effective Rate</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4, color:'var(--gold-700)'}}>37.6%</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>After-Tax</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$23.54M</div>
              </div>
            </div>
            <div style={{marginTop:18, paddingTop:12, borderTop:'1px solid var(--rule)'}}>
              <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)', marginBottom:6}}>Strategy notes</div>
              <ul style={{margin:0, paddingLeft:16, fontSize:11, lineHeight:1.55, color:'var(--ink-700)'}}>
                <li>Q1/Q2 estimated payments pre-funded from CD ladder rungs maturing March and June.</li>
                <li>Charitable in-kind transfer of $1.25M (Dec) reduced 2025 AGI by ~3.3%.</li>
                <li>QSBS exclusion used on K-1 Pass-throughs — $2.4M shielded from federal cap gains.</li>
              </ul>
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="08 / 11" />
      </section>

      {/* SLIDE 09 — DIVIDER: FORWARD */}
      <LPDivider archetype={archetype} page="09 / 11" sectionNum="Section III"
        title="What's owed," titleEm="what's given, what's coming."
        blurb="Aggregate debt service against the credit lattice, the year's philanthropic disposition, and the forward forecast through 2026."
        indexItems={["Debt service & credit lines", "Philanthropic giving · DAF + direct", "Net cash position & forward forecast"]}
      />

      {/* SLIDE 10 — Debt + Philanthropy */}
      <section className="lp-slide" data-screen-label="10 Debt and Giving">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="10 / 11 · DEBT & GIVING" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-cols-2" style={{flex:1, minHeight:0, gap:18}}>
          <div>
            <div className="lp-section-head">
              <div><span className="eyebrow">EXHIBIT 06</span><h2>Debt Service & Credit Lines</h2></div>
              <div className="right">As of 12.31.2025</div>
            </div>
            <div className="lp-frame">
              <table className="lp-table">
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
          </div>
          <div>
            <div className="lp-section-head">
              <div><span className="eyebrow">EXHIBIT 07</span><h2>Philanthropic Giving</h2></div>
              <div className="right">FY 2025</div>
            </div>
            <div className="lp-frame tinted">
              <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:12, alignItems:'end'}}>
                <div>
                  <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
                  <div style={{fontFamily:'var(--serif)', fontSize:32, lineHeight:1, marginTop:4}}>$1.85M</div>
                  <div style={{fontSize:10.5, color:'var(--ink-500)', marginTop:3}}>3.7% of gross income · vs. 5% target</div>
                </div>
                <Sparkline values={[0.95, 1.10, 1.32, 1.41, 1.55, 1.70, 1.85]} width={140} height={42} stroke="#8a6a2e" />
              </div>
              <table className="lp-table">
                <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
                <tbody>
                  <tr><td>Asher Family DAF (Schwab)</td><td className="num">$1.25M</td><td className="num">In-kind equity</td></tr>
                  <tr><td>Yale University · Endowed Chair Pledge (yr 2 of 5)</td><td className="num">$0.30M</td><td className="num">Cash</td></tr>
                  <tr><td>NewYork-Presbyterian · Cardiology</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
                  <tr><td>Recurring foundations (12 grantees)</td><td className="num">$0.15M</td><td className="num">Cash</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="10 / 11" />
      </section>

      {/* SLIDE 11 — Forecast */}
      <section className="lp-slide" data-screen-label="11 Forecast">
        <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr="11 / 11 · FORECAST" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 08</span><h2>Net Cash Position & Forward Forecast</h2></div>
          <div className="right">2024 actual → 2026 projected</div>
        </div>
        <div className="lp-frame" style={{flex:1}}>
          <div className="lp-chart-fit">
            <NetCashLine
              height={400}
              points={[
                { x: "2024 Q1", y: 8.2e6 }, { x: "Q2", y: 7.6e6 }, { x: "Q3", y: 9.1e6 }, { x: "Q4", y: 11.4e6 },
                { x: "2025 Q1", y: 12.0e6 }, { x: "Q2", y: 13.0e6 }, { x: "Q3", y: 14.4e6 }, { x: "Q4", y: 18.6e6 },
                { x: "2026 Q1", y: 17.9e6 }, { x: "Q2", y: 19.4e6 }, { x: "Q3", y: 21.0e6 }, { x: "Q4", y: 24.5e6 },
              ]}
              forecastFromIndex={8}
            />
          </div>
        </div>
        <LPFooter archetype={archetype} page="11 / 11" />
      </section>
    </>
  );
}

window.PrintBusinessOwnerLandscape = PrintBusinessOwnerLandscape;
