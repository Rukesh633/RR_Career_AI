import { useState, useEffect, useRef } from "react";
import { analyzeJobRisk } from "./aiService";

const EXAMPLE_JOBS = [
  "Software Engineer",
  "Data Analyst",
  "Graphic Designer",
  "Content Writer",
  "Accountant",
  "HR Manager",
  "Sales Executive",
  "Customer Support",
  "Marketing Manager",
  "Teacher / Lecturer",
];

function riskColor(v) {
  if (v > 70) return "#ff4d6d";
  if (v > 40) return "#ffb347";
  return "#00c9a7";
}

const PRI_COLORS = {
  Urgent: "#ff4d6d",
  Important: "#ffb347",
  "Good to have": "#00c9a7",
};
const CAT_COLORS = {
  Automatable: "#ff4d6d",
  Augmentable: "#ffb347",
  "Human-only": "#00c9a7",
};

export default function RiskAnalyzerPage({ navigate }) {
  const [form, setForm] = useState({
    jobTitle: "",
    industry: "",
    responsibilities: "",
    experience: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  const submit = async () => {
    if (!form.jobTitle.trim()) {
      setError("Please enter your job title.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeJobRisk(form);
      setResult(data);
      setTimeout(
        () =>
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        150,
      );
    } catch (err) {
      console.error("Risk analysis error:", err);
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "62px", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "60px 24px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,77,109,0.09), transparent 65%)",
            pointerEvents: "none",
            animation: "orbFloat 7s ease-in-out infinite",
          }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <button
            onClick={() => navigate("home")}
            className="btn-ghost"
            style={{
              marginBottom: "28px",
              padding: "7px 14px",
              fontSize: "13px",
            }}
          >
            ← Home
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div className="anim-fade-up d-0">
              <div className="section-tag" style={{ color: "#ff4d6d" }}>
                🤖 AI Risk Analyzer
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  fontWeight: "800",
                  letterSpacing: "-2px",
                  color: "var(--text)",
                  marginBottom: "16px",
                  lineHeight: 1.04,
                }}
              >
                Will AI Replace
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff4d6d, #ffb347)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Job?
                </span>
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--text-2)",
                  lineHeight: 1.75,
                  maxWidth: "420px",
                  marginBottom: "28px",
                }}
              >
                Get an honest, task-by-task breakdown of how much of your job AI
                can automate — and exactly what to do about it.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  ["#00c9a7", "Low Risk", "0–40%"],
                  ["#ffb347", "Moderate", "40–70%"],
                  ["#ff4d6d", "High Risk", "70–100%"],
                ].map(([c, l, r]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: c,
                        boxShadow: `0 0 8px ${c}`,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "var(--text)",
                        }}
                      >
                        {l}
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--text-3)" }}>
                        {r}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              className="glass anim-scale-in d-2"
              style={{ padding: "32px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "800",
                  fontSize: "19px",
                  color: "var(--text)",
                  marginBottom: "4px",
                  letterSpacing: "-0.5px",
                }}
              >
                Analyze Your Job
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-3)",
                  marginBottom: "16px",
                }}
              >
                More detail = better analysis
              </div>

              {/* Quick examples */}
              <div style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "7px",
                  }}
                >
                  Quick examples
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {EXAMPLE_JOBS.map((j) => (
                    <button
                      key={j}
                      onClick={() => setForm((f) => ({ ...f, jobTitle: j }))}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "500",
                        border: `1px solid ${form.jobTitle === j ? "rgba(255,77,109,0.5)" : "var(--border)"}`,
                        background:
                          form.jobTitle === j
                            ? "rgba(255,77,109,0.1)"
                            : "var(--surface-2)",
                        color:
                          form.jobTitle === j ? "#ff4d6d" : "var(--text-3)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <RField
                  label="Job Title *"
                  placeholder="e.g. Data Analyst"
                  value={form.jobTitle}
                  onChange={(v) => setForm((f) => ({ ...f, jobTitle: v }))}
                  icon="💼"
                  ac="#ff4d6d"
                />
                <RField
                  label="Industry"
                  placeholder="e.g. Finance, IT, Healthcare"
                  value={form.industry}
                  onChange={(v) => setForm((f) => ({ ...f, industry: v }))}
                  icon="🏢"
                  ac="#ff4d6d"
                />
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "var(--text-3)",
                      marginBottom: "5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                    }}
                  >
                    Key Responsibilities
                  </label>
                  <textarea
                    placeholder="What do you actually do? e.g. write reports, analyze data, manage clients…"
                    value={form.responsibilities}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        responsibilities: e.target.value,
                      }))
                    }
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "var(--surface-2)",
                      color: "var(--text)",
                      fontSize: "13px",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ff4d6d")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <RField
                  label="Years of Experience"
                  placeholder="e.g. Fresher, 3 years"
                  value={form.experience}
                  onChange={(v) => setForm((f) => ({ ...f, experience: v }))}
                  icon="📅"
                  ac="#ff4d6d"
                />
                <RField
                  label="Key Skills"
                  placeholder="e.g. Excel, Python, negotiation"
                  value={form.skills}
                  onChange={(v) => setForm((f) => ({ ...f, skills: v }))}
                  icon="⚡"
                  ac="#ff4d6d"
                />

                {error && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "rgba(255,77,109,0.1)",
                      border: "1px solid rgba(255,77,109,0.25)",
                      color: "#ff4d6d",
                      fontSize: "12px",
                    }}
                  >
                    ⚠ {error}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  style={{
                    padding: "14px",
                    borderRadius: "8px",
                    border: "none",
                    marginTop: "4px",
                    background: loading
                      ? "var(--surface-2)"
                      : "linear-gradient(135deg, #ff4d6d, #ffb347)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "var(--font-body)",
                    cursor: loading ? "wait" : "pointer",
                    boxShadow: loading
                      ? "none"
                      : "0 4px 24px rgba(255,77,109,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? (
                    <>
                      <Spin /> Analyzing risk…
                    </>
                  ) : (
                    "🤖 Analyze My Job Risk"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){div>div>div:nth-child(2)>div:last-child{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
      </div>

      {/* Results */}
      {result && (
        <div
          ref={resultRef}
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}
        >
          <RiskResults data={result} navigate={navigate} />
        </div>
      )}
    </div>
  );
}

function RiskResults({ data, navigate }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnim(true), 150);
    return () => clearTimeout(t);
  }, []);
  const rc = riskColor(data.overallRisk);

  return (
    <div className="anim-fade-in">
      {/* Big hero risk card */}
      <div
        style={{
          padding: "40px",
          borderRadius: "20px",
          marginBottom: "24px",
          background: `linear-gradient(135deg, ${rc}10, ${rc}04)`,
          border: `1px solid ${rc}40`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${rc}15, transparent 65%)`,
            pointerEvents: "none",
            animation: "orbFloat 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <BigGauge val={data.overallRisk} color={rc} animated={anim} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "12px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: rc,
                  background: rc + "20",
                  padding: "4px 12px",
                  borderRadius: "6px",
                }}
              >
                {data.riskLevel} Risk
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-3)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  padding: "4px 12px",
                  borderRadius: "6px",
                }}
              >
                ⏰ Impact in {data.timeToImpact || "next few years"}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: "800",
                letterSpacing: "-1px",
                color: "var(--text)",
                marginBottom: "12px",
              }}
            >
              {data.jobTitle} —{" "}
              {data.riskCategory || `${data.riskLevel} Automation Risk`}
            </h2>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: "15px",
                lineHeight: 1.75,
                maxWidth: "560px",
                marginBottom: "14px",
              }}
            >
              {data.summary}
            </p>
            {data.industryContext && (
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-3)",
                  fontStyle: "italic",
                  borderLeft: "2px solid var(--border)",
                  paddingLeft: "12px",
                }}
              >
                {data.industryContext}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task breakdown */}
      {data.tasks?.length > 0 && (
        <div
          className="glass"
          style={{ padding: "28px", marginBottom: "20px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "20px",
              color: "var(--text)",
              marginBottom: "4px",
              letterSpacing: "-0.5px",
            }}
          >
            Task-by-Task Breakdown
          </div>
          <p
            style={{
              color: "var(--text-3)",
              fontSize: "13px",
              marginBottom: "22px",
            }}
          >
            How much of each task AI can currently automate
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {data.tasks.map((t, i) => {
              const c = riskColor(t.risk);
              const catC = CAT_COLORS[t.category] || "var(--text-3)";
              return (
                <div
                  key={i}
                  style={{
                    padding: "14px",
                    borderRadius: "10px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    animation: `fadeUp 0.4s ${i * 0.06}s ease both`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          color: "var(--text)",
                        }}
                      >
                        {t.task}
                      </span>
                      {t.category && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                            color: catC,
                            background: catC + "18",
                            padding: "2px 7px",
                            borderRadius: "4px",
                          }}
                        >
                          {t.category}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: "800",
                        color: c,
                      }}
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
                        transitionDelay: `${i * 0.07}s`,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-3)",
                      marginTop: "6px",
                      lineHeight: 1.5,
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

      {/* Safe / At risk / Future */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
          marginBottom: "20px",
        }}
      >
        {data.safestAspects?.length > 0 && (
          <div
            className="glass card-lift"
            style={{ padding: "24px", borderLeft: "3px solid #00c9a7" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "#00c9a7",
                marginBottom: "14px",
              }}
            >
              🛡️ Safest Parts
            </div>
            {data.safestAspects.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "var(--text-2)",
                }}
              >
                <span style={{ color: "#00c9a7", flexShrink: 0 }}>✓</span>
                {s}
              </div>
            ))}
          </div>
        )}
        {data.mostAtRisk?.length > 0 && (
          <div
            className="glass card-lift"
            style={{ padding: "24px", borderLeft: "3px solid #ff4d6d" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "#ff4d6d",
                marginBottom: "14px",
              }}
            >
              ⚠️ Most at Risk
            </div>
            {data.mostAtRisk.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "var(--text-2)",
                }}
              >
                <span style={{ color: "#ff4d6d", flexShrink: 0 }}>!</span>
                {s}
              </div>
            ))}
          </div>
        )}
        {data.futureRole && (
          <div
            className="glass card-lift"
            style={{ padding: "24px", borderLeft: "3px solid #a78bfa" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "16px",
                color: "#a78bfa",
                marginBottom: "12px",
              }}
            >
              🔮 In 10 Years
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-2)",
                lineHeight: 1.65,
              }}
            >
              {data.futureRole}
            </p>
          </div>
        )}
      </div>

      {/* Action plan */}
      {data.actionPlan?.length > 0 && (
        <div
          className="glass"
          style={{ padding: "28px", marginBottom: "20px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "20px",
              color: "var(--text)",
              letterSpacing: "-0.5px",
              marginBottom: "20px",
            }}
          >
            🎯 Your Personal Action Plan
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {data.actionPlan.map((a, i) => {
              const pc = PRI_COLORS[a.priority] || "var(--text-3)";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "16px",
                    borderRadius: "10px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    animation: `fadeUp 0.4s ${i * 0.08}s ease both`,
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: pc + "20",
                      border: `2px solid ${pc}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: "900",
                      fontSize: "14px",
                      color: pc,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          color: "var(--text)",
                        }}
                      >
                        {a.action}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          color: pc,
                          background: pc + "18",
                          padding: "2px 7px",
                          borderRadius: "4px",
                        }}
                      >
                        {a.priority}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-3)",
                        lineHeight: 1.5,
                      }}
                    >
                      💡 {a.impact}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alternative careers */}
      {data.alternativeCareers?.length > 0 && (
        <div
          className="glass"
          style={{ padding: "28px", marginBottom: "24px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "20px",
              color: "var(--text)",
              letterSpacing: "-0.5px",
              marginBottom: "6px",
            }}
          >
            🚀 Lower-Risk Alternatives
          </div>
          <p
            style={{
              color: "var(--text-3)",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            Similar skills, much lower AI automation risk
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {data.alternativeCareers.map((c, i) => {
              const cc = riskColor(c.risk);
              return (
                <div
                  key={i}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onClick={() => navigate("home")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cc + "60";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 12px 30px ${cc}18`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "15px",
                        color: "var(--text)",
                      }}
                    >
                      {c.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "800",
                        fontSize: "16px",
                        color: cc,
                      }}
                    >
                      {c.risk}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "2px",
                      background: "var(--border)",
                      overflow: "hidden",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        width: `${c.risk}%`,
                        background: cc,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-3)",
                      lineHeight: 1.5,
                      marginBottom: "8px",
                    }}
                  >
                    {c.reason}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--accent)",
                      fontWeight: "600",
                    }}
                  >
                    Get full roadmap →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "36px",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(79,126,255,0.08), rgba(0,201,167,0.08))",
          border: "1px solid rgba(79,126,255,0.2)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "800",
            fontSize: "22px",
            color: "var(--text)",
            letterSpacing: "-0.5px",
            marginBottom: "8px",
          }}
        >
          Ready to future-proof your career?
        </div>
        <p
          style={{
            color: "var(--text-2)",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          Get your full transition roadmap, skill plan and timeline.
        </p>
        <button
          onClick={() => navigate("home")}
          className="btn-primary"
          style={{ padding: "13px 32px" }}
        >
          Get My Career Roadmap →
        </button>
      </div>
    </div>
  );
}

function BigGauge({ val, color, animated }) {
  const r = 60,
    circ = 2 * Math.PI * r;
  return (
    <div
      style={{
        position: "relative",
        width: "150px",
        height: "150px",
        flexShrink: 0,
      }}
    >
      <svg width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
        />
        <circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - val / 100) : circ}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
            filter: `drop-shadow(0 0 8px ${color}80)`,
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
            fontSize: "36px",
            fontWeight: "800",
            color,
            lineHeight: 1,
          }}
        >
          {val}%
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.6px",
            marginTop: "2px",
          }}
        >
          AI Risk
        </span>
      </div>
    </div>
  );
}

function RField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  ac = "var(--accent)",
}) {
  const [f, setF] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: "600",
          color: "var(--text-3)",
          marginBottom: "5px",
          textTransform: "uppercase",
          letterSpacing: "0.6px",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "11px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "14px",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={{
            width: "100%",
            padding: "10px 12px 10px 34px",
            borderRadius: "8px",
            border: `1px solid ${f ? ac : "var(--border)"}`,
            background: "var(--surface-2)",
            color: "var(--text)",
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.2s",
            boxShadow: f ? `0 0 0 3px ${ac}18` : "none",
          }}
        />
      </div>
    </div>
  );
}

function Spin() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        animation: "spinSlow 0.7s linear infinite",
      }}
    />
  );
}
