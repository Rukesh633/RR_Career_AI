import { useState, useEffect, useRef } from "react";

const SUBTITLE_POOL = [
  "Discover how much of your work is at risk from AI automation",
  "Learn exactly how to transition from your current role to your target career",
  "Get a step-by-step roadmap with timelines, resources, and milestones",
  "Find out which of your tasks AI will replace — and what to do about it",
  "Compare two careers side-by-side: salary, growth, demand, and AI risk",
  "Get smart career suggestions tailored to your background and interests",
  "Understand your skill gaps and what to learn first, prioritized for you",
  "Built for India's job market — real salaries, real roles, real insights",
];

function pickTwo(pool) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

const TITLE = "RR Career AI";
const CHAR_DELAY = 85;
const SUBTITLE_START = 1300;
const TOTAL_DURATION = 4000;
const EXIT_DURATION = 600;

export default function LoadingScreen({ onDone }) {
  const [charCount, setCharCount] = useState(0);
  const [showSubs, setShowSubs] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [subtitles] = useState(() => pickTwo(SUBTITLE_POOL));
  const intervalRef = useRef(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 1;
      setCharCount(i);
      if (i >= TITLE.length) clearInterval(intervalRef.current);
    }, CHAR_DELAY);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowSubs(true), SUBTITLE_START);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, EXIT_DURATION);
    }, TOTAL_DURATION);
    return () => clearTimeout(t);
  }, [onDone]);

  const displayedTitle = TITLE.slice(0, charCount);
  const showCursor = charCount < TITLE.length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(79,126,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,126,255,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          animation: "ls-orb1 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,201,167,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          animation: "ls-orb2 11s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4f7eff, #00c9a7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 32px rgba(79,126,255,0.4)",
            animation: "ls-logo-pulse 2.5s ease-in-out infinite",
            flexShrink: 0,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22 L10 14 L16 18 L22 8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="22" cy="8" r="2.5" fill="white" />
          </svg>
        </div>

        <div
          style={{ minHeight: "90px", display: "flex", alignItems: "center" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 8vw, 40px)",
              fontWeight: "800",
              letterSpacing: "-3px",
              lineHeight: 1,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {displayedTitle.split("").map((char, i) => {
              const isAccentChar =
                i >= TITLE.indexOf("AI") && i < TITLE.indexOf("AI") + 2;
              return (
                <span
                  key={i}
                  style={
                    isAccentChar
                      ? {
                          background:
                            "linear-gradient(135deg, #4f7eff, #00c9a7)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {char}
                </span>
              );
            })}

            {showCursor && (
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "0.85em",
                  background: "var(--accent)",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  borderRadius: "2px",
                  animation: "ls-cursor 0.7s step-end infinite",
                }}
              />
            )}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            width: "100%",
          }}
        >
          {subtitles.map((sub, idx) => (
            <div
              key={idx}
              style={{
                opacity: showSubs ? 1 : 0,
                transform: showSubs ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.6s ease ${idx * 180}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 180}ms`,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 20px",
                borderRadius: "12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                textAlign: "left",
              }}
            >
              {/* Accent dot */}
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: idx === 0 ? "var(--accent)" : "var(--accent-2)",
                  flexShrink: 0,
                  marginTop: "7px",
                  boxShadow: `0 0 8px ${idx === 0 ? "rgba(79,126,255,0.7)" : "rgba(0,201,167,0.7)"}`,
                }}
              />
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-2)",
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: "var(--font-body)",
                }}
              >
                {sub}
              </p>
            </div>
          ))}

          {/* "and much more" hint — fades in after both subtitle cards */}
          <div
            style={{
              opacity: showSubs ? 1 : 0,
              transform: showSubs ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 0.6s ease 420ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 420ms",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              paddingTop: "2px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "var(--text-3)",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                letterSpacing: "0.2px",
              }}
            >
              and much more
            </span>
          </div>
        </div>
      </div>

      {/* Footer — rolling cuboid */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          zIndex: 1,
        }}
      >
        <RollingCuboid />
        <span
          style={{
            fontSize: "11px",
            color: "var(--text-3)",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          Loading your career intelligence…
        </span>
      </div>

      {/* Keyframe injections */}
      <style>{`
        @keyframes ls-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes ls-orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.06); }
        }
        @keyframes ls-orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px,20px) scale(0.96); }
        }
        @keyframes ls-logo-pulse {
          0%,100% { box-shadow: 0 0 32px rgba(79,126,255,0.4); }
          50% { box-shadow: 0 0 56px rgba(79,126,255,0.65), 0 0 80px rgba(0,201,167,0.2); }
        }
        @keyframes ls-roll {
          0%   { transform: rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
          25%  { transform: rotateX(90deg)  rotateY(45deg)  rotateZ(0deg); }
          50%  { transform: rotateX(180deg) rotateY(90deg)  rotateZ(45deg); }
          75%  { transform: rotateX(270deg) rotateY(135deg) rotateZ(90deg); }
          100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(135deg); }
        }
        @keyframes ls-roll-move {
          0%,100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }
        @keyframes ls-dot-bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── 3-D Rolling Cuboid ────────────────────────────────────────────────────────
function RollingCuboid() {
  const SIZE = 28; // px — face side length

  const faceStyle = (transform, bg, border) => ({
    position: "absolute",
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    background: bg,
    border: `1px solid ${border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    transform,
  });

  return (
    <div
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        perspective: "180px",
        animation: "ls-roll-move 2s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "ls-roll 2s linear infinite",
        }}
      >
        {/* Front */}
        <div
          style={faceStyle(
            `translateZ(${SIZE / 2}px)`,
            "rgba(79,126,255,0.18)",
            "rgba(79,126,255,0.5)",
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 9L5 6L8 8L10 3"
              stroke="rgba(79,126,255,0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Back */}
        <div
          style={faceStyle(
            `rotateY(180deg) translateZ(${SIZE / 2}px)`,
            "rgba(0,201,167,0.15)",
            "rgba(0,201,167,0.45)",
          )}
        />
        {/* Left */}
        <div
          style={faceStyle(
            `rotateY(-90deg) translateZ(${SIZE / 2}px)`,
            "rgba(79,126,255,0.10)",
            "rgba(79,126,255,0.35)",
          )}
        />
        {/* Right */}
        <div
          style={faceStyle(
            `rotateY(90deg) translateZ(${SIZE / 2}px)`,
            "rgba(0,201,167,0.10)",
            "rgba(0,201,167,0.35)",
          )}
        />
        {/* Top */}
        <div
          style={faceStyle(
            `rotateX(90deg) translateZ(${SIZE / 2}px)`,
            "rgba(167,139,250,0.15)",
            "rgba(167,139,250,0.45)",
          )}
        />
        {/* Bottom */}
        <div
          style={faceStyle(
            `rotateX(-90deg) translateZ(${SIZE / 2}px)`,
            "rgba(79,126,255,0.08)",
            "rgba(79,126,255,0.3)",
          )}
        />
      </div>
    </div>
  );
}
