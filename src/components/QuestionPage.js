import React, { useState } from "react";
import { LinearProgress, Button } from "@mui/material";

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

  const handleSubmit = (reponse) => {
    onAnswerSubmit(currentPage - 1, reponse);
    setQuestionIndex(questionIndex + 1);
    setReponse(reponse);
  };

  // Vérification si des questions existent
  if (!questions || questions.length === 0) {
    return <p>Aucune question disponible.</p>;
  }
  // Vérifier si la question actuelle est la dernière de la catégorie
  const isLastQuestionInCategory = questionIndex === questions.length;

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(completedQuestions / totalQuestions) * 100}
      />
      {!isLastQuestionInCategory && (
        <h2>
          Question {questionIndex + 1 + (currentPage - 1) * questions.length} /{" "}
          {totalQuestions}
        </h2>
      )}
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
                  onClick={() => handleSubmit(reponse)}
                >
                  {index + 1}
                </Button>
              ))}
          </div>
        </>
      )}

      {/* A la fin des questions d'une catégorie */}
      {questionIndex === questions.length && (
        <p>Fin des questions de la catégorie: {category}</p>
      )}
    </div>
  );
}

export default QuestionPage;
