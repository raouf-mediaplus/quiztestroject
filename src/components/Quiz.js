import React, { useState, useEffect } from "react";
import QuestionPage from "./QuestionPage";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LinearProgress } from "@mui/material";

var questionsData = require("../data/questions.json");
const theme = createTheme();

function Home() {
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
    setQuestions(questionsData);
    setQuestionsPerPage(questionsData.length);
  }, []);

  useEffect(() => {
    // Exemple de récupération de la catégorie en fonction de la page actuelle ou d'autres informations
    const getCategoryForPage = () => {
      // Implémentez la logique pour obtenir la catégorie en fonction de la page actuelle.
      // Pour l'exemple, une catégorie statique.
      setCurrentCategory("Catégorie " + questionsData[currentPage].category);
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
      <Header category={currentCategory} />
      <QuestionPage
        questions={questions}
        reponses={reponses}
        completedQuestions={completedQuestions}
        currentPage={currentPage}
        totalQuestions={questions.length}
        onAnswerSubmit={handleAnswerSubmit}
        category={currentCategory}
      />
    </ThemeProvider>
  );
}

export default Home;
