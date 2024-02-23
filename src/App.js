import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importez BrowserRouter
import QuestionPage from "./components/QuestionPage";
import ResultatPage from "./components/ResultatPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LinearProgress } from "@mui/material";

const theme = createTheme();

function App() {
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(1); // Nombre de questions par page, initialisé à 1

  // useEffect(() => {
  //   fetch("data/questions.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuestions(data);
  //       setQuestionsPerPage(data.length);
  //     });
  // }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("data/questions.json");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: questions should be an array");
        }
        setQuestions(data);
        setQuestionsPerPage(data.length);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
        // Gérer l'erreur : afficher un message d'erreur à l'utilisateur, journaliser l'erreur, etc.
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSubmit = (questionIndex, reponse) => {
    setReponses([...reponses, reponse]);
    setCompletedQuestions(completedQuestions + 1);
    if (questionIndex + 1 === questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {" "}
        {/* Utilisez BrowserRouter comme composant parent */}
        <Routes>
          <Route
            path="/"
            element={
              // Utilisez 'element' au lieu de 'render'
              <QuestionPage
                questions={questions}
                reponses={reponses}
                completedQuestions={completedQuestions}
                currentPage={currentPage}
                totalQuestions={questions.length}
                onAnswerSubmit={handleAnswerSubmit}
              />
            }
          />
          <Route
            path="/resultat"
            element={
              <ResultatPage
                reponses={reponses}
                totalQuestions={questions.length}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
