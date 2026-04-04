import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ResultsPage from "./ResultsPage";
import ComparisonPage from "./ComparisonPage";
import SuggestionPage from "./SuggestionPage";
import RiskAnalyzerPage from "./RiskAnalyzerPage";
import AboutPage from "./Aboutpage";

export default function App() {
  const [page, setPage] = useState("home");
  const [results, setResults] = useState(null);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResults = (data) => {
    setResults(data);
    setPage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar page={page} navigate={navigate} />
      {page === "home" && (
        <HomePage navigate={navigate} onResults={handleResults} />
      )}
      {page === "results" && (
        <ResultsPage results={results} navigate={navigate} />
      )}
      {page === "compare" && <ComparisonPage navigate={navigate} />}
      {page === "suggest" && <SuggestionPage navigate={navigate} />}
      {page === "risk" && <RiskAnalyzerPage navigate={navigate} />}
      {page === "about" && <AboutPage navigate={navigate} />}
    </div>
  );
}
