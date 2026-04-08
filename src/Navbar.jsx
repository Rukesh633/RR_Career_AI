import { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "risk", label: "AI Risk Analyzer", hot: true },
  { id: "compare", label: "Compare Careers" },
  { id: "suggest", label: "Get Suggestions" },
  { id: "about", label: "About" },
];

export default function Navbar({ page, navigate }) {
  const [open, setOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Capture the browser's install prompt event
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Stop the default mini-infobar
      setInstallPrompt(e); // Save it so we can trigger it on button click
    };
    window.addEventListener("beforeinstallprompt", handler);

    // If already installed (running as standalone PWA), hide the button
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt(); // Show the OS-level install popup
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null); // Hide button after install
      setIsInstalled(true);
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(6,9,15,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "62px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src="/RR_icon.png"
              alt="Logo"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                objectFit: "cover",
                boxShadow: "0 2px 12px rgba(79,126,255,0.4)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  fontWeight: "800",
                  color: "var(--text)",
                  letterSpacing: "-0.5px",
                }}
              >
                Career<span style={{ color: "var(--accent)" }}>AI</span>
              </span>
              <span
                style={{
                  fontSize: "9px",
                  color: "var(--text-3)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Intelligence Platform
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            className="hide-mobile"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    page === link.id ? "var(--surface-2)" : "transparent",
                  color: page === link.id ? "var(--text)" : "var(--text-2)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: page === link.id ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  if (page !== link.id)
                    e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (page !== link.id)
                    e.currentTarget.style.color = "var(--text-2)";
                }}
              >
                {link.label}
                {link.hot && (
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: "700",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      background: "rgba(255,77,109,0.15)",
                      color: "#ff4d6d",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    New
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => navigate("suggest")}
              className="btn-primary"
              style={{
                marginLeft: "8px",
                padding: "9px 20px",
                fontSize: "13px",
              }}
            >
              Start Free →
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            id="mobile-btn"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
              padding: "12px 24px 16px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "13px 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  color: page === link.id ? "var(--accent)" : "var(--text-2)",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {link.label}
                {link.hot && (
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#ff4d6d",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    New
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                navigate("suggest");
                setOpen(false);
              }}
              className="btn-primary"
              style={{ marginTop: "14px", width: "100%" }}
            >
              Get Started Free
            </button>

            {/* PWA Install button — only shown when browser supports it and app isn't installed */}
            {installPrompt && !isInstalled && (
              <button
                onClick={() => {
                  handleInstall();
                  setOpen(false);
                }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "13px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(0,201,167,0.35)",
                  background: "rgba(0,201,167,0.08)",
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,201,167,0.15)";
                  e.currentTarget.style.borderColor = "rgba(0,201,167,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,201,167,0.08)";
                  e.currentTarget.style.borderColor = "rgba(0,201,167,0.35)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v8M5 7l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 11v1a1 1 0 001 1h8a1 1 0 001-1v-1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Install App
              </button>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          #mobile-btn  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
