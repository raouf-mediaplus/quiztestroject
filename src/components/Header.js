import React from "react";

function Header({ category }) {
  return (
    <div>
      <h1>Quiz App</h1>
      <h2>Catégorie: {category}</h2>
    </div>
  );
}

export default Header;
