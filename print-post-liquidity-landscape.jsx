/* Print-formatted Post-Liquidity Entrepreneur — 1280×720 landscape deck */

function PrintPostLiquidityLandscape() {
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

  const cashInstruments = [
    { name: "Operating Cash · Checking",  custodian: "First Republic / JPM",  balance: 2.20e6,   yield: 0.10, tenor: "On demand", note: "Trust + 4 LLC ops accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings", custodian: "Meridian Pvt. Bank",    balance: 8.50e6,   yield: 4.25, tenor: "On demand", note: "Pledged to SBL · sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Gov't", custodian: "Schwab · SNVXX",        balance: 62.40e6,  yield: 4.85, tenor: "T+1 liquidity", note: "Primary liquidity sleeve", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",  custodian: "Brokered, multi-bank",  balance: 18.80e6,  yield: 5.05, tenor: "3·6·9·12 mo rungs", note: "Funds 2026 PE call schedule", color: "#a3823f" },
  ];

  const archetype = "Reyes Trust · Post-Liquidity Entrepreneur";
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
          <h1>Deploying <em>$190M</em> of liquidity, with tax-aware cadence.</h1>
          <div className="lede">
            Year one post-exit. The cash flow profile is dominated by deferred-gain tax obligations (Q2 sale true-up of $4.2M)
            and a disciplined capital-deployment ramp into private markets. Operating cash burn excluding deployment was
            modest at $9.2M — the bulk of "outflow" is investment funded, capital being put to work, not consumed.
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginTop:18, borderTop:'1px solid var(--rule-strong)', paddingTop:12}}>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entity</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>Reyes Revocable Trust + 4 LLCs</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>$340M</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Liquidity Posture</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>Deploying · 38% liquid</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>A. Bhatia, CFP®</div></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="lp-section-head">
            <div><span className="eyebrow">CASH POSITION SUMMARY</span><h2>Opening → Activity → Closing</h2></div>
            <div className="right">Calendar 2025 · YTD 2026</div>
          </div>
          <CashPositionSummary periods={[
            { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 168.00e6, inflows: totalIn, outflows: totalOut, closing: 158.00e6 },
            { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 158.00e6, inflows: 4.20e6, outflows: 9.80e6, closing: 152.40e6 },
          ]} />
        </div>

        <div className="lp-stretch"></div>
        <LPFooter archetype={archetype} page="01 / 11" />
      </section>

      {/* SLIDE 02 — DIVIDER: FLOWS */}
      <LPDivider archetype={archetype} page="02 / 11" sectionNum="Section I"
        title="The shape of" titleEm="post-exit cash."
        blurb="Twelve months of activity dominated by quarterly tax payments, the June escrow release, and a steady ramp of private-market commitments. Three exhibits chart inflows, outflows, and net position."
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
        title="Liquidity," titleEm="and the cost of the exit."
        blurb="Where the $190M sits, how it earns, and the federal & state obligations triggered by the sale. The CD ladder is sized to fund the 2026 PE call schedule without disturbing the MMF sleeve."
        indexItems={["Cash & liquidity instruments", "Tax cash flow detail · sale year"]}
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
          "92% of cash sits in government MMF and brokered CDs — yield-bearing but liquid. The CD ladder is sized to fund the 2026 PE call schedule, freeing the MMF sleeve for opportunistic deployment."
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
          <div className="right">Federal + State (CA) · Sale year</div>
        </div>
        <div className="lp-cols-2" style={{flex:1, minHeight:0}}>
          <div className="lp-frame">
            <div className="frame-head"><div className="t">Quarterly schedule</div><div className="s">FY 2025 · sale-year complexity</div></div>
            <table className="lp-table">
              <thead><tr><th>Period</th><th>Due Date</th><th className="num">Federal</th><th className="num">State</th><th className="num">Total</th></tr></thead>
              <tbody>
                <tr><td>Q1 2025 Estimated</td><td>Apr 15, 2025</td><td className="num">$3.20M</td><td className="num">$1.00M</td><td className="num">$4.20M</td></tr>
                <tr><td>Sale True-up Payment</td><td>Apr 15, 2025</td><td className="num">$3.30M</td><td className="num">$0.90M</td><td className="num">$4.20M</td></tr>
                <tr><td>Q2 2025 Estimated</td><td>Jun 16, 2025</td><td className="num">$2.95M</td><td className="num">$0.90M</td><td className="num">$3.85M</td></tr>
                <tr><td>Q3 2025 Estimated</td><td>Sep 15, 2025</td><td className="num">$2.80M</td><td className="num">$0.85M</td><td className="num">$3.65M</td></tr>
                <tr><td>Q4 2025 Estimated</td><td>Jan 15, 2026</td><td className="num">$1.50M</td><td className="num">$0.45M</td><td className="num">$1.95M</td></tr>
                <tr className="subtle"><td>Property & Local</td><td>—</td><td className="num">—</td><td className="num">$0.55M</td><td className="num">$0.55M</td></tr>
                <tr className="total"><td>Total</td><td></td><td className="num">$13.75M</td><td className="num">$4.65M</td><td className="num">$18.40M</td></tr>
              </tbody>
            </table>
          </div>
          <div className="lp-frame tinted">
            <div className="frame-head"><div className="t">Effective rate analysis</div><div className="s">Sale + ordinary income</div></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:8}}>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Sale Proceeds (Yr 1)</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$54.0M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Ordinary Income</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$8.4M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Tax</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4, color:'var(--gold-700)'}}>$18.40M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Blended Rate</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>29.5%</div>
              </div>
            </div>
            <div style={{marginTop:18, paddingTop:12, borderTop:'1px solid var(--rule)'}}>
              <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)', marginBottom:6}}>Strategy notes</div>
              <ul style={{margin:0, paddingLeft:16, fontSize:11, lineHeight:1.55, color:'var(--ink-700)'}}>
                <li>Long-term cap gains rate (23.8% federal + 13.3% CA) applied to bulk of sale consideration.</li>
                <li>$3.50M DAF funded with appreciated stock (Dec) — eliminated embedded gain on transferred shares.</li>
                <li>QSBS partial exclusion captured on early founder shares; balance taxed at LTCG.</li>
                <li>2026 forecast assumes Q1–Q4 estimated payments materially smaller as ordinary income normalizes.</li>
              </ul>
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="08 / 11" />
      </section>

      {/* SLIDE 09 — DIVIDER: FORWARD */}
      <LPDivider archetype={archetype} page="09 / 11" sectionNum="Section III"
        title="What's owed," titleEm="what's given, what's coming."
        blurb="The credit lattice supporting the deployment plan, the inaugural year of structured philanthropy, and the forward forecast as cash converts into committed private capital."
        indexItems={["Debt service & credit lines", "Philanthropic giving · DAF + endowed", "Net cash position & forward forecast"]}
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
                  <tr><td>Atherton Residence Mortgage</td><td>First Republic / JPM</td><td>$8.4M</td><td>4.85%</td><td>$40K/mo</td></tr>
                  <tr><td>NYC Pied-à-terre Mortgage</td><td>First Republic / JPM</td><td>$3.6M</td><td>5.20%</td><td>$21K/mo</td></tr>
                  <tr><td>Securities-Backed Line</td><td>Meridian Pvt. Bank</td><td>$18.0M / $50M</td><td>SOFR + 0.75</td><td>Interest only</td></tr>
                  <tr><td>Art-Secured Credit Facility</td><td>Meridian Pvt. Bank</td><td>$0 / $10M</td><td>SOFR + 1.10</td><td>—</td></tr>
                  <tr className="total"><td>Aggregate</td><td></td><td className="num">$30.0M</td><td>—</td><td className="num">$1.35M / yr</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="lp-section-head">
              <div><span className="eyebrow">EXHIBIT 07</span><h2>Philanthropic Giving</h2></div>
              <div className="right">FY 2025 · inaugural year</div>
            </div>
            <div className="lp-frame tinted">
              <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:12, alignItems:'end'}}>
                <div>
                  <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
                  <div style={{fontFamily:'var(--serif)', fontSize:32, lineHeight:1, marginTop:4}}>$4.20M</div>
                  <div style={{fontSize:10.5, color:'var(--ink-500)', marginTop:3}}>15% of gross income · sale-year tax shield</div>
                </div>
                <Sparkline values={[0.12, 0.18, 0.25, 0.40, 0.55, 0.85, 4.20]} width={140} height={42} stroke="#8a6a2e" />
              </div>
              <table className="lp-table">
                <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
                <tbody>
                  <tr><td>Founders' Pledge DAF (Schwab)</td><td className="num">$3.50M</td><td className="num">In-kind equity</td></tr>
                  <tr><td>Stanford GSB · Endowed Scholarship</td><td className="num">$0.40M</td><td className="num">Cash</td></tr>
                  <tr><td>Climate-focused recurring grants (5)</td><td className="num">$0.20M</td><td className="num">Cash</td></tr>
                  <tr><td>Local & alumni giving</td><td className="num">$0.10M</td><td className="num">Cash</td></tr>
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
          <div className="right">2024 actual → 2026 projected · deployment ramp</div>
        </div>
        <div className="lp-frame" style={{flex:1}}>
          <div className="lp-chart-fit">
            <NetCashLine
              height={400}
              points={[
                { x: "2024 Q1", y: 12.0e6 }, { x: "Q2", y: 14.5e6 }, { x: "Q3", y: 16.2e6 }, { x: "Q4", y: 22.0e6 },
                { x: "2025 Q1", y: 168.0e6 }, { x: "Q2", y: 172.5e6 }, { x: "Q3", y: 164.0e6 }, { x: "Q4", y: 158.0e6 },
                { x: "2026 Q1", y: 152.4e6 }, { x: "Q2", y: 146.0e6 }, { x: "Q3", y: 140.5e6 }, { x: "Q4", y: 135.0e6 },
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

window.PrintPostLiquidityLandscape = PrintPostLiquidityLandscape;
