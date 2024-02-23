import React from "react";

function ResultatPage({ reponses, totalQuestions }) {
  return (
    <div>
      <h1>Vos réponses</h1>
      <ul>
        {reponses.map((reponse, index) => (
          <li key={index}>
            Question {index + 1} : {reponse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultatPage;
