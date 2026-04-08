import { useState, useEffect } from "react";

const TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "steps", label: "Roadmap", icon: "🗺️" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "airisk", label: "AI Risk", icon: "🤖" },
  { id: "reality", label: "Reality Check", icon: "🔍" },
];

function riskColor(v) {
  if (v > 70) return "#ff4d6d";
  if (v > 40) return "#ffb347";
  return "#00c9a7";
}

export default function ResultsPage({ results, navigate }) {
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  if (!results)
    return (
      <div
        style={{
          paddingTop: "62px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <div style={{ color: "var(--text-2)" }}>No results yet.</div>
          <button
            onClick={() => navigate("home")}
            className="btn-ghost"
            style={{ marginTop: "16px" }}
          >
            ← Go back
          </button>
        </div>
      </div>
    );

  const downloadPDF = () => {
    setDownloading(true);
    try {
      const html = buildPDFHTML(results);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const win = window.open(url, "_blank");
      setTimeout(() => {
        win?.print();
        URL.revokeObjectURL(url);
      }, 800);
    } finally {
      setDownloading(false);
    }
  };

  const score = results.overview?.score || 0;
  const scoreCol =
    score >= 75 ? "#00c9a7" : score >= 50 ? "#ffb347" : "#ff4d6d";

  return (
    <div style={{ paddingTop: "62px", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "36px 24px 0",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <button
              onClick={() => navigate("home")}
              className="btn-ghost"
              style={{ padding: "7px 14px", fontSize: "13px" }}
            >
              ← New Search
            </button>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="btn-primary"
              style={{ padding: "9px 20px", fontSize: "13px" }}
            >
              {downloading ? (
                <>
                  <Spin /> Preparing…
                </>
              ) : (
                "⬇ Download Roadmap PDF"
              )}
            </button>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(14px)",
              transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                flexWrap: "wrap",
                margin: "20px 0 24px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3.5vw, 36px)",
                    fontWeight: "800",
                    letterSpacing: "-1.5px",
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {results.overview?.title || "Your Career Analysis"}
                </h1>
                <p
                  style={{
                    color: "var(--text-2)",
                    fontSize: "15px",
                    maxWidth: "640px",
                    lineHeight: 1.7,
                  }}
                >
                  {results.overview?.summary}
                </p>
              </div>
              <ScoreRing score={score} color={scoreCol} />
            </div>

            {/* Chips */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "24px",
              }}
            >
              {[
                {
                  icon: "⏱",
                  label: "Timeline",
                  val: results.overview?.timeline,
                },
                {
                  icon: "💰",
                  label: "Salary",
                  val: results.overview?.salaryRange,
                },
                {
                  icon: "📈",
                  label: "Difficulty",
                  val: results.overview?.difficulty,
                },
                {
                  icon: "🔥",
                  label: "Demand",
                  val: results.overview?.demandLevel,
                },
              ]
                .filter((c) => c.val)
                .map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 14px",
                      borderRadius: "100px",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      fontSize: "13px",
                      animation: `fadeUp 0.4s ${i * 0.08}s ease both`,
                    }}
                  >
                    <span>{c.icon}</span>
                    <span style={{ color: "var(--text-3)" }}>{c.label}:</span>
                    <span style={{ color: "var(--text)", fontWeight: "600" }}>
                      {c.val}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{ display: "flex", overflowX: "auto", marginBottom: "-1px" }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "11px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${tab === t.id ? "var(--accent)" : "transparent"}`,
                  color: tab === t.id ? "var(--text)" : "var(--text-3)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: tab === t.id ? "600" : "400",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}
      >
        {tab === "overview" && <OverviewTab data={results.overview} />}
        {tab === "steps" && <StepsTab steps={results.steps} />}
        {tab === "skills" && <SkillsTab skills={results.skills} />}
        {tab === "airisk" && <AIRiskTab risk={results.aiRisk} />}
        {tab === "reality" && <RealityTab reality={results.realityCheck} />}
      </div>
    </div>
  );
}

// ── OVERVIEW ────────────────────────────────────────────────────────────────
function OverviewTab({ data }) {
  if (!data) return <Empty />;
  return (
    <div className="anim-fade-up">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {[
          {
            label: "Timeline to Transition",
            value: data.timeline,
            icon: "⏱",
            color: "#4f7eff",
          },
          {
            label: "Salary Range (India)",
            value: data.salaryRange,
            icon: "💰",
            color: "#00c9a7",
          },
          {
            label: "Market Demand",
            value: data.demandLevel,
            icon: "🔥",
            color: "#ffb347",
          },
          {
            label: "Transition Difficulty",
            value: data.difficulty,
            icon: "📈",
            color: "#a78bfa",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="glass card-lift"
            style={{
              padding: "24px",
              borderLeft: `3px solid ${c.color}`,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>
              {c.icon}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "6px",
              }}
            >
              {c.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: "800",
                color: c.color,
              }}
            >
              {c.value || "—"}
            </div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: "28px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "700",
            fontSize: "18px",
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          Summary
        </div>
        <p
          style={{ color: "var(--text-2)", lineHeight: 1.8, fontSize: "15px" }}
        >
          {data.summary}
        </p>
      </div>
    </div>
  );
}

// ── STEPS ───────────────────────────────────────────────────────────────────
function StepsTab({ steps }) {
  if (!steps?.length) return <Empty />;
  return (
    <div className="anim-fade-up" style={{ maxWidth: "740px" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: "800",
          letterSpacing: "-1px",
          color: "var(--text)",
          marginBottom: "32px",
        }}
      >
        Your Step-by-Step Roadmap
      </h2>
      {steps.map((s, i) => (
        <div
          key={s.id || i}
          style={{
            display: "flex",
            gap: "18px",
            paddingBottom: "28px",
            position: "relative",
            animation: `fadeUp 0.5s ${i * 0.1}s ease both`,
          }}
        >
          {i < steps.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: "18px",
                top: "42px",
                bottom: 0,
                width: "2px",
                background:
                  "linear-gradient(to bottom, var(--accent), var(--border))",
              }}
            />
          )}
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              flexShrink: 0,
              background: "linear-gradient(135deg, #4f7eff, #00c9a7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "15px",
              color: "#fff",
              position: "relative",
              zIndex: 1,
              boxShadow: "0 4px 16px rgba(79,126,255,0.4)",
            }}
          >
            {s.id || i + 1}
          </div>
          <div
            className="glass"
            style={{
              flex: 1,
              padding: "20px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-2)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "8px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "var(--accent)",
                  background: "rgba(79,126,255,0.1)",
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                {s.phase}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-3)" }}>
                ⏱ {s.duration}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "17px",
                color: "var(--text)",
                marginBottom: "8px",
                letterSpacing: "-0.3px",
              }}
            >
              {s.title}
            </div>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: "14px",
                lineHeight: 1.7,
                marginBottom: "14px",
              }}
            >
              {s.description}
            </p>
            {s.resources?.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  Resources
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {s.resources.map((r, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        fontSize: "12px",
                        color: "var(--text-2)",
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {s.milestone && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(0,201,167,0.08)",
                  border: "1px solid rgba(0,201,167,0.2)",
                }}
              >
                <span>🏆</span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#00c9a7",
                    fontWeight: "500",
                  }}
                >
                  Milestone: {s.milestone}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SKILLS ──────────────────────────────────────────────────────────────────
function SkillsTab({ skills }) {
  if (!skills) return <Empty />;
  return (
    <div className="anim-fade-up">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "18px",
        }}
      >
        {/* Skills to Learn — spans full width on both desktop and mobile */}
        <div
          className="glass"
          style={{
            padding: "26px",
            gridColumn: "1 / -1", // always spans ALL available columns
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "18px",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Skills to Learn
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {skills.toLearn?.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  animation: `fadeUp 0.4s ${i * 0.07}s ease both`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "3px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "var(--text)",
                      }}
                    >
                      {s.name}
                    </span>
                    <PriBadge p={s.priority} />
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-3)" }}>
                    {s.reason}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "800",
                      fontSize: "20px",
                      color: "var(--text)",
                    }}
                  >
                    {s.timeWeeks}w
                  </div>
                  <div
                    style={{
                      fontSize: "9px",
                      color: "var(--text-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    to learn
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {skills.current?.length > 0 && (
          <div className="glass" style={{ padding: "24px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "var(--text)",
                marginBottom: "14px",
              }}
            >
              ✅ Your Current Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.current.map((s, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "rgba(0,201,167,0.1)",
                    border: "1px solid rgba(0,201,167,0.25)",
                    fontSize: "13px",
                    color: "#00c9a7",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {skills.transferable?.length > 0 && (
          <div className="glass" style={{ padding: "24px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "var(--text)",
                marginBottom: "14px",
              }}
            >
              ↗ Transferable Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.transferable.map((s, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "rgba(79,126,255,0.1)",
                    border: "1px solid rgba(79,126,255,0.25)",
                    fontSize: "13px",
                    color: "var(--accent)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── AI RISK ─────────────────────────────────────────────────────────────────
function AIRiskTab({ risk }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnim(true), 200);
    return () => clearTimeout(t);
  }, []);
  if (!risk) return <Empty />;
  const rc = riskColor(risk.overallRisk);
  return (
    <div className="anim-fade-up">
      <div
        className="glass"
        style={{
          padding: "32px",
          marginBottom: "20px",
          borderColor: rc + "40",
          background: `radial-gradient(circle at 80% 20%, ${rc}08, transparent 60%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
          }}
        >
          <GaugeCircle val={risk.overallRisk} color={rc} animated={anim} />
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color: rc,
                background: rc + "18",
                padding: "3px 10px",
                borderRadius: "6px",
                display: "inline-block",
                marginBottom: "10px",
              }}
            >
              {risk.riskLevel} Risk
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text)",
                letterSpacing: "-0.5px",
                marginBottom: "10px",
              }}
            >
              {risk.overallRisk > 70
                ? "⚠️ High Automation Risk"
                : risk.overallRisk > 40
                  ? "⚡ Moderate Risk"
                  : "✅ Relatively Safe"}
            </h2>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {risk.summary}
            </p>
          </div>
        </div>
      </div>

      {risk.tasks?.length > 0 && (
        <div
          className="glass"
          style={{ padding: "28px", marginBottom: "18px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "18px",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Task-by-Task Breakdown
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {risk.tasks.map((t, i) => {
              const c = riskColor(t.risk);
              return (
                <div
                  key={i}
                  style={{ animation: `fadeUp 0.4s ${i * 0.06}s ease both` }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--text)",
                        fontWeight: "500",
                      }}
                    >
                      {t.task}
                    </span>
                    <span
                      style={{ fontSize: "13px", fontWeight: "700", color: c }}
                    >
                      {t.risk}%
                    </span>
                  </div>
                  <div className="risk-track">
                    <div
                      className="risk-fill"
                      style={{
                        width: anim ? `${t.risk}%` : "0%",
                        background: c,
                        transitionDelay: `${i * 0.08}s`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-3)",
                      marginTop: "3px",
                    }}
                  >
                    {t.reason}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {risk.safeSkills?.length > 0 && (
          <div className="glass" style={{ padding: "22px" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "var(--text)",
                marginBottom: "12px",
              }}
            >
              🛡️ AI-Safe Skills
            </div>
            {risk.safeSkills.map((s, i) => (
              <div
                key={i}
                style={{
                  fontSize: "13px",
                  color: "#00c9a7",
                  display: "flex",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span>✓</span>
                {s}
              </div>
            ))}
          </div>
        )}
        {risk.advice && (
          <div
            className="glass"
            style={{ padding: "22px", borderLeft: "3px solid var(--accent)" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "var(--text)",
                marginBottom: "10px",
              }}
            >
              💡 Stay Relevant
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-2)",
                lineHeight: 1.7,
              }}
            >
              {risk.advice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── REALITY ─────────────────────────────────────────────────────────────────
function RealityTab({ reality }) {
  if (!reality) return <Empty />;
  return (
    <div className="anim-fade-up">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "18px",
          marginBottom: "20px",
        }}
      >
        <div
          className="glass"
          style={{ padding: "24px", borderLeft: "3px solid #00c9a7" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "17px",
              color: "#00c9a7",
              marginBottom: "14px",
            }}
          >
            ✅ Pros
          </div>
          {reality.pros?.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "8px",
                padding: "9px 10px",
                borderRadius: "8px",
                background: "rgba(0,201,167,0.06)",
                marginBottom: "8px",
                animation: `fadeLeft 0.4s ${i * 0.1}s ease both`,
              }}
            >
              <span style={{ color: "#00c9a7", flexShrink: 0 }}>+</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-2)",
                  lineHeight: 1.55,
                }}
              >
                {p}
              </span>
            </div>
          ))}
        </div>
        <div
          className="glass"
          style={{ padding: "24px", borderLeft: "3px solid #ff4d6d" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "17px",
              color: "#ff4d6d",
              marginBottom: "14px",
            }}
          >
            ⚠️ Cons
          </div>
          {reality.cons?.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "8px",
                padding: "9px 10px",
                borderRadius: "8px",
                background: "rgba(255,77,109,0.06)",
                marginBottom: "8px",
                animation: `fadeLeft 0.4s ${i * 0.1}s ease both`,
              }}
            >
              <span style={{ color: "#ff4d6d", flexShrink: 0 }}>−</span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-2)",
                  lineHeight: 1.55,
                }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>

      {reality.myths?.length > 0 && (
        <div
          className="glass"
          style={{ padding: "28px", marginBottom: "18px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "18px",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            💭 Myths vs Reality
          </div>
          {reality.myths.map((m, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "14px",
                animation: `fadeUp 0.4s ${i * 0.1}s ease both`,
              }}
            >
              <div
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: "rgba(255,77,109,0.07)",
                  border: "1px solid rgba(255,77,109,0.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#ff4d6d",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  ✗ Myth
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {m.myth}
                </div>
              </div>
              <div
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: "rgba(0,201,167,0.07)",
                  border: "1px solid rgba(0,201,167,0.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#00c9a7",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  ✓ Reality
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {m.reality}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {reality.verdict && (
        <div
          style={{
            padding: "28px",
            borderRadius: "var(--radius)",
            background:
              "linear-gradient(135deg, rgba(79,126,255,0.08), rgba(0,201,167,0.08))",
            border: "1px solid rgba(79,126,255,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "var(--accent)",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            ⚖️ Honest Verdict
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: "700",
              color: "var(--text)",
              lineHeight: 1.65,
            }}
          >
            "{reality.verdict}"
          </p>
        </div>
      )}
    </div>
  );
}

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────
function ScoreRing({ score, color }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnim(true), 400);
    return () => clearTimeout(t);
  }, []);
  const r = 36,
    circ = 2 * Math.PI * r;
  return (
    <div
      style={{
        textAlign: "center",
        padding: "14px 20px",
        borderRadius: "14px",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "88px",
          height: "88px",
          margin: "0 auto",
        }}
      >
        <svg width="88" height="88" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="var(--surface-3)"
            strokeWidth="8"
          />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={anim ? circ * (1 - score / 100) : circ}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: "800",
              color,
              lineHeight: 1,
            }}
          >
            {score}
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "var(--text-3)",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginTop: "4px",
        }}
      >
        Match Score
      </div>
    </div>
  );
}

function GaugeCircle({ val, color, animated }) {
  const r = 50,
    circ = 2 * Math.PI * r;
  return (
    <div
      style={{
        position: "relative",
        width: "120px",
        height: "120px",
        flexShrink: 0,
      }}
    >
      <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - val / 100) : circ}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: "800",
            color,
            lineHeight: 1,
          }}
        >
          {val}%
        </span>
        <span
          style={{
            fontSize: "9px",
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          AI Risk
        </span>
      </div>
    </div>
  );
}

function PriBadge({ p }) {
  const c =
    { High: "#ff4d6d", Medium: "#ffb347", Low: "#00c9a7" }[p] ||
    "var(--text-3)";
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: "4px",
        background: c + "20",
        color: c,
        fontSize: "10px",
        fontWeight: "700",
        textTransform: "uppercase",
      }}
    >
      {p}
    </span>
  );
}

function Empty() {
  return (
    <div
      style={{ textAlign: "center", padding: "60px", color: "var(--text-3)" }}
    >
      No data for this section.
    </div>
  );
}
function Spin() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "13px",
        height: "13px",
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        animation: "spinSlow 0.7s linear infinite",
      }}
    />
  );
}

// ── PDF BUILDER ──────────────────────────────────────────────────────────────
function buildPDFHTML(results) {
  const { overview, steps, skills, aiRisk, realityCheck } = results;
  const rc = (v) => (v > 70 ? "#ff4d6d" : v > 40 ? "#ff8c00" : "#00a884");
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>RR_CareerAI Roadmap - ${overview?.title || "My Career Plan"}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;color:#1a1a2e;background:#fff;padding:40px;max-width:800px;margin:0 auto;font-size:14px;line-height:1.6;}
h1{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;color:#0f1628;}
h2{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin:28px 0 14px;color:#1a2540;border-bottom:2px solid #4f7eff;padding-bottom:6px;}
h3{font-size:15px;font-weight:600;color:#1a2540;margin-bottom:4px;}
.header{border-bottom:3px solid #4f7eff;padding-bottom:20px;margin-bottom:28px;}
.meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;}
.chip{background:#eef2ff;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;color:#4f7eff;}
.score{background:#4f7eff;color:#fff;border-radius:8px;padding:6px 14px;font-size:20px;font-weight:800;font-family:'Syne',sans-serif;}
.step{display:flex;gap:14px;margin-bottom:20px;padding:16px;border-left:3px solid #4f7eff;background:#f8f9ff;border-radius:0 8px 8px 0;}
.num{width:30px;height:30px;border-radius:50%;background:#4f7eff;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0;font-family:'Syne',sans-serif;}
.skill-row{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#f8f9ff;border-radius:6px;margin-bottom:8px;}
.badge-h{background:#ffe4e8;color:#ff4d6d;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.badge-m{background:#fff4e0;color:#ff8c00;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.badge-l{background:#e0faf3;color:#00c9a7;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;}
.bar-wrap{height:6px;border-radius:3px;background:#e5e7ef;overflow:hidden;margin-top:4px;}
.bar-fill{height:100%;border-radius:3px;}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.pro{background:#e0faf3;color:#006b52;padding:8px 10px;border-radius:6px;margin-bottom:6px;font-size:13px;}
.con{background:#ffe4e8;color:#8b0023;padding:8px 10px;border-radius:6px;margin-bottom:6px;font-size:13px;}
.verdict{background:#eef2ff;border-left:4px solid #4f7eff;padding:16px;border-radius:0 8px 8px 0;font-style:italic;}
.footer{margin-top:40px;text-align:center;font-size:12px;color:#8899bb;border-top:1px solid #e5e7ef;padding-top:16px;}
@media print{body{padding:20px;}}
</style></head><body>
<div class="header">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
    <div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#4f7eff;margin-bottom:6px">RR_CareerAI · Career Roadmap</div>
      <h1>${overview?.title || "My Career Plan"}</h1>
      <p style="color:#6b7a99;margin-top:6px">${overview?.summary || ""}</p>
    </div>
    <div style="text-align:center"><div class="score">${overview?.score || "—"}</div><div style="font-size:10px;color:#8899bb;margin-top:4px;text-transform:uppercase">Match Score</div></div>
  </div>
  <div class="meta">
    ${overview?.timeline ? `<span class="chip">⏱ ${overview.timeline}</span>` : ""}
    ${overview?.salaryRange ? `<span class="chip">💰 ${overview.salaryRange}</span>` : ""}
    ${overview?.difficulty ? `<span class="chip">📈 ${overview.difficulty}</span>` : ""}
    ${overview?.demandLevel ? `<span class="chip">🔥 ${overview.demandLevel}</span>` : ""}
  </div>
</div>
${
  steps?.length
    ? `<h2>🗺️ Step-by-Step Roadmap</h2>${steps
        .map(
          (s) => `
  <div class="step">
    <div class="num">${s.id}</div>
    <div>
      <div style="display:flex;gap:8px;margin-bottom:4px">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;color:#4f7eff;background:#eef2ff;padding:2px 6px;border-radius:4px">${s.phase}</span>
        <span style="font-size:11px;color:#8899bb">⏱ ${s.duration}</span>
      </div>
      <h3>${s.title}</h3>
      <p style="color:#4a5568;font-size:13px;margin-top:4px">${s.description}</p>
      ${s.resources?.length ? `<div style="margin-top:8px;font-size:12px;color:#6b7a99">📚 ${s.resources.join(" · ")}</div>` : ""}
      ${s.milestone ? `<div style="margin-top:8px;font-size:12px;color:#00a884;font-weight:600">🏆 ${s.milestone}</div>` : ""}
    </div>
  </div>`,
        )
        .join("")}`
    : ""
}
${
  skills?.toLearn?.length
    ? `<h2>⚡ Skills to Learn</h2>${skills.toLearn
        .map(
          (s) => `
  <div class="skill-row">
    <div><span style="font-weight:600">${s.name}</span> <span class="badge-${s.priority?.toLowerCase() === "high" ? "h" : s.priority?.toLowerCase() === "medium" ? "m" : "l"}">${s.priority}</span>
    <div style="font-size:11px;color:#8899bb;margin-top:2px">${s.reason}</div></div>
    <div style="font-weight:700;color:#4f7eff">${s.timeWeeks}w</div>
  </div>`,
        )
        .join("")}`
    : ""
}
${
  aiRisk
    ? `<h2>🤖 AI Automation Risk</h2>
<div style="padding:16px;background:#fff8f8;border-radius:8px;margin-bottom:16px">
  <strong>Overall Risk: ${aiRisk.overallRisk}% — ${aiRisk.riskLevel}</strong>
  <p style="color:#4a5568;font-size:13px;margin-top:4px">${aiRisk.summary}</p>
</div>
${aiRisk.tasks?.map((t) => `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><span>${t.task}</span><strong style="color:${rc(t.risk)}">${t.risk}%</strong></div><div class="bar-wrap"><div class="bar-fill" style="width:${t.risk}%;background:${rc(t.risk)}"></div></div><div style="font-size:11px;color:#8899bb;margin-top:2px">${t.reason}</div></div>`).join("") || ""}
${aiRisk.advice ? `<div style="margin-top:14px;padding:12px;background:#eef2ff;border-radius:8px;font-size:13px"><strong>💡 How to Stay Relevant:</strong> ${aiRisk.advice}</div>` : ""}`
    : ""
}
${
  realityCheck
    ? `<h2>🔍 Reality Check</h2>
<div class="cols2">
  <div><h3 style="color:#00a884;margin-bottom:8px">✅ Pros</h3>${realityCheck.pros?.map((p) => `<div class="pro">+ ${p}</div>`).join("") || ""}</div>
  <div><h3 style="color:#ff4d6d;margin-bottom:8px">⚠️ Cons</h3>${realityCheck.cons?.map((c) => `<div class="con">− ${c}</div>`).join("") || ""}</div>
</div>
${realityCheck.verdict ? `<div class="verdict" style="margin-top:20px">⚖️ <em>${realityCheck.verdict}</em></div>` : ""}`
    : ""
}
<div class="footer">Generated by CareerAI · ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} · Free career intelligence</div>
</body></html>`;
}
