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

Object.assign(window, {
  fmt,
  MonthlyFlowChart,
  StackedMonthlyChart,
  Donut,
  NetCashLine,
  DrilldownList,
  CallsDistributionsChart,
  HStackBar,
  Sparkline,
});
