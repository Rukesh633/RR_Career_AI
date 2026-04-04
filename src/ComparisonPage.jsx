/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { compareCareers } from "./aiService";

function riskColor(v) {
  if (v > 70) return "#ff4d6d";
  if (v > 40) return "#ffb347";
  return "#00c9a7";
}

const SUGGESTIONS = [
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Content Creator",
  "Chartered Accountant",
  "Digital Marketer",
  "Full Stack Developer",
];

export default function ComparisonPage({ navigate }) {
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [anim, setAnim] = useState(false);
  const resultRef = useRef(null);

  const submit = async () => {
    if (!c1 || !c2) {
      setError("Enter both careers to compare.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setAnim(false);
    try {
      const data = await compareCareers(c1, c2);
      setResult(data);
      setTimeout(() => {
        setAnim(true);
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (err) {
      console.error("Comparison error:", err);
      setError(err.message || "Comparison failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: "62px",
        minHeight: "100vh",
        padding: "100px 24px 60px",
      }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div
          className="anim-fade-up d-0"
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="section-tag" style={{ color: "#a78bfa" }}>
            ⚖️ Career Comparison
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 50px)",
              fontWeight: "800",
              letterSpacing: "-2px",
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Compare Two
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #4f7eff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Career Paths
            </span>
          </h1>
          <p style={{ color: "var(--text-2)", fontSize: "15px" }}>
            Salary, AI risk, demand, growth — side by side.
          </p>
        </div>

        <div
          className="glass anim-fade-up d-1"
          style={{ padding: "32px", marginBottom: "28px" }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Quick fill
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (!c1) setC1(s);
                    else if (!c2) setC2(s);
                  }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    color: "var(--text-3)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.borderColor = "var(--border-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-3)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "16px",
              alignItems: "end",
            }}
          >
            <IBox
              label="Career A"
              placeholder="e.g. Software Engineer"
              value={c1}
              onChange={setC1}
              color="#4f7eff"
            />
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-3)",
                fontWeight: "800",
                fontSize: "13px",
                flexShrink: 0,
              }}
            >
              vs
            </div>
            <IBox
              label="Career B"
              placeholder="e.g. Data Scientist"
              value={c2}
              onChange={setC2}
              color="#a78bfa"
            />
          </div>

          {error && (
            <div
              style={{
                marginTop: "14px",
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
              width: "100%",
              marginTop: "18px",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              background: loading
                ? "var(--surface-2)"
                : "linear-gradient(135deg, #a78bfa, #4f7eff)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "var(--font-body)",
              cursor: loading ? "wait" : "pointer",
              boxShadow: loading ? "none" : "0 4px 24px rgba(167,139,250,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
          >
            {loading ? (
              <>
                <Spin /> Comparing…
              </>
            ) : (
              "⚖️ Compare Careers"
            )}
          </button>
        </div>

        <div ref={resultRef} />
        {result && (
          <CompResult result={result} anim={anim} c1label={c1} c2label={c2} />
        )}
      </div>
    </div>
  );
}

function CompResult({ result, anim, c1label, c2label }) {
  const {
    career1: d1,
    career2: d2,
    winner,
    winnerReason,
    recommendation,
  } = result;
  const wColor =
    winner === "career1"
      ? "#4f7eff"
      : winner === "career2"
        ? "#a78bfa"
        : "#ffb347";
  const wLabel =
    winner === "career1"
      ? d1?.name || c1label
      : winner === "career2"
        ? d2?.name || c2label
        : "It's a tie";

  const METRICS = [
    { label: "Expected Salary", key: "salary", type: "text" },
    { label: "Market Demand", key: "demand", type: "text" },
    { label: "AI Risk", key: "aiRisk", type: "bar", danger: true },
    { label: "Growth Rate", key: "growthRate", type: "text" },
    { label: "Time to Learn", key: "timeToLearn", type: "text" },
    {
      label: "Job Satisfaction",
      key: "jobSatisfaction",
      type: "bar",
      danger: false,
    },
  ];

  return (
    <div className="anim-fade-in">
      <div
        style={{
          padding: "20px 24px",
          borderRadius: "14px",
          marginBottom: "22px",
          background: `linear-gradient(135deg, ${wColor}10, ${wColor}04)`,
          border: `1px solid ${wColor}40`,
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span style={{ fontSize: "36px" }}>🏆</span>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "20px",
              color: "var(--text)",
              marginBottom: "3px",
            }}
          >
            {wLabel} wins!
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-2)" }}>
            {winnerReason}
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: "28px", marginBottom: "18px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div />
          <div
            style={{
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "16px",
              color: "#4f7eff",
            }}
          >
            {d1?.name || c1label}
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "16px",
              color: "#a78bfa",
            }}
          >
            {d2?.name || c2label}
          </div>
        </div>
        {METRICS.map((m, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              gap: "12px",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              {m.label}
            </div>
            {[d1, d2].map((d, j) => (
              <div key={j} style={{ textAlign: "center" }}>
                {m.type === "text" ? (
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--text)",
                    }}
                  >
                    {d?.[m.key] || "—"}
                  </span>
                ) : (
                  <div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: m.danger ? riskColor(d?.[m.key]) : "#00c9a7",
                      }}
                    >
                      {d?.[m.key]}%
                    </span>
                    <div
                      style={{
                        height: "4px",
                        borderRadius: "2px",
                        background: "var(--surface-3)",
                        overflow: "hidden",
                        marginTop: "4px",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "2px",
                          background: m.danger
                            ? riskColor(d?.[m.key])
                            : "#00c9a7",
                          width: anim ? `${d?.[m.key]}%` : "0%",
                          transition: "width 1.2s ease",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "18px",
        }}
      >
        {[
          { d: d1, label: d1?.name || c1label, color: "#4f7eff" },
          { d: d2, label: d2?.name || c2label, color: "#a78bfa" },
        ].map((item, i) => (
          <div
            key={i}
            className="glass"
            style={{ padding: "20px", borderLeft: `3px solid ${item.color}` }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: item.color,
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--text-2)",
                lineHeight: 1.6,
              }}
            >
              {item.d?.verdict || "—"}
            </div>
          </div>
        ))}
      </div>

      {recommendation && (
        <div
          style={{
            padding: "24px",
            borderRadius: "var(--radius)",
            background:
              "linear-gradient(135deg, rgba(79,126,255,0.08), rgba(0,201,167,0.06))",
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
            💡 Recommendation
          </div>
          <p
            style={{ color: "var(--text)", fontSize: "15px", lineHeight: 1.7 }}
          >
            {recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

function IBox({ label, placeholder, value, onChange, color }) {
  const [f, setF] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "700",
          color,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "7px",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "8px",
          border: `1px solid ${f ? color : "var(--border)"}`,
          background: "var(--surface-2)",
          color: "var(--text)",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          outline: "none",
          transition: "border-color 0.2s",
          boxShadow: f ? `0 0 0 3px ${color}18` : "none",
        }}
      />
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
