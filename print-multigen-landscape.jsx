/* Print-formatted Multi-Generational Family — 1280×720 landscape deck */

function PrintMultiGenLandscape() {
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

  const inflowSources = [
    { name: "Trust Distributions (G1 → G2/G3)", color: "#0e1620", values: [0.85,0.82,0.92,0.88,0.85,0.92,0.88,0.85,0.92,0.88,0.85,1.40].map(v=>v*1e6) },
    { name: "Investment Income (Munis, Divs)",  color: "#4a5468", values: [1.10,1.05,1.45,1.18,1.12,1.45,1.18,1.10,1.42,1.20,1.14,1.65].map(v=>v*1e6) },
    { name: "PE / Hedge Fund Distributions",     color: "#1f4a4f", values: [0.32,0.28,0.85,0.42,0.38,1.05,0.40,0.36,0.92,0.42,0.38,1.85].map(v=>v*1e6) },
    { name: "Operating Co. Dividends (G1 stake)",color: "#8a6a2e", values: [0.42,0.42,0.78,0.42,0.42,0.78,0.42,0.42,0.78,0.42,0.42,1.10].map(v=>v*1e6) },
    { name: "Royalty & Other",                    color: "#d8c393", values: [0.16,0.14,0.20,0.20,0.17,0.20,0.04,0.05,0.16,0.04,0.05,0.20].map(v=>v*1e6) },
  ];

  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.85,0.78,2.85,4.55,0.85,2.65,0.85,0.78,2.65,0.85,0.78,1.40].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.78,0.72,0.85,0.78,0.78,0.85,0.78,0.78,0.85,0.78,0.78,0.92].map(v=>v*1e6) },
    { name: "Distributions to G2/G3",     color: "#1f4a4f", values: [0.30,0.28,0.55,0.42,0.32,0.45,0.45,0.40,0.45,0.42,0.40,1.96].map(v=>v*1e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0.20,0.18,0.85,0.45,0.20,0.45,0.20,0.20,0.40,0.20,0.18,2.29].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.2375e6) },
    { name: "Capital Calls (Private)",    color: "#a3823f", values: [0.20,0.22,0.55,1.85,0.25,0.45,0.20,0.30,0.55,0.25,0.20,0.18].map(v=>v*1e6) },
    { name: "Family Office & Prof'l",     color: "#d8c393", values: [0.05,0.10,0.04,0.10,0.10,0.0625,0.13,0.13,0.10,0.13,0.07,0.16].map(v=>v*1e6) },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",       custodian: "First Republic / JPM",      balance: 4.20e6,   yield: 0.10, tenor: "On demand", note: "G1 + Trust + LLC ops accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings",      custodian: "Meridian / Northern Trust", balance: 12.40e6,  yield: 4.20, tenor: "On demand", note: "Multi-entity sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Tax-Exempt", custodian: "Fidelity · FTEXX",          balance: 18.60e6,  yield: 3.55, tenor: "T+1 liquidity", note: "After-tax equivalent ≈ 5.50%", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",       custodian: "Brokered, multi-bank",      balance: 8.20e6,   yield: 5.00, tenor: "3·6·9·12 mo rungs", note: "Funds Q4 distributions", color: "#a3823f" },
  ];

  const entities = [
    { name: "G1 Personal (J. & E. Asher)",       inflows: 9.20e6,  outflows: 12.80e6, net: -3.60e6 },
    { name: "Asher Family Trust (GST-exempt)",   inflows: 14.50e6, outflows: 11.20e6, net: 3.30e6 },
    { name: "G2 Children's Trusts (×3)",         inflows: 6.80e6,  outflows: 6.10e6,  net: 0.70e6 },
    { name: "Asher Family Foundation (501c3)",   inflows: 5.20e6,  outflows: 4.95e6,  net: 0.25e6 },
    { name: "Investment LLCs (×4)",              inflows: 5.20e6,  outflows: 6.40e6,  net: -1.20e6 },
    { name: "Family Office LLC",                 inflows: 1.20e6,  outflows: 1.45e6,  net: -0.25e6 },
  ];

  const archetype = "Asher Family · Multi-Generational";
  const period = "Calendar Year 2025 / 2026 Outlook";

  const inflowDonut = inflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }));
  const outflowDonut = outflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }));

  return (
    <>
      {/* SLIDE 01 — COVER */}
      <section className="lp-slide" data-screen-label="01 Cover">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="01 / 12" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-headline" style={{marginTop:6}}>
          <h1 style={{maxWidth:'34ch', fontSize:42, marginBottom:18}}>Stewarding <em>$420M</em> across three generations.</h1>
          <div className="lede">
            Consolidated view across G1 personal, the GST-exempt family trust, three G2 children's trusts, the family
            foundation, and four investment LLCs. Cash flow is structurally negative on a personal-name basis (−$3.6M)
            but offset by trust-level accumulation. Foundation MRD satisfied; G2/G3 distributions met estate-planning targets.
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14, marginTop:18, borderTop:'1px solid var(--rule-strong)', paddingTop:12}}>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entities</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>6 entities · 14 accounts</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>$420M consolidated</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Generations Active</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>G1 (2) · G2 (3) · G3 (4)</div></div>
          <div><div style={{fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div><div style={{fontSize:12, fontWeight:500, marginTop:3}}>D. Yates · K. Park (Trust)</div></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="lp-section-head">
            <div><span className="eyebrow">CASH POSITION SUMMARY</span><h2>Opening → Activity → Closing</h2></div>
            <div className="right">Calendar 2025 · YTD 2026</div>
          </div>
          <CashPositionSummary periods={[
            { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 31.00e6, inflows: totalIn, outflows: totalOut, closing: 24.00e6 },
            { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 24.00e6, inflows: 12.85e6, outflows: 13.95e6, closing: 22.90e6 },
          ]} />
        </div>

        <div className="lp-stretch"></div>
        <LPFooter archetype={archetype} page="01 / 12" />
      </section>

      {/* SLIDE 02 — DIVIDER: ENTITIES */}
      <LPDivider archetype={archetype} page="02 / 12" sectionNum="Section I"
        title="Six entities," titleEm="one consolidated view."
        blurb="The structural map of the family balance sheet — where each dollar is held, by which trust or entity, and how the consolidated picture nets out across generations."
        indexItems={["Entity-level cash flow consolidation", "Trust distributions & estate planning targets"]}
      />

      {/* SLIDE 03 — Entity consolidation table */}
      <section className="lp-slide" data-screen-label="03 Entity Consolidation">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="03 / 12 · ENTITIES" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Entity-Level Consolidation</h2></div>
          <div className="right">FY 2025 · USD millions</div>
        </div>
        <div className="lp-frame" style={{flex:1}}>
          <table className="lp-table">
            <thead>
              <tr>
                <th>Entity</th>
                <th className="num">Inflows</th>
                <th className="num">Outflows</th>
                <th className="num">Net</th>
                <th>Composition</th>
              </tr>
            </thead>
            <tbody>
              {entities.map((e, i) => (
                <tr key={i}>
                  <td style={{fontWeight:500}}>{e.name}</td>
                  <td className="num">{fmt.m(e.inflows)}</td>
                  <td className="num">{fmt.m(e.outflows)}</td>
                  <td className="num" style={{color: e.net < 0 ? 'var(--neg)' : 'var(--pos)'}}>
                    {e.net < 0 ? "(" : ""}{fmt.m(Math.abs(e.net))}{e.net < 0 ? ")" : ""}
                  </td>
                  <td style={{width: 280}}>
                    <HStackBar items={[
                      { name: "Inflows", value: e.inflows, color: "#2f6b3a" },
                      { name: "Outflows", value: e.outflows, color: "#8a3a2b" },
                    ]} height={9} />
                  </td>
                </tr>
              ))}
              <tr className="total">
                <td>Consolidated</td>
                <td className="num">{fmt.m(totalIn)}</td>
                <td className="num">{fmt.m(totalOut)}</td>
                <td className="num" style={{color:'var(--neg)'}}>({fmt.m(Math.abs(totalIn - totalOut))})</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <p className="lp-advisor-note" style={{marginTop:14}}>
            "Personal-name negative is by design — the family trust accumulates while G1 spends from current income.
            G2/G3 distributions are pacing to the 2025 estate-planning model; foundation MRD satisfied with $0.25M of slack."
            <span className="who">— D. Yates, lead advisor</span>
          </p>
        </div>
        <LPFooter archetype={archetype} page="03 / 12" />
      </section>

      {/* SLIDE 04 — DIVIDER: FLOWS */}
      <LPDivider archetype={archetype} page="04 / 12" sectionNum="Section II"
        title="The shape of" titleEm="consolidated cash."
        blurb="Twelve months of activity rolled up across all six entities — when income lands, when tax and trust distributions leave, and what the consolidated rhythm looks like."
        indexItems={["Monthly inflows, outflows & net position", "Sources of inflows — stacked & composition", "Outflows by category — stacked & composition"]}
      />

      {/* SLIDE 05 — Monthly signed flows */}
      <section className="lp-slide" data-screen-label="05 Monthly Flows">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="05 / 12 · MONTHLY" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Monthly Inflows, Outflows & Net Position</h2></div>
          <div className="right">FY 2025 · consolidated · USD M</div>
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
        <LPFooter archetype={archetype} page="05 / 12" />
      </section>

      {/* SLIDE 06 — Inflow stack + donut */}
      <section className="lp-slide" data-screen-label="06 Inflow Composition">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="06 / 12 · INFLOWS" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 03</span><h2>Sources of Inflows — Stacked & Composition</h2></div>
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
        <LPFooter archetype={archetype} page="06 / 12" />
      </section>

      {/* SLIDE 07 — Outflow stack + donut */}
      <section className="lp-slide" data-screen-label="07 Outflow Composition">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="07 / 12 · OUTFLOWS" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Outflows by Category — Stacked & Composition</h2></div>
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
        <LPFooter archetype={archetype} page="07 / 12" />
      </section>

      {/* SLIDE 08 — DIVIDER: LIQUIDITY & TAX */}
      <LPDivider archetype={archetype} page="08 / 12" sectionNum="Section III"
        title="Liquidity," titleEm="and the cost of compliance."
        blurb="Where the multi-entity cash sits, how it earns, and the federal & state burden across personal, trust, and foundation filings. Tax-exempt MMF carries the bulk of liquidity for top-bracket G1 holdings."
        indexItems={["Cash & liquidity instruments · multi-entity", "Tax cash flow detail · personal + fiduciary"]}
      />

      {/* SLIDE 09 — Cash instruments */}
      <section className="lp-slide" data-screen-label="09 Cash Instruments">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="09 / 12 · LIQUIDITY" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Cash & Liquidity Instruments</h2></div>
          <div className="right">As of 12.31.2025 · multi-entity</div>
        </div>
        <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />
        <div className="lp-spacer"></div>
        <p className="lp-advisor-note">
          "Tax-exempt MMF carries the bulk of liquidity at a 5.50% taxable-equivalent yield for top-bracket G1 holdings.
          The CD ladder funds Q4 trust distributions without disrupting the muni allocation. Cross-entity cash is swept nightly
          to a Northern Trust master account."
          <span className="who">— Treasury & multi-entity cash management</span>
        </p>
        <div className="lp-stretch"></div>
        <LPFooter archetype={archetype} page="09 / 12" />
      </section>

      {/* SLIDE 10 — Tax detail */}
      <section className="lp-slide" data-screen-label="10 Tax Detail">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="10 / 12 · TAX" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-section-head">
          <div><span className="eyebrow">EXHIBIT 06</span><h2>Tax Cash Flow Detail</h2></div>
          <div className="right">Personal + Fiduciary + Foundation</div>
        </div>
        <div className="lp-cols-2" style={{flex:1, minHeight:0}}>
          <div className="lp-frame">
            <div className="frame-head"><div className="t">Tax burden by entity</div><div className="s">FY 2025</div></div>
            <table className="lp-table">
              <thead><tr><th>Entity / Filing</th><th className="num">Federal</th><th className="num">State</th><th className="num">Total</th></tr></thead>
              <tbody>
                <tr><td>G1 Personal — Q1–Q4 Estimated</td><td className="num">$4.85M</td><td className="num">$1.35M</td><td className="num">$6.20M</td></tr>
                <tr><td>Family Trust (GST-exempt) — fiduciary</td><td className="num">$3.45M</td><td className="num">$0.95M</td><td className="num">$4.40M</td></tr>
                <tr><td>G2 Children's Trusts (×3) — fiduciary</td><td className="num">$2.42M</td><td className="num">$0.68M</td><td className="num">$3.10M</td></tr>
                <tr><td>Investment LLCs — composite filings</td><td className="num">$0.65M</td><td className="num">$0.25M</td><td className="num">$0.90M</td></tr>
                <tr><td>Property Tax — 4 residences</td><td className="num">—</td><td className="num">$1.85M</td><td className="num">$1.85M</td></tr>
                <tr><td>Foundation Excise Tax (1.39%)</td><td className="num">$0.45M</td><td className="num">—</td><td className="num">$0.45M</td></tr>
                <tr className="total"><td>Total</td><td className="num">$11.82M</td><td className="num">$5.08M</td><td className="num">$16.90M</td></tr>
              </tbody>
            </table>
          </div>
          <div className="lp-frame tinted">
            <div className="frame-head"><div className="t">Effective rate analysis</div><div className="s">vs. consolidated income</div></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:8}}>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Consolidated Income</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$42.50M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Tax</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$16.90M</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Effective Rate</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4, color:'var(--gold-700)'}}>39.8%</div>
              </div>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>After-Tax</div>
                <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:4}}>$25.60M</div>
              </div>
            </div>
            <div style={{marginTop:18, paddingTop:12, borderTop:'1px solid var(--rule)'}}>
              <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)', marginBottom:6}}>Strategy notes</div>
              <ul style={{margin:0, paddingLeft:16, fontSize:11, lineHeight:1.55, color:'var(--ink-700)'}}>
                <li>Trusts compressed past the top fiduciary bracket at $15,200 — minimum distribution discipline used to push income down to G2/G3 brackets where appropriate.</li>
                <li>Muni interest of $6.40M is federal-tax-exempt; AMT-free positioning preserved across all three trust filings.</li>
                <li>Foundation MRD (5%) satisfied at $4.95M; excise tax minimized via two-tier method.</li>
              </ul>
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="10 / 12" />
      </section>

      {/* SLIDE 11 — DIVIDER: FORWARD */}
      <LPDivider archetype={archetype} page="11 / 12" sectionNum="Section IV"
        title="What's owed," titleEm="what's given, what's coming."
        blurb="The credit footprint across residences and lines, the family's structured philanthropy through the foundation and DAF, and the consolidated forward forecast through 2026."
        indexItems={["Debt service & credit lines", "Philanthropic giving · foundation + DAF", "Consolidated cash position & forecast"]}
      />

      {/* SLIDE 12 — Debt + Philanthropy + Forecast (3-zone) */}
      <section className="lp-slide" data-screen-label="12 Debt Giving Forecast">
        <LPRunners tl="MERIDIAN · CONSOLIDATED CASH FLOW" tr="12 / 12 · OUTLOOK" />
        <LPMast archetype={archetype} period={period} />
        <div className="lp-cols-2" style={{flex:1, minHeight:0, gap:18}}>
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div>
              <div className="lp-section-head">
                <div><span className="eyebrow">EXHIBIT 07</span><h2>Debt Service & Credit Lines</h2></div>
                <div className="right">As of 12.31.2025</div>
              </div>
              <div className="lp-frame">
                <table className="lp-table">
                  <thead><tr><th>Facility</th><th>Lender</th><th>Balance</th><th>Rate</th></tr></thead>
                  <tbody>
                    <tr><td>Primary Residence Mortgage (NY)</td><td>JPM Pvt. Bank</td><td>$8.4M</td><td>4.65%</td></tr>
                    <tr><td>Aspen Compound Mortgage</td><td>JPM Pvt. Bank</td><td>$6.2M</td><td>5.10%</td></tr>
                    <tr><td>SBL — Trust-Held (×2 facilities)</td><td>Northern Trust</td><td>$0 / $80M</td><td>SOFR + 0.65</td></tr>
                    <tr><td>Foundation Bridge Line</td><td>Meridian Pvt. Bank</td><td>$0 / $5M</td><td>SOFR + 0.95</td></tr>
                    <tr className="total"><td>Aggregate</td><td></td><td className="num">$14.6M</td><td className="num">$2.85M / yr</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="lp-section-head">
                <div><span className="eyebrow">EXHIBIT 08</span><h2>Philanthropic Giving</h2></div>
                <div className="right">FY 2025</div>
              </div>
              <div className="lp-frame tinted">
                <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:10, alignItems:'end'}}>
                  <div>
                    <div style={{fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
                    <div style={{fontFamily:'var(--serif)', fontSize:28, lineHeight:1, marginTop:3}}>$5.40M</div>
                    <div style={{fontSize:10, color:'var(--ink-500)', marginTop:3}}>Foundation MRD + family DAF + recurring</div>
                  </div>
                  <Sparkline values={[3.85, 4.10, 4.42, 4.80, 5.05, 5.20, 5.40]} width={140} height={42} stroke="#8a6a2e" />
                </div>
                <table className="lp-table">
                  <thead><tr><th>Vehicle / Recipient</th><th className="num">Amount</th><th className="num">Method</th></tr></thead>
                  <tbody>
                    <tr><td>Asher Family Foundation — MRD</td><td className="num">$4.95M</td><td className="num">Grants (32)</td></tr>
                    <tr><td>Family DAF + G2-directed</td><td className="num">$0.45M</td><td className="num">Mixed</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <div className="lp-section-head">
              <div><span className="eyebrow">EXHIBIT 09</span><h2>Consolidated Net Cash & Forecast</h2></div>
              <div className="right">2024 actual → 2026 projected</div>
            </div>
            <div className="lp-frame" style={{flex:1, height:'100%'}}>
              <div className="lp-chart-fit" style={{height:'100%'}}>
                <NetCashLine
                  height={420}
                  points={[
                    { x: "2024 Q1", y: 28.5e6 }, { x: "Q2", y: 27.2e6 }, { x: "Q3", y: 29.4e6 }, { x: "Q4", y: 31.0e6 },
                    { x: "2025 Q1", y: 30.8e6 }, { x: "Q2", y: 28.6e6 }, { x: "Q3", y: 27.2e6 }, { x: "Q4", y: 24.0e6 },
                    { x: "2026 Q1", y: 22.9e6 }, { x: "Q2", y: 21.4e6 }, { x: "Q3", y: 20.1e6 }, { x: "Q4", y: 19.5e6 },
                  ]}
                  forecastFromIndex={8}
                />
              </div>
            </div>
          </div>
        </div>
        <LPFooter archetype={archetype} page="12 / 12" />
      </section>
    </>
  );
}

window.PrintMultiGenLandscape = PrintMultiGenLandscape;
