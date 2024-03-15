import React, { useState } from "react";
import { LinearProgress, Button } from "@mui/material";
import "./QuestionPage.css";
import ResultsTable from "./ResultsTable";

function QuestionPage({
  questions,
  reponses,
  completedQuestions,
  currentPage,
  totalQuestions,
  onAnswerSubmit,
  category,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reponse, setReponse] = useState(null);

  const handleSubmit = (index) => {
    onAnswerSubmit(currentPage - 1, index + 1);
    setQuestionIndex(questionIndex + 1);
    setReponse(index + 1);
  };

  // Vérification si des questions existent
  if (!questions || questions.length === 0) {
    return <p>Aucune question disponible.</p>;
  }
  // Vérifier si la question actuelle est la dernière de la catégorie
  const isLastQuestionInCategory = questionIndex === questions.length;

  return (
    <div className="questionsContainer">
      <LinearProgress
        variant="determinate"
        value={(completedQuestions / totalQuestions) * 100}
        color="success"
        sx={{ bgcolor: "#fff", marginTop: "-2rem" }}
      />
      <div className="flex-container">
        {questionIndex < questions.length && (
          <>
            <img
              src={`/images/${category}.jpg`}
              alt="Category"
              className="flex-item-left"
            />
            <div className="flex-item-right">
              {!isLastQuestionInCategory && (
                <>
                  <h2 style={{ marginTop: "4rem" }}>
                    Question{" "}
                    {questionIndex + 1 + (currentPage - 1) * questions.length} /{" "}
                    {totalQuestions}
                  </h2>
                </>
              )}
              <p>
                {
                  questions[
                    questionIndex + (currentPage - 1) * questions.length
                  ].question
                }
              </p>
              <h4>{questions[questionIndex].text}</h4>
              <p style={{ marginLeft: "1em", opacity: "0.7" }}>
                {questions[questionIndex].explanation}
              </p>
              <div className="buttons">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Button
                      key={index + 1}
                      variant="contained"
                      sx={{ margin: 1, bgcolor: "#459df4" }}
                      onClick={() => handleSubmit(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
              </div>
            </div>

            {/* fin flex-item-right */}
          </>
        )}
      </div>

      {/* A la fin des questions d'une catégorie */}
      {questionIndex === questions.length && (
        <>
          <p style={{ color: "white" }}>
            End of the quiz. Thank you for your participation.
          </p>
          <br></br>
          <h4 style={{ color: "white" }}>Summary</h4>

          <ResultsTable results={reponses} questions={questions} />
        </>
      )}
    </div>
  );
}

export default QuestionPage;
