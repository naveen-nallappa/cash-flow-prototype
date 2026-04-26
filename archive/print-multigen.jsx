/* Print-formatted Multi-Generational Family — 8.5 x 11, 6 pages */

function PrintMultiGen() {
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const monthly = [
    { m: "JAN", in: 2.85e6, out: 2.42e6, net: 0.43e6 }, { m: "FEB", in: 2.71e6, out: 2.31e6, net: 0.40e6 },
    { m: "MAR", in: 4.20e6, out: 5.92e6, net: -1.72e6 }, { m: "APR", in: 3.10e6, out: 8.40e6, net: -5.30e6 },
    { m: "MAY", in: 2.94e6, out: 2.65e6, net: 0.29e6 }, { m: "JUN", in: 4.40e6, out: 5.10e6, net: -0.70e6 },
    { m: "JUL", in: 2.92e6, out: 2.68e6, net: 0.24e6 }, { m: "AUG", in: 2.78e6, out: 2.66e6, net: 0.12e6 },
    { m: "SEP", in: 4.20e6, out: 5.05e6, net: -0.85e6 }, { m: "OCT", in: 2.96e6, out: 2.71e6, net: 0.25e6 },
    { m: "NOV", in: 2.84e6, out: 2.59e6, net: 0.25e6 }, { m: "DEC", in: 6.20e6, out: 7.40e6, net: -1.20e6 },
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

  const outflowSources = [
    { name: "Federal & State Taxes",     color: "#0e1620", values: [0.85,0.78,2.85,4.55,0.85,2.65,0.85,0.78,2.65,0.85,0.78,1.40].map(v=>v*1e6) },
    { name: "Lifestyle & Household",      color: "#4a5468", values: [0.78,0.72,0.85,0.78,0.78,0.85,0.78,0.78,0.85,0.78,0.78,0.92].map(v=>v*1e6) },
    { name: "Distributions to G2/G3",     color: "#1f4a4f", values: [0.30,0.28,0.55,0.42,0.32,0.45,0.45,0.40,0.45,0.42,0.40,1.96].map(v=>v*1e6) },
    { name: "Philanthropy",               color: "#8a6a2e", values: [0.20,0.18,0.85,0.45,0.20,0.45,0.20,0.20,0.40,0.20,0.18,2.29].map(v=>v*1e6) },
    { name: "Debt Service",               color: "#6b7587", values: Array(12).fill(0.2375e6) },
    { name: "Capital Calls (Private)",    color: "#a3823f", values: [0.20,0.22,0.55,1.85,0.25,0.45,0.20,0.30,0.55,0.25,0.20,0.18].map(v=>v*1e6) },
    { name: "Family Office & Prof'l",     color: "#d8c393", values: [0.05,0.10,0.04,0.10,0.10,0.0625,0.13,0.13,0.10,0.13,0.07,0.16].map(v=>v*1e6) },
  ];

  const spending = [
    { name: "Federal & State Taxes", color: "#0e1620", value: 16.80e6 },
    { name: "Lifestyle & Household", color: "#4a5468", value: 8.95e6 },
    { name: "Distributions to G2 / G3", color: "#1f4a4f", value: 6.40e6 },
    { name: "Philanthropy", color: "#8a6a2e", value: 5.80e6 },
    { name: "Capital Calls (Private)", color: "#a3823f", value: 4.20e6 },
    { name: "Debt Service", color: "#6b7587", value: 2.85e6 },
    { name: "Family Office & Professional", color: "#d8c393", value: 1.90e6 },
  ];

  const entities = [
    { name: "G1 Personal (J. & E. Asher)",     inflows: 9.20e6, outflows: 12.80e6, net: -3.60e6 },
    { name: "Asher Family Trust (GST-exempt)", inflows: 14.50e6, outflows: 11.20e6, net: 3.30e6 },
    { name: "G2 Children's Trusts (×3)",       inflows: 6.80e6, outflows: 6.10e6,  net: 0.70e6 },
    { name: "Asher Family Foundation",         inflows: 5.20e6, outflows: 4.95e6,  net: 0.25e6 },
    { name: "Investment LLCs (×4)",            inflows: 5.20e6, outflows: 6.40e6,  net: -1.20e6 },
    { name: "Family Office LLC",               inflows: 1.20e6, outflows: 1.45e6,  net: -0.25e6 },
  ];

  const cashInstruments = [
    { name: "Operating Cash · Checking",       custodian: "First Republic / JPM",      balance: 4.20e6,   yield: 0.10, tenor: "On demand", note: "G1 + Trust + LLC ops accounts", color: "#6b7587" },
    { name: "Bank Deposits · HY Savings",      custodian: "Meridian Pvt. Bank · Northern Trust", balance: 12.40e6, yield: 4.20, tenor: "On demand", note: "Multi-entity sweep tier 1", color: "#4a5468" },
    { name: "Money Market Funds · Tax-Exempt", custodian: "Fidelity · FTEXX",          balance: 18.60e6,  yield: 3.55, tenor: "T+1 liquidity", note: "After-tax equivalent ≈ 5.50%", color: "#0e1620" },
    { name: "Term Deposits · CD Ladder",       custodian: "Brokered, multi-bank",      balance: 8.20e6,   yield: 5.00, tenor: "3·6·9·12 mo rungs", note: "Funds Q4 distributions", color: "#a3823f" },
  ];

  const archetype = "Asher Family · Multi-Generational";
  const period = "Calendar Year 2025 / 2026 Outlook";

  return (
    <>
      {/* PAGE 1 — Cover + Cash position summary + Entity table */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 01 / 06" />
        <PrintMast archetype={archetype} period={period} />
        <div className="p-headline" style={{marginTop:8}}>
          <h1>Stewarding <em>$420M</em> across three generations and six entities.</h1>
          <p className="lede" style={{maxWidth:'62ch'}}>
            Consolidated view across G1 personal, the GST-exempt family trust, three G2 children's trusts, the family
            foundation, and four investment LLCs. Cash flow is structurally negative on a personal-name basis (−$3.6M)
            but offset by trust-level accumulation. Foundation MRD satisfied; G2/G3 distributions met estate-planning targets.
          </p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14, marginTop:14, borderTop:'1px solid var(--rule-strong)', paddingTop:10}}>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Reporting Entities</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>6 entities · 14 accounts</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Net Worth (Est.)</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>$420M consolidated</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Generations</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>G1 (2) · G2 (3) · G3 (4)</div></div>
          <div><div style={{fontSize:'7pt', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-500)'}}>Lead Advisor</div><div style={{fontSize:'9.5pt', fontWeight:500, marginTop:2}}>D. Yates · K. Park</div></div>
        </div>

        <div className="p-section-head" style={{marginTop:14}}>
          <div><span className="eyebrow">CASH POSITION SUMMARY</span><h2>Opening → Activity → Closing</h2></div>
          <div className="right">Calendar 2025 · YTD 2026</div>
        </div>
        <CashPositionSummary periods={[
          { label: "FY 2025 (Closed)", asOfStart: "Jan 1, 2025", asOfEnd: "Dec 31, 2025", opening: 31.00e6, inflows: totalIn, outflows: totalOut, closing: 24.00e6 },
          { label: "YTD 2026", asOfStart: "Jan 1, 2026", asOfEnd: "Apr 25, 2026", opening: 24.00e6, inflows: 12.85e6, outflows: 13.95e6, closing: 22.90e6 },
        ]} />

        <div className="p-section-head" style={{marginTop:10}}>
          <div><span className="eyebrow">EXHIBIT 01</span><h2>Entity-Level Consolidation</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Entity</th><th className="num">Inflows</th><th className="num">Outflows</th><th className="num">Net</th></tr></thead>
            <tbody>
              {entities.map((e, i) => (
                <tr key={i}>
                  <td style={{fontWeight:500}}>{e.name}</td>
                  <td className="num">{fmt.m(e.inflows)}</td>
                  <td className="num">{fmt.m(e.outflows)}</td>
                  <td className="num" style={{color: e.net < 0 ? 'var(--neg)' : 'var(--pos)'}}>{e.net < 0 ? '(' : ''}{fmt.m(Math.abs(e.net))}{e.net < 0 ? ')' : ''}</td>
                </tr>
              ))}
              <tr className="total"><td>Consolidated</td><td className="num">{fmt.m(totalIn)}</td><td className="num">{fmt.m(totalOut)}</td><td className="num neg">({fmt.m(Math.abs(totalNet))})</td></tr>
            </tbody>
          </table>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="01 / 06" />
      </div>

      {/* PAGE 2 — Signed monthly + Inflow stack */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 02 / 06 · MONTHLY FLOWS" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 02</span><h2>Monthly Inflows, Outflows & Net</h2></div>
          <div className="right">Consolidated · 2025</div>
        </div>
        <div className="p-frame">
          <div className="p-legend" style={{marginBottom:6}}>
            <span className="item"><span className="sw" style={{background:'#2f6b3a'}}></span>Inflows (above)</span>
            <span className="item"><span className="sw" style={{background:'#8a3a2b'}}></span>Outflows (below)</span>
            <span className="item"><span className="sw" style={{background:'#0e1620', borderRadius:'50%'}}></span>Net (dotted)</span>
          </div>
          <MonthlyFlowChartSigned data={monthly} height={200} />
        </div>

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 03</span><h2>Sources of Inflows — Stacked Monthly</h2></div>
          <div className="right">By source</div>
        </div>
        <div className="p-frame">
          <StackedMonthlyChart months={months} sources={inflowSources} height={180} />
          <div className="p-legend" style={{marginTop:8}}>
            {inflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
          </div>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="02 / 06" />
      </div>

      {/* PAGE 3 — Inflow donut + Outflow stack */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 03 / 06 · COMPOSITION & OUTFLOWS" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 04</span><h2>Composition of Inflows</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:20, alignItems:'center'}}>
          <Donut size={160} data={inflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))} />
          <div style={{display:'grid', gridTemplateColumns:'1fr', gap:4}}>
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
          <div><span className="eyebrow">EXHIBIT 05</span><h2>Outflows by Category — Monthly</h2></div>
          <div className="right">Plotted negative</div>
        </div>
        <div className="p-frame">
          <StackedMonthlySignedChart months={months} sources={outflowSources} height={180} sign={-1} />
          <div className="p-legend" style={{marginTop:8}}>
            {outflowSources.map(s => <span className="item" key={s.name}><span className="sw" style={{background:s.color}}></span>{s.name}</span>)}
          </div>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="03 / 06" />
      </div>

      {/* PAGE 4 — Outflow donut + Cash instruments */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 04 / 06 · OUTFLOW MIX & LIQUIDITY" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 06</span><h2>Composition of Outflows</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:20, alignItems:'center'}}>
          <Donut size={160} data={outflowSources.map(s => ({ name: s.name, color: s.color, value: s.values.reduce((a,b)=>a+b,0) }))} />
          <div style={{display:'grid', gridTemplateColumns:'1fr', gap:4}}>
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

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 07</span><h2>Cash & Liquidity Instruments</h2></div>
          <div className="right">Consolidated · as of 12.31.2025</div>
        </div>
        <CashInstruments items={cashInstruments} asOf="Dec 31, 2025" />

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="04 / 06" />
      </div>

      {/* PAGE 5 — Tax + Debt */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 05 / 06 · TAX & DEBT" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 08</span><h2>Tax Cash Flow — Multi-Entity</h2></div>
          <div className="right">Federal + State + Local</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
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

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 09</span><h2>Debt Service & Credit Lines</h2></div>
          <div className="right">Across residences & entities</div>
        </div>
        <div className="p-frame">
          <table className="p-table">
            <thead><tr><th>Facility</th><th>Balance</th><th>Rate</th><th>Annual</th></tr></thead>
            <tbody>
              <tr><td>NY Residence Mortgage · trust-held</td><td>$13.8M</td><td>5.20% fixed</td><td className="num">$0.92M</td></tr>
              <tr><td>Palm Beach Mortgage</td><td>$8.4M</td><td>4.95% fixed</td><td className="num">$0.55M</td></tr>
              <tr><td>London Residence · GBP-denominated</td><td>£5.8M</td><td>SONIA + 1.05</td><td className="num">$0.48M</td></tr>
              <tr><td>Securities-Backed Line · LLC-pledged</td><td>$22M / $75M</td><td>SOFR + 0.75</td><td className="num">$0.65M</td></tr>
              <tr><td>Yacht Financing</td><td>$5.2M</td><td>5.85% fixed</td><td className="num">$0.25M</td></tr>
              <tr className="total"><td>Aggregate</td><td>$57.0M+</td><td>—</td><td className="num">$2.85M</td></tr>
            </tbody>
          </table>
        </div>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="05 / 06" />
      </div>

      {/* PAGE 6 — Philanthropy + Forecast */}
      <div className="page">
        <PrintRunners left="MERIDIAN · CONSOLIDATED CASH FLOW" right="PAGE 06 / 06 · GIVING & FORECAST" />
        <PrintMast archetype={archetype} period={period} />

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 10</span><h2>Philanthropic Giving · Foundation + Direct</h2></div>
          <div className="right">FY 2025</div>
        </div>
        <div className="p-frame">
          <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:12, marginBottom:8, alignItems:'end'}}>
            <div>
              <div style={{fontSize:'7pt', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-500)'}}>Total Charitable Outflow</div>
              <div style={{fontFamily:'var(--serif)', fontSize:'22pt', lineHeight:1, marginTop:2}}>$5.80M</div>
              <div style={{fontSize:'8pt', color:'var(--ink-500)', marginTop:2}}>Foundation MRD: $4.50M (5.00%) · satisfied</div>
            </div>
            <Sparkline values={[3.8, 4.2, 4.6, 4.9, 5.2, 5.5, 5.8]} width={120} height={36} stroke="#8a6a2e" />
          </div>
          <table className="p-table">
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

        <div className="p-section-head">
          <div><span className="eyebrow">EXHIBIT 11</span><h2>Net Cash & Forward Forecast</h2></div>
          <div className="right">Consolidated reserves · 2024 → 2026</div>
        </div>
        <div className="p-frame">
          <NetCashLine
            height={180}
            points={[
              { x: "2024 Q1", y: 28e6 }, { x: "Q2", y: 26e6 }, { x: "Q3", y: 27e6 }, { x: "Q4", y: 31e6 },
              { x: "2025 Q1", y: 29e6 }, { x: "Q2", y: 27e6 }, { x: "Q3", y: 26e6 }, { x: "Q4", y: 24e6 },
              { x: "2026 Q1", y: 23e6 }, { x: "Q2", y: 22e6 }, { x: "Q3", y: 23e6 }, { x: "Q4", y: 26e6 },
            ]}
            forecastFromIndex={8}
          />
          <div className="p-legend" style={{marginTop:6}}>
            <span className="item"><span className="sw" style={{background:'#0e1620'}}></span>Liquid reserves</span>
            <span className="item"><span className="sw" style={{background:'#a3823f'}}></span>Projected</span>
            <span className="item"><span className="sw" style={{background:'#f0e6cf'}}></span>Forecast period</span>
          </div>
        </div>

        <p className="p-advisor-note" style={{marginTop:10}}>
          "G1 personal-level shortfall of $3.6M was funded from trust distributions; we recommend evaluating a $4–6M annual
          distribution increase from the Family Trust to normalize the structural gap rather than drawing reserves."
          <span className="who">— Trust counsel recommendation</span>
        </p>

        <div className="stretch"></div>
        <PrintFooter archetype={archetype} page="06 / 06" />
      </div>
    </>
  );
}

window.PrintMultiGen = PrintMultiGen;
