import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importez BrowserRouter
import QuestionPage from "./components/QuestionPage";
import ResultatPage from "./components/ResultatPage";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LinearProgress } from "@mui/material";

const theme = createTheme();

function App() {
  const [currentCategory, setCurrentCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(1); // Nombre de questions par page, initialisé à 1

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await fetch("data/questions.json");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch questions");
  //       }
  //       const data = await response.json();
  //       if (!Array.isArray(data)) {
  //         throw new Error("Invalid data format: questions should be an array");
  //       }
  //       setQuestions(data);
  //       setQuestionsPerPage(data.length);
  //     } catch (error) {
  //       console.error("Error fetching questions:", error.message);
  //       // Gérer l'erreur : afficher un message d'erreur à l'utilisateur, journaliser l'erreur, etc.
  //     }
  //   };

  //   fetchQuestions();
  // }, []);
  useEffect(() => {
    // Définition des données des questions directement dans le code
    const questionsData = [
      {
        id: 1,
        text: "Question 1",
        category: 1,
      },
      {
        id: 2,
        text: "Question 2",
        category: 1,
      },
      {
        id: 3,
        text: "Question 3",
        category: 2,
      },
      // Ajoutez d'autres questions au besoin
    ];

    setQuestions(questionsData);
    setQuestionsPerPage(questionsData.length);
  }, []);

  useEffect(() => {
    // Exemple de récupération de la catégorie en fonction de la page actuelle ou d'autres informations
    const getCategoryForPage = () => {
      // Implémentez la logique pour obtenir la catégorie en fonction de la page actuelle.
      // Pour l'exemple, une catégorie statique.
      setCurrentCategory("Catégorie 1");
    };

    getCategoryForPage();
  }, []);

  // const handleAnswerSubmit = (questionIndex, reponse) => {
  //   setReponses([...reponses, reponse]);
  //   setCompletedQuestions(completedQuestions + 1);
  //   if (questionIndex + 1 === questions.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const handleAnswerSubmit = (questionIndex, response) => {
    const updatedReponses = [...reponses];
    updatedReponses[questionIndex] = response;
    setReponses(updatedReponses);
    setCompletedQuestions(completedQuestions + 1);
    if (questionIndex + 1 === questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header category={currentCategory} />
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
