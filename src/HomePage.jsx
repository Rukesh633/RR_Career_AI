import { useState, useEffect, useRef } from "react";
import { analyzeCareer } from "./aiService";

const ROLES = [
  "Software Engineer",
  "Data Scientist",
  "Marketing Manager",
  "Graphic Designer",
  "MBA Graduate",
  "CS Student",
  "Accountant",
  "Content Writer",
  "Sales Executive",
  "BCA Graduate",
];

const FEATURES = [
  {
    icon: "🗺️",
    title: "Step-by-Step Roadmap",
    desc: "Phased plan with timelines, free resources and milestones.",
    color: "#4f7eff",
    page: null,
  },
  {
    icon: "🤖",
    title: "AI Risk Analyzer",
    desc: "See which tasks will be automated and what to do about it.",
    color: "#ff4d6d",
    page: "risk",
  },
  {
    icon: "⚡",
    title: "Skill Gap Analysis",
    desc: "Discover what you need, prioritized by importance and time.",
    color: "#00c9a7",
    page: null,
  },
  {
    icon: "🔍",
    title: "Reality Check",
    desc: "Honest pros, cons, myths and a no-BS verdict on your path.",
    color: "#ffb347",
    page: null,
  },
  {
    icon: "⚖️",
    title: "Career Comparison",
    desc: "Compare two careers across salary, AI risk, demand and growth.",
    color: "#a78bfa",
    page: "compare",
  },
  {
    icon: "💡",
    title: "Smart Suggestions",
    desc: "Tell us about yourself — we'll find careers that actually fit.",
    color: "#06b6d4",
    page: "suggest",
  },
];

const STATS = [
  { value: "500+", label: "Career Paths" },
  { value: "94%", label: "Found Clarity" },
  { value: "₹0", label: "Cost to Start" },
  { value: "2 min", label: "Analysis Time" },
];

export default function HomePage({ navigate, onResults }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFading, setRoleFading] = useState(false);
  const [form, setForm] = useState({
    currentRole: "",
    targetCareer: "",
    experience: "",
    education: "",
    skills: "",
    goals: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const heroRef = useRef(null);

  // Rotate roles with fade
  useEffect(() => {
    const t = setInterval(() => {
      setRoleFading(true);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRoleFading(false);
      }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // Parallax orbs
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height } = hero.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 30;
      const y = (clientY / height - 0.5) * 30;
      const orb1 = hero.querySelector("#orb1");
      const orb2 = hero.querySelector("#orb2");
      if (orb1) orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      if (orb2)
        orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    };
    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  const submit = async () => {
    if (!form.currentRole && !form.targetCareer) {
      setError("Please enter at least your current role or target career.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await analyzeCareer(form);
      onResults(res);
    } catch (err) {
      console.error("Career analysis error:", err);
      setError(
        err.message ||
          "Analysis failed. Check your .env API key and Vite dev server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "62px" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated orbs */}
        <div
          id="orb1"
          style={{
            position: "absolute",
            top: "5%",
            left: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,126,255,0.1) 0%, transparent 65%)",
            pointerEvents: "none",
            transition: "transform 0.1s linear",
            animation: "orbFloat 8s ease-in-out infinite",
          }}
        />
        <div
          id="orb2"
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
            transition: "transform 0.1s linear",
            animation: "orbFloat 10s ease-in-out infinite reverse",
          }}
        />
        {/* Subtle top line glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(79,126,255,0.4), transparent)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 430px",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <div
                className="section-tag anim-fade-up d-0"
                style={{ color: "var(--accent)" }}
              >
                ✦ AI-Powered Career Intelligence
              </div>

              <h1
                className="anim-fade-up d-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 5.5vw, 68px)",
                  fontWeight: "800",
                  lineHeight: 1.04,
                  letterSpacing: "-2.5px",
                  color: "var(--text)",
                  marginBottom: "20px",
                }}
              >
                Navigate Your
                <br />
                Career with
                <br />
                <span className="grad-shift">Clarity.</span>
              </h1>

              <p
                className="anim-fade-up d-2"
                style={{
                  fontSize: "17px",
                  lineHeight: 1.75,
                  color: "var(--text-2)",
                  maxWidth: "490px",
                  marginBottom: "16px",
                }}
              >
                Stop guessing. Get a personalized roadmap, skill gap analysis,
                and know exactly how safe your role is from AI automation.
              </p>

              {/* Rotating role pill */}
              <div
                className="anim-fade-up d-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "40px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-3)" }}>
                  Perfect for
                </span>
                <div
                  style={{
                    padding: "5px 14px",
                    borderRadius: "8px",
                    background: "rgba(79,126,255,0.1)",
                    border: "1px solid rgba(79,126,255,0.2)",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "var(--accent)",
                    minWidth: "190px",
                    textAlign: "center",
                    opacity: roleFading ? 0 : 1,
                    transform: roleFading
                      ? "translateY(-4px)"
                      : "translateY(0)",
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                >
                  {ROLES[roleIndex]}
                </div>
              </div>

              {/* Stats row */}
              <div
                className="anim-fade-up d-4"
                style={{
                  display: "flex",
                  gap: "28px",
                  flexWrap: "wrap",
                  paddingTop: "28px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {STATS.map((s, i) => (
                  <div key={i} className={`anim-fade-up d-${4 + i}`}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-3)",
                        marginTop: "3px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form card */}
            <div
              className="glass anim-scale-in d-2"
              style={{
                padding: "32px",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,126,255,0.1)",
              }}
            >
              <div style={{ marginBottom: "22px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: "800",
                    color: "var(--text)",
                    letterSpacing: "-0.5px",
                    marginBottom: "4px",
                  }}
                >
                  Analyze Your Career
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-3)" }}>
                  Fill what you know — AI handles the rest
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <FormField
                  label="Current Role / Background"
                  placeholder="e.g. CS Student, Marketing Manager"
                  value={form.currentRole}
                  onChange={(v) => setForm((f) => ({ ...f, currentRole: v }))}
                  icon="👤"
                />
                <FormField
                  label="Target Career"
                  placeholder="e.g. Data Scientist, UX Designer"
                  value={form.targetCareer}
                  onChange={(v) => setForm((f) => ({ ...f, targetCareer: v }))}
                  icon="🎯"
                />
                <FormField
                  label="Years of Experience"
                  placeholder="e.g. Fresher, 2 years, 5+ years"
                  value={form.experience}
                  onChange={(v) => setForm((f) => ({ ...f, experience: v }))}
                  icon="📅"
                />

                <button
                  onClick={() => setAdvanced((a) => !a)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent)",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    padding: "2px 0",
                    transition: "opacity 0.2s",
                  }}
                >
                  {advanced ? "▼ Hide" : "▶ Add"} more details (optional)
                </button>

                {advanced && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      animation: "fadeUp 0.3s ease",
                    }}
                  >
                    <FormField
                      label="Education"
                      placeholder="e.g. B.Tech CS, MBA, BCA"
                      value={form.education}
                      onChange={(v) => setForm((f) => ({ ...f, education: v }))}
                      icon="🎓"
                    />
                    <FormField
                      label="Current Skills"
                      placeholder="e.g. Python, Excel, Photoshop"
                      value={form.skills}
                      onChange={(v) => setForm((f) => ({ ...f, skills: v }))}
                      icon="⚡"
                    />
                    <FormField
                      label="Main Goal"
                      placeholder="e.g. Higher salary, job security"
                      value={form.goals}
                      onChange={(v) => setForm((f) => ({ ...f, goals: v }))}
                      icon="🏆"
                    />
                  </div>
                )}

                {error && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "rgba(255,77,109,0.1)",
                      border: "1px solid rgba(255,77,109,0.25)",
                      color: "#ff4d6d",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    ⚠ {error}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="btn-primary anim-glow"
                  style={{
                    marginTop: "4px",
                    width: "100%",
                    padding: "14px",
                    fontSize: "15px",
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner /> Analyzing your career…
                    </>
                  ) : (
                    "✦ Generate My Analysis"
                  )}
                </button>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "var(--text-3)",
                  }}
                >
                  Free · No account needed · ~30 seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:900px){section>div>div{grid-template-columns:1fr!important;gap:36px!important;}}`}</style>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,126,255,0.04) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
        >
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              className="section-tag anim-fade-up"
              style={{ color: "var(--accent-2)" }}
            >
              What You Get
            </div>
            <h2
              className="anim-fade-up d-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: "800",
                letterSpacing: "-2px",
                color: "var(--text)",
                marginBottom: "12px",
              }}
            >
              Everything to make
              <br />
              <span className="grad-blue">the right move.</span>
            </h2>
            <p
              className="anim-fade-up d-2"
              style={{
                color: "var(--text-2)",
                fontSize: "16px",
                maxWidth: "440px",
                margin: "0 auto",
              }}
            >
              Structured, AI-driven intelligence built for the modern job
              market.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "18px",
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ──────────────────────────────────────── */}
      <section style={{ padding: "100px 24px" }}>
        <div
          style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}
        >
          <div
            className="section-tag anim-fade-up"
            style={{ color: "var(--warn)" }}
          >
            Who It's For
          </div>
          <h2
            className="anim-fade-up d-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.5vw, 42px)",
              fontWeight: "800",
              letterSpacing: "-2px",
              color: "var(--text)",
              marginBottom: "48px",
            }}
          >
            Built for <span className="grad-warm">real people</span>
            <br />
            with real confusion.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                e: "🎓",
                t: "Students",
                d: "Confused about which career to choose after graduation.",
              },
              {
                e: "🔄",
                t: "Career Switchers",
                d: "Planning to jump into a completely different field.",
              },
              {
                e: "😰",
                t: "AI-Worried",
                d: "Professionals wondering if their job will be automated.",
              },
              {
                e: "⏸️",
                t: "Career Gap",
                d: "Looking to re-enter the workforce after a break.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`glass card-lift anim-fade-up d-${i + 1}`}
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>
                  {p.e}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "16px",
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {p.t}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-3)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(79,126,255,0.06), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}
        >
          <h2
            className="anim-fade-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: "800",
              letterSpacing: "-2px",
              color: "var(--text)",
              marginBottom: "14px",
            }}
          >
            Your next move starts
            <br />
            <span className="grad-blue">right now.</span>
          </h2>
          <p
            className="anim-fade-up d-1"
            style={{
              color: "var(--text-2)",
              fontSize: "15px",
              marginBottom: "0px",
            }}
          >
            Free, instant, and honest. No account needed.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-primary anim-fade-up d-2 anim-glow"
            style={{ padding: "15px 10px", fontSize: "16px" }}
          >
            Analyze My Career — It's Free
          </button>
          <button
            onClick={() => navigate("about")}
            className="btn-primary anim-fade-up d-2 anim-glow"
            style={{
              padding: "15px 36px",
              fontSize: "16px",
              marginTop: "24px",
            }}
          >
            Explore All Features →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "48px 32px 32px",
            display: "flex",
            gap: "48px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left — logo + tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: "220px",
            }}
          >
            <a
              href="https://www.linkedin.com/in/rukesh-boddeti/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/Rukesh_Raj.png"
                alt="Rukesh Raj"
                style={{
                  width: "180px",
                  height: "60px",
                  borderRadius: "14px",
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(79,126,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </a>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-3)",
                lineHeight: 1.6,
                maxWidth: "220px",
              }}
            >
              AI-powered career intelligence for students, switchers &amp;
              professionals.
            </p>
            <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
              Built by{" "}
              <a
                href="https://www.linkedin.com/in/rukesh-boddeti/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text)",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
              >
                Rukesh Boddeti
              </a>
            </span>
          </div>

          {/* Right — nav columns */}
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "var(--text-3)",
                  marginBottom: "14px",
                }}
              >
                Tools
              </div>
              {[
                { label: "Career Analyzer", id: "home" },
                { label: "AI Risk Analyzer", id: "risk" },
                { label: "Compare Careers", id: "compare" },
                { label: "Get Suggestions", id: "suggest" },
              ].map((link) => (
                <div key={link.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => navigate(link.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "var(--text-2)",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-2)")
                    }
                  >
                    {link.label}
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "var(--text-3)",
                  marginBottom: "14px",
                }}
              >
                Learn More
              </div>
              {[{ label: "About CareerAI", id: "about" }].map((link) => (
                <div key={link.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => navigate(link.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "var(--text-2)",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-2)")
                    }
                  >
                    {link.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 32px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
            © {new Date().getFullYear()} CareerAI · Free for everyone ·
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
            IDEA 1
          </span>
        </div>
      </footer>
    </div>
  );
}
function FormField({ label, placeholder, value, onChange, icon }) {
  const [focused, setFocused] = useState(false);
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "10px 12px 10px 34px",
            borderRadius: "8px",
            border: `1px solid ${focused ? "var(--accent)" : "var(--border)"}`,
            background: "var(--surface-2)",
            color: "var(--text)",
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(79,126,255,0.12)" : "none",
          }}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, page, index, navigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`glass anim-fade-up d-${index}`}
      style={{
        padding: "28px",
        cursor: page ? "pointer" : "default",
        borderColor: hovered ? color + "55" : "var(--border)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
        boxShadow: hovered ? `0 20px 50px ${color}20` : "none",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => page && navigate(page)}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: color + "18",
          border: `1px solid ${color}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          marginBottom: "16px",
          transform: hovered ? "scale(1.1) rotate(-3deg)" : "none",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {icon}
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
        {title}
        {page && (
          <span
            style={{
              fontSize: "13px",
              color: color,
              marginLeft: "6px",
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.2s",
            }}
          >
            →
          </span>
        )}
      </div>
      <div
        style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.65 }}
      >
        {desc}
      </div>
    </div>
  );
}

function Spinner() {
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
