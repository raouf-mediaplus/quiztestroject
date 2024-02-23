import React, { useState } from "react";
import { LinearProgress, Button } from "@mui/material";

function QuestionPage({
  questions,
  reponses,
  completedQuestions,
  currentPage,
  totalQuestions,
  onAnswerSubmit,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reponse, setReponse] = useState([]);

  const handleSubmit = (reponse) => {
    onAnswerSubmit(questionIndex, reponse);
    setQuestionIndex(questionIndex + 1);
    setReponse(reponse);
  };

  // Vérification si des questions existent
  if (!questions || questions.length === 0) {
    return <p>Aucune question disponible.</p>;
  }

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(completedQuestions / totalQuestions) * 100}
      />
      <h2>
        Question {questionIndex + 1 + (currentPage - 1) * questions.length} /{" "}
        {totalQuestions}
      </h2>
      {questionIndex < questions.length && (
        <>
          <p>
            {
              questions[questionIndex + (currentPage - 1) * questions.length]
                .question
            }
          </p>
          <div>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Button
                  key={index + 1}
                  variant="outlined"
                  disabled={reponse !== null}
                  onClick={() => handleSubmit(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionPage;
