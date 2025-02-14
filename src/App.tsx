import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"; 
import { Home } from "./components/pages/Home";
import { Journal } from "./components/pages/Journal";
import { ChartPage } from "./components/pages/ChartPage";
import { Entries } from "./components/pages/Entries";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
