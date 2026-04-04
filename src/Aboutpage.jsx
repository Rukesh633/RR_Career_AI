export default function AboutPage({ navigate }) {
  const FEATURES = [
    {
      icon: "🗺️",
      color: "#4f7eff",
      title: "Career Analyzer & Roadmap",
      page: "home",
      badge: "Core Feature",
      badgeColor: "#4f7eff",
      what: "Enter your current background and target career. CareerAI generates a complete, phased transition plan tailored to the Indian job market.",
      how: "The analyzer breaks your journey into 5–7 actionable phases — each with a clear title, description, duration, free resources to use, and a measurable milestone to hit.",
      details: [
        "📊 Match Score — how well your profile fits the target career (0–100)",
        "⏱ Realistic timeline — months, not vague promises",
        "💰 Salary range — actual INR LPA figures for India",
        "📈 Market demand — High / Growing / Stable / Declining",
        "🎯 Difficulty — Easy, Moderate, Hard, Very Hard",
      ],
    },
    {
      icon: "🤖",
      color: "#ff4d6d",
      title: "AI Risk Analyzer",
      page: "risk",
      badge: "Unique Feature",
      badgeColor: "#ff4d6d",
      what: "Enter any job title. Get an honest, task-by-task breakdown of how much of that job AI can automate today — and what to do about it.",
      how: "The analyzer breaks your job into individual tasks (e.g. 'writing reports', 'data entry', 'client meetings') and scores each from 0–100% automation risk. Tasks are categorized as Automatable, Augmentable, or Human-only.",
      details: [
        "🔴 Overall risk score with animated gauge",
        "📋 Task-by-task breakdown with animated progress bars",
        "🛡️ Which parts of your job are safest from AI",
        "⚠️ Which responsibilities are most at risk",
        "🔮 What your role looks like in 10 years",
        "🎯 Personal action plan — Urgent / Important / Good to have",
        "🚀 3 lower-risk alternative careers with roadmap links",
      ],
    },
    {
      icon: "⚡",
      color: "#00c9a7",
      title: "Skill Gap Analysis",
      page: "home",
      badge: "Inside Results",
      badgeColor: "#00c9a7",
      what: "Part of every career analysis — see exactly which skills you need, which you already have, and which transfer directly from your current role.",
      how: "The AI evaluates your current skills against the target career requirements and produces a prioritized learning list. Each skill shows estimated learning time in weeks and the specific reason it matters.",
      details: [
        "✅ Your current skills — what you already bring",
        "↗️ Transferable skills — what carries over directly",
        "📚 Skills to learn — ranked High / Medium / Low priority",
        "⏱ Time estimates — realistic weeks to learn each skill",
        "💡 Reason — why each skill matters for your target career",
      ],
    },
    {
      icon: "🔍",
      color: "#ffb347",
      title: "Reality Check",
      page: "home",
      badge: "Inside Results",
      badgeColor: "#ffb347",
      what: "No sugarcoating. Every career analysis includes an honest pros/cons breakdown, myths busted, and a plain-English verdict.",
      how: "The AI draws on real-world knowledge of the Indian job market to highlight what people often get wrong about a career path — and what the actual experience is like.",
      details: [
        "✅ 3 real pros of the career path",
        "⚠️ 3 real cons most people don't talk about",
        "💭 2 common myths vs the actual reality",
        "⚖️ An honest final verdict on your specific situation",
      ],
    },
    {
      icon: "⚖️",
      color: "#a78bfa",
      title: "Career Comparison",
      page: "compare",
      badge: "Standalone Tool",
      badgeColor: "#a78bfa",
      what: "Can't decide between two career paths? Enter both and get a side-by-side comparison across every dimension that matters.",
      how: "Type any two careers. The AI analyzes both and presents them in a clean comparison table with animated bars. A winner is declared with the reasoning explained.",
      details: [
        "💰 Salary ranges side by side (INR LPA)",
        "🔥 Market demand — High / Medium / Low",
        "🤖 AI automation risk percentage",
        "📈 Annual growth rate",
        "⏱ Time to become job-ready",
        "😊 Job satisfaction score (0–100)",
        "🏆 Winner declaration with reasoning",
        "💡 Personalized recommendation for your situation",
      ],
    },
    {
      icon: "💡",
      color: "#06b6d4",
      title: "Smart Career Suggestions",
      page: "suggest",
      badge: "Standalone Tool",
      badgeColor: "#06b6d4",
      what: "Don't know what career to pursue? Describe yourself — your background, what you enjoy, your values, what you want to avoid — and get 5 personalized matches.",
      how: "The more detail you give, the better the matches. The AI considers your full personality profile, not just your degree or job title, and surfaces careers you might never have considered.",
      details: [
        "🎯 Match percentage — how well each career fits you",
        "💰 Salary range for each suggestion",
        "🤖 AI risk score — how safe each career is",
        "⏱ Estimated time to switch",
        "🏷️ Tags — Best Match / Safe from AI / High Growth / Creative / Stable",
        "💬 Personalized insight about your overall profile",
      ],
    },
    {
      icon: "⬇️",
      color: "#f59e0b",
      title: "PDF Roadmap Download",
      page: "home",
      badge: "Export Feature",
      badgeColor: "#f59e0b",
      what: "After generating a career analysis, download your complete roadmap as a printable PDF — formatted cleanly for offline reference.",
      how: "Click 'Download Roadmap PDF' on the results page. A formatted HTML document opens in a new tab with your full roadmap, skills plan, AI risk analysis and reality check. Use your browser's print dialog to save as PDF.",
      details: [
        "📄 Complete roadmap steps with phases and milestones",
        "⚡ Skills to learn with priority and time estimates",
        "🤖 AI risk breakdown with all tasks",
        "✅ Pros, cons, myths and verdict",
        "🆓 Completely free — no watermark, no signup",
      ],
    },
  ];

  const WHO = [
    {
      e: "🎓",
      t: "Students",
      d: "Overwhelmed by options after graduation? Get clarity on which career actually fits your degree, skills and interests — before you commit.",
    },
    {
      e: "🔄",
      t: "Career Switchers",
      d: "Planning to move into a completely new field? Get a realistic roadmap for your specific background, not generic advice.",
    },
    {
      e: "😰",
      t: "AI-Worried Professionals",
      d: "Hearing that AI will replace your job? Find out exactly what's at risk in your role — and what to do to stay relevant.",
    },
    {
      e: "⏸️",
      t: "Career Gap / Re-entry",
      d: "Returning to work after a break? Understand what's changed in your field and what skills to update first.",
    },
    {
      e: "🏫",
      t: "Recent Graduates",
      d: "Just finished college and not sure where to start? Get a step-by-step plan that accounts for zero experience.",
    },
    {
      e: "📊",
      t: "Underpaid Professionals",
      d: "Want to switch to a higher-paying career? Compare your current path against alternatives with real INR salary data.",
    },
  ];

  return (
    <div style={{ paddingTop: "62px", minHeight: "100vh" }}>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(79,126,255,0.08), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            className="section-tag anim-fade-up d-0"
            style={{ color: "var(--accent)" }}
          >
            About CareerAI
          </div>
          <h1
            className="anim-fade-up d-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: "800",
              letterSpacing: "-2.5px",
              color: "var(--text)",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            Every Feature,
            <br />
            <span className="grad-blue">Explained Clearly.</span>
          </h1>
          <p
            className="anim-fade-up d-2"
            style={{
              fontSize: "17px",
              color: "var(--text-2)",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto 32px",
            }}
          >
            CareerAI is a free, AI-powered platform that helps you navigate
            career confusion with structured roadmaps, skill gap analysis, AI
            automation risk insights and honest advice — all built for the
            Indian job market.
          </p>
          <div
            className="anim-fade-up d-3"
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("home")}
              className="btn-primary"
              style={{ padding: "13px 28px" }}
            >
              Try Career Analyzer →
            </button>
            <button
              onClick={() => navigate("risk")}
              className="btn-ghost"
              style={{ padding: "13px 28px" }}
            >
              Check AI Risk
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-tag" style={{ color: "var(--accent-2)" }}>
              How It Works
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: "800",
                letterSpacing: "-1.5px",
                color: "var(--text)",
              }}
            >
              Simple as <span className="grad-blue">1 – 2 – 3</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                n: "1",
                icon: "✏️",
                title: "Enter Your Profile",
                desc: "Type your current role, target career, experience level, and skills. The more detail you give, the more personalized the output.",
              },
              {
                n: "2",
                icon: "🤖",
                title: "AI Analyzes Everything",
                desc: "AI processes your profile against real-world Indian job market data and generates a comprehensive analysis in ~30 seconds.",
              },
              {
                n: "3",
                icon: "🗺️",
                title: "Get Your Roadmap",
                desc: "Receive your full career plan — steps, skills, AI risk score, reality check — and optionally download it as a PDF to keep.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`glass anim-fade-up d-${i + 1}`}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontFamily: "var(--font-display)",
                    fontSize: "48px",
                    fontWeight: "800",
                    color: "var(--border-2)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-3)",
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ color: "#a78bfa" }}>
              All Features
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: "800",
                letterSpacing: "-1.5px",
                color: "var(--text)",
              }}
            >
              What CareerAI <span className="grad-blue">gives you</span>
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`glass anim-fade-up d-${(i % 4) + 1}`}
                style={{
                  padding: "32px",
                  borderRadius: "18px",
                  borderLeft: `4px solid ${f.color}`,
                }}
              >
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {/* Icon + title */}
                  <div style={{ flex: "0 0 auto" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        background: f.color + "18",
                        border: `1px solid ${f.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "26px",
                        marginBottom: "12px",
                      }}
                    >
                      {f.icon}
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: "260px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "8px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: "800",
                          fontSize: "20px",
                          color: "var(--text)",
                          letterSpacing: "-0.5px",
                        }}
                      >
                        {f.title}
                      </h3>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          padding: "3px 9px",
                          borderRadius: "5px",
                          background: f.badgeColor + "20",
                          color: f.badgeColor,
                        }}
                      >
                        {f.badge}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                        marginBottom: "16px",
                        maxWidth: "580px",
                      }}
                    >
                      <strong style={{ color: "var(--text)" }}>
                        What it does:
                      </strong>{" "}
                      {f.what}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                        marginBottom: "18px",
                        maxWidth: "580px",
                      }}
                    >
                      <strong style={{ color: "var(--text)" }}>
                        How it works:
                      </strong>{" "}
                      {f.how}
                    </p>

                    {/* Detail bullets */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "18px",
                      }}
                    >
                      {f.details.map((d, j) => (
                        <div
                          key={j}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            background: "var(--surface-2)",
                            border: "1px solid var(--border)",
                            color: "var(--text-2)",
                            lineHeight: 1.4,
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {f.page && (
                      <button
                        onClick={() => navigate(f.page)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "9px 18px",
                          borderRadius: "8px",
                          border: `1px solid ${f.color}40`,
                          background: f.color + "12",
                          color: f.color,
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = f.color + "22";
                          e.currentTarget.style.borderColor = f.color + "70";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = f.color + "12";
                          e.currentTarget.style.borderColor = f.color + "40";
                        }}
                      >
                        Try it now →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-tag" style={{ color: "var(--warn)" }}>
              Who It Helps
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: "800",
                letterSpacing: "-1.5px",
                color: "var(--text)",
              }}
            >
              Built for <span className="grad-warm">real situations</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {WHO.map((w, i) => (
              <div
                key={i}
                className={`glass anim-fade-up d-${(i % 3) + 1}`}
                style={{
                  padding: "24px",
                  borderRadius: "14px",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--border-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                  {w.e}
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
                  {w.t}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-3)",
                    lineHeight: 1.65,
                  }}
                >
                  {w.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────── */}
      <section
        style={{ padding: "80px 24px", borderTop: "1px solid var(--border)" }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <div className="section-tag" style={{ color: "var(--accent)" }}>
            Under the Hood
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              color: "var(--text)",
              marginBottom: "40px",
            }}
          >
            Built with <span className="grad-blue">modern, free tools</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "14px",
            }}
          >
            {[
              { icon: "⚛️", name: "React 19", desc: "Frontend UI" },
              { icon: "⚡", name: "Vite", desc: "Build tool" },
              { icon: "🎨", name: "Tailwind CSS", desc: "Styling" },
              { icon: "🤖", name: "Groq", desc: "AI engine" },
              { icon: "☁️", name: "Vercel", desc: "Free hosting" },
              { icon: "💸", name: "₹0 cost", desc: "Completely free" },
            ].map((t, i) => (
              <div
                key={i}
                className="glass"
                style={{
                  padding: "20px 16px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                  {t.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "var(--text)",
                    marginBottom: "3px",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE BUILDER ────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <div className="section-tag" style={{ color: "#00c9a7" }}>
            The Builder
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              color: "var(--text)",
              marginBottom: "24px",
            }}
          >
            Made by <span className="grad-blue">Rukesh Boddeti</span>
          </h2>
          <a
            href="https://www.linkedin.com/in/rukesh-boddeti/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Rukesh_Raj.png"
              alt="Rukesh Raj"
              style={{
                width: "200px",
                height: "68px",
                borderRadius: "16px",
                objectFit: "cover",
                cursor: "pointer",
                margin: "0 auto 24px",
                display: "block",
                transition: "all 0.3s",
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
              fontSize: "15px",
              color: "var(--text-2)",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
          >
            CareerAI was built to solve a real problem — too many people in
            India are making career decisions based on guesswork, pressure, or
            outdated advice. This platform gives everyone access to structured,
            AI-powered career intelligence for free.
          </p>
          <a
            href="https://www.linkedin.com/in/rukesh-boddeti/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <button className="btn-ghost" style={{ padding: "11px 24px" }}>
              Connect on LinkedIn →
            </button>
          </a>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
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
          style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 4vw, 44px)",
              fontWeight: "800",
              letterSpacing: "-2px",
              color: "var(--text)",
              marginBottom: "14px",
            }}
          >
            Ready to get
            <br />
            <span className="grad-blue">your roadmap?</span>
          </h2>
          <p
            style={{
              color: "var(--text-2)",
              fontSize: "15px",
              marginBottom: "28px",
            }}
          >
            Free, instant, no account needed.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("home")}
              className="btn-primary anim-glow"
              style={{ padding: "14px 32px", fontSize: "15px" }}
            >
              Analyze My Career ✦
            </button>
            <button
              onClick={() => navigate("risk")}
              className="btn-ghost"
              style={{ padding: "14px 24px" }}
            >
              Check AI Risk
            </button>
          </div>
        </div>
      </section>

      {/* Footer bottom note */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 24px",
          textAlign: "center",
          background: "var(--surface)",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--text-3)" }}>
          © {new Date().getFullYear()} CareerAI · Built by{" "}
          <a
            href="https://www.linkedin.com/in/rukesh-boddeti/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-2)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Rukesh Boddeti
          </a>{" "}
          · Free forever ·
        </span>
      </div>
    </div>
  );
}
