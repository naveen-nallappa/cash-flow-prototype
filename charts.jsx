/* Reusable chart primitives: monthly waterfall, stacked bars, donut, line/area, sankey-lite, sparkline.
   All charts pure SVG, hover tooltips. Numbers formatted via fmt.
*/

const fmt = {
  m: (n) => {
    if (n == null) return "—";
    const a = Math.abs(n);
    const sign = n < 0 ? "−" : "";
    if (a >= 1e6) return sign + "$" + (a / 1e6).toFixed(2) + "M";
    if (a >= 1e3) return sign + "$" + (a / 1e3).toFixed(0) + "K";
    return sign + "$" + a.toFixed(0);
  },
  full: (n) => {
    if (n == null) return "—";
    const sign = n < 0 ? "−" : "";
    return sign + "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  },
  pct: (n) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%",
};

function useTooltip() {
  const [tip, setTip] = React.useState(null);
  const Tooltip = () =>
    tip ? (
      <div className="tooltip" style={{ left: tip.x + 12, top: tip.y - 8 }}>
        <div className="ttk">{tip.k}</div>
        <div className="ttv">{tip.v}</div>
        {tip.s && <div style={{ color: "#b8c2d1", fontSize: 10, marginTop: 2 }}>{tip.s}</div>}
      </div>
    ) : null;
  return { tip, setTip, Tooltip };
}

/* ——— Monthly Inflow / Outflow / Net bars ——— */
function MonthlyFlowChart({ data, height = 280, projectFromIndex = null }) {
  // data: [{m, in, out, net}]
  const { tip, setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 14, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => Math.max(d.in, d.out))) * 1.1;
  const min = Math.min(0, ...data.map((d) => d.net));
  const yScale = (v) => pad.t + innerH - ((v - min) / (max - min)) * innerH;
  const y0 = yScale(0);
  const groupW = innerW / data.length;
  const barW = Math.min(14, (groupW - 8) / 2);

  // y ticks
  const tickStep = Math.ceil((max / 4) / 1e6) * 1e6 || 1e6;
  const ticks = [];
  for (let v = 0; v <= max; v += tickStep) ticks.push(v);
  if (min < 0) {
    for (let v = -tickStep; v >= min; v -= tickStep) ticks.unshift(v);
  }

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* gridlines */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yScale(t)} y2={yScale(t)} stroke={t === 0 ? "#0e1620" : "#e2dbcc"} strokeWidth={t === 0 ? 1 : 0.5} />
            <text x={pad.l - 8} y={yScale(t) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {fmt.m(t)}
            </text>
          </g>
        ))}
        {/* Projection background */}
        {projectFromIndex != null && (
          <rect
            x={pad.l + groupW * projectFromIndex}
            y={pad.t}
            width={groupW * (data.length - projectFromIndex)}
            height={innerH}
            fill="#f0e6cf"
            opacity="0.45"
          />
        )}
        {data.map((d, i) => {
          const x = pad.l + groupW * i + groupW / 2;
          const isProj = projectFromIndex != null && i >= projectFromIndex;
          return (
            <g key={i}>
              {/* in bar */}
              <rect
                x={x - barW - 1}
                y={yScale(d.in)}
                width={barW}
                height={y0 - yScale(d.in)}
                fill="#2f6b3a"
                opacity={isProj ? 0.45 : 1}
                onMouseEnter={(e) =>
                  setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + (isProj ? " · projected" : ""), v: "Inflows " + fmt.full(d.in) })
                }
                onMouseLeave={() => setTip(null)}
              />
              {/* out bar */}
              <rect
                x={x + 1}
                y={yScale(d.out)}
                width={barW}
                height={y0 - yScale(d.out)}
                fill="#8a3a2b"
                opacity={isProj ? 0.45 : 1}
                onMouseEnter={(e) =>
                  setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + (isProj ? " · projected" : ""), v: "Outflows " + fmt.full(d.out) })
                }
                onMouseLeave={() => setTip(null)}
              />
              {/* net dot */}
              <circle
                cx={x}
                cy={yScale(d.net)}
                r="3"
                fill="#0e1620"
                stroke="#fbf8f3"
                strokeWidth="1"
                onMouseEnter={(e) =>
                  setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + " · net", v: fmt.full(d.net) })
                }
                onMouseLeave={() => setTip(null)}
              />
              <text x={x} y={H - pad.b + 14} textAnchor="middle" fontSize="10" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">
                {d.m}
              </text>
            </g>
          );
        })}
        {/* net line */}
        <polyline
          fill="none"
          stroke="#0e1620"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          points={data.map((d, i) => `${pad.l + groupW * i + groupW / 2},${yScale(d.net)}`).join(" ")}
        />
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Stacked monthly inflows by source ——— */
function StackedMonthlyChart({ months, sources, height = 240 }) {
  // sources: [{name, color, values: [12 numbers]}]
  const { setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 14, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const totals = months.map((_, i) => sources.reduce((s, src) => s + src.values[i], 0));
  const max = Math.max(...totals) * 1.1;
  const yScale = (v) => pad.t + innerH - (v / max) * innerH;
  const groupW = innerW / months.length;
  const barW = Math.min(28, groupW - 12);

  const tickStep = Math.ceil((max / 4) / 1e6) * 1e6 || 1e6;
  const ticks = [];
  for (let v = 0; v <= max; v += tickStep) ticks.push(v);

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yScale(t)} y2={yScale(t)} stroke="#e2dbcc" strokeWidth="0.5" />
            <text x={pad.l - 8} y={yScale(t) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {fmt.m(t)}
            </text>
          </g>
        ))}
        {months.map((m, i) => {
          const x = pad.l + groupW * i + (groupW - barW) / 2;
          let yAcc = yScale(0);
          return (
            <g key={i}>
              {sources.map((src, si) => {
                const v = src.values[i];
                const h = (v / max) * innerH;
                yAcc -= h;
                return (
                  <rect
                    key={si}
                    x={x}
                    y={yAcc}
                    width={barW}
                    height={h}
                    fill={src.color}
                    onMouseEnter={(e) =>
                      setTip({
                        x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                        y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                        k: m + " · " + src.name,
                        v: fmt.full(v),
                        s: ((v / totals[i]) * 100).toFixed(1) + "% of month",
                      })
                    }
                    onMouseLeave={() => setTip(null)}
                  />
                );
              })}
              <text x={x + barW / 2} y={H - pad.b + 14} textAnchor="middle" fontSize="10" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Donut for category breakdown ——— */
function Donut({ data, size = 200, thickness = 36 }) {
  const { setTip, Tooltip } = useTooltip();
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 4;
  const ri = r - thickness;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const arcs = data.map((d) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ri * Math.cos(a1), yi1 = cy + ri * Math.sin(a1);
    const xi0 = cx + ri * Math.cos(a0), yi0 = cy + ri * Math.sin(a0);
    return {
      d: `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${xi1} ${yi1} A ${ri} ${ri} 0 ${large} 0 ${xi0} ${yi0} Z`,
      ...d,
      pct: (d.value / total) * 100,
    };
  });
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        {arcs.map((a, i) => (
          <path
            key={i}
            d={a.d}
            fill={a.color}
            onMouseEnter={(e) =>
              setTip({
                x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                k: a.name,
                v: fmt.full(a.value),
                s: a.pct.toFixed(1) + "%",
              })
            }
            onMouseLeave={() => setTip(null)}
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="#6b7587" letterSpacing="0.14em">
          TOTAL
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="18" fill="#0e1620" fontFamily="var(--serif)" fontWeight="500">
          {fmt.m(total)}
        </text>
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Net cash position over time, with forecast band ——— */
function NetCashLine({ points, height = 220, forecastFromIndex }) {
  const { setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 14, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const ys = points.map((p) => p.y);
  const ymin = Math.min(...ys, 0);
  const ymax = Math.max(...ys);
  const xS = (i) => pad.l + (i / (points.length - 1)) * innerW;
  const yS = (v) => pad.t + innerH - ((v - ymin) / (ymax - ymin)) * innerH;

  const ticksY = 4;
  const yTicks = [];
  for (let i = 0; i <= ticksY; i++) yTicks.push(ymin + ((ymax - ymin) * i) / ticksY);

  const path = points.map((p, i) => (i === 0 ? "M" : "L") + xS(i) + "," + yS(p.y)).join(" ");
  const area = path + ` L ${xS(points.length - 1)},${yS(ymin)} L ${xS(0)},${yS(ymin)} Z`;

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yS(t)} y2={yS(t)} stroke="#e2dbcc" strokeWidth="0.5" />
            <text x={pad.l - 8} y={yS(t) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {fmt.m(t)}
            </text>
          </g>
        ))}
        {forecastFromIndex != null && (
          <rect x={xS(forecastFromIndex)} y={pad.t} width={W - pad.r - xS(forecastFromIndex)} height={innerH} fill="#f0e6cf" opacity="0.45" />
        )}
        <path d={area} fill="#0e1620" opacity="0.07" />
        <path d={path} fill="none" stroke="#0e1620" strokeWidth="1.5" />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={xS(i)}
            cy={yS(p.y)}
            r={3}
            fill={forecastFromIndex != null && i >= forecastFromIndex ? "#a3823f" : "#0e1620"}
            onMouseEnter={(e) =>
              setTip({
                x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                k: p.x,
                v: fmt.full(p.y),
              })
            }
            onMouseLeave={() => setTip(null)}
          />
        ))}
        {points.map((p, i) => (
          <text key={i} x={xS(i)} y={H - pad.b + 14} textAnchor="middle" fontSize="9.5" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">
            {p.x}
          </text>
        ))}
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Drilldown row component ——— */
function DrilldownList({ items, total }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div>
      {items.map((it, i) => {
        const pct = (it.value / total) * 100;
        const isOpen = open === i;
        return (
          <React.Fragment key={i}>
            <div className={"drill-row" + (isOpen ? " open" : "")} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="caret">▸</span>
              <span className="name" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, background: it.color, display: "inline-block" }}></span>
                {it.name}
              </span>
              <span className="bar-wrap">
                <span className="bar" style={{ width: pct + "%", background: it.color }}></span>
              </span>
              <span className="pct">{pct.toFixed(1)}%</span>
              <span className="amt">{fmt.full(it.value)}</span>
            </div>
            {isOpen && it.children && (
              <div className="drill-detail">
                {it.children.map((c, j) => (
                  <div className="row" key={j}>
                    <span>{c.name}</span>
                    <span className="muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.tag || ""}</span>
                    <span className="v">{fmt.full(c.value)}</span>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ——— Capital calls / distributions monthly bar ——— */
function CallsDistributionsChart({ data, height = 200 }) {
  const { setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 14, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => Math.max(d.calls, d.dist))) * 1.15;
  const yS = (v) => pad.t + innerH / 2 - (v / max) * (innerH / 2);
  const yS2 = (v) => pad.t + innerH / 2 + (v / max) * (innerH / 2);
  const groupW = innerW / data.length;
  const barW = Math.min(20, groupW - 8);
  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH / 2} y2={pad.t + innerH / 2} stroke="#0e1620" strokeWidth="1" />
        {[0.5, 1].map((f, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yS(max * f)} y2={yS(max * f)} stroke="#e2dbcc" strokeWidth="0.5" />
            <line x1={pad.l} x2={W - pad.r} y1={yS2(max * f)} y2={yS2(max * f)} stroke="#e2dbcc" strokeWidth="0.5" />
            <text x={pad.l - 8} y={yS(max * f) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {fmt.m(max * f)}
            </text>
            <text x={pad.l - 8} y={yS2(max * f) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              −{fmt.m(max * f).replace("$", "$")}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.l + groupW * i + groupW / 2 - barW / 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={yS(d.dist)}
                width={barW}
                height={pad.t + innerH / 2 - yS(d.dist)}
                fill="#2f6b3a"
                onMouseEnter={(e) =>
                  setTip({
                    x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                    y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                    k: d.m + " · distributions",
                    v: fmt.full(d.dist),
                  })
                }
                onMouseLeave={() => setTip(null)}
              />
              <rect
                x={x}
                y={pad.t + innerH / 2}
                width={barW}
                height={yS2(d.calls) - (pad.t + innerH / 2)}
                fill="#8a3a2b"
                onMouseEnter={(e) =>
                  setTip({
                    x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                    y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                    k: d.m + " · capital calls",
                    v: fmt.full(d.calls),
                  })
                }
                onMouseLeave={() => setTip(null)}
              />
              <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">
                {d.m}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Horizontal stack bar (single row) ——— */
function HStackBar({ items, height = 26 }) {
  const total = items.reduce((s, x) => s + x.value, 0);
  const { setTip, Tooltip } = useTooltip();
  let acc = 0;
  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ display: "block" }}>
        {items.map((it, i) => {
          const w = (it.value / total) * 100;
          const x = acc;
          acc += w;
          return (
            <rect
              key={i}
              x={x}
              y={0}
              width={w}
              height={height}
              fill={it.color}
              onMouseEnter={(e) =>
                setTip({
                  x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                  y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                  k: it.name,
                  v: fmt.full(it.value),
                  s: ((it.value / total) * 100).toFixed(1) + "%",
                })
              }
              onMouseLeave={() => setTip(null)}
            />
          );
        })}
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Sparkline ——— */
function Sparkline({ values, height = 28, width = 120, stroke = "#0e1620" }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const xS = (i) => (i / (values.length - 1)) * width;
  const yS = (v) => height - ((v - min) / (max - min || 1)) * height;
  const path = values.map((v, i) => (i === 0 ? "M" : "L") + xS(i) + "," + yS(v)).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.2" />
      <circle cx={xS(values.length - 1)} cy={yS(values[values.length - 1])} r="2" fill={stroke} />
    </svg>
  );
}

/* ——— Monthly bars with outflows as NEGATIVE (mirrored) ——— */
function MonthlyFlowChartSigned({ data, height = 300, projectFromIndex = null }) {
  // data: [{m, in, out, net}] — out plotted as negative below zero
  const { setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 18, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d.in)) * 1.1;
  const min = -Math.max(...data.map((d) => d.out)) * 1.1;
  const yScale = (v) => pad.t + innerH - ((v - min) / (max - min)) * innerH;
  const y0 = yScale(0);
  const groupW = innerW / data.length;
  const barW = Math.min(18, (groupW - 8) / 2);

  const tickStep = Math.ceil((max / 4) / 1e6) * 1e6 || 1e6;
  const ticks = [];
  for (let v = 0; v <= max; v += tickStep) ticks.push(v);
  for (let v = -tickStep; v >= min; v -= tickStep) ticks.unshift(v);

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yScale(t)} y2={yScale(t)} stroke={t === 0 ? "#0e1620" : "#e2dbcc"} strokeWidth={t === 0 ? 1 : 0.5} />
            <text x={pad.l - 8} y={yScale(t) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {fmt.m(t)}
            </text>
          </g>
        ))}
        {projectFromIndex != null && (
          <rect x={pad.l + groupW * projectFromIndex} y={pad.t} width={groupW * (data.length - projectFromIndex)} height={innerH} fill="#f0e6cf" opacity="0.45" />
        )}
        {data.map((d, i) => {
          const x = pad.l + groupW * i + groupW / 2;
          return (
            <g key={i}>
              <rect
                x={x - barW - 1} y={yScale(d.in)} width={barW} height={y0 - yScale(d.in)}
                fill="#2f6b3a"
                onMouseEnter={(e) => setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + " · inflow", v: fmt.full(d.in) })}
                onMouseLeave={() => setTip(null)}
              />
              <rect
                x={x + 1} y={y0} width={barW} height={yScale(-d.out) - y0}
                fill="#8a3a2b"
                onMouseEnter={(e) => setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + " · outflow", v: "−" + fmt.full(d.out) })}
                onMouseLeave={() => setTip(null)}
              />
              <circle
                cx={x} cy={yScale(d.net)} r="3.2" fill="#0e1620" stroke="#fbf8f3" strokeWidth="1"
                onMouseEnter={(e) => setTip({ x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left, y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top, k: d.m + " · net", v: fmt.full(d.net) })}
                onMouseLeave={() => setTip(null)}
              />
              <text x={x} y={H - pad.b + 14} textAnchor="middle" fontSize="10" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">{d.m}</text>
            </g>
          );
        })}
        <polyline
          fill="none" stroke="#0e1620" strokeWidth="1.2" strokeDasharray="2 2"
          points={data.map((d, i) => `${pad.l + groupW * i + groupW / 2},${yScale(d.net)}`).join(" ")}
        />
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Stacked monthly bars, plotted as NEGATIVE (mirrors inflow stack) ——— */
function StackedMonthlySignedChart({ months, sources, height = 240, sign = -1 }) {
  // sources: [{name, color, values: [12 numbers (positive)]}]
  // sign = -1 plots stack going down from zero; sign = +1 same as StackedMonthlyChart
  const { setTip, Tooltip } = useTooltip();
  const W = 760, H = height;
  const pad = { l: 56, r: 16, t: 14, b: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const totals = months.map((_, i) => sources.reduce((s, src) => s + src.values[i], 0));
  const max = Math.max(...totals) * 1.1;
  // y0 at top of inner area when sign=-1, at bottom when sign=+1
  const y0 = sign < 0 ? pad.t + 4 : pad.t + innerH;
  const yScale = (v) => sign < 0 ? y0 + (v / max) * (innerH - 4) : y0 - (v / max) * innerH;
  const groupW = innerW / months.length;
  const barW = Math.min(28, groupW - 12);

  const tickStep = Math.ceil((max / 4) / 1e6) * 1e6 || 1e6;
  const ticks = [];
  for (let v = 0; v <= max; v += tickStep) ticks.push(v);

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        <line x1={pad.l} x2={W - pad.r} y1={y0} y2={y0} stroke="#0e1620" strokeWidth="1" />
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yScale(t)} y2={yScale(t)} stroke="#e2dbcc" strokeWidth="0.5" />
            <text x={pad.l - 8} y={yScale(t) + 3} textAnchor="end" fontSize="10" fill="#6b7587" fontFamily="var(--mono)">
              {sign < 0 ? "−" : ""}{fmt.m(t).replace(/^−/, "")}
            </text>
          </g>
        ))}
        {months.map((m, i) => {
          const x = pad.l + groupW * i + (groupW - barW) / 2;
          let yAcc = y0;
          return (
            <g key={i}>
              {sources.map((src, si) => {
                const v = src.values[i];
                const h = (v / max) * (sign < 0 ? (innerH - 4) : innerH);
                const yBar = sign < 0 ? yAcc : yAcc - h;
                if (sign < 0) yAcc += h; else yAcc -= h;
                return (
                  <rect
                    key={si} x={x} y={yBar} width={barW} height={h} fill={src.color}
                    onMouseEnter={(e) => setTip({
                      x: e.clientX - e.currentTarget.ownerSVGElement.getBoundingClientRect().left,
                      y: e.clientY - e.currentTarget.ownerSVGElement.getBoundingClientRect().top,
                      k: m + " · " + src.name,
                      v: (sign < 0 ? "−" : "") + fmt.full(v),
                      s: ((v / totals[i]) * 100).toFixed(1) + "% of month",
                    })}
                    onMouseLeave={() => setTip(null)}
                  />
                );
              })}
              <text x={x + barW / 2} y={sign < 0 ? pad.t - 4 : H - pad.b + 14} textAnchor="middle" fontSize="10" fill="#6b7587" fontFamily="var(--mono)" letterSpacing="0.06em">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip />
    </div>
  );
}

/* ——— Cash Position Summary — opening + activity + closing, side-by-side periods ——— */
function CashPositionSummary({ periods }) {
  // periods: [{ label, asOfStart, asOfEnd, opening, inflows, outflows, closing }]
  return (
    <div className="cash-pos-summary">
      {periods.map((p, idx) => {
        const net = p.inflows - p.outflows;
        const computed = p.opening + net;
        const closing = p.closing != null ? p.closing : computed;
        const delta = closing - p.opening;
        const dPct = p.opening !== 0 ? (delta / p.opening) * 100 : 0;
        // bars sized relative to local max
        const localMax = Math.max(p.opening, closing, p.inflows, p.outflows) || 1;
        const bar = (v) => Math.max(2, (Math.abs(v) / localMax) * 100);
        return (
          <div className="cps-period" key={idx}>
            <div className="cps-head">
              <span className="cps-label">{p.label}</span>
              <span className="cps-range">{p.asOfStart} → {p.asOfEnd}</span>
            </div>
            <div className="cps-flow">
              <div className="cps-stop">
                <div className="cps-stop-k">Opening Cash</div>
                <div className="cps-stop-v">{fmt.m(p.opening)}</div>
                <div className="cps-bar opening" style={{ width: bar(p.opening) + "%" }}></div>
                <div className="cps-stop-d">As of {p.asOfStart}</div>
              </div>
              <div className="cps-stop">
                <div className="cps-stop-k">Inflows</div>
                <div className="cps-stop-v pos">+{fmt.m(p.inflows)}</div>
                <div className="cps-bar inflow" style={{ width: bar(p.inflows) + "%" }}></div>
              </div>
              <div className="cps-stop">
                <div className="cps-stop-k">Outflows</div>
                <div className="cps-stop-v neg">−{fmt.m(p.outflows)}</div>
                <div className="cps-bar outflow" style={{ width: bar(p.outflows) + "%" }}></div>
              </div>
              <div className="cps-stop final">
                <div className="cps-stop-k">Closing Cash</div>
                <div className="cps-stop-v">{fmt.m(closing)}</div>
                <div className="cps-bar closing" style={{ width: bar(closing) + "%" }}></div>
                <div className="cps-stop-d">
                  {delta >= 0 ? "▲" : "▼"} {fmt.m(Math.abs(delta))} <span className="muted">({(dPct >= 0 ? "+" : "") + dPct.toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ——— Cash Instruments Snapshot Table ——— */
function CashInstruments({ items, asOf }) {
  // items: [{ name, custodian, balance, yield, tenor, note }]
  const total = items.reduce((s, x) => s + x.balance, 0);
  const weightedYield = total > 0 ? items.reduce((s, x) => s + x.balance * x.yield, 0) / total : 0;
  const annualIncome = total * (weightedYield / 100);
  return (
    <div>
      <div className="cash-inst-summary">
        <div>
          <div className="cis-k">Total Cash & Equivalents</div>
          <div className="cis-v">{fmt.m(total)}</div>
          <div className="cis-d muted">Across {items.length} instruments · as of {asOf}</div>
        </div>
        <div>
          <div className="cis-k">Weighted Yield</div>
          <div className="cis-v gold">{weightedYield.toFixed(2)}%</div>
          <div className="cis-d muted">Blended, balance-weighted</div>
        </div>
        <div>
          <div className="cis-k">Est. Annual Income</div>
          <div className="cis-v">{fmt.m(annualIncome)}</div>
          <div className="cis-d muted">At current yield, current balance</div>
        </div>
      </div>
      <table className="table" style={{ marginTop: 14 }}>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Custodian</th>
            <th className="num">Balance</th>
            <th className="num">% of Cash</th>
            <th className="num">Yield (APY)</th>
            <th>Tenor / Maturity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => {
            const pct = (it.balance / total) * 100;
            return (
              <tr key={i}>
                <td>
                  <div style={{ fontWeight: 500 }}>{it.name}</div>
                  {it.note && <div className="muted" style={{ fontSize: 10, letterSpacing: "0.04em" }}>{it.note}</div>}
                </td>
                <td className="muted">{it.custodian}</td>
                <td className="num">{fmt.m(it.balance)}</td>
                <td className="num">
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "flex-end", width: "100%" }}>
                    <span style={{ width: 60, height: 5, background: "var(--ink-100)", position: "relative", display: "inline-block" }}>
                      <span style={{ position: "absolute", inset: 0, width: pct + "%", background: it.color || "var(--ink-700)" }}></span>
                    </span>
                    <span>{pct.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="num">{it.yield.toFixed(2)}%</td>
                <td>{it.tenor}</td>
              </tr>
            );
          })}
          <tr className="total">
            <td>Total / Weighted</td>
            <td></td>
            <td className="num">{fmt.m(total)}</td>
            <td className="num">100.0%</td>
            <td className="num">{weightedYield.toFixed(2)}%</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ——— Cash Balance Waterfall: Opening → +Inflows → −Outflows → Closing ——— */
function CashBalanceWaterfall({ periods, height = 220 }) {
  // periods: [{ label, asOfStart, asOfEnd, opening, inflows, outflows, closing }]
  return (
    <div className="cbw-wrap" style={{ display: "grid", gridTemplateColumns: `repeat(${periods.length}, 1fr)`, gap: 24 }}>
      {periods.map((p, idx) => {
        const closing = p.closing != null ? p.closing : (p.opening + p.inflows - p.outflows);
        const stops = [
          { k: "Opening", v: p.opening, kind: "anchor" },
          { k: "Inflows", v: p.inflows, kind: "pos" },
          { k: "Outflows", v: -p.outflows, kind: "neg" },
          { k: "Closing", v: closing, kind: "anchor" },
        ];
        // running totals to position floating bars
        const runs = [];
        let acc = 0;
        for (const s of stops) {
          if (s.kind === "anchor") {
            runs.push({ start: 0, end: s.v, value: s.v, ...s });
            acc = s.v;
          } else {
            const start = acc;
            const end = acc + s.v;
            runs.push({ start, end, value: s.v, ...s });
            acc = end;
          }
        }
        const max = Math.max(...runs.map(r => Math.max(r.start, r.end)));
        const min = Math.min(0, ...runs.map(r => Math.min(r.start, r.end)));
        const range = max - min || 1;
        // chart layout — viewBox in proportional pixel space (400 × height) with default preserveAspectRatio
        const VBW = 400;
        const padTop = 28, padBottom = 36, plot = height - padTop - padBottom;
        const colW = VBW / runs.length;
        const yScale = (v) => padTop + (1 - (v - min) / range) * plot;
        const delta = closing - p.opening;
        const dPct = p.opening !== 0 ? (delta / p.opening) * 100 : 0;
        return (
          <div key={idx} className="cbw-period">
            <div className="cbw-head">
              <span className="cbw-label">{p.label}</span>
              <span className="cbw-range">{p.asOfStart} → {p.asOfEnd}</span>
            </div>
            <svg viewBox={`0 0 ${VBW} ${height}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
              {/* baseline */}
              <line x1="0" x2={VBW} y1={yScale(0)} y2={yScale(0)} stroke="var(--ink-300, #b8b0a0)" strokeWidth="0.6" />
              {runs.map((r, i) => {
                const x = i * colW + colW * 0.18;
                const w = colW * 0.64;
                const y1 = yScale(Math.max(r.start, r.end));
                const y2 = yScale(Math.min(r.start, r.end));
                const fill = r.kind === "anchor" ? "#0e1620" : (r.kind === "pos" ? "#2f6b3a" : "#8a3a2b");
                return (
                  <g key={i}>
                    <rect x={x} y={y1} width={w} height={Math.max(1, y2 - y1)} fill={fill} />
                    {/* connector */}
                    {i < runs.length - 1 && (
                      <line
                        x1={x + w} x2={(i + 1) * colW + colW * 0.18}
                        y1={yScale(r.end)} y2={yScale(r.end)}
                        stroke="var(--ink-400, #8a8175)" strokeDasharray="3 3" strokeWidth="0.6"
                      />
                    )}
                    {/* value label */}
                    <text x={x + w / 2} y={y1 - 6} fontSize="11" textAnchor="middle" fill="var(--ink-900, #1a1612)" style={{ fontFamily: "var(--mono, ui-monospace, monospace)", fontWeight: 500 }}>
                      {r.kind === "pos" ? "+" : r.kind === "neg" ? "−" : ""}{fmt.m(Math.abs(r.value))}
                    </text>
                    {/* category label */}
                    <text x={x + w / 2} y={height - padBottom + 16} fontSize="9" textAnchor="middle" fill="var(--ink-500, #6b6357)" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
                      {r.k}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="cbw-foot">
              <span className="cbw-delta">
                {delta >= 0 ? "▲" : "▼"} {fmt.m(Math.abs(delta))}
                <span className="muted"> ({(dPct >= 0 ? "+" : "") + dPct.toFixed(1)}% vs. opening)</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ——— Quarterly Forecast Schedule: opening → inflows by source → outflows by category → closing ——— */
function ForecastQuarterly({ quarters, inflowRows, outflowRows }) {
  // quarters: [{ label, opening, closing }]
  // inflowRows: [{ name, color, values: [n quarters] }]
  // outflowRows: [{ name, color, values: [n quarters] }]
  const sumCol = (rows, qi) => rows.reduce((s, r) => s + r.values[qi], 0);
  return (
    <div className="forecast-q">
      <table className="table forecast-table">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Line Item</th>
            {quarters.map((q, i) => <th key={i} className="num">{q.label}</th>)}
            <th className="num">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="anchor">
            <td><strong>Opening Cash Position</strong></td>
            {quarters.map((q, i) => <td key={i} className="num"><strong>{fmt.m(q.opening)}</strong></td>)}
            <td className="num muted">—</td>
          </tr>
          <tr className="section-row"><td colSpan={quarters.length + 2}>INFLOWS</td></tr>
          {inflowRows.map((r, i) => {
            const total = r.values.reduce((a, b) => a + b, 0);
            return (
              <tr key={`in-${i}`}>
                <td><span className="sw" style={{ background: r.color, display: "inline-block", width: 8, height: 8, marginRight: 8, verticalAlign: "middle" }}></span>{r.name}</td>
                {r.values.map((v, qi) => <td key={qi} className="num pos">+{fmt.m(v)}</td>)}
                <td className="num pos">+{fmt.m(total)}</td>
              </tr>
            );
          })}
          <tr className="subtotal">
            <td><strong>Total Inflows</strong></td>
            {quarters.map((_, qi) => <td key={qi} className="num pos"><strong>+{fmt.m(sumCol(inflowRows, qi))}</strong></td>)}
            <td className="num pos"><strong>+{fmt.m(inflowRows.reduce((s, r) => s + r.values.reduce((a, b) => a + b, 0), 0))}</strong></td>
          </tr>
          <tr className="section-row"><td colSpan={quarters.length + 2}>OUTFLOWS</td></tr>
          {outflowRows.map((r, i) => {
            const total = r.values.reduce((a, b) => a + b, 0);
            return (
              <tr key={`out-${i}`}>
                <td><span className="sw" style={{ background: r.color, display: "inline-block", width: 8, height: 8, marginRight: 8, verticalAlign: "middle" }}></span>{r.name}</td>
                {r.values.map((v, qi) => <td key={qi} className="num neg">({fmt.m(v)})</td>)}
                <td className="num neg">({fmt.m(total)})</td>
              </tr>
            );
          })}
          <tr className="subtotal">
            <td><strong>Total Outflows</strong></td>
            {quarters.map((_, qi) => <td key={qi} className="num neg"><strong>({fmt.m(sumCol(outflowRows, qi))})</strong></td>)}
            <td className="num neg"><strong>({fmt.m(outflowRows.reduce((s, r) => s + r.values.reduce((a, b) => a + b, 0), 0))})</strong></td>
          </tr>
          <tr className="net">
            <td><strong>Net Change</strong></td>
            {quarters.map((_, qi) => {
              const net = sumCol(inflowRows, qi) - sumCol(outflowRows, qi);
              return <td key={qi} className={"num " + (net >= 0 ? "pos" : "neg")}><strong>{net >= 0 ? "+" : "−"}{fmt.m(Math.abs(net))}</strong></td>;
            })}
            <td className="num"><strong>—</strong></td>
          </tr>
          <tr className="anchor">
            <td><strong>Closing Cash Position</strong></td>
            {quarters.map((q, i) => <td key={i} className="num"><strong>{fmt.m(q.closing)}</strong></td>)}
            <td className="num muted">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ——— Tabular Cash Flow Statement (Direct Method) ———
   rows = line items, columns = months Jan–Dec + Total. Outflows shown negative (red parens). */
function TabularCashFlow({ months, openingCash, closingCash, inflowRows, outflowRows }) {
  // inflowRows / outflowRows: [{ name, values: [12], color? }]
  const sumCol = (rows, mi) => rows.reduce((s, r) => s + r.values[mi], 0);
  const totalRow = (rows) => rows.reduce((s, r) => s + r.values.reduce((a, b) => a + b, 0), 0);
  const totalIn = totalRow(inflowRows);
  const totalOut = totalRow(outflowRows);
  // monthly running balance
  const balances = [];
  let bal = openingCash;
  for (let mi = 0; mi < months.length; mi++) {
    bal = bal + sumCol(inflowRows, mi) - sumCol(outflowRows, mi);
    balances.push(bal);
  }
  return (
    <div className="tcf-wrap">
      <table className="table tcf">
        <thead>
          <tr>
            <th className="tcf-line">Line Item</th>
            {months.map((m) => <th key={m} className="num">{m}</th>)}
            <th className="num tcf-total">FY Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tcf-anchor">
            <td><strong>Opening Cash</strong></td>
            <td className="num"><strong>{fmt.m(openingCash)}</strong></td>
            {months.slice(1).map((_, i) => {
              const prev = balances[i];
              return <td key={i} className="num muted">{fmt.m(prev)}</td>;
            })}
            <td className="num muted">—</td>
          </tr>
          <tr className="tcf-section"><td colSpan={months.length + 2}>OPERATING INFLOWS</td></tr>
          {inflowRows.map((r, i) => (
            <tr key={`tin-${i}`}>
              <td>{r.name}</td>
              {r.values.map((v, mi) => <td key={mi} className="num pos">{v > 0 ? fmt.m(v) : "—"}</td>)}
              <td className="num pos"><strong>{fmt.m(r.values.reduce((a, b) => a + b, 0))}</strong></td>
            </tr>
          ))}
          <tr className="tcf-subtotal">
            <td><strong>Total Inflows</strong></td>
            {months.map((_, mi) => <td key={mi} className="num pos"><strong>{fmt.m(sumCol(inflowRows, mi))}</strong></td>)}
            <td className="num pos"><strong>{fmt.m(totalIn)}</strong></td>
          </tr>
          <tr className="tcf-section"><td colSpan={months.length + 2}>OPERATING OUTFLOWS</td></tr>
          {outflowRows.map((r, i) => (
            <tr key={`tout-${i}`}>
              <td>{r.name}</td>
              {r.values.map((v, mi) => <td key={mi} className="num neg">{v > 0 ? `(${fmt.m(v)})` : "—"}</td>)}
              <td className="num neg"><strong>({fmt.m(r.values.reduce((a, b) => a + b, 0))})</strong></td>
            </tr>
          ))}
          <tr className="tcf-subtotal">
            <td><strong>Total Outflows</strong></td>
            {months.map((_, mi) => <td key={mi} className="num neg"><strong>({fmt.m(sumCol(outflowRows, mi))})</strong></td>)}
            <td className="num neg"><strong>({fmt.m(totalOut)})</strong></td>
          </tr>
          <tr className="tcf-net">
            <td><strong>Net Cash Movement</strong></td>
            {months.map((_, mi) => {
              const net = sumCol(inflowRows, mi) - sumCol(outflowRows, mi);
              return <td key={mi} className={"num " + (net >= 0 ? "pos" : "neg")}><strong>{net >= 0 ? "" : "("}{fmt.m(Math.abs(net))}{net >= 0 ? "" : ")"}</strong></td>;
            })}
            <td className={"num " + ((totalIn - totalOut) >= 0 ? "pos" : "neg")}><strong>{(totalIn - totalOut) >= 0 ? "" : "("}{fmt.m(Math.abs(totalIn - totalOut))}{(totalIn - totalOut) >= 0 ? "" : ")"}</strong></td>
          </tr>
          <tr className="tcf-anchor">
            <td><strong>Closing Cash</strong></td>
            {balances.map((b, i) => <td key={i} className="num"><strong>{fmt.m(b)}</strong></td>)}
            <td className="num"><strong>{fmt.m(closingCash != null ? closingCash : balances[balances.length - 1])}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Object.assign(window, {
  fmt,
  MonthlyFlowChart,
  MonthlyFlowChartSigned,
  StackedMonthlyChart,
  StackedMonthlySignedChart,
  Donut,
  NetCashLine,
  DrilldownList,
  CallsDistributionsChart,
  HStackBar,
  Sparkline,
  CashPositionSummary,
  CashInstruments,
  CashBalanceWaterfall,
  TabularCashFlow,
  ForecastQuarterly,
});
