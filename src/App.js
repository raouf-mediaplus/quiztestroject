import Home from "./components/Home";
import ModelChoice from "./components/ModelChoice";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importez BrowserRouter

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/models" element={<ModelChoice />} />
        <Route exact path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
