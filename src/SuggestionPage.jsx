import { useState, useRef } from "react";
import { getSuggestions } from "./aiService";

const TAG_COLORS = {
  "Best Match": "#4f7eff",
  "Safe from AI": "#00c9a7",
  "High Growth": "#ffb347",
  Creative: "#a78bfa",
  Stable: "#06b6d4",
};

const FIELDS = [
  {
    key: "background",
    icon: "👤",
    label: "Your Background",
    placeholder:
      "e.g. B.Tech graduate, 2 years in marketing, self-taught programmer…",
  },
  {
    key: "interests",
    icon: "❤️",
    label: "What You Love Doing",
    placeholder:
      "e.g. building things, solving puzzles, creative writing, helping people…",
  },
  {
    key: "values",
    icon: "⭐",
    label: "What Matters to You",
    placeholder:
      "e.g. high salary, work-life balance, impact, creative freedom, stability…",
  },
  {
    key: "lifestyle",
    icon: "🏠",
    label: "Preferred Work Style",
    placeholder:
      "e.g. remote work, startup, structured 9-5, freelance, travel-friendly…",
  },
  {
    key: "avoidance",
    icon: "🚫",
    label: "What to Avoid",
    placeholder: "e.g. no customer service, avoid heavy math, no manual labor…",
  },
  {
    key: "education",
    icon: "🎓",
    label: "Education",
    placeholder:
      "e.g. B.Com, MBA dropout, no degree but self-taught, 12th pass…",
  },
];

export default function SuggestionPage({ navigate }) {
  const [form, setForm] = useState({
    background: "",
    interests: "",
    values: "",
    lifestyle: "",
    avoidance: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  const submit = async () => {
    if (!form.background && !form.interests) {
      setError("Fill in at least your background or interests.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await getSuggestions(form);
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
      console.error("Suggestions error:", err);
      setError(err.message || "Failed to fetch suggestions. Try again.");
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
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <div
          className="anim-fade-up d-0"
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="section-tag" style={{ color: "#00c9a7" }}>
            💡 Personalized Suggestions
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
            Don't know what
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00c9a7, #4f7eff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              career to choose?
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "15px",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Tell us about yourself. We'll find careers that genuinely fit your
            personality and goals.
          </p>
        </div>

        <div
          className="glass anim-fade-up d-1"
          style={{ padding: "36px", marginBottom: "28px" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {FIELDS.map((fld) => (
              <div key={fld.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    marginBottom: "7px",
                  }}
                >
                  {fld.icon} {fld.label}
                </label>
                <textarea
                  placeholder={fld.placeholder}
                  value={form[fld.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [fld.key]: e.target.value }))
                  }
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    color: "var(--text)",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00c9a7")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

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
                background: loading
                  ? "var(--surface-2)"
                  : "linear-gradient(135deg, #00c9a7, #4f7eff)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                fontFamily: "var(--font-body)",
                cursor: loading ? "wait" : "pointer",
                boxShadow: loading ? "none" : "0 4px 24px rgba(0,201,167,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <Spin /> Finding your best careers…
                </>
              ) : (
                "✦ Show My Career Matches"
              )}
            </button>
          </div>
        </div>

        {result && (
          <div ref={resultRef} className="anim-fade-in">
            {result.insight && (
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: "12px",
                  marginBottom: "22px",
                  background:
                    "linear-gradient(135deg, rgba(0,201,167,0.08), rgba(79,126,255,0.06))",
                  border: "1px solid rgba(0,201,167,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    color: "#00c9a7",
                    marginBottom: "6px",
                  }}
                >
                  🎯 Insight About You
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text)",
                    lineHeight: 1.7,
                  }}
                >
                  {result.insight}
                </p>
              </div>
            )}

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "800",
                fontSize: "22px",
                letterSpacing: "-0.5px",
                color: "var(--text)",
                marginBottom: "18px",
              }}
            >
              Your Top Career Matches
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {result.suggestions?.map((s, i) => {
                const tagC = TAG_COLORS[s.tag] || "#8899bb";
                const matchC =
                  s.match > 80
                    ? "#00c9a7"
                    : s.match > 60
                      ? "#ffb347"
                      : "var(--text-2)";
                return (
                  <div
                    key={i}
                    className="glass card-lift"
                    style={{
                      padding: "22px",
                      display: "flex",
                      gap: "18px",
                      alignItems: "center",
                      animation: `fadeUp 0.4s ${i * 0.08}s ease both`,
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "14px",
                        background:
                          i === 0
                            ? "linear-gradient(135deg, #ffb347, #ff4d6d)"
                            : "var(--surface-2)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        flexShrink: 0,
                      }}
                    >
                      {s.emoji || ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: "700",
                            fontSize: "17px",
                            color: "var(--text)",
                            letterSpacing: "-0.3px",
                          }}
                        >
                          {s.title}
                        </span>
                        {s.tag && (
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                              color: tagC,
                              background: tagC + "18",
                              padding: "2px 7px",
                              borderRadius: "4px",
                            }}
                          >
                            {s.tag}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "var(--text-2)",
                          marginBottom: "10px",
                          lineHeight: 1.5,
                        }}
                      >
                        {s.reason}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          flexWrap: "wrap",
                          fontSize: "12px",
                        }}
                      >
                        <span>
                          <span style={{ color: "var(--text-3)" }}>
                            Salary:
                          </span>{" "}
                          <span
                            style={{ color: "var(--text)", fontWeight: "600" }}
                          >
                            {s.salary}
                          </span>
                        </span>
                        <span>
                          <span style={{ color: "var(--text-3)" }}>
                            AI Risk:
                          </span>{" "}
                          <span
                            style={{
                              color: s.aiRisk > 60 ? "#ff4d6d" : "#00c9a7",
                              fontWeight: "600",
                            }}
                          >
                            {s.aiRisk}%
                          </span>
                        </span>
                        <span>
                          <span style={{ color: "var(--text-3)" }}>
                            Switch time:
                          </span>{" "}
                          <span
                            style={{ color: "var(--text)", fontWeight: "600" }}
                          >
                            {s.timeToSwitch}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "26px",
                          fontWeight: "800",
                          color: matchC,
                          lineHeight: 1,
                        }}
                      >
                        {s.match}%
                      </div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginTop: "2px",
                        }}
                      >
                        match
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: "center", marginTop: "28px" }}>
              <p
                style={{
                  color: "var(--text-3)",
                  fontSize: "13px",
                  marginBottom: "12px",
                }}
              >
                Interested in one? Get the full roadmap.
              </p>
              <button onClick={() => navigate("home")} className="btn-ghost">
                Analyze a Career Path →
              </button>
            </div>
          </div>
        )}
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
