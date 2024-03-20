import React, { useState, useEffect } from "react";
import QuestionPage from "./QuestionPage";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useFetch from "./useFetch";

const theme = createTheme();

function Quiz() {
  const {
    error,
    isPending,
    data: questionsData,
  } = useFetch("https://65f99d8f3909a9a65b18f206.mockapi.io/api/v1/questions");

  const [currentCategory, setCurrentCategory] = useState("");

  const [reponses, setReponses] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isPending) {
      if (completedQuestions < questionsData.length) {
        setCurrentCategory(questionsData[completedQuestions].category);
      }
    }
  }, [completedQuestions, questionsData, isPending]);

  const handleAnswerSubmit = (questionIndex, response) => {
    const updatedReponses = [...reponses];
    updatedReponses.push(response);
    setReponses(updatedReponses);
    setCompletedQuestions(completedQuestions + 1);
    if (questionIndex + 1 === questionsData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <>
          <Header category={currentCategory} />
          <QuestionPage
            questions={questionsData}
            reponses={reponses}
            completedQuestions={completedQuestions}
            currentPage={currentPage}
            totalQuestions={questionsData.length}
            onAnswerSubmit={handleAnswerSubmit}
            category={currentCategory}
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default Quiz;
