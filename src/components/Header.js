import React from "react";
import { Avatar } from "@mui/material";
import "./Header.css";

function Header({ category }) {
  return (
    <div className="header">
      <div className="user">
        <Avatar className="user-icon" alt="avatar" src="/images/avatar1.jpg" />

        <div className="user-info">
          <h2>John Doe</h2>
          <span>johnDoe@mail.com</span>
        </div>
      </div>
      <h3 className="category">
        Catégorie: <span className="category-text">{category}</span>
      </h3>
    </div>
  );
}

export default Header;
