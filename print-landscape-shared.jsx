/* Shared landscape print components — used by all 3 decks */

const LPRunners = ({ tl, tr, bl, br }) => (
  <>
    {tl && <div className="lp-runner tl">{tl}</div>}
    {tr && <div className="lp-runner tr">{tr}</div>}
    {bl && <div className="lp-runner bl">{bl}</div>}
    {br && <div className="lp-runner br">{br}</div>}
  </>
);

const LPMast = ({ archetype, period }) => (
  <div className="lp-mast">
    <div className="brand" style={{display:'flex', alignItems:'center', gap:12}}>
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

const LPFooter = ({ archetype, page }) => (
  <div className="lp-footer">
    <div>
      Prepared by Meridian Family Office for the use of the named client only. Figures unaudited and consolidated across personal,
      trust, and investment-entity accounts. Projected 2026 values reflect base-case advisor assumptions.
    </div>
    <div style={{textAlign:'right', fontFamily:'var(--mono)', letterSpacing:'0.18em'}}>
      {archetype.toUpperCase()} · {page}
    </div>
  </div>
);

/* Section divider slide — dark/gold treatment between major sections */
function LPDivider({ archetype, sectionNum, title, titleEm, blurb, page, indexItems }) {
  return (
    <section className="lp-slide gold lp-divider-slide" data-screen-label={`${page} Section · ${title}`}>
      <LPRunners tl="MERIDIAN · CASH FLOW EXHIBIT" tr={`PAGE ${page}`} />
      <div className="top">
        <div className="mark">M</div>
        <div className="top-name">Meridian Family Office</div>
      </div>
      <div className="center">
        <div className="section-num">{sectionNum}</div>
        <h1>{title} {titleEm && <em>{titleEm}</em>}</h1>
        {blurb && <div className="blurb">{blurb}</div>}
        {indexItems && (
          <div className="index-table">
            {indexItems.map((it, i) => (
              <div className="row" key={i}><span className="n">{String(i+1).padStart(2,'0')}</span><span>{it}</span></div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div>{archetype}</div>
        <div>{page}</div>
      </div>
    </section>
  );
}

window.LPRunners = LPRunners;
window.LPMast = LPMast;
window.LPFooter = LPFooter;
window.LPDivider = LPDivider;
