import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importez BrowserRouter
import ResultatPage from "./components/ResultatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/result" element={<ResultatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
